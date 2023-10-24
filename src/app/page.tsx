"use client";
import DefaultNavbar from "./components/Navbar";
import { EventCard } from "./components/EventCard";
import { SearchComponent } from "./components/SearchComponent";
import { WithSearch } from "./context/SearchContext";

export default function Home() {
  // let allItems;
  // // All Published Events
  // const items = await prisma.event.findMany({
  //   where: {
  //     status: {
  //       equals: "PUBLISHED",
  //     },
  //   },
  // });
  // // Get the current user
  // const user = await getServerSession(authOptions);
  // if (user) {
  //   const prismaUser = await prisma.user.findUnique({
  //     where: {
  //       email: user.user!.email!,
  //     },
  //     include: {
  //       eventsAttending: {},
  //     },
  //   });
  //   // All events that user is attending
  //   const eventIdAttending = prismaUser!.eventsAttending.map((i) => i.eventId);
  //   // create a new array, with a key in each object attending
  //   allItems = items.map((item) => {
  //     if (eventIdAttending.includes(item.id)) {
  //       return {
  //         ...item,
  //         attending: true,
  //       };
  //     } else {
  //       return {
  //         ...item,
  //         attending: false,
  //       };
  //     }
  //   });
  // } else {
  //   allItems = items;
  // }

  const { results } = WithSearch();
  return (
    <div className="mx-auto container flex flex-col gap-5">
      <DefaultNavbar />
      <h1>Search For Events Near You</h1>
      <SearchComponent />
      <div className="grid grid-cols-5 gap-4">
        {results.map((i, index) => {
          return (
            <div key={i.id}>
              <EventCard {...i} />
            </div>
          );
        })}
        {/* {JSON.stringify(results[0].date)} */}
      </div>
    </div>
  );
}
