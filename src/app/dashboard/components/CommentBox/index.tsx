import { commentOnEvent } from "@/app/actions";

export const CommentBox = ({ eventId }: { eventId: number }) => {
  const commentOnEventWithId = commentOnEvent.bind(null, eventId);
  return (
    <form action={commentOnEventWithId}>
      <textarea
        className="textarea textarea-bordered"
        name="comment"
        id="comment"
        placeholder="Awesome"
      ></textarea>
      <button type="submit">Submit</button>
    </form>
  );
};
