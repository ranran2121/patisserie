import { useState } from "react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

const Login = () => {
  const [error, setError] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setError(false);
    try {
      const result = await signIn("credentials", {
        email: data.email.trim(),
        password: data.password,
        redirect: false,
      });

      if (result.error) {
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
  };

  return (
    <div className="container flex flex-col justify-center mx-auto content-center">
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
          <small className="form-text text-danger">
            this field is required
          </small>
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
          <small className="form-text text-danger">
            this field is required
          </small>
        )}
        {error && (
          <div className="bg-orange-300 p-4 capitalize">
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
