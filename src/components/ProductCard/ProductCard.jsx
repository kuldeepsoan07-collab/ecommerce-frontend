import { Link, useNavigate } from "react-router-dom";
import {
  Heart,
  Star,
  ShoppingCart,
  Eye,
} from "lucide-react";

export default function ProductCard({
  product,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  isLoggedIn,
  view = "grid",
}) {
  const navigate = useNavigate();

  const {
    _id,
    id,
    name,
    category,
    price,
    originalPrice,
    discount,
    rating,
    reviews,
    image,
    badge,
  } = product;

  // Backend me _id
  // Local data me id
  const productId = _id || id;

  const isList = view === "list";

  const handleAddToCart = () => {
    // Login nahi hai
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    // Login hai
    onAddToCart(product);
  };

  return (
    <div
      className={`
        group relative flex overflow-hidden rounded-2xl
        border border-slate-200 bg-white
        shadow-[0_2px_8px_-4px_rgba(15,23,42,0.08)]
        transition-all duration-300
        hover:-translate-y-1
        hover:border-[#2563EB]/30
        hover:shadow-[0_16px_32px_-12px_rgba(37,99,235,0.25)]
        ${
          isList
            ? "flex-row items-stretch"
            : "flex-col"
        }
      `}
    >

      {/* Image */}
      <div
        className={`
          relative shrink-0 bg-[#EFF6FF]
          ${
            isList
              ? "w-32 sm:w-44"
              : "w-full"
          }
        `}
      >

        <Link
          to={`/product/${productId}`}
          className="block h-full w-full"
        >
          <img
            src={image}
            alt={name}
            className="
              aspect-square
              h-full
              w-full
              object-cover
              transition-transform
              duration-500
              group-hover:scale-105
            "
            loading="lazy"
          />
        </Link>

        {/* Badge */}
        {badge && (
          <span
            className={`
              pointer-events-none
              absolute left-3 top-3
              rounded-full
              px-2.5 py-1
              text-[10px]
              font-bold
              uppercase
              tracking-wide
              text-white
              ${
                badge === "New"
                  ? "bg-[#0F172A]"
                  : "bg-[#2563EB]"
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
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
          onClick={() =>
            onToggleWishlist(productId)
          }
          className="
            absolute right-3 top-3 z-10
            flex h-8 w-8
            items-center justify-center
            rounded-full
            bg-white/90
            text-[#0F172A]
            shadow-sm
            backdrop-blur
            transition-all
            duration-200
            hover:scale-105
            hover:bg-white
          "
        >
          <Heart
            className={`
              h-4 w-4
              transition-colors
              ${
                isWishlisted
                  ? "fill-[#2563EB] text-[#2563EB]"
                  : "text-[#0F172A]"
              }
            `}
            strokeWidth={1.9}
          />
        </button>
      </div>

      {/* Content */}
      <div
        className={`
          flex flex-1 flex-col gap-2 p-4
          ${isList ? "justify-center" : ""}
        `}
      >

        {/* Category */}
        <span className="text-[11px] font-medium uppercase tracking-wide text-[#64748B]">
          {formatCategoryLabel(category)}
        </span>

        {/* Name */}
        <Link
          to={`/product/${productId}`}
          className="
            line-clamp-2
            text-sm
            font-semibold
            leading-snug
            text-[#0F172A]
            transition-colors
            hover:text-[#2563EB]
            sm:text-base
          "
        >
          {name}
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5">

          <div className="flex items-center gap-0.5">

            {Array.from({ length: 5 }).map(
              (_, index) => (
                <Star
                  key={index}
                  className={`
                    h-3.5 w-3.5
                    ${
                      index <
                      Math.round(Number(rating) || 0)
                        ? "fill-[#2563EB] text-[#2563EB]"
                        : "fill-slate-200 text-slate-200"
                    }
                  `}
                />
              )
            )}

          </div>

          <span className="text-xs text-[#64748B]">
            {Number(rating || 0).toFixed(1)} (
            {reviews || 0})
          </span>

        </div>

        {/* Price */}
        <div className="flex items-center gap-2">

          <span className="text-base font-bold text-[#0F172A] sm:text-lg">
            ${Number(price).toFixed(2)}
          </span>

          {originalPrice > price && (
            <>
              <span className="text-xs text-[#64748B] line-through">
                ${Number(originalPrice).toFixed(2)}
              </span>

              <span className="text-xs font-semibold text-[#2563EB]">
                -{discount}%
              </span>
            </>
          )}

        </div>

        {/* Buttons */}
        <div
          className={`
            mt-2 flex gap-2
            ${isList ? "sm:mt-auto" : ""}
          `}
        >

          {/* Add Cart */}
          <button
            type="button"
            onClick={handleAddToCart}
            className="
              inline-flex flex-1
              items-center justify-center
              gap-1.5
              rounded-full
              bg-[#2563EB]
              px-3 py-2.5
              text-xs
              font-semibold
              text-white
              transition-all
              duration-200
              hover:bg-[#1d4ed8]
              active:scale-[0.98]
              sm:text-sm
            "
          >
            <ShoppingCart
              className="h-4 w-4"
              strokeWidth={2}
            />

            {isLoggedIn
              ? "Add to Cart"
              : "Login to Add"}
          </button>

          {/* View */}
          <Link
            to={`/product/${productId}`}
            aria-label="View product"
            className="
              inline-flex
              items-center
              justify-center
              rounded-full
              border
              border-slate-200
              px-3 py-2.5
              text-[#0F172A]
              transition-all
              duration-200
              hover:border-[#2563EB]/40
              hover:bg-[#EFF6FF]
              active:scale-[0.98]
            "
          >
            <Eye
              className="h-4 w-4"
              strokeWidth={1.9}
            />
          </Link>

        </div>

      </div>
    </div>
  );
}

function formatCategoryLabel(slug = "") {
  return slug
    .split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1)
    )
    .join(" & ");
}