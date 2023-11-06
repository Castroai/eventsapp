import { commentOnEvent } from "@/app/actions";

export const CommentBox = ({ eventId }: { eventId: number }) => {
  console.log(eventId);
  const submitHandler = async (formdata: FormData) => {
    "use server";
    formdata.append("eventId", `${eventId}`);
    return commentOnEvent(formdata);
  };
  return (
    <form action={submitHandler}>
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
