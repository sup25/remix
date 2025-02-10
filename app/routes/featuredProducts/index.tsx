import { LoaderFunction } from "@remix-run/node";
import { LoadProducts } from "~/.server/loader/productsLoader";

export const loader: LoaderFunction = LoadProducts;
