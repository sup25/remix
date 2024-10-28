import { LoaderFunction } from "@remix-run/node";
import { authenticator } from "~/.server/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  return authenticator.logout(request, { redirectTo: "/" });
};
