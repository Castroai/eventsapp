import { EditorComponent } from "../../WYSIWYGEditor";
import AutocompleteInput from "../../AutoCompleteInput";
import { ChangeEvent, useEffect, useState } from "react";

const EventNameChecker = () => {
  const [eventName, setEventName] = useState<string>();
  const [isAvailable, setIsAvailable] = useState<boolean>(true);

  const handler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEventName(value);
  };

  const checkEventAvailability = async (name: string) => {
    try {
      const formData = new FormData();
      formData.set("eventName", name);
      const response = await fetch(`/api/event/available`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setIsAvailable(data.isAvailable);
    } catch (error) {
      console.error("Error checking event availability:", error);
    }
  };
  useEffect(() => {
    if (eventName) {
      checkEventAvailability(eventName);
    } else {
      setIsAvailable(true); // Reset the availability status if eventName is empty
    }
  }, [eventName]);

  return (
    <div className="form-control">
      <input
        name="eventName"
        id="eventName"
        type="text"
        required
        value={eventName}
        onChange={handler}
        placeholder="Event Name"
        className="input input-bordered"
      />
      {!isAvailable && (
        <p className="error-message">
          Event name is already taken. Please choose another one.
        </p>
      )}
    </div>
  );
};

export const CreateEvent = ({ next }: { next: () => void }) => {
  const [submitting, setSubmitting] = useState(false);

  const [errors, setErrors] = useState<[{ [key: string]: string }]>();
  const onSubmit = async (formData: FormData) => {
    setSubmitting(true);
    const response = await fetch("/api/event", {
      method: "POST",
      body: formData,
    });
    const status = response.status;
    console.log(status);
    if (status === 500) {
      const error = await response.json();
      setErrors(error.error);
    } else {
      next();
    }
  };

  return (
    <div className="card  bg-base-100 shadow-xl">
      <form className="card-body" action={onSubmit}>
        <div className="max-w-md" id="fileUpload">
          {JSON.stringify(errors)}
          <div className="mb-2 block">
            <label htmlFor="file" /> Upload File <label />
          </div>
          <input
            name="file"
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
            id="file"
          />
        </div>
        {/* <div>
          <div className="mb-2 block">
            <label htmlFor="eventName">Event Name</label>
          </div>
          <input
            className="input input-bordered w-full max-w-xs"
            name="eventName"
            id="eventName"
            placeholder="Dance till the sun comes out"
            required
            type="text"
          />
        </div> */}
        <EventNameChecker />
        <div>
          <div className="mb-2 block">
            <label htmlFor="autocomplete">Location</label>
          </div>
          <AutocompleteInput />
        </div>

        <div>
          <div className="mb-2 block">
            <label htmlFor="date">Time & Date</label>
          </div>
          <input
            className="input input-bordered w-full max-w-xs"
            type="date"
            id="date"
            required
            name="date"
            title="Time & Date"
          />
        </div>
        <div>
          <div className="mb-2 block">
            <label htmlFor="description">Description</label>
          </div>
          <EditorComponent />
        </div>
        <div>
          <input type="checkbox" className="toggle" />
        </div>
        <div className="flex gap-4">
          <div>
            <button
              className="flex w-full btn btn-primary disabled:bg-gray-400"
              type="submit"
            >
              Submit
            </button>
          </div>
          <div>
            <button
              className="flex w-full btn btn-secondary"
              color="light"
              type="button"
            >
              Save
            </button>
            {/* Style this message */}
            {/* <p>{state?.message}</p> */}
          </div>
        </div>
      </form>
    </div>
  );
};
