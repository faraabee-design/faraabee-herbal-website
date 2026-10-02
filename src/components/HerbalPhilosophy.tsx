import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import apothecaryImg from '../assets/images/farabi_apothecary_craft_1790683645646.jpg';

interface HerbalPhilosophyProps {
  onLearnMoreClick: () => void;
}

export const HerbalPhilosophy: React.FC<HerbalPhilosophyProps> = ({
  onLearnMoreClick,
}) => {
  const principles = [
    'Traditional maceration in small, temperature-controlled batches',
    'Cold-pressed botanical seed and fruit carrier oils without mineral diluents',
    'Rigorous screening of raw botanical herbs for cleanliness and aroma',
    'Responsible formulations presented without exaggerated medical promises',
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-[#AFC7A5]/25 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Atmospheric Botanical Image */}
          <div className="lg:col-span-6 relative">
            {/* Organic curved shape background */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#E8F1DF] to-[#FAF9F3] rounded-[2rem] transform -rotate-1 pointer-events-none" />

            <div className="relative z-10 overflow-hidden rounded-2xl shadow-lg border border-[#AFC7A5]/40 group">
              <img
                src={apothecaryImg}
                alt="FARAABEE botanical apothecary workshop with mortar, pestle and dried herbal jars"
                className="w-full h-[400px] sm:h-[480px] object-cover transition-transform duration-700 group-hover:scale-102"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#183F32]/60 via-transparent to-transparent opacity-80" />

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="font-urdu text-base text-[#FAF9F3]/90">
                  علمِ نباتات اور خالص تیاری
                </span>
                <p className="text-xs uppercase tracking-wider text-[#AFC7A5] font-semibold mt-0.5">
                  The Herbalist’s Bench · Lahore
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#285844]">
              THE FARAABEE APPROACH
            </span>

            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#183F32] mt-2 mb-6 leading-tight">
              Tradition, Prepared with Care.
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#26312B]/85 leading-relaxed">
              <p>
                At FARAABEE, we believe traditional herbal knowledge possesses an enduring, quiet dignity. For centuries, households and apothecaries across South Asia, Persia, and the Mediterranean understood how gentle plant oils, root extracts, and floral essences support the body’s innate balance.
              </p>
              <p>
                Rather than treating these traditions as outdated relics or exaggerating them into miraculous panaceas, FARAABEE bridges the gap between historical heritage and contemporary standards. We honor classic cold-infusions while introducing modern hygienic handling, UV-protective glass packaging, and transparent ingredient declarations.
              </p>
            </div>

            {/* Principles checklist */}
            <div className="mt-6 space-y-2.5">
              {principles.map((text, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#26312B]">
                  <CheckCircle2 className="w-4 h-4 text-[#285844] shrink-0 mt-0.5" />
                  <span>{text}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-4">
              <button
                onClick={onLearnMoreClick}
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#183F32] hover:bg-[#285844] rounded-lg transition-colors shadow-xs cursor-pointer"
              >
                <span>Learn About FARAABEE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
