import { SearchX } from "lucide-react";
import ProductCard from "../ProductCard/ProductCard";

export default function ProductGrid({
  products,
  view = "grid",
  wishlist = [],
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onClearFilters,
  isLoggedIn,
}) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">

        <SearchX className="h-10 w-10 text-[#64748B]" />

        <h3 className="mt-4 text-xl font-bold text-[#0F172A]">
          No Products Found
        </h3>

        <p className="mt-2 max-w-md text-sm text-[#64748B]">
          We couldn't find any products matching your
          current filters.
        </p>

        <button
          type="button"
          onClick={onClearFilters}
          className="mt-6 rounded-full bg-[#2563EB] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1D4ED8]"
        >
          Clear Filters
        </button>

      </div>
    );
  }

  return (
    <div
      className={
        view === "grid"
          ? "grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4"
          : "flex flex-col gap-4"
      }
    >
      {products.map((product) => {

        // Local product = id
        // Backend product = _id
        const productId = product._id || product.id;

        const liked = isWishlisted
          ? isWishlisted(productId)
          : wishlist.some(
              (item) =>
                String(item._id || item.id) ===
                String(productId)
            );

        return (
          <ProductCard
            key={productId}
            product={product}
            isWishlisted={liked}
            onToggleWishlist={() =>
              onToggleWishlist(productId)
            }
            onAddToCart={onAddToCart}
            isLoggedIn={isLoggedIn}
            view={view}
          />
        );
      })}
    </div>
  );
}