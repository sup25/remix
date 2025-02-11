import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useFetcher } from "@remix-run/react";
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
  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    confirmPassword: false,
  });

  const toggleVisibility = (field: "password" | "confirmPassword") => {
    setPasswordVisibility((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const onSubmit = (data: RegisterFormData) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));

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

  const inputFields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      validation: { required: "Name is required" },
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      validation: {
        required: "Email is required",
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Invalid email address",
        },
      },
    },
    {
      name: "address",
      label: "Address",
      type: "text",
      validation: {
        required: "Address is required",
        pattern: {
          value: /^[a-zA-Z0-9\s,.'-]{3,}$/,
          message: "Please enter a valid address",
        },
      },
    },
    {
      name: "password",
      label: "Password",
      type: passwordVisibility.password ? "text" : "password",
      validation: {
        required: "Password is required",
        minLength: {
          value: 6,
          message: "Password must be at least 6 characters",
        },
      },
      toggle: () => toggleVisibility("password"),
      visible: passwordVisibility.password,
    },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      type: passwordVisibility.confirmPassword ? "text" : "password",
      validation: {
        required: "Please confirm your password",
        validate: (value: string) =>
          value === password || "Passwords do not match",
      },
      toggle: () => toggleVisibility("confirmPassword"),
      visible: passwordVisibility.confirmPassword,
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent py-10 md:py-20">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow">
        <h1 className="text-3xl font-bold text-black text-center">Register</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          {inputFields.map(
            ({ name, label, type, validation, toggle, visible }) => (
              <div key={name} className="space-y-1">
                <label className="block text-black text-sm font-medium">
                  {label}
                </label>
                <div className="relative">
                  <input
                    type={type}
                    className="w-full px-3 py-2 border border-gray-300 bg-gray-200 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                    {...register(name as keyof RegisterFormData, validation)}
                  />
                  {toggle && (
                    <button
                      type="button"
                      onClick={toggle}
                      className="absolute inset-y-0 right-3 flex items-center"
                    >
                      {visible ? (
                        <BsEye className="w-5 h-5 text-gray-500" />
                      ) : (
                        <BsEyeSlash className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                  )}
                </div>
                {errors[name as keyof RegisterFormData] && (
                  <span className="text-sm text-red-500">
                    {errors[name as keyof RegisterFormData]?.message}
                  </span>
                )}
              </div>
            )
          )}

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
          <Link to="/login" className="text-sm text-black hover:underline">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
}
