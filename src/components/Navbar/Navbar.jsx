import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  LogIn,
  LogOut,
} from "lucide-react";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "Categories", to: "/categories" },
  { label: "About", to: "/about" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const { user, logout, isLoggedIn } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const cartCount = cart.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

  const wishlistCount = wishlist.length;

  // ==============================
  // ACTIVE LINK
  // ==============================

  const isActive = (to) => {
    if (to === "/") {
      return location.pathname === "/";
    }

    return location.pathname.startsWith(to);
  };

  // ==============================
  // MOBILE BODY SCROLL
  // ==============================

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // ==============================
  // SEARCH
  // ==============================

  const handleSearch = (e) => {
    e.preventDefault();

    const value = searchValue.trim();

    if (!value) return;

    setMobileOpen(false);

    navigate(`/shop?search=${encodeURIComponent(value)}`);
  };

  // ==============================
  // NAVIGATION
  // ==============================

  const handleNavClick = () => {
    setMobileOpen(false);
  };

  // ==============================
  // LOGOUT
  // ==============================

  const handleLogout = async () => {
    await logout();

    setMobileOpen(false);

    navigate("/login");
  };

  return (
    <>
      {/* ==================================================
          NAVBAR
      ================================================== */}

      <header className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white">

        <div className="mx-auto flex h-14 max-w-7xl items-center px-3 sm:h-16 sm:px-5 lg:px-8">

          {/* ================= LOGO ================= */}

          <Link
            to="/"
            onClick={handleNavClick}
            className="shrink-0"
          >
            <span className="font-serif text-[1.35rem] font-semibold tracking-wide text-gray-900 sm:text-[1.6rem]">
              Maison
            </span>
          </Link>

          {/* ================= DESKTOP NAV ================= */}

          <nav className="ml-8 hidden items-center gap-7 lg:flex">

            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative py-5 text-sm font-medium transition ${
                  isActive(link.to)
                    ? "text-gray-900"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {link.label}

                {isActive(link.to) && (
                  <span className="absolute bottom-0 left-0 h-[2px] w-full bg-gray-900" />
                )}
              </Link>
            ))}

          </nav>

          {/* ================= DESKTOP SEARCH ================= */}

          <form
            onSubmit={handleSearch}
            className="ml-auto hidden w-[220px] md:block lg:w-[280px]"
          >
            <div className="relative">

              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search products..."
                className="h-10 w-full rounded-full border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm outline-none transition focus:border-gray-400 focus:bg-white"
              />

            </div>
          </form>

          {/* ================= RIGHT SIDE ================= */}

          <div className="ml-auto flex items-center gap-1 sm:gap-2 md:ml-5">

            {/* ================= WISHLIST ================= */}

            <Link
              to="/wishlist"
              className="relative flex h-9 w-9 items-center justify-center rounded-full text-gray-700 transition hover:bg-gray-100 sm:h-10 sm:w-10"
              aria-label="Wishlist"
            >
              <Heart
                size={20}
                strokeWidth={1.8}
              />

              {wishlistCount > 0 && (
                <Badge count={wishlistCount} />
              )}
            </Link>

            {/* ================= CART ================= */}

            <Link
              to="/cart"
              className="relative flex h-9 w-9 items-center justify-center rounded-full text-gray-700 transition hover:bg-gray-100 sm:h-10 sm:w-10"
              aria-label="Cart"
            >
              <ShoppingBag
                size={20}
                strokeWidth={1.8}
              />

              {cartCount > 0 && (
                <Badge count={cartCount} />
              )}
            </Link>

            {/* ================= DESKTOP ACCOUNT ================= */}

            <div className="ml-1 hidden items-center gap-1 lg:flex">

              {isLoggedIn ? (
                <>
                  {/* Account */}

                  <Link
                    to="/account"
                    className="flex max-w-[150px] items-center gap-2 rounded-full px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-100"
                  >
                    <User
                      size={19}
                      strokeWidth={1.8}
                    />

                    <span className="max-w-[100px] truncate">
                      {user?.username || "Account"}
                    </span>
                  </Link>

                  {/* Logout */}

                  <button
                    onClick={handleLogout}
                    className="flex h-9 w-9 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100"
                    title="Logout"
                  >
                    <LogOut size={17} />
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-2 rounded-full px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-100"
                >
                  <User
                    size={19}
                    strokeWidth={1.8}
                  />

                  <span>Login</span>
                </Link>
              )}

            </div>

            {/* ================= MOBILE MENU BUTTON ================= */}

            <button
              onClick={() => setMobileOpen(true)}
              className="ml-1 flex h-9 w-9 items-center justify-center rounded-full text-gray-700 transition hover:bg-gray-100 lg:hidden sm:h-10 sm:w-10"
              aria-label="Open menu"
            >
              <Menu
                size={22}
                strokeWidth={1.8}
              />
            </button>

          </div>
        </div>

        {/* ==================================================
            MOBILE SEARCH
        ================================================== */}

        <div className="border-t border-gray-100 px-3 py-2.5 md:hidden">

          <form onSubmit={handleSearch}>

            <div className="relative">

              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search products..."
                className="h-10 w-full rounded-full border border-gray-200 bg-gray-50 pl-9 pr-4 text-sm outline-none focus:border-gray-400 focus:bg-white"
              />

            </div>

          </form>

        </div>

      </header>

      {/* ==================================================
          MOBILE DRAWER
      ================================================== */}

      {mobileOpen && (
        <>
          {/* Overlay */}

          <button
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            aria-label="Close menu"
          />

          {/* Drawer */}

          <aside className="fixed right-0 top-0 z-50 flex h-full w-[88%] max-w-[360px] flex-col bg-white shadow-2xl lg:hidden">

            {/* ================= DRAWER HEADER ================= */}

            <div className="flex h-16 shrink-0 items-center justify-between border-b border-gray-100 px-4 sm:px-5">

              <Link
                to="/"
                onClick={handleNavClick}
                className="font-serif text-[1.4rem] font-semibold tracking-wide text-gray-900"
              >
                Maison
              </Link>

              <button
                onClick={() => setMobileOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>

            </div>

            {/* ================= USER SECTION ================= */}

            <div className="border-b border-gray-100 px-4 py-4 sm:px-5">

              {isLoggedIn ? (
                <Link
                  to="/account"
                  onClick={handleNavClick}
                  className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3"
                >

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white">
                    <User size={21} />
                  </div>

                  <div className="min-w-0">

                    <p className="text-xs text-gray-400">
                      Welcome back
                    </p>

                    <p className="truncate text-sm font-semibold text-gray-900">
                      {user?.username || "User"}
                    </p>

                    {user?.email && (
                      <p className="truncate text-xs text-gray-500">
                        {user.email}
                      </p>
                    )}

                  </div>

                </Link>
              ) : (
                <Link
                  to="/login"
                  onClick={handleNavClick}
                  className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3"
                >

                  <User size={20} />

                  <div>

                    <p className="text-sm font-semibold text-gray-900">
                      Login
                    </p>

                    <p className="text-xs text-gray-500">
                      Sign in to your account
                    </p>

                  </div>

                </Link>
              )}

            </div>

            {/* ================= MOBILE NAV ================= */}

            <nav className="flex-1 overflow-y-auto px-4 py-5 sm:px-5">

              <div className="space-y-1">

                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={handleNavClick}
                    className={`flex items-center rounded-xl px-4 py-3.5 text-sm font-medium transition ${
                      isActive(link.to)
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}

              </div>

              {/* ================= MY ACCOUNT ================= */}

              <div className="mt-6 border-t border-gray-100 pt-5">

                <p className="mb-3 px-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  My Account
                </p>

                <div className="space-y-1">

                  {/* Account */}

                  {isLoggedIn && (
                    <Link
                      to="/account"
                      onClick={handleNavClick}
                      className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <User
                        size={20}
                        strokeWidth={1.8}
                      />

                      <span>My Account</span>
                    </Link>
                  )}

                  {/* Wishlist */}

                  <Link
                    to="/wishlist"
                    onClick={handleNavClick}
                    className="flex items-center justify-between rounded-xl px-4 py-3.5 text-sm text-gray-700 hover:bg-gray-50"
                  >

                    <div className="flex items-center gap-3">

                      <Heart
                        size={20}
                        strokeWidth={1.8}
                      />

                      <span>Wishlist</span>

                    </div>

                    {wishlistCount > 0 && (
                      <span className="rounded-full bg-gray-900 px-2 py-0.5 text-xs text-white">
                        {wishlistCount}
                      </span>
                    )}

                  </Link>

                  {/* Cart */}

                  <Link
                    to="/cart"
                    onClick={handleNavClick}
                    className="flex items-center justify-between rounded-xl px-4 py-3.5 text-sm text-gray-700 hover:bg-gray-50"
                  >

                    <div className="flex items-center gap-3">

                      <ShoppingBag
                        size={20}
                        strokeWidth={1.8}
                      />

                      <span>Cart</span>

                    </div>

                    {cartCount > 0 && (
                      <span className="rounded-full bg-gray-900 px-2 py-0.5 text-xs text-white">
                        {cartCount}
                      </span>
                    )}

                  </Link>

                  {/* Login / Logout */}

                  {isLoggedIn ? (
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-left text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut
                        size={20}
                        strokeWidth={1.8}
                      />

                      <span>Logout</span>
                    </button>
                  ) : (
                    <Link
                      to="/login"
                      onClick={handleNavClick}
                      className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <LogIn
                        size={20}
                        strokeWidth={1.8}
                      />

                      <span>Login</span>
                    </Link>
                  )}

                </div>

              </div>

            </nav>

            {/* ================= DRAWER FOOTER ================= */}

            <div className="shrink-0 border-t border-gray-100 px-4 py-4 sm:px-5">

              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={handleNavClick}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                  <LogIn size={18} />
                  Login
                </Link>
              )}

            </div>

          </aside>
        </>
      )}
    </>
  );
}

/* ==================================================
   BADGE
================================================== */

function Badge({ count }) {
  return (
    <span className="absolute -right-0.5 -top-0.5 flex min-h-[17px] min-w-[17px] items-center justify-center rounded-full bg-gray-900 px-1 text-[10px] font-semibold leading-none text-white">
      {count > 99 ? "99+" : count}
    </span>
  );
}