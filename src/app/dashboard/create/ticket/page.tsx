"use client";
import MainForm from "@/app/components/CreateEventForm";
import { CreateTicket } from "@/app/components/CreateEventForm/CreateTicket";
import DashboardLayout from "@/app/components/Layouts/DashboardLayout";
import { z } from "zod";

const schema = z.object({
  event: z.number(),
});
const TicketForm = ({
  params,
  searchParams,
}: {
  params: unknown;
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  console.log(params);
  const data = schema.parse({
    event: parseInt(searchParams.event as string),
  });
  return (
    <DashboardLayout>
      <MainForm>
        <CreateTicket eventId={data.event} />
      </MainForm>
    </DashboardLayout>
  );
};

export default TicketForm;
