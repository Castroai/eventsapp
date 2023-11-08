import DefaultNavbar from "./Navbar";
import DefaultFooter from "./Footer";
import { ReactNode } from "react";

export const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <header>
        <DefaultNavbar />
      </header>
      <main className="flex flex-1 h-full">{children}</main>
      <div className=" bg-neutral text-neutral-content">
        <DefaultFooter />
      </div>
    </>
  );
};
