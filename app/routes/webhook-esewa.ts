import { json } from "@remix-run/node";
import prisma from "~/_lib/db";

export const action = async ({ request }: { request: Request }) => {
  if (request.method !== "POST") {
    return json({ error: "Method Not Allowed" }, { status: 405 });
  }

  try {
    const body = await request.json();
    console.log("Incoming eSewa Data:", body);

    // Extract necessary fields
    const { transactionUuid, totalAmount, productCode, productId, quanity } =
      body;

    if (!transactionUuid || !productCode || !totalAmount || !productId) {
      console.error("Validation failed:", {
        transactionUuid,
        totalAmount,
        productCode,
        productId,
        quanity,
      });
      return json({ error: "Invalid request data" }, { status: 400 });
    }

    // Check if the transaction already exists (to prevent duplicates)
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

    // Check if the product exists and has enough stock before creating an order
    const existingProduct = await prisma.product.findUnique({
      where: { id: parseInt(productId) },
      select: { id: true, stock: true },
    });

    if (!existingProduct) {
      console.error("Product not found:", productId);
      return json({ error: "Product not found" }, { status: 404 });
    }

    if (existingProduct.stock <= 0) {
      console.error("Stock unavailable for product:", productId);
      return json({ error: "Product out of stock" }, { status: 400 });
    }

    // Start transaction: Update stock & create order (all in one transaction)
    const [updatedProduct, newOrder] = await prisma.$transaction([
      prisma.product.update({
        where: { id: parseInt(productId) },
        data: { stock: { decrement: parseInt(quanity) } },
        select: { id: true, stock: true },
      }),
      prisma.order.create({
        data: {
          transactionUuid,
          productId: parseInt(productId),
          totalAmount: parseFloat(totalAmount.replace(",", "")),
          quantity: parseInt(quanity),
          status: "completed",
        },
      }),
    ]);

    console.log("Order created:", newOrder);
    console.log("Product stock updated:", updatedProduct);

    return json({
      message: "Order placed successfully",
      order: newOrder,
      updatedStock: updatedProduct.stock,
    });
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
