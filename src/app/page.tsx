import DefaultNavbar from "./components/Navbar";
import { SearchComponent } from "./components/SearchForm";
import DefaultFooter from "./components/Footer";
import { IoSearchSharp } from "react-icons/io5";
import { EventsGrid } from "./components/EventsGrid";
import { Suspense } from "react";

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
        <Suspense fallback="Fetching Cards from suspense">
          <EventsGrid location={location} />
        </Suspense>
      </div>
      <div className="align-bottom">
        <DefaultFooter />
      </div>
    </div>
  );
}
