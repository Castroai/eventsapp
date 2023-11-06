import { Event } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export const EventCard = (i: Event & { attending?: boolean }) => {
  const date = new Date(i.date);

  return (
    <Link href={`/events/${i.slug}`} className="rounded-lg p-4 shadow-md">
      <div className="">
        <Image
          priority
          src={i.imgUrl!}
          alt={i.eventName}
          className="rounded-md object-fill"
          width={600}
          height={400}
        />
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-semibold">{i.eventName}</h2>
        <p className="text-gray-600">{date.toDateString()}</p>
        <p className="text-gray-600">{i.location}</p>
        <p className="mt-2">{i.description}</p>
      </div>
    </Link>
  );
};
