import { EventsGrid } from "./components/EventsGrid";
import { Suspense } from "react";
import { MainLayout } from "./components/Layouts/MainLayout";
import Skeleton from "./components/EventsGrid/skeleteon";
import Await from "./components/EventsGrid/await";
import { findClosestEvents } from "./lib/geo";
import { FilterBox } from "./components/FilterBox";
import Map from "./components/Maps";

interface HomeProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Home({
  params,
  searchParams,
}: Readonly<HomeProps>) {
  let location;
  const minPrice =
    typeof searchParams.minPrice === "string"
      ? parseFloat(searchParams.minPrice)
      : undefined;
  const address =
    typeof searchParams.location === "string"
      ? searchParams.location
      : undefined;
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

  const loc = (await items).map((i) => {
    return {
      lat: i.lat!,
      lng: i.long!,
    };
  });

  return (
    <MainLayout>
      <div className="flex flex-col gap-5 h-full justify-between dark:bg-current container mx-auto">
        <div className="h-full flex flex-col gap-5 p-4">
          <div>
            {Object.values(searchParams).length === 0 ? (
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-semibold">
                  Search For Events Near You
                </h1>
              </div>
            ) : (
              <p className="text-lg font-semibold">
                Showing results for events near:{" "}
                <p className="underline">{address}</p>
              </p>
            )}
          </div>
          <div className="flex gap-2 flex-col">
            <div className="w-full">
              <FilterBox minPrice={minPrice} address={address} />
            </div>
            <div className="flex">
              <div className="w-1/2">
                <Suspense fallback={<Skeleton />}>
                  <Await promise={items}>
                    {(events) => <EventsGrid allItems={events} />}
                  </Await>
                </Suspense>
              </div>
              <div className="w-1/2">
                <Map locations={loc} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
