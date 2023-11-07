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
  return (
    <form
      action={async (e) => {
        e.append("eventId", `${eventId}`);
        await likeEvent(e);
      }}
    >
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
