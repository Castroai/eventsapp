import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import { Datepicker } from "flowbite-react";
import { Label, TextInput, Button, Textarea } from "flowbite-react";
import HttpService from "@/app/lib/prisma";
import { Confirmation } from "../Confirmation";

const instance = new HttpService();

export const NewEventForm = ({
  setOpenModal,
}: {
  setOpenModal: Dispatch<SetStateAction<string | undefined>>;
}) => {
  const initialValue = {
    date: new Date(),
    location: "",
    eventName: "",
    description: "",
  };
  const [form, setForm] = useState(initialValue);
  const [successOrFail, setSuccessOrFail] = useState<"SUCCESS" | "FAIL" | null>(
    null
  );

  const submitHandler = async (e: FormEvent, status = "PUBLISHED") => {
    try {
      e.preventDefault();
      await instance.createEvent({ ...form, status: status });
      setSuccessOrFail("SUCCESS");
      setTimeout(() => {
        setOpenModal(undefined);
      }, 2000);
    } catch (error) {
      setSuccessOrFail("FAIL");
      setTimeout(() => {
        setOpenModal(undefined);
      }, 2000);
    }
  };
  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;
    setForm((current) => ({ ...current, [name]: value }));
  };
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
  return (
    <div>
      <form
        onSubmit={submitHandler}
        className="flex max-w-full w-full flex-col gap-4"
      >
        {/*  */}
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
            <Label htmlFor="location" value="Location" />
          </div>
          <TextInput
            name="location"
            id="location"
            placeholder="Location"
            required
            type="text"
            value={form.location}
            onChange={changeHandler}
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
              setForm((current) => ({ ...current, date: date }));
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
