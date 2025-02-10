import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useFetcher, useNavigate } from "@remix-run/react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loading } from "~/components/loading";

interface RegisterFormData {
  name: string;
  email: string;
  address: string;
  password: string;
  confirmPassword: string;
}
interface RegisterResponse {
  error?: string;
  success: string;
}

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<RegisterFormData>();

  const fetcher = useFetcher<RegisterResponse>();
  const password = watch("password");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const onSubmit = (data: RegisterFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("address", data.address);

    fetcher.submit(formData, {
      method: "post",
      action: "/register",
    });
  };

  useEffect(() => {
    if (fetcher.state === "idle") {
      reset();
    }
    if (fetcher.data?.success) {
      toast.success(fetcher.data.success);
    } else if (fetcher.data?.error) {
      toast.error(fetcher.data.error);
    }
  }, [fetcher.state, reset, fetcher.data]);

  return (
    <div className="min-h-screen section flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Register</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="space-y-1">
            <label className="block text-sm font-medium">Name</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <span className="text-sm text-red-500">
                {errors.name.message}
              </span>
            )}
          </div>

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
            <label className="block text-sm font-medium">Address</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
              {...register("address", {
                required: "Address is required",
                pattern: {
                  value: /^[a-zA-Z0-9\s,.'-]{3,}$/,
                  message: "Please enter a valid address",
                },
              })}
            />
            {errors.address && (
              <span className="text-sm text-red-500">
                {errors.address.message}
              </span>
            )}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium">Password</label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute inset-y-0 right-3 flex items-center"
              >
                {passwordVisible ? (
                  <BsEye className="w-5 h-5 text-gray-500" />
                ) : (
                  <BsEyeSlash className="w-5 h-5 text-gray-500" />
                )}
              </button>
            </div>
            {errors.password && (
              <span className="text-sm text-red-500">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "The passwords do not match",
                })}
              />
              <button
                type="button"
                onClick={() =>
                  setConfirmPasswordVisible(!confirmPasswordVisible)
                }
                className="absolute inset-y-0 right-3 flex items-center"
              >
                {confirmPasswordVisible ? (
                  <BsEye className="w-5 h-5 text-gray-500" />
                ) : (
                  <BsEyeSlash className="w-5 h-5 text-gray-500" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <span className="text-sm text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full h-10 py-2 px-4 border border-black rounded-md text-sm font-medium bg-black text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {fetcher.state === "submitting" ? (
              <Loading size={20} />
            ) : (
              "Register"
            )}
          </button>
        </form>
        <div className="mt-8 text-center">
          <Link to="/login" className="text-sm hover:underline">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
}
