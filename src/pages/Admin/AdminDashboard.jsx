import { Link } from "react-router-dom";
import {
  Package,
  ShoppingBag,
  Users,
  Plus,
  ArrowRight,
  LayoutDashboard,
} from "lucide-react";

function AdminDashboard() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-sm font-medium text-[#64748B]">
            <LayoutDashboard className="h-4 w-4" />
            Admin Panel
          </div>

          <h1 className="mt-3 text-3xl font-bold text-[#0F172A] sm:text-4xl">
            Dashboard
          </h1>

          <p className="mt-2 text-[#64748B]">
            Welcome to your store administration panel.
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {/* Products */}
          <Link
            to="/admin/products"
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EFF6FF]">
                <Package className="h-6 w-6 text-[#2563EB]" />
              </div>

              <ArrowRight className="h-5 w-5 text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#2563EB]" />
            </div>

            <p className="mt-6 text-sm font-medium text-[#64748B]">
              Products
            </p>

            <h2 className="mt-1 text-3xl font-bold text-[#0F172A]">
              Manage
            </h2>

            <p className="mt-2 text-sm text-[#64748B]">
              Add, edit and delete products.
            </p>
          </Link>

          {/* Orders */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EFF6FF]">
              <ShoppingBag className="h-6 w-6 text-[#2563EB]" />
            </div>

            <p className="mt-6 text-sm font-medium text-[#64748B]">
              Orders
            </p>

            <h2 className="mt-1 text-3xl font-bold text-[#0F172A]">
              Coming Soon
            </h2>

            <p className="mt-2 text-sm text-[#64748B]">
              Order management will be added later.
            </p>
          </div>

          {/* Users */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EFF6FF]">
              <Users className="h-6 w-6 text-[#2563EB]" />
            </div>

            <p className="mt-6 text-sm font-medium text-[#64748B]">
              Customers
            </p>

            <h2 className="mt-1 text-3xl font-bold text-[#0F172A]">
              Coming Soon
            </h2>

            <p className="mt-2 text-sm text-[#64748B]">
              Customer management will be added later.
            </p>
          </div>

        </div>

        {/* Quick Actions */}
        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-[#0F172A]">
            Quick Actions
          </h2>

          <p className="mt-1 text-sm text-[#64748B]">
            Quickly manage your store.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">

            {/* Add Product */}
            <Link
              to="/admin/products"
              className="flex items-center justify-between rounded-xl border border-slate-200 p-5 transition hover:border-[#2563EB] hover:bg-[#EFF6FF]"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2563EB]">
                  <Plus className="h-5 w-5 text-white" />
                </div>

                <div>
                  <p className="font-semibold text-[#0F172A]">
                    Add Product
                  </p>

                  <p className="mt-1 text-xs text-[#64748B]">
                    Create a new product
                  </p>
                </div>
              </div>

              <ArrowRight className="h-5 w-5 text-[#64748B]" />
            </Link>

            {/* Manage Products */}
            <Link
              to="/admin/products"
              className="flex items-center justify-between rounded-xl border border-slate-200 p-5 transition hover:border-[#2563EB] hover:bg-[#EFF6FF]"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EFF6FF]">
                  <Package className="h-5 w-5 text-[#2563EB]" />
                </div>

                <div>
                  <p className="font-semibold text-[#0F172A]">
                    Manage Products
                  </p>

                  <p className="mt-1 text-xs text-[#64748B]">
                    View and edit your products
                  </p>
                </div>
              </div>

              <ArrowRight className="h-5 w-5 text-[#64748B]" />
            </Link>

          </div>
        </section>

        {/* Store Status */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h2 className="font-bold text-[#0F172A]">
                Store Status
              </h2>

              <p className="mt-1 text-sm text-[#64748B]">
                Your store is currently active.
              </p>
            </div>

            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-600">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              Active
            </div>

          </div>
        </section>

      </div>
    </main>
  );
}

export default AdminDashboard;