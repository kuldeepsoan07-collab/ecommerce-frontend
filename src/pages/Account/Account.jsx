import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  ShieldCheck,
  LogOut,
  Package,
  MapPin,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

export default function Account() {
  const navigate = useNavigate();

  const { user, logout, loading, isLoggedIn } = useAuth();

  // Auth check complete hone tak
  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900" />
      </div>
    );
  }

  // Login nahi hai
  if (!isLoggedIn) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <User size={50} className="mb-4 text-gray-400" />

        <h1 className="text-2xl font-semibold text-gray-900">
          Please login
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Login to view your account information.
        </p>

        <button
          onClick={() => navigate("/login")}
          className="mt-6 rounded-full bg-gray-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          Login
        </button>
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm text-gray-500">
            My Account
          </p>

          <h1 className="mt-1 text-3xl font-semibold text-gray-900 sm:text-4xl">
            Account
          </h1>
        </div>

        {/* Profile Card */}
        <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-7">

          {/* Profile Header */}
          <div className="flex flex-col gap-4 border-b border-gray-100 pb-6 sm:flex-row sm:items-center">
            
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gray-100">
              <User size={30} className="text-gray-700" />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {user?.username}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {user?.email}
              </p>
            </div>
          </div>

          {/* Account Information */}
          <div className="pt-6">

            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              Account Information
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">

              {/* Username */}
              <div className="rounded-xl border border-gray-100 p-4">
                <div className="flex items-center gap-3">
                  <User
                    size={20}
                    className="text-gray-500"
                  />

                  <div>
                    <p className="text-xs text-gray-400">
                      Username
                    </p>

                    <p className="mt-1 text-sm font-medium text-gray-900">
                      {user?.username}
                    </p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="rounded-xl border border-gray-100 p-4">
                <div className="flex items-center gap-3">
                  <Mail
                    size={20}
                    className="text-gray-500"
                  />

                  <div className="min-w-0">
                    <p className="text-xs text-gray-400">
                      Email
                    </p>

                    <p className="mt-1 truncate text-sm font-medium text-gray-900">
                      {user?.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Account Status */}
              <div className="rounded-xl border border-gray-100 p-4">
                <div className="flex items-center gap-3">
                  <ShieldCheck
                    size={20}
                    className="text-gray-500"
                  />

                  <div>
                    <p className="text-xs text-gray-400">
                      Account Status
                    </p>

                    <p className="mt-1 text-sm font-medium text-green-600">
                      Verified
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Future Features */}
        <section className="mt-6 grid gap-4 sm:grid-cols-2">

          {/* Orders */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100">
              <Package size={21} />
            </div>

            <h3 className="mt-4 font-semibold text-gray-900">
              My Orders
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Your order history will appear here.
            </p>

            <button
              disabled
              className="mt-4 cursor-not-allowed rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-400"
            >
              Coming Soon
            </button>
          </div>

          {/* Address */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100">
              <MapPin size={21} />
            </div>

            <h3 className="mt-4 font-semibold text-gray-900">
              My Address
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Your saved delivery addresses will appear here.
            </p>

            <button
              disabled
              className="mt-4 cursor-not-allowed rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-400"
            >
              Coming Soon
            </button>
          </div>

        </section>

        {/* Logout */}
        <section className="mt-6 rounded-2xl bg-white p-5 shadow-sm sm:p-6">
          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
          >
            <LogOut size={19} />
            Logout
          </button>
        </section>

      </div>
    </main>
  );
}