"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

/**
 * Status Badge Component
 */
function StatusBadge({ status }) {
  const styles = {
    available: "bg-green-500/10 text-green-600 border-green-200",
    sold: "bg-red-500/10 text-red-600 border-red-200",
    reserved: "bg-yellow-500/10 text-yellow-600 border-yellow-200",
  };

  const labels = {
    available: "Available",
    sold: "Sold",
    reserved: "Reserved",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border font-semibold text-sm ${
        styles[status] || styles.available
      }`}
    >
      <span
        className={`w-2 h-2 rounded-full ${
          status === "available"
            ? "bg-green-500"
            : status === "sold"
              ? "bg-red-500"
              : "bg-yellow-500"
        }`}
      />
      {labels[status] || status}
    </span>
  );
}

/**
 * Category Badge Component
 */
function CategoryBadge({ category }) {
  const styles = {
    ready: "bg-blue-500/10 text-blue-600 border-blue-200",
    "off-plan": "bg-purple-500/10 text-purple-600 border-purple-200",
  };

  const labels = {
    ready: "Ready to Move In",
    "off-plan": "Off Plan Project",
  };

  return (
    <span
      className={`inline-flex items-center px-4 py-2 rounded-lg border font-semibold text-sm ${
        styles[category] || styles.ready
      }`}
    >
      {labels[category] || category}
    </span>
  );
}

/**
 * Feature Item Component
 */
function FeatureItem({ icon: Icon, label, value }) {
  return (
    <div className="bg-primary-50 rounded-xl p-6 border border-primary-100">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-secondary-500/10 flex items-center justify-center">
          {Icon}
        </div>
        <span className="text-sm text-primary-600 font-medium">{label}</span>
      </div>
      <p className="text-2xl font-bold text-primary-900">{value}</p>
    </div>
  );
}

/**
 * Image Gallery Component
 */
function ImageGallery({ images, youtubeVideo }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mediaItems, setMediaItems] = useState([]);

  useEffect(() => {
    // Combine images and youtube video
    const items = [
      ...images.map((img) => ({ type: "image", src: img })),
      ...(youtubeVideo ? [{ type: "youtube", videoId: youtubeVideo }] : []),
    ];
    setMediaItems(items);
  }, [images, youtubeVideo]);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % mediaItems.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + mediaItems.length) % mediaItems.length,
    );
  };

  const currentMedia = mediaItems[currentIndex];

  if (mediaItems.length === 0) {
    return (
      <div className="aspect-video rounded-2xl overflow-hidden bg-primary-100 flex items-center justify-center">
        <div className="text-center">
          <svg
            className="w-16 h-16 text-primary-300 mx-auto mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 22V12h6v10"
            />
          </svg>
          <p className="text-primary-400 font-medium">No images available</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Main Gallery */}
      <div className="relative rounded-2xl overflow-hidden bg-primary-900 aspect-video">
        {currentMedia?.type === "image" ? (
          <Image
            src={currentMedia.src}
            alt="Property"
            fill
            className="object-cover cursor-zoom-in hover:scale-105 transition-transform duration-300"
            onClick={() => setIsFullscreen(true)}
            priority
          />
        ) : currentMedia?.type === "youtube" ? (
          <div className="w-full h-full flex items-center justify-center bg-black">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${currentMedia.videoId}?autoplay=0&modestbranding=1`}
              title="Property Tour"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        ) : null}

        {/* Video Badge */}
        {currentMedia?.type === "youtube" && (
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-bold shadow-lg">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            PROPERTY TOUR
          </div>
        )}

        {/* Navigation Arrows */}
        {mediaItems.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 hover:bg-secondary-500 hover:text-white text-primary-900 flex items-center justify-center shadow-lg transition-all duration-300"
              aria-label="Previous image"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 hover:bg-secondary-500 hover:text-white text-primary-900 flex items-center justify-center shadow-lg transition-all duration-300"
              aria-label="Next image"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}

        {/* Media Counter */}
        {mediaItems.length > 1 && (
          <div className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-lg bg-black/60 text-white text-xs font-bold backdrop-blur-sm">
            {currentIndex + 1} / {mediaItems.length}
          </div>
        )}

        {/* Expand Button */}
        {currentMedia?.type === "image" && (
          <button
            onClick={() => setIsFullscreen(true)}
            className="absolute bottom-4 right-4 z-10 px-4 py-2 rounded-lg bg-white/90 hover:bg-secondary-500 text-primary-900 hover:text-white flex items-center gap-2 font-bold text-sm shadow-lg transition-all duration-300"
          >
            <svg
              className="w-5 h-5"
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
            Expand
          </button>
        )}
      </div>

      {/* Thumbnail Strip */}
      {mediaItems.length > 1 && (
        <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
          {mediaItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                idx === currentIndex
                  ? "border-secondary-500 ring-2 ring-secondary-500/30 scale-105"
                  : "border-primary-200 opacity-60 hover:opacity-100"
              }`}
            >
              {item.type === "image" ? (
                <Image
                  src={item.src}
                  alt={`Thumbnail ${idx + 1}`}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-black flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Viewer */}
      {isFullscreen && currentMedia?.type === "image" && (
        <div
          className="fixed inset-0 bg-black z-[200] flex items-center justify-center p-4"
          onClick={() => setIsFullscreen(false)}
        >
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all duration-300"
          >
            <svg
              className="w-6 h-6"
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
          <Image
            src={currentMedia.src}
            alt="Property fullscreen"
            width={1200}
            height={800}
            className="max-w-[95vw] max-h-[95vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}

/**
 * Main Property Detail Client Component
 * Receives the server-fetched property as a prop — no client-side fetch.
 */
export default function PropertyDetailClient({ property }) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-primary-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link
              href="/"
              className="text-secondary-600 hover:text-secondary-700"
            >
              Home
            </Link>
            <span className="text-primary-400">/</span>
            <Link
              href="/listings"
              className="text-secondary-600 hover:text-secondary-700"
            >
              Listings
            </Link>
            <span className="text-primary-400">/</span>
            <span className="text-primary-600 font-semibold truncate">
              {property.title}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        {/* Gallery */}
        <div className="mb-8 lg:mb-12">
          <ImageGallery
            images={property.images}
            youtubeVideo={property.youtubeVideo}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              {/* Badges */}
              <div className="flex flex-wrap gap-3 mb-4">
                {property.badges.map((badge, idx) => (
                  <span
                    key={idx}
                    className={`px-4 py-2 rounded-lg font-bold text-xs text-white ${
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

              <h1 className="text-3xl lg:text-4xl font-black text-primary-900 mb-3">
                {property.title}
              </h1>

              {/* Location */}
              <div className="flex items-center gap-2 text-primary-600 mb-6">
                <svg
                  className="w-5 h-5 text-secondary-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-lg font-medium">
                  {property.location}, {property.city}
                </span>
              </div>

              {/* Price */}
              <p className="text-4xl font-black text-secondary-600 mb-4">
                {property.price}
              </p>

              {/* Status & Category */}
              <div className="flex flex-col sm:flex-row gap-3">
                <StatusBadge status={property.status} />
                <CategoryBadge category={property.category} />
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-primary-100" />

            {/* Description */}
            {property.description && (
              <div>
                <h2 className="text-xl font-bold text-primary-900 mb-4">
                  About This Property
                </h2>
                <p className="text-primary-700 leading-relaxed whitespace-pre-wrap">
                  {property.description}
                </p>
              </div>
            )}

            {/* Divider */}
            <div className="h-px bg-primary-100" />

            {/* Features Grid */}
            <div>
              <h2 className="text-xl font-bold text-primary-900 mb-6">
                Property Features
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <FeatureItem
                  icon={
                    <svg
                      className="w-5 h-5 text-secondary-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                  }
                  label="Bedrooms"
                  value={property.bedrooms}
                />
                <FeatureItem
                  icon={
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
                  }
                  label="Bathrooms"
                  value={property.bathrooms}
                />
                <FeatureItem
                  icon={
                    <svg
                      className="w-5 h-5 text-secondary-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                      <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                    </svg>
                  }
                  label="Garage"
                  value={property.garage}
                />
                {property.sqm && property.sqm !== "N/A" && (
                  <FeatureItem
                    icon={
                      <svg
                        className="w-5 h-5 text-secondary-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                      </svg>
                    }
                    label="Area (sqm)"
                    value={property.sqm}
                  />
                )}
                {property.sqft && property.sqft !== "N/A" && (
                  <FeatureItem
                    icon={
                      <svg
                        className="w-5 h-5 text-secondary-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    }
                    label="Area (sqft)"
                    value={property.sqft}
                  />
                )}
                {property.yearBuilt && property.yearBuilt !== "N/A" && (
                  <FeatureItem
                    icon={
                      <svg
                        className="w-5 h-5 text-secondary-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    }
                    label="Year Built"
                    value={property.yearBuilt}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Contact Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-primary-100 shadow-lg p-6 sticky top-24">
              {/* Property Type */}
              <div className="mb-6 pb-6 border-b border-primary-100">
                <p className="text-sm text-primary-500 font-semibold mb-1">
                  Property Type
                </p>
                <p className="text-lg font-bold text-primary-900">
                  {property.propertyType}
                </p>
              </div>

              {/* Quick Info */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center p-3 bg-primary-50 rounded-lg">
                  <span className="text-primary-600 font-medium">Status</span>
                  <StatusBadge status={property.status} />
                </div>
                <div className="flex justify-between items-center p-3 bg-primary-50 rounded-lg">
                  <span className="text-primary-600 font-medium">Category</span>
                  <CategoryBadge category={property.category} />
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-primary-100 mb-6" />

              {/* CTA Buttons */}
              <div className="space-y-3">
                <button className="w-full bg-secondary-500 hover:bg-secondary-600 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-secondary-500/30 transform hover:scale-105">
                  Inquire Now
                </button>
                <button
                  onClick={() => setLiked(!liked)}
                  className={`w-full font-bold py-4 rounded-xl transition-all duration-300 border-2 flex items-center justify-center gap-2 ${
                    liked
                      ? "bg-secondary-500/10 border-secondary-500 text-secondary-600"
                      : "bg-white border-primary-200 text-primary-600 hover:border-secondary-500 hover:text-secondary-600"
                  }`}
                >
                  <svg
                    className="w-5 h-5"
                    fill={liked ? "currentColor" : "none"}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  {liked ? "Added to Favorites" : "Add to Favorites"}
                </button>
              </div>

              {/* Share Button */}
              <button className="w-full mt-3 bg-primary-50 hover:bg-primary-100 text-primary-700 font-bold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C9.589 12.938 10 12.052 10 11c0-1.657-1.343-3-3-3s-3 1.343-3 3 1.343 3 3 3c.064 0 .128-.001.192-.003.243.962.807 1.85 1.684 2.342m0 0a9.005 9.005 0 019.366.02m0 0c.711-.45 1.269-1.063 1.605-1.795m0 0h2.117c.21 0 .414.104.541.271l.043.07c.297.472.447 1.02.447 1.585 0 .712-.274 1.39-.763 1.975A10.025 10.025 0 0119 18a10.864 10.864 0 01-5.663-1.671c-.165-.105-.296-.287-.296-.472v-.982c0-.464.373-.84.836-.84h.298c.412 0 .782.265.928.668a5.457 5.457 0 001.599 2.86 5.5 5.5 0 003.355 1.25"
                  />
                </svg>
                Share Property
              </button>

              {/* Additional Info */}
              <div className="mt-6 pt-6 border-t border-primary-100 text-xs text-primary-400 space-y-2">
                <p>
                  <span className="font-semibold">Property ID:</span> #
                  {property.id}
                </p>
                <p>
                  <span className="font-semibold">Listed:</span>{" "}
                  {new Date(property.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-12 pt-8 border-t border-primary-100">
          <Link
            href="/listings"
            className="inline-flex items-center gap-2 text-secondary-600 hover:text-secondary-700 font-bold transition-colors duration-300"
          >
            <svg
              className="w-5 h-5"
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
            Back to Listings
          </Link>
        </div>
      </div>
    </div>
  );
}
