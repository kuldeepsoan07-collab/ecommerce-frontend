import { Link } from "react-router-dom";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowLeft,
} from "lucide-react";

import { useCart } from "../../context/CartContext";

function Cart() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartTotal,
  } = useCart();

  // Empty Cart
  if (cart.length === 0) {
    return (
      <main className="min-h-[70vh] bg-[#F8FAFC] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-center rounded-3xl bg-white px-6 py-16 text-center shadow-sm">

          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#EFF6FF]">
            <ShoppingBag className="h-9 w-9 text-[#2563EB]" />
          </div>

          <h1 className="mt-6 text-3xl font-bold text-[#0F172A]">
            Your Cart is Empty
          </h1>

          <p className="mt-3 max-w-md text-sm leading-6 text-[#64748B]">
            Looks like you haven't added anything to your cart yet.
            Explore our products and find something you love.
          </p>

          <Link
            to="/shop"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#2563EB] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#1D4ED8]"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>

        </div>
      </main>
    );
  }

  const shipping = cartTotal >= 100 ? 0 : 10;
  const total = cartTotal + shipping;

  return (
    <main className="bg-[#F8FAFC] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">

      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#2563EB]">
            Shopping Cart
          </p>

          <h1 className="mt-2 text-3xl font-bold text-[#0F172A] sm:text-4xl">
            Your Cart
          </h1>

          <p className="mt-2 text-sm text-[#64748B]">
            {cart.length}{" "}
            {cart.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

          {/* Cart Products */}
          <div className="space-y-4">

            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center"
              >

                {/* Image */}
                <Link
                  to={`/product/${item.id}`}
                  className="shrink-0"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-28 w-full rounded-xl object-cover sm:h-28 sm:w-28"
                  />
                </Link>

                {/* Product Info */}
                <div className="flex flex-1 flex-col">

                  <span className="text-[11px] font-semibold uppercase tracking-wide text-[#64748B]">
                    {item.category}
                  </span>

                  <Link
                    to={`/product/${item.id}`}
                    className="mt-1 text-base font-semibold text-[#0F172A] transition hover:text-[#2563EB]"
                  >
                    {item.name}
                  </Link>

                  <p className="mt-2 text-lg font-bold text-[#0F172A]">
                    ${item.price.toFixed(2)}
                  </p>

                  {/* Quantity */}
                  <div className="mt-4 flex items-center justify-between gap-4">

                    <div className="inline-flex items-center rounded-full border border-slate-200">

                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.quantity - 1
                          )
                        }
                        disabled={item.quantity <= 1}
                        className="flex h-9 w-9 items-center justify-center rounded-l-full text-[#0F172A] transition hover:bg-[#EFF6FF] disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <Minus className="h-4 w-4" />
                      </button>

                      <span className="flex h-9 w-10 items-center justify-center border-x border-slate-200 text-sm font-semibold text-[#0F172A]">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.quantity + 1
                          )
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-r-full text-[#0F172A] transition hover:bg-[#EFF6FF]"
                      >
                        <Plus className="h-4 w-4" />
                      </button>

                    </div>

                    {/* Remove */}
                    <button
                      type="button"
                      onClick={() =>
                        removeFromCart(item.id)
                      }
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-red-500 transition hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                      Remove
                    </button>

                  </div>
                </div>

                {/* Item Total */}
                <div className="text-left sm:text-right">
                  <p className="text-xs text-[#64748B]">
                    Item Total
                  </p>

                  <p className="mt-1 text-lg font-bold text-[#0F172A]">
                    $
                    {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>

              </div>
            ))}

            {/* Continue Shopping */}
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 pt-3 text-sm font-semibold text-[#2563EB] hover:text-[#1D4ED8]"
            >
              <ArrowLeft className="h-4 w-4" />
              Continue Shopping
            </Link>

          </div>

          {/* Order Summary */}
          <div className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">

            <h2 className="text-xl font-bold text-[#0F172A]">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4">

              {/* Subtotal */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#64748B]">
                  Subtotal
                </span>

                <span className="font-semibold text-[#0F172A]">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>

              {/* Shipping */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#64748B]">
                  Shipping
                </span>

                <span className="font-semibold text-[#0F172A]">
                  {shipping === 0
                    ? "FREE"
                    : `$${shipping.toFixed(2)}`}
                </span>
              </div>

              <div className="h-px bg-slate-200" />

              {/* Total */}
              <div className="flex items-center justify-between">
                <span className="text-base font-semibold text-[#0F172A]">
                  Total
                </span>

                <span className="text-2xl font-bold text-[#2563EB]">
                  ${total.toFixed(2)}
                </span>
              </div>

            </div>

            {/* Checkout */}
            <Link
              to="/checkout"
              className="mt-7 flex w-full items-center justify-center rounded-full bg-[#2563EB] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#1D4ED8] active:scale-[0.98]"
            >
              Proceed to Checkout
            </Link>

            {/* Free Shipping Message */}
            {cartTotal < 100 && (
              <p className="mt-4 text-center text-xs leading-5 text-[#64748B]">
                Add $
                {(100 - cartTotal).toFixed(2)} more to
                get free shipping.
              </p>
            )}

            {cartTotal >= 100 && (
              <p className="mt-4 text-center text-xs font-medium text-green-600">
                🎉 You qualify for free shipping!
              </p>
            )}

          </div>

        </div>
      </div>

    </main>
  );
}

export default Cart;