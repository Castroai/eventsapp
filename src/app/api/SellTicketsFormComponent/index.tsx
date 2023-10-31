"use client";
import { WithData } from "@/app/context/DataContext";
import HttpService from "@/app/lib/httpservice";
import { Card } from "flowbite-react";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Spinner } from "flowbite-react";

const instance = new HttpService();

export const TicketComponent = ({
  setTicketState,
  ticketState,
}: {
  setTicketState: Dispatch<SetStateAction<undefined>>;
  ticketState: undefined;
}) => {
  const { stripeStatus, loading, fetchStatus } = WithData();

  useEffect(() => {
    fetchStatus();
  }, []);

  return (
    <Card>
      {loading ? (
        <>
          <Spinner />
        </>
      ) : (
        <>
          <p className="text-lg">Sell Tickets </p>
          {stripeStatus && stripeStatus.details_submitted ? (
            <div></div>
          ) : (
            <div>
              <p>First Set up your stripe account</p>
              <Link href={"/dashboard/account"}>By Clicking here</Link>
            </div>
          )}
        </>
      )}
    </Card>
  );
};
