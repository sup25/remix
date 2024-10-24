import { authenticator } from "~/services/auth.server";
import { LoaderFunction, json } from "@remix-run/node";
import { HiUser } from "react-icons/hi2";
/* export const loader: LoaderFunction = async ({ request }) => {
    let user = await authenticator.isAuthenticated(request, {
      failureRedirect: "/login",
    });
    return json({ user });
  }; */

const Account = () => {
  return (
    <div className=" cursor-pointer rounded-md p-2 transition-all duration-300 ease-in-out hover:bg-gray-200">
      <HiUser size={25} />
    </div>
  );
};

export default Account;
