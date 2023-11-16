"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { FormWrapper } from "@/app/components/FormWrapper";
import { TextInput, Button } from "@/app/components/ui";

const ForgotPasswordComponent = () => {
  const [state, setState] = useState({
    email: "",
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
        placeHolderText="Email"
        placeholder="Enter Your Email"
        required
        type="email"
        value={state.email}
        onChange={changeHandler}
      />
      <Button>Send Reset Link</Button>
    </FormWrapper>
  );
};

export default ForgotPasswordComponent;
