import { Link, useLocation } from "react-router-dom";
import { CheckCircle, ShoppingBag, ArrowRight } from "lucide-react";

export default function RegisterSuccess() {
  const location = useLocation();

  const username = location.state?.username || "there";

  return (
    <main className="min-h-screen bg-[#EFF6FF] px-4 py-10 sm:py-16">
      <div className="mx-auto flex min-h-[80vh] max-w-md items-center justify-center">

        <div className="w-full rounded-3xl border border-slate-200 bg-white p-7 text-center shadow-[0_20px_60px_-25px_rgba(15,23,42,0.3)] sm:p-10">

          {/* Success Icon */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-11 w-11 text-green-600" />
          </div>

          {/* Heading */}
          <h1 className="mt-7 text-3xl font-bold text-[#0F172A]">
            Congratulations! 🎉
          </h1>

          {/* User Name */}
          <p className="mt-3 text-xl font-semibold text-[#2563EB]">
            Welcome, {username}!
          </p>

          {/* Message */}
          <p className="mt-4 leading-7 text-[#64748B]">
            Your account has been created successfully.
            You are all set to explore our store.
          </p>

          {/* Shopping Message */}
          <div className="mt-6 rounded-2xl bg-[#EFF6FF] p-5">
            <ShoppingBag className="mx-auto h-8 w-8 text-[#2563EB]" />

            <p className="mt-3 font-semibold text-[#0F172A]">
              Happy Shopping! 🛍️
            </p>

            <p className="mt-1 text-sm text-[#64748B]">
              Discover products you'll love.
            </p>
          </div>

          {/* Shop Button */}
          <Link
            to="/shop"
            className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-5 py-3.5 font-semibold text-white transition hover:bg-[#1d4ed8] active:scale-[0.98]"
          >
            Start Shopping
            <ArrowRight className="h-5 w-5" />
          </Link>

          {/* Home */}
          <Link
            to="/"
            className="mt-4 inline-block text-sm font-medium text-[#64748B] hover:text-[#2563EB]"
          >
            Back to Home
          </Link>

        </div>
      </div>
    </main>
  );
}