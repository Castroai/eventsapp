import { createTicket } from "@/app/actions";
import Link from "next/link";

interface CreateTicketProps {
  eventId: number;
}

export const CreateTicket = ({ eventId }: CreateTicketProps) => {
  const createTicketWithEvent = createTicket.bind(null, eventId);
  return (
    <form
      action={createTicketWithEvent}
      className="flex flex-col gap-2 justify-center items-center"
    >
      <div className="form-control w-full max-w-xs">
        <label htmlFor="price">Price</label>
        <input
          className={`input input-bordered w-full max-w-xs`}
          type="number"
          required
          name="price"
          placeholder="9.99"
        />
      </div>
      <div className="form-control w-full max-w-xs">
        <label htmlFor="quantity">Quantity</label>
        <input
          id="quantity"
          className={`input input-bordered w-full max-w-xs`}
          type="number"
          required
          name="quantity"
          placeholder="9.99"
        />
      </div>
      <div className="flex gap-2">
        <div>
          <Link
            href={`/dashboard/create?event=${eventId}`}
            className="btn btn-primary"
            type="submit"
          >
            Back
          </Link>
        </div>
        <div>
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};
