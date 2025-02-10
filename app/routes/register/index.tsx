import { json, redirect } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";
import bcrypt from "bcryptjs";
import { registerUser } from "~/.server/services/register";
import Register from "~/components/auth/register";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const address = formData.get("address");

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof address !== "string"
  ) {
    return json({ error: "Invalid form data" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await registerUser(name, email, address, hashedPassword);
    return json({ success: "Registered successfully" });
  } catch (error) {
    return json(
      {
        error: error instanceof Error ? error.message : "Something went wrong",
      },
      { status: 400 }
    );
  }
};

const RegisterUser = () => {
  return (
    <div>
      <Register />
    </div>
  );
};
export default RegisterUser;
