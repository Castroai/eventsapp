"use client";
import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { WithData } from "../context/DataContext";
import Link from "next/link";

export default function Dashboard() {
  const { results, fetchAllEvents } = WithData();
  useEffect(() => {
    fetchAllEvents({
      user: "me",
    });
  }, []);
  return (
    <DashboardLayout>
      <div className="p-4 flex flex-col gap-4">
        <div className="card">
          <div className="flex flex-col gap-2">
            <h1 className="text-md">Start Selling Tickets today</h1>
            <div>
              <Link href={"/dashboard/create"}>
                <button className="btn btn-primary">Create New Event</button>
              </Link>
            </div>
          </div>
        </div>

        {/*  */}
        <div className="card"></div>
      </div>
    </DashboardLayout>
  );
}
