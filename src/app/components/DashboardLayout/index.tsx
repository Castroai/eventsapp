import { ReactNode } from "react";
import SideBar from "../SideBar";
export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-full">
      <div className="flex h-full">
        <SideBar />
        {children}
      </div>
    </div>
  );
}
