import MainForm from "@/app/dashboard/create/components/FormLayout";
import { CreateEvent } from "@/app/dashboard/create/components/CreateEvent";
import DashboardLayout from "@/app/components/Layouts/DashboardLayout";
import { authOptions } from "@/app/lib/auth";
import prisma from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { z } from "zod";

const schema = z.object({
  event: z.string().optional(),
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
    event: searchParams.event,
  });

  let event;

  if (data.event) {
    event = await prisma.event.findUnique({
      where: {
        id: parseInt(data.event),
        AND: {
          organizerId: session?.user?.id,
          AND: {
            status: "DRAFT",
          },
        },
      },
    });
  }

  return (
    <DashboardLayout>
      <MainForm>{<CreateEvent event={event} />}</MainForm>
    </DashboardLayout>
  );
};
export default CreateEventPage;
