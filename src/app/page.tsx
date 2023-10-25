"use client";
import DefaultNavbar from "./components/Navbar";
import { EventCard } from "./components/EventCard";
import { SearchComponent } from "./components/SearchComponent";
import { WithSearch } from "./context/SearchContext";

export default function Home() {
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
