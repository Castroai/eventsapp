"use client";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Datepicker } from "flowbite-react";
import { Label, TextInput, Button, Textarea } from "flowbite-react";
import HttpService from "@/app/lib/prisma";
import { Confirmation } from "../Confirmation";
import { options } from "@/app/lib/gplaces";

const instance = new HttpService();

export const NewEventForm = ({
  setOpenModal,
}: {
  setOpenModal: Dispatch<SetStateAction<string | undefined>>;
}) => {
  const initialValue = {
    date: "",
    location: "",
    eventName: "",
    description: "",
    lat: 0,
    long: 0,
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
    setTimeout(() => {
      setOpenModal(undefined);
    }, 2000);
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
      console.log(selectedPlace);
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
    <div>
      <form
        onSubmit={submitHandler}
        className="flex max-w-full w-full flex-col gap-4"
      >
        {/*  */}
        <input
          type="file"
          onChange={(e) => {
            fileHandler(e.target.files);
          }}
        />
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
            onSelectedDateChanged={(date) => {
              console.log(date);
              setForm((current) => ({
                ...current,
                date: new Date(date).toISOString(),
              }));
            }}
          />
        </div>
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
  );
};
