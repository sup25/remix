import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import prisma from "~/_lib/db";
import ProductCard from "~/components/productCard";

export const loader: LoaderFunction = async () => {
  const products = await prisma.product.findMany();
  return json({ products });
};

export default function ProductsPage() {
  const { products } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>Products</h1>
      <div className="flex flex-wrap gap-4">
        {products.map((product: any) => (
          <ProductCard
            key={product.id}
            product={{
              slug: product.slug,
              title: product.title,
              brand: product.brand,
              price: product.price,
              stock: product.stock,
              images: product.images,
              discountTag: product.discountTag,
            }}
          />
        ))}
      </div>
    </div>
  );
}
