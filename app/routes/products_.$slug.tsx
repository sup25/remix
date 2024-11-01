import { useLoaderData } from "@remix-run/react";
import { getProduct as loader } from "./api";

export { loader };
interface Product {
  id: number;
  title: string;
  brand: string;
  price: number;
  stock: number;
  discountTag?: number | null;
  images: string[];
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
  slug: string;
}
export default function ProductPage() {
  const product = useLoaderData<Product>();

  return (
    <div>
      <h1>{product?.title ?? "Product not found"}</h1>
      <p>{product?.description ?? "No description available"}</p>
      <p>Price: ${product?.price ?? "N/A"}</p>
    </div>
  );
}
