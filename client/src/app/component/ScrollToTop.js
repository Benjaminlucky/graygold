"use client";

import { useState, useEffect } from "react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 group transition-all duration-500 ${
          isVisible
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-16 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        {/* Outer glow ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-secondary-500 to-secondary-600 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 scale-110 group-hover:scale-150" />

        {/* Main button */}
        <div className="relative w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-secondary-500 to-secondary-600 shadow-2xl shadow-secondary-500/30 group-hover:shadow-secondary-500/50 transition-all duration-500 group-hover:scale-110 group-active:scale-95">
          {/* Shimmer effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

          {/* Arrow icon */}
          <svg
            className="w-6 h-6 text-white relative z-10 transition-transform duration-300 group-hover:-translate-y-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>

          {/* Pulse effect */}
          <div className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-0 group-hover:opacity-75" />
        </div>

        {/* Tooltip */}
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-primary-900 text-white text-sm font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none shadow-lg">
          Back to top
          <span className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-primary-900" />
        </span>
      </button>

      <style jsx>{`
        @keyframes ping {
          75%,
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        .animate-ping {
          animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </>
  );
}
