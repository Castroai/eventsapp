import MainForm from "@/app/components/CreateEventForm";
import DashboardLayout from "@/app/components/Layouts/DashboardLayout";
import { z } from "zod";

const schema = z.object({
  event: z.number(),
});
const VenueForm = ({
  params,
  searchParams,
}: {
  params: unknown;
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const data = schema.parse({
    event: parseInt(searchParams.event as string),
  });
  return (
    <DashboardLayout>
      <MainForm>
        <div>Venue Form</div>
      </MainForm>
    </DashboardLayout>
  );
};

export default VenueForm;
