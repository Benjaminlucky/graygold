"use client";

import { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [hoveredLocation, setHoveredLocation] = useState(null);
  const [emailCopied, setEmailCopied] = useState(false);

  const locations = [
    { name: "Abuja", href: "/locations/abuja" },
    { name: "Lagos", href: "/locations/lagos" },
    { name: "Asaba", href: "/locations/asaba" },
    { name: "Ibadan", href: "/locations/ibadan" },
  ];

  const socialLinks = [
    {
      name: "Instagram",
      icon: "instagram",
      href: "https://www.instagram.com/vivianpollard.o?igsh=Zzh1OTByYzAyanl2&utm_source=qr",
    },
    {
      name: "YouTube",
      icon: "youtube",
      href: "https://www.youtube.com/c/VIVIANOKICHE",
    },
  ];

  const handleEmailCopy = () => {
    navigator.clipboard.writeText("info@edenoasisrealty.com");
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  return (
    <footer className="relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary-500 via-secondary-600 to-secondary-700 animate-gradient-shift" />

      {/* Geometric patterns overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-float-delayed" />
      </div>

      {/* Main footer content */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Discover Section */}
          <div className="space-y-6 animate-slide-up">
            <h3 className="text-2xl lg:text-3xl font-bold text-white relative inline-block">
              Discover
              <span className="absolute -bottom-2 left-0 w-16 h-1 bg-white rounded-full animate-expand" />
            </h3>
            <ul className="space-y-3">
              {locations.map((location, index) => (
                <li
                  key={location.name}
                  style={{ animationDelay: `${index * 100}ms` }}
                  className="animate-fade-in"
                >
                  <Link
                    href={location.href}
                    onMouseEnter={() => setHoveredLocation(location.name)}
                    onMouseLeave={() => setHoveredLocation(null)}
                    className="group flex items-center gap-2 text-white/90 hover:text-white transition-all duration-300"
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full bg-white transition-all duration-300 ${
                        hoveredLocation === location.name
                          ? "scale-150 shadow-lg shadow-white/50"
                          : "scale-100"
                      }`}
                    />
                    <span className="text-lg font-medium relative">
                      {location.name}
                      <span
                        className={`absolute -bottom-0.5 left-0 h-0.5 bg-white transition-all duration-300 ${
                          hoveredLocation === location.name ? "w-full" : "w-0"
                        }`}
                      />
                    </span>
                    <svg
                      className={`w-4 h-4 transition-all duration-300 ${
                        hoveredLocation === location.name
                          ? "translate-x-1 opacity-100"
                          : "translate-x-0 opacity-0"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div
            className="space-y-6 animate-slide-up md:col-span-1 lg:col-span-2"
            style={{ animationDelay: "200ms" }}
          >
            <h3 className="text-2xl lg:text-3xl font-bold text-white relative inline-block">
              Contact us
              <span
                className="absolute -bottom-2 left-0 w-16 h-1 bg-white rounded-full animate-expand"
                style={{ animationDelay: "200ms" }}
              />
            </h3>

            <div className="space-y-4">
              {/* Address */}
              <div className="group flex items-start gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:shadow-lg hover:shadow-white/10">
                <svg
                  className="w-6 h-6 text-white mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
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
                <div className="text-white/90 group-hover:text-white transition-colors duration-300">
                  <p className="text-lg leading-relaxed">
                    Princess and Angels Mall, Lekki Epe expressway,
                    <br />
                    Lekki Lagos Nigeria.
                  </p>
                </div>
              </div>

              {/* Email */}
              <button
                onClick={handleEmailCopy}
                className="group flex items-center gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 w-full text-left hover:shadow-lg hover:shadow-white/10 relative overflow-hidden"
              >
                <svg
                  className="w-6 h-6 text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-lg text-white/90 group-hover:text-white transition-colors duration-300">
                  info@graygoldrealty.com
                </span>

                {/* Copy tooltip */}
                <span
                  className={`absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold px-3 py-1 rounded-full transition-all duration-300 ${
                    emailCopied
                      ? "bg-white text-secondary-600 opacity-100 translate-x-0"
                      : "bg-white/20 text-white opacity-0 translate-x-4"
                  }`}
                >
                  {emailCopied ? "Copied!" : "Click to copy"}
                </span>
              </button>

              {/* Phone */}
              <a
                href="tel:+2341234567890"
                className="group flex items-center gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:shadow-lg hover:shadow-white/10"
              >
                <svg
                  className="w-6 h-6 text-white flex-shrink-0 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="text-lg text-white/90 group-hover:text-white transition-colors duration-300">
                  +2348060117072, +2348126326511
                </span>
              </a>
            </div>
          </div>

          {/* Social Media & Newsletter */}
          <div
            className="space-y-6 animate-slide-up"
            style={{ animationDelay: "400ms" }}
          >
            <h3 className="text-2xl lg:text-3xl font-bold text-white relative inline-block">
              Connect
              <span
                className="absolute -bottom-2 left-0 w-16 h-1 bg-white rounded-full animate-expand"
                style={{ animationDelay: "400ms" }}
              />
            </h3>

            {/* Social Icons */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-12 h-12 flex items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white hover:scale-110 transition-all duration-300 overflow-hidden"
                  style={{ animationDelay: `${400 + index * 100}ms` }}
                  aria-label={social.name}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <SocialIcon name={social.icon} />
                </a>
              ))}
            </div>

            {/* Newsletter Signup */}
            <div className="space-y-3">
              <p className="text-white/90 text-sm">
                Stay updated with our latest properties
              </p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-white focus:bg-white/15 transition-all duration-300"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-white text-secondary-600 font-semibold hover:bg-white/90 hover:shadow-lg hover:shadow-white/20 transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  Join
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/10 bg-primary-700/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/80 text-sm text-center md:text-left animate-fade-in">
              © GrayGold Investment - All rights reserved{" "}
              {new Date().getFullYear()}
            </p>
            <p
              className="text-white/60 text-sm text-center md:text-right animate-fade-in"
              style={{ animationDelay: "200ms" }}
            >
              Developed by{" "}
              <a
                href="https://inspireme.media"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-white font-semibold underline decoration-white/30 hover:decoration-white transition-all duration-300"
              >
                Inspireme Media Networks
              </a>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-shift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }

        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(20px) translateX(-10px);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes expand {
          from {
            width: 0;
          }
          to {
            width: 4rem;
          }
        }

        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 10s ease infinite;
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out both;
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out both;
        }

        .animate-expand {
          animation: expand 0.8s ease-out both;
        }
      `}</style>
    </footer>
  );
}

// Social Media Icon Component
function SocialIcon({ name }) {
  const icons = {
    instagram: (
      <svg
        className="w-6 h-6 text-white group-hover:text-secondary-600 transition-colors duration-300"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    youtube: (
      <svg
        className="w-6 h-6 text-white group-hover:text-secondary-600 transition-colors duration-300"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  };

  return icons[name] || null;
}
