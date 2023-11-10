interface CreateTicketProps {
  next: () => void;
  back: () => void;
}

export const CreateTicket = ({ next, back }: CreateTicketProps) => {
  const submitHandler = () => {};
  return (
    <form className="flex flex-col gap-2 justify-center items-center">
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
      <div className="flex gap-2">
        <div>
          <button className="btn btn-primary" type="submit" onClick={back}>
            Back
          </button>
        </div>
        <div>
          <button className="btn btn-primary" type="submit" onClick={next}>
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};
