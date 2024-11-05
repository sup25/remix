import { useLoaderData } from "@remix-run/react";
import { GetProductByCategory as loader } from "./api";
import CollectionPage from "~/components/collection";
import { Product } from "../components/types";
export { loader };

export default function CollectionCategory() {
  const collectionData = useLoaderData<Product[]>();
  return <CollectionPage collectionData={collectionData} />;
}
