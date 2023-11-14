import { commentOnEvent } from "@/app/actions";

export const CommentBox = ({ eventId }: { eventId: number }) => {
  const commentOnEventWithId = commentOnEvent.bind(null, eventId);
  return (
    <form action={commentOnEventWithId}>
      <textarea
        className="textarea textarea-bordered"
        name="comment"
        id="comment"
        placeholder="Comment here"
      ></textarea>
      <br/>
      <button className="badge bg-gray-200" type="submit">Submit</button>
    </form>
  );
};
