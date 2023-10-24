import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { Event } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
interface Coordinates {
  lat: number;
  long: number;
}

interface A extends Event {
  distance: number;
}
async function findClosestEvents(target: Coordinates): Promise<A[]> {
  const allEvents = await prisma.event.findMany();

  const eventsWithDistance = allEvents.map((event) => {
    const distance = calculateDistance(target, {
      lat: event.lat,
      long: event.long,
    });
    return { ...event, distance };
  });

  eventsWithDistance.sort((a, b) => a.distance - b.distance);

  return eventsWithDistance;
}
function calculateDistance(coord1: Coordinates, coord2: Coordinates): number {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = deg2rad(coord2.lat - coord1.lat);
  const dLon = deg2rad(coord2.long - coord1.long);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(coord1.lat)) *
      Math.cos(deg2rad(coord2.lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}
function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

export async function POST(request: Request) {
  const data = await request.json();
  const items = await findClosestEvents(data);
  let allItems;
  const user = await getServerSession(authOptions);
  if (user) {
    const prismaUser = await prisma.user.findUnique({
      where: {
        email: user.user!.email!,
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
        console.log(`found`);
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

  return NextResponse.json(allItems);
}

export async function GET(request: Request) {
  let allItems;
  // All Published Events
  const items = await prisma.event.findMany({
    where: {
      status: {
        equals: "PUBLISHED",
      },
    },
  });
  // Get the current user
  const user = await getServerSession(authOptions);
  console.log(user);
  if (user) {
    const prismaUser = await prisma.user.findUnique({
      where: {
        email: user.user!.email!,
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
        console.log(`found`);
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
  return NextResponse.json(allItems);
}
