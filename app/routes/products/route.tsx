import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { IProduct } from "../../components/schema/Proudct.schema";
import Products from "~/modules/products";
import { LoadProducts } from "~/.server/loader/productsLoader";

export const loader: LoaderFunction = LoadProducts;

export default function ProductsPage() {
  const { products } = useLoaderData<{ products: IProduct[] }>();
  return <Products products={products} />;
}
