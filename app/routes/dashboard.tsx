import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  let user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  return json({ user });
};

export default function Dashboard() {
  const { user } = useLoaderData<{ user: { email: string; name: string } }>();

  return (
    <div>
      <h1>Welcome to your dashboard!</h1>
      {user ? (
        <div>
          <h2>User Information</h2>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>No user information available.</p>
      )}
    </div>
  );
}
