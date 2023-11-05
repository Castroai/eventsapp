import { Event } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export const EventCard = (i: Event & { attending?: boolean }) => {
  const date = new Date(i.date);

  return (
    <Link
      href={`/events/${i.slug}`}
      passHref
      className="max-w-sm mx-auto bg-white rounded-xl overflow-hidden shadow-lg card card-bordered h-full"
    >
      <div className="relative h-64">
        <Image
          className="object-cover w-full h-full"
          src={i.imgUrl!}
          alt="Event Image"
          layout="fill"
        />
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-800">{i.eventName}</h2>
        <p className="mt-2 text-gray-600">
          {date.toDateString()} | {i.location}
        </p>
        <div className="mt-4 flex justify-end">
          <button className="px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200">
            Buy Now
          </button>
        </div>
      </div>
    </Link>
  );
};
