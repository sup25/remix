import { authenticator } from "~/.server/auth.server";
import { ActionFunctionArgs, json } from "@remix-run/node";
import Login from "~/components/auth/login";

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    return await authenticator.authenticate("form", request, {
      successRedirect: "/dashboard",
      throwOnError: true,
    });
  } catch (error) {
    if (error instanceof Error) {
      return json({ error: "Invalid email or password" }, { status: 401 });
    }

    return error;
  }
};

const LoginUser = () => {
  return (
    <div>
      <Login />
    </div>
  );
};

export default LoginUser;
