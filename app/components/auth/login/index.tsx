import { useForm } from "react-hook-form";
import { useFetcher, FetcherWithComponents } from "@remix-run/react";

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
    <div className="flex flex-col py-10 bg-white">
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email</label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,

                message: "Invalid email address",
              },
            })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>

        <button type="submit" disabled={fetcher.state === "submitting"}>
          {fetcher.state === "submitting" ? "Logging in..." : "Login"}
        </button>

        {fetcher.data?.error && (
          <div className="error">{fetcher.data.error}</div>
        )}
      </form>
    </div>
  );
}
