import { CommentBox } from "@/app/dashboard/components/CommentBox";
import { MainLayout } from "@/app/components/Layouts/MainLayout";
import { authOptions } from "@/app/lib/auth";
import prisma from "@/app/lib/db";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { ImLocation } from 'react-icons/im';
import { AiFillLike } from 'react-icons/ai'
import { BiSolidUserCircle } from 'react-icons/bi'

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
            <div className="items-center grid grid-cols-2 gap-4">
              <div className="col-span-1">
                <li className="flex font-bold pt-6 text-5xl">{data.eventName}</li>

                <li className="pb-6 text-sm">By: {data.organizer.name}</li>

                <li className="font-bold text-2xl">About</li>
                <li className="flex pb-6 gap-11">
                  {data.description && (
                    <div
                      className="prose"
                      dangerouslySetInnerHTML={{ __html: data.description }}
                    />
                  )}
                </li>

                <li className="font-bold text-2xl">Location</li>
                <li className="flex items-center gap-3 pb-6"><ImLocation /> {data.location}</li>

                <li className="flex items-center gap-3"><AiFillLike /> {numberOfLikes}</li>
              </div>

              <div className="col-span-1">
                {data.imgUrl && (
                  <li className="pt-12">
                    <Image
                      priority
                      src={data.imgUrl}
                      alt={data.eventName}
                      width={500}
                      height={500}
                    />
                  </li>
                )}

                <div className="pt-5">
                  <li className="badge badge-outline badge-lg font-bold ">
                    {data.tickets.length > 0 && (
                      <li className="flex gap-6">
                        ${data.tickets[0].price}

                        {data.tickets.length > 0 && (
                          <form action="">
                            <button className="badge bg-gray-200" type="submit">Buy Now</button>
                          </form>
                        )}
                      </li>
                    )}
                  </li>
                </div>

              </div>
            </div>
          </ul>

          <div className="font-bold text-2xl">Comments</div>
          <div className="card card-bordered w-96 border-black p-6">

            {session?.user && <CommentBox eventId={data.id} />}

            {data.comments.length > 0 && (

              <div>
                {data.comments.length > 0 && (
                  <>
                    {data.comments.map((comment) => {
                      return (
                        <div key={comment.id} className="card bg-gray-300 m-5">
                          <ul>
                            <li className="flex items-center">
                              <div className="text-2xl p-2"><BiSolidUserCircle /></div>
                              <div key={comment.id}>{comment.text}</div>
                            </li>
                          </ul>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            )}

          </div>
                  
      </div>
      </MainLayout>
      
    );
  } else {
    return <div>Error Fetching Data</div>;
  }
}
