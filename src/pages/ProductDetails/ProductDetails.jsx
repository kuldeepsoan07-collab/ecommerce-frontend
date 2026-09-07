import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  Heart,
  Minus,
  Plus,
  ShoppingCart,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";

import { products } from "../../data/products";
import { useCart } from "../../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Cart Context
  const { addToCart } = useCart();

  const product = products.find(
    (item) => String(item.id) === String(id)
  );

  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Product nahi mila
  if (!product) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-white px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#0F172A]">
            Product Not Found
          </h1>

          <p className="mt-3 text-[#64748B]">
            Sorry, this product does not exist.
          </p>

          <Link
            to="/shop"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#2563EB] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1D4ED8]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  // Increase quantity
  const increaseQuantity = () => {
    if (product.stock && quantity >= product.stock) {
      return;
    }

    setQuantity((prev) => prev + 1);
  };

  // Decrease quantity
  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  // Add product to cart
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  // Buy Now
  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate("/checkout");
  };

  return (
    <main className="bg-white">

      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#64748B] transition hover:text-[#2563EB]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Shop
        </Link>
      </div>

      {/* Product Section */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">

          {/* Product Image */}
          <div className="relative">

            <div className="overflow-hidden rounded[2rem] bg-[#EFF6FF]">
              <img
                src={product.image}
                alt={product.name}
                className="aspect-square w-full object-cover"
              />
            </div>

            {/* Badge */}
            {product.badge && (
              <span
                className={`absolute left-5 top-5 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide text-white ${
                  product.badge === "New"
                    ? "bg-[#0F172A]"
                    : "bg-[#2563EB]"
                }`}
              >
                {product.badge}
              </span>
            )}

            {/* Wishlist */}
            <button
              type="button"
              onClick={() => setIsWishlisted((prev) => !prev)}
              aria-label={
                isWishlisted
                  ? "Remove from wishlist"
                  : "Add to wishlist"
              }
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-105"
            >
              <Heart
                className={`h-5 w-5 ${
                  isWishlisted
                    ? "fill-[#2563EB] text-[#2563EB]"
                    : "text-[#0F172A]"
                }`}
              />
            </button>
          </div>

          {/* Product Information */}
          <div className="flex flex-col justify-center">

            {/* Category */}
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#2563EB]">
              {product.category}
            </p>

            {/* Product Name */}
            <h1 className="mt-3 text-3xl font-bold leading-tight text-[#0F172A] sm:text-4xl lg:text-5xl">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="mt-5 flex items-center gap-3">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className={`h-4 w-4 ${
                      index < Math.round(product.rating)
                        ? "fill-[#2563EB] text-[#2563EB]"
                        : "fill-slate-200 text-slate-200"
                    }`}
                  />
                ))}
              </div>

              <span className="text-sm font-medium text-[#0F172A]">
                {product.rating.toFixed(1)}
              </span>

              <span className="text-sm text-[#64748B]">
                ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="text-3xl font-bold text-[#0F172A]">
                ${product.price.toFixed(2)}
              </span>

              {product.originalPrice > product.price && (
                <>
                  <span className="text-lg text-[#64748B] line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>

                  <span className="rounded-full bg-[#EFF6FF] px-3 py-1 text-sm font-bold text-[#2563EB]">
                    {product.discount}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Short Description */}
            <p className="mt-6 text-base leading-7 text-[#64748B]">
              {product.description ||
                `Discover the quality and style of ${product.name}. A carefully selected product designed to deliver great value and an excellent shopping experience.`}
            </p>

            {/* Divider */}
            <div className="my-7 h-px bg-slate-200" />

            {/* Quantity */}
            <div>
              <p className="text-sm font-semibold text-[#0F172A]">
                Quantity
              </p>

              <div className="mt-3 inline-flex items-center rounded-full border border-slate-200">
                <button
                  type="button"
                  onClick={decreaseQuantity}
                  className="flex h-11 w-11 items-center justify-center rounded-l-full text-[#0F172A] transition hover:bg-[#EFF6FF]"
                >
                  <Minus className="h-4 w-4" />
                </button>

                <span className="flex h-11 w-12 items-center justify-center border-x border-slate-200 text-sm font-semibold">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={increaseQuantity}
                  className="flex h-11 w-11 items-center justify-center rounded-r-full text-[#0F172A] transition hover:bg-[#EFF6FF]"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              {/* Stock */}
              {product.stock !== undefined && (
                <p className="mt-2 text-xs text-[#64748B]">
                  {product.stock} items available
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="mt-6 grid gap-3 sm:grid-cols-2">

              {/* Add to Cart */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2563EB] px-6 py-4 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(37,99,235,0.55)] transition hover:bg-[#1D4ED8] active:scale-[0.98]"
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </button>

              {/* Buy Now */}
              <button
                type="button"
                onClick={handleBuyNow}
                className="inline-flex items-center justify-center rounded-full border border-[#2563EB] bg-white px-6 py-4 text-sm font-semibold text-[#2563EB] transition hover:bg-[#EFF6FF] active:scale-[0.98]"
              >
                Buy Now
              </button>

            </div>

            {/* Features */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

              {/* Shipping */}
              <div className="rounded-2xl bg-[#EFF6FF] p-4">
                <Truck className="h-5 w-5 text-[#2563EB]" />

                <p className="mt-2 text-xs font-bold text-[#0F172A]">
                  Free Shipping
                </p>

                <p className="mt-1 text-[11px] text-[#64748B]">
                  On eligible orders
                </p>
              </div>

              {/* Returns */}
              <div className="rounded-2xl bg-[#EFF6FF] p-4">
                <RotateCcw className="h-5 w-5 text-[#2563EB]" />

                <p className="mt-2 text-xs font-bold text-[#0F172A]">
                  Easy Returns
                </p>

                <p className="mt-1 text-[11px] text-[#64748B]">
                  Hassle-free returns
                </p>
              </div>

              {/* Payment */}
              <div className="rounded-2xl bg-[#EFF6FF] p-4">
                <ShieldCheck className="h-5 w-5 text-[#2563EB]" />

                <p className="mt-2 text-xs font-bold text-[#0F172A]">
                  Secure Payment
                </p>

                <p className="mt-1 text-[11px] text-[#64748B]">
                  Safe checkout
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Product Details */}
      <section className="border-t border-slate-100 bg-[#F8FAFC] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">

          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#2563EB]">
              Product Information
            </p>

            <h2 className="mt-2 text-2xl font-bold text-[#0F172A] sm:text-3xl">
              Product Details
            </h2>
          </div>

          <div className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white md:grid-cols-2">

            {/* Description */}
            <div className="border-b border-slate-200 p-5 md:border-r md:p-6">
              <p className="text-sm font-semibold text-[#64748B]">
                Description
              </p>

              <p className="mt-2 text-base leading-7 text-[#0F172A]">
                {product.description || "No description available."}
              </p>
            </div>

            {/* Brand */}
            <div className="border-b border-slate-200 p-5 md:p-6">
              <p className="text-sm font-semibold text-[#64748B]">
                Brand
              </p>

              <p className="mt-2 text-base font-semibold text-[#0F172A]">
                {product.brand || "Not specified"}
              </p>
            </div>

            {/* Rating */}
            <div className="border-b border-slate-200 p-5 md:border-r md:p-6">
              <p className="text-sm font-semibold text-[#64748B]">
                Average Rating
              </p>

              <div className="mt-2 flex items-center gap-2">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={`h-4 w-4 ${
                        index < Math.round(product.rating)
                          ? "fill-[#2563EB] text-[#2563EB]"
                          : "fill-slate-200 text-slate-200"
                      }`}
                    />
                  ))}
                </div>

                <span className="text-sm font-medium text-[#0F172A]">
                  {product.rating.toFixed(1)}
                </span>

                <span className="text-sm text-[#64748B]">
                  ({product.reviews} ratings)
                </span>
              </div>
            </div>

            {/* Sizes */}
            <div className="border-b border-slate-200 p-5 md:p-6">
              <p className="text-sm font-semibold text-[#64748B]">
                Sizes
              </p>

              {product.sizes?.length > 0 ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <span
                      key={size}
                      className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-[#0F172A]"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="mt-2 text-sm text-[#64748B]">
                  Not applicable
                </p>
              )}
            </div>

            {/* Stock */}
            <div className="border-b border-slate-200 p-5 md:border-r md:p-6">
              <p className="text-sm font-semibold text-[#64748B]">
                Stock
              </p>

              <p className="mt-2 text-base font-semibold text-green-600">
                {product.stock ?? 0} available
              </p>
            </div>

            {/* Category */}
            <div className="border-b border-slate-200 p-5 md:p-6">
              <p className="text-sm font-semibold text-[#64748B]">
                Category
              </p>

              <p className="mt-2 text-base font-semibold capitalize text-[#0F172A]">
                {product.category}
              </p>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}

export default ProductDetails;