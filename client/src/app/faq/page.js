"use client";

import { useState, useRef } from "react";
import Link from "next/link";

// ─── FAQ Data ─────────────────────────────────────────────────────────────────
const CATEGORIES = [
  "All",
  "Buying",
  "Payment",
  "Legal",
  "Management",
  "Investment",
];

const FAQS = [
  {
    id: 1,
    category: "Buying",
    question: "Can I resell after purchase?",
    answer:
      "Absolutely. We also help our clients in facilitating the resale process to make it as seamless as possible. GrayGold has a dedicated resale desk that handles all the documentation, marketing, and buyer sourcing on your behalf — ensuring you get the best market value.",
  },
  {
    id: 2,
    category: "Payment",
    question: "Are there payment plan options available?",
    answer:
      "Yes. We offer flexible payment plans tailored to your financial capacity. Depending on the development, you can access structured plans ranging from 6 months to 36 months installment options, with as little as 30% down payment to secure your property.",
  },
  {
    id: 3,
    category: "Payment",
    question: "Any mortgage option available?",
    answer:
      "Yes, we partner with several top-tier banks and mortgage institutions in Nigeria to provide our clients access to competitive mortgage financing. Our advisors will help you compare rates, process your application, and secure the best financing deal for your situation.",
  },
  {
    id: 4,
    category: "Payment",
    question: "How do I make payment?",
    answer:
      "Payments are made via direct bank transfer to the developer's or GrayGold's designated escrow account. We never accept cash payments. All transactions are fully documented and receipted. We also accept verified international wire transfers for diaspora clients.",
  },
  {
    id: 5,
    category: "Legal",
    question: "What title documents should I expect?",
    answer:
      "The type of title document depends on the property and its location. Common titles include Certificate of Occupancy (C of O), Deed of Assignment, Governor's Consent, Right of Occupancy (R of O), and Survey Plans. Our legal team thoroughly vets all titles before listing any property.",
  },
  {
    id: 6,
    category: "Legal",
    question: "Is there a process for diaspora clients?",
    answer:
      "Yes! We have a comprehensive diaspora package that allows overseas Nigerians to purchase property remotely. This includes virtual tours, digital document signing via notarized affidavit, power of attorney arrangements, and a dedicated diaspora relationship manager.",
  },
  {
    id: 7,
    category: "Buying",
    question: "How do I know a property is genuine and not fraudulent?",
    answer:
      "Every property listed on GrayGold goes through a rigorous due diligence process — title verification, site inspection, developer background check, and legal clearance. We provide a full property report to every serious buyer before commitment.",
  },
  {
    id: 8,
    category: "Management",
    question: "Do you offer property management services?",
    answer:
      "Yes. Our Property Management division handles everything post-purchase — tenant sourcing, rent collection, maintenance, facility management, and periodic reporting. We manage the property so you don't have to, making your investment truly passive.",
  },
  {
    id: 9,
    category: "Investment",
    question: "What is the typical ROI on your listed properties?",
    answer:
      "Depending on the location and property type, our clients have historically achieved 15–35% annual appreciation on off-plan purchases, plus 6–10% rental yields on completed properties in prime locations like Ikoyi, Lekki Phase 1, and Maitama, Abuja.",
  },
  {
    id: 10,
    category: "Investment",
    question: "What makes off-plan property a good investment?",
    answer:
      "Off-plan properties are typically priced 20–40% below market value at launch. By the time construction is complete, the property has already appreciated significantly. GrayGold only partners with credible developers with proven track records to protect your investment.",
  },
];

// ─── Single FAQ item ──────────────────────────────────────────────────────────
function FAQItem({ faq, index, isOpen, onToggle }) {
  const contentRef = useRef(null);

  return (
    <div
      className={`group border-b border-primary-100 last:border-0 transition-all duration-300 ${
        isOpen ? "bg-white" : "hover:bg-primary-50/50"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start gap-5 px-6 py-5 text-left"
        aria-expanded={isOpen}
      >
        {/* Index number */}
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black transition-all duration-300 mt-0.5 ${
            isOpen
              ? "bg-secondary-500 text-white shadow-lg shadow-secondary-500/30"
              : "bg-primary-100 text-primary-400 group-hover:bg-primary-200 group-hover:text-primary-600"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </div>

        {/* Question */}
        <div className="flex-1 min-w-0">
          <span
            className={`text-base font-bold leading-snug block transition-colors duration-200 ${
              isOpen
                ? "text-secondary-600"
                : "text-primary-800 group-hover:text-primary-900"
            }`}
          >
            {faq.question}
          </span>
          {/* Category pill */}
          <span
            className={`inline-block mt-1.5 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full transition-all duration-200 ${
              isOpen
                ? "bg-secondary-50 text-secondary-500"
                : "bg-primary-100 text-primary-400"
            }`}
          >
            {faq.category}
          </span>
        </div>

        {/* Toggle icon */}
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 mt-0.5 ${
            isOpen
              ? "border-secondary-500 bg-secondary-500 rotate-180"
              : "border-primary-200 group-hover:border-primary-400"
          }`}
        >
          <svg
            className={`w-3.5 h-3.5 transition-colors duration-200 ${
              isOpen ? "text-white" : "text-primary-400"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      {/* Answer — CSS-driven expand */}
      <div
        className={`overflow-hidden transition-all duration-400 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-6 pl-[4.75rem]">
          <div className="h-px w-full bg-secondary-100 mb-4" />
          <p className="text-primary-600 leading-relaxed text-[15px]">
            {faq.answer}
          </p>
          <div className="mt-4 flex items-center gap-2">
            <span className="text-xs text-primary-400">Was this helpful?</span>
            <button className="text-xs font-bold text-primary-500 hover:text-secondary-500 transition-colors px-2.5 py-1 rounded-full border border-primary-200 hover:border-secondary-300">
              Yes 👍
            </button>
            <button className="text-xs font-bold text-primary-500 hover:text-secondary-500 transition-colors px-2.5 py-1 rounded-full border border-primary-200 hover:border-secondary-300">
              No 👎
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [openId, setOpenId] = useState(1);
  const [search, setSearch] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  const filtered = FAQS.filter((faq) => {
    const matchesCat =
      activeCategory === "All" || faq.category === activeCategory;
    const matchesSearch =
      !search ||
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="relative bg-primary-950 pt-20 pb-32 overflow-hidden">
        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        {/* Red glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-32 bg-secondary-500/20 blur-3xl rounded-full" />
        {/* Decorative circles */}
        <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-white/5" />
        <div className="absolute -right-48 top-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-white/[0.03]" />

        <div className="relative max-w-5xl mx-auto px-6 lg:px-8 text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-secondary-500" />
            <span className="text-secondary-400 text-xs font-bold uppercase tracking-[0.3em]">
              Support
            </span>
            <div className="h-px w-8 bg-secondary-500" />
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.0] tracking-tighter mb-6">
            Some of our most
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-400 to-secondary-600">
              asked questions
            </span>
          </h1>

          <p className="text-primary-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Can't find what you're looking for? Our team is always happy to
            help.
          </p>

          {/* Search bar — floating into the content */}
          <div
            className={`relative max-w-lg mx-auto transition-all duration-300 ${
              searchFocused ? "scale-105" : "scale-100"
            }`}
          >
            <div
              className={`flex items-center gap-3 bg-white rounded-2xl px-5 py-4 shadow-2xl shadow-black/30 transition-all duration-300 ${
                searchFocused
                  ? "ring-2 ring-secondary-500 shadow-secondary-500/20"
                  : ""
              }`}
            >
              <svg
                className={`w-5 h-5 flex-shrink-0 transition-colors duration-200 ${
                  searchFocused ? "text-secondary-500" : "text-primary-400"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="Search questions…"
                className="flex-1 text-sm text-primary-800 placeholder:text-primary-300 outline-none font-medium bg-transparent"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="text-primary-300 hover:text-primary-600 transition-colors"
                >
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
              <div className="text-[10px] font-bold text-primary-300 bg-primary-50 border border-primary-100 px-2 py-1 rounded-md hidden sm:block">
                {filtered.length} results
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CONTENT
      ══════════════════════════════════════ */}
      <section className="relative -mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {/* Category filter strip */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white rounded-2xl p-3 shadow-xl shadow-primary-900/5 border border-primary-50">
          {CATEGORIES.map((cat) => {
            const count =
              cat === "All"
                ? FAQS.length
                : FAQS.filter((f) => f.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setOpenId(null);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-250 ${
                  activeCategory === cat
                    ? "bg-secondary-500 text-white shadow-lg shadow-secondary-500/30 scale-[1.03]"
                    : "text-primary-500 hover:bg-primary-50 hover:text-primary-800"
                }`}
              >
                {cat}
                <span
                  className={`text-[10px] font-black px-1.5 py-0.5 rounded-full transition-colors ${
                    activeCategory === cat
                      ? "bg-white/20 text-white"
                      : "bg-primary-100 text-primary-400"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 items-start">
          {/* ── FAQ Accordion (left 2/3) ── */}
          <div className="lg:col-span-2">
            {filtered.length > 0 ? (
              <div className="bg-white rounded-2xl shadow-xl shadow-primary-900/5 border border-primary-50 overflow-hidden divide-y divide-primary-50">
                {filtered.map((faq, i) => (
                  <FAQItem
                    key={faq.id}
                    faq={faq}
                    index={i}
                    isOpen={openId === faq.id}
                    onToggle={() =>
                      setOpenId(openId === faq.id ? null : faq.id)
                    }
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-primary-100 p-16 text-center">
                <div className="w-16 h-16 rounded-2xl bg-secondary-50 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-secondary-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="text-lg font-bold text-primary-700 mb-1">
                  No questions found
                </p>
                <p className="text-sm text-primary-400">
                  Try a different search term or category
                </p>
                <button
                  onClick={() => {
                    setSearch("");
                    setActiveCategory("All");
                  }}
                  className="mt-4 px-5 py-2 bg-secondary-500 text-white text-sm font-bold rounded-xl hover:bg-secondary-600 transition-colors"
                >
                  Reset
                </button>
              </div>
            )}
          </div>

          {/* ── Sidebar (right 1/3) ── */}
          <div className="space-y-4 lg:sticky lg:top-8">
            {/* Quick links */}
            <div className="bg-primary-950 rounded-2xl p-6 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-secondary-500/10 blur-2xl" />
              <div className="relative z-10">
                <div className="w-9 h-9 rounded-xl bg-secondary-500/20 flex items-center justify-center mb-4">
                  <svg
                    className="w-5 h-5 text-secondary-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <h3 className="font-black text-lg mb-2 tracking-tight">
                  Still have questions?
                </h3>
                <p className="text-primary-400 text-sm leading-relaxed mb-5">
                  Our advisors are available Mon–Sat, 8am–6pm WAT.
                </p>
                <div className="space-y-2">
                  <Link
                    href="/inquiry"
                    className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-secondary-500 text-white font-bold text-sm hover:bg-secondary-400 hover:-translate-y-0.5 transition-all duration-200 group"
                  >
                    Submit an Inquiry
                    <svg
                      className="w-4 h-4 transition-transform group-hover:translate-x-1"
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
                  </Link>
                  <a
                    href="tel:+2341234567890"
                    className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 font-semibold text-sm transition-all duration-200"
                  >
                    <span className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-secondary-400"
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
                      Call us
                    </span>
                    <span className="text-primary-400 text-xs">
                      +234 123 456 7890
                    </span>
                  </a>
                </div>
              </div>
            </div>

            {/* Category breakdown */}
            <div className="bg-white rounded-2xl border border-primary-100 p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-primary-400 mb-4">
                Browse by Topic
              </p>
              <div className="space-y-2">
                {CATEGORIES.filter((c) => c !== "All").map((cat) => {
                  const count = FAQS.filter((f) => f.category === cat).length;
                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        setActiveCategory(cat);
                        setOpenId(null);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                        activeCategory === cat
                          ? "bg-secondary-50 text-secondary-600 border border-secondary-200"
                          : "text-primary-600 hover:bg-primary-50"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>
                          {cat === "Buying"
                            ? "🏠"
                            : cat === "Payment"
                              ? "💳"
                              : cat === "Legal"
                                ? "📋"
                                : cat === "Management"
                                  ? "🔧"
                                  : cat === "Investment"
                                    ? "📈"
                                    : "❓"}
                        </span>
                        {cat}
                      </span>
                      <span
                        className={`text-xs font-black px-2 py-0.5 rounded-full ${
                          activeCategory === cat
                            ? "bg-secondary-100 text-secondary-600"
                            : "bg-primary-100 text-primary-500"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          BOTTOM CTA
      ══════════════════════════════════════ */}
      <section className="bg-gradient-to-br from-primary-950 via-primary-900 to-primary-950 py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-48 bg-secondary-500/10 blur-3xl rounded-full" />

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            Ready to find your{" "}
            <span className="text-secondary-400">dream property?</span>
          </h2>
          <p className="text-primary-400 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            Speak with a GrayGold advisor today and take the first step towards
            owning a piece of Nigeria's finest real estate.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/inquiry"
              className="px-8 py-4 bg-secondary-500 text-white font-black rounded-xl hover:bg-secondary-400 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-secondary-500/30 active:scale-95 transition-all duration-250"
            >
              Start an Inquiry
            </Link>
            <Link
              href="/listings"
              className="px-8 py-4 bg-white/5 text-white font-bold rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-250"
            >
              Browse Listings
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
