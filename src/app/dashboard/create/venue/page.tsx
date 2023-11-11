import MainForm from "@/app/dashboard/create/components/FormLayout";
import DashboardLayout from "@/app/components/Layouts/DashboardLayout";
import { z } from "zod";
import { SelectVenue } from "../components/SelectVenue";

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
        <SelectVenue eventId={data.event} />
      </MainForm>
    </DashboardLayout>
  );
};

export default VenueForm;
