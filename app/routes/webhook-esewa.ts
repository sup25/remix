import { json } from "@remix-run/node";
import prisma from "~/_lib/db";

export const action = async ({ request }: { request: Request }) => {
  if (request.method !== "POST") {
    return json({ error: "Method Not Allowed" }, { status: 405 });
  }

  try {
    const body = await request.json();
    console.log("Incoming eSewa Data:", body);

    // Extract necessary fields directly from body
    const { transactionUuid, totalAmount, productCode, productId } = body;

    if (!transactionUuid || !productCode || isNaN(totalAmount)) {
      console.error("Validation failed:", {
        transactionUuid,
        totalAmount,
        productCode,
      });
      return json({ error: "Invalid request data" }, { status: 400 });
    }

    // Check if the product exists before updating stock
    console.log(
      "Checking product before update - Product ID:",
      productId,
      typeof productId
    );
    const existingProduct = await prisma.product.findUnique({
      where: { id: parseInt(productId) },
      select: { id: true, stock: true },
    });

    if (!existingProduct) {
      console.error("Product not found:", productId);
      return json({ error: "Product not found" }, { status: 404 });
    }

    console.log("Current product stock:", existingProduct.stock);

    // Reduce stock for the product
    try {
      const updatedProduct = await prisma.product.update({
        where: {
          id: parseInt(productId),
        },
        data: {
          stock: {
            decrement: 1,
          },
        },
        select: {
          id: true,
          stock: true,
        },
      });

      console.log("Product successfully updated:", updatedProduct);

      return json({
        message: "Stock updated successfully",
        previousStock: existingProduct.stock,
        updatedStock: updatedProduct.stock,
      });
    } catch (dbError) {
      console.error("Database update error:", dbError);
      return json(
        {
          error: "Failed to update product stock",
          details: dbError instanceof Error ? dbError.message : "Unknown error",
        },
        { status: 500 }
      );
    }
  } catch (error) {
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
