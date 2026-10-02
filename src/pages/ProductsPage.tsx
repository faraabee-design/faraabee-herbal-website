import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { Search, SlidersHorizontal, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface ProductsPageProps {
  products: Product[];
  onViewProduct: (slug: string) => void;
  onAddToCart: (product: Product, quantity?: number) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  products,
  onViewProduct,
  onAddToCart,
}) => {
  const { categories } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('All Products');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');

  // Dynamic category tabs derived from database
  const categoryTabs = useMemo(() => {
    const list = categories.filter((c) => c.active && c.slug !== 'all').map((c) => c.name);
    return ['All Products', ...list];
  }, [categories]);

  const activeProducts = useMemo(() => {
    return products.filter((p) => p.status === 'active');
  }, [products]);

  const filteredProducts = useMemo(() => {
    return activeProducts
      .filter((p) => {
        const matchesCategory =
          selectedCategory === 'All Products' || p.category === selectedCategory;
        const query = searchQuery.toLowerCase().trim();
        const matchesSearch =
          query === '' ||
          p.name.toLowerCase().includes(query) ||
          p.shortDescription.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query) ||
          (p.sku && p.sku.toLowerCase().includes(query)) ||
          p.category.toLowerCase().includes(query) ||
          (p.ingredients && p.ingredients.some((ing) => ing.toLowerCase().includes(query)));
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [activeProducts, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="bg-[#FAF9F3] min-h-screen">
      {/* Page Hero */}
      <section className="bg-gradient-to-b from-[#E8F1DF]/50 to-[#FAF9F3] py-14 sm:py-18 border-b border-[#AFC7A5]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-2 text-[#285844]">
            <Sparkles className="w-3.5 h-3.5 text-[#B79A5B]" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em]">
              THE BOTANICAL APOTHECARY
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-[#183F32]">
            Herbal Formulations
          </h1>

          <p className="mt-3 text-sm sm:text-base text-[#26312B]/75 max-w-xl mx-auto">
            Browse FARAABEE’s full catalog of handcrafted herbal oils, soothing balms, and natural preparations formulated for everyday vitality.
          </p>
        </div>
      </section>

      {/* Filter, Search & Sort Control Strip */}
      <section className="py-6 border-b border-[#AFC7A5]/25 bg-white sticky top-[68px] lg:top-[76px] z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Category Segmented Tabs (Dynamic from Firestore) */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              {categoryTabs.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#183F32] text-white shadow-2xs'
                      : 'text-[#26312B]/75 hover:text-[#183F32] hover:bg-[#FAF9F3]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search and Sort controls */}
            <div className="flex items-center gap-3">
              {/* Search input */}
              <div className="relative flex-1 sm:w-60">
                <Search className="w-4 h-4 text-[#285844] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search botanical blends..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#FAF9F3] border border-[#AFC7A5]/40 rounded-lg text-[#26312B] placeholder-[#26312B]/50 focus:outline-none focus:ring-1 focus:ring-[#183F32]"
                />
              </div>

              {/* Sort Selector */}
              <div className="relative shrink-0">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="text-xs bg-[#FAF9F3] border border-[#AFC7A5]/40 text-[#183F32] font-medium rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#183F32] cursor-pointer"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name">Alphabetical</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Results Grid */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Active Result Count */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#AFC7A5]/20 text-xs text-[#26312B]/70">
            <span>
              Showing <strong className="text-[#183F32]">{filteredProducts.length}</strong> herbal{' '}
              {filteredProducts.length === 1 ? 'preparation' : 'preparations'}
            </span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs font-semibold text-[#183F32] hover:underline cursor-pointer"
              >
                Clear Search
              </button>
            )}
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewProduct={onViewProduct}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-[#AFC7A5]/30 p-8 max-w-md mx-auto">
              <SlidersHorizontal className="w-10 h-10 text-[#AFC7A5] mx-auto mb-3" />
              <h3 className="font-serif text-lg font-semibold text-[#183F32]">
                No Formulations Found
              </h3>
              <p className="text-xs text-[#26312B]/70 mt-1">
                We couldn&apos;t find any preparations matching &quot;{searchQuery}&quot;. Try exploring a different category or clearing search terms.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All Products');
                  setSearchQuery('');
                }}
                className="mt-5 px-4 py-2 bg-[#183F32] text-white text-xs font-medium rounded-lg hover:bg-[#285844] transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
