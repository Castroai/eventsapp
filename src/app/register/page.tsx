"use client";
import Link from "next/link";
import { SignInBUtton } from "../components/SignInButton";
import { ChangeEvent, FormEvent, useState } from "react";
import { signIn } from "next-auth/react";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    firstName: "",
    lastName: "",
  });

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormState((current) => ({ ...current, [name]: value }));
  };
  const register = async (e: FormEvent) => {
    e.preventDefault();
    console.log(formState);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({
          name: ` ${formState.firstName} ${formState.lastName}`,
          email: formState.email,
          password: formState.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setLoading(false);
      if (!res.ok) {
        setError((await res.json()).message);
        return;
      }

      signIn(undefined, { callbackUrl: "/" });
    } catch (error: any) {
      setLoading(false);
      setError(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      <form
        onSubmit={register}
        className="flex flex-col gap-4 card card-bordered w-auto h-auto justify-center items-center  shadow-xl p-4  "
      >
        <div>
          <p className="text-lg font-semibold">Create an account</p>
        </div>
        <div>
          <p className="font-medium">Use your social account to register</p>
          <SignInBUtton />
        </div>

        <div className="flex gap-4">
          <div className="form-control w-full max-w-xs">
            <label htmlFor="firstName" className="label">
              <span className="label-text">First name</span>
            </label>
            <input
              value={formState.firstName}
              type="text"
              placeholder="John"
              className="input input-bordered w-full max-w-xs"
              required
              id="firstName"
              name="firstName"
              onChange={changeHandler}
            />
          </div>
          <div className="form-control w-full ">
            <label htmlFor="lastName" className="label">
              <span className="label-text">Last name</span>
            </label>
            <input
              value={formState.lastName}
              type="text"
              placeholder="Doe"
              className="input input-bordered w-full max-w-xs"
              required
              id="lastName"
              name="lastName"
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <div className="form-control w-full">
            <label htmlFor="email" className="label">
              <span className="label-text">What is your email?</span>
            </label>
            <input
              type="email"
              value={formState.email}
              placeholder="someone@gmail.com"
              className="input input-bordered w-full "
              required
              id="email"
              name="email"
              onChange={changeHandler}
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Enter your password</span>
            </label>
            <input
              value={formState.password}
              type="password"
              placeholder="Enter Password"
              className="input input-bordered w-full"
              required
              id="password"
              name="password"
              onChange={changeHandler}
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Confirm your password</span>
            </label>
            <input
              value={formState.passwordConfirm}
              onChange={changeHandler}
              type="password"
              placeholder="Confirm Password"
              className="input input-bordered w-full"
              required
              id="passwordConfirm"
              name="passwordConfirm"
            />
          </div>
          <div className="w-full">
            <button type="submit" className="btn btn-primary w-full">
              Register
            </button>
          </div>
        </div>
        <Link href={"/register"}>Don't have an account</Link>
      </form>
    </div>
  );
};

export default RegisterPage;
