"use client";

import { useState, useRef, useEffect } from "react";

export default function HomeTestimonialCard({
  testimonial,
  index,
  isPlaying,
  onPlayToggle,
}) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  // Determine card variant based on content
  const hasPrice = testimonial.price;
  const isShort = testimonial.text.length < 100;

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className="flex-shrink-0 w-[320px] sm:w-[350px] snap-start group"
      style={{
        animation: `floatIn 0.6s ease-out ${index * 0.1}s both`,
      }}
    >
      <div
        className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-primary-100 hover:border-secondary-200 relative overflow-hidden ${
          hasPrice ? "border-2 border-secondary-200" : ""
        }`}
      >
        {/* Gradient overlay on hover */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary-400 via-secondary-500 to-secondary-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

        {/* Category Badge (if exists) */}
        {testimonial.category && (
          <div className="mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-100 text-primary-700 text-xs font-semibold group-hover:bg-secondary-100 group-hover:text-secondary-700 transition-colors duration-300">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              {testimonial.category}
            </span>
          </div>
        )}

        {/* Star Rating */}
        <div className="flex gap-1 mb-3">
          {[...Array(testimonial.rating)].map((_, i) => (
            <svg
              key={i}
              className="w-5 h-5 text-yellow-400 animate-pulse"
              style={{ animationDelay: `${i * 0.1}s` }}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        {/* Testimonial Text */}
        <p className="text-primary-700 leading-relaxed mb-4 line-clamp-6">
          "{testimonial.text}"
        </p>

        {/* Audio Player (if has audio) */}
        {testimonial.hasAudio && (
          <div className="mb-4 p-3 rounded-xl bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200">
            <div className="flex items-center gap-3">
              {/* Play/Pause Button */}
              <button
                onClick={() => onPlayToggle(testimonial.id)}
                className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-secondary-500 to-secondary-600 flex items-center justify-center hover:from-secondary-600 hover:to-secondary-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 group/play"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5 text-white ml-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                )}
              </button>

              {/* Waveform Visualization */}
              <div className="flex-1">
                <div className="flex items-center gap-0.5 h-8">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-full transition-all duration-300 ${
                        isPlaying
                          ? "bg-secondary-500 animate-wave"
                          : "bg-primary-300"
                      }`}
                      style={{
                        height: `${Math.random() * 60 + 20}%`,
                        animationDelay: `${i * 0.05}s`,
                      }}
                    />
                  ))}
                </div>
                {/* Time Display */}
                {duration > 0 && (
                  <div className="flex justify-between text-xs text-primary-500 mt-1">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Hidden Audio Element */}
            {testimonial.audioUrl && (
              <audio
                ref={audioRef}
                src={testimonial.audioUrl}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => onPlayToggle(null)}
              />
            )}
          </div>
        )}

        {/* Price Card (if has price) */}
        {hasPrice && (
          <div className="mb-4 p-4 rounded-xl bg-gradient-to-br from-secondary-50 to-secondary-100 border-2 border-secondary-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-secondary-600 uppercase tracking-wide">
                {testimonial.propertyType}
              </span>
              <div className="w-8 h-8 rounded-lg bg-secondary-500 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </div>
            </div>
            <div className="text-2xl font-bold text-secondary-700 mb-1">
              {testimonial.price}
            </div>
            {testimonial.location && (
              <div className="flex items-center gap-1 text-xs text-secondary-600">
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                {testimonial.location}
              </div>
            )}
          </div>
        )}

        {/* Author Info */}
        <div className="flex items-start justify-between pt-4 border-t border-primary-100">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary-400 to-secondary-600 flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
              {testimonial.name.charAt(0)}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-primary-900 group-hover:text-secondary-600 transition-colors duration-300">
                  {testimonial.name}
                </h4>
                {testimonial.verified && (
                  <svg
                    className="w-4 h-4 text-blue-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <p className="text-sm text-primary-500">{testimonial.role}</p>
            </div>
          </div>

          {/* Date */}
          <div className="text-xs text-primary-400">{testimonial.date}</div>
        </div>

        {/* Floating Quote Icon */}
        <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-secondary-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-0 group-hover:scale-100">
          <svg
            className="w-6 h-6 text-secondary-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        </div>
      </div>

      <style jsx>{`
        @keyframes floatIn {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes wave {
          0%,
          100% {
            transform: scaleY(1);
          }
          50% {
            transform: scaleY(1.5);
          }
        }

        .animate-wave {
          animation: wave 0.8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
