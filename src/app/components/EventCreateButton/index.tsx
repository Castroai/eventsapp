"use client";
//@ts-ignore
import { experimental_useFormStatus as useFormStatus } from "react-dom";

export const EventCreateButton = () => {
  const { pending } = useFormStatus();

  return (
    <button type="submit" aria-disabled={pending}>
      Submit
    </button>
  );
};
