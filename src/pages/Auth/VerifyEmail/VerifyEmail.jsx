import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, ShoppingBag } from "lucide-react";

import { verifyEmail } from "../../../api/authApi.js";

export default function VerifyEmail() {
  const navigate = useNavigate();

  // Email sessionStorage se milega
  const email = sessionStorage.getItem("verifyEmail") || "";

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Email check
    if (!email) {
      setError("Email not found. Please register again.");
      return;
    }

    // OTP check
    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      setLoading(true);

      const data = await verifyEmail(email, otp);

      console.log("VERIFY SUCCESS:", data);

      setSuccess("Email verified successfully!");

      // Verification complete hone ke baad email remove
      sessionStorage.removeItem("verifyEmail");

      // Login page par bhejo
      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (error) {
      console.error("VERIFY ERROR:", error);

      setError(
        error.message || "OTP verification failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#EFF6FF] px-4 py-10 sm:py-16">
      <div className="mx-auto max-w-md">

        {/* Logo + Heading */}
        <div className="mb-8 text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2563EB] text-white shadow-lg">
            <ShoppingBag className="h-7 w-7" />
          </div>

          <h1 className="mt-5 text-3xl font-bold text-[#0F172A]">
            Verify Your Email
          </h1>

          <p className="mt-2 text-sm text-[#64748B]">
            Enter the 6-digit OTP sent to your email.
          </p>

        </div>

        {/* Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_15px_40px_-20px_rgba(15,23,42,0.25)] sm:p-8">

          {/* Email */}
          <div className="mb-5 rounded-xl bg-slate-50 px-4 py-3">

            <p className="text-xs text-slate-500">
              OTP sent to
            </p>

            <p className="mt-1 break-all text-sm font-semibold text-slate-800">
              {email || "Email not found"}
            </p>

          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600">
              {success}
            </div>
          )}

          {/* OTP Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* OTP Input */}
            <div>

              <label
                htmlFor="otp"
                className="mb-2 block text-sm font-semibold text-[#0F172A]"
              >
                Enter OTP
              </label>

              <div className="relative">

                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#64748B]" />

                <input
                  id="otp"
                  name="otp"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => {
                    const value = e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 6);

                    setOtp(value);
                    setError("");
                  }}
                  placeholder="Enter 6-digit OTP"
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-center text-lg font-semibold tracking-[0.4em] text-[#0F172A] outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10"
                />

              </div>

            </div>

            {/* Verify Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#2563EB] px-4 py-3 font-semibold text-white transition hover:bg-[#1d4ed8] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Verifying..."
                : "Verify Email"}
            </button>

          </form>

          {/* Login */}
          <div className="mt-7 border-t border-slate-100 pt-6 text-center">

            <p className="text-sm text-[#64748B]">
              Already verified?{" "}

              <Link
                to="/login"
                className="font-semibold text-[#2563EB] hover:underline"
              >
                Login
              </Link>
            </p>

          </div>

        </div>

        {/* Back Home */}
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