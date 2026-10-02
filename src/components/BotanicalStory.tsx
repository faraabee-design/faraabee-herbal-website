import React from 'react';
import olivesImg from '../assets/images/farabi_botanical_olives_1790683606379.jpg';
import clovesImg from '../assets/images/farabi_botanical_cloves_1790683626855.jpg';
import blackseedImg from '../assets/images/farabi_hair_elixir_bottle_1790683590806.jpg';

export const BotanicalStory: React.FC = () => {
  const botanicals = [
    {
      name: 'Olive Fruit',
      botanicalName: 'Olea Europaea',
      urdu: 'زیتون',
      image: olivesImg,
      description:
        'Celebrated across ancient Mediterranean and Eastern wellness traditions as a golden emollient. Rich in squalene and oleic acids, cold-pressed olive oil helps sustain the skin barrier and deeply conditions dry hair lengths.',
      traditionalRole: 'Traditionally valued in herbal massage and restorative skin balms for deep cellular nourishment.',
    },
    {
      name: 'Clove Bud',
      botanicalName: 'Syzygium Aromaticum',
      urdu: 'لونگ',
      image: clovesImg,
      description:
        'Harvested as unopened flower buds and sun-dried, cloves are revered for their warm, invigorating essence and high eugenol content. Their aromatic warmth provides a comforting sensation during seasonal damp and cold.',
      traditionalRole: 'Traditionally valued in warming chest rubs, muscle salves, and soothing botanical vapors.',
    },
    {
      name: 'Black Seed (Kalonji)',
      botanicalName: 'Nigella Sativa',
      urdu: 'کلونجی',
      image: blackseedImg,
      description:
        'One of the most venerated seeds in Eastern and Prophetic herbal traditions. Tiny matte black seeds yielding an intense, peppery oil abundant in thymoquinone and essential polyunsaturated fatty acids.',
      traditionalRole: 'Traditionally valued in scalp fortifying elixirs and balanced skin-soothing botanical oils.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FAF9F3] border-b border-[#AFC7A5]/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#285844]">
            REVERED HERBAL ALLIES
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#183F32] mt-2">
            The Botanical Archive
          </h2>
          <p className="text-sm sm:text-base text-[#26312B]/75 mt-3">
            We work with time-honored whole botanicals chosen for their enduring harmony with human wellness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {botanicals.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-[#AFC7A5]/35 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col group"
            >
              {/* Image container */}
              <div className="relative aspect-4/3 w-full bg-[#E8F1DF]/50 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs px-2.5 py-0.5 rounded-md font-urdu text-sm text-[#183F32]">
                  {item.urdu}
                </div>
              </div>

              {/* Text content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs italic text-[#285844] font-medium">
                    {item.botanicalName}
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-[#183F32] mt-1 mb-3">
                    {item.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#26312B]/80 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#AFC7A5]/25">
                  <p className="text-[11px] text-[#285844] font-medium leading-relaxed italic">
                    {item.traditionalRole}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
