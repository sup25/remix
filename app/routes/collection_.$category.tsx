import { useLoaderData } from "@remix-run/react";
import { getProductByCategory as loader } from "~/.server/services/products";
import { TProduct } from "~/components/schema/types";
import Collection from "~/modules/collection";

export { loader };

export default function CollectionCategory() {
  const collectionData = useLoaderData<TProduct[]>();
  return <Collection collectionData={collectionData} />;
}
