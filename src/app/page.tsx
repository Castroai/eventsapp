import DefaultNavbar from "./components/Navbar";
import { prisma } from "./lib/prisma";

export default async function Home() {
  const items = await prisma.event.findMany({
    include: {
      organizer: {},
    },
  });
  return (
    <div className="mx-auto container flex flex-col">
      <DefaultNavbar />
      <div>
        {items.map((i, index) => {
          return (
            <div key={i.id}>
              <ul>
                <li>Name: {i.eventName}</li>
                <li> created by : {i.organizer.name}</li>
                <li> Date by : {i.date.toDateString()}</li>
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
