import DashboardLayout from "@/app/components/DashboardLayout";
import AutocompleteInput from "@/app/components/AutoCompleteInput";
import { createNewEvent } from "@/app/actions";
import { EditorComponent } from "@/app/components/Editor";

const CreateEventPage = () => {
  return (
    <DashboardLayout>
      <div className="card w-3/4 bg-base-100 shadow-xl">
        <form action={createNewEvent} className="card-body	">
          <div className="max-w-md" id="fileUpload">
            <div className="mb-2 block">
              <label htmlFor="file" />
              Upload File
              <label />
            </div>
            <input
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
                type="submit"
                className="flex w-full btn btn-primary"
                color="light"
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
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};
export default CreateEventPage;
