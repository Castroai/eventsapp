import { EventCard } from "../EventCard";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { findClosestEvents } from "@/app/lib/geo";
import prisma from "@/app/lib/db";

export const EventsGrid = async ({
  location,
}: {
  location?: {
    lat: number;
    long: number;
  };
}) => {
  let allItems;
  const session = await getServerSession(authOptions);
  const items = await findClosestEvents(location);
  if (session && session.user) {
    const prismaUser = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      include: {
        eventsAttending: {},
      },
    });
    // All events that user is attending
    const eventIdAttending = prismaUser!.eventsAttending.map((i) => i.eventId);
    // create a new array, with a key in each object attending
    allItems = items.map((item) => {
      if (eventIdAttending.includes(item.id)) {
        return {
          ...item,
          attending: true,
        };
      } else {
        return {
          ...item,
          attending: false,
        };
      }
    });
  } else {
    allItems = items;
  }
  return (
    <div className="grid md:grid-cols-4 gap-4  ">
      {allItems.map((i, index) => {
        return <EventCard key={i.id} {...i} />;
      })}
    </div>
  );
};
