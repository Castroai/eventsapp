"use client";
import { WithSearch } from "@/app/context/SearchContext";
import { options } from "@/app/lib/gplaces";
import { Button, TextInput } from "flowbite-react";
import { FormEvent, useEffect, useRef, useState } from "react";

export const SearchComponent = () => {
  const { searchEvents, results } = WithSearch();
  const [coords, setCoords] = useState({
    lat: 0,
    long: 0,
    location: "",
  });
  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    await searchEvents({
      lat: coords.lat,
      long: coords.long,
    });
  };
  const autoCompleteRef = useRef<google.maps.places.Autocomplete>();
  const inputRef = useRef(
    document.getElementById("autocomplete") as HTMLInputElement
  );

  useEffect(() => {
    // Set the Ref to the autocomplete instance
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options
    );
    // Reference the current value
    const autocomplete = autoCompleteRef.current;
    // Add a listener
    autocomplete.addListener("place_changed", () => {
      const selectedPlace = autocomplete.getPlace();
      if (selectedPlace.geometry) {
        const lat = selectedPlace.geometry.location?.lat;
        const long = selectedPlace.geometry.location?.lng;
        if (lat && long) {
          setCoords({
            location: selectedPlace.formatted_address as string,
            lat: lat(),
            long: long(),
          });
        }
      }
    });
    return () => {
      window.google.maps.event.clearInstanceListeners(autocomplete);
    };
  }, []);
  return (
    <form onSubmit={submitHandler} className="flex gap-4 w-full">
      <TextInput
        className="w-full"
        ref={inputRef}
        name="location"
        id="autocomplete"
        placeholder="Location"
      />
      <Button type="submit">Search</Button>
    </form>
  );
};
