import {
  ShieldCheck,
  Truck,
  HeartHandshake,
  Award,
  Users,
  ShoppingBag,
} from "lucide-react";

const features = [
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

function About() {
  return (
    <main className="bg-white">

      {/* Hero */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#2563EB]">
              About Maison
            </p>

            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-[#0F172A] sm:text-5xl lg:text-6xl">
              Shopping made
              <span className="text-[#2563EB]"> simple.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-[#64748B] sm:text-lg">
              Maison is a modern e-commerce platform created to make discovering
              quality products simple, convenient and enjoyable.
            </p>

            <p className="mt-4 max-w-xl text-base leading-7 text-[#64748B]">
              From fashion and electronics to lifestyle products, we bring
              carefully selected collections together in one place.
            </p>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="absolute -right-5 -top-5 h-32 w-32 rounded-full bg-[#2563EB]/10" />

            <div className="relative overflow-hidden rounded-[2rem] bg-[#EFF6FF] p-3 shadow-[0_20px_50px_-20px_rgba(37,99,235,0.3)]">
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1000&q=80"
                alt="Maison shopping experience"
                className="aspect-[4/3] w-full rounded-[1.5rem] object-cover"
              />
            </div>

            <div className="absolute -bottom-6 left-6 rounded-2xl bg-white px-5 py-4 shadow-[0_12px_30px_-10px_rgba(15,23,42,0.25)]">
              <p className="text-2xl font-bold text-[#2563EB]">100%</p>
              <p className="text-xs font-medium text-[#64748B]">
                Customer Focused
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Mission */}
      <section className="bg-[#EFF6FF] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#2563EB]">
            Our Mission
          </p>

          <h2 className="mt-3 text-3xl font-bold text-[#0F172A] sm:text-4xl">
            Making better shopping experiences
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#64748B]">
            Our mission is to create a clean, reliable and enjoyable shopping
            experience where customers can discover products they love without
            unnecessary complexity.
          </p>

        </div>
      </section>

      {/* Why Choose Us */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">

          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#2563EB]">
              Why Choose Us
            </p>

            <h2 className="mt-3 text-3xl font-bold text-[#0F172A] sm:text-4xl">
              Everything you need in one place
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-[#64748B]">
              We focus on quality, convenience and a smooth shopping
              experience.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-[0_4px_15px_-8px_rgba(15,23,42,0.12)] transition-all duration-300 hover:-translate-y-1 hover:border-[#2563EB]/30 hover:shadow-[0_18px_35px_-15px_rgba(37,99,235,0.25)]"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#EFF6FF]">
                    <Icon className="h-6 w-6 text-[#2563EB]" />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-[#0F172A]">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#64748B]">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#0F172A] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 text-center md:grid-cols-4">

          <div>
            <Users className="mx-auto h-6 w-6 text-[#60A5FA]" />
            <p className="mt-3 text-3xl font-bold text-white">10K+</p>
            <p className="mt-1 text-sm text-slate-400">Happy Customers</p>
          </div>

          <div>
            <ShoppingBag className="mx-auto h-6 w-6 text-[#60A5FA]" />
            <p className="mt-3 text-3xl font-bold text-white">500+</p>
            <p className="mt-1 text-sm text-slate-400">Products</p>
          </div>

          <div>
            <Award className="mx-auto h-6 w-6 text-[#60A5FA]" />
            <p className="mt-3 text-3xl font-bold text-white">4.8/5</p>
            <p className="mt-1 text-sm text-slate-400">Average Rating</p>
          </div>

          <div>
            <HeartHandshake className="mx-auto h-6 w-6 text-[#60A5FA]" />
            <p className="mt-3 text-3xl font-bold text-white">24/7</p>
            <p className="mt-1 text-sm text-slate-400">Support</p>
          </div>

        </div>
      </section>

    </main>
  );
}

export default About;