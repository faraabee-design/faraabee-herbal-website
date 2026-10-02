import React from 'react';
import { Compass, Beaker, PackageCheck, Sun } from 'lucide-react';

export const WhyFarabi: React.FC = () => {
  const pillars = [
    {
      icon: Compass,
      title: 'Traditional Inspiration',
      description:
        'Grounded in time-tested herbal formulations that have sustained generational wellness across centuries of Eastern apothecary practice.',
    },
    {
      icon: Beaker,
      title: 'Careful Preparation',
      description:
        'Slow, unhurried lipid maceration and temperature-gentle processing ensure full preservation of volatile botanical essences and actives.',
    },
    {
      icon: PackageCheck,
      title: 'Thoughtful Presentation',
      description:
        'Housed in pharmaceutical-grade amber and emerald UV-blocking glass to preserve potency naturally without synthetic preservatives.',
    },
    {
      icon: Sun,
      title: 'Everyday Wellness',
      description:
        'Formulated for effortless integration into daily self-care routines, bringing calm, physical balance, and sensory grounding to modern life.',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-[#AFC7A5]/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#285844]">
            OUR STANDARDS
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#183F32] mt-2">
            Why Choose FARAABEE
          </h2>
          <p className="text-sm sm:text-base text-[#26312B]/75 mt-3">
            Honest principles guiding every bottle, jar, and botanical preparation we produce.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-2xl bg-[#FAF9F3] border border-[#AFC7A5]/30 hover:border-[#183F32]/40 transition-all duration-300 flex flex-col items-start"
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-[#AFC7A5]/40 text-[#183F32] flex items-center justify-center mb-5 shadow-2xs">
                  <Icon className="w-5 h-5 stroke-[1.75]" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-[#183F32] mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#26312B]/75 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
