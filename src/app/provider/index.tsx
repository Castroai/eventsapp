"use client";

import { Wrapper } from "@googlemaps/react-wrapper";
import { SessionProvider } from "next-auth/react";

type Props = {
  children?: React.ReactNode;
};

export const NextAuthProvider = ({ children }: Props) => {
  return (
    <SessionProvider>
      <Wrapper
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
        libraries={["places"]}
      >
        <main className="flex flex-col h-screen">{children}</main>
      </Wrapper>
    </SessionProvider>
  );
};
