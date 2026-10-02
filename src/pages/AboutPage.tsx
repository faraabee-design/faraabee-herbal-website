import React from 'react';
import { ArrowRight, Leaf, Shield, Heart, Eye } from 'lucide-react';
import apothecaryImg from '../assets/images/farabi_apothecary_craft_1790683645646.jpg';
import olivesImg from '../assets/images/farabi_botanical_olives_1790683606379.jpg';
import { FarabiLogo } from '../components/FarabiLogo';

interface AboutPageProps {
  onExploreProducts: () => void;
  onContactClick: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onExploreProducts,
  onContactClick,
}) => {
  return (
    <div className="bg-[#FAF9F3] min-h-screen">
      {/* Editorial Page Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#E8F1DF]/50 to-[#FAF9F3] py-16 sm:py-24 border-b border-[#AFC7A5]/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-3 text-[#285844]">
            <Leaf className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em]">
              THE FARAABEE HERITAGE
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-[#183F32] tracking-tight leading-tight">
            Rooted in Knowledge.
            <br />
            <span className="italic font-normal text-[#285844]">
              Created for Modern Wellness.
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-[#26312B]/85 max-w-2xl mx-auto leading-relaxed">
            FARAABEE is an original herbal wellness house dedicated to reinterpreting classical botanical formulations through contemporary design, honest communication, and pristine craftsmanship.
          </p>

          <div className="mt-8">
            <FarabiLogo size="lg" />
          </div>
        </div>
      </section>

      {/* Brand Narrative Section */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#AFC7A5]/25">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-5 text-sm sm:text-base text-[#26312B]/85 leading-relaxed">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#285844]">
                OUR ORIGINS & ESSENCE
              </span>

              <h2 className="text-3xl font-serif font-medium text-[#183F32] leading-snug">
                Where Ancient Herbalism Meets Contemporary Restraint
              </h2>

              <p>
                The name <strong className="text-[#183F32]">FARAABEE (فارابی)</strong> draws inspiration from the polymathic spirit of classical scholars and naturalists who viewed nature as an interconnected tapestry of healing, beauty, and equilibrium.
              </p>

              <p>
                In an era dominated by hyper-processed synthetic personal care and overhyped promises, FARAABEE offers a grounded alternative. We believe that real wellness begins with simplicity: pure cold-pressed seed oils, slow sun-macerations, and respectful stewardship of medicinal flora.
              </p>

              <p>
                Every product we formulate is conceptualized in Pakistan with the intention of serving both our regional heritage and an appreciative international audience seeking transparent botanical remedies.
              </p>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="rounded-2xl overflow-hidden border border-[#AFC7A5]/40 shadow-md">
                <img
                  src={apothecaryImg}
                  alt="Apothecary workshop and botanical preparations"
                  className="w-full h-[400px] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Guiding Pillars */}
      <section className="py-16 sm:py-20 bg-[#FAF9F3] border-b border-[#AFC7A5]/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#285844]">
              HOW WE OPERATE
            </span>
            <h2 className="text-3xl font-serif font-medium text-[#183F32] mt-2">
              The Four Principles of FARAABEE
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-[#AFC7A5]/30">
              <Leaf className="w-6 h-6 text-[#183F32] mb-4" />
              <h3 className="font-serif text-lg font-semibold text-[#183F32] mb-2">
                Pure Plant Integrity
              </h3>
              <p className="text-xs text-[#26312B]/75 leading-relaxed">
                We refuse petroleum derivatives, synthetic foaming agents, artificial fragrances, and unnecessary fillers. What you smell is the authentic soul of the botanicals.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#AFC7A5]/30">
              <Shield className="w-6 h-6 text-[#183F32] mb-4" />
              <h3 className="font-serif text-lg font-semibold text-[#183F32] mb-2">
                Unrushed Maceration
              </h3>
              <p className="text-xs text-[#26312B]/75 leading-relaxed">
                Botanicals cannot be rushed. Our herbal oils undergo low-temperature infusion cycles to ensure lipophilic nutrients gently dissolve into carrier oils.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#AFC7A5]/30">
              <Heart className="w-6 h-6 text-[#183F32] mb-4" />
              <h3 className="font-serif text-lg font-semibold text-[#183F32] mb-2">
                Responsible Wellness
              </h3>
              <p className="text-xs text-[#26312B]/75 leading-relaxed">
                We do not claim miracles or instant cures. We position our herbal offerings as supportive allies for everyday wellness, traditional comfort, and mindful hygiene.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#AFC7A5]/30">
              <Eye className="w-6 h-6 text-[#183F32] mb-4" />
              <h3 className="font-serif text-lg font-semibold text-[#183F32] mb-2">
                Future Vision
              </h3>
              <p className="text-xs text-[#26312B]/75 leading-relaxed">
                Our architecture will expand to encompass artisanal attar, pure floral distillates, mineral gemstone traditions, and enriching cultural journals for the whole family.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Atmospheric Visual Callout */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#AFC7A5]/25">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-[#183F32] text-white p-8 sm:p-12 lg:p-16 flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2 space-y-4">
              <span className="text-xs uppercase tracking-widest text-[#AFC7A5] font-semibold">
                CRAFTSMANSHIP & CARE
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-medium leading-snug">
                "We treat herbs not as raw industrial commodities, but as living expressions of the earth."
              </h3>
              <p className="text-xs sm:text-sm text-[#FAF9F3]/80 leading-relaxed">
                Packaged in protective amber and emerald apothecary glass, keeping delicate oils potent without synthetic chemical stabilizers.
              </p>
              <div className="pt-2">
                <button
                  onClick={onExploreProducts}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#AFC7A5] hover:bg-white text-[#183F32] text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                >
                  <span>Explore The Catalog</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="md:w-1/2 relative">
              <img
                src={olivesImg}
                alt="Fresh botanical harvest"
                className="rounded-2xl object-cover h-64 sm:h-80 w-full shadow-lg border border-white/20"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
