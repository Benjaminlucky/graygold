"use client";

import { useState } from "react";

// Alternative: Static Grid Layout (for comparison)
export default function PartnersGrid() {
  const partners = [
    {
      id: 1,
      name: "CruxStone",
      logo: "/partners/cruxstone.svg",
      description: "Leading construction and development",
      website: "https://cruxstone.com",
    },
    {
      id: 2,
      name: "Landmark Corporate Realty",
      logo: "/partners/landmark.svg",
      description: "Premium real estate solutions",
      website: "https://landmark.com",
    },
    {
      id: 3,
      name: "Granules",
      logo: "/partners/granules.svg",
      description: "Innovative building materials",
      website: "https://granules.com",
    },
    {
      id: 4,
      name: "Veritasi Homes",
      logo: "/partners/veritasi.svg",
      description: "Luxury home development",
      website: "https://veritasi.com",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-primary-900 mb-4">
            Our Partners
          </h2>
          <p className="text-lg text-primary-600 max-w-2xl mx-auto">
            We are in partnership with companies driven by excellence
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {partners.map((partner, index) => (
            <PartnerGridCard key={partner.id} partner={partner} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PartnerGridCard({ partner, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={partner.website}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animation: `fadeInScale 0.6s ease-out ${index * 0.1}s both`,
      }}
    >
      <div className="relative aspect-[4/3] rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-primary-100 hover:border-secondary-200 overflow-hidden">
        {/* Background Gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-secondary-50 to-primary-50 transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Logo */}
        <div className="relative h-full flex items-center justify-center p-8">
          <img
            src={partner.logo}
            alt={partner.name}
            className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
          />
        </div>

        {/* Info Overlay */}
        <div
          className={`absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-primary-900/95 to-transparent transition-all duration-500 ${
            isHovered
              ? "translate-y-0 opacity-100"
              : "translate-y-full opacity-0"
          }`}
        >
          <p className="text-white text-sm font-semibold">{partner.name}</p>
          <p className="text-white/80 text-xs mt-1">{partner.description}</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </a>
  );
}
