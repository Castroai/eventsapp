"use client";
import Link from "next/link";
import { SignInAuthorizationParams, signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

const SignInPage = () => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/profile";

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    await signIn("credentials", {
      redirect: true,
      email: formState.email,
      password: formState.password,
      callbackUrl,
    });
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
        <Link href={"/register"}>Don't have an account</Link>
      </form>
    </div>
  );
};

export default SignInPage;
