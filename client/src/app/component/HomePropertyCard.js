"use client";

import { useState } from "react";

export default function HomePropertyCard({ property, index, onViewDetails }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === property.images.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === 0 ? property.images.length - 1 : prev - 1,
    );
  };

  const goToImage = (e, index) => {
    e.stopPropagation();
    setCurrentImageIndex(index);
  };

  return (
    <div
      className="flex-shrink-0 w-[350px] lg:w-[400px] snap-start group"
      style={{
        animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
        {/* Image Container with Slider */}
        <div className="relative h-64 lg:h-72 overflow-hidden group/image">
          {/* Images */}
          {property.images.map((image, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-all duration-500 ${
                idx === currentImageIndex
                  ? "opacity-100 translate-x-0"
                  : idx < currentImageIndex
                    ? "opacity-0 -translate-x-full"
                    : "opacity-0 translate-x-full"
              }`}
            >
              <img
                src={image}
                alt={`${property.title} - Image ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          ))}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 via-transparent to-transparent" />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
            {property.badges.map((badge, idx) => (
              <span
                key={idx}
                className={`px-3 py-1 rounded-full text-xs font-bold text-white backdrop-blur-sm ${
                  badge === "Featured"
                    ? "bg-secondary-500/90"
                    : badge === "New Listing"
                      ? "bg-primary-600/90"
                      : "bg-primary-800/90"
                }`}
                style={{
                  animation: `slideInLeft 0.5s ease-out ${index * 0.1 + idx * 0.1}s both`,
                }}
              >
                {badge}
              </span>
            ))}
          </div>

          {/* Image Navigation Arrows */}
          {property.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className={`absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg transition-all duration-300 ${
                  isHovered
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-4"
                } hover:bg-secondary-500 hover:text-white group/btn`}
                aria-label="Previous image"
              >
                <svg
                  className="w-5 h-5 text-primary-900 group-hover/btn:text-white transition-colors"
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
                onClick={nextImage}
                className={`absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg transition-all duration-300 ${
                  isHovered
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-4"
                } hover:bg-secondary-500 hover:text-white group/btn`}
                aria-label="Next image"
              >
                <svg
                  className="w-5 h-5 text-primary-900 group-hover/btn:text-white transition-colors"
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
            </>
          )}

          {/* Image Dots Indicator */}
          {property.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
              {property.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => goToImage(e, idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentImageIndex
                      ? "w-8 bg-white"
                      : "w-1.5 bg-white/50 hover:bg-white/75"
                  }`}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          )}

          {/* Zoom/Expand Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails();
            }}
            className={`absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg transition-all duration-300 ${
              isHovered ? "opacity-100 scale-100" : "opacity-0 scale-0"
            } hover:bg-secondary-500 hover:text-white group/zoom`}
            aria-label="View details"
          >
            <svg
              className="w-5 h-5 text-primary-900 group-hover/zoom:text-white transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-5 lg:p-6">
          {/* Price */}
          <div className="mb-3">
            <p className="text-xs text-primary-500 mb-1">
              {property.priceAvailable}
            </p>
            <p className="text-2xl font-bold text-primary-900">
              {property.price}
            </p>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-primary-900 mb-2 line-clamp-2 hover:text-secondary-600 transition-colors cursor-pointer">
            {property.title}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-2 text-primary-600 mb-4">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm">{property.location}</span>
          </div>

          {/* Property Type */}
          <p className="text-sm text-primary-700 mb-4 font-medium">
            {property.type}
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-primary-100">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-secondary-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <div>
                <p className="text-xs text-primary-500">Beds</p>
                <p className="text-sm font-bold text-primary-900">
                  {property.bedrooms}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-secondary-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p className="text-xs text-primary-500">Baths</p>
                <p className="text-sm font-bold text-primary-900">
                  {property.bathrooms}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-secondary-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
              </svg>
              <div>
                <p className="text-xs text-primary-500">Sqm</p>
                <p className="text-sm font-bold text-primary-900">
                  {property.sqm}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
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

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
