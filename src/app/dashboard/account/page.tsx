"use client";
import axios from "axios";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/app/components/DashboardLayout";

export default function AccountPage() {
  const router = useRouter();

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const { data } = await axios.post("/api/account");
    router.push(data.url);
  };
  return (
    <DashboardLayout>
      <div>
        <div>Account Page</div>
        <div>Setup Stripe Account</div>
        <form onSubmit={submitHandler}>
          <button type="submit">Create Stripe Account</button>
        </form>
      </div>
    </DashboardLayout>
  );
}
