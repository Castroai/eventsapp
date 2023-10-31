"use client";
import { ReactNode, createContext, useContext } from "react";
import { useSearchHook } from "../hooks/SearchHook";
import { Event } from "@prisma/client";
import { Wrapper } from "@googlemaps/react-wrapper";
import { Flowbite } from "flowbite-react";

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
}
const Context = createContext<ContextInterface>({} as ContextInterface);
export const SearchWrapper = ({ children }: { children: ReactNode }) => {
  const { results, searchEvents, loading, fetchAllEvents } = useSearchHook();

  return (
    <Context.Provider
      value={{
        results,
        searchEvents,
        fetchAllEvents,
        loading,
      }}
    >
      <Flowbite>
        <Wrapper
          apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
          libraries={["places"]}
        >
          {children}
        </Wrapper>
      </Flowbite>
    </Context.Provider>
  );
};

export const WithSearch = () => useContext(Context);
