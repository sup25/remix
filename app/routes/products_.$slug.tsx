import { useLoaderData } from "@remix-run/react";
import { getProduct as loader } from "../Api";

import { IProduct } from "../components/schema/Proudct.schema";
import SingleProduct from "~/modules/singleProduct";
export { loader };

export default function ProductPage() {
  const product = useLoaderData<IProduct>();
  return <SingleProduct product={product} />;
}
