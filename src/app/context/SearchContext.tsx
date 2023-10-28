"use client";
import { ReactNode, createContext, useContext, useEffect } from "react";
import { useSearchHook } from "../hooks/SearchHook";
import { Event } from "@prisma/client";
import { Wrapper } from "@googlemaps/react-wrapper";
import { Spinner } from "flowbite-react";
import { Flowbite } from "flowbite-react";

interface ContextInterface {
  results: Event[];
  searchEvents: ({ lat, long }: { lat: number; long: number }) => Promise<void>;
}
const Context = createContext<ContextInterface>({} as ContextInterface);
export const SearchWrapper = ({ children }: { children: ReactNode }) => {
  const { results, searchEvents, loading } = useSearchHook();

  useEffect(() => {}, []);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner aria-label="Default status example" size="xl" />
      </div>
    );
  }

  return (
    <Context.Provider
      value={{
        results,
        searchEvents,
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
