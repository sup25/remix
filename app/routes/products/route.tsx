import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import prisma from "~/_lib/db";
import ProductCard from "~/components/productCard";
import { Product } from "../../components/types";

export const loader: LoaderFunction = async () => {
  const products = await prisma.product.findMany();
  return json({ products });
};

export default function ProductsPage() {
  const { products } = useLoaderData<{ products: Product[] }>();

  return (
    <div>
      <h1>Products</h1>
      <div className="flex flex-wrap gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
