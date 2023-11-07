"use client";
import { options } from "@/app/lib/gplaces";
import { useEffect, useRef } from "react";
const AutocompleteInput = ({ address }: { address?: string }) => {
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
    if (address) {
      inputRef.current.value = address;
      // Use the Geocoding API to convert address to LatLng
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === "OK" && results && results[0].geometry) {
          const lat = results[0].geometry.location.lat();
          const lng = results[0].geometry.location.lng();
          latRef.current.value = lat.toString();
          longRef.current.value = lng.toString();
        } else {
          // Handle error or provide default values
          console.error("Geocoding failed for the provided address.");
        }
      });
    }
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
  }, [address]);

  return (
    <>
      <input
        className="w-full input input-bordered"
        ref={inputRef}
        name="location"
        id="autocomplete-input"
        placeholder="Location"
        required
      />
      <input
        type="hidden"
        id="latitude"
        name="latitude"
        required
        ref={latRef}
      />
      <input
        type="hidden"
        id="longitude"
        name="longitude"
        required
        ref={longRef}
      />
    </>
  );
};

export default AutocompleteInput;
