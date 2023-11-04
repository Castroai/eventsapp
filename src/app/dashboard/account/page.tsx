"use client";
import { FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/app/components/DashboardLayout";
import { WithData } from "@/app/context/DataContext";
import HttpService from "@/app/lib/httpservice";

const instance = new HttpService();

export default function AccountPage() {
  const router = useRouter();
  const { stripeStatus, fetchStatus } = WithData();

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const { data } = await instance.accountCreate();
    router.push(data.url);
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  return (
    <DashboardLayout>
      <div className="p-4 ">
        <div className="card">
          <div>
            <p className="text-lg">Setup Stripe Account</p>
            <p className="text-sm">
              In order to receive payments from your ticket sales, you will need
              to set up an account with stripe our payment processor.
            </p>
          </div>
          <div>
            <p> Current Status of details_submitted :</p>
            <p>
              {stripeStatus && JSON.stringify(stripeStatus.details_submitted)}
            </p>
          </div>
          <form onSubmit={submitHandler}>
            <button className="btn btn-neutral	" type="submit">
              Create Stripe Account
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
