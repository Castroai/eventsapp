import MainForm from "@/app/components/CreateEventForm";
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
  const countOfDraftEvents = await prisma.event.count({
    where: {
      organizerId: { equals: session?.user?.id },
      AND: {
        status: {
          equals: "DRAFT",
        },
      },
    },
  });

  console.log(event);
  if (countOfDraftEvents >= 1 && event === undefined) {
    return (
      <DashboardLayout>
        <>
          <p>You have draft event</p>
          <div className="flex gap-2">
            <div>
              <button className="btn btn-primary">Continue</button>
            </div>
            <div>
              <button className="btn btn-secondary">Create a new one</button>
            </div>
          </div>
        </>
      </DashboardLayout>
    );
  } else if (event) {
    return (
      <DashboardLayout>
        <MainForm progressStep={event && event.progressStep} />
      </DashboardLayout>
    );
  }
};
export default CreateEventPage;
