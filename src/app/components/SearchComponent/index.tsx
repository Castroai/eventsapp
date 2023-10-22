"use client";

import axios from "axios";
import { Button, TextInput } from "flowbite-react";
import { FormEvent, useState } from "react";

export const SearchComponent = () => {
  const [address, setAddress] = useState("");
  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const res = await axios.post("/event/search", {
      address,
    });
  };
  return (
    <form onSubmit={submitHandler} className="flex gap-4 w-full">
      <TextInput
        className="w-full"
        placeholder="Enter Your Address"
        value={address}
        onChange={(e) => {
          setAddress(e.target.value);
        }}
      />
      <Button type="submit">Search</Button>
    </form>
  );
};
