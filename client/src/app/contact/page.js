"use client";

import { useState } from "react";
import Link from "next/link";

// ─── Floating label input ─────────────────────────────────────────────────────
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
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        placeholder=" "
        className={`w-full bg-primary-50/70 border-b-2 rounded-t-xl px-4 pt-6 pb-2.5 text-sm text-primary-900 font-medium outline-none transition-all duration-250 placeholder-transparent ${
          focused
            ? "border-secondary-500 bg-secondary-50/50"
            : "border-primary-200 hover:border-primary-300 hover:bg-primary-50"
        }`}
      />
      <label
        htmlFor={id}
        className={`absolute left-4 pointer-events-none font-semibold transition-all duration-200 ${
          active
            ? "top-1.5 text-[10px] text-secondary-500 tracking-[0.15em] uppercase"
            : "top-1/2 -translate-y-1/2 text-sm text-primary-400"
        }`}
      >
        {label}
        {required && <span className="text-secondary-500 ml-0.5">*</span>}
      </label>
      <div
        className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-secondary-500 to-secondary-400 transition-all duration-300 ${focused ? "w-full" : "w-0"}`}
      />
    </div>
  );
}

// ─── Floating label select ────────────────────────────────────────────────────
function FloatingSelect({ id, label, options, value, onChange, required }) {
  const [focused, setFocused] = useState(false);
  const active = focused || value !== "";
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        className={`w-full bg-primary-50/70 border-b-2 rounded-t-xl px-4 pt-6 pb-2.5 text-sm font-medium outline-none appearance-none cursor-pointer transition-all duration-250 ${
          value === "" ? "text-transparent" : "text-primary-900"
        } ${
          focused
            ? "border-secondary-500 bg-secondary-50/50"
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
            ? "top-1.5 text-[10px] text-secondary-500 tracking-[0.15em] uppercase"
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
        className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-secondary-500 to-secondary-400 transition-all duration-300 ${focused ? "w-full" : "w-0"}`}
      />
    </div>
  );
}

// ─── Contact card ─────────────────────────────────────────────────────────────
function ContactCard({ icon, title, lines, href, delay }) {
  return (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="group flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-0.5"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-11 h-11 rounded-xl bg-secondary-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-secondary-500 transition-colors duration-300">
        {icon}
      </div>
      <div>
        <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">
          {title}
        </p>
        {lines.map((line, i) => (
          <p
            key={i}
            className="text-white/80 text-sm font-medium leading-snug group-hover:text-white transition-colors duration-200"
          >
            {line}
          </p>
        ))}
      </div>
    </a>
  );
}

// ─── Options ─────────────────────────────────────────────────────────────────
const INQUIRY_TYPES = [
  { value: "rental", label: "Rental" },
  { value: "purchase", label: "Purchase" },
  { value: "investment", label: "Investment" },
  { value: "management", label: "Property Management" },
  { value: "valuation", label: "Valuation" },
  { value: "general", label: "General Enquiry" },
];
const BUYER_INFO = [
  { value: "first_time", label: "I'm a first time buyer" },
  { value: "experienced", label: "I'm an experienced buyer" },
  { value: "investor", label: "I'm an investor" },
  { value: "relocating", label: "I'm relocating" },
  { value: "diaspora", label: "I'm in the diaspora" },
  { value: "other", label: "Other" },
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

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    message: "",
  });
  const [messageFocused, setMessageFocused] = useState(false);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const isValid =
    form.firstName &&
    form.lastName &&
    form.email &&
    form.phone &&
    form.inquiryType;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1400);
  };

  // ── Success screen ──────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-primary-950 flex items-center justify-center px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full border border-white/[0.04] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-secondary-500/10 blur-3xl" />

        <div className="relative z-10 max-w-md w-full text-center">
          {/* Animated checkmark */}
          <div className="flex justify-center mb-8">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 rounded-full border-2 border-secondary-500/20 animate-ping-once" />
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-secondary-500 to-secondary-600 flex items-center justify-center shadow-2xl shadow-secondary-500/40 animate-pop-in">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary-500/10 border border-secondary-500/20 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary-400 animate-pulse" />
            <span className="text-secondary-400 text-[10px] font-bold uppercase tracking-[0.25em]">
              Message Sent
            </span>
          </div>

          <h2 className="text-4xl font-black text-white tracking-tight mb-3">
            We'll be in touch.
          </h2>
          <p className="text-primary-400 leading-relaxed mb-2">
            Thank you,{" "}
            <span className="text-white font-semibold">{form.firstName}</span>.
            Your message has been received.
          </p>
          <p className="text-primary-500 text-sm mb-10">
            Expect a response at{" "}
            <span className="text-secondary-400 font-medium">{form.email}</span>{" "}
            within 24 hours.
          </p>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-8 text-left space-y-3">
            <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.2em] mb-3">
              What's next
            </p>
            {[
              "A GrayGold advisor reviews your message",
              "We match you with suitable properties",
              "You receive a curated property shortlist",
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-secondary-500/20 text-secondary-400 text-[10px] font-black flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </div>
                <p className="text-white/60 text-sm">{step}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <Link
              href="/"
              className="flex-1 py-3.5 rounded-xl border border-white/10 text-white/70 font-bold text-sm hover:bg-white/5 hover:text-white transition-all duration-200 text-center"
            >
              Back to Home
            </Link>
            <Link
              href="/listings"
              className="flex-1 py-3.5 rounded-xl bg-secondary-500 text-white font-bold text-sm hover:bg-secondary-400 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-secondary-500/30 transition-all duration-200 text-center"
            >
              Browse Listings
            </Link>
          </div>
        </div>

        <style jsx>{`
          @keyframes pop-in {
            0% {
              transform: scale(0);
              opacity: 0;
            }
            60% {
              transform: scale(1.12);
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
          .animate-pop-in {
            animation: pop-in 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) both;
          }
          @keyframes ping-once {
            0% {
              transform: scale(1);
              opacity: 0.6;
            }
            100% {
              transform: scale(2);
              opacity: 0;
            }
          }
          .animate-ping-once {
            animation: ping-once 1s ease-out forwards;
          }
        `}</style>
      </div>
    );
  }

  // ── Main page ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* ══════════════════════════════════
          LEFT — Dark info panel
      ══════════════════════════════════ */}
      <aside className="lg:w-[42%] xl:w-[38%] bg-primary-950 px-8 py-14 lg:px-12 lg:py-20 flex flex-col justify-between relative overflow-hidden lg:sticky lg:top-0 lg:h-screen">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-secondary-500/8 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-secondary-700/10 blur-3xl pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative z-10 space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-px w-6 bg-secondary-500" />
              <span className="text-secondary-400 text-[10px] font-bold uppercase tracking-[0.3em]">
                Contact
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl xl:text-[54px] font-black text-white leading-[1.0] tracking-tighter">
              Let's get
              <br />
              in{" "}
              <span className="relative inline-block">
                touch
                <svg
                  className="absolute -bottom-1 left-0 w-full"
                  viewBox="0 0 120 8"
                  fill="none"
                >
                  <path
                    d="M0 6 Q30 1 60 4 Q90 7 120 2"
                    stroke="#FF0404"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span className="text-primary-700">.</span>
            </h1>
            <p className="text-primary-400 leading-relaxed max-w-xs pt-1 text-[15px]">
              Whether you're buying, renting, or investing — our team is here to
              guide you every step of the way.
            </p>
          </div>

          {/* Contact cards */}
          <div className="space-y-3">
            <ContactCard
              href="tel:+2340809294977"
              delay={0}
              title="Phone"
              lines={["+234(0)809 294 9777", "+234(0)701 163 0025"]}
              icon={
                <svg
                  className="w-5 h-5 text-secondary-400 group-hover:text-white transition-colors duration-300"
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
              }
            />
            <ContactCard
              href="mailto:customercare@edenoasisrealty.com"
              delay={100}
              title="Email"
              lines={[
                "customercare@edenoasisrealty.com",
                "info@edenoasisrealty.com",
              ]}
              icon={
                <svg
                  className="w-5 h-5 text-secondary-400 group-hover:text-white transition-colors duration-300"
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
              }
            />
            <ContactCard
              href="https://maps.google.com"
              delay={200}
              title="Corporate Headquarters"
              lines={[
                "4th floor Kunech Towers, Km 18 Osapa,",
                "Lekki Penninsula II, Lagos, Nigeria",
              ]}
              icon={
                <svg
                  className="w-5 h-5 text-secondary-400 group-hover:text-white transition-colors duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              }
            />
          </div>

          {/* Hours */}
          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/[0.07]">
            <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.25em] mb-3">
              Office Hours
            </p>
            <div className="space-y-1.5">
              {[
                { day: "Monday – Friday", hrs: "8:00am – 6:00pm WAT" },
                { day: "Saturday", hrs: "9:00am – 4:00pm WAT" },
                { day: "Sunday", hrs: "Closed" },
              ].map(({ day, hrs }) => (
                <div
                  key={day}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-primary-500">{day}</span>
                  <span
                    className={`font-semibold ${hrs === "Closed" ? "text-primary-700" : "text-white/70"}`}
                  >
                    {hrs}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.25em] mb-4">
              Follow us
            </p>
            <div className="flex gap-2">
              {[
                {
                  label: "Facebook",
                  href: "#",
                  path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
                },
                {
                  label: "Instagram",
                  href: "#",
                  path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
                },
                {
                  label: "X",
                  href: "#",
                  path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
                },
                {
                  label: "LinkedIn",
                  href: "#",
                  path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
                },
              ].map(({ label, href, path }) => (
                <a
                  key={label}
                  href={href}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-secondary-500 hover:border-secondary-500 hover:scale-110 transition-all duration-300"
                  aria-label={label}
                >
                  <svg
                    className="w-4 h-4 text-white/50 group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* ══════════════════════════════════
          RIGHT — Form area
      ══════════════════════════════════ */}
      <main className="flex-1 bg-white px-5 py-12 sm:px-8 lg:px-14 lg:py-20 flex flex-col">
        {/* Header */}
        <div className="mb-10 max-w-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-6 bg-secondary-500" />
            <span className="text-secondary-500 text-[10px] font-bold uppercase tracking-[0.3em]">
              Inquiry Form
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-black text-primary-900 tracking-tight leading-tight">
            Got any inquiry?{" "}
            <span className="text-secondary-500">Start here</span>
          </h2>
          <p className="text-primary-400 text-sm mt-2">
            Fill out the form below and a dedicated advisor will get back to you
            within 24 hours.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-lg space-y-5 flex-1">
          {/* Row 1: Inquiry Type + Buyer Info */}
          <div className="grid grid-cols-2 gap-4">
            <FloatingSelect
              id="inquiryType"
              label="Inquiry Type"
              required
              options={INQUIRY_TYPES}
              value={form.inquiryType}
              onChange={set("inquiryType")}
            />
            <FloatingSelect
              id="buyerInfo"
              label="Information"
              required={false}
              options={BUYER_INFO}
              value={form.buyerInfo}
              onChange={set("buyerInfo")}
            />
          </div>

          {/* Row 2: Name */}
          <div className="grid grid-cols-2 gap-4">
            <FloatingInput
              id="firstName"
              label="First Name"
              required
              value={form.firstName}
              onChange={set("firstName")}
            />
            <FloatingInput
              id="lastName"
              label="Last Name"
              required
              value={form.lastName}
              onChange={set("lastName")}
            />
          </div>

          {/* Row 3: Email + Phone */}
          <div className="grid grid-cols-2 gap-4">
            <FloatingInput
              id="email"
              label="Email Address"
              type="email"
              required
              value={form.email}
              onChange={set("email")}
            />
            <FloatingInput
              id="phone"
              label="Phone Number"
              type="tel"
              required
              value={form.phone}
              onChange={set("phone")}
            />
          </div>

          {/* Row 4: Property Type + Max Price + Beds */}
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-1">
              <FloatingSelect
                id="propertyType"
                label="Property Type"
                required={false}
                options={PROPERTY_TYPES}
                value={form.propertyType}
                onChange={set("propertyType")}
              />
            </div>
            <FloatingSelect
              id="maxPrice"
              label="Max Price"
              required={false}
              options={BUDGET_OPTIONS}
              value={form.maxPrice}
              onChange={set("maxPrice")}
            />
            <FloatingSelect
              id="beds"
              label="Beds"
              required={false}
              options={BEDS_OPTIONS}
              value={form.beds}
              onChange={set("beds")}
            />
          </div>

          {/* Message */}
          <div className="relative">
            <textarea
              id="message"
              value={form.message}
              onChange={set("message")}
              onFocus={() => setMessageFocused(true)}
              onBlur={() => setMessageFocused(false)}
              rows={5}
              placeholder=" "
              className={`w-full bg-primary-50/70 border-b-2 rounded-t-xl px-4 pt-6 pb-3 text-sm text-primary-900 font-medium outline-none resize-none transition-all duration-250 placeholder-transparent ${
                messageFocused
                  ? "border-secondary-500 bg-secondary-50/50"
                  : "border-primary-200 hover:border-primary-300 hover:bg-primary-50"
              }`}
            />
            <label
              htmlFor="message"
              className={`absolute left-4 pointer-events-none font-semibold transition-all duration-200 ${
                form.message.length > 0
                  ? "top-1.5 text-[10px] text-secondary-500 tracking-[0.15em] uppercase"
                  : "top-4 text-sm text-primary-400"
              }`}
            >
              Message
            </label>
            <div
              className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-secondary-500 to-secondary-400 transition-all duration-300 ${messageFocused ? "w-full" : "w-0"}`}
            />
            <div className="absolute bottom-3 right-3 text-xs text-primary-300 font-medium tabular-nums">
              {form.message.length}/500
            </div>
          </div>

          {/* Privacy note */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-primary-50 border border-primary-100">
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
                Your data is protected.
              </span>{" "}
              We never share your information with third parties. It's only used
              by our advisors to respond to your inquiry.
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="w-full relative flex items-center justify-center gap-3 py-4 rounded-xl bg-secondary-500 text-white font-black text-base tracking-wide hover:bg-secondary-600 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-secondary-500/30 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none transition-all duration-250 overflow-hidden group"
          >
            {/* Shimmer sweep */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-800" />

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
                Sending your message…
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
        </form>
      </main>
    </div>
  );
}
