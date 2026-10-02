import React from 'react';
import { BookOpen, Leaf, Sparkles, AlertCircle, Droplets, Sun, Beaker, CheckCircle } from 'lucide-react';
import apothecaryImg from '../assets/images/farabi_apothecary_craft_1790683645646.jpg';
import olivesImg from '../assets/images/farabi_botanical_olives_1790683606379.jpg';

interface AboutHerbalPageProps {
  onExploreProducts: () => void;
  onContactClick: () => void;
}

export const AboutHerbalPage: React.FC<AboutHerbalPageProps> = ({
  onExploreProducts,
  onContactClick,
}) => {
  return (
    <div className="bg-[#FAF9F3] min-h-screen py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-2 text-[#285844]">
            <BookOpen className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em]">
              THE BOTANICAL CODEX
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-[#183F32]">
            About Herbal Wisdom
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#26312B]/75 leading-relaxed">
            Understanding the heritage, gentle chemistry, and thoughtful methods behind classical botanical preparations.
          </p>
        </div>

        {/* Introduction Section */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-[#AFC7A5]/35 shadow-xs space-y-6">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#183F32] leading-snug">
            Why Herbal Wellness Has Endured
          </h2>
          <p className="text-sm sm:text-base text-[#26312B]/85 leading-relaxed">
            Long before industrial chemistry produced isolated synthetic compounds, humanity relied on living plant structures. In the herbal traditions of South Asia, the Levant, and Persia, plants were recognized as sophisticated biological entities. A seed, root, or leaf does not possess just a single chemical; it contains complex combinations of polyphenols, essential fatty acids, volatile aromatic compounds, and gentle tannins that act in concert.
          </p>
          <p className="text-sm sm:text-base text-[#26312B]/85 leading-relaxed">
            At FARAABEE, our dedication is to preserve these whole botanical matrices. We reject harsh synthetic solvents, petrochemical mineral oils, and artificial scent stabilizers in favor of unhurried, clean craftsmanship.
          </p>
        </section>

        {/* 3 Traditional Preparation Methods */}
        <section className="space-y-6">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#285844]">
              OUR CRAFT METHODS
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#183F32] mt-1">
              How FARAABEE Botanicals Are Prepared
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-[#AFC7A5]/30 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#E8F1DF] text-[#183F32] flex items-center justify-center">
                <Droplets className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#183F32]">
                1. Cold Lipid Maceration
              </h3>
              <p className="text-xs sm:text-sm text-[#26312B]/75 leading-relaxed">
                Whole botanicals are submerged in cold-pressed sweet almond or olive fruit oil over extended cycles under gentle warmth. The lipophilic actives gently permeate the carrier oil without heat degradation.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#AFC7A5]/30 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#E8F1DF] text-[#183F32] flex items-center justify-center">
                <Sun className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#183F32]">
                2. Solarization & Settling
              </h3>
              <p className="text-xs sm:text-sm text-[#26312B]/75 leading-relaxed">
                Following classical Unani protocols, herbal infusions are allowed to rest in glass carboys to allow micro-sediment to precipitate naturally, yielding pristine, radiant oils without chemical filtering.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#AFC7A5]/30 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#E8F1DF] text-[#183F32] flex items-center justify-center">
                <Beaker className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#183F32]">
                3. Pure Beeswax Emollience
              </h3>
              <p className="text-xs sm:text-sm text-[#26312B]/75 leading-relaxed">
                Our soothing balms are thickened exclusively with raw, unbleached cera alba (natural beeswax) instead of paraffin or microcrystalline petroleum waxes, providing a breathable protective barrier.
              </p>
            </div>
          </div>
        </section>

        {/* Responsible Herbalism & Safety Guidelines */}
        <section className="bg-[#FAF9F3] border border-[#AFC7A5]/40 rounded-3xl p-8 sm:p-10 space-y-6">
          <div className="flex items-center gap-3 text-[#183F32]">
            <AlertCircle className="w-6 h-6 text-[#285844] shrink-0" />
            <h2 className="font-serif text-2xl font-medium">
              FARAABEE Responsible Wellness Guidelines
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#26312B]/85 leading-relaxed">
            True respect for herbal wisdom includes honest responsibility. Plants are biologically active substances. We encourage our patrons to approach herbal care with discernment:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-[#26312B]/85">
            <div className="p-4 bg-white rounded-xl border border-[#AFC7A5]/30 flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-[#285844] shrink-0 mt-0.5" />
              <span>
                <strong>Conduct a Patch Test:</strong> Always apply a single drop of botanical oil or small dab of balm on inner forearm for 24 hours prior to regular use.
              </span>
            </div>

            <div className="p-4 bg-white rounded-xl border border-[#AFC7A5]/30 flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-[#285844] shrink-0 mt-0.5" />
              <span>
                <strong>Consistency Over Volume:</strong> A few mindful drops applied steadily over weeks yield far greater harmony than sporadic excessive application.
              </span>
            </div>

            <div className="p-4 bg-white rounded-xl border border-[#AFC7A5]/30 flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-[#285844] shrink-0 mt-0.5" />
              <span>
                <strong>Complementary Role:</strong> Herbal oils and balms nurture daily comfort, skin moisture, and sensory calm. They are not intended as substitutes for professional clinical treatment.
              </span>
            </div>

            <div className="p-4 bg-white rounded-xl border border-[#AFC7A5]/30 flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-[#285844] shrink-0 mt-0.5" />
              <span>
                <strong>Proper Storage:</strong> Shield oils from direct heat and sunlight. Store tightly capped in their UV-protective glass vessels.
              </span>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <div className="text-center pt-6">
          <button
            onClick={onExploreProducts}
            className="px-8 py-3.5 bg-[#183F32] hover:bg-[#285844] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer shadow-xs"
          >
            Explore The Herbal Collection
          </button>
        </div>
      </div>
    </div>
  );
};
