import { LoaderFunction } from "@remix-run/node";
import { productsLoader } from "~/.server/loader/productsLoader";

export const loader: LoaderFunction = productsLoader;
