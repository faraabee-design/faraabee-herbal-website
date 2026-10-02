import React, { useState, useMemo } from 'react';
import { Article } from '../types';
import { Search, BookOpen, Clock, Calendar, ArrowRight } from 'lucide-react';

interface JournalPageProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const JournalPage: React.FC<JournalPageProps> = ({
  articles,
  onSelectArticle,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Botanical Wisdom', 'Herbal Heritage', 'Daily Living'];

  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      const matchesCat = selectedCategory === 'All' || art.category === selectedCategory;
      const matchesSearch =
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [articles, selectedCategory, searchQuery]);

  const featuredArticle = articles[0];

  return (
    <div className="bg-[#FAF9F3] min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#285844]">
            FARAABEE BOTANICAL DESK
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-[#183F32] mt-2">
            The Herbal Journal
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#26312B]/75 leading-relaxed">
            Thoughtful essays on botanical heritage, classical maceration practices, and mindful rituals for modern life.
          </p>
        </div>

        {/* Featured Editorial Banner (Hero Article) */}
        {featuredArticle && selectedCategory === 'All' && !searchQuery && (
          <div
            onClick={() => onSelectArticle(featuredArticle)}
            className="mb-16 bg-white rounded-3xl overflow-hidden border border-[#AFC7A5]/35 shadow-sm hover:shadow-md transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 cursor-pointer group"
          >
            <div className="lg:col-span-7 relative aspect-16/10 lg:aspect-auto overflow-hidden bg-[#E8F1DF]">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-wider text-[#183F32]">
                Featured Essay
              </div>
            </div>

            <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs text-[#285844] font-medium mb-3">
                  <span>{featuredArticle.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{featuredArticle.readTime}</span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#183F32] group-hover:text-[#285844] transition-colors leading-snug mb-4">
                  {featuredArticle.title}
                </h2>

                <p className="text-xs sm:text-sm text-[#26312B]/80 leading-relaxed line-clamp-4 mb-6">
                  {featuredArticle.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-[#AFC7A5]/25 flex items-center justify-between">
                <span className="text-xs text-[#26312B]/60">{featuredArticle.publishedDate}</span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#183F32] group-hover:underline">
                  Read Full Article
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Filter and Search Controls */}
        <div className="mb-10 flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-[#AFC7A5]/30">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#183F32] text-white'
                    : 'bg-white text-[#26312B]/80 hover:bg-[#FAF9F3] border border-[#AFC7A5]/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-[#285844] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search journal..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-1.5 text-xs bg-white border border-[#AFC7A5]/50 rounded-lg focus:outline-none focus:border-[#183F32] text-[#26312B]"
            />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
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

                <div className="pt-4 border-t border-[#AFC7A5]/20 flex items-center justify-between text-xs text-[#26312B]/70">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#285844]" />
                    {article.publishedDate}
                  </span>
                  <span className="font-semibold text-[#183F32] group-hover:underline flex items-center gap-1">
                    Read Article
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
