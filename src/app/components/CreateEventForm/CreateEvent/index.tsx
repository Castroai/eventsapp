import { EditorComponent } from "../../WYSIWYGEditor";
import AutocompleteInput from "../../AutoCompleteInput";
import { ChangeEvent, useEffect, useState } from "react";

const EventNameChecker = () => {
  const [eventName, setEventName] = useState<string>();
  const [isAvailable, setIsAvailable] = useState<boolean>();

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
      setIsAvailable(undefined);
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
      {isAvailable === false ? (
        <p className="text-red-300">
          Event name is already taken. Please choose another one.
        </p>
      ) : isAvailable === true ? (
        <p className="text-green-300">Event name is Available.</p>
      ) : null}
    </div>
  );
};

export const CreateEvent = ({
  next,
  isNextButtonDisabled,
}: {
  next: () => void;
  isNextButtonDisabled: boolean;
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<[{ [key: string]: string }]>();
  const onSubmit = async (formData: FormData) => {
    setSubmitting(true);
    formData.set("progressStep", "1");
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
              disabled={isNextButtonDisabled || submitting}
            >
              Submit
            </button>
          </div>
          <div>
            <button
              className="flex w-full btn btn-secondary disabled:bg-gray-400"
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
