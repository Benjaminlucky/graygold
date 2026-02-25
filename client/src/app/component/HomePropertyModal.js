"use client";

import { useState, useEffect } from "react";

export default function HomePropertyModal({ property, onClose }) {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isImageFullscreen, setIsImageFullscreen] = useState(false);

  // Create a combined media array: images + youtube video
  const mediaItems = [
    ...property.images.map((image) => ({
      type: "image",
      src: image,
      alt: property.title,
    })),
    ...(property.youtube_video
      ? [
          {
            type: "youtube",
            videoId: property.youtube_video,
            alt: `${property.title} - Video Tour`,
          },
        ]
      : []),
  ];

  const totalMedia = mediaItems.length;
  const isImageMedia = mediaItems[currentMediaIndex]?.type === "image";
  const isVideoMedia = mediaItems[currentMediaIndex]?.type === "youtube";

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        if (isImageFullscreen) {
          setIsImageFullscreen(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isImageFullscreen, onClose]);

  const nextMedia = () => {
    setCurrentMediaIndex((prev) => (prev === totalMedia - 1 ? 0 : prev + 1));
  };

  const prevMedia = () => {
    setCurrentMediaIndex((prev) => (prev === 0 ? totalMedia - 1 : prev - 1));
  };

  const currentMedia = mediaItems[currentMediaIndex];

  return (
    <>
      {/* Modal Overlay */}
      <div
        className="fixed inset-0 bg-primary-900/95 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fadeIn"
        onClick={onClose}
      >
        {/* Modal Content */}
        <div
          className="relative bg-white rounded-2xl w-full max-w-7xl max-h-[95vh] overflow-hidden shadow-2xl animate-scaleIn"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-secondary-500 hover:text-white transition-all duration-300 group"
            aria-label="Close modal"
          >
            <svg
              className="w-6 h-6 text-primary-900 group-hover:text-white transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Favorite Button */}
          <button
            className="absolute top-4 right-20 z-50 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-secondary-500 transition-all duration-300 group"
            aria-label="Add to favorites"
          >
            <svg
              className="w-6 h-6 text-primary-900 group-hover:text-white transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>

          <div className="flex flex-col lg:flex-row h-full max-h-[95vh]">
            {/* Left Side - Media Gallery (Images + Videos) */}
            <div className="lg:w-7/12 xl:w-8/12 relative bg-primary-900">
              {/* Main Media Container */}
              <div className="relative h-[40vh] lg:h-full">
                {/* Images */}
                {isImageMedia && (
                  <img
                    src={currentMedia.src}
                    alt={currentMedia.alt}
                    className="w-full h-full object-cover cursor-zoom-in"
                    onClick={() => setIsImageFullscreen(true)}
                  />
                )}

                {/* YouTube Video */}
                {isVideoMedia && (
                  <div className="w-full h-full flex items-center justify-center bg-black">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${currentMedia.videoId}?autoplay=0&modestbranding=1`}
                      title={currentMedia.alt}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                )}

                {/* Video Badge */}
                {isVideoMedia && (
                  <div className="absolute top-4 left-4 z-40 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-black shadow-lg">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                    PROPERTY TOUR
                  </div>
                )}

                {/* Navigation Arrows */}
                {totalMedia > 1 && (
                  <>
                    <button
                      onClick={prevMedia}
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-40 w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-xl hover:bg-secondary-500 hover:text-white transition-all duration-300 group"
                      aria-label="Previous media"
                    >
                      <svg
                        className="w-7 h-7 text-primary-900 group-hover:text-white transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={nextMedia}
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-40 w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-xl hover:bg-secondary-500 hover:text-white transition-all duration-300 group"
                      aria-label="Next media"
                    >
                      <svg
                        className="w-7 h-7 text-primary-900 group-hover:text-white transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </>
                )}

                {/* Expand/Fullscreen Button (Images only) */}
                {isImageMedia && (
                  <button
                    onClick={() => setIsImageFullscreen(true)}
                    className="absolute bottom-4 right-4 z-40 px-4 py-2 rounded-lg bg-white/90 backdrop-blur-sm flex items-center gap-2 shadow-lg hover:bg-secondary-500 hover:text-white transition-all duration-300 group"
                    aria-label="View fullscreen"
                  >
                    <svg
                      className="w-5 h-5 text-primary-900 group-hover:text-white transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                      />
                    </svg>
                    <span className="text-sm font-semibold">Expand</span>
                  </button>
                )}
              </div>

              {/* Thumbnail/Media Strip */}
              {totalMedia > 1 && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary-900/95 to-transparent p-4">
                  <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                    {mediaItems.map((media, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentMediaIndex(idx)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all duration-300 relative ${
                          idx === currentMediaIndex
                            ? "ring-4 ring-secondary-500 scale-110"
                            : "ring-2 ring-white/30 hover:ring-white/60 opacity-70 hover:opacity-100"
                        }`}
                      >
                        {media.type === "image" ? (
                          <img
                            src={media.src}
                            alt={`Thumbnail ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <>
                            <div className="w-full h-full bg-black flex items-center justify-center">
                              <svg
                                className="w-8 h-8 text-red-500"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                              </svg>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/80 to-transparent flex items-end justify-end p-1">
                              <span className="text-white text-xs font-bold">
                                TOUR
                              </span>
                            </div>
                          </>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Media Counter */}
              {totalMedia > 1 && (
                <div className="absolute top-4 left-4 z-40 px-3 py-1.5 rounded-lg bg-white/90 backdrop-blur-sm text-primary-900 text-xs font-bold shadow-lg">
                  {currentMediaIndex + 1} / {totalMedia}
                </div>
              )}
            </div>

            {/* Right Side - Property Details */}
            <div className="lg:w-5/12 xl:w-4/12 overflow-y-auto">
              <div className="p-6 lg:p-8">
                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {property.badges.map((badge, idx) => (
                    <span
                      key={idx}
                      className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                        badge === "Featured"
                          ? "bg-secondary-500"
                          : badge === "New Listing"
                            ? "bg-primary-600"
                            : "bg-primary-800"
                      }`}
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h2 className="text-2xl lg:text-3xl font-bold text-primary-900 mb-2">
                  {property.title}
                </h2>

                {/* Location */}
                <div className="flex items-center gap-2 text-primary-600 mb-6">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-base">{property.location}</span>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <p className="text-4xl font-bold text-secondary-600">
                    {property.price}
                  </p>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <p className="text-primary-700 leading-relaxed">
                    {property.description}
                  </p>
                </div>

                {/* Property Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-primary-50 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <svg
                        className="w-6 h-6 text-secondary-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                      </svg>
                      <span className="text-sm text-primary-600">Bedrooms</span>
                    </div>
                    <p className="text-2xl font-bold text-primary-900">
                      {property.bedrooms}
                    </p>
                  </div>

                  <div className="bg-primary-50 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <svg
                        className="w-6 h-6 text-secondary-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm text-primary-600">
                        Bathrooms
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-primary-900">
                      {property.bathrooms}
                    </p>
                  </div>

                  <div className="bg-primary-50 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <svg
                        className="w-6 h-6 text-secondary-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                        <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                      </svg>
                      <span className="text-sm text-primary-600">Garage</span>
                    </div>
                    <p className="text-2xl font-bold text-primary-900">
                      {property.garage}
                    </p>
                  </div>

                  <div className="bg-primary-50 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <svg
                        className="w-6 h-6 text-secondary-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                      </svg>
                      <span className="text-sm text-primary-600">Sqm</span>
                    </div>
                    <p className="text-2xl font-bold text-primary-900">
                      {property.sqm}
                    </p>
                  </div>

                  <div className="bg-primary-50 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <svg
                        className="w-6 h-6 text-secondary-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm text-primary-600">Sq Ft</span>
                    </div>
                    <p className="text-2xl font-bold text-primary-900">
                      {property.sqft}
                    </p>
                  </div>

                  <div className="bg-primary-50 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <svg
                        className="w-6 h-6 text-secondary-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm text-primary-600">
                        Year Built
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-primary-900">
                      {property.yearBuilt}
                    </p>
                  </div>
                </div>

                {/* CTA Button */}
                <button className="w-full bg-gradient-to-r from-secondary-500 to-secondary-600 text-white font-bold py-4 rounded-xl hover:from-secondary-600 hover:to-secondary-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-secondary-500/30 transform hover:scale-105">
                  Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Image Viewer */}
      {isImageFullscreen && isImageMedia && (
        <div
          className="fixed inset-0 bg-black z-[200] flex items-center justify-center animate-fadeIn"
          onClick={() => setIsImageFullscreen(false)}
        >
          <button
            onClick={() => setIsImageFullscreen(false)}
            className="absolute top-4 right-4 z-50 w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all duration-300"
            aria-label="Close fullscreen"
          >
            <svg
              className="w-7 h-7 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <img
            src={currentMedia.src}
            alt={currentMedia.alt}
            className="max-w-[95vw] max-h-[95vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Navigation in fullscreen */}
          {property.images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevMedia();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                aria-label="Previous image"
              >
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextMedia();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                aria-label="Next image"
              >
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}

          {/* Image counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium">
            {currentMediaIndex + 1} / {totalMedia}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}
