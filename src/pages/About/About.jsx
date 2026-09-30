
import { memo } from "react";
import {
  ShieldCheck,
  Truck,
  HeartHandshake,
  Award,
  Users,
  ShoppingBag,
} from "lucide-react";

const FEATURES = [
  {
    icon: ShoppingBag,
    title: "Quality Products",
    description:
      "We carefully select products that combine quality, style and value.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Shopping",
    description:
      "Your shopping experience is designed with security and reliability in mind.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description:
      "We aim to get your orders delivered quickly and safely to your doorstep.",
  },
  {
    icon: HeartHandshake,
    title: "Customer First",
    description:
      "Our customers are at the center of everything we do.",
  },
];

const STATS = [
  {
    icon: Users,
    value: "10K+",
    label: "Happy Customers",
  },
  {
    icon: ShoppingBag,
    value: "500+",
    label: "Products",
  },
  {
    icon: Award,
    value: "4.8/5",
    label: "Average Rating",
  },
  {
    icon: HeartHandshake,
    value: "24/7",
    label: "Support",
  },
];

/* =========================================================
   Feature Card
========================================================= */

const FeatureCard = memo(function FeatureCard({
  icon: Icon,
  title,
  description,
}) {
  return (
    <article
      className="
        rounded-2xl
        border border-slate-200
        bg-white p-6
        text-center
        shadow-sm
        transition-all duration-300
        hover:-translate-y-1
        hover:border-blue-200
        hover:shadow-lg
        hover:shadow-blue-600/10
      "
    >
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
        <Icon
          className="h-6 w-6 text-blue-600"
          strokeWidth={1.9}
          aria-hidden="true"
        />
      </div>

      <h3 className="mt-5 text-lg font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {description}
      </p>
    </article>
  );
});

/* =========================================================
   Stat Item
========================================================= */

const StatItem = memo(function StatItem({
  icon: Icon,
  value,
  label,
}) {
  return (
    <div className="text-center">
      <Icon
        className="mx-auto h-6 w-6 text-blue-400"
        strokeWidth={1.9}
        aria-hidden="true"
      />

      <p className="mt-3 text-3xl font-bold text-white">
        {value}
      </p>

      <p className="mt-1 text-sm text-slate-400">
        {label}
      </p>
    </div>
  );
});

/* =========================================================
   About Page
========================================================= */

function About() {
  return (
    <main className="bg-white">
      {/* ===================================================
          Hero
      ==================================================== */}
      <section
        className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
        aria-labelledby="about-title"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          {/* Content */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-600">
              About Maison
            </p>

            <h1
              id="about-title"
              className="mt-4 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
            >
              Shopping made
              <span className="text-blue-600"> simple.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-slate-500 sm:text-lg">
              Maison is a modern e-commerce platform created to make
              discovering quality products simple, convenient and enjoyable.
            </p>

            <p className="mt-4 max-w-xl text-base leading-7 text-slate-500">
              From fashion and electronics to lifestyle products, we bring
              carefully selected collections together in one place.
            </p>
          </div>

          {/* Image */}
          <div className="relative mx-auto w-full max-w-xl">
            {/* Decorative circle */}
            <div
              className="pointer-events-none absolute -right-5 -top-5 h-32 w-32 rounded-full bg-blue-600/10"
              aria-hidden="true"
            />

            <div className="relative overflow-hidden rounded-[2rem] bg-blue-50 p-3 shadow-xl shadow-blue-600/10">
              <img
                src="/images/about/about-shopping.webp"
                alt="Maison shopping experience"
                width="1000"
                height="750"
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full rounded-[1.5rem] object-cover"
              />
            </div>

            {/* Customer focused badge */}
            <div className="absolute -bottom-6 left-6 rounded-2xl bg-white px-5 py-4 shadow-xl shadow-slate-900/10">
              <p className="text-2xl font-bold text-blue-600">
                100%
              </p>

              <p className="text-xs font-medium text-slate-500">
                Customer Focused
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          Mission
      ==================================================== */}
      <section
        className="bg-blue-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
        aria-labelledby="mission-title"
      >
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-600">
            Our Mission
          </p>

          <h2
            id="mission-title"
            className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
          >
            Making better shopping experiences
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-500">
            Our mission is to create a clean, reliable and enjoyable shopping
            experience where customers can discover products they love without
            unnecessary complexity.
          </p>
        </div>
      </section>

      {/* ===================================================
          Why Choose Us
      ==================================================== */}
      <section
        className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
        aria-labelledby="features-title"
      >
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-600">
              Why Choose Us
            </p>

            <h2
              id="features-title"
              className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
            >
              Everything you need in one place
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              We focus on quality, convenience and a smooth shopping
              experience.
            </p>
          </div>

          {/* Features */}
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((feature) => (
              <FeatureCard
                key={feature.title}
                {...feature}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================
          Stats
      ==================================================== */}
      <section
        className="bg-slate-900 px-4 py-14 sm:px-6 sm:py-16 lg:px-8"
        aria-label="Maison statistics"
      >
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 md:grid-cols-4">
          {STATS.map((stat) => (
            <StatItem
              key={stat.label}
              {...stat}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default memo(About);

