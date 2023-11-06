"use client";
import { options } from "@/app/lib/gplaces";
import { useEffect, useRef } from "react";
const AutocompleteInput = ({ address }: { address?: string }) => {
  console.log(address);
  const autoCompleteRef = useRef<google.maps.places.Autocomplete>();
  const inputRef = useRef(
    document.getElementById("autocomplete-input") as HTMLInputElement
  );
  const latRef = useRef(
    document.getElementById("latitude") as HTMLInputElement
  );
  const longRef = useRef(
    document.getElementById("longitude") as HTMLInputElement
  );
  useEffect(() => {
    // Set the Ref to the autocomplete instance
    if (address) {
      inputRef.current.value = address;
    }
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options
    );

    // Reference the current value
    const autocomplete = autoCompleteRef.current;
    // Add a listener
    autocomplete.addListener("place_changed", () => {
      const selectedPlace = autocomplete.getPlace();
      if (selectedPlace.geometry?.location) {
        const lat = selectedPlace.geometry.location.lat();
        const long = selectedPlace.geometry.location.lng();
        if (lat !== undefined && long !== undefined) {
          latRef.current.value = lat.toString();
          longRef.current.value = long.toString();
        }
      }
    });
    return () => {
      window.google.maps.event.clearInstanceListeners(autocomplete);
    };
  }, []);

  return (
    <>
      <input
        className="w-full input input-bordered"
        ref={inputRef}
        name="location"
        id="autocomplete-input"
        placeholder="Location"
      />
      <input type="hidden" id="latitude" name="latitude" ref={latRef} />
      <input type="hidden" id="longitude" name="longitude" ref={longRef} />
    </>
  );
};

export default AutocompleteInput;
