"use client";
import Link from "next/link";
import { SignInAuthorizationParams, signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { MainLayout } from "../components/Layouts/MainLayout";

const SignInPage = () => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email: formState.email,
      password: formState.password,
      callbackUrl,
    });
    if (res?.ok) {
      console.log("success");
      return;
    } else {
      // Toast failed
      setError("Failed! Check you input and try again.");
      // return;
      console.log("Failed", res);
    }
    return res;
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormState((current) => ({ ...current, [name]: value }));
  };

  return (
    <div className="flex justify-center items-center h-full">
      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-4 card card-bordered w-96 h-96 justify-center items-center  shadow-xl  "
      >
        <div>
          <p className="text-lg">Welcome back</p>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">What is email?</span>
          </label>
          <input
            onChange={changeHandler}
            value={formState.email}
            type="email"
            placeholder="someone@gmail.com"
            className="input input-bordered w-full max-w-xs"
            required
            id="email"
            name="email"
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Enter Your Password</span>
          </label>
          <input
            value={formState.password}
            type="password"
            onChange={changeHandler}
            placeholder="Enter Password"
            className="input input-bordered w-full max-w-xs"
            required
            id="password"
            name="password"
          />
        </div>
        <div className="w-full max-w-xs">
          <button type="submit" className="btn btn-primary w-full ">
            Login
          </button>
        </div>
        <Link className="link link-primary" href={"/register"}>
          No account ?
        </Link>
        {error && JSON.stringify(error)}
      </form>
    </div>
  );
};

export default SignInPage;
