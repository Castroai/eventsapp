"use client";
import HttpService from "@/app/lib/prisma";
import { Event } from "@prisma/client";
import { Button, Card } from "flowbite-react";
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
    <Card
      renderImage={() => (
        <Image
          src={i.imgUrl!}
          width={500}
          height={500}
          alt="Picture of the author"
        />
      )}
    >
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {i.eventName}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {date.toDateString()} | {i.location}
      </p>
      <Button disabled={res === undefined} onClick={() => attend(i.id)}>
        {res ? "Attending" : "Intrested"}
      </Button>
    </Card>
  );
};
