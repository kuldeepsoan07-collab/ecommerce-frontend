import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    name: "Fashion",
    slug: "fashion",
    description: "Modern styles for every occasion",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Electronics",
    slug: "electronics",
    description: "Smart technology for everyday life",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Laptops",
    slug: "laptops",
    description: "Powerful laptops for work and play",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Watches",
    slug: "watches",
    description: "Elegant watches that define your style",
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Bags",
    slug: "bags",
    description: "Stylish bags made for every journey",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Headphones",
    slug: "headphones",
    description: "Immersive sound with premium comfort",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Home & Living",
    slug: "home-living",
    description: "Beautiful products for your home",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Fitness",
    slug: "fitness",
    description: "Everything you need for your fitness journey",
    image:
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80",
  },
];

function Categories() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#2563EB]">
              Explore Collection
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl">
              Shop by Category
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[#64748B] sm:text-base">
              Explore our carefully selected categories and discover products
              made for your everyday needs.
            </p>
          </div>

          <Link
            to="/shop"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-[#2563EB]"
          >
            View All Products
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.slug}
              to={`/category/${category.slug}`}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_15px_-8px_rgba(15,23,42,0.15)] transition-all duration-300 hover:-translate-y-1 hover:border-[#2563EB]/30 hover:shadow-[0_18px_35px_-15px_rgba(37,99,235,0.3)]"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#EFF6FF]">
                <img
                  src={category.image}
                  alt={`${category.name} products`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Blue overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Arrow */}
                <div className="absolute bottom-3 right-3 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-white text-[#2563EB] opacity-0 shadow-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5">
                <h3 className="text-base font-bold text-[#0F172A] transition-colors duration-200 group-hover:text-[#2563EB] sm:text-lg">
                  {category.name}
                </h3>

                <p className="mt-1.5 text-xs leading-5 text-[#64748B] sm:text-sm">
                  {category.description}
                </p>

                <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB]">
                  Explore
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;