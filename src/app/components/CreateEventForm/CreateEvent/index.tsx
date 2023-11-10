import { EditorComponent } from "../../WYSIWYGEditor";
import AutocompleteInput from "../../AutoCompleteInput";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Event } from "@prisma/client";

interface CreatEventProps {
  next: () => void;
  isNextButtonDisabled: boolean;
  eventId?: number | undefined;
}
interface CreateEventFormState {
  eventName: string;
  file?: File;
  location?: string | null;
  date?: string | null;
  description?: string | null;
}
export const CreateEvent = ({
  next,
  isNextButtonDisabled,
  eventId,
}: CreatEventProps) => {
  const [formState, setFormState] = useState<CreateEventFormState>({
    eventName: "",
    location: "",
    date: new Date().toISOString(),
    description: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<[{ [key: string]: string }]>();
  const [isAvailable, setIsAvailable] = useState<boolean>();

  const fetchEventData = async (id: number) => {
    const response = await fetch(`/api/event?event=${id}`, {
      method: "GET",
    });
    const data = (await response.json()) as Event;
    setFormState({
      eventName: data.eventName,
      location: data.location,
      date: new Date(data.date!).toISOString(),
      description: data.description,
    });
  };

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
  const onContinue = async (formData: FormData) => {
    setSubmitting(true);
    formData.set("progressStep", "1");
    const response = await fetch("/api/event", {
      method: "PUT",
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

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((currentState) => ({ ...currentState, [name]: value }));
  };

  useEffect(() => {
    if (formState.eventName) {
      checkEventAvailability(formState.eventName);
    } else {
      setIsAvailable(undefined);
    }
  }, [formState.eventName]);

  useEffect(() => {
    if (eventId) {
      fetchEventData(eventId);
    }
  }, [eventId]);

  return (
    <div className="card  bg-base-100 shadow-xl">
      <form className="card-body" action={onSubmit}>
        <div className="max-w-md" id="fileUpload">
          <div className="mb-2 block">
            <label htmlFor="file" /> Upload File <label />
          </div>
          <input
            onChange={(e) => {
              const files = e.target.files;
              if (files && files.length > 0) {
                setFormState((current) => ({ file: files[0], ...current }));
              }
            }}
            name="file"
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
            id="file"
          />
        </div>
        <div className="form-control">
          <div className="mb-2 block">
            <label htmlFor="eventName">Event Name</label>
          </div>
          <input
            name="eventName"
            id="eventName"
            type="text"
            required
            value={formState.eventName}
            onChange={changeHandler}
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
        <div>
          <div className="mb-2 block">
            <label htmlFor="autocomplete-input">Location</label>
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
              Next
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
