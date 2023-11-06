import { SearchBar } from "../SearchBar";

export const FilterBox = () => {
  return (
    <form className="flex flex-col gap-2 p-4 rounded-md border" method="GET">
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Search near an address</span>
        </label>
        <SearchBar />
      </div>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Price Range</span>
        </label>
        <input
          id="range"
          type="range"
          min={0}
          max="100"
          className="range range-primary"
          name="minPrice"
        />
      </div>
    </form>
  );
};
