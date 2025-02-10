import { LoaderFunction, json } from "@remix-run/node";
import { LoadProducts } from "~/.server/services/products";

export const loader: LoaderFunction = async () => {
  try {
    const products = await LoadProducts();
    return json({ products });
  } catch (error) {
    console.error("Error in loader:", error);
    return json({ error: "Failed to fetch products" }, { status: 500 });
  }
};
