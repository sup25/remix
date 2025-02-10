import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { IProduct } from "../../components/schema/Proudct.schema";
import Products from "~/modules/products";
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

export default function ProductsPage() {
  const { products, error } = useLoaderData<{
    products?: IProduct[];
    error?: string;
  }>();

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Products products={products ?? []} />
    </div>
  );
}
