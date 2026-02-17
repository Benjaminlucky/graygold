"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// ─── Animated counter hook ───────────────────────────────────────────────────
function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

// ─── Intersection Observer hook ─────────────────────────────────────────────
function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ─── Stat card ───────────────────────────────────────────────────────────────
function StatCard({ value, suffix = "", label, delay = 0, started }) {
  const count = useCountUp(value, 2000, started);
  return (
    <div className="text-center" style={{ animationDelay: `${delay}ms` }}>
      <div className="text-5xl lg:text-6xl font-black text-white leading-none tabular-nums">
        {count}
        <span className="text-secondary-300">{suffix}</span>
      </div>
      <div className="mt-2 text-sm font-semibold text-white/60 uppercase tracking-widest">
        {label}
      </div>
    </div>
  );
}

// ─── Section reveal wrapper ──────────────────────────────────────────────────
function Reveal({ children, delay = 0, direction = "up", className = "" }) {
  const [ref, inView] = useInView();
  const transforms = {
    up: "translate-y-12",
    left: "-translate-x-12",
    right: "translate-x-12",
    none: "",
  };
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${className} ${
        inView
          ? "opacity-100 translate-x-0 translate-y-0"
          : `opacity-0 ${transforms[direction]}`
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ─── Main page ───────────────────────────────────────────────────────────────
export default function AboutPage() {
  const [statsRef, statsInView] = useInView(0.4);

  return (
    <div className="bg-white overflow-x-hidden">
      {/* ══════════════════════════════════════════════
          HERO — Full bleed editorial opener
      ══════════════════════════════════════════════ */}
      <section className="relative min-h-[70vh] flex items-end pb-16 lg:pb-24 overflow-hidden bg-primary-950">
        {/* Background texture */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#1a1a1a_0%,#2d2d2d_50%,#1a1a1a_100%)]" />
          {/* Diagonal red slash */}
          <div className="absolute -right-32 top-0 w-[60%] h-full bg-gradient-to-bl from-secondary-600/20 via-secondary-500/10 to-transparent" />
          {/* Grid lines */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        {/* Floating "GRAYGOLD" watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-white/[0.03] select-none pointer-events-none whitespace-nowrap tracking-tighter">
          GRAYGOLD
        </div>

        {/* Red accent bar — top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary-600 via-secondary-500 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <div className="max-w-4xl">
            {/* Eyebrow */}
            <Reveal>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-12 bg-secondary-500" />
                <span className="text-secondary-400 text-sm font-bold uppercase tracking-[0.3em]">
                  Who We Are
                </span>
              </div>
            </Reveal>

            {/* Headline */}
            <Reveal delay={100}>
              <h1 className="text-6xl sm:text-7xl lg:text-[90px] font-black text-white leading-[0.9] tracking-tighter">
                About
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-400 to-secondary-600">
                  Us
                </span>
              </h1>
            </Reveal>

            {/* Subheading */}
            <Reveal delay={200}>
              <p className="mt-8 text-xl lg:text-2xl text-white/60 font-light max-w-2xl leading-relaxed">
                Where Sophistication Meets Solid Investment — Nigeria's premier
                gateway to luxury living.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 right-12 hidden lg:flex flex-col items-center gap-2 opacity-40">
          <span className="text-[10px] text-white uppercase tracking-[0.3em] rotate-90 origin-center translate-y-4">
            Scroll
          </span>
          <div className="w-px h-16 bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          STANDARD OF EXCELLENCE — Split asymmetric
      ══════════════════════════════════════════════ */}
      <section className="relative py-24 lg:py-36 overflow-hidden">
        {/* Red blob bg */}
        <div className="absolute -left-48 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-secondary-50 blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left: big typographic accent */}
            <Reveal direction="left">
              <div className="relative">
                {/* Large decorative number */}
                <div className="absolute -top-8 -left-4 text-[180px] font-black text-primary-50 leading-none select-none pointer-events-none tracking-tighter">
                  01
                </div>
                <div className="relative z-10 pt-16">
                  <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full border border-secondary-200 bg-secondary-50">
                    <div className="w-2 h-2 rounded-full bg-secondary-500 animate-pulse" />
                    <span className="text-secondary-600 text-xs font-bold uppercase tracking-widest">
                      Our Standard
                    </span>
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-black text-primary-900 leading-tight tracking-tight">
                    The Standard
                    <br />
                    of{" "}
                    <span className="relative inline-block">
                      Excellence
                      <svg
                        className="absolute -bottom-1 left-0 w-full"
                        viewBox="0 0 200 8"
                        fill="none"
                      >
                        <path
                          d="M0 6 Q50 0 100 4 Q150 8 200 2"
                          stroke="#FF0404"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </h2>

                  {/* Divider */}
                  <div className="flex items-center gap-4 my-6">
                    <div className="h-px flex-1 bg-primary-100" />
                    <div className="w-2 h-2 rounded-full bg-secondary-500" />
                    <div className="h-px w-8 bg-secondary-500" />
                  </div>

                  <p className="text-lg text-primary-500 leading-relaxed">
                    At GrayGold Homes, luxury isn't a price tag — it's a
                    standard of living and a guarantee of value. We specialize
                    in the procurement, sale, and management of premium
                    residential and commercial properties across Nigeria's most
                    prestigious addresses.
                  </p>

                  <Link
                    href="/listings"
                    className="mt-8 inline-flex items-center gap-3 px-7 py-3.5 bg-secondary-500 text-white font-bold rounded-xl hover:bg-secondary-600 hover:shadow-xl hover:shadow-secondary-500/30 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 group"
                  >
                    Explore Properties
                    <svg
                      className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </Reveal>

            {/* Right: stacked image-like cards */}
            <Reveal direction="right" delay={150}>
              <div className="relative h-[480px] lg:h-[520px]">
                {/* Back card */}
                <div className="absolute top-0 right-0 w-[85%] h-[85%] rounded-3xl bg-gradient-to-br from-secondary-100 to-secondary-200 rotate-3" />
                {/* Main card */}
                <div className="absolute top-6 left-0 w-[85%] h-[85%] rounded-3xl bg-gradient-to-br from-primary-900 to-primary-800 overflow-hidden shadow-2xl -rotate-1">
                  {/* Interior pattern */}
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 20% 80%, #FF0404 0%, transparent 50%), radial-gradient(circle at 80% 20%, #fff 0%, transparent 50%)",
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white/20 select-none">
                      <div className="text-8xl font-black tracking-tighter">
                        GG
                      </div>
                      <div className="text-sm uppercase tracking-[0.5em] mt-2">
                        Homes
                      </div>
                    </div>
                  </div>
                  {/* Accent lines */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary-500 to-transparent" />
                  <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-secondary-500 to-transparent" />
                </div>
                {/* Floating pill */}
                <div className="absolute bottom-8 right-4 bg-white rounded-2xl shadow-2xl px-5 py-4 flex items-center gap-3 border border-primary-50">
                  <div className="w-10 h-10 rounded-xl bg-secondary-500 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-black text-primary-900">
                      Premium Certified
                    </div>
                    <div className="text-xs text-primary-400">
                      Nigeria Real Estate
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          STATS — Full-bleed dark band
      ══════════════════════════════════════════════ */}
      <section
        ref={statsRef}
        className="bg-primary-950 py-20 lg:py-24 relative overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(45deg, #FF0404 1px, transparent 1px), linear-gradient(-45deg, #FF0404 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary-500 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            <StatCard
              value={500}
              suffix="+"
              label="Properties Sold"
              delay={0}
              started={statsInView}
            />
            <StatCard
              value={12}
              suffix="+"
              label="Years Experience"
              delay={150}
              started={statsInView}
            />
            <StatCard
              value={98}
              suffix="%"
              label="Client Satisfaction"
              delay={300}
              started={statsInView}
            />
            <StatCard
              value={20}
              suffix="+"
              label="Prime Locations"
              delay={450}
              started={statsInView}
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          NAME + STORY — Alternating asymmetric rows
      ══════════════════════════════════════════════ */}
      <section className="py-24 lg:py-36">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-28 lg:space-y-40">
          {/* Our Name — text right, big number left */}
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <Reveal direction="left" className="lg:col-span-4">
              <div className="relative">
                <div className="text-[120px] lg:text-[160px] font-black text-primary-50 leading-none select-none tracking-tighter text-right">
                  02
                </div>
                <div className="absolute bottom-4 right-0 w-16 h-1 bg-secondary-500 rounded-full" />
              </div>
            </Reveal>
            <Reveal
              direction="right"
              delay={100}
              className="lg:col-span-8 lg:pl-12"
            >
              <div className="inline-flex items-center gap-3 mb-5 px-4 py-2 rounded-full border border-secondary-200 bg-secondary-50">
                <div className="w-2 h-2 rounded-full bg-secondary-500" />
                <span className="text-secondary-600 text-xs font-bold uppercase tracking-widest">
                  Our Name
                </span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-primary-900 leading-tight tracking-tight mb-6">
                Our Name,{" "}
                <span className="text-secondary-500">Our Promise</span>
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-primary-950 text-white">
                  <div className="text-secondary-400 font-black text-2xl mb-2">
                    Gray
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Represents our sophisticated, modern architectural aesthetic
                    and professional integrity — the understated confidence of
                    lasting quality.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-secondary-500 text-white">
                  <div className="text-white font-black text-2xl mb-2">
                    Gold
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Represents the enduring value and generational wealth we
                    create for every client — prosperity that transcends time.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Our Story — full width with accent */}
          <div className="relative">
            <Reveal>
              <div className="absolute -top-6 left-0 text-[120px] lg:text-[160px] font-black text-primary-50 leading-none select-none tracking-tighter">
                03
              </div>
            </Reveal>
            <div className="relative z-10 pt-16 grid lg:grid-cols-2 gap-12 items-start">
              <Reveal delay={100}>
                <div>
                  <div className="inline-flex items-center gap-3 mb-5 px-4 py-2 rounded-full border border-secondary-200 bg-secondary-50">
                    <div className="w-2 h-2 rounded-full bg-secondary-500" />
                    <span className="text-secondary-600 text-xs font-bold uppercase tracking-widest">
                      Our Story
                    </span>
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-black text-primary-900 leading-tight tracking-tight">
                    Built on a{" "}
                    <span className="text-secondary-500">Critical</span> Insight
                  </h2>
                </div>
              </Reveal>
              <Reveal delay={200}>
                <div className="space-y-5 text-primary-500 leading-relaxed text-lg">
                  <p>
                    GrayGold Homes was founded on a critical insight: Nigeria's
                    luxury market needed more than real estate agents — it
                    needed{" "}
                    <strong className="text-primary-800 font-bold">
                      Real Estate Advisors
                    </strong>
                    .
                  </p>
                  <p>
                    In an industry often clouded by ambiguity, we provide
                    transparent, seamless, data-driven property acquisition in
                    neighborhoods like{" "}
                    <span className="text-secondary-600 font-semibold">
                      Ikoyi, Eko Atlantic City, Lekki, Maitama, Asaba, Enugu,
                      and Asokoro
                    </span>
                    .
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          VISION & MISSION — Bold side-by-side cards
      ══════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 bg-primary-50/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Reveal>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="h-px w-12 bg-secondary-500" />
                <span className="text-secondary-500 text-sm font-bold uppercase tracking-[0.3em]">
                  Our Direction
                </span>
                <div className="h-px w-12 bg-secondary-500" />
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-primary-900 tracking-tight">
                Vision & Mission
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {/* Vision */}
            <Reveal direction="left" delay={100}>
              <div className="group relative overflow-hidden rounded-3xl bg-primary-950 p-8 lg:p-10 h-full hover:shadow-2xl hover:shadow-primary-900/20 transition-all duration-500">
                {/* Bg decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-secondary-500/10 blur-3xl group-hover:bg-secondary-500/20 transition-all duration-700" />
                <div className="absolute bottom-0 left-0 w-1 h-full bg-gradient-to-b from-secondary-500 to-transparent" />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-secondary-500/20 flex items-center justify-center mb-6 group-hover:bg-secondary-500 transition-colors duration-500">
                    <svg
                      className="w-6 h-6 text-secondary-400 group-hover:text-white transition-colors duration-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                  <div className="text-secondary-400 text-xs font-bold uppercase tracking-[0.3em] mb-3">
                    Our Vision
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-black text-white leading-tight mb-5 tracking-tight">
                    Africa's Premier Gateway
                  </h3>
                  <p className="text-white/60 leading-relaxed text-lg">
                    To be Africa's premier gateway to luxury living, recognized
                    for transforming Nigerian real estate through transparency,
                    architectural excellence, and generational wealth building.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Mission */}
            <Reveal direction="right" delay={200}>
              <div className="group relative overflow-hidden rounded-3xl bg-secondary-500 p-8 lg:p-10 h-full hover:shadow-2xl hover:shadow-secondary-500/30 transition-all duration-500">
                {/* Bg decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/10 blur-3xl group-hover:bg-white/20 transition-all duration-700" />
                <div className="absolute bottom-0 left-0 w-1 h-full bg-gradient-to-b from-white/40 to-transparent" />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-6 group-hover:bg-white transition-colors duration-500">
                    <svg
                      className="w-6 h-6 text-white group-hover:text-secondary-500 transition-colors duration-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div className="text-white/70 text-xs font-bold uppercase tracking-[0.3em] mb-3">
                    Our Mission
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-black text-white leading-tight mb-5 tracking-tight">
                    Bridging Dreams to Keys
                  </h3>
                  <p className="text-white/80 leading-relaxed text-lg">
                    Bridging the gap between luxury dreams and tangible keys in
                    Nigeria's most prestigious postcodes — transforming property
                    acquisition into wealth creation that lasts generations.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          VALUES — Icon grid
      ══════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Reveal className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-12 bg-secondary-500" />
              <span className="text-secondary-500 text-sm font-bold uppercase tracking-[0.3em]">
                What We Stand For
              </span>
              <div className="h-px w-12 bg-secondary-500" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-primary-900 tracking-tight">
              Our Core Values
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: (
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                ),
                title: "Transparency",
                desc: "Every transaction is clear, honest, and documented with full client visibility.",
              },
              {
                icon: (
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                ),
                title: "Excellence",
                desc: "We never compromise on quality — from the properties we list to the service we deliver.",
              },
              {
                icon: (
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                ),
                title: "Client First",
                desc: "Your investment goals drive every recommendation and decision we make.",
              },
              {
                icon: (
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                ),
                title: "Wealth Creation",
                desc: "We don't just sell properties — we build the foundation for generational prosperity.",
              },
            ].map((val, i) => (
              <Reveal key={val.title} delay={i * 100}>
                <div className="group p-6 rounded-2xl border border-primary-100 hover:border-secondary-200 bg-white hover:shadow-xl hover:shadow-secondary-500/5 hover:-translate-y-1 transition-all duration-400">
                  <div className="w-12 h-12 rounded-xl bg-secondary-50 text-secondary-500 flex items-center justify-center mb-4 group-hover:bg-secondary-500 group-hover:text-white transition-all duration-300">
                    {val.icon}
                  </div>
                  <h3 className="font-black text-primary-900 text-lg mb-2">
                    {val.title}
                  </h3>
                  <p className="text-primary-400 text-sm leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          CTA — Full bleed closing section
      ══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-secondary-500 py-20 lg:py-24">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #fff 1px, transparent 1px), linear-gradient(-135deg, #fff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-secondary-400/40 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-secondary-700/40 blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <Reveal>
            <h2 className="text-4xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-6">
              Ready to Find Your
              <br />
              <span className="text-white/70">Dream Property?</span>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-white/80 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              Let us guide you to Nigeria's most prestigious addresses. Your
              luxury lifestyle begins with a single conversation.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/inquiry"
                className="px-8 py-4 bg-white text-secondary-600 font-black rounded-xl hover:bg-secondary-50 hover:shadow-2xl hover:shadow-black/20 hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
              >
                Start Your Journey
              </Link>
              <Link
                href="/listings"
                className="px-8 py-4 bg-transparent text-white font-bold rounded-xl border-2 border-white/40 hover:border-white hover:bg-white/10 transition-all duration-300"
              >
                Browse Listings
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
