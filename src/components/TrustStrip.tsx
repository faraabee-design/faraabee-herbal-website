import React from 'react';
import { BookOpen, ShieldCheck, HeartHandshake, Sparkles } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const trustPoints = [
    {
      icon: BookOpen,
      title: 'Rooted in Herbal Tradition',
      subtitle: 'Inspired by centuries of Eastern botanical texts',
    },
    {
      icon: Sparkles,
      title: 'Thoughtfully Crafted',
      subtitle: 'Small-batch maceration with whole herbs',
    },
    {
      icon: ShieldCheck,
      title: 'Quality-Focused',
      subtitle: 'Pure cold-pressed oils & food-grade botanicals',
    },
    {
      icon: HeartHandshake,
      title: 'Everyday Wellness',
      subtitle: 'Designed for gentle, daily mindful care',
    },
  ];

  return (
    <section className="bg-white border-b border-[#AFC7A5]/25 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {trustPoints.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-4 p-3 rounded-xl transition-colors hover:bg-[#FAF9F3]"
              >
                <div className="w-10 h-10 rounded-lg bg-[#E8F1DF] text-[#183F32] flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 stroke-[1.75]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#183F32] leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#26312B]/70 mt-1 leading-normal">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
