import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { authenticator } from "~/.server/auth.server";
import ShowUserBookmarks from "~/modules/dashboard/bookmarks";

export const loader: LoaderFunction = async ({ request }) => {
  let user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  return json({ user });
};

export default function Dashboard() {
  const { user } = useLoaderData<{
    user: { email: string; name: string; address: string };
  }>();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/logout");
  };

  return (
    <div className="section min-h-screen ">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <div className="flex justify-end items-end mb-8">
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Logout
            </button>
          </div>

          {user ? (
            <div className="space-y-6 w-full">
              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                  User Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-sm text-gray-500 mb-1">Name</p>
                    <p className="text-lg font-medium text-gray-800">
                      {user.name}
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-sm text-gray-500 mb-1">Email</p>
                    <p className="text-lg font-medium text-gray-800">
                      {user.email}
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-sm text-gray-500 mb-1">Address</p>
                    <p className="text-lg font-medium text-gray-800">
                      {user.address}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex w-full">
                <ShowUserBookmarks />
              </div>
            </div>
          ) : (
            <div className="bg-yellow-50 rounded-xl p-6">
              <p className="text-yellow-800">No user information available.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
