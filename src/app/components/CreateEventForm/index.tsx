"use client";
import { useState } from "react";
import { CreateEvent } from "./CreateEvent";
import { CreateTicket } from "./CreateTicket";

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

const MainForm = ({
  progressStep,
  eventId,
}: {
  progressStep?: number | null;
  eventId?: number;
}) => {
  const [current, setCurrent] = useState(
    typeof progressStep === "number" ? progressStep + 1 : 1
  );
  const Next = () => current < 4 && setCurrent((v) => v + 1);
  const Back = () => current > 1 && setCurrent((v) => v - 1);
  const isNextButtonDisabled = current > 4;
  const isBackButtonDisabled = current === 1;

  const Steps: Record<
    number,
    ({
      next,
      back,
      isNextButtonDisabled,
      eventId,
    }: {
      next: () => void;
      back: () => void;
      isNextButtonDisabled: boolean;
      eventId: number | undefined;
    }) => JSX.Element
  > = {
    1: ({ next, back, isNextButtonDisabled, eventId }) =>
      CreateEvent({ next, isNextButtonDisabled, eventId }),
    2: ({ next, back }) => CreateTicket({ next, back }),
    3: FindVenueForm,
    4: ReviewAndCompletForm,
  };
  const Component = Steps[current];

  return (
    <div className="w-full  p-4 flex flex-col justify-center items-center ">
      <div>
        <ul className="steps steps-vertical lg:steps-horizontal">
          <li className={`step ${current === 1 && "step-primary"}`}>
            Event Info
          </li>
          <li className={`step ${current === 2 && "step-primary"}`}>
            Ticket Info
          </li>
          <li className={`step ${current === 3 && "step-primary"}`}>
            Find a venue
          </li>
          <li className={`step ${current === 4 && "step-primary"}`}>
            Preview and submit
          </li>
        </ul>
      </div>
      <div className="w-full p-4">
        <Component
          next={Next}
          back={Back}
          isNextButtonDisabled={isNextButtonDisabled}
          eventId={eventId}
        />
      </div>
    </div>
  );
};
export default MainForm;
