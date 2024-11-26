import { useLoaderData } from "@remix-run/react";
import { getProduct as loader } from "./api";
import SingleProduct from "~/modules/singleProduct";
import { ProductProp } from "../components/types";
export { loader };

export default function ProductPage() {
  const product = useLoaderData<ProductProp>();

  return <SingleProduct product={product} />;
}
