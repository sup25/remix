import { useForm } from "react-hook-form";
import { useFetcher, FetcherWithComponents, Link } from "@remix-run/react";

interface LoginFormData {
  email: string;
  password: string;
}

interface UserData {
  id: number;
  name: string;
  email: string;
}

interface LoginResponse {
  user?: UserData;
  error?: string;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const fetcher: FetcherWithComponents<LoginResponse> = useFetcher();

  const onSubmit = (data: LoginFormData) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    fetcher.submit(formData, {
      method: "post",
      action: "/login",
    });
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] section flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Login</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="space-y-1">
            <label className="block text-sm font-medium">Email</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <span className="text-sm text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <span className="text-sm text-red-500">
                {errors.password.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={fetcher.state === "submitting"}
            className="w-full py-2 px-4 border border-black rounded-md text-sm font-medium bg-black text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {fetcher.state === "submitting" ? "Logging in..." : "Login"}
          </button>

          {fetcher.data?.error && (
            <div className="mt-4 p-3 bg-red-50 text-red-500 rounded-md text-sm">
              {fetcher.data.error}
            </div>
          )}
        </form>

        <div className="mt-8 text-center">
          <Link to="/register" className="text-sm hover:underline">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
