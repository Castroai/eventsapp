"use client";
import { FormWrapper } from "@/app/components/FormWrapper";
import { TextInput, Button } from "@/app/components/ui";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";

export const RegisterFormComponent = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setState((current) => ({ ...current, [name]: value }));
  };

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
  };
  return (
    <FormWrapper onSubmit={submitHandler}>
      <TextInput
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
      <TextInput
        placeHolderText="Confirm Password"
        className="p-2 border border-gray-800 rounded-md"
        placeholder="Confirm Password"
        type="passwordConfirm"
        name="passwordConfirm"
        id="passwordConfirm"
        required
        value={state.passwordConfirm}
        onChange={changeHandler}
      />
      <Button type="submit">Register</Button>
      <div className="">
        <Link href={"/login"}>Login Instead</Link>
      </div>
    </FormWrapper>
  );
};
