"use client";
// GoogleMap.tsx
import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

interface MapProps {
  locations: { lat: number; lng: number }[];
}

const Map: React.FC<MapProps> = ({ locations }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const mapContainerStyle = {
    width: "100%",
    height: "600px",
  };

  const center = locations.length > 0 ? locations[0] : { lat: 0, lng: 0 };

  return isLoaded ? (
    <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={10}>
      {locations.map((location, index) => (
        <Marker key={index} position={location} />
      ))}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default Map;
