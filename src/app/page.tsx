import DefaultNavbar from "./components/Navbar";
import { EventCard } from "./components/EventCard";
import { SearchComponent } from "./components/SearchForm";
import DefaultFooter from "./components/Footer";
import prisma from "./lib/db";
import { findClosestEvents } from "./lib/geo";
import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";
import { IoSearchSharp } from "react-icons/io5";
export default async function Home({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  let allItems;
  let location: { lat: number; long: number } | undefined;
  const session = await getServerSession(authOptions);
  if (searchParams && searchParams.latitude && searchParams.longitude) {
    const coords = {
      lat: parseFloat(searchParams.latitude as string),
      long: parseFloat(searchParams.latitude as string),
    };
    location = coords;
  }
  const items = await findClosestEvents(location);
  if (session && session.user) {
    const prismaUser = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      include: {
        eventsAttending: {},
      },
    });
    // All events that user is attending
    const eventIdAttending = prismaUser!.eventsAttending.map((i) => i.eventId);
    // create a new array, with a key in each object attending
    allItems = items.map((item) => {
      if (eventIdAttending.includes(item.id)) {
        return {
          ...item,
          attending: true,
        };
      } else {
        return {
          ...item,
          attending: false,
        };
      }
    });
  } else {
    allItems = items;
  }
  console.log(allItems);

  return (
    <div className="flex flex-col gap-5 h-full justify-between dark:bg-current">
      <header>
        <DefaultNavbar />
      </header>
      <div className="h-full flex flex-col gap-5 p-4">
        <div>
          <div className="flex items-center gap-2">
            <h1>Search For Events Near You</h1>
            <IoSearchSharp />
          </div>
          <SearchComponent />
        </div>
        <div className="grid md:grid-cols-4 gap-4  ">
          {allItems.map((i, index) => {
            return (
              <div key={i.id}>
                <EventCard {...i} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="align-bottom">
        <DefaultFooter />
      </div>
    </div>
  );
}
