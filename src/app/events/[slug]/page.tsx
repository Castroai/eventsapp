import { CommentBox } from "@/app/components/CommentBox";
import { MainLayout } from "@/app/components/Layouts/MainLayout";
import { authOptions } from "@/app/lib/auth";
import prisma from "@/app/lib/db";
import { getServerSession } from "next-auth";
import Image from "next/image";

export default async function Page({
  params,
}: Readonly<{ params: { slug: string } }>) {
  const session = await getServerSession(authOptions);
  const data = await prisma.event.findUnique({
    where: {
      slug: params.slug,
    },
    include: {
      tickets: {},
      organizer: {},
      users: {},
      comments: {},
    },
  });
  const numberOfLikes = data?.users.length;

  if (data) {
    return (
      <MainLayout>
        <div className="container mx-auto">
          <ul>
            <li>Number of Like :{numberOfLikes}</li>
            {data.tickets.length > 0 && (
              <li>Price per ticker: {data.tickets[0].price}</li>
            )}

            <li>Event Name: {data.eventName}</li>
            <li>Location : {data.location}</li>
            <li>Hosted by : {data.organizer.name}</li>
            <li>
              <div
                className="prose"
                dangerouslySetInnerHTML={{ __html: data.description }}
              />
            </li>
            {data.imgUrl && (
              <li>
                <Image
                  priority
                  src={data.imgUrl}
                  alt={data.eventName}
                  width={500}
                  height={500}
                />
              </li>
            )}
            {data.tickets.length > 0 && (
              <form action="">
                <button type="submit">
                  Buy Ticket <li>Price per ticker: {data.tickets[0].price}</li>
                </button>
              </form>
            )}
          </ul>
          {session?.user && <CommentBox eventId={data.id} />}
          <div>
            <ul>
              <li>
                {data.comments.length > 0 && (
                  <>
                    {data.comments.map((comment) => {
                      return <div key={comment.id}>{comment.text}</div>;
                    })}
                  </>
                )}
              </li>
            </ul>
          </div>
        </div>
      </MainLayout>
    );
  } else {
    return <div>Error Fetching Data</div>;
  }
}
