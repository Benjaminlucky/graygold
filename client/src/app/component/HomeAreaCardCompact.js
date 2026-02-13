"use client";

import { useState } from "react";
import Link from "next/link";

// Alternative compact card style
export default function HomeAreaCardCompact({ area, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={area.link}
      className="group relative block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animation: `fadeInScale 0.6s ease-out ${index * 0.1}s both`,
      }}
    >
      <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
        {/* Image */}
        <div className="absolute inset-0">
          <img
            src={area.image}
            alt={area.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary-900/95 via-primary-900/40 to-transparent" />

          {/* Animated Border */}
          <div className="absolute inset-0 border-2 border-transparent group-hover:border-secondary-500/50 transition-all duration-500 rounded-2xl" />
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col justify-between p-6">
          {/* Property Count Badge */}
          <div className="self-start">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary-500 text-white text-xs font-bold shadow-lg shadow-secondary-500/30">
              <span>{area.propertyCount} Properties</span>
            </div>
          </div>

          {/* Area Info */}
          <div>
            <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-secondary-400 transition-colors duration-300">
              {area.name}
            </h3>

            <p
              className={`text-white/80 text-sm mb-4 transition-all duration-500 ${
                isHovered
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              {area.description}
            </p>

            {/* Button */}
            <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-secondary-500 text-white text-sm font-semibold hover:bg-secondary-600 transition-all duration-300 hover:shadow-lg hover:shadow-secondary-500/30 hover:translate-x-1">
              <span>More Details</span>
              <svg
                className="w-4 h-4"
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
        </div>

        {/* Hover Glow Effect */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-secondary-500/20 to-transparent transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />
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
    </Link>
  );
}
