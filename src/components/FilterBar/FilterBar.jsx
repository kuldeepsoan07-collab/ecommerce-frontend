
import { memo } from "react";
import {
  Search,
  ChevronDown,
  LayoutGrid,
  List,
} from "lucide-react";

const PRICE_RANGES = [
  { label: "All Prices", value: "all" },
  { label: "Under $50", value: "under-50" },
  { label: "$50 - $100", value: "50-100" },
  { label: "$100 - $200", value: "100-200" },
  { label: "Above $200", value: "above-200" },
];

const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Highest Rated", value: "rating" },
  { label: "Most Reviewed", value: "reviews" },
];

const INPUT_CLASS =
  "w-full rounded-full border border-slate-200 bg-white text-sm text-slate-900 outline-none transition focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/15";

const SELECT_CLASS =
  "w-full appearance-none rounded-full border border-slate-200 bg-white py-2.5 pl-4 pr-9 text-xs font-medium text-slate-900 outline-none transition focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/15 sm:text-sm";

function FilterBar({
  searchQuery = "",
  onSearchChange,
  category = "all",
  onCategoryChange,
  categories = [],
  priceFilter = "all",
  onPriceChange,
  sortBy = "featured",
  onSortChange,
  view = "grid",
  onViewChange,
}) {
  const categoryOptions = [
    { label: "All Categories", value: "all" },
    ...categories.map((item) => ({
      label: item.label,
      value: item.slug,
    })),
  ];

  return (
    <section
      aria-label="Product filters"
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        {/* Search */}
        <SearchInput
          value={searchQuery}
          onChange={onSearchChange}
        />

        {/* Filters */}
        <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center">
          <SelectField
            label="Category"
            value={category}
            onChange={onCategoryChange}
            options={categoryOptions}
          />

          <SelectField
            label="Price"
            value={priceFilter}
            onChange={onPriceChange}
            options={PRICE_RANGES}
          />

          <SelectField
            label="Sort by"
            value={sortBy}
            onChange={onSortChange}
            options={SORT_OPTIONS}
            className="col-span-2 sm:col-span-1"
          />
        </div>

        {/* View switcher */}
        <ViewToggle
          view={view}
          onChange={onViewChange}
        />
      </div>
    </section>
  );
}

/* =========================================================
   Search Input
========================================================= */

const SearchInput = memo(function SearchInput({
  value,
  onChange,
}) {
  return (
    <div className="relative flex-1 lg:max-w-xs">
      <Search
        className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
        strokeWidth={2}
        aria-hidden="true"
      />

      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search products..."
        aria-label="Search products"
        autoComplete="off"
        className={`${INPUT_CLASS} py-2.5 pl-10 pr-4 placeholder:text-slate-400`}
      />
    </div>
  );
});

/* =========================================================
   Select Field
========================================================= */

const SelectField = memo(function SelectField({
  label,
  value,
  onChange,
  options,
  className = "",
}) {
  return (
    <div className={`relative ${className}`}>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label={label}
        className={SELECT_CLASS}
      >
        {options.map(({ label: optionLabel, value: optionValue }) => (
          <option
            key={optionValue}
            value={optionValue}
          >
            {optionLabel}
          </option>
        ))}
      </select>

      <ChevronDown
        className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500"
        strokeWidth={2}
        aria-hidden="true"
      />
    </div>
  );
});

/* =========================================================
   Grid / List Toggle
========================================================= */

const ViewToggle = memo(function ViewToggle({
  view,
  onChange,
}) {
  return (
    <div
      className="ml-0 flex shrink-0 items-center gap-1 self-start rounded-full border border-slate-200 p-1 sm:ml-auto sm:self-auto"
      role="group"
      aria-label="Product view"
    >
      <ViewButton
        active={view === "grid"}
        label="Grid view"
        onClick={() => onChange("grid")}
      >
        <LayoutGrid
          className="h-4 w-4"
          strokeWidth={1.9}
        />
      </ViewButton>

      <ViewButton
        active={view === "list"}
        label="List view"
        onClick={() => onChange("list")}
      >
        <List
          className="h-4 w-4"
          strokeWidth={1.9}
        />
      </ViewButton>
    </div>
  );
});

/* =========================================================
   View Button
========================================================= */

const ViewButton = memo(function ViewButton({
  active,
  label,
  onClick,
  children,
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500/30 ${
        active
          ? "bg-blue-600 text-white"
          : "text-slate-500 hover:bg-blue-50 hover:text-blue-600"
      }`}
    >
      {children}
    </button>
  );
});

export default memo(FilterBar);

