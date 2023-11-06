import DefaultNavbar from "./Navbar";
import DefaultFooter from "./Footer";
import { ReactNode } from "react";

export const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <header>
        <DefaultNavbar />
      </header>
      <main className="flex">{children}</main>
      <div className="bg-neutral">
        <DefaultFooter />
      </div>
    </>
  );
};
