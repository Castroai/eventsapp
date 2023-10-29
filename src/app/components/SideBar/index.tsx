"use client";

import { Sidebar } from "flowbite-react";
import { HiChartPie } from "react-icons/hi";

export default function SideBar() {
  return (
    <Sidebar aria-label="Default sidebar example" className="h-full">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/dashboard/" icon={HiChartPie}>
            <p>My Events</p>
          </Sidebar.Item>
          <Sidebar.Item href="/dashboard/account" icon={HiChartPie}>
            <p>My Account</p>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
