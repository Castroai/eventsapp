"use client";
import { likeEvent } from "@/app/actions";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
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
          <AiFillHeart />
        </button>
      ) : (
        <button
          onClick={(e) => {
            e.stopPropagation();
          }}
          type="submit"
        >
          <AiOutlineHeart />
        </button>
      )}
    </form>
  );
};
