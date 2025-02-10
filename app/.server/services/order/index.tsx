import prisma from "~/_lib/db";

export const checkExistingOrder = async (transactionUuid: string) => {
  return prisma.order.findUnique({
    where: { transactionUuid },
  });
};

export const createSingleOrder = async ({
  userId,
  transactionUuid,
  totalAmount,
  productId,
  quantity,
}: {
  userId: string;
  transactionUuid: string;
  totalAmount: string;
  productId: string;
  quantity: string;
}) => {
  const productIdParsed = parseInt(productId);
  const quantityParsed = parseInt(quantity);

  // Fetch the product and check stock
  const product = await prisma.product.findUnique({
    where: { id: productIdParsed },
    select: { id: true, stock: true },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  if (product.stock < quantityParsed) {
    throw new Error("Insufficient stock");
  }

  // Create the order and handle stock update in a transaction
  return await prisma.$transaction(async (tx) => {
    const order = await tx.order.create({
      data: {
        userId: parseInt(userId),
        transactionUuid,
        totalAmount: parseFloat(totalAmount.replace(",", "")),
        status: "completed",
      },
    });

    // Update stock
    await tx.product.update({
      where: { id: productIdParsed },
      data: { stock: { decrement: quantityParsed } },
    });

    // Create order item
    await tx.orderItem.create({
      data: {
        orderId: order.id,
        productId: productIdParsed,
        quantity: quantityParsed,
      },
    });

    return order;
  });
};

export const createCartOrder = async ({
  userId,
  transactionUuid,
  totalAmount,
  formattedCart,
}: {
  userId: string;
  transactionUuid: string;
  totalAmount: string;
  formattedCart: { productId: string; quantity: string }[];
}) => {
  const productIds = formattedCart.map((item) => parseInt(item.productId));

  // Fetch all products
  const existingProducts = await prisma.product.findMany({
    where: { id: { in: productIds } },
    select: { id: true, stock: true },
  });

  const productStockMap = new Map(existingProducts.map((p) => [p.id, p.stock]));

  // Check stock availability for each product in the cart
  for (const item of formattedCart) {
    const productId = parseInt(item.productId);
    const quantity = parseInt(item.quantity);
    const availableStock = productStockMap.get(productId);

    if (availableStock === undefined || availableStock < quantity) {
      throw new Error(`Product ${productId} out of stock`);
    }
  }

  // Create order for the cart items
  return await prisma.$transaction(async (tx) => {
    const order = await tx.order.create({
      data: {
        userId: parseInt(userId),
        transactionUuid,
        totalAmount: parseFloat(totalAmount.replace(",", "")),
        status: "completed",
      },
    });

    // Update stock and create order items for each product
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

    return order;
  });
};
