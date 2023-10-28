"use client";
import HttpService from "@/app/lib/prisma";
import { Event } from "@prisma/client";
import { Button } from "flowbite-react";
import Image from "next/image";
import { useState } from "react";
const httpInstance = new HttpService();
export const EventCard = (i: Event & { attending?: boolean }) => {
  const [res, setRes] = useState(i.attending);
  const attend = async (eventId: number) => {
    const { data } = await httpInstance.attendEvent({ eventId });
    setRes(data.attending);
  };

  const date = new Date(i.date);

  return (
    <div>
      <ul>
        <li>ID: {i.id}</li>
        <Image
          src={i.imgUrl!}
          width={500}
          height={500}
          alt="Picture of the author"
        />
        <li>Name: {i.eventName}</li>
        <li> Date by : {date.toDateString()}</li>
        <li> STATUS : {i.status}</li>
        <Button disabled={res === undefined} onClick={() => attend(i.id)}>
          {res ? "Attending" : "Intrested"}
        </Button>
        <li>Address: {i.location}</li>
      </ul>
    </div>
  );
};
