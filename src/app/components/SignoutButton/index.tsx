"use client";
import { signOut } from "next-auth/react";

export const SignOutButton = () => (
  <button onClick={() => signOut()}>Log out</button>
);
