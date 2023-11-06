import { LocationSearchForm } from "./components/SearchBar";
import { EventsGrid } from "./components/EventsGrid";
import { Suspense } from "react";
import { MainLayout } from "./components/Layouts/MainLayout";
import Skeleton from "./components/EventsGrid/skeleteon";
import Await from "./components/EventsGrid/await";
import { findClosestEvents } from "./lib/geo";

interface HomeProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Home({
  params,
  searchParams,
}: Readonly<HomeProps>) {
  let location;
  const latitude =
    typeof searchParams.latitude === "string"
      ? parseFloat(searchParams.latitude)
      : undefined;
  const longitude =
    typeof searchParams.longitude === "string"
      ? parseFloat(searchParams.longitude)
      : undefined;
  if (latitude && longitude) {
    location = {
      lat: latitude,
      long: longitude,
    };
  }
  const items = findClosestEvents(location);

  return (
    <MainLayout>
      <div className="flex flex-col gap-5 h-full justify-between dark:bg-current container mx-auto">
        <div className="h-full flex flex-col gap-5 p-4">
          <div>
            <div className="flex items-center gap-2">
              <h1>Search For Events Near You</h1>
            </div>
            <LocationSearchForm />
          </div>
          <Suspense fallback={<Skeleton />}>
            <Await promise={items}>
              {(events) => <EventsGrid allItems={events} />}
            </Await>
          </Suspense>
        </div>
      </div>
    </MainLayout>
  );
}
