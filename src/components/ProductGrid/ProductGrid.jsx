
import { memo } from "react";
import { SearchX } from "lucide-react";
import ProductCard from "../ProductCard/ProductCard";

function ProductGrid({
  products = [],
  view = "grid",
  wishlist = [],
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onClearFilters,
  isLoggedIn = false,
}) {
  /* =====================================================
     Empty State
  ====================================================== */

  if (products.length === 0) {
    return (
      <EmptyProducts onClearFilters={onClearFilters} />
    );
  }

  /* =====================================================
     Product List
  ====================================================== */

  return (
    <div
      className={
        view === "grid"
          ? "grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4"
          : "flex flex-col gap-4"
      }
    >
      {products.map((product) => {
        const productId = product._id || product.id;

        const liked = getWishlistStatus({
          productId,
          wishlist,
          isWishlisted,
        });

        return (
          <ProductCard
            key={productId}
            product={product}
            isWishlisted={liked}
            onToggleWishlist={onToggleWishlist}
            onAddToCart={onAddToCart}
            isLoggedIn={isLoggedIn}
            view={view}
          />
        );
      })}
    </div>
  );
}

/* =========================================================
   Wishlist Status
========================================================= */

function getWishlistStatus({
  productId,
  wishlist,
  isWishlisted,
}) {
  if (isWishlisted) {
    return isWishlisted(productId);
  }

  return wishlist.some(
    (item) =>
      String(item._id || item.id) === String(productId)
  );
}

/* =========================================================
   Empty Products
========================================================= */

const EmptyProducts = memo(function EmptyProducts({
  onClearFilters,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-50">
        <SearchX
          className="h-7 w-7 text-blue-600"
          strokeWidth={1.8}
          aria-hidden="true"
        />
      </div>

      <h3 className="mt-4 text-xl font-bold text-slate-900">
        No Products Found
      </h3>

      <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
        We couldn't find any products matching your
        current filters.
      </p>

      {onClearFilters && (
        <button
          type="button"
          onClick={onClearFilters}
          className="
            mt-6 rounded-full
            bg-blue-600 px-6 py-3
            text-sm font-semibold text-white
            transition-colors
            hover:bg-blue-700
            active:scale-[0.98]
            focus:outline-none
            focus:ring-2 focus:ring-blue-500
            focus:ring-offset-2
          "
        >
          Clear Filters
        </button>
      )}
    </div>
  );
});

export default memo(ProductGrid);

