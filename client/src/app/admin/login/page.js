"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLogin() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [focused, setFocused] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost/server/controllers/auth.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "login", ...form }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("gg_token", data.token);
        localStorage.setItem("gg_admin", JSON.stringify(data.admin));
        router.push("/admin/dashboard");
      } else {
        setError(data.message || "Invalid credentials. Please try again.");
      }
    } catch {
      setError("Unable to connect to server. Make sure XAMPP is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary-950 flex items-center justify-center relative overflow-hidden px-4">
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(#ff0404 1px, transparent 1px), linear-gradient(90deg, #ff0404 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-secondary-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-secondary-500/5 blur-[80px] pointer-events-none" />

      {/* Corner decorations */}
      <div className="absolute top-6 left-6 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-secondary-500 animate-pulse" />
        <span className="text-primary-500 text-xs font-mono tracking-widest uppercase">
          Admin Portal
        </span>
      </div>
      <div className="absolute top-6 right-6 text-primary-700 text-xs font-mono">
        v1.0.0
      </div>
      <div className="absolute bottom-6 left-6 text-primary-700 text-xs font-mono tracking-widest">
        GRAYGOLD INVESTMENT
      </div>

      {/* Card */}
      <div className="w-full max-w-md relative z-10">
        {/* Logo block */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary-500 mb-5 relative">
            <span className="text-white font-black text-2xl tracking-tight">
              G
            </span>
            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-primary-950 border-2 border-secondary-400" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Welcome back
          </h1>
          <p className="text-primary-400 mt-2 text-sm font-medium">
            Sign in to your admin account
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-primary-900/60 backdrop-blur-xl border border-primary-700/50 rounded-3xl p-8 shadow-2xl shadow-black/60">
          {error && (
            <div className="mb-6 flex items-start gap-3 bg-secondary-500/10 border border-secondary-500/30 rounded-2xl p-4">
              <svg
                className="w-5 h-5 text-secondary-400 flex-shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                />
              </svg>
              <p className="text-secondary-300 text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-primary-300 tracking-widest uppercase">
                Email Address
              </label>
              <div
                className={`flex items-center gap-3 bg-primary-800/80 border rounded-2xl px-4 py-3.5 transition-all duration-300 ${
                  focused === "email"
                    ? "border-secondary-500/70 shadow-lg shadow-secondary-500/10"
                    : "border-primary-600/50 hover:border-primary-500/50"
                }`}
              >
                <svg
                  className="w-4 h-4 text-primary-400 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused("")}
                  placeholder="admin@graygold.com"
                  required
                  className="flex-1 bg-transparent text-white text-sm placeholder:text-primary-600 outline-none font-medium"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-primary-300 tracking-widest uppercase">
                Password
              </label>
              <div
                className={`flex items-center gap-3 bg-primary-800/80 border rounded-2xl px-4 py-3.5 transition-all duration-300 ${
                  focused === "password"
                    ? "border-secondary-500/70 shadow-lg shadow-secondary-500/10"
                    : "border-primary-600/50 hover:border-primary-500/50"
                }`}
              >
                <svg
                  className="w-4 h-4 text-primary-400 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused("")}
                  placeholder="Enter your password"
                  required
                  className="flex-1 bg-transparent text-white text-sm placeholder:text-primary-600 outline-none font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-primary-500 hover:text-primary-300 transition-colors"
                >
                  {showPassword ? (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-secondary-500 hover:bg-secondary-600 active:scale-[0.98] text-white font-black text-sm py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-secondary-500/30 hover:shadow-secondary-500/50 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <svg
                    className="w-4 h-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-primary-700/50 text-center">
            <p className="text-primary-500 text-sm">
              Don't have an account?{" "}
              <Link
                href="/admin/signup"
                className="text-secondary-400 hover:text-secondary-300 font-bold transition-colors"
              >
                Create one
              </Link>
            </p>
          </div>
        </div>

        {/* Security note */}
        <p className="text-center text-primary-600 text-xs mt-6 flex items-center justify-center gap-1.5">
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          Secured with JWT authentication
        </p>
      </div>
    </div>
  );
}
