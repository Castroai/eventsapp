import { Event } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { LikeButton } from "../LikeButton";
import { AiOutlineComment } from "react-icons/ai";
export const EventCard = (
  i: Event & { attending?: boolean } & {
    _count: {
      comments: number;
    };
  }
) => {
  const date = new Date(i.date);

  return (
    <Link href={`/events/${i.slug}`} className="rounded-lg p-4 shadow-md">
      <div className=" flex flex-col gap-5">
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
      </div>
      <div className="flex items-center justify-between">
        <LikeButton eventId={i.id} attending={i.attending} />
        <div className="flex gap-2">
          <AiOutlineComment className="w-5 h-5" /> {i._count.comments}
        </div>
      </div>
    </Link>
  );
};
