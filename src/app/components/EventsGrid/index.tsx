import { EventCard } from "../EventCard";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { findClosestEvents } from "@/app/lib/geo";
import prisma from "@/app/lib/db";
import { Event } from "@prisma/client";

export const EventsGrid = async ({ allItems }: { allItems: Event[] }) => {
  return (
    <div className="grid md:grid-cols-3 gap-4  ">
      {allItems.map((i, index) => {
        return <EventCard key={i.id} {...i} />;
      })}
    </div>
  );
};
