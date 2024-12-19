import { useLoaderData } from "@remix-run/react";
import { GetProductByCategory as loader } from "../api";
import CollectionPage from "~/components/collection";
import { TProduct } from "~/components/schema/types";

export { loader };

export default function CollectionCategory() {
  const collectionData = useLoaderData<TProduct[]>();
  return <CollectionPage collectionData={collectionData} />;
}
