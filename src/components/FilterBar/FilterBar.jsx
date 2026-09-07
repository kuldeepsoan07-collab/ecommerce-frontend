import { Search, ChevronDown, LayoutGrid, List } from "lucide-react";

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

/**
 * FilterBar
 * Search + category/price/sort filters + grid/list toggle.
 * Fully controlled — Shop.jsx owns all the state, this just renders inputs.
 *
 * Props:
 * - searchQuery, onSearchChange
 * - category, onCategoryChange, categories: [{ label, slug }]
 * - priceFilter, onPriceChange
 * - sortBy, onSortChange
 * - view, onViewChange
 */
export default function FilterBar({
  searchQuery,
  onSearchChange,
  category,
  onCategoryChange,
  categories,
  priceFilter,
  onPriceChange,
  sortBy,
  onSortChange,
  view,
  onViewChange,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_2px_8px_-4px_rgba(15,23,42,0.06)] sm:p-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        {/* Search */}
        <div className="relative flex-1 lg:max-w-xs">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748B]"
            strokeWidth={2}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search products..."
            aria-label="Search products"
            className="w-full rounded-full border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-[#0F172A] placeholder:text-[#64748B]/60 outline-none transition-all duration-200 focus:border-[#2563EB]/50 focus:ring-2 focus:ring-[#2563EB]/15"
          />
        </div>

        {/* Dropdown filters */}
        <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center">
          <SelectField
            label="Category"
            value={category}
            onChange={onCategoryChange}
            options={categories.map((c) => ({ label: c.label, value: c.slug }))}
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

        {/* Grid / List toggle */}
        <div className="ml-0 flex items-center gap-1 self-start rounded-full border border-slate-200 p-1 sm:ml-auto sm:self-auto">
          <button
            type="button"
            aria-label="Grid view"
            aria-pressed={view === "grid"}
            onClick={() => onViewChange("grid")}
            className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-200 ${
              view === "grid"
                ? "bg-[#2563EB] text-white"
                : "text-[#64748B] hover:bg-[#EFF6FF] hover:text-[#2563EB]"
            }`}
          >
            <LayoutGrid className="h-4 w-4" strokeWidth={1.9} />
          </button>
          <button
            type="button"
            aria-label="List view"
            aria-pressed={view === "list"}
            onClick={() => onViewChange("list")}
            className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-200 ${
              view === "list"
                ? "bg-[#2563EB] text-white"
                : "text-[#64748B] hover:bg-[#EFF6FF] hover:text-[#2563EB]"
            }`}
          >
            <List className="h-4 w-4" strokeWidth={1.9} />
          </button>
        </div>
      </div>
    </div>
  );
}

function SelectField({ label, value, onChange, options, className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-full border border-slate-200 bg-white py-2.5 pl-4 pr-9 text-xs font-medium text-[#0F172A] outline-none transition-all duration-200 focus:border-[#2563EB]/50 focus:ring-2 focus:ring-[#2563EB]/15 sm:text-sm"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#64748B]"
        strokeWidth={2}
      />
    </div>
  );
}