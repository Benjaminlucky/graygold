"use client";

import { useState, useRef } from "react";

import HomePropertyCard from "./HomePropertyCard";
import HomePropertyModal from "./HomePropertyModal";

export default function HomeFeaturedListings() {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const scrollContainerRef = useRef(null);

  // Sample property data - replace with your actual data
  const properties = [
    {
      id: 1,
      title: "Ultra-Luxury 5-Bedroom Mansion in Ikoyi",
      location: "Ikoyi, Lagos",
      price: "₦3,500,000,000",
      priceAvailable: "Price Available Upon Request",
      bedrooms: 5,
      bathrooms: 5.5,
      garage: 1,
      sqm: 519,
      sqft: 5595,
      yearBuilt: 2024,
      type: "Fully Detached Duplex",
      description:
        "An Architectural Masterpiece – 6-Bedroom Ultra-Luxury Mansion in Ikoyi Introducing an extraordinary luxury residence in the heart of Ikoyi, Lagos—an opulent six-bedroom...",
      badges: ["Featured", "New Listing", "Hot Offer"],
      images: [
        "/propertiesImages/property.jpeg",
        "/propertiesImages/property1.jpeg",
        "/propertiesImages/property2.jpeg",
        "/propertiesImages/property3.jpeg",
      ],
    },
    {
      id: 2,
      title: "Modern 4-Bedroom Penthouse",
      location: "Victoria Island, Lagos",
      price: "₦2,800,000,000",
      priceAvailable: "Price Available Upon Request",
      bedrooms: 4,
      bathrooms: 4,
      garage: 2,
      sqm: 420,
      sqft: 4520,
      yearBuilt: 2024,
      type: "Penthouse",
      description:
        "Stunning modern penthouse with panoramic city views, premium finishes, and state-of-the-art amenities in the heart of Victoria Island.",
      badges: ["Featured", "New Listing"],
      images: [
        "/propertiesImages/property5.jpeg",
        "/propertiesImages/property6.jpeg",
        "/propertiesImages/property4.jpeg",
      ],
    },
    {
      id: 3,
      title: "Luxury 6-Bedroom Villa",
      location: "Lekki Phase 1, Lagos",
      price: "₦1,500,000,000",
      priceAvailable: "Price Available Upon Request",
      bedrooms: 6,
      bathrooms: 6,
      garage: 3,
      sqm: 650,
      sqft: 7000,
      yearBuilt: 2023,
      type: "Detached Villa",
      description:
        "Expansive luxury villa with smart home technology, infinity pool, and beautifully landscaped gardens in prime Lekki location.",
      badges: ["Featured", "Hot Offer"],
      images: [
        "/propertiesImages/property1.jpeg",
        "/propertiesImages/property2.jpeg",
        "/propertiesImages/property3.jpeg",
        "/propertiesImages/property4.jpeg",
        "/propertiesImages/property5.jpeg",
      ],
    },
    {
      id: 4,
      title: "Luxury 6-Bedroom Villa",
      location: "Lekki Phase 1, Lagos",
      price: "₦1,500,000,000",
      priceAvailable: "Price Available Upon Request",
      bedrooms: 6,
      bathrooms: 6,
      garage: 3,
      sqm: 650,
      sqft: 7000,
      yearBuilt: 2023,
      type: "Detached Villa",
      description:
        "Expansive luxury villa with smart home technology, infinity pool, and beautifully landscaped gardens in prime Lekki location.",
      badges: ["Featured", "Hot Offer"],
      images: [
        "/propertiesImages/property1.jpeg",
        "/propertiesImages/property2.jpeg",
        "/propertiesImages/property3.jpeg",
        "/propertiesImages/property4.jpeg",
        "/propertiesImages/property5.jpeg",
      ],
    },
    // Add more properties as needed
  ];

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 400;
    const newPosition =
      direction === "left"
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: newPosition,
      behavior: "smooth",
    });
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
                Featured Listing
              </h2>
              <div className="h-1 bg-gradient-to-r from-transparent via-secondary-500 to-transparent rounded-full" />
            </div>
            <p className="mt-4 text-lg lg:text-xl text-primary-600 max-w-2xl mx-auto">
              Discover some of our recent and finest listings
            </p>
          </div>

          {/* Navigation Buttons */}
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

          {/* Horizontal Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory px-4"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {properties.map((property, index) => (
              <HomePropertyCard
                key={property.id}
                property={property}
                index={index}
                onViewDetails={() => setSelectedProperty(property)}
              />
            ))}
          </div>

          {/* Scroll indicator dots (optional) */}
          <div className="flex justify-center gap-2 mt-8">
            {properties.map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full bg-primary-300 transition-all duration-300"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
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
