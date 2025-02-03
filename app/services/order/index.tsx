import prisma from "~/_lib/db";
import { Product } from "~/types/Product";

export const reserveStock = async (productId: number, quantity: number) => {
  console.log("reserveStock called with:", { productId, quantity });

  try {
    return await prisma.$transaction(async (tx) => {
      console.log("Starting transaction...");

      // Lock the product row to prevent race conditions
      const product = await tx.$queryRaw<Product[]>`
        SELECT * FROM "Product" 
        WHERE id = ${productId} 
        FOR UPDATE
      `;

      console.log("Fetched product from DB:", product);

      // Check if product exists and stock is sufficient
      if (!product || product.length === 0) {
        console.error("Product not found:", { productId });
        throw new Error("Product not found.");
      }

      if (product[0].stock < quantity) {
        console.error("Insufficient stock:", {
          stock: product[0].stock,
          requested: quantity,
        });
        throw new Error("Insufficient stock to reserve.");
      }

      console.log("Stock is available. Reserving stock...");

      // Optional: Log successful reservation
      console.log("Stock reserved successfully:", {
        productId,
        reservedQuantity: quantity,
      });

      return { message: "Stock reserved successfully", product };
    });
  } catch (error) {
    console.error("Error in reserveStock:", error);
    throw error;
  }
};
