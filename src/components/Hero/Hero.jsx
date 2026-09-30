import { memo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Truck, RotateCcw, ShieldCheck } from "lucide-react";

const FEATURES = [
  {
    icon: Truck,
    label: "Free Shipping",
  },
  {
    icon: RotateCcw,
    label: "Easy Returns",
  },
  {
    icon: ShieldCheck,
    label: "Secure Payment",
  },
];

const PRODUCT_IMAGE = "/images/hero/hero-product.webp";

const FeatureItem = memo(function FeatureItem({ icon: Icon, label }) {
  return (
    <li className="flex items-center gap-2 text-sm font-medium text-slate-900">
      <span
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50"
        aria-hidden="true"
      >
        <Icon
          className="h-3.5 w-3.5 text-blue-600"
          strokeWidth={2.25}
        />
      </span>

      <span>{label}</span>
    </li>
  );
});

function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-white"
      aria-labelledby="hero-title"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-20">

        {/* ================= LEFT CONTENT ================= */}
        <div className="flex flex-col items-start text-left">
          {/* Badge */}
          <span className="inline-flex items-center rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-blue-600">
            New Collection
          </span>

          {/* Heading */}
          <h1
            id="hero-title"
            className="mt-6 max-w-2xl text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.4rem]"
          >
            Upgrade Your Style
            <br />
            With Something Better
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-lg text-base leading-relaxed text-slate-500 sm:text-lg">
            Discover premium products, exclusive collections and great deals —
            all in one place.
          </p>

          {/* CTA */}
          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              to="/shop"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-[0.98]"
            >
              Shop Now

              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>

            <Link
              to="/collections"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-7 py-3.5 text-sm font-semibold text-slate-900 transition hover:border-blue-200 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-[0.98]"
            >
              Explore Collection
            </Link>
          </div>

          {/* Features */}
          <ul className="mt-10 flex w-full flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-3">
            {FEATURES.map((feature) => (
              <FeatureItem
                key={feature.label}
                icon={feature.icon}
                label={feature.label}
              />
            ))}
          </ul>
        </div>

        {/* ================= RIGHT IMAGE ================= */}
        <div className="relative w-full">

          {/* Decorative circle */}
          <div
            className="pointer-events-none absolute -right-6 -top-6 z-0 h-32 w-32 rounded-full bg-blue-600/10 sm:h-44 sm:w-44"
            aria-hidden="true"
          />

          <div
            className="pointer-events-none absolute -bottom-6 -left-6 z-0 h-24 w-24 rounded-full bg-blue-600/10 sm:h-32 sm:w-32"
            aria-hidden="true"
          />

          {/* Image Card */}
          <div className="relative z-10 overflow-hidden rounded-[2rem] bg-blue-50 p-3 shadow-xl shadow-blue-600/10 sm:p-5">
            <div className="overflow-hidden rounded-[1.5rem] bg-white">
              <img
                src={PRODUCT_IMAGE}
                alt="Featured products from the new collection"
                width="1536"
                height="768"
                className="block h-auto w-full object-contain"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(Hero);