import { useState } from "react";
import { signIn } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { AdminTypeLogin } from "@/types";

const Login = () => {
  const [error, setError] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdminTypeLogin>();

  const onSubmit: SubmitHandler<AdminTypeLogin> = async (
    data: any
  ): Promise<void> => {
    setError(false);
    if (!hasClicked) {
      try {
        const result = await signIn("credentials", {
          email: data.email.trim(),
          password: data.password,
          redirect: false,
        });

        if (result?.error) {
          setError(true);
          return;
        } else {
          router.push("/dashboard");
        }
      } catch (error) {
        setError(true);
      } finally {
        reset({
          email: "",
          password: "",
        });
      }
    }
  };

  return (
    <div className="height flex flex-col justify-center mx-auto content-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center"
      >
        <div className="input-div">
          <label htmlFor="email" className="profile-form-label">
            Email
          </label>
          <input
            type="text"
            {...register("email", { required: true })}
            id="email"
            className="form-input"
          />
        </div>
        {errors.email && (
          <small className="-mt-4 text-danger">this field is required</small>
        )}

        <div className="input-div">
          <label htmlFor="password" className="profile-form-label">
            Password
          </label>
          <input
            type="password"
            {...register("password", { required: true })}
            id="password"
            className="form-input"
          />
        </div>
        {errors.password && (
          <small className="-mt-4 text-danger">this field is required</small>
        )}
        {error && (
          <div className="bg-color3 p-4 capitalize my-4">
            email or password wrong
          </div>
        )}
        <div className="my-4">
          <button className="btn" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
