import { useEffect, useMemo, useState } from "react";
import {
  SlidersHorizontal,
  Grid3X3,
  List,
  X,
} from "lucide-react";

import { categories } from "../../data/products";
import { getProducts } from "../../api/productApi";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

function Shop() {
  const [products, setProducts] = useState([]);

  const [selectedCategory, setSelectedCategory] =
    useState("all");

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

  // =========================
  // Fetch Products
  // =========================

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProducts();

        setProducts(data);
      } catch (error) {
        console.error(
          "Failed to load products:",
          error
        );

        setError(
          error.message ||
            "Failed to load products"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // =========================
  // Filter + Sort Products
  // =========================

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category
    if (selectedCategory !== "all") {
      result = result.filter(
        (product) =>
          product.category ===
          selectedCategory
      );
    }

    // Price
    if (priceRange === "under50") {
      result = result.filter(
        (product) => product.price < 50
      );
    }

    if (priceRange === "50to100") {
      result = result.filter(
        (product) =>
          product.price >= 50 &&
          product.price <= 100
      );
    }

    if (priceRange === "100to200") {
      result = result.filter(
        (product) =>
          product.price >= 100 &&
          product.price <= 200
      );
    }

    if (priceRange === "above200") {
      result = result.filter(
        (product) => product.price > 200
      );
    }

    // Sort
    if (sortBy === "price-low") {
      result.sort(
        (a, b) => a.price - b.price
      );
    }

    if (sortBy === "price-high") {
      result.sort(
        (a, b) => b.price - a.price
      );
    }

    if (sortBy === "rating") {
      result.sort(
        (a, b) => b.rating - a.rating
      );
    }

    if (sortBy === "name") {
      result.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    return result;
  }, [
    products,
    selectedCategory,
    priceRange,
    sortBy,
  ]);

  // =========================
  // Clear Filters
  // =========================

  const clearFilters = () => {
    setSelectedCategory("all");
    setPriceRange("all");
    setSortBy("featured");
  };

  // =========================
  // Active Filter Count
  // =========================

  const activeFilterCount =
    (selectedCategory !== "all" ? 1 : 0) +
    (priceRange !== "all" ? 1 : 0);

  // =========================
  // Loading
  // =========================

  if (loading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#F8FAFC]">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-[#2563EB]" />

          <p className="mt-4 text-sm font-medium text-[#64748B]">
            Loading products...
          </p>
        </div>
      </main>
    );
  }

  // =========================
  // Error
  // =========================

  if (error) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#F8FAFC] px-4">
        <div className="rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">
          <h2 className="text-xl font-bold text-[#0F172A]">
            Failed to load products
          </h2>

          <p className="mt-2 text-sm text-red-500">
            {error}
          </p>

          <button
            type="button"
            onClick={() =>
              window.location.reload()
            }
            className="mt-5 rounded-full bg-[#2563EB] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1D4ED8]"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* =========================
          Header
      ========================= */}

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">

            <div>

              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#2563EB]">
                Shop
              </p>

              <h1 className="mt-2 text-3xl font-bold text-[#0F172A] sm:text-4xl">
                Explore Our Products
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#64748B]">
                Discover quality products across
                fashion, electronics, lifestyle and
                more.
              </p>

            </div>

            <div className="text-sm text-[#64748B]">
              <span className="font-semibold text-[#0F172A]">
                {filteredProducts.length}
              </span>{" "}
              products
            </div>

          </div>

        </div>
      </section>

      {/* =========================
          Main
      ========================= */}

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Mobile Toolbar */}

        <div className="mb-5 flex items-center justify-between lg:hidden">

          <button
            type="button"
            onClick={() =>
              setShowFilters(true)
            }
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-[#0F172A]"
          >
            <SlidersHorizontal className="h-4 w-4" />

            Filters

            {activeFilterCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#2563EB] px-1 text-[10px] text-white">
                {activeFilterCount}
              </span>
            )}
          </button>

          <div className="flex items-center gap-2">

            <button
              type="button"
              onClick={() =>
                setView("grid")
              }
              className={`rounded-lg p-2 ${
                view === "grid"
                  ? "bg-[#EFF6FF] text-[#2563EB]"
                  : "text-[#64748B]"
              }`}
            >
              <Grid3X3 className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={() =>
                setView("list")
              }
              className={`rounded-lg p-2 ${
                view === "list"
                  ? "bg-[#EFF6FF] text-[#2563EB]"
                  : "text-[#64748B]"
              }`}
            >
              <List className="h-5 w-5" />
            </button>

          </div>

        </div>

        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">

          {/* =========================
              Desktop Filters
          ========================= */}

          <aside className="hidden lg:block">

            <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-5">

              <div className="flex items-center justify-between">

                <h2 className="font-bold text-[#0F172A]">
                  Filters
                </h2>

                {activeFilterCount > 0 && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-xs font-semibold text-[#2563EB]"
                  >
                    Clear All
                  </button>
                )}

              </div>

              {/* Category */}

              <div className="mt-6">

                <p className="text-sm font-semibold text-[#0F172A]">
                  Category
                </p>

                <div className="mt-3 space-y-1">

                  {categories.map(
                    (category) => (
                      <button
                        key={category.slug}
                        type="button"
                        onClick={() =>
                          setSelectedCategory(
                            category.slug
                          )
                        }
                        className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition ${
                          selectedCategory ===
                          category.slug
                            ? "bg-[#EFF6FF] font-semibold text-[#2563EB]"
                            : "text-[#64748B] hover:bg-slate-50 hover:text-[#0F172A]"
                        }`}
                      >
                        <span>
                          {category.name}
                        </span>

                        <span className="text-xs">
                          {category.slug ===
                          "all"
                            ? products.length
                            : products.filter(
                                (product) =>
                                  product.category ===
                                  category.slug
                              ).length}
                        </span>
                      </button>
                    )
                  )}

                </div>

              </div>

              {/* Price */}

              <div className="mt-7 border-t border-slate-100 pt-6">

                <p className="text-sm font-semibold text-[#0F172A]">
                  Price
                </p>

                <div className="mt-3 space-y-1">

                  {[
                    ["all", "All Prices"],
                    [
                      "under50",
                      "Under $50",
                    ],
                    [
                      "50to100",
                      "$50 - $100",
                    ],
                    [
                      "100to200",
                      "$100 - $200",
                    ],
                    [
                      "above200",
                      "Above $200",
                    ],
                  ].map(
                    ([value, label]) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() =>
                          setPriceRange(value)
                        }
                        className={`block w-full rounded-xl px-3 py-2.5 text-left text-sm transition ${
                          priceRange === value
                            ? "bg-[#EFF6FF] font-semibold text-[#2563EB]"
                            : "text-[#64748B] hover:bg-slate-50 hover:text-[#0F172A]"
                        }`}
                      >
                        {label}
                      </button>
                    )
                  )}

                </div>

              </div>

            </div>

          </aside>

          {/* =========================
              Products
          ========================= */}

          <div>

            {/* Toolbar */}

            <div className="mb-5 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">

              <div className="text-sm text-[#64748B]">
                Showing{" "}
                <span className="font-semibold text-[#0F172A]">
                  {filteredProducts.length}
                </span>{" "}
                products
              </div>

              <div className="flex items-center gap-3">

                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(
                      e.target.value
                    )
                  }
                  className="rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-[#0F172A] outline-none focus:border-[#2563EB]"
                >
                  <option value="featured">
                    Featured
                  </option>

                  <option value="price-low">
                    Price: Low to High
                  </option>

                  <option value="price-high">
                    Price: High to Low
                  </option>

                  <option value="rating">
                    Highest Rated
                  </option>

                  <option value="name">
                    Name
                  </option>
                </select>

                <div className="hidden items-center rounded-full border border-slate-200 p-1 sm:flex">

                  <button
                    type="button"
                    onClick={() =>
                      setView("grid")
                    }
                    className={`rounded-full p-2 ${
                      view === "grid"
                        ? "bg-[#EFF6FF] text-[#2563EB]"
                        : "text-[#64748B]"
                    }`}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setView("list")
                    }
                    className={`rounded-full p-2 ${
                      view === "list"
                        ? "bg-[#EFF6FF] text-[#2563EB]"
                        : "text-[#64748B]"
                    }`}
                  >
                    <List className="h-4 w-4" />
                  </button>

                </div>

              </div>

            </div>

            {/* Product Grid */}

            <ProductGrid
              products={filteredProducts}
              view={view}
              wishlist={wishlist}
              isWishlisted={isWishlisted}
              onToggleWishlist={
                toggleWishlist
              }
              onAddToCart={addToCart}
              onClearFilters={
                clearFilters
              }
              isLoggedIn={isLoggedIn}
            />

          </div>

        </div>

      </section>

      {/* =========================
          Mobile Filter Drawer
      ========================= */}

      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">

          <div
            className="absolute inset-0 bg-black/40"
            onClick={() =>
              setShowFilters(false)
            }
          />

          <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm overflow-y-auto bg-white p-5 shadow-xl">

            <div className="flex items-center justify-between">

              <h2 className="text-lg font-bold text-[#0F172A]">
                Filters
              </h2>

              <button
                type="button"
                onClick={() =>
                  setShowFilters(false)
                }
                className="rounded-full p-2 text-[#64748B] hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>

            </div>

            {/* Categories */}

            <div className="mt-7">

              <p className="text-sm font-semibold text-[#0F172A]">
                Category
              </p>

              <div className="mt-3 space-y-1">

                {categories.map(
                  (category) => (
                    <button
                      key={category.slug}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(
                          category.slug
                        );

                        setShowFilters(false);
                      }}
                      className={`block w-full rounded-xl px-3 py-3 text-left text-sm ${
                        selectedCategory ===
                        category.slug
                          ? "bg-[#EFF6FF] font-semibold text-[#2563EB]"
                          : "text-[#64748B]"
                      }`}
                    >
                      {category.name}
                    </button>
                  )
                )}

              </div>

            </div>

            {/* Price */}

            <div className="mt-7 border-t border-slate-100 pt-6">

              <p className="text-sm font-semibold text-[#0F172A]">
                Price
              </p>

              <div className="mt-3 space-y-1">

                {[
                  ["all", "All Prices"],
                  [
                    "under50",
                    "Under $50",
                  ],
                  [
                    "50to100",
                    "$50 - $100",
                  ],
                  [
                    "100to200",
                    "$100 - $200",
                  ],
                  [
                    "above200",
                    "Above $200",
                  ],
                ].map(
                  ([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => {
                        setPriceRange(
                          value
                        );

                        setShowFilters(false);
                      }}
                      className={`block w-full rounded-xl px-3 py-3 text-left text-sm ${
                        priceRange === value
                          ? "bg-[#EFF6FF] font-semibold text-[#2563EB]"
                          : "text-[#64748B]"
                      }`}
                    >
                      {label}
                    </button>
                  )
                )}

              </div>

            </div>

            {/* Clear Filters */}

            <button
              type="button"
              onClick={() => {
                clearFilters();
                setShowFilters(false);
              }}
              className="mt-8 w-full rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-[#0F172A]"
            >
              Clear Filters
            </button>

          </div>

        </div>
      )}

    </main>
  );
}

export default Shop;