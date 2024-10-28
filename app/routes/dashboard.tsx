import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { authenticator } from "~/.server/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  let user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  return json({ user });
};

export default function Dashboard() {
  const { user } = useLoaderData<{ user: { email: string; name: string } }>();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/logout");
  };

  return (
    <div>
      <h1>Welcome to your dashboard!</h1>
      {user ? (
        <div>
          <h2>User Information</h2>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>

          <button onClick={handleLogout} className="btn">
            Logout
          </button>
        </div>
      ) : (
        <p>No user information available.</p>
      )}
    </div>
  );
}
