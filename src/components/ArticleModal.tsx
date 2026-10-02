import React from 'react';
import { Article } from '../types';
import { X, Calendar, Clock, User, Bookmark, Share2 } from 'lucide-react';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose }) => {
  if (!article) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      alert('Article link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#183F32]/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden border border-[#AFC7A5]/40 my-8 max-h-[90vh] flex flex-col">
        {/* Sticky Header */}
        <div className="p-5 bg-[#FAF9F3] border-b border-[#AFC7A5]/30 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs text-[#285844] font-medium">
            <Bookmark className="w-3.5 h-3.5 text-[#B79A5B]" />
            <span className="uppercase tracking-wider">{article.category}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-1.5 text-[#26312B] hover:text-[#183F32] rounded-md transition-colors cursor-pointer"
              aria-label="Share article"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-[#26312B] hover:text-[#183F32] rounded-md transition-colors cursor-pointer"
              aria-label="Close article"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Article Body */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8">
          {/* Article Title */}
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-[#183F32] leading-tight mb-4">
              {article.title}
            </h1>

            {/* Metadata Bar */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#26312B]/75 pb-4 border-b border-[#AFC7A5]/25">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#285844]" />
                {article.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#285844]" />
                {article.publishedDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#285844]" />
                {article.readTime}
              </span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative aspect-16/9 w-full rounded-xl overflow-hidden border border-[#AFC7A5]/30">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Key Takeaways Box */}
          <div className="p-5 bg-[#E8F1DF]/60 rounded-xl border border-[#AFC7A5]/40">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-[#183F32] mb-3">
              Essential Insights
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#26312B]/85">
              {article.keyTakeaways.map((takeaway, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#285844] font-bold">·</span>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Prose Content */}
          <div className="space-y-4 text-sm sm:text-base text-[#26312B]/90 leading-relaxed font-normal">
            {article.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Disclaimer */}
          <div className="pt-6 border-t border-[#AFC7A5]/25 text-xs text-[#26312B]/60 italic">
            Note: This article is provided for educational botanical appreciation. It does not constitute medical advice or guarantee treatment of any health condition. Always consult qualified healthcare professionals for medical needs.
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#FAF9F3] border-t border-[#AFC7A5]/30 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold uppercase tracking-wider bg-[#183F32] text-white rounded-lg hover:bg-[#285844] transition-colors cursor-pointer"
          >
            Close Article
          </button>
        </div>
      </div>
    </div>
  );
};
