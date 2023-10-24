"use client";
import { ReactNode, createContext, useContext, useEffect } from "react";
import { useSearchHook } from "../hooks/SearchHook";
import { Event } from "@prisma/client";
import { Wrapper } from "@googlemaps/react-wrapper";
interface ContextInterface {
  results: Event[];
  searchEvents: ({ lat, long }: { lat: number; long: number }) => Promise<void>;
}
const Context = createContext<ContextInterface>({} as ContextInterface);
export const SearchWrapper = ({ children }: { children: ReactNode }) => {
  const { results, searchEvents, loading } = useSearchHook();

  useEffect(() => {}, []);
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Context.Provider
      value={{
        results,
        searchEvents,
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

export const WithSearch = () => useContext(Context);
