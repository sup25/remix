import { json } from "@remix-run/node";
import prisma from "~/_lib/db";

export const action = async ({ request }: { request: Request }) => {
  if (request.method !== "POST") {
    return json({ error: "Method Not Allowed" }, { status: 405 });
  }

  try {
    const body = await request.json();

    const {
      transactionUuid,
      totalAmount,
      productId,
      quantity,
      formattedCart,
      userId,
    } = body;

    if (!transactionUuid || !totalAmount) {
      console.error("Validation failed:", body);
      return json({ error: "Invalid request data" }, { status: 400 });
    }

    // Prevent duplicate transactions
    const existingOrder = await prisma.order.findUnique({
      where: { transactionUuid },
    });

    if (existingOrder) {
      console.error("Duplicate transaction detected:", transactionUuid);
      return json(
        { message: "Transaction already processed" },
        { status: 200 }
      );
    }

    if (
      formattedCart &&
      Array.isArray(formattedCart) &&
      formattedCart.length > 0
    ) {
      // **Cart Drawer Purchase Handling**
      const productIds = formattedCart.map((item) => parseInt(item.productId));

      // Fetch all products in one query
      const existingProducts = await prisma.product.findMany({
        where: { id: { in: productIds } },
        select: { id: true, stock: true },
      });

      const productStockMap = new Map(
        existingProducts.map((p) => [p.id, p.stock])
      );

      // Check stock availability for all products
      for (const item of formattedCart) {
        const productId = parseInt(item.productId);
        const quantity = parseInt(item.quantity);
        const availableStock = productStockMap.get(productId);

        if (availableStock === undefined) {
          console.error(`Product not found: ${productId}`);
          return json(
            { error: `Product not found: ${productId}` },
            { status: 404 }
          );
        }

        if (availableStock < quantity) {
          console.error(`Stock unavailable for product: ${productId}`);
          return json(
            { error: `Product out of stock: ${productId}` },
            { status: 400 }
          );
        }
      }

      // Start transaction for cart drawer purchase
      await prisma.$transaction(async (tx) => {
        const order = await tx.order.create({
          data: {
            userId,
            transactionUuid,
            totalAmount: parseFloat(totalAmount.replace(",", "")),
            status: "completed",
          },
        });

        for (const item of formattedCart) {
          const productId = parseInt(item.productId);
          const quantity = parseInt(item.quantity);

          await tx.product.update({
            where: { id: productId },
            data: { stock: { decrement: quantity } },
          });

          await tx.orderItem.create({
            data: {
              orderId: order.id,
              productId,
              quantity,
            },
          });
        }
      });

      console.log("Cart order placed and product stocks updated");
    } else if (productId && quantity) {
      // **Single Product Purchase Handling**
      const existingProduct = await prisma.product.findUnique({
        where: { id: parseInt(productId) },
        select: { id: true, stock: true },
      });

      if (!existingProduct) {
        console.error("Product not found:", productId);
        return json({ error: "Product not found" }, { status: 404 });
      }

      if (existingProduct.stock < parseInt(quantity)) {
        console.error("Stock unavailable for product:", productId);
        return json({ error: "Product out of stock" }, { status: 400 });
      }

      // Start transaction for single product purchase
      await prisma.$transaction(async (tx) => {
        const order = await tx.order.create({
          data: {
            userId,
            transactionUuid,
            totalAmount: parseFloat(totalAmount.replace(",", "")),
            status: "completed",
          },
        });

        await tx.product.update({
          where: { id: parseInt(productId) },
          data: { stock: { decrement: parseInt(quantity) } },
        });

        await tx.orderItem.create({
          data: {
            orderId: order.id,
            productId: parseInt(productId),
            quantity: parseInt(quantity),
          },
        });
      });

      console.log("Single product order placed and stock updated");
    } else {
      return json({ error: "Invalid request data" }, { status: 400 });
    }

    return json({ message: "Order placed successfully" }, { status: 200 });
  } catch (error: unknown) {
    console.error("Webhook error:", error);

    return json(
      {
        error: "Internal Server Error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
};
