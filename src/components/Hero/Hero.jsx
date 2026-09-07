import { Link } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import { ArrowRight, Truck, RotateCcw, ShieldCheck } from "lucide-react";

const FEATURES = [
  { icon: Truck, label: "Free Shipping" },
  { icon: RotateCcw, label: "Easy Returns" },
  { icon: ShieldCheck, label: "Secure Payment" },
];

const productImage =
  "https://imgs.search.brave.com/drw-Qy8HZ85gqn8ZIME3XMNKrZmR5gGz361unBSrRoo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE2/MDM4MDgwMzMxNzYt/OWQxMzRlNmYyYzc0/P2ZtPWpwZyZxPTYw/Jnc9MzAwMCZhdXRv/PWZvcm1hdCZmaXQ9/Y3JvcCZpeGxpYj1y/Yi00LjEuMCZpeGlk/PU0zd3hNakEzZkRC/OE1IeHpaV0Z5WTJo/OE5ueDhjMmh2WlhN/bE1qQndhRzkwYjJk/eVlYQm9lWHhsYm53/d2ZId3dmSHg4TUE9/PQ";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-2 lg:gap-10 lg:px-8 lg:py-28">
        {/* Left column — copy */}
        <div className="flex flex-col items-start text-left">
          <span className="inline-flex items-center rounded-full bg-[#EFF6FF] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#2563EB]">
            New Collection
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-[#0F172A] sm:text-5xl lg:text-[3.4rem]">
            Upgrade Your Style
            <br />
            With Something Better
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-[#64748B] sm:text-lg">
            Discover premium products, exclusive collections and great deals —
            all in one place.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              to="/shop"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#2563EB] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(37,99,235,0.55)] transition-all duration-200 hover:bg-[#1d4ed8] hover:shadow-[0_10px_28px_-6px_rgba(37,99,235,0.6)] active:scale-[0.98]"
            >
              Shop Now
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>

            <Link
              to="/collections"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-7 py-3.5 text-sm font-semibold text-[#0F172A] transition-all duration-200 hover:border-[#2563EB]/40 hover:bg-[#EFF6FF] active:scale-[0.98]"
            >
              Explore Collection
            </Link>
          </div>

          {/* Trust / feature row */}
          <ul className="mt-10 flex w-full flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-3">
            {FEATURES.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2 text-sm font-medium text-[#0F172A]"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#EFF6FF]">
                  <Icon className="h-3.5 w-3.5 text-[#2563EB]" strokeWidth={2.25} />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* Right column — product visual */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          {/* Decorative background circles */}
          <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-[#2563EB]/10 sm:h-52 sm:w-52" />
          <div className="pointer-events-none absolute -bottom-10 -left-6 h-28 w-28 rounded-full bg-[#2563EB]/10 sm:h-36 sm:w-36" />

          {/* Light-blue card holding the product image */}
          <div className="relative rounded-[2rem] bg-[#EFF6FF] p-6 shadow-[0_20px_50px_-20px_rgba(37,99,235,0.35)] sm:p-8">
            <div className="overflow-hidden rounded-[1.5rem] bg-white">
              <img
                src={productImage}
                alt="Featured product from the new collection"
                className="aspect-[4/5] w-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Floating discount card */}
            <div className="absolute -bottom-5 left-6 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_12px_30px_-10px_rgba(15,23,42,0.25)] sm:-bottom-6 sm:left-8 sm:px-5 sm:py-3.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#2563EB] text-xs font-bold text-white">
                %
              </span>
              <div className="leading-tight">
                <p className="text-sm font-bold text-[#0F172A]">Up to 40% off</p>
                <p className="text-xs text-[#64748B]">On select items</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}