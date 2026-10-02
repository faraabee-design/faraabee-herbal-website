import React from 'react';
import { ArrowRight, Leaf, Sparkles } from 'lucide-react';
import heroImg from '../assets/images/farabi_hero_composition_1790683539660.jpg';

interface HeroProps {
  onExploreClick: () => void;
  onAboutClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onAboutClick }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF9F3] via-[#FAF9F3] to-[#E8F1DF]/40 pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-[#AFC7A5]/25">
      {/* Decorative organic background curves (behind content) */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#E8F1DF]/70 blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 rounded-full bg-[#AFC7A5]/20 blur-3xl pointer-events-none" />

      {/* Subtle organic leaf silhouette outline */}
      <svg
        className="absolute top-8 left-6 w-32 h-32 text-[#AFC7A5]/20 pointer-events-none hidden lg:block"
        viewBox="0 0 100 100"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M50 0 C60 30 90 40 100 50 C70 60 60 90 50 100 C40 70 10 60 0 50 C30 40 40 10 50 0 Z" />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[540px]">
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-7 flex flex-col justify-center max-w-2xl">
            {/* Eyebrow - Clean unboxed text with leaf icon */}
            <div className="flex items-center gap-2 mb-4 text-[#285844]">
              <Leaf className="w-4 h-4 text-[#285844]" />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase">
                ROOTED IN TRADITION
              </span>
              <span className="text-xs text-[#AFC7A5]" aria-hidden="true">·</span>
              <span className="font-urdu text-sm text-[#183F32]">روایت و حکمت</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium text-[#183F32] leading-[1.12] tracking-tight mb-6">
              Natural Wisdom.
              <br />
              <span className="italic font-normal text-[#285844]">
                Modern Herbal Care.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-[#26312B]/85 font-normal leading-relaxed mb-8 max-w-xl">
              Discover thoughtfully prepared herbal products inspired by traditional knowledge and crafted for everyday wellness. Pure botanicals, careful macerations, and honest care.
            </p>

            {/* CTA Group */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
              <button
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold tracking-wide uppercase text-white bg-[#183F32] hover:bg-[#285844] rounded-lg shadow-sm hover:shadow transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#183F32]"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onAboutClick}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold tracking-wide uppercase text-[#183F32] bg-white hover:bg-[#FAF9F3] border border-[#AFC7A5] hover:border-[#183F32] rounded-lg transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#183F32]"
              >
                <span>Discover FARAABEE</span>
              </button>
            </div>

            {/* Trust highlights bar */}
            <div className="mt-10 pt-6 border-t border-[#AFC7A5]/30 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#26312B]/75 font-medium">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#183F32]" />
                <span>Small Batch Maceration</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B79A5B]" />
                <span>Zero Synthetic Fragrances</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#285844]" />
                <span>100% Botanical Goodness</span>
              </div>
            </div>
          </div>

          {/* Right Column: Original Product Composition */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Organic backdrop shape behind the product scene */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#E8F1DF] to-[#FAF9F3] rounded-[2.5rem] transform rotate-1 scale-102 border border-[#AFC7A5]/40 shadow-xs" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full bg-[#AFC7A5]/25 blur-xl pointer-events-none" />

            {/* Product image container */}
            <div className="relative z-10 w-full overflow-hidden rounded-3xl bg-white shadow-md border border-[#AFC7A5]/30 p-2 sm:p-3 group">
              <img
                src={heroImg}
                alt="FARAABEE botanical herbal wellness collection with amber oil bottle and herbal balm jar"
                className="w-full h-auto object-cover rounded-2xl transition-transform duration-700 group-hover:scale-[1.02]"
                loading="eager"
                referrerPolicy="no-referrer"
              />

              {/* Discreet editorial label */}
              <div className="absolute bottom-5 left-5 right-5 bg-white/90 backdrop-blur-md py-2.5 px-4 rounded-xl border border-[#AFC7A5]/40 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#B79A5B]" />
                  <span className="font-medium text-[#183F32]">Artisanal Botanical Series</span>
                </div>
                <span className="text-[#285844] font-urdu text-xs">خالص قدرتی اجزاء</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
