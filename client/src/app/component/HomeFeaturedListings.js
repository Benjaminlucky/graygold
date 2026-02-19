"use client";

import { useRef } from "react";
import { useState } from "react";
import HomePropertyCard from "./HomePropertyCard";
import HomePropertyModal from "./HomePropertyModal";
import { useFeaturedProperties } from "../hooks/Usefeaturedproperties";

// ─── Skeleton Card ────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="flex-shrink-0 w-[340px] sm:w-[380px] rounded-2xl overflow-hidden bg-white shadow-md animate-pulse">
      {/* Image placeholder */}
      <div className="h-56 bg-primary-100" />
      {/* Content placeholders */}
      <div className="p-5 space-y-3">
        <div className="h-5 bg-primary-100 rounded w-3/4" />
        <div className="h-4 bg-primary-100 rounded w-1/2" />
        <div className="flex gap-3 pt-2">
          <div className="h-4 bg-primary-100 rounded w-1/4" />
          <div className="h-4 bg-primary-100 rounded w-1/4" />
          <div className="h-4 bg-primary-100 rounded w-1/4" />
        </div>
        <div className="h-10 bg-primary-100 rounded-xl mt-2" />
      </div>
    </div>
  );
}

// ─── Error State ──────────────────────────────────────────────────────────────
function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 text-center px-4">
      <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
        <svg
          className="w-8 h-8 text-red-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
          />
        </svg>
      </div>
      <p className="text-primary-700 font-medium text-lg">
        Unable to load properties
      </p>
      <p className="text-primary-400 text-sm max-w-sm">{message}</p>
      <button
        onClick={onRetry}
        className="mt-2 px-6 py-2.5 rounded-xl bg-secondary-500 text-white font-semibold hover:bg-secondary-600 transition-colors duration-300"
      >
        Try Again
      </button>
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 text-center px-4">
      <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center">
        <svg
          className="w-8 h-8 text-primary-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      </div>
      <p className="text-primary-700 font-medium text-lg">
        No featured listings yet
      </p>
      <p className="text-primary-400 text-sm max-w-sm">
        Check back soon — exciting properties are coming.
      </p>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function HomeFeaturedListings() {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const scrollContainerRef = useRef(null);

  const { properties, loading, error, refetch } = useFeaturedProperties({
    limit: 10,
    status: "available",
  });

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollAmount = 400;
    container.scrollTo({
      left:
        direction === "left"
          ? container.scrollLeft - scrollAmount
          : container.scrollLeft + scrollAmount,
      behavior: "smooth",
    });
  };

  // Decide what to render inside the scroll area
  const renderContent = () => {
    if (loading) {
      return Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />);
    }
    if (error) {
      return (
        <div className="w-full">
          <ErrorState message={error} onRetry={refetch} />
        </div>
      );
    }
    if (properties.length === 0) {
      return (
        <div className="w-full">
          <EmptyState />
        </div>
      );
    }
    return properties.map((property, index) => (
      <HomePropertyCard
        key={property.id}
        property={property}
        index={index}
        onViewDetails={() => setSelectedProperty(property)}
      />
    ));
  };

  return (
    <>
      <section className="relative py-16 lg:py-24 overflow-hidden bg-gradient-to-br from-primary-50 via-white to-primary-50">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-secondary-100/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 lg:mb-16">
            <div className="inline-block">
              <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-primary-900 mb-3">
                Featured Listings
              </h2>
              <div className="h-1 bg-gradient-to-r from-transparent via-secondary-500 to-transparent rounded-full" />
            </div>
            <p className="mt-4 text-lg lg:text-xl text-primary-600 max-w-2xl mx-auto">
              Discover some of our recent and finest listings
            </p>
          </div>

          {/* Navigation Buttons — only visible when there are cards to scroll */}
          {!loading && !error && properties.length > 0 && (
            <div className="flex justify-end gap-3 mb-6 px-4">
              <button
                onClick={() => scroll("left")}
                className="group w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:bg-secondary-500 border border-primary-200 hover:border-secondary-500"
                aria-label="Scroll left"
              >
                <svg
                  className="w-6 h-6 text-primary-700 group-hover:text-white transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={() => scroll("right")}
                className="group w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:bg-secondary-500 border border-primary-200 hover:border-secondary-500"
                aria-label="Scroll right"
              >
                <svg
                  className="w-6 h-6 text-primary-700 group-hover:text-white transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          )}

          {/* Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory px-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {renderContent()}
          </div>

          {/* Scroll indicator dots */}
          {!loading && !error && properties.length > 0 && (
            <div className="flex justify-center gap-2 mt-8">
              {properties.map((_, index) => (
                <div
                  key={index}
                  className="w-2 h-2 rounded-full bg-primary-300 transition-all duration-300"
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Property Detail Modal */}
      {selectedProperty && (
        <HomePropertyModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}
