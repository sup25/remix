import { useLoaderData } from "@remix-run/react";
import { GetProductByBrand as loader } from "../api";
import { TProduct } from "~/components/schema/types";
import Brand from "~/modules/brand";

export { loader };

export default function BrandData() {
  const brandData = useLoaderData<TProduct[]>();
  return <Brand brandData={brandData} />;
}
