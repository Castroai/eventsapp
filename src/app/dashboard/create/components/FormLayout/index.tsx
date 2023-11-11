"use client";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";

interface CreatEventProps {
  children: ReactNode;
}
const MainForm = ({ children }: CreatEventProps) => {
  const path = usePathname();
  return (
    <div className="w-full  p-4 flex flex-col justify-center items-center ">
      <div>
        <ul className="steps steps-vertical lg:steps-horizontal">
          <li
            className={`step ${path === "/dashboard/create" && "step-primary"}`}
          >
            Event Info
          </li>
          <li
            className={`step ${
              path === "/dashboard/create/ticket" && "step-primary"
            }`}
          >
            Ticket Info
          </li>
          <li
            className={`step ${
              path === "/dashboard/create/venue" && "step-primary"
            }`}
          >
            Find a venue
          </li>
          <li
            className={`step ${
              path === "/dashboard/create/confirm" && "step-primary"
            }`}
          >
            Preview and submit
          </li>
        </ul>
      </div>
      <div className="w-full p-4 flex justify-center items-center">
        {children}
      </div>
    </div>
  );
};
export default MainForm;
