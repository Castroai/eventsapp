import DashboardLayout from "../components/Layouts/DashboardLayout";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import prisma from "../lib/db";
import { Prisma, User, Comment, Event } from "@prisma/client";

const getEventsWithCommentsUsersAndCount = async (
  userId: string | undefined
) => {
  const data = await prisma.event.findMany({
    where: {
      organizerId: {
        equals: userId,
      },
    },
    include: {
      _count: {
        select: {
          users: true,
          comments: true,
          tickets: true,
        },
      },
      comments: {
        include: {
          user: {},
          event: {},
        },
      },
    },
  });
  return data;
};

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  const data = await getEventsWithCommentsUsersAndCount(session?.user?.id);
  interface CommentWithUserAndEvent extends Comment {
    user: User;
    event: Event;
  }
  const CommentBox = async ({
    comments,
  }: {
    comments: CommentWithUserAndEvent[];
  }) => {
    return (
      <div>
        {comments.map((comment) => {
          return (
            <div key={comment.id}>
              <ul>
                <li>Event: {comment.event.eventName}</li>
                <li>Commented User: {comment.user.name}</li>
                <li>Comment: {comment.text}</li>
                <li>
                  Date Commented: {new Date(comment.createdAt).toDateString()}
                </li>
              </ul>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="p-4 flex flex-col gap-4">
        <div className="card">
          <div className="flex flex-col gap-2">All My Events</div>
        </div>
        <div className="card card-bordered">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Locatiom</th>
                  <th>Comments</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((event) => {
                  return (
                    <tr key={event.id}>
                      <th>{event.id}</th>
                      <td>{event.eventName}</td>
                      <td>{event.location}</td>
                      <td>{event._count.comments}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card card-bordered p-4">
          <div>
            <h1 className="text-lg font-semibold">Comment Section</h1>
          </div>
          {data.map((e) => {
            return (
              <div key={e.id}>
                <CommentBox comments={e.comments} />
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
