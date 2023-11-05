import prisma from "@/app/lib/db";
import Image from "next/image";

export default async function Page({ params }: { params: { slug: string } }) {
  const data = await prisma.event.findUnique({
    where: {
      slug: params.slug,
    },
    include: {
      tickets: {},
      organizer: {},
      users: {},
    },
  });
  const numberOfLikes = data?.users.length;
  if (data) {
    return (
      <div>
        <ul>
          <li>Number of Like :{numberOfLikes}</li>
          {data.tickets.length > 0 && (
            <li>Price per ticker: {data.tickets[0].price}</li>
          )}

          <li>Event Name: {data.eventName}</li>
          <li>Location : {data.location}</li>
          <li>Hosted by : {data.organizer.name}</li>
          <li>Description : {data.description}</li>
          {data.imgUrl && (
            <li>
              <Image
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
      </div>
    );
  } else {
    return <div>Error Fetching Data</div>;
  }
}
