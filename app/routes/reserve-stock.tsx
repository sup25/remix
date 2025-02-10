import { json } from "@remix-run/node";
import { reserveStock } from "~/services/order";

export const action = async ({ request }: { request: Request }) => {
  try {
    const formData = await request.formData();
    const productId = Number(formData.get("productId"));
    const quantity = Number(formData.get("quantity"));

    if (!productId || !quantity) {
      return json(
        { error: "Invalid product ID or quantity." },
        { status: 400 }
      );
    }

    const result = await reserveStock(productId, quantity);
    return json({ success: true, message: result.message });
  } catch (error: unknown) {
    console.error("Error reserving stock:", error);

    return json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 400 }
    );
  }
};
