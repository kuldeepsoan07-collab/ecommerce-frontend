
import { memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Heart,
  Star,
  ShoppingCart,
  Eye,
} from "lucide-react";

const CATEGORY_LABELS = {
  fashion: "Fashion",
  electronics: "Electronics",
  laptops: "Laptops",
  watches: "Watches",
  bags: "Bags",
  headphones: "Headphones",
  "home-living": "Home & Living",
  fitness: "Fitness",
};

function ProductCard({
  product,
  isWishlisted = false,
  onToggleWishlist,
  onAddToCart,
  isLoggedIn = false,
  view = "grid",
}) {
  const navigate = useNavigate();

  if (!product) return null;

  const {
    _id,
    id,
    name = "Product",
    category = "",
    price = 0,
    originalPrice = 0,
    discount,
    rating = 0,
    reviews = 0,
    image = "/images/products/placeholder.webp",
    badge,
  } = product;

  const productId = _id || id;

  const numericPrice = Number(price) || 0;
  const numericOriginalPrice = Number(originalPrice) || 0;
  const numericRating = Number(rating) || 0;
  const numericReviews = Number(reviews) || 0;

  const hasDiscount = numericOriginalPrice > numericPrice;

  const calculatedDiscount = hasDiscount
    ? Math.round(
        ((numericOriginalPrice - numericPrice) /
          numericOriginalPrice) *
          100
      )
    : 0;

  const discountPercentage =
    Number(discount) || calculatedDiscount;

  const roundedRating = Math.min(
    5,
    Math.max(0, Math.round(numericRating))
  );

  const isList = view === "list";

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      navigate("/login", {
        state: {
          from: `/product/${productId}`,
        },
      });

      return;
    }

    onAddToCart?.(product);
  };

  const handleWishlist = () => {
    onToggleWishlist?.(productId);
  };

  return (
    <article
      className={`
        group relative flex overflow-hidden
        rounded-2xl border border-slate-200
        bg-white shadow-sm
        transition-all duration-300
        hover:-translate-y-1
        hover:border-blue-200
        hover:shadow-lg hover:shadow-blue-600/10
        ${
          isList
            ? "flex-row items-stretch"
            : "flex-col"
        }
      `}
    >
      {/* =================================================
          IMAGE
      ================================================= */}
      <div
        className={`
          relative shrink-0 overflow-hidden bg-blue-50
          ${
            isList
              ? "w-32 sm:w-44"
              : "w-full"
          }
        `}
      >
        <Link
          to={`/product/${productId}`}
          aria-label={`View ${name}`}
          className="block h-full w-full"
        >
          <img
            src={image}
            alt={name}
            width="600"
            height="600"
            loading="lazy"
            decoding="async"
            className="
              aspect-square
              h-full
              w-full
              object-cover
              transition-transform
              duration-500
              group-hover:scale-105
            "
          />
        </Link>

        {/* Badge */}
        {badge && (
          <span
            className={`
              pointer-events-none absolute left-3 top-3
              rounded-full px-2.5 py-1
              text-[10px] font-bold uppercase
              tracking-wide text-white
              ${
                badge.toLowerCase() === "new"
                  ? "bg-slate-900"
                  : "bg-blue-600"
              }
            `}
          >
            {badge}
          </span>
        )}

        {/* Wishlist */}
        <button
          type="button"
          aria-label={
            isWishlisted
              ? `Remove ${name} from wishlist`
              : `Add ${name} to wishlist`
          }
          aria-pressed={isWishlisted}
          onClick={handleWishlist}
          className="
            absolute right-3 top-3 z-10
            flex h-9 w-9 items-center justify-center
            rounded-full bg-white/90
            text-slate-900 shadow-sm
            backdrop-blur
            transition-all duration-200
            hover:scale-105 hover:bg-white
            focus:outline-none
            focus:ring-2 focus:ring-blue-500
            focus:ring-offset-2
          "
        >
          <Heart
            className={
              isWishlisted
                ? "h-4 w-4 fill-blue-600 text-blue-600"
                : "h-4 w-4 text-slate-900"
            }
            strokeWidth={1.9}
            aria-hidden="true"
          />
        </button>
      </div>

      {/* =================================================
          CONTENT
      ================================================= */}
      <div
        className={`
          flex flex-1 flex-col gap-2 p-4
          ${isList ? "justify-center" : ""}
        `}
      >
        {/* Category */}
        <span className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
          {formatCategoryLabel(category)}
        </span>

        {/* Product name */}
        <Link
          to={`/product/${productId}`}
          className="
            line-clamp-2
            text-sm font-semibold
            leading-snug text-slate-900
            transition-colors
            hover:text-blue-600
            focus:outline-none
            focus:text-blue-600
            sm:text-base
          "
        >
          {name}
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div
            className="flex items-center gap-0.5"
            aria-label={`Rated ${numericRating.toFixed(1)} out of 5`}
          >
            {Array.from({ length: 5 }, (_, index) => (
              <Star
                key={index}
                className={
                  index < roundedRating
                    ? "h-3.5 w-3.5 fill-blue-600 text-blue-600"
                    : "h-3.5 w-3.5 fill-slate-200 text-slate-200"
                }
                strokeWidth={1.5}
                aria-hidden="true"
              />
            ))}
          </div>

          <span className="text-xs text-slate-500">
            {numericRating.toFixed(1)} ({numericReviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-base font-bold text-slate-900 sm:text-lg">
            ${numericPrice.toFixed(2)}
          </span>

          {hasDiscount && (
            <>
              <span className="text-xs text-slate-500 line-through">
                ${numericOriginalPrice.toFixed(2)}
              </span>

              {discountPercentage > 0 && (
                <span className="text-xs font-semibold text-blue-600">
                  -{discountPercentage}%
                </span>
              )}
            </>
          )}
        </div>

        {/* Actions */}
        <div
          className={`
            mt-2 flex gap-2
            ${isList ? "sm:mt-auto" : ""}
          `}
        >
          {/* Add to cart */}
          <button
            type="button"
            onClick={handleAddToCart}
            className="
              inline-flex flex-1
              items-center justify-center gap-1.5
              rounded-full
              bg-blue-600
              px-3 py-2.5
              text-xs font-semibold text-white
              transition-all duration-200
              hover:bg-blue-700
              active:scale-[0.98]
              focus:outline-none
              focus:ring-2 focus:ring-blue-500
              focus:ring-offset-2
              sm:text-sm
            "
          >
            <ShoppingCart
              className="h-4 w-4"
              strokeWidth={2}
              aria-hidden="true"
            />

            {isLoggedIn
              ? "Add to Cart"
              : "Login to Add"}
          </button>

          {/* View product */}
          <Link
            to={`/product/${productId}`}
            aria-label={`View ${name}`}
            className="
              inline-flex items-center justify-center
              rounded-full
              border border-slate-200
              px-3 py-2.5
              text-slate-900
              transition-all duration-200
              hover:border-blue-200
              hover:bg-blue-50
              hover:text-blue-600
              active:scale-[0.98]
              focus:outline-none
              focus:ring-2 focus:ring-blue-500
              focus:ring-offset-2
            "
          >
            <Eye
              className="h-4 w-4"
              strokeWidth={1.9}
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   Category formatter
========================================================= */

function formatCategoryLabel(category = "") {
  const slug = String(category).toLowerCase().trim();

  if (CATEGORY_LABELS[slug]) {
    return CATEGORY_LABELS[slug];
  }

  return slug
    .split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1)
    )
    .join(" ");
}

export default memo(ProductCard);
