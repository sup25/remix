import { json, LoaderFunction } from "@remix-run/node";

import {
  getProductByCategory,
  getProductBySlug,
  getSerchBarProducts,
} from "~/.server/services/products";

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
export const GetProductByCategory: LoaderFunction = async ({ params }) => {
  const { category } = params;
  if (!category) {
    throw new Response("Not Found", { status: 404 });
  }
  const categoryArray = category.split(",");
  const products = await getProductByCategory(categoryArray);

  if (!products || products.length === 0) {
    throw new Response("Products not found", { status: 404 });
  }

  return json(products);
};

export const ShowProductFromSearchBar: LoaderFunction = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const searchQuery = url.searchParams.get("query") || "";
    const products = await getSerchBarProducts(searchQuery);
    return products;
  } catch (error) {
    console.error("Error loading products:", error);
    return json({ products: [] }, { status: 500 });
  }
};
