"use client";
import { WithData } from "@/app/context/DataContext";
import HttpService from "@/app/lib/httpservice";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect } from "react";

const instance = new HttpService();

export const TicketComponent = ({
  setTicketState,
  ticketState,
}: {
  setTicketState: Dispatch<
    SetStateAction<{
      price: number;
      quantity: number;
    }>
  >;
  ticketState: {
    price: number;
    quantity: number;
  };
}) => {
  const { stripeStatus, loading, fetchStatus } = WithData();

  useEffect(() => {
    fetchStatus();
  }, []);

  return (
    <div className="card">
      {loading ? (
        <>
          <p>Loading...</p>
        </>
      ) : (
        <>
          <p className="text-lg">Sell Tickets </p>
          {stripeStatus && stripeStatus.details_submitted ? (
            <div className="flex flex-col gap-2">
              <div>
                <div className="mb-2 block">
                  <label htmlFor="price">Price</label>
                </div>
                <input
                  className="input"
                  name="price"
                  id="price"
                  value={ticketState.price}
                  type="number"
                  placeholder="9.99"
                  onChange={(e) =>
                    setTicketState((current) => ({
                      ...current,
                      price: parseFloat(e.target.value),
                    }))
                  }
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <label htmlFor="quantity">Quantity</label>
                </div>
                <input
                  name="quantity"
                  id="quantity"
                  value={ticketState.quantity}
                  type="number"
                  placeholder="9.99"
                  onChange={(e) =>
                    setTicketState((current) => ({
                      ...current,
                      quantity: parseInt(e.target.value),
                    }))
                  }
                />
              </div>
            </div>
          ) : (
            <div>
              <p>First Set up your stripe account</p>
              <Link href={"/dashboard/account"}>By Clicking here</Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};
