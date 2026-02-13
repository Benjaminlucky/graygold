"use client";

import { useRef, useEffect, useState } from "react";

export default function HomePartners() {
  const scrollContainerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  // Partner logos data - replace with your actual logos
  const partners = [
    {
      id: 1,
      name: "CruxStone",
      logo: "/partners/cruxstone.png",
      description: "Leading construction and development",
    },
    {
      id: 2,
      name: "Landmark Corporate Realty",
      logo: "/partners/landmark.png",
      description: "Premium real estate solutions",
    },
    {
      id: 3,
      name: "MKH Properties",
      logo: "/partners/mkh.png",
      description: "Innovative building materials",
    },
    {
      id: 4,
      name: "Veritasi Homes",
      logo: "/partners/veritasi.png",
      description: "Luxury home development",
    },
    {
      id: 5,
      name: "Makarios Homes",
      logo: "/partners/makarios.png",
      description: "Excellence in service",
    },
    {
      id: 6,
      name: "Gracias Properties",
      logo: "/partners/gracias.png",
      description: "Trusted collaboration",
    },
  ];

  // Duplicate partners for infinite scroll effect
  const duplicatedPartners = [...partners, ...partners, ...partners];

  // Auto-scroll effect
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || isPaused) return;

    let animationFrameId;
    let scrollPosition = 0;
    const scrollSpeed = 0.5; // Pixels per frame

    const scroll = () => {
      scrollPosition += scrollSpeed;

      // Reset scroll position for infinite loop
      if (scrollPosition >= container.scrollWidth / 3) {
        scrollPosition = 0;
      }

      container.scrollLeft = scrollPosition;
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isPaused]);

  const scrollManual = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 300;
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
    <section className="relative py-16 lg:py-24 overflow-hidden bg-gradient-to-br from-white via-primary-50/30 to-white">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-100/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl" />

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, #5b5b5b 1px, transparent 1px),
              linear-gradient(to bottom, #5b5b5b 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-block mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold tracking-wide uppercase animate-slideDown">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
              Partnerships
            </span>
          </div>

          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-primary-900 mb-4 animate-fadeInUp">
            Our Partners
          </h2>

          <p
            className="text-lg lg:text-xl text-primary-600 max-w-2xl mx-auto animate-fadeInUp"
            style={{ animationDelay: "0.2s" }}
          >
            We are in partnership with companies driven by excellence
          </p>
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center mb-8">
          {/* Manual Scroll Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => scrollManual("left")}
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
              onClick={() => scrollManual("right")}
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

          {/* Pause/Play Toggle */}
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-primary-200 hover:border-secondary-500"
            aria-label={isPaused ? "Resume auto-scroll" : "Pause auto-scroll"}
          >
            {isPaused ? (
              <>
                <svg
                  className="w-5 h-5 text-primary-700 group-hover:text-secondary-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
                <span className="text-sm font-semibold text-primary-700 group-hover:text-secondary-600">
                  Play
                </span>
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5 text-primary-700 group-hover:text-secondary-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-semibold text-primary-700 group-hover:text-secondary-600">
                  Pause
                </span>
              </>
            )}
          </button>
        </div>

        {/* Partners Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="overflow-x-hidden scrollbar-hide"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <div className="flex gap-8 lg:gap-12">
            {duplicatedPartners.map((partner, index) => (
              <PartnerCard
                key={`${partner.id}-${index}`}
                partner={partner}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Gradient Fade Edges */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-32 h-64 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-32 h-64 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-10" />

        {/* Partner Count Badge */}
        <div
          className="mt-12 text-center animate-fadeInUp"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-secondary-50 to-primary-50 border-2 border-secondary-200">
            <div className="flex -space-x-2">
              {partners.slice(0, 4).map((partner, i) => (
                <div
                  key={partner.id}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary-400 to-secondary-600 border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                  style={{ zIndex: 10 - i }}
                >
                  {partner.name.charAt(0)}
                </div>
              ))}
            </div>
            <span className="text-primary-900 font-bold">
              {partners.length}+ Trusted Partners
            </span>
            <svg
              className="w-5 h-5 text-secondary-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
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

        .animate-slideDown {
          animation: slideDown 0.6s ease-out;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out both;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

// Partner Card Component
function PartnerCard({ partner, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex-shrink-0 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-48 lg:w-56 h-32 lg:h-36 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-primary-100 hover:border-secondary-200 overflow-hidden">
        {/* Gradient Overlay on Hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-secondary-50 to-primary-50 transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary-400 via-secondary-500 to-secondary-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

        {/* Logo Container */}
        <div className="relative h-full flex items-center justify-center p-6">
          <img
            src={partner.logo}
            alt={partner.name}
            className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110"
          />
        </div>

        {/* Hover Info Tooltip */}
        <div
          className={`absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-primary-900/95 to-transparent transition-all duration-500 ${
            isHovered
              ? "translate-y-0 opacity-100"
              : "translate-y-full opacity-0"
          }`}
        >
          <p className="text-white text-sm font-semibold text-center">
            {partner.name}
          </p>
          <p className="text-white/80 text-xs text-center mt-1">
            {partner.description}
          </p>
        </div>

        {/* Corner Badge */}
        <div
          className={`absolute top-3 right-3 w-6 h-6 rounded-full bg-secondary-500 flex items-center justify-center transition-all duration-500 ${
            isHovered
              ? "scale-100 opacity-100 rotate-0"
              : "scale-0 opacity-0 -rotate-90"
          }`}
        >
          <svg
            className="w-4 h-4 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
