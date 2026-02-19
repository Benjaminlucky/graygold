import InquiryForm from "./InquiryForm";

export default function HomeHeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="h-full w-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/heroBackground.jpg')",
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/70 via-primary-800/60 to-primary-900/80" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
        {/* Hero Content */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Where Architectural Excellence
            <br />
            <span className="text-secondary-500">Meets Lasting Wealth</span>
          </h1>
          <p className="mb-8 text-lg text-primary-100 sm:text-xl lg:text-2xl">
            Nigeria's Premier Gateway to Luxury Living in Lagos, Abuja, Asaba &
            Enugu
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button className="group relative overflow-hidden rounded-lg bg-secondary-500 px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-secondary-600 hover:shadow-2xl hover:shadow-secondary-500/50">
              <span className="relative z-10">View Curated Properties</span>
              <div className="absolute inset-0 -z-0 bg-gradient-to-r from-secondary-600 to-secondary-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </button>
            <button className="rounded-lg border-2 border-white px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-white hover:text-primary-900">
              Schedule Consultation
            </button>
          </div>
        </div>

        {/* Inquiry Form */}
        <InquiryForm />
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center gap-2 text-white">
          <span className="text-sm font-medium">Scroll to explore</span>
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
