import type { MetaFunction } from "@remix-run/node";

import { RootState } from "~/context/store";
import { useSelector } from "react-redux";
export const meta: MetaFunction = () => {
  return [
    { title: "Task Trek | Work Made Easy" },
    {
      name: "description",
      content:
        "Manage tasks and collaborate in real time with role-based access and smart analytics for enhanced productivity.",
    },
  ];
};

export default function Index() {
  const user = useSelector((state: RootState) => state.user.user);
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <div>
        <h1>Welcome to the Home Page</h1>
        {isAuthenticated ? (
          <div>
            <h2>Hello, {user.name}!</h2>
            <p>Your email: {user.email}</p>
          </div>
        ) : (
          <p>Please log in to see your information.</p>
        )}
      </div>
    </div>
  );
}
