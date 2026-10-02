import React from 'react';
import { Article } from '../types';
import { ArrowRight, BookOpen } from 'lucide-react';

interface JournalPreviewProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  onViewJournalClick: () => void;
}

export const JournalPreview: React.FC<JournalPreviewProps> = ({
  articles,
  onSelectArticle,
  onViewJournalClick,
}) => {
  return (
    <section className="py-16 sm:py-24 bg-[#FAF9F3] border-b border-[#AFC7A5]/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-4 border-b border-[#AFC7A5]/30">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#285844]">
              BOTANICAL PERSPECTIVES
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#183F32] mt-2">
              From the Herbal Journal
            </h2>
            <p className="text-sm sm:text-base text-[#26312B]/75 mt-2">
              Reflections on botanical heritage, mindful personal care, and traditional wellness rituals.
            </p>
          </div>

          <button
            onClick={onViewJournalClick}
            className="mt-4 sm:mt-0 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#183F32] hover:text-[#285844] hover:underline cursor-pointer self-start sm:self-auto"
          >
            <span>Read All Articles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.slice(0, 3).map((article) => (
            <article
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="bg-white rounded-2xl border border-[#AFC7A5]/35 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col group cursor-pointer"
            >
              <div className="relative aspect-16/10 w-full bg-[#E8F1DF] overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Clean unboxed metadata with dot separator */}
                  <div className="flex items-center gap-2 text-xs text-[#285844] font-medium mb-2.5">
                    <span>{article.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="font-serif text-xl font-semibold text-[#183F32] group-hover:text-[#285844] transition-colors leading-snug mb-3">
                    {article.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#26312B]/75 leading-relaxed line-clamp-3 mb-6">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#AFC7A5]/20 flex items-center justify-between text-xs font-semibold text-[#183F32]">
                  <span className="inline-flex items-center gap-1 group-hover:underline">
                    Read Article
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                  <BookOpen className="w-4 h-4 text-[#AFC7A5]" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
