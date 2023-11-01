import { Event } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export const EventCard = (i: Event & { attending?: boolean }) => {
  const date = new Date(i.date);

  return (
    <Link
      href={`/events/${i.slug}`}
      className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <div className="h-96">
        <div className="relative h-48 w-full ">
          <Image
            className="object-fill"
            width={400}
            height={400}
            src={i.imgUrl!}
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
        <div></div>
      </div>
    </Link>
  );
};
