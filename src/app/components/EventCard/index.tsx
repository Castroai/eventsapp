"use client";
import HttpService from "@/app/lib/prisma";
import { Event } from "@prisma/client";
import { Button } from "flowbite-react";
const httpInstance = new HttpService();
export const EventCard = (i: Event & { attending?: boolean }) => {
  const attend = async (eventId: number) => {
    return await httpInstance.attendEvent({ eventId });
  };

  return (
    <div>
      <ul>
        <li>Name: {i.eventName}</li>
        <li> Date by : {i.date.toDateString()}</li>
        <li> STATUS : {i.status}</li>
        <Button
          disabled={i.attending === undefined}
          onClick={() => attend(i.id)}
        >
          {i.attending ? "Attending" : "Intrested"}
        </Button>
        <li>Address: {i.location}</li>
      </ul>
    </div>
  );
};
