"use client";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/app/components/DashboardLayout";
import { Button, Card } from "flowbite-react";
import { useSession } from "next-auth/react";
import Stripe from "stripe";

export default function AccountPage() {
  const router = useRouter();
  const session = useSession();
  const user = session.data?.user;
  if (user) {
    console.log(user);
  }
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<Stripe.Account>();
  const fetchStatus = async () => {
    setLoading(true);
    const { data } = await axios.get("/api/account/status");
    setStatus(data);
    setLoading(false);
    return;
  };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const { data } = await axios.post("/api/account");
    router.push(data.url);
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  if (loading) {
    return <div>Loading....</div>;
  }

  return (
    <DashboardLayout>
      <div className="p-4">
        <Card>
          <div>
            <p className="text-lg">Setup Stripe Account</p>
            <p className="text-sm">
              In order to receive payments from your ticket sales, you will need
              to set up an account with stripe our payment processor.
            </p>
          </div>
          <div>
            <p> Current Status of details_submitted :</p>
            <p>{status && JSON.stringify(status.details_submitted)}</p>
          </div>
          <form onSubmit={submitHandler}>
            <Button type="submit">Create Stripe Account</Button>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
}
