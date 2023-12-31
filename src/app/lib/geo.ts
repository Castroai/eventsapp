import prisma from "./db";

interface Coordinates {
  lat: number;
  long: number;
}

export async function findClosestEvents(target?: Coordinates) {
  const allEvents = await prisma.event.findMany({
    where: {
      status: {
        equals: "PUBLISHED",
      },
    },
    include: {
      _count: {
        select: { comments: true, users: true, tickets: true },
      },
    },
  });
  if (target) {
    const eventsWithDistance = allEvents.map((event) => {
      const distance = calculateDistance(target, {
        lat: event.lat ? event.lat : 0,
        long: event.long ? event.long : 0,
      });
      return { ...event, distance };
    });

    eventsWithDistance.sort((a, b) => a.distance - b.distance);
    return eventsWithDistance;
  } else {
    return allEvents;
  }
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
