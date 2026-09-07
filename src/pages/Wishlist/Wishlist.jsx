import { Link } from "react-router-dom";
import { Heart, Trash2 } from "lucide-react";

import ProductCard from "../../components/ProductCard/ProductCard";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";

function Wishlist() {
  const {
    wishlist,
    removeFromWishlist,
    clearWishlist,
  } = useWishlist();

  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <main className="min-h-[70vh] bg-[#F8FAFC] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl rounded-3xl bg-white px-6 py-16 text-center shadow-sm">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#EFF6FF]">
            <Heart className="h-9 w-9 text-[#2563EB]" />
          </div>

          <h1 className="mt-6 text-3xl font-bold text-[#0F172A]">
            Your Wishlist is Empty
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#64748B]">
            Save your favorite products here and find them easily later.
          </p>

          <Link
            to="/shop"
            className="mt-7 inline-flex rounded-full bg-[#2563EB] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#1D4ED8]"
          >
            Explore Products
          </Link>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[70vh] bg-[#F8FAFC] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">

      <div className="mx-auto max-w-7xl">

        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#2563EB]">
              Saved Products
            </p>

            <h1 className="mt-2 text-3xl font-bold text-[#0F172A] sm:text-4xl">
              My Wishlist
            </h1>

            <p className="mt-2 text-sm text-[#64748B]">
              {wishlist.length}{" "}
              {wishlist.length === 1 ? "product" : "products"} saved
            </p>
          </div>

          <button
            type="button"
            onClick={clearWishlist}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-[#0F172A] transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
            Clear Wishlist
          </button>

        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">

          {wishlist.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={true}
              onToggleWishlist={() =>
                removeFromWishlist(product.id)
              }
              onAddToCart={() =>
                addToCart(product, 1)
              }
              view="grid"
            />
          ))}

        </div>

      </div>
    </main>
  );
}

export default Wishlist;