
import { memo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CATEGORIES = [
  {
    name: "Fashion",
    slug: "fashion",
    description: "Modern styles for every occasion",
    image: "/images/categories/fashion.webp",
  },
  {
    name: "Electronics",
    slug: "electronics",
    description: "Smart technology for everyday life",
    image: "/images/categories/electronics.webp",
  },
  {
    name: "Laptops",
    slug: "laptops",
    description: "Powerful laptops for work and play",
    image: "/images/categories/laptops.webp",
  },
  {
    name: "Watches",
    slug: "watches",
    description: "Elegant watches that define your style",
    image: "/images/categories/watches.webp",
  },
  {
    name: "Bags",
    slug: "bags",
    description: "Stylish bags made for every journey",
    image: "/images/categories/bags.webp",
  },
  {
    name: "Headphones",
    slug: "headphones",
    description: "Immersive sound with premium comfort",
    image: "/images/categories/headphones.webp",
  },
  {
    name: "Home & Living",
    slug: "home-living",
    description: "Beautiful products for your home",
    image: "/images/categories/home-living.webp",
  },
  {
    name: "Fitness",
    slug: "fitness",
    description: "Everything you need for your fitness journey",
    image: "/images/categories/fitness.webp",
  },
];

const CategoryCard = memo(function CategoryCard({ category }) {
  const { name, slug, description, image } = category;

  return (
    <Link
      to={`/category/${slug}`}
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-600/10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-blue-50">
        <img
          src={image}
          alt={`${name} products`}
          width="800"
          height="600"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Overlay */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden="true"
        />

        {/* Floating arrow */}
        <span
          className="absolute bottom-3 right-3 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-white text-blue-600 opacity-0 shadow-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
          aria-hidden="true"
        >
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        <h3 className="text-base font-bold text-slate-900 transition-colors duration-200 group-hover:text-blue-600 sm:text-lg">
          {name}
        </h3>

        <p className="mt-1.5 text-xs leading-5 text-slate-500 sm:text-sm">
          {description}
        </p>

        <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600">
          Explore
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  );
});

function Categories() {
  return (
    <section
      className="bg-white px-4 py-14 sm:px-6 sm:py-16 lg:px-8"
      aria-labelledby="categories-title"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-600">
              Explore Collection
            </p>

            <h2
              id="categories-title"
              className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
            >
              Shop by Category
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
              Explore our carefully selected categories and discover products
              made for your everyday needs.
            </p>
          </div>

          <Link
            to="/shop"
            className="group inline-flex w-fit items-center gap-2 text-sm font-semibold text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            View All Products

            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
          {CATEGORIES.map((category) => (
            <CategoryCard
              key={category.slug}
              category={category}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(Categories);

