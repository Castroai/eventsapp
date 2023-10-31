"use client";
import DashboardLayout from "@/app/components/DashboardLayout";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import {
  Label,
  TextInput,
  Button,
  Textarea,
  FileInput,
  Datepicker,
} from "flowbite-react";
import HttpService from "@/app/lib/httpservice";
import { options } from "@/app/lib/gplaces";
import { Confirmation } from "@/app/components/Confirmation";
import { ToggleSwitch } from "flowbite-react";
import { TicketComponent } from "@/app/api/SellTicketsFormComponent";

const instance = new HttpService();

const CreateEventPage = () => {
  const [sellTickets, setSellTickets] = useState(false);
  const [ticketState, setTicketState] = useState();
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
      <div className="w-full p-4 flex flex-col  ">
        <div className="w-3/4">
          <form
            onSubmit={submitHandler}
            className="flex max-w-full w-full flex-col gap-4"
          >
            <div className="max-w-md" id="fileUpload">
              <div className="mb-2 block">
                <Label htmlFor="file" value="Upload file" />
              </div>
              <FileInput
                helperText="A  picture to show in the card for your guests 200X200"
                id="file"
                onChange={(e) => {
                  fileHandler(e.target.files);
                }}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="eventName" value="Event Name" />
              </div>
              <TextInput
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
                <Label htmlFor="autocomplete" value="Location" />
              </div>
              <TextInput
                ref={inputRef}
                name="location"
                id="autocomplete"
                placeholder="Location"
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="date" value="Time & Date" />
              </div>
              <Datepicker
                id="date"
                name="date"
                title="Time & Date"
                value={new Date(form.date).toDateString()}
                onSelectedDateChanged={(date) => {
                  setForm((current) => ({
                    ...current,
                    date: new Date(date).toISOString(),
                  }));
                }}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="description" value="Description" />
              </div>
              <Textarea
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
              <ToggleSwitch
                checked={sellTickets}
                label="Sell tickets"
                onChange={setSellTickets}
              />
            </div>
            {sellTickets && (
              <TicketComponent
                setTicketState={setTicketState}
                ticketState={ticketState}
              />
            )}
            <div className="flex gap-4">
              <Button className="flex w-full" type="submit">
                Submit
              </Button>
              <Button
                onClick={(e) => submitHandler(e, "DRAFT")}
                className="flex w-full"
                color="light"
                type="button"
              >
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};
export default CreateEventPage;
