import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Product } from "../../components/types";
import Products from "~/components/products";
import { LoadProducts } from "~/.server/loader/productsLoader";

export const loader: LoaderFunction = LoadProducts;

export default function ProductsPage() {
  const { products } = useLoaderData<{ products: Product[] }>();
  return <Products products={products} />;
}
