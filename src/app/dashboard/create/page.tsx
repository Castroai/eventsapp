import MainForm from "@/app/components/CreateEventForm";
import { CreateEvent } from "@/app/components/CreateEventForm/CreateEvent";
import DashboardLayout from "@/app/components/Layouts/DashboardLayout";
import { authOptions } from "@/app/lib/auth";
import prisma from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { z } from "zod";

const schema = z.object({
  event: z.number().optional(),
});

const CreateEventPage = async ({
  params,
  searchParams,
}: {
  params: any;

  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const session = await getServerSession(authOptions);
  const data = schema.parse({
    event: searchParams.event && parseInt(searchParams.event as string),
  });
  const event =
    data.event &&
    (await prisma.event.findUniqueOrThrow({
      where: {
        id: data.event,
        AND: {
          organizerId: session?.user?.id,
          AND: {
            status: "DRAFT",
          },
        },
      },
    }));

  return (
    <DashboardLayout>
      <MainForm>{<CreateEvent eventId={event && event.id} />}</MainForm>
    </DashboardLayout>
  );
};
export default CreateEventPage;
