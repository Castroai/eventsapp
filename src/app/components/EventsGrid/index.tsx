import { EventCard } from "../EventCard";
import { Event } from "@prisma/client";
import { ItemsWithCount } from "./await";

export const EventsGrid = async ({
  allItems,
}: {
  allItems: ItemsWithCount[];
}) => {
  return (
    <div className="grid md:grid-cols-3 gap-4  ">
      {allItems.map((i, index) => {
        return <EventCard key={i.id} {...i} />;
      })}
    </div>
  );
};
