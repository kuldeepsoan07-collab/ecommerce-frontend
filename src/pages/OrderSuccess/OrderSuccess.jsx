import { Link, useLocation } from "react-router-dom";
import { CheckCircle, ShoppingBag, Package } from "lucide-react";

export default function OrderSuccess() {
  const location = useLocation();

  const orderId =
    location.state?.orderId ||
    `ORD-${Date.now().toString().slice(-6)}`;

  return (
    <main className="min-h-screen bg-[#F8FAFC] px-4 py-16">

      <div className="mx-auto max-w-xl">

        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12">

          {/* Success Icon */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#EFF6FF]">
            <CheckCircle
              className="h-12 w-12 text-[#2563EB]"
              strokeWidth={1.8}
            />
          </div>

          {/* Heading */}
          <h1 className="mt-6 text-3xl font-bold text-[#0F172A]">
            Order Placed Successfully!
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#64748B]">
            Thank you for your purchase. Your order has
            been successfully placed and will be processed
            shortly.
          </p>

          {/* Order ID */}
          <div className="mt-8 rounded-2xl bg-[#F8FAFC] p-5">

            <p className="text-xs font-medium uppercase tracking-wider text-[#64748B]">
              Order ID
            </p>

            <p className="mt-2 text-lg font-bold text-[#2563EB]">
              {orderId}
            </p>

          </div>

          {/* Info */}
          <div className="mt-6 grid grid-cols-2 gap-3">

            <div className="rounded-2xl border border-slate-200 p-4">

              <Package
                className="mx-auto h-6 w-6 text-[#2563EB]"
                strokeWidth={1.8}
              />

              <p className="mt-2 text-xs text-[#64748B]">
                Order Processing
              </p>

            </div>

            <div className="rounded-2xl border border-slate-200 p-4">

              <ShoppingBag
                className="mx-auto h-6 w-6 text-[#2563EB]"
                strokeWidth={1.8}
              />

              <p className="mt-2 text-xs text-[#64748B]">
                Thank You
              </p>

            </div>

          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">

            <Link
              to="/shop"
              className="flex-1 rounded-full bg-[#2563EB] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1D4ED8]"
            >
              Continue Shopping
            </Link>

            <Link
              to="/"
              className="flex-1 rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-[#0F172A] transition hover:bg-[#F8FAFC]"
            >
              Go to Home
            </Link>

          </div>

        </div>

      </div>

    </main>
  );
}