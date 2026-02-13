"use client";

import { useState } from "react";
import HomeAreaCard from "./HomeAreaCard";

export default function HomePopularAreas() {
  const areas = [
    {
      id: 1,
      name: "Ikate",
      propertyCount: 28,
      image: "/propertiesImages/ikate.jpeg",
      description: "Vibrant coastal community with modern infrastructure",
      link: "/areas/ikate",
    },
    {
      id: 2,
      name: "Lekki Phase 1",
      propertyCount: 16,
      image: "/propertiesImages/2nd-Lekki-Roundabout-1.jpg",
      description: "Premium residential area with excellent amenities",
      link: "/areas/lekki-phase-1",
    },
    {
      id: 3,
      name: "Chevron Drive",
      propertyCount: 25,
      image: "/propertiesImages/Lekki-Phase-1.jpeg",
      description: "Upscale neighborhood with luxury developments",
      link: "/areas/chevron-drive",
    },
  ];

  return (
    <section className="relative py-16 lg:py-24 overflow-hidden bg-gradient-to-br from-white via-primary-50/30 to-white">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-secondary-100/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl" />

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(to right, #5b5b5b 1px, transparent 1px),
            linear-gradient(to bottom, #5b5b5b 1px, transparent 1px)
          `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-block mb-4">
            <span className="inline-block px-4 py-2 rounded-full bg-secondary-100 text-secondary-600 text-sm font-semibold tracking-wide uppercase animate-slideDown">
              Prime Locations
            </span>
          </div>

          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-primary-900 mb-4 animate-fadeInUp">
            Explore our most{" "}
            <span className="relative inline-block">
              <span className="relative z-10">popular areas</span>
              <span className="absolute bottom-2 left-0 w-full h-3 bg-secondary-500/20 -skew-y-1 animate-expandWidth" />
            </span>
          </h2>

          <p
            className="text-lg lg:text-xl text-primary-600 max-w-2xl mx-auto animate-fadeInUp"
            style={{ animationDelay: "0.2s" }}
          >
            See what these areas have to offer and buy your perfect home
          </p>
        </div>

        {/* Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {areas.map((area, index) => (
            <HomeAreaCard key={area.id} area={area} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <div
          className="mt-12 lg:mt-16 text-center animate-fadeInUp"
          style={{ animationDelay: "0.6s" }}
        >
          <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-800 to-primary-900 text-white font-semibold rounded-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary-900/30 hover:scale-105">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-secondary-500 to-secondary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

            <span className="relative z-10">Explore All Areas</span>
            <svg
              className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes expandWidth {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        .animate-slideDown {
          animation: slideDown 0.6s ease-out;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out both;
        }

        .animate-expandWidth {
          animation: expandWidth 1s ease-out 0.3s both;
        }
      `}</style>
    </section>
  );
}
