import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShoppingBag,
  User,
} from "lucide-react";


import { registerUser } from "../../../api/authApi.js";

// import { registerUser } from "../../../api/api.js";

export default function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

    setError("");

    // Validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill all fields.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      // Backend ko confirmPassword nahi bhejna hai
      const data = await registerUser({
        username: formData.name,
        email: formData.email,
        password: formData.password,
      });

      console.log("Registration successful:", data);

// Save email for OTP verification
sessionStorage.setItem("verifyEmail", formData.email);

// Verify Email page par bhejo
navigate("/verify-email");

    } catch (error) {
      console.error("REGISTER ERROR:", error);

      setError(
        error.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#EFF6FF] px-4 py-10 sm:py-16">
      <div className="mx-auto max-w-md">

        {/* Heading */}
        <div className="mb-8 text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2563EB] text-white shadow-lg">
            <ShoppingBag className="h-7 w-7" />
          </div>

          <h1 className="mt-5 text-3xl font-bold text-[#0F172A]">
            Create Account
          </h1>

          <p className="mt-2 text-sm text-[#64748B]">
            Create your account and start shopping.
          </p>

        </div>

        {/* Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8">

          {/* Error */}
          {error && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-[#0F172A]"
              >
                Full Name
              </label>

              <div className="relative">

                <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#64748B]" />

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10"
                />

              </div>
            </div>

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
                  className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10"
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
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-11 outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (prev) => !prev
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B]"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>

              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-semibold text-[#0F172A]"
              >
                Confirm Password
              </label>

              <div className="relative">

                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#64748B]" />

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  value={
                    formData.confirmPassword
                  }
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-11 outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      (prev) => !prev
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B]"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>

              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#2563EB] px-4 py-3 font-semibold text-white transition hover:bg-[#1d4ed8] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>

          </form>

          {/* Login */}
          <div className="mt-7 border-t border-slate-100 pt-6 text-center">

            <p className="text-sm text-[#64748B]">
              Already have an account?{" "}

              <Link
                to="/login"
                className="font-semibold text-[#2563EB] hover:underline"
              >
                Login
              </Link>
            </p>

          </div>

        </div>

        {/* Home */}
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