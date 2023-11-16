"use client";
import { FormWrapper } from "@/app/components/FormWrapper";
import { SignInBUtton } from "@/app/components/SignInButton";
import { TextInput, Button } from "@/app/components/ui";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";

export const LoginFormComponent = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setState((current) => ({ ...current, [name]: value }));
  };

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
  };
  return (
    <FormWrapper onSubmit={submitHandler} className="">
      <TextInput
        bottomRightLabel
        placeHolderText="Enter Email"
        placeholder="johndoe@gmail.com"
        type="email"
        name="email"
        id="email"
        required
        value={state.email}
        onChange={changeHandler}
      />

      <TextInput
        placeHolderText="Enter Password"
        placeholder="password"
        type="password"
        name="password"
        id="password"
        required
        value={state.password}
        onChange={changeHandler}
      />

      <Button type="submit">Sign In</Button>
      <div className="">
        <Link href={"/register"}>Make a new account</Link>
      </div>
      <div className="divider">or</div>
      <SignInBUtton />
    </FormWrapper>
  );
};
