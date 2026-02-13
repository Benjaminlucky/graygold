"use client";

import { useState } from "react";
import Link from "next/link";

export default function HomeAreaCard({ area, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={area.link}
      className="group relative block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animation: `scaleIn 0.6s ease-out ${index * 0.15}s both`,
      }}
    >
      {/* Card Container */}
      <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl transition-all duration-700 hover:shadow-2xl hover:shadow-primary-900/20 hover:-translate-y-3">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={area.image}
            alt={area.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Dynamic Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/50 to-transparent transition-opacity duration-500 group-hover:from-primary-900/95" />

          {/* Animated Accent Line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary-500 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>

        {/* Content Container */}
        <div className="relative h-full flex flex-col justify-between p-6 lg:p-8">
          {/* Top Section - Property Count */}
          <div className="flex justify-between items-start">
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md transition-all duration-500 ${
                isHovered
                  ? "bg-secondary-500 text-white translate-y-0 opacity-100"
                  : "bg-white/90 text-primary-900 -translate-y-2 opacity-90"
              }`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <span className="text-sm font-bold">
                {area.propertyCount} Properties
              </span>
            </div>

            {/* Floating Icon */}
            <div
              className={`w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center transition-all duration-500 ${
                isHovered ? "scale-110 rotate-12" : "scale-100 rotate-0"
              }`}
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
          </div>

          {/* Middle Section - Decorative Element */}
          <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2">
            <div
              className={`h-px bg-gradient-to-r from-transparent via-white/40 to-transparent transition-all duration-700 ${
                isHovered ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
              }`}
            />
          </div>

          {/* Bottom Section - Area Info */}
          <div className="space-y-4">
            {/* Area Name */}
            <h3 className="text-4xl lg:text-5xl font-bold text-white transition-all duration-500 group-hover:translate-x-2">
              {area.name}
            </h3>

            {/* Description */}
            <p
              className={`text-white/90 text-sm lg:text-base transition-all duration-500 ${
                isHovered
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              {area.description}
            </p>

            {/* More Details Button */}
            <div className="relative inline-block">
              <button
                className={`group/btn relative flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-500 overflow-hidden ${
                  isHovered
                    ? "bg-secondary-500 text-white shadow-lg shadow-secondary-500/30 translate-y-0 opacity-100"
                    : "bg-white/10 backdrop-blur-md text-white translate-y-4 opacity-0"
                }`}
              >
                {/* Button background animation */}
                <div className="absolute inset-0 bg-secondary-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />

                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />

                <span className="relative z-10">More Details</span>
                <svg
                  className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1"
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
        </div>

        {/* Corner Accent */}
        <div
          className={`absolute bottom-0 right-0 w-32 h-32 transition-all duration-700 ${
            isHovered ? "opacity-100 scale-100" : "opacity-0 scale-0"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-tl from-secondary-500/30 to-transparent rounded-tl-full" />
        </div>

        {/* Particle Effect */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 bg-white/60 rounded-full transition-all duration-1000 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
              style={{
                left: `${20 + i * 30}%`,
                top: `${30 + i * 20}%`,
                animation: isHovered
                  ? `float ${2 + i * 0.5}s ease-in-out infinite`
                  : "none",
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-10px) translateX(5px);
          }
          75% {
            transform: translateY(10px) translateX(-5px);
          }
        }
      `}</style>
    </Link>
  );
}
