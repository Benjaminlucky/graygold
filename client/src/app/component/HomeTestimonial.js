"use client";

import { useRef, useState } from "react";
import HomeTestimonialCard from "./HomeTestimonialCard";

export default function HomeTestimonials() {
  const scrollContainerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(null);

  // Sample testimonials data - replace with your actual data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Property Investor",
      rating: 5,
      category: "Great Day",
      text: 'Because I was thinking of two plots, but office was not fragmented into rooms. "I have been satisfied with all your updates',
      hasAudio: true,
      audioUrl: "/audio/testimonial-1.mp3",
      date: "Nov 12, 2023",
      verified: true,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "First-time Buyer",
      rating: 5,
      category: "Hello Sir",
      text: "The experience I got for the commercial plot was amazing and professional!",
      hasAudio: false,
      date: "Oct 28, 2023",
      verified: true,
    },
    {
      id: 3,
      name: "Favor",
      role: "Investor",
      rating: 5,
      category: "Ok okay sir",
      text: "I have land sir",
      price: "₦2,400,000.00",
      propertyType: "Success",
      location: "Ibeju-Lekki Lagos",
      hasAudio: false,
      date: "Dec 5, 2023",
      verified: true,
    },
    {
      id: 4,
      name: "David Williams",
      role: "Property Developer",
      rating: 5,
      category: "Great Day",
      text: "I got a perfect piece of land in Ibeju, Lekki for ₦550k. However, I have not received invoice for documentation. You would be glad you update",
      hasAudio: true,
      audioUrl: "/audio/testimonial-4.mp3",
      date: "Nov 20, 2023",
      verified: true,
    },
    {
      id: 5,
      name: "James Manager H.M",
      role: "Real Estate Investor",
      rating: 5,
      category: null,
      text: "Re: Problem. Thank you. I appreciate your prompt response always. You agents have excellent customer service. Let me check with seller on your suggestion",
      hasAudio: false,
      date: "Jan 8, 2024",
      verified: true,
    },
    {
      id: 6,
      name: "Lisa Anderson",
      role: "Home Owner",
      rating: 5,
      category: "Thank you sir",
      text: "Thanks alot for providing trustworthy and productive services. I'm currently living in the house and I love every part of it. Even though they are not interested in selling. But I've enjoyed buying with them",
      hasAudio: false,
      date: "Dec 15, 2023",
      verified: true,
    },
    {
      id: 7,
      name: "Robert Smith",
      role: "Investor",
      rating: 5,
      category: "Thank you sir",
      text: "I appreciate your prompt response always. Yes, I will probably be back to you. Continuing our interest of the agreement",
      hasAudio: false,
      date: "Nov 30, 2023",
      verified: true,
    },
    {
      id: 8,
      name: "Jennifer Lee",
      role: "Business Owner",
      rating: 5,
      category: "Great Day",
      text: "Super duper excellent agents here. Thank you for remembering and providing best value service to each clients. We appreciate you all",
      hasAudio: false,
      date: "Jan 12, 2024",
      verified: true,
    },
  ];

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 400;
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
    <section className="relative py-16 lg:py-24 overflow-hidden bg-gradient-to-br from-primary-50/50 via-white to-secondary-50/30">
      {/* Background Decorations */}
      <div className="absolute top-10 left-0 w-96 h-96 bg-secondary-100/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl" />

      {/* Animated Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, #5b5b5b 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-block mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-100 text-secondary-600 text-sm font-semibold tracking-wide uppercase animate-slideDown">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Client Reviews
            </span>
          </div>

          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-primary-900 mb-4 animate-fadeInUp">
            Testimonials
          </h2>

          <p
            className="text-lg lg:text-xl text-primary-600 max-w-2xl mx-auto animate-fadeInUp"
            style={{ animationDelay: "0.2s" }}
          >
            Read reviews from some of our clients
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-end gap-3 mb-6 px-4">
          <button
            onClick={() => scroll("left")}
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
            onClick={() => scroll("right")}
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

        {/* Testimonials Horizontal Scroll - Masonry Style */}
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory px-4 pb-4"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <div className="inline-flex gap-6 items-start">
            {/* Column 1 */}
            <div className="flex flex-col gap-6 snap-start">
              {testimonials.slice(0, 3).map((testimonial, index) => (
                <HomeTestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                  index={index}
                  isPlaying={isPlaying === testimonial.id}
                  onPlayToggle={(id) =>
                    setIsPlaying(isPlaying === id ? null : id)
                  }
                />
              ))}
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-6 snap-start mt-12">
              {testimonials.slice(3, 6).map((testimonial, index) => (
                <HomeTestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                  index={index + 3}
                  isPlaying={isPlaying === testimonial.id}
                  onPlayToggle={(id) =>
                    setIsPlaying(isPlaying === id ? null : id)
                  }
                />
              ))}
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-6 snap-start">
              {testimonials.slice(6).map((testimonial, index) => (
                <HomeTestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                  index={index + 6}
                  isPlaying={isPlaying === testimonial.id}
                  onPlayToggle={(id) =>
                    setIsPlaying(isPlaying === id ? null : id)
                  }
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div
          className="mt-12 text-center animate-fadeInUp"
          style={{ animationDelay: "0.4s" }}
        >
          <p className="text-primary-600 mb-4">
            Want to share your experience?
          </p>
          <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white font-semibold rounded-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-secondary-500/30 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-r from-secondary-600 to-secondary-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <span className="relative z-10">Write a Review</span>
            <svg
              className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </button>
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
