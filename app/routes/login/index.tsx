import { authenticator } from "~/.server/auth.server";
import { ActionFunctionArgs } from "@remix-run/node";
import Login from "~/components/auth/login";

export const action = async ({ request }: ActionFunctionArgs) => {
  return await authenticator.authenticate("form", request, {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
  });
};

const LoginUser = () => {
  return (
    <div>
      <Login />
    </div>
  );
};

export default LoginUser;
