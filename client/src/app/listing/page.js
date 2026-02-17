"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const ALL_LISTINGS = [
  {
    id: 1,
    title: "Ultra-Luxury 5-Bedroom Mansion in Ikoyi",
    location: "Ikoyi, Lagos",
    price: "Price Available Upon Request",
    beds: 5,
    baths: 5.5,
    type: "Fully Detached Duplex",
    category: "off-plan",
    tags: ["Featured", "New Listing", "Hot Offer"],
    image: "/propertiesImages/property1.jpeg",
  },
  {
    id: 2,
    title: "Signature 4-Bedroom Penthouse in Victoria Island",
    location: "Victoria Island, Lagos",
    price: "₦450,000,000",
    beds: 4,
    baths: 4,
    type: "Penthouse",
    category: "ready",
    tags: ["Featured", "Hot Offer"],
    image: "/propertiesImages/property2.jpeg",
  },
  {
    id: 3,
    title: "Contemporary 6-Bedroom Villa in Maitama",
    location: "Maitama, Abuja",
    price: "₦800,000,000",
    beds: 6,
    baths: 6.5,
    type: "Detached Villa",
    category: "ready",
    tags: ["New Listing"],
    image: "/propertiesImages/property3.jpeg",
  },
  {
    id: 4,
    title: "Premium 3-Bedroom Smart Home in Lekki Phase 1",
    location: "Lekki Phase 1, Lagos",
    price: "₦220,000,000",
    beds: 3,
    baths: 3,
    type: "Semi-Detached",
    category: "off-plan",
    tags: ["Featured", "New Listing"],
    image: "/propertiesImages/property4.jpeg",
  },
  {
    id: 5,
    title: "Exclusive 5-Bedroom Waterfront Estate",
    location: "Banana Island, Lagos",
    price: "Price Available Upon Request",
    beds: 5,
    baths: 5,
    type: "Fully Detached Duplex",
    category: "off-plan",
    tags: ["Featured", "Hot Offer"],
    image: "/propertiesImages/property5.jpeg",
  },
  {
    id: 6,
    title: "Modern 4-Bedroom Terrace in Asokoro",
    location: "Asokoro, Abuja",
    price: "₦180,000,000",
    beds: 4,
    baths: 3.5,
    type: "Terrace Duplex",
    category: "ready",
    tags: ["New Listing", "Hot Offer"],
    image: "/propertiesImages/property6.jpeg",
  },
];

const TABS = [
  { key: "all", label: "All" },
  { key: "off-plan", label: "Off Plan Project" },
  { key: "ready", label: "Ready to Move in" },
];

const STATUS_OPTIONS = ["Any Status", "For Sale", "For Rent", "Sold"];
const PURPOSE_OPTIONS = [
  "Any Purpose",
  "Residential",
  "Commercial",
  "Investment",
];

// ─── Tag Badge ────────────────────────────────────────────────────────────────
function TagBadge({ tag }) {
  const styles = {
    Featured: "bg-secondary-500 text-white",
    "New Listing": "bg-primary-800 text-white",
    "Hot Offer": "bg-amber-500 text-white",
  };
  return (
    <span
      className={`text-[10px] font-bold px-2 py-0.5 rounded-sm tracking-wide ${
        styles[tag] ?? "bg-white/20 text-white"
      }`}
    >
      {tag}
    </span>
  );
}

// ─── Property Card ────────────────────────────────────────────────────────────
function PropertyCard({ listing, index }) {
  const [liked, setLiked] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <article
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary-900/10 transition-all duration-500 hover:-translate-y-1.5 border border-primary-100/60"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        {imgError ? (
          <div className="absolute inset-0 bg-gradient-to-br from-secondary-100 via-secondary-50 to-primary-100 flex items-center justify-center">
            <div className="text-center space-y-2">
              <svg
                className="w-14 h-14 text-secondary-300 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 22V12h6v10"
                />
              </svg>
              <p className="text-xs text-primary-400 font-medium">
                Property Image
              </p>
            </div>
          </div>
        ) : (
          <Image
            src={listing.image}
            alt={listing.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            onError={() => setImgError(true)}
          />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Tags */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {listing.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>

        {/* Wishlist */}
        <button
          onClick={() => setLiked(!liked)}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 ${
            liked
              ? "bg-secondary-500 text-white scale-110"
              : "bg-black/20 text-white hover:bg-white hover:text-secondary-500"
          }`}
          aria-label="Save property"
        >
          <svg
            className="w-4 h-4"
            fill={liked ? "currentColor" : "none"}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>

        {/* Price + zoom */}
        <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center justify-between">
          <span className="text-white text-sm font-bold drop-shadow-lg">
            {listing.price}
          </span>
          <button className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors duration-200 group/zoom">
            <svg
              className="w-3.5 h-3.5 text-white group-hover/zoom:text-primary-700 transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-bold text-primary-900 text-base leading-snug line-clamp-2 group-hover:text-secondary-600 transition-colors duration-300">
            {listing.title}
          </h3>
          <p className="text-primary-400 text-sm mt-1.5 flex items-center gap-1.5">
            <svg
              className="w-3.5 h-3.5 text-secondary-400 flex-shrink-0"
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
            {listing.location}
          </p>
        </div>

        {/* Specs */}
        <div className="flex items-center gap-4 text-sm pt-1">
          <span className="flex items-center gap-1.5 text-primary-500">
            <svg
              className="w-4 h-4 text-secondary-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span className="font-semibold text-primary-700">
              {listing.beds}
            </span>
            <span className="text-primary-400">beds</span>
          </span>
          <span className="w-px h-4 bg-primary-100" />
          <span className="flex items-center gap-1.5 text-primary-500">
            <svg
              className="w-4 h-4 text-secondary-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
            <span className="font-semibold text-primary-700">
              {listing.baths}
            </span>
            <span className="text-primary-400">baths</span>
          </span>
        </div>

        {/* Type + CTA */}
        <div className="flex items-center justify-between pt-2 border-t border-primary-50">
          <span className="text-xs text-primary-400 font-medium bg-primary-50 px-2.5 py-1 rounded-full">
            {listing.type}
          </span>
          <Link
            href={`/listings/${listing.id}`}
            className="text-xs font-bold text-secondary-500 hover:text-secondary-700 flex items-center gap-1 group/link transition-colors duration-200"
          >
            View Details
            <svg
              className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-1"
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
        </div>
      </div>
    </article>
  );
}

// ─── Pagination ───────────────────────────────────────────────────────────────
function Pagination({ current, total, onChange }) {
  return (
    <div className="flex items-center gap-2 justify-center">
      {Array.from({ length: total }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onChange(page)}
          className={`w-9 h-9 rounded-lg text-sm font-bold transition-all duration-300 ${
            current === page
              ? "bg-secondary-500 text-white shadow-lg shadow-secondary-500/30 scale-105"
              : "bg-white text-primary-600 border border-primary-200 hover:border-secondary-300 hover:text-secondary-600"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onChange(Math.min(current + 1, total))}
        className="w-9 h-9 rounded-lg bg-white border border-primary-200 flex items-center justify-center text-secondary-500 hover:bg-secondary-500 hover:text-white hover:border-secondary-500 transition-all duration-300"
        aria-label="Next page"
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
            d="M13 5l7 7-7 7M5 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ListingsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState("Any Status");
  const [purpose, setPurpose] = useState("Any Purpose");
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const ITEMS_PER_PAGE = 6;

  const filtered = ALL_LISTINGS.filter((l) => {
    const matchesTab = activeTab === "all" || l.category === activeTab;
    const matchesSearch =
      !searchQuery ||
      l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleTabChange = (key) => {
    setActiveTab(key);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-secondary-50/40">
      {/* ── Search Bar ────────────────────────────────── */}
      <div className="bg-secondary-500 px-4 py-4 shadow-xl shadow-secondary-900/20">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setCurrentPage(1);
          }}
          className="max-w-5xl mx-auto flex flex-col sm:flex-row gap-3 items-stretch sm:items-center"
        >
          {/* Text search */}
          <div
            className={`flex-1 flex items-center gap-3 bg-white rounded-xl px-4 py-3 transition-all duration-300 ${
              isSearchFocused
                ? "ring-2 ring-white shadow-lg shadow-white/20"
                : ""
            }`}
          >
            <svg
              className="w-5 h-5 text-primary-400 flex-shrink-0"
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
              placeholder="Search by Property Type, or Location, or Status, or Purpose"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="flex-1 text-sm text-primary-700 placeholder:text-primary-300 outline-none bg-transparent font-medium"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
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
          </div>

          {/* Dropdowns + submit */}
          <div className="flex gap-2">
            {/* Status */}
            <div className="relative">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="appearance-none bg-white/15 backdrop-blur-sm text-white text-sm font-semibold px-4 py-3 pr-8 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 cursor-pointer transition-all duration-200 hover:bg-white/25"
              >
                {STATUS_OPTIONS.map((o) => (
                  <option
                    key={o}
                    value={o}
                    className="text-primary-900 bg-white"
                  >
                    {o}
                  </option>
                ))}
              </select>
              <svg
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            {/* Purpose */}
            <div className="relative">
              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="appearance-none bg-white/15 backdrop-blur-sm text-white text-sm font-semibold px-4 py-3 pr-8 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 cursor-pointer transition-all duration-200 hover:bg-white/25"
              >
                {PURPOSE_OPTIONS.map((o) => (
                  <option
                    key={o}
                    value={o}
                    className="text-primary-900 bg-white"
                  >
                    {o}
                  </option>
                ))}
              </select>
              <svg
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            {/* Search button */}
            <button
              type="submit"
              className="bg-white text-secondary-600 font-bold text-sm px-6 py-3 rounded-xl hover:bg-secondary-50 active:scale-95 transition-all duration-200 shadow-lg shadow-black/10 flex items-center gap-2 flex-shrink-0"
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Search
            </button>
          </div>
        </form>
      </div>

      {/* ── Body ──────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Heading row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-black text-primary-900 tracking-tight">
              Listings
            </h1>
            <p className="text-primary-400 mt-1 text-sm font-medium">
              {filtered.length}{" "}
              {filtered.length === 1 ? "property" : "properties"} found
              {searchQuery && (
                <>
                  {" "}
                  for{" "}
                  <span className="text-secondary-500 font-semibold">
                    "{searchQuery}"
                  </span>
                </>
              )}
            </p>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2 text-xs text-primary-400 font-semibold">
            <span>Sort by:</span>
            <select className="text-xs font-semibold text-primary-700 border border-primary-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-secondary-300 bg-white transition-all duration-200">
              <option>Newest First</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Most Popular</option>
            </select>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => handleTabChange(tab.key)}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                activeTab === tab.key
                  ? "bg-secondary-500 text-white shadow-lg shadow-secondary-500/30 scale-105"
                  : "bg-white text-primary-600 border border-primary-200 hover:border-secondary-300 hover:text-secondary-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        {paginated.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginated.map((listing, i) => (
              <PropertyCard key={listing.id} listing={listing} index={i} />
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-24 text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-secondary-50 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-secondary-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </div>
            <p className="text-xl font-bold text-primary-700">
              No properties found
            </p>
            <p className="text-primary-400 text-sm max-w-xs">
              Try adjusting your search or filters to find what you're looking
              for.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveTab("all");
                setCurrentPage(1);
              }}
              className="mt-2 px-6 py-2.5 bg-secondary-500 text-white text-sm font-bold rounded-xl hover:bg-secondary-600 active:scale-95 transition-all duration-200"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {paginated.length > 0 && totalPages > 1 && (
          <div className="mt-12">
            <Pagination
              current={currentPage}
              total={totalPages}
              onChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
