import MainForm from "@/app/components/CreateEventForm";
import DashboardLayout from "@/app/components/Layouts/DashboardLayout";
import { authOptions } from "@/app/lib/auth";
import prisma from "@/app/lib/db";
import { getServerSession } from "next-auth";
import Link from "next/link";
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
  const draftEventst = await prisma.event.findMany({
    where: {
      organizerId: { equals: session?.user?.id },
      AND: {
        status: {
          equals: "DRAFT",
        },
      },
    },
  });

  if (draftEventst.length >= 1 && event === undefined) {
    return (
      <DashboardLayout>
        <>
          <p>You have draft events</p>
          <div className="flex gap-2">
            <div>
              {draftEventst.map((event) => {
                return (
                  <div className="card card-bordered p-2" key={event.id}>
                    <p className="card-title">{event.eventName}</p>
                    <div className="card-body">
                      <Link
                        href={`/dashboard/create/?event=${event.id}`}
                        className="btn btn-primary"
                      >
                        Continue
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      </DashboardLayout>
    );
  } else if (event) {
    return (
      <DashboardLayout>
        <MainForm
          progressStep={event && event.progressStep}
          eventId={event.id}
        />
      </DashboardLayout>
    );
  }
};
export default CreateEventPage;
