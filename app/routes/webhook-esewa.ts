import { json } from "@remix-run/node";
import {
  checkExistingOrder,
  createSingleOrder,
  createCartOrder,
} from "~/.server/services/order";

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
    const existingOrder = await checkExistingOrder(transactionUuid);
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
      // Handle cart order
      await createCartOrder({
        userId,
        transactionUuid,
        totalAmount,
        formattedCart,
      });
      console.log("Cart order placed and product stocks updated");
    } else if (productId && quantity) {
      // Handle single product order
      await createSingleOrder({
        userId,
        transactionUuid,
        totalAmount,
        productId,
        quantity,
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
