"use client";
import DashboardLayout from "@/app/components/DashboardLayout";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import HttpService from "@/app/lib/httpservice";
import { options } from "@/app/lib/gplaces";
import { Confirmation } from "@/app/components/Confirmation";
import { TicketComponent } from "@/app/components/SellTicketsFormComponent";

const instance = new HttpService();

const CreateEventPage = () => {
  const defaultTicketState = {
    price: 0,
    quantity: 0,
  };
  const [sellTickets, setSellTickets] = useState(false);
  const [ticketState, setTicketState] = useState(defaultTicketState);
  const currentDate = new Date();
  const initialValue = {
    date: currentDate.toISOString(),
    location: "",
    eventName: "",
    description: "",
    lat: 0,
    long: 0,
    price: 0,
  };
  const [form, setForm] = useState(initialValue);
  const [file, setFile] = useState<File | null>(null);

  const [successOrFail, setSuccessOrFail] = useState<"SUCCESS" | "FAIL" | null>(
    null
  );

  const submitHandler = async (e: FormEvent, status = "PUBLISHED") => {
    try {
      e.preventDefault();
      const formData = new FormData();
      if (file) {
        formData.set("file", file);
      }
      Object.keys(form).forEach((key) => {
        // @ts-ignore
        formData.append(key, form[key]);
      });
      if (ticketState.price > 0 && ticketState.quantity > 0) {
        formData.append("ticketPrice", ticketState.price.toString());
        formData.append("ticketQuantity", ticketState.quantity.toString());
      }
      await instance.createEvent(formData);
      setSuccessOrFail("SUCCESS");
    } catch (error) {
      setSuccessOrFail("FAIL");
    }
  };
  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const autoCompleteRef = useRef<google.maps.places.Autocomplete>();
  const inputRef = useRef(
    document.getElementById("autocomplete") as HTMLInputElement
  );

  useEffect(() => {
    // Set the Ref to the autocomplete instance
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options
    );
    // Reference the current value
    const autocomplete = autoCompleteRef.current;
    // Add a listener
    autocomplete.addListener("place_changed", () => {
      const selectedPlace = autocomplete.getPlace();

      if (selectedPlace.geometry) {
        const lat = selectedPlace.geometry.location?.lat;
        const long = selectedPlace.geometry.location?.lng;
        if (lat && long) {
          setForm((current) => ({ ...current, lat: lat(), long: long() }));
        }
      }

      setForm((current) => ({
        ...current,
        location: selectedPlace.formatted_address as string,
      }));
    });
    return () => {
      window.google.maps.event.clearInstanceListeners(autocomplete);
    };
  }, []);

  if (successOrFail !== null) {
    return (
      <Confirmation
        type={successOrFail}
        message={
          successOrFail === "SUCCESS"
            ? `${form.eventName} Created Sucessfully`
            : `${form.eventName} Failed`
        }
      />
    );
  }

  const fileHandler = async (files: FileList | null) => {
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  return (
    <DashboardLayout>
      <div className="card w-3/4 bg-base-100 shadow-xl">
        <form onSubmit={submitHandler} className="card-body	">
          <div className="max-w-md" id="fileUpload">
            <div className="mb-2 block">
              <label htmlFor="file" />
              Upload File
              <label />
            </div>
            <input
              className="input input-bordered w-full max-w-xs"
              id="file"
              onChange={(e) => {
                fileHandler(e.target.files);
              }}
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
              value={form.eventName}
              onChange={changeHandler}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <label htmlFor="autocomplete">Location</label>
            </div>
            <input
              className="input input-bordered w-full max-w-xs"
              ref={inputRef}
              name="location"
              id="autocomplete"
              placeholder="Location"
            />
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
              value={new Date(form.date).toDateString()}
              onChange={(e) => {
                setForm((current) => ({
                  ...current,
                  date: new Date(e.target.value).toISOString(),
                }));
              }}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <label htmlFor="description">Description</label>
            </div>
            <textarea
              className="input input-bordered w-full max-w-xs"
              onChange={changeHandler}
              value={form.description}
              name="description"
              id="description"
              placeholder="Description"
              required
              rows={4}
            />
          </div>
          <div>
            <input
              type="checkbox"
              className="toggle"
              checked={sellTickets}
              onChange={(e) => setSellTickets((current) => !current)}
            />
          </div>
          {sellTickets && (
            <TicketComponent
              setTicketState={setTicketState}
              ticketState={ticketState}
            />
          )}
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
                onClick={(e) => submitHandler(e, "DRAFT")}
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
