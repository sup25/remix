import { useLoaderData } from "@remix-run/react";
import { getProduct as loader } from "./api";
import SingleProduct from "~/components/singleProduct";

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
      <SingleProduct product={product} />
    </div>
  );
}
