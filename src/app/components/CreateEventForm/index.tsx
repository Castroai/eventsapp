"use client";

import { createNewEvent } from "@/app/actions";
import AutocompleteInput from "../AutoCompleteInput";
import { EventCreateButton } from "../EventCreateButton";
import { EditorComponent } from "../WYSIWYGEditor";
//@ts-ignore
import { experimental_useFormState as useFormState } from "react-dom";
import { useState } from "react";
const CreateEvent = () => {
  const initialState = {
    message: null,
  };
  const [state, formAction] = useFormState(createNewEvent, initialState);

  return (
    <div className="card  bg-base-100 shadow-xl">
      <form action={formAction} className="card-body	">
        <div className="max-w-md" id="fileUpload">
          <div className="mb-2 block">
            <label htmlFor="file" />
            Upload File
            <label />
          </div>
          <input
            name="file"
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
            id="file"
          />
        </div>
        <div>
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
        </div>
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
            <EventCreateButton />
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
            <p>{state?.message}</p>
          </div>
        </div>
      </form>
    </div>
  );
};
const CreateTickets = () => {
  return <div>Create Tickets Form</div>;
};
const FindVenueForm = () => {
  return <div>Find Event Form</div>;
};
const ReviewAndCompletForm = () => {
  return <div>Review Form</div>;
};
interface FormState {
  eventName: string;
  eventLocation: string;
  eventLat: number;
  eventLon: number;
  eventDescription: string;
}

const MainForm = () => {
  const Steps: Record<number, () => JSX.Element> = {
    1: CreateEvent,
    2: CreateTickets,
    3: FindVenueForm,
    4: ReviewAndCompletForm,
  };
  const [current, setCurrent] = useState(1);
  const Next = () => current < 4 && setCurrent((v) => v + 1);
  const Back = () => current > 1 && setCurrent((v) => v - 1);
  const isNextButtonDisabled = current > 4;
  const isBackButtonDisabled = current === 1;
  const Component = Steps[current];

  return (
    <div className="w-full  p-4 flex flex-col justify-center items-center ">
      <div>
        <ul className="steps steps-vertical lg:steps-horizontal">
          <li className="step step-primary">Register</li>
          <li className="step step-primary">Choose plan</li>
          <li className="step">Purchase</li>
          <li className="step">Receive Product</li>
        </ul>
      </div>
      <div className="w-full p-4">
        <Component />
        <button className="btn" disabled={isNextButtonDisabled} onClick={Next}>
          Next
        </button>
        <button className="btn" disabled={isBackButtonDisabled} onClick={Back}>
          Back
        </button>
      </div>
    </div>
  );
};
export default MainForm;
