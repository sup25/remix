import { json } from "@remix-run/node";
import prisma from "~/_lib/db";

export const productsLoader = async () => {
  const products = await prisma.product.findMany();
  return json({ products });
};
