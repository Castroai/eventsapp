import { Event } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export const EventCard = (i: Event & { attending?: boolean }) => {
  const date = new Date(i.date);

  return (
    <Link
      href={`/events/${i.slug}`}
      className="card card-compact w-96 bg-base-100 shadow-xl"
    >
      <figure className="relative h-full w-full ">
        <Image
          className="object-fill"
          width={400}
          height={400}
          src={i.imgUrl!}
          alt="Picture of the author"
          priority
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{i.eventName}</h2>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {date.toDateString()} | {i.location}
        </p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </Link>
  );
};
