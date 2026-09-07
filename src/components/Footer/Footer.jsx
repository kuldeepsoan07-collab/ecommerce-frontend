import {
  Mail,
  MapPin,
  Phone,
  ArrowRight,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

import { Link } from "react-router-dom";

const shopLinks = [
  { name: "All Products", path: "/shop" },
  { name: "Fashion", path: "/category/fashion" },
  { name: "Electronics", path: "/category/electronics" },
  { name: "Watches", path: "/category/watches" },
];

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "Categories", path: "/categories" },
  { name: "Wishlist", path: "/wishlist" },
  { name: "Cart", path: "/cart" },
];

const supportLinks = [
  { name: "Contact Us", path: "/contact" },
  { name: "Shipping & Delivery", path: "/shipping" },
  { name: "Returns & Refunds", path: "/returns" },
  { name: "Privacy Policy", path: "/privacy" },
];

function Footer() {
  return (
    <footer className="bg-[#0F172A] text-white">

      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-12 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#60A5FA]">
              Stay Updated
            </p>

            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
              Get the latest offers
            </h2>

            <p className="mt-2 max-w-lg text-sm text-slate-400">
              Subscribe to our newsletter and get exclusive deals and new
              product updates.
            </p>
          </div>

          <form className="flex w-full max-w-md gap-2">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                type="email"
                placeholder="Enter your email"
                className="h-12 w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-[#2563EB]"
              />
            </div>

            <button
              type="submit"
              className="flex h-12 items-center gap-2 rounded-xl bg-[#2563EB] px-5 text-sm font-semibold transition hover:bg-[#1D4ED8]"
            >
              Subscribe
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

        </div>
      </div>

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">

          {/* Brand */}
          <div className="lg:col-span-2">

            <Link
              to="/"
              className="inline-flex items-center text-2xl font-bold tracking-tight"
            >
              Maison
              <span className="ml-1.5 h-2 w-2 rounded-full bg-[#2563EB]" />
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">
              Discover premium products, exclusive collections and great deals
              — all in one place.
            </p>

            {/* Contact */}
            <div className="mt-6 space-y-3">

              <div className="flex items-center gap-3 text-sm text-slate-400">
                <MapPin className="h-4 w-4 shrink-0 text-[#60A5FA]" />
                Raipur, Chhattisgarh, India
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-400">
                <Phone className="h-4 w-4 shrink-0 text-[#60A5FA]" />
                +91 98765 43210
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-400">
                <Mail className="h-4 w-4 shrink-0 text-[#60A5FA]" />
                support@maison.com
              </div>

            </div>

            {/* Social */}
            <div className="mt-7 flex gap-3">

              <a
                href="#"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-slate-400 transition hover:border-[#2563EB] hover:bg-[#2563EB] hover:text-white"
              >
                <FaFacebookF className="h-4 w-4" />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-slate-400 transition hover:border-[#2563EB] hover:bg-[#2563EB] hover:text-white"
              >
                <FaInstagram className="h-4 w-4" />
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-slate-400 transition hover:border-[#2563EB] hover:bg-[#2563EB] hover:text-white"
              >
                <FaTwitter className="h-4 w-4" />
              </a>

              <a
                href="#"
                aria-label="YouTube"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-slate-400 transition hover:border-[#2563EB] hover:bg-[#2563EB] hover:text-white"
              >
                <FaYoutube className="h-4 w-4" />
              </a>

            </div>
          </div>

          {/* Shop */}
          <FooterColumn title="Shop" links={shopLinks} />

          {/* Quick Links */}
          <FooterColumn title="Quick Links" links={quickLinks} />

          {/* Support */}
          <FooterColumn title="Support" links={supportLinks} />

        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-xs text-slate-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">

          <p>
            © {new Date().getFullYear()} Maison. All rights reserved.
          </p>

          <div className="flex gap-5">
            <Link
              to="/terms"
              className="transition hover:text-white"
            >
              Terms & Conditions
            </Link>

            <Link
              to="/privacy"
              className="transition hover:text-white"
            >
              Privacy Policy
            </Link>
          </div>

        </div>
      </div>

    </footer>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-white">
        {title}
      </h3>

      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.name}>
            <Link
              to={link.path}
              className="text-sm text-slate-400 transition hover:text-[#60A5FA]"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Footer;