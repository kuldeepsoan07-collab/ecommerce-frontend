
import { memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  ShieldCheck,
  LogOut,
  Package,
  MapPin,
  ArrowRight,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

/* =========================================================
   Loading Skeleton
========================================================= */

const AccountSkeleton = memo(function AccountSkeleton() {
  return (
    <main className="min-h-[70vh] bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl animate-pulse">
        {/* Header */}
        <div className="mb-8">
          <div className="h-4 w-24 rounded bg-slate-200" />
          <div className="mt-2 h-9 w-40 rounded bg-slate-200" />
        </div>

        {/* Profile */}
        <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-7">
          <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
            <div className="h-16 w-16 rounded-full bg-slate-200" />

            <div className="space-y-2">
              <div className="h-5 w-36 rounded bg-slate-200" />
              <div className="h-4 w-48 rounded bg-slate-200" />
            </div>
          </div>

          <div className="pt-6">
            <div className="mb-4 h-5 w-40 rounded bg-slate-200" />

            <div className="grid gap-4 sm:grid-cols-2">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="h-20 rounded-xl border border-slate-100 bg-slate-50"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="h-40 rounded-2xl bg-white shadow-sm" />
          <div className="h-40 rounded-2xl bg-white shadow-sm" />
        </div>
      </div>
    </main>
  );
});

/* =========================================================
   Info Item
========================================================= */

const InfoItem = memo(function InfoItem({
  icon: Icon,
  label,
  value,
  valueClassName = "text-slate-900",
}) {
  return (
    <div className="rounded-xl border border-slate-100 p-4">
      <div className="flex items-center gap-3">
        <Icon
          className="h-5 w-5 shrink-0 text-slate-500"
          strokeWidth={1.9}
          aria-hidden="true"
        />

        <div className="min-w-0">
          <p className="text-xs text-slate-400">
            {label}
          </p>

          <p
            className={`mt-1 truncate text-sm font-medium ${valueClassName}`}
          >
            {value || "Not available"}
          </p>
        </div>
      </div>
    </div>
  );
});

/* =========================================================
   Feature Card
========================================================= */

const AccountFeature = memo(function AccountFeature({
  icon: Icon,
  title,
  description,
  to,
}) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
        <Icon
          className="h-5.5 w-5.5 text-blue-600"
          strokeWidth={1.9}
          aria-hidden="true"
        />
      </div>

      <h3 className="mt-4 font-semibold text-slate-900">
        {title}
      </h3>

      <p className="mt-1 text-sm leading-6 text-slate-500">
        {description}
      </p>

      <Link
        to={to}
        className="
          mt-4 inline-flex items-center gap-1.5
          rounded-full bg-blue-50
          px-4 py-2
          text-sm font-medium text-blue-600
          transition-colors
          hover:bg-blue-100
          focus:outline-none
          focus:ring-2 focus:ring-blue-500
          focus:ring-offset-2
        "
      >
        View

        <ArrowRight
          className="h-3.5 w-3.5"
          aria-hidden="true"
        />
      </Link>
    </div>
  );
});

/* =========================================================
   Account Page
========================================================= */

function Account() {
  const navigate = useNavigate();

  const {
    user,
    logout,
    loading,
    isLoggedIn,
  } = useAuth();

  /* -------------------------------------------------------
     Loading
  ------------------------------------------------------- */

  if (loading) {
    return <AccountSkeleton />;
  }

  /* -------------------------------------------------------
     Not logged in
  ------------------------------------------------------- */

  if (!isLoggedIn) {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
          <User
            className="h-8 w-8 text-blue-600"
            strokeWidth={1.8}
            aria-hidden="true"
          />
        </div>

        <h1 className="mt-5 text-2xl font-bold text-slate-900">
          Please login
        </h1>

        <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
          Login to view your account information.
        </p>

        <button
          type="button"
          onClick={() => navigate("/login")}
          className="
            mt-6 rounded-full
            bg-blue-600
            px-6 py-3
            text-sm font-semibold text-white
            transition-colors
            hover:bg-blue-700
            active:scale-[0.98]
            focus:outline-none
            focus:ring-2 focus:ring-blue-500
            focus:ring-offset-2
          "
        >
          Login
        </button>
      </main>
    );
  }

  /* -------------------------------------------------------
     Logout
  ------------------------------------------------------- */

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const username =
    user?.username ||
    user?.name ||
    "User";

  const email =
    user?.email ||
    "Email not available";

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* =================================================
            Header
        ================================================== */}
        <header className="mb-8">
          <p className="text-sm font-medium text-slate-500">
            My Account
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Account
          </h1>
        </header>

        {/* =================================================
            Profile Card
        ================================================== */}
        <section
          className="rounded-2xl bg-white p-5 shadow-sm sm:p-7"
          aria-labelledby="profile-title"
        >
          {/* Profile Header */}
          <div className="flex flex-col gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-center">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-blue-50">
              <User
                className="h-8 w-8 text-blue-600"
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </div>

            <div className="min-w-0">
              <h2
                id="profile-title"
                className="truncate text-xl font-bold text-slate-900"
              >
                {username}
              </h2>

              <p className="mt-1 truncate text-sm text-slate-500">
                {email}
              </p>
            </div>
          </div>

          {/* Account Information */}
          <div className="pt-6">
            <h3 className="mb-4 text-lg font-semibold text-slate-900">
              Account Information
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <InfoItem
                icon={User}
                label="Username"
                value={username}
              />

              <InfoItem
                icon={Mail}
                label="Email"
                value={email}
              />

              <InfoItem
                icon={ShieldCheck}
                label="Account Status"
                value="Verified"
                valueClassName="text-emerald-600"
              />
            </div>
          </div>
        </section>

        {/* =================================================
            Account Features
        ================================================== */}
        <section className="mt-6 grid gap-4 sm:grid-cols-2">
          <AccountFeature
            icon={Package}
            title="My Orders"
            description="View your orders and track your purchase history."
            to="/orders"
          />

          <AccountFeature
            icon={MapPin}
            title="My Address"
            description="Manage your saved delivery addresses."
            to="/account/addresses"
          />
        </section>

        {/* =================================================
            Logout
        ================================================== */}
        <section className="mt-6 rounded-2xl bg-white p-5 shadow-sm sm:p-6">
          <button
            type="button"
            onClick={handleLogout}
            className="
              flex w-full items-center justify-center gap-2
              rounded-xl
              border border-red-200
              px-4 py-3
              text-sm font-semibold text-red-600
              transition-colors
              hover:bg-red-50
              focus:outline-none
              focus:ring-2 focus:ring-red-500
              focus:ring-offset-2
            "
          >
            <LogOut
              className="h-5 w-5"
              aria-hidden="true"
            />

            Logout
          </button>
        </section>
      </div>
    </main>
  );
}

export default memo(Account);

