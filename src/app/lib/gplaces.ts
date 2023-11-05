export const options: google.maps.places.AutocompleteOptions = {
  componentRestrictions: { country: "us" },
  fields: ["name", "formatted_address", "geometry"],
  types: [],
};
