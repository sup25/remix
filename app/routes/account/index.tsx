import { LoaderFunction, json } from "@remix-run/node";
import { authenticator } from "~/.server/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request).catch(() => null);
  return json({ user });
};
