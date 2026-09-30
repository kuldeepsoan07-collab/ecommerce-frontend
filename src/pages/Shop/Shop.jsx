import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Grid3X3,
  List,
  SlidersHorizontal,
  X,
} from "lucide-react";

import { categories } from "../../data/products";
import { getProducts } from "../../api/productApi";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

/* =========================================================
   Constants
========================================================= */

const PRICE_FILTERS = [
  { value: "all", label: "All Prices" },
  { value: "under50", label: "Under ₹50" },
  { value: "50to100", label: "₹50 - ₹100" },
  { value: "100to200", label: "₹100 - ₹200" },
  { value: "above200", label: "Above ₹200" },
];

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "name", label: "Name" },
];

/* =========================================================
   Skeleton
========================================================= */

function ShopSkeleton() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="h-4 w-16 animate-pulse rounded bg-slate-200" />
          <div className="mt-3 h-10 w-72 animate-pulse rounded bg-slate-200" />
          <div className="mt-3 h-4 w-full max-w-xl animate-pulse rounded bg-slate-200" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
          <div className="hidden h-80 animate-pulse rounded-2xl bg-white lg:block" />

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }, (_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl bg-white"
              >
                <div className="aspect-square animate-pulse bg-slate-200" />
                <div className="space-y-3 p-4">
                  <div className="h-3 w-20 animate-pulse rounded bg-slate-200" />
                  <div className="h-5 w-full animate-pulse rounded bg-slate-200" />
                  <div className="h-5 w-24 animate-pulse rounded bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

/* =========================================================
   Filter Button
========================================================= */

function FilterButton({
  active,
  children,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
        active
          ? "bg-blue-50 font-semibold text-blue-600"
          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
      }`}
    >
      {children}
    </button>
  );
}

/* =========================================================
   View Toggle
========================================================= */

function ViewToggle({ view, onChange }) {
  return (
    <div className="flex items-center rounded-full border border-slate-200 p-1">
      <button
        type="button"
        onClick={() => onChange("grid")}
        aria-label="Grid view"
        aria-pressed={view === "grid"}
        className={`rounded-full p-2 ${
          view === "grid"
            ? "bg-blue-50 text-blue-600"
            : "text-slate-500"
        }`}
      >
        <Grid3X3
          className="h-4 w-4"
          aria-hidden="true"
        />
      </button>

      <button
        type="button"
        onClick={() => onChange("list")}
        aria-label="List view"
        aria-pressed={view === "list"}
        className={`rounded-full p-2 ${
          view === "list"
            ? "bg-blue-50 text-blue-600"
            : "text-slate-500"
        }`}
      >
        <List
          className="h-4 w-4"
          aria-hidden="true"
        />
      </button>
    </div>
  );
}

/* =========================================================
   Shop
========================================================= */

function Shop() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [view, setView] = useState("grid");
  const [priceRange, setPriceRange] =
    useState("all");
  const [showFilters, setShowFilters] =
    useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const {
    wishlist,
    toggleWishlist,
    isWishlisted,
  } = useWishlist();

  const { addToCart } = useCart();
  const { isLoggedIn } = useAuth();

  /* =======================================================
     Fetch Products
  ======================================================== */

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getProducts();

      setProducts(
        Array.isArray(data) ? data : []
      );
    } catch (error) {
      console.error(
        "Failed to load products:",
        error
      );

      setError(
        error?.message ||
          "Failed to load products."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  /* =======================================================
     Filter + Sort
  ======================================================== */

  const filteredProducts = useMemo(() => {
    let result = products;

    // Category
    if (selectedCategory !== "all") {
      result = result.filter(
        (product) =>
          product.category === selectedCategory
      );
    }

    // Price
    if (priceRange !== "all") {
      result = result.filter((product) => {
        const price = Number(product.price) || 0;

        switch (priceRange) {
          case "under50":
            return price < 50;

          case "50to100":
            return price >= 50 && price <= 100;

          case "100to200":
            return price >= 100 && price <= 200;

          case "above200":
            return price > 200;

          default:
            return true;
        }
      });
    }

    // Copy only when sorting.
    // This prevents mutation of the original products array.
    if (sortBy !== "featured") {
      result = [...result];

      switch (sortBy) {
        case "price-low":
          result.sort(
            (a, b) =>
              Number(a.price) - Number(b.price)
          );
          break;

        case "price-high":
          result.sort(
            (a, b) =>
              Number(b.price) - Number(a.price)
          );
          break;

        case "rating":
          result.sort(
            (a, b) =>
              Number(b.rating) - Number(a.rating)
          );
          break;

        case "name":
          result.sort((a, b) =>
            String(a.name || "").localeCompare(
              String(b.name || "")
            )
          );
          break;

        default:
          break;
      }
    }

    return result;
  }, [
    products,
    selectedCategory,
    priceRange,
    sortBy,
  ]);

  /* =======================================================
     Category Counts
  ======================================================== */

  const categoryCounts = useMemo(() => {
    const counts = {
      all: products.length,
    };

    for (const product of products) {
      const category = product.category;

      if (category) {
        counts[category] =
          (counts[category] || 0) + 1;
      }
    }

    return counts;
  }, [products]);

  /* =======================================================
     Clear Filters
  ======================================================== */

  const clearFilters = useCallback(() => {
    setSelectedCategory("all");
    setPriceRange("all");
    setSortBy("featured");
  }, []);

  /* =======================================================
     Filter Count
  ======================================================== */

  const activeFilterCount = useMemo(
    () =>
      Number(selectedCategory !== "all") +
      Number(priceRange !== "all"),
    [selectedCategory, priceRange]
  );

  /* =======================================================
     Loading
  ======================================================== */

  if (loading) {
    return <ShopSkeleton />;
  }

  /* =======================================================
     Error
  ======================================================== */

  if (error) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Failed to load products
          </h2>

          <p className="mt-2 text-sm text-red-500">
            {error}
          </p>

          <button
            type="button"
            onClick={fetchProducts}
            className="mt-5 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  /* =======================================================
     Render
  ======================================================== */

  return (
    <main className="min-h-screen bg-slate-50">
      {/* =================================================
          Header
      ================================================== */}

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-600">
                Shop
              </p>

              <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
                Explore Our Products
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Discover quality products across
                fashion, electronics, lifestyle and
                more.
              </p>
            </div>

            <p className="text-sm text-slate-500">
              <span className="font-semibold text-slate-900">
                {filteredProducts.length}
              </span>{" "}
              products
            </p>
          </div>
        </div>
      </section>

      {/* =================================================
          Main
      ================================================== */}

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Mobile Toolbar */}

        <div className="mb-5 flex items-center justify-between lg:hidden">
          <button
            type="button"
            onClick={() => setShowFilters(true)}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900"
          >
            <SlidersHorizontal
              className="h-4 w-4"
              aria-hidden="true"
            />

            Filters

            {activeFilterCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] text-white">
                {activeFilterCount}
              </span>
            )}
          </button>

          <div className="lg:hidden">
            <ViewToggle
              view={view}
              onChange={setView}
            />
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          {/* =================================================
              Desktop Filters
          ================================================== */}

          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-slate-900">
                  Filters
                </h2>

                {activeFilterCount > 0 && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-xs font-semibold text-blue-600"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Category */}

              <div className="mt-6">
                <p className="text-sm font-semibold text-slate-900">
                  Category
                </p>

                <div className="mt-3 space-y-1">
                  {categories.map((category) => (
                    <FilterButton
                      key={category.slug}
                      active={
                        selectedCategory ===
                        category.slug
                      }
                      onClick={() =>
                        setSelectedCategory(
                          category.slug
                        )
                      }
                    >
                      <span>
                        {category.name}
                      </span>

                      <span className="text-xs">
                        {categoryCounts[
                          category.slug
                        ] || 0}
                      </span>
                    </FilterButton>
                  ))}
                </div>
              </div>

              {/* Price */}

              <div className="mt-7 border-t border-slate-100 pt-6">
                <p className="text-sm font-semibold text-slate-900">
                  Price
                </p>

                <div className="mt-3 space-y-1">
                  {PRICE_FILTERS.map(
                    ({ value, label }) => (
                      <FilterButton
                        key={value}
                        active={
                          priceRange === value
                        }
                        onClick={() =>
                          setPriceRange(value)
                        }
                      >
                        {label}
                      </FilterButton>
                    )
                  )}
                </div>
              </div>
            </div>
          </aside>

          {/* =================================================
              Products
          ================================================== */}

          <div>
            {/* Toolbar */}

            <div className="mb-5 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-500">
                Showing{" "}
                <span className="font-semibold text-slate-900">
                  {filteredProducts.length}
                </span>{" "}
                products
              </p>

              <div className="flex items-center gap-3">
                <select
                  value={sortBy}
                  onChange={(event) =>
                    setSortBy(event.target.value)
                  }
                  aria-label="Sort products"
                  className="
                    rounded-full
                    border border-slate-200
                    bg-white
                    px-4 py-2.5
                    text-sm font-medium
                    text-slate-900
                    outline-none
                    focus:border-blue-600
                    focus:ring-2
                    focus:ring-blue-100
                  "
                >
                  {SORT_OPTIONS.map(
                    ({ value, label }) => (
                      <option
                        key={value}
                        value={value}
                      >
                        {label}
                      </option>
                    )
                  )}
                </select>

                <div className="hidden sm:block">
                  <ViewToggle
                    view={view}
                    onChange={setView}
                  />
                </div>
              </div>
            </div>

            {/* Product Grid */}

            <ProductGrid
              products={filteredProducts}
              view={view}
              wishlist={wishlist}
              isWishlisted={isWishlisted}
              onToggleWishlist={toggleWishlist}
              onAddToCart={addToCart}
              onClearFilters={clearFilters}
              isLoggedIn={isLoggedIn}
            />
          </div>
        </div>
      </section>

      {/* =================================================
          Mobile Filter Drawer
      ================================================== */}

      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Overlay */}

          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setShowFilters(false)}
            className="absolute inset-0 h-full w-full cursor-default bg-black/40"
          />

          {/* Drawer */}

          <aside className="absolute right-0 top-0 h-full w-[85%] max-w-sm overflow-y-auto bg-white p-5 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">
                Filters
              </h2>

              <button
                type="button"
                onClick={() => setShowFilters(false)}
                aria-label="Close filters"
                className="rounded-full p-2 text-slate-500 hover:bg-slate-100"
              >
                <X
                  className="h-5 w-5"
                  aria-hidden="true"
                />
              </button>
            </div>

            {/* Category */}

            <div className="mt-7">
              <p className="text-sm font-semibold text-slate-900">
                Category
              </p>

              <div className="mt-3 space-y-1">
                {categories.map((category) => (
                  <button
                    key={category.slug}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(
                        category.slug
                      );
                      setShowFilters(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm ${
                      selectedCategory ===
                      category.slug
                        ? "bg-blue-50 font-semibold text-blue-600"
                        : "text-slate-500"
                    }`}
                  >
                    <span>{category.name}</span>

                    <span className="text-xs">
                      {categoryCounts[
                        category.slug
                      ] || 0}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}

            <div className="mt-7 border-t border-slate-100 pt-6">
              <p className="text-sm font-semibold text-slate-900">
                Price
              </p>

              <div className="mt-3 space-y-1">
                {PRICE_FILTERS.map(
                  ({ value, label }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => {
                        setPriceRange(value);
                        setShowFilters(false);
                      }}
                      className={`block w-full rounded-xl px-3 py-3 text-left text-sm ${
                        priceRange === value
                          ? "bg-blue-50 font-semibold text-blue-600"
                          : "text-slate-500"
                      }`}
                    >
                      {label}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Clear */}

            <button
              type="button"
              onClick={() => {
                clearFilters();
                setShowFilters(false);
              }}
              className="mt-8 w-full rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-900"
            >
              Clear Filters
            </button>
          </aside>
        </div>
      )}
    </main>
  );
}

export default Shop;