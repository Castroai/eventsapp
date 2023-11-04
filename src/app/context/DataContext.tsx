"use client";
import { ReactNode, createContext, useContext } from "react";
import { useDataHook } from "../hooks/DataHook";
import { Event } from "@prisma/client";
import { Wrapper } from "@googlemaps/react-wrapper";
import Stripe from "stripe";

interface ContextInterface {
  results: Event[];
  searchEvents: ({ lat, long }: { lat: number; long: number }) => Promise<void>;
  fetchAllEvents: (
    params?:
      | {
          user: string;
        }
      | undefined
  ) => Promise<void>;
  loading: boolean;
  fetchStatus: () => Promise<void>;
  stripeStatus: Stripe.Account | undefined;
}
const Context = createContext<ContextInterface>({} as ContextInterface);
export const DataWrapper = ({ children }: { children: ReactNode }) => {
  const {
    results,
    searchEvents,
    loading,
    fetchAllEvents,
    fetchStatus,
    stripeStatus,
  } = useDataHook();

  return (
    <Context.Provider
      value={{
        results,
        searchEvents,
        fetchAllEvents,
        loading,
        fetchStatus,
        stripeStatus,
      }}
    >
      <Wrapper
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
        libraries={["places"]}
      >
        {children}
      </Wrapper>
    </Context.Provider>
  );
};

export const WithData = () => useContext(Context);
