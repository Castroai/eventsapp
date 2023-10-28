"use client";
import DefaultNavbar from "./components/Navbar";
import { EventCard } from "./components/EventCard";
import { SearchComponent } from "./components/SearchComponent";
import { WithSearch } from "./context/SearchContext";
import DefaultFooter from "./components/Footer";
import { Flowbite } from "flowbite-react";

export default function Home() {
  const { results } = WithSearch();
  return (
    <div className="flex flex-col gap-5 h-full justify-between dark:bg-current">
      <header>
        <DefaultNavbar />
      </header>
      <div className="h-full flex flex-col gap-5 p-4">
        <div>
          <h1>Search For Events Near You</h1>
          <SearchComponent />
        </div>
        <div className="grid md:grid-cols-5 gap-4  ">
          {results.map((i, index) => {
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
