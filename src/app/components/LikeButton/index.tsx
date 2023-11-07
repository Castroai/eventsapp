"use client";
import { likeEvent } from "@/app/actions";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
export const LikeButton = ({
  eventId,
  attending,
}: {
  eventId: number;
  attending?: boolean;
}) => {
  const likeEventWithId = likeEvent.bind(null, eventId);
  return (
    <form action={likeEventWithId}>
      {attending === true ? (
        <button
          onClick={(e) => {
            e.stopPropagation();
          }}
          type="submit"
        >
          <AiFillLike className="w-5 h-5" />
        </button>
      ) : (
        <button
          onClick={(e) => {
            e.stopPropagation();
          }}
          type="submit"
        >
          <AiOutlineLike className="w-5 h-5" />
        </button>
      )}
    </form>
  );
};
