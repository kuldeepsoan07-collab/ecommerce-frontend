import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, ShoppingBag } from "lucide-react";

import { loginUser } from "../../../api/authApi.js";
import { useAuth } from "../../../context/AuthContext.jsx";

export default function Login() {
  const navigate = useNavigate();

  // AuthContext
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      setError("");

      const data = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      console.log("LOGIN SUCCESS:", data);

      // AuthContext me user + access token save
      login(data.accessToken, data.user);

      // Login ke baad home
      navigate("/");
    } catch (error) {
      console.error("LOGIN ERROR:", error);

      setError(error.message || "Login failed. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-[#EFF6FF] px-4 py-10 sm:py-16">
      <div className="mx-auto max-w-md">

        {/* Logo / Heading */}
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2563EB] text-white shadow-lg">
            <ShoppingBag className="h-7 w-7" />
          </div>

          <h1 className="mt-5 text-3xl font-bold text-[#0F172A]">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-[#64748B]">
            Login to your account and continue shopping.
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_15px_40px_-20px_rgba(15,23,42,0.25)] sm:p-8">

          {/* Error */}
          {error && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-[#0F172A]"
              >
                Email Address
              </label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#64748B]" />

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-[#0F172A] outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-[#0F172A]"
              >
                Password
              </label>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#64748B]" />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-11 text-sm text-[#0F172A] outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#2563EB]"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-[#2563EB] hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full rounded-xl bg-[#2563EB] px-4 py-3 font-semibold text-white transition hover:bg-[#1d4ed8] active:scale-[0.98]"
            >
              Login
            </button>
          </form>

          {/* Register */}
          <div className="mt-7 border-t border-slate-100 pt-6 text-center">
            <p className="text-sm text-[#64748B]">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-[#2563EB] hover:underline"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-sm font-medium text-[#64748B] hover:text-[#2563EB]"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}