"use client";

import { Sidebar } from "flowbite-react";
import { HiChartPie, HiOutlineMinusSm, HiOutlinePlusSm } from "react-icons/hi";
import { twMerge } from "tailwind-merge";

export default function SideBar() {
  return (
    <Sidebar aria-label="Default sidebar example" className="h-full">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Collapse
            icon={HiChartPie}
            label="Events"
            renderChevronIcon={(theme, open) => {
              const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm;
              return <IconComponent aria-hidden />;
            }}
          >
            <Sidebar.Item href="/dashboard/create/">Create Event</Sidebar.Item>
            <Sidebar.Item href="/dashboard/">My Events</Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Item href="/dashboard/account" icon={HiChartPie}>
            <p>My Account</p>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
