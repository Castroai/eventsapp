import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "./provider";
import { SearchWrapper } from "./context/SearchContext";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Events App",
  description: "Find The Best Events",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-screen flex flex-col`}>
        <NextAuthProvider>
          <SearchWrapper>
            <div className="flex-1">{children}</div>
            <Analytics />
          </SearchWrapper>
        </NextAuthProvider>
      </body>
    </html>
  );
}
