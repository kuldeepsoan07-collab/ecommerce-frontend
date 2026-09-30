
import { memo, useCallback } from "react";
import {
  ArrowRight,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

import { Link } from "react-router-dom";

const SHOP_LINKS = [
  { name: "All Products", path: "/shop" },
  { name: "Fashion", path: "/category/fashion" },
  { name: "Electronics", path: "/category/electronics" },
  { name: "Watches", path: "/category/watches" },
];

const QUICK_LINKS = [
  { name: "Home", path: "/" },
  { name: "Categories", path: "/categories" },
  { name: "Wishlist", path: "/wishlist" },
  { name: "Cart", path: "/cart" },
];

const SUPPORT_LINKS = [
  { name: "Contact Us", path: "/contact" },
  { name: "Shipping & Delivery", path: "/shipping" },
  { name: "Returns & Refunds", path: "/returns" },
  { name: "Privacy Policy", path: "/privacy" },
];

const SOCIAL_LINKS = [
  {
    name: "Facebook",
    href: "#",
    icon: FaFacebookF,
  },
  {
    name: "Instagram",
    href: "#",
    icon: FaInstagram,
  },
  {
    name: "Twitter",
    href: "#",
    icon: FaTwitter,
  },
  {
    name: "YouTube",
    href: "#",
    icon: FaYoutube,
  },
];

function Footer() {
  const handleNewsletterSubmit = useCallback((event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const email = new FormData(form).get("email");

    if (!email) return;

    // API integration later:
    // newsletterApi.subscribe(email)

    console.log("Newsletter email:", email);

    form.reset();
  }, []);

  return (
    <footer className="bg-slate-900 text-white">
      {/* =====================================================
          Newsletter
      ====================================================== */}
      <section
        className="border-b border-white/10"
        aria-labelledby="newsletter-title"
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-12 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          {/* Newsletter text */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-400">
              Stay Updated
            </p>

            <h2
              id="newsletter-title"
              className="mt-2 text-2xl font-bold sm:text-3xl"
            >
              Get the latest offers
            </h2>

            <p className="mt-2 max-w-lg text-sm leading-6 text-slate-400">
              Subscribe to our newsletter and get exclusive deals and new
              product updates.
            </p>
          </div>

          {/* Newsletter form */}
          <form
            onSubmit={handleNewsletterSubmit}
            className="flex w-full max-w-md gap-2"
          >
            <label className="relative flex-1">
              <span className="sr-only">Email address</span>

              <Mail
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />

              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="Enter your email"
                className="h-12 w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-4 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 placeholder:text-slate-500"
              />
            </label>

            <button
              type="submit"
              className="flex h-12 shrink-0 items-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              Subscribe

              <ArrowRight
                className="h-4 w-4"
                aria-hidden="true"
              />
            </button>
          </form>
        </div>
      </section>

      {/* =====================================================
          Main Footer
      ====================================================== */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              to="/"
              aria-label="Maison home"
              className="inline-flex items-center text-2xl font-bold tracking-tight"
            >
              Maison

              <span
                className="ml-1.5 h-2 w-2 rounded-full bg-blue-600"
                aria-hidden="true"
              />
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">
              Discover premium products, exclusive collections and great deals
              — all in one place.
            </p>

            {/* Contact */}
            <div className="mt-6 space-y-3">
              <ContactItem
                icon={MapPin}
                text="Raipur, Chhattisgarh, India"
              />

              <ContactItem
                icon={Phone}
                text="+91 98765 43210"
                href="tel:+919876543210"
              />

              <ContactItem
                icon={Mail}
                text="support@maison.com"
                href="mailto:support@maison.com"
              />
            </div>

            {/* Social */}
            <div className="mt-7 flex gap-3">
              {SOCIAL_LINKS.map((social) => (
                <SocialLink
                  key={social.name}
                  {...social}
                />
              ))}
            </div>
          </div>

          {/* Footer columns */}
          <FooterColumn
            title="Shop"
            links={SHOP_LINKS}
          />

          <FooterColumn
            title="Quick Links"
            links={QUICK_LINKS}
          />

          <FooterColumn
            title="Support"
            links={SUPPORT_LINKS}
          />
        </div>
      </div>

      {/* =====================================================
          Bottom
      ====================================================== */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-xs text-slate-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>
            © {new Date().getFullYear()} Maison. All rights reserved.
          </p>

          <div className="flex gap-5">
            <Link
              to="/terms"
              className="transition-colors hover:text-white focus:outline-none focus:text-white"
            >
              Terms & Conditions
            </Link>

            <Link
              to="/privacy"
              className="transition-colors hover:text-white focus:outline-none focus:text-white"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* =========================================================
   Contact Item
========================================================= */

const ContactItem = memo(function ContactItem({
  icon: Icon,
  text,
  href,
}) {
  const content = (
    <>
      <Icon
        className="h-4 w-4 shrink-0 text-blue-400"
        aria-hidden="true"
      />

      <span>{text}</span>
    </>
  );

  if (!href) {
    return (
      <div className="flex items-center gap-3 text-sm text-slate-400">
        {content}
      </div>
    );
  }

  return (
    <a
      href={href}
      className="flex items-center gap-3 text-sm text-slate-400 transition-colors hover:text-white focus:outline-none focus:text-white"
    >
      {content}
    </a>
  );
});

/* =========================================================
   Social Link
========================================================= */

const SocialLink = memo(function SocialLink({
  name,
  href,
  icon: Icon,
}) {
  return (
    <a
      href={href}
      aria-label={name}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-colors hover:border-blue-600 hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
    >
      <Icon
        className="h-4 w-4"
        aria-hidden="true"
      />
    </a>
  );
});

/* =========================================================
   Footer Column
========================================================= */

const FooterColumn = memo(function FooterColumn({
  title,
  links,
}) {
  return (
    <nav aria-label={title}>
      <h3 className="text-sm font-semibold text-white">
        {title}
      </h3>

      <ul className="mt-5 space-y-3">
        {links.map(({ name, path }) => (
          <li key={name}>
            <Link
              to={path}
              className="text-sm text-slate-400 transition-colors hover:text-blue-400 focus:outline-none focus:text-blue-400"
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
});

export default memo(Footer);

