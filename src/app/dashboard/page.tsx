import DashboardLayout from "../components/DashboardLayout";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import prisma from "../lib/db";
export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  const data = await prisma.event.findMany({
    where: {
      status: {
        equals: "PUBLISHED",
      },
      AND: {
        organizerId: {
          equals: session!.user!.id,
        },
      },
    },
    include: {
      users: {
        select: {
          userId: true,
        },
      },
    },
  });
  const eventsWithLikesCount = data.map((event) => {
    return {
      ...event,
      numberOfLikes: event.users.length,
    };
  });
  return (
    <DashboardLayout>
      <div className="p-4 flex flex-col gap-4">
        <div className="card">
          <div className="flex flex-col gap-2">
            <h1 className="text-md">Start Selling Tickets today</h1>
            <div>
              <Link href={"/dashboard/create"}>
                <button className="btn btn-primary">Create New Event</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Locatiom</th>
                </tr>
              </thead>
              <tbody>
                {eventsWithLikesCount.map((event) => {
                  return (
                    <tr key={event.id}>
                      <th>{event.id}</th>
                      <td>{event.eventName}</td>
                      <td>{event.location}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
