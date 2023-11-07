"use client";
import DashboardLayout from "@/app/components/Layouts/DashboardLayout";
import AutocompleteInput from "@/app/components/AutoCompleteInput";
import { createNewEvent } from "@/app/actions";
import { EditorComponent } from "@/app/components/WYSIWYGEditor";
import { EventCreateButton } from "@/app/components/EventCreateButton";
//@ts-ignore
import { experimental_useFormState as useFormState } from "react-dom";
const initialState = {
  message: null,
};
const CreateEventPage = () => {
  const [state, formAction] = useFormState(createNewEvent, initialState);

  return (
    <DashboardLayout>
      <div className="card w-3/4 bg-base-100 shadow-xl">
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
    </DashboardLayout>
  );
};
export default CreateEventPage;
