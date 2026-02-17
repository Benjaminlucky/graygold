"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function HeaderPremium() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/", icon: "🏠" },
    { name: "Listings", href: "/listing", icon: "🏢" },
    { name: "About", href: "/about", icon: "ℹ️" },
    { name: "Inquiry Form", href: "/inquiry", icon: "📋" },
    { name: "FAQ", href: "/faq", icon: "❓" },
    { name: "Contact us", href: "/contact", icon: "📧" },
  ];

  // Function to check if link is active
  const isActiveLink = (href) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-2xl shadow-2xl shadow-primary-900/5 border-b border-primary-100/50"
            : "bg-gradient-to-b from-white via-white to-white/95"
        }`}
      >
        <nav className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20 lg:h-28">
            {/* Logo with magnetic effect */}
            <Link href="/" className="relative z-10 group">
              <div className="relative">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-secondary-500/20 to-secondary-600/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full scale-150" />

                <div className="relative w-44 lg:w-56 h-12 lg:h-16 transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-0.5">
                  <Image
                    src="/grayGoldLogo.png"
                    alt="GrayGold Investment Limited"
                    fill
                    className="object-contain drop-shadow-lg"
                    priority
                  />
                </div>
              </div>
            </Link>

            {/* Desktop Navigation with Premium Effects */}
            <div className="hidden lg:flex items-center gap-2">
              {navLinks.map((link, index) => {
                const isActive = isActiveLink(link.href);

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onMouseEnter={() => setHoveredLink(link.name)}
                    onMouseLeave={() => setHoveredLink(null)}
                    className="relative px-5 py-3 group overflow-hidden"
                    style={{
                      animation: `slideDown 0.6s ease-out ${index * 0.1}s both`,
                    }}
                  >
                    {/* Background gradient morph */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br transition-all duration-500 rounded-xl ${
                        isActive
                          ? "from-secondary-500 via-secondary-600 to-secondary-700 opacity-100 scale-100"
                          : hoveredLink === link.name
                            ? "from-secondary-400 via-secondary-500 to-secondary-600 opacity-100 scale-100"
                            : "from-primary-50 via-primary-100 to-primary-50 opacity-0 scale-95"
                      }`}
                    />

                    {/* Shimmer effect */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ${
                        isActive || hoveredLink === link.name ? "" : "hidden"
                      }`}
                    />

                    <span
                      className={`relative z-10 text-sm font-semibold tracking-wide flex items-center gap-2 transition-all duration-300 ${
                        isActive
                          ? "text-white"
                          : "text-primary-700 group-hover:text-white"
                      }`}
                    >
                      <span className="text-base opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {link.icon}
                      </span>
                      {link.name}
                    </span>

                    {/* Bottom indicator */}
                    <div
                      className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 bg-gradient-to-r from-secondary-400 to-secondary-600 rounded-full transition-all duration-500 ${
                        isActive
                          ? "w-full"
                          : hoveredLink === link.name
                            ? "w-3/4"
                            : "w-0"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            {/* Mobile Menu Button with Animation */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 hover:from-secondary-50 hover:to-secondary-100 transition-all duration-300 overflow-hidden group"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6 flex flex-col items-center justify-center">
                <span
                  className={`absolute w-6 h-0.5 bg-primary-700 transition-all duration-300 ${
                    isMobileMenuOpen
                      ? "rotate-45 bg-secondary-600"
                      : "-translate-y-1.5"
                  }`}
                />
                <span
                  className={`absolute w-6 h-0.5 bg-primary-700 transition-all duration-300 ${
                    isMobileMenuOpen ? "opacity-0 scale-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute w-6 h-0.5 bg-primary-700 transition-all duration-300 ${
                    isMobileMenuOpen
                      ? "-rotate-45 bg-secondary-600"
                      : "translate-y-1.5"
                  }`}
                />
              </div>
            </button>
          </div>

          {/* Mobile Navigation */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-500 ${
              isMobileMenuOpen
                ? "max-h-[500px] opacity-100 pb-6"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="space-y-2 pt-2">
              {navLinks.map((link, index) => {
                const isActive = isActiveLink(link.href);

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`block px-5 py-4 rounded-xl transition-all duration-300 relative overflow-hidden group ${
                      isActive
                        ? "bg-gradient-to-r from-secondary-500 to-secondary-600 text-white shadow-lg shadow-secondary-500/30"
                        : "bg-gradient-to-r from-primary-50 to-primary-100 text-primary-700 hover:from-secondary-50 hover:to-secondary-100"
                    }`}
                    style={{
                      animation: `slideIn 0.4s ease-out ${index * 0.1}s both`,
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-3 font-semibold">
                        <span className="text-xl">{link.icon}</span>
                        {link.name}
                      </span>
                      {isActive && (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Animated gradient border */}
        <div className="h-px bg-gradient-to-r from-transparent via-primary-300/50 to-transparent relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary-500 to-transparent animate-shimmer" />
        </div>
      </header>

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

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
      `}</style>
    </>
  );
}
