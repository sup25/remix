import { json, LoaderFunction } from "@remix-run/node";
import { getProductBySlug } from "~/services/products";

export const getProduct: LoaderFunction = async ({ params }) => {
  const { slug } = params;

  if (!slug) {
    throw new Response("Not Found", { status: 404 });
  }

  const product = await getProductBySlug(slug);

  if (!product) {
    throw new Response("Product not found", { status: 404 });
  }

  return json(product);
};
