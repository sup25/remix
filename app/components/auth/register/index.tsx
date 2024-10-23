import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useFetcher } from "@remix-run/react";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData>();
  const fetcher = useFetcher();

  const onSubmit = (data: RegisterFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);

    fetcher.submit(formData, {
      method: "post",
      action: "/register",
    });
  };

  useEffect(() => {
    if (fetcher.state === "submitting") {
      console.log("Submitting form...");
    } else if (fetcher.state === "idle") {
      console.log("Form submitted, resetting form...");
      reset();
    }
  }, [fetcher.state, reset]);

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name</label>
          <input {...register("name", { required: "Name is required" })} />
          {errors.name && <span>{errors.name.message}</span>}
        </div>

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

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
