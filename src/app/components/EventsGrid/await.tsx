import { authOptions } from "@/app/lib/auth";
import prisma from "@/app/lib/db";
import { Event } from "@prisma/client";
import { getServerSession } from "next-auth";

export type ItemsWithCount = Event & {
  _count: {
    comments: number;
  };
};

export default async function Await<T>({
  promise,
  children,
}: {
  promise: Promise<ItemsWithCount[]>;
  children: (value: ItemsWithCount[]) => JSX.Element;
}) {
  let allItems;
  const session = await getServerSession(authOptions);
  let events = await promise;
  if (session?.user) {
    const prismaUser = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      include: {
        eventsAttending: {},
      },
    });
    // All events that user is attending
    const eventIdAttending = prismaUser?.eventsAttending.map((i) => i.eventId);
    // create a new array, with a key in each object attending
    allItems = events.map((item) => {
      if (eventIdAttending?.includes(item.id)) {
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
    allItems = events;
  }
  return children(allItems);
}
