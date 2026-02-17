"use client";

import { useState } from "react";
import Link from "next/link";

// ─── Floating label input ────────────────────────────────────────────────────
function FloatingInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  required,
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className="relative group">
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        placeholder=" "
        className={`w-full bg-primary-50/60 border-b-2 rounded-t-lg px-4 pt-6 pb-2.5 text-sm text-primary-900 font-medium outline-none transition-all duration-250 placeholder-transparent ${
          focused
            ? "border-secondary-500 bg-secondary-50/40"
            : "border-primary-200 hover:border-primary-300 hover:bg-primary-50"
        }`}
      />
      <label
        htmlFor={id}
        className={`absolute left-4 pointer-events-none font-semibold transition-all duration-200 ${
          active
            ? "top-1.5 text-[10px] text-secondary-500 tracking-[0.12em] uppercase"
            : "top-1/2 -translate-y-1/2 text-sm text-primary-400"
        }`}
      >
        {label}
        {required && <span className="text-secondary-500 ml-0.5">*</span>}
      </label>
      {/* Animated focus underline */}
      <div
        className={`absolute bottom-0 left-0 h-0.5 bg-secondary-500 transition-all duration-300 ${focused ? "w-full" : "w-0"}`}
      />
    </div>
  );
}

// ─── Floating label select ───────────────────────────────────────────────────
function FloatingSelect({ id, label, options, value, onChange, required }) {
  const [focused, setFocused] = useState(false);
  const active = focused || value !== "";

  return (
    <div className="relative group">
      <select
        id={id}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        className={`w-full bg-primary-50/60 border-b-2 rounded-t-lg px-4 pt-6 pb-2.5 text-sm font-medium outline-none appearance-none cursor-pointer transition-all duration-250 ${
          value === "" ? "text-transparent" : "text-primary-900"
        } ${
          focused
            ? "border-secondary-500 bg-secondary-50/40"
            : "border-primary-200 hover:border-primary-300 hover:bg-primary-50"
        }`}
      >
        <option value="" disabled />
        {options.map((o) => (
          <option
            key={o.value}
            value={o.value}
            className="text-primary-900 bg-white"
          >
            {o.label}
          </option>
        ))}
      </select>
      <label
        htmlFor={id}
        className={`absolute left-4 pointer-events-none font-semibold transition-all duration-200 ${
          active
            ? "top-1.5 text-[10px] text-secondary-500 tracking-[0.12em] uppercase"
            : "top-1/2 -translate-y-1/2 text-sm text-primary-400"
        }`}
      >
        {label}
        {required && <span className="text-secondary-500 ml-0.5">*</span>}
      </label>
      <svg
        className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-400 pointer-events-none"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
      <div
        className={`absolute bottom-0 left-0 h-0.5 bg-secondary-500 transition-all duration-300 ${focused ? "w-full" : "w-0"}`}
      />
    </div>
  );
}

// ─── Step pill ───────────────────────────────────────────────────────────────
function StepPill({ n, label, active, done, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!done && !active}
      className={`flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
        active
          ? "bg-secondary-500 text-white shadow-lg shadow-secondary-500/30"
          : done
            ? "bg-primary-100 text-primary-600 hover:bg-primary-200 cursor-pointer"
            : "bg-transparent text-primary-300 cursor-default"
      }`}
    >
      <span
        className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black flex-shrink-0 ${
          active
            ? "bg-white text-secondary-600"
            : done
              ? "bg-secondary-500 text-white"
              : "bg-primary-200 text-primary-400"
        }`}
      >
        {done ? (
          <svg
            className="w-3 h-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        ) : (
          n
        )}
      </span>
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

// ─── Data ────────────────────────────────────────────────────────────────────
const INQUIRY_TYPES = [
  { value: "rental", label: "Rental" },
  { value: "purchase", label: "Purchase" },
  { value: "investment", label: "Investment" },
  { value: "management", label: "Property Management" },
  { value: "valuation", label: "Valuation" },
];
const BUYER_INFO = [
  { value: "first_time", label: "I'm a first time buyer" },
  { value: "experienced", label: "I'm an experienced buyer" },
  { value: "investor", label: "I'm an investor" },
  { value: "relocating", label: "I'm relocating" },
  { value: "diaspora", label: "I'm in the diaspora" },
];
const PROPERTY_TYPES = [
  { value: "duplex", label: "Fully Detached Duplex" },
  { value: "semi_duplex", label: "Semi-Detached Duplex" },
  { value: "terrace", label: "Terrace Duplex" },
  { value: "apartment", label: "Apartment / Flat" },
  { value: "penthouse", label: "Penthouse" },
  { value: "villa", label: "Villa" },
  { value: "commercial", label: "Commercial Property" },
];
const BEDS_OPTIONS = [
  { value: "1", label: "1 Bedroom" },
  { value: "2", label: "2 Bedrooms" },
  { value: "3", label: "3 Bedrooms" },
  { value: "4", label: "4 Bedrooms" },
  { value: "5", label: "5 Bedrooms" },
  { value: "6+", label: "6+ Bedrooms" },
];
const BUDGET_OPTIONS = [
  { value: "50m", label: "Up to ₦50,000,000" },
  { value: "100m", label: "Up to ₦100,000,000" },
  { value: "200m", label: "Up to ₦200,000,000" },
  { value: "500m", label: "Up to ₦500,000,000" },
  { value: "1b", label: "Up to ₦1,000,000,000" },
  { value: "1b+", label: "₦1,000,000,000+" },
];
const LOCATIONS = [
  { value: "ikoyi", label: "Ikoyi" },
  { value: "eko_atlantic", label: "Eko Atlantic City" },
  { value: "lekki", label: "Lekki" },
  { value: "vi", label: "Victoria Island" },
  { value: "banana_island", label: "Banana Island" },
  { value: "maitama", label: "Maitama, Abuja" },
  { value: "asokoro", label: "Asokoro, Abuja" },
  { value: "asaba", label: "Asaba" },
  { value: "enugu", label: "Enugu" },
];

const QUICK_TYPES = [
  { value: "rental", icon: "🏠", label: "Rent", desc: "Find a rental" },
  { value: "purchase", icon: "🔑", label: "Buy", desc: "Purchase property" },
  {
    value: "investment",
    icon: "📈",
    label: "Invest",
    desc: "Grow your wealth",
  },
];

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function InquiryPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    inquiryType: "",
    buyerInfo: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    propertyType: "",
    maxPrice: "",
    beds: "",
    location: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const step1Valid = form.inquiryType && form.buyerInfo;
  const step2Valid =
    form.firstName && form.lastName && form.email && form.phone;
  const step3Valid = form.propertyType && form.maxPrice;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  // ── Success screen ──────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-primary-950 flex items-center justify-center px-6 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full border border-white/5 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full border border-white/[0.03] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-secondary-500/10 blur-3xl" />

        <div className="relative z-10 max-w-md w-full">
          {/* Checkmark */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-2 border-secondary-500/30 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-secondary-500 flex items-center justify-center shadow-xl shadow-secondary-500/40 animate-success-pop">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              {/* Pulse rings */}
              <div className="absolute inset-0 rounded-full border border-secondary-500/20 animate-ping-slow" />
            </div>
          </div>

          <div className="text-center space-y-4 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-500/10 border border-secondary-500/20">
              <div className="w-1.5 h-1.5 rounded-full bg-secondary-400 animate-pulse" />
              <span className="text-secondary-400 text-xs font-bold uppercase tracking-widest">
                Inquiry Submitted
              </span>
            </div>
            <h2 className="text-4xl font-black text-white tracking-tight">
              We'll be in
              <br />
              touch shortly.
            </h2>
            <p className="text-primary-400 leading-relaxed">
              Thank you,{" "}
              <span className="text-white font-semibold">{form.firstName}</span>
              . A GrayGold advisor will contact you at{" "}
              <span className="text-secondary-400 font-semibold">
                {form.email}
              </span>{" "}
              within 24 hours.
            </p>
          </div>

          {/* Summary card */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-8 space-y-3">
            <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-3">
              Inquiry Summary
            </p>
            {[
              {
                label: "Type",
                value: INQUIRY_TYPES.find((t) => t.value === form.inquiryType)
                  ?.label,
              },
              {
                label: "Property",
                value: PROPERTY_TYPES.find((t) => t.value === form.propertyType)
                  ?.label,
              },
              {
                label: "Budget",
                value: BUDGET_OPTIONS.find((t) => t.value === form.maxPrice)
                  ?.label,
              },
              {
                label: "Location",
                value: LOCATIONS.find((t) => t.value === form.location)?.label,
              },
            ]
              .filter((r) => r.value)
              .map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-primary-500">{row.label}</span>
                  <span className="text-white font-semibold">{row.value}</span>
                </div>
              ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/"
              className="flex-1 text-center px-6 py-3.5 rounded-xl bg-white text-primary-900 font-bold text-sm hover:bg-primary-100 hover:-translate-y-0.5 transition-all duration-200"
            >
              Back to Home
            </Link>
            <Link
              href="/listings"
              className="flex-1 text-center px-6 py-3.5 rounded-xl bg-secondary-500 text-white font-bold text-sm hover:bg-secondary-600 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-secondary-500/30 transition-all duration-200"
            >
              Browse Listings
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Main form ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-primary-50 flex flex-col">
      {/* ── Top bar ── */}
      <div className="bg-white border-b border-primary-100 px-6 lg:px-12 py-4 flex items-center justify-between sticky top-0 z-20 backdrop-blur-sm">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-primary-950 flex items-center justify-center group-hover:bg-secondary-500 transition-colors duration-300">
            <span className="text-white font-black text-xs">GG</span>
          </div>
          <span className="font-black text-primary-900 text-sm tracking-tight">
            GrayGold
          </span>
        </Link>

        {/* Step pills */}
        <div className="flex items-center gap-1.5">
          {[
            { n: 1, label: "Inquiry" },
            { n: 2, label: "Details" },
            { n: 3, label: "Property" },
          ].map(({ n, label }) => (
            <StepPill
              key={n}
              n={n}
              label={label}
              active={step === n}
              done={step > n}
              onClick={() => step > n && setStep(n)}
            />
          ))}
        </div>

        <div className="text-xs text-primary-400 font-semibold hidden sm:block">
          Step <span className="text-primary-700 font-black">{step}</span> of 3
        </div>
      </div>

      {/* ── Progress bar (full width) ── */}
      <div className="h-0.5 bg-primary-100">
        <div
          className="h-full bg-gradient-to-r from-secondary-500 to-secondary-400 transition-all duration-700 ease-out"
          style={{ width: `${(step / 3) * 100}%` }}
        />
      </div>

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left info panel */}
        <aside className="lg:w-[38%] xl:w-[34%] bg-primary-950 px-8 py-12 lg:px-10 lg:py-16 flex flex-col justify-between lg:sticky lg:top-[57px] lg:h-[calc(100vh-57px)]">
          {/* Top content */}
          <div className="space-y-10">
            {/* Headline */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-px w-6 bg-secondary-500" />
                <span className="text-secondary-400 text-[10px] font-bold uppercase tracking-[0.3em]">
                  Inquiry Form
                </span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-black text-white leading-[1.05] tracking-tighter">
                Got any
                <br />
                inquiry?
                <br />
                <em className="not-italic text-primary-600">Start here.</em>
              </h1>
              <p className="text-primary-400 text-sm leading-relaxed pt-1 max-w-xs">
                Tell us exactly what you're looking for. A dedicated GrayGold
                advisor will reach out within 24 hours.
              </p>
            </div>

            {/* Step list */}
            <div className="space-y-4">
              {[
                {
                  n: 1,
                  label: "Inquiry Type",
                  desc: "What kind of property need?",
                },
                { n: 2, label: "Your Details", desc: "How we'll contact you" },
                {
                  n: 3,
                  label: "Property Needs",
                  desc: "Location, budget & specs",
                },
              ].map(({ n, label, desc }) => (
                <div key={n} className="flex items-start gap-3">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5 transition-all duration-300 ${
                      step > n
                        ? "bg-secondary-500 text-white"
                        : step === n
                          ? "bg-white text-primary-950 ring-2 ring-secondary-500 ring-offset-2 ring-offset-primary-950"
                          : "bg-white/10 text-primary-500"
                    }`}
                  >
                    {step > n ? (
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      n
                    )}
                  </div>
                  <div>
                    <p
                      className={`text-sm font-bold transition-colors duration-200 ${step === n ? "text-white" : step > n ? "text-primary-500 line-through" : "text-primary-600"}`}
                    >
                      {label}
                    </p>
                    <p className="text-primary-600 text-xs mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom contact */}
          <div className="pt-8 border-t border-white/5 space-y-4">
            <p className="text-primary-600 text-[10px] font-bold uppercase tracking-[0.25em]">
              Prefer to call?
            </p>
            <div className="space-y-2.5">
              <a
                href="tel:+2341234567890"
                className="flex items-center gap-2.5 text-primary-400 hover:text-white transition-colors duration-200 group"
              >
                <div className="w-7 h-7 rounded-lg bg-white/5 group-hover:bg-secondary-500/20 flex items-center justify-center transition-colors duration-200">
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
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium">+234 123 456 7890</span>
              </a>
              <a
                href="mailto:info@edenoasisrealty.com"
                className="flex items-center gap-2.5 text-primary-400 hover:text-white transition-colors duration-200 group"
              >
                <div className="w-7 h-7 rounded-lg bg-white/5 group-hover:bg-secondary-500/20 flex items-center justify-center transition-colors duration-200">
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
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium">
                  info@edenoasisrealty.com
                </span>
              </a>
            </div>
          </div>
        </aside>

        {/* Right — Form area */}
        <main className="flex-1 flex items-start justify-center px-5 py-10 lg:px-12 lg:py-16">
          <div className="w-full max-w-lg">
            {/* Step header */}
            <div className="mb-8">
              <h2 className="text-2xl font-black text-primary-900 tracking-tight">
                {step === 1 && "How can we help?"}
                {step === 2 && "Your contact details"}
                {step === 3 && "Property preferences"}
              </h2>
              <p className="text-primary-400 text-sm mt-1">
                {step === 1 &&
                  "Select your inquiry type and tell us about yourself"}
                {step === 2 && "We'll use these details to reach out to you"}
                {step === 3 && "Help us find the perfect match for you"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* ── STEP 1 ──────────────────────────────── */}
              {step === 1 && (
                <div className="space-y-6 animate-step-in">
                  {/* Quick type cards */}
                  <div>
                    <p className="text-xs text-primary-500 font-bold uppercase tracking-widest mb-3">
                      Quick select
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                      {QUICK_TYPES.map((t) => (
                        <button
                          key={t.value}
                          type="button"
                          onClick={() =>
                            setForm((f) => ({ ...f, inquiryType: t.value }))
                          }
                          className={`p-4 rounded-2xl border-2 text-left transition-all duration-250 hover:-translate-y-0.5 ${
                            form.inquiryType === t.value
                              ? "border-secondary-500 bg-white shadow-lg shadow-secondary-500/10"
                              : "border-primary-100 bg-white hover:border-primary-200 hover:shadow-md"
                          }`}
                        >
                          <div className="text-2xl mb-2">{t.icon}</div>
                          <div
                            className={`text-sm font-black ${form.inquiryType === t.value ? "text-secondary-600" : "text-primary-800"}`}
                          >
                            {t.label}
                          </div>
                          <div className="text-xs text-primary-400 mt-0.5">
                            {t.desc}
                          </div>
                          {form.inquiryType === t.value && (
                            <div className="mt-2 w-full h-0.5 bg-gradient-to-r from-secondary-500 to-secondary-400 rounded-full" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-primary-100" />
                    <span className="text-xs text-primary-300 font-semibold">
                      or choose below
                    </span>
                    <div className="flex-1 h-px bg-primary-100" />
                  </div>

                  <FloatingSelect
                    id="inquiryType"
                    label="Inquiry Type"
                    options={INQUIRY_TYPES}
                    value={form.inquiryType}
                    onChange={set("inquiryType")}
                    required
                  />
                  <FloatingSelect
                    id="buyerInfo"
                    label="Tell us about yourself"
                    options={BUYER_INFO}
                    value={form.buyerInfo}
                    onChange={set("buyerInfo")}
                    required
                  />
                </div>
              )}

              {/* ── STEP 2 ──────────────────────────────── */}
              {step === 2 && (
                <div className="space-y-5 animate-step-in">
                  <div className="grid grid-cols-2 gap-4">
                    <FloatingInput
                      id="firstName"
                      label="First Name"
                      value={form.firstName}
                      onChange={set("firstName")}
                      required
                    />
                    <FloatingInput
                      id="lastName"
                      label="Last Name"
                      value={form.lastName}
                      onChange={set("lastName")}
                      required
                    />
                  </div>
                  <FloatingInput
                    id="email"
                    label="Email Address"
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    required
                  />
                  <FloatingInput
                    id="phone"
                    label="Phone Number"
                    type="tel"
                    value={form.phone}
                    onChange={set("phone")}
                    required
                  />

                  <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-primary-100 shadow-sm">
                    <svg
                      className="w-4 h-4 text-secondary-500 flex-shrink-0 mt-0.5"
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
                    <p className="text-xs text-primary-500 leading-relaxed">
                      <span className="font-bold text-primary-700">
                        Your data is safe.
                      </span>{" "}
                      We never share your personal information. It's only used
                      by our advisors to contact you.
                    </p>
                  </div>
                </div>
              )}

              {/* ── STEP 3 ──────────────────────────────── */}
              {step === 3 && (
                <div className="space-y-5 animate-step-in">
                  <FloatingSelect
                    id="propertyType"
                    label="Property Type"
                    options={PROPERTY_TYPES}
                    value={form.propertyType}
                    onChange={set("propertyType")}
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FloatingSelect
                      id="maxPrice"
                      label="Max Budget"
                      options={BUDGET_OPTIONS}
                      value={form.maxPrice}
                      onChange={set("maxPrice")}
                      required
                    />
                    <FloatingSelect
                      id="beds"
                      label="No. of Bedrooms"
                      options={BEDS_OPTIONS}
                      value={form.beds}
                      onChange={set("beds")}
                    />
                  </div>
                  <FloatingSelect
                    id="location"
                    label="Preferred Location"
                    options={LOCATIONS}
                    value={form.location}
                    onChange={set("location")}
                  />

                  {/* Textarea */}
                  <div className="relative group">
                    <textarea
                      id="message"
                      value={form.message}
                      onChange={set("message")}
                      rows={4}
                      placeholder=" "
                      className="peer w-full bg-primary-50/60 border-b-2 border-primary-200 hover:border-primary-300 focus:border-secondary-500 rounded-t-lg px-4 pt-6 pb-3 text-sm text-primary-900 font-medium outline-none resize-none transition-all duration-250 placeholder-transparent focus:bg-secondary-50/40"
                    />
                    <label
                      htmlFor="message"
                      className={`absolute left-4 pointer-events-none font-semibold transition-all duration-200 ${
                        form.message.length > 0
                          ? "top-1.5 text-[10px] text-secondary-500 tracking-[0.12em] uppercase"
                          : "top-4 text-sm text-primary-400"
                      }`}
                    >
                      Additional notes (optional)
                    </label>
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary-500 peer-focus:w-full transition-all duration-300" />
                  </div>
                </div>
              )}

              {/* ── Nav buttons ── */}
              <div
                className={`flex items-center gap-3 pt-4 ${step > 1 ? "justify-between" : "justify-end"}`}
              >
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep((s) => s - 1)}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl text-primary-500 font-bold text-sm border border-primary-200 bg-white hover:border-primary-300 hover:text-primary-700 hover:shadow-sm active:scale-95 transition-all duration-200"
                  >
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
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    Back
                  </button>
                )}

                {step < 3 ? (
                  <button
                    type="button"
                    disabled={step === 1 ? !step1Valid : !step2Valid}
                    onClick={() => setStep((s) => s + 1)}
                    className="flex items-center gap-2 px-8 py-3 rounded-xl bg-primary-950 text-white font-bold text-sm hover:bg-secondary-500 hover:shadow-xl hover:shadow-secondary-500/25 hover:-translate-y-0.5 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-primary-950 disabled:hover:translate-y-0 disabled:hover:shadow-none transition-all duration-250"
                  >
                    Continue
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
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!step3Valid || isSubmitting}
                    className="flex-1 relative flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-secondary-500 text-white font-black text-base hover:bg-secondary-600 hover:shadow-xl hover:shadow-secondary-500/30 hover:-translate-y-0.5 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 transition-all duration-200 overflow-hidden group"
                  >
                    {/* Shimmer */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    {isSubmitting ? (
                      <>
                        <svg
                          className="w-5 h-5 animate-spin"
                          fill="none"
                          viewBox="0 0 24 24"
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
                        Submitting…
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          />
                        </svg>
                        Submit Inquiry
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        </main>
      </div>

      <style jsx>{`
        @keyframes step-in {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-step-in {
          animation: step-in 0.3s ease-out both;
        }
        @keyframes success-pop {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          70% {
            transform: scale(1.15);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-success-pop {
          animation: success-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }
          100% {
            transform: scale(1.8);
            opacity: 0;
          }
        }
        .animate-ping-slow {
          animation: ping-slow 2s ease-out infinite;
        }
      `}</style>
    </div>
  );
}
