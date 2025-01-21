import { useLoaderData } from "@remix-run/react";
import { getProduct as loader } from "../api";
import SingleProduct from "~/components/singleProduct";
import { IProduct } from "../components/schema/Proudct.schema";
export { loader };

export default function ProductPage() {
  const product = useLoaderData<IProduct>();

  return <SingleProduct product={product} />;
}
