import { createEvent, createVenue } from "@/app/actions";
import AutocompleteInput from "@/app/components/AutoCompleteInput";

export const SelectVenue = ({ eventId }: { eventId: number }) => {
  const createVenuetWithId = createVenue.bind(null, eventId);
  return (
    <div className="w-1/2">
      <form action={createVenuetWithId} className="flex flex-col gap-5">
        <div className="form-control">
          <div>
            <label htmlFor="autocomplete-input">Address</label>
          </div>
          <AutocompleteInput />
        </div>
        <div>
          <button className="btn btn-primary">Next</button>
        </div>
      </form>
    </div>
  );
};
