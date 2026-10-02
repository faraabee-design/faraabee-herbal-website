import React from 'react';
import { useStore } from '../context/StoreContext';
import { Tag, ArrowRight, Sparkles } from 'lucide-react';

interface PromotionBannerProps {
  onViewProduct?: (slug: string) => void;
  onExploreProducts?: () => void;
}

export const PromotionBanner: React.FC<PromotionBannerProps> = ({
  onViewProduct,
  onExploreProducts,
}) => {
  const { activePromotion, products } = useStore();

  if (!activePromotion || !activePromotion.active) return null;

  const targetProduct = activePromotion.productId
    ? products.find((p) => p.id === activePromotion.productId)
    : null;

  const handleAction = () => {
    if (targetProduct && onViewProduct) {
      onViewProduct(targetProduct.slug);
    } else if (onExploreProducts) {
      onExploreProducts();
    }
  };

  return (
    <section className="bg-gradient-to-r from-[#183F32] via-[#235843] to-[#183F32] text-white py-8 sm:py-10 border-y border-[#AFC7A5]/30 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left Text Column */}
          <div className="flex-1 text-center md:text-left space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#AFC7A5]/25 text-[#FAF9F3] border border-[#AFC7A5]/30">
              <Sparkles className="w-3.5 h-3.5 text-[#AFC7A5]" />
              <span>{activePromotion.badge || 'Apothecary Highlight'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-white tracking-tight">
              {activePromotion.title}
            </h3>
            {activePromotion.subtitle && (
              <p className="text-xs sm:text-sm font-medium text-[#AFC7A5]">
                {activePromotion.subtitle}
              </p>
            )}
            <p className="text-xs sm:text-sm text-[#FAF9F3]/80 max-w-2xl leading-relaxed">
              {activePromotion.description}
            </p>
          </div>

          {/* Right Action Column */}
          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            {activePromotion.discountPrice && (
              <div className="text-center sm:text-right px-4 py-2 bg-black/20 backdrop-blur-xs rounded-xl border border-white/10">
                <span className="text-[10px] uppercase tracking-wider text-[#AFC7A5] block">
                  Promotional Privilege
                </span>
                <span className="text-lg sm:text-xl font-bold font-serif text-white">
                  Rs. {activePromotion.discountPrice.toLocaleString()}
                </span>
              </div>
            )}
            <button
              onClick={handleAction}
              className="px-6 py-3 bg-[#FAF9F3] hover:bg-white text-[#183F32] font-semibold text-xs uppercase tracking-wider rounded-xl shadow-md flex items-center gap-2 transition-all hover:scale-103 cursor-pointer"
            >
              <span>{targetProduct ? `View ${targetProduct.name}` : 'Explore Collection'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
