import AutocompleteInput from "../AutoCompleteInput";

export const SearchComponent = () => {
  return (
    <form className="flex gap-4 w-full" method="GET">
      <AutocompleteInput />
      <button type="submit">Search</button>
    </form>
  );
};
