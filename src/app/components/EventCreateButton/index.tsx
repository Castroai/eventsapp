"use client";
//@ts-ignore
import { experimental_useFormStatus as useFormStatus } from "react-dom";

export const EventCreateButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      className="flex w-full btn btn-primary disabled:bg-gray-400"
      type="submit"
      aria-disabled={pending}
    >
      Submit
    </button>
  );
};