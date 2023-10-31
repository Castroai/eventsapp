"use client";
import HttpService from "@/app/lib/httpservice";
import { Event } from "@prisma/client";
import { Button, Card } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
const httpInstance = new HttpService();
export const EventCard = (i: Event & { attending?: boolean }) => {
  const [res, setRes] = useState(i.attending);
  const attend = async (eventId: number) => {
    const { data } = await httpInstance.attendEvent({ eventId });
    setRes(data.attending);
  };

  const date = new Date(i.date);

  return (
    <Link
      href={`/events/${i.slug}`}
      className="hover:cursor-pointer hover:shadow-xl hover:shadow-gray-100"
    >
      <Card className="h-96" onClick={() => {}}>
        <div className="relative h-48 w-full ">
          <Image
            src={i.imgUrl!}
            layout="fill"
            objectFit="cover"
            alt="Picture of the author"
            priority
          />
        </div>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {i.eventName}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {date.toDateString()} | {i.location}
        </p>
        <div>
          <button disabled={res === undefined} onClick={() => attend(i.id)}>
            {res ? <AiFillHeart /> : <AiOutlineHeart />}
          </button>
        </div>
      </Card>
    </Link>
  );
};
