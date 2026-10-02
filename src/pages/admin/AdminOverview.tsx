import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Package, Layers, Tag, ShoppingBag, TrendingUp, CheckCircle, AlertCircle, ArrowUpRight } from 'lucide-react';

interface AdminOverviewProps {
  onSwitchTab: (tab: 'products' | 'categories' | 'promotions' | 'orders' | 'settings') => void;
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({ onSwitchTab }) => {
  const { products, categories, promotions, orders } = useStore();

  const activeProducts = products.filter((p) => p.status === 'active').length;
  const featuredCount = products.filter((p) => p.featured && p.status === 'active').length;
  const outOfStockCount = products.filter((p) => !p.inStock).length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const pendingOrders = orders.filter((o) => o.status === 'pending').length;

  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Products */}
        <div
          onClick={() => onSwitchTab('products')}
          className="bg-white p-5 rounded-2xl border border-[#AFC7A5]/30 shadow-xs cursor-pointer hover:border-[#183F32]/40 transition-colors group"
        >
          <div className="flex items-center justify-between text-[#183F32]">
            <div className="p-2.5 bg-[#E3EBDD] rounded-xl group-hover:bg-[#183F32] group-hover:text-white transition-colors">
              <Package className="w-5 h-5" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#26312B]/40 group-hover:text-[#183F32]" />
          </div>
          <p className="mt-3 text-2xl font-serif font-bold text-[#183F32]">{products.length}</p>
          <p className="text-xs text-[#26312B]/70 font-medium">Total Formulations</p>
          <div className="mt-2 text-[10px] text-emerald-800 flex items-center gap-1 font-semibold">
            <CheckCircle className="w-3 h-3" />
            <span>{activeProducts} live on store</span>
          </div>
        </div>

        {/* Card 2: Categories */}
        <div
          onClick={() => onSwitchTab('categories')}
          className="bg-white p-5 rounded-2xl border border-[#AFC7A5]/30 shadow-xs cursor-pointer hover:border-[#183F32]/40 transition-colors group"
        >
          <div className="flex items-center justify-between text-[#183F32]">
            <div className="p-2.5 bg-[#E3EBDD] rounded-xl group-hover:bg-[#183F32] group-hover:text-white transition-colors">
              <Layers className="w-5 h-5" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#26312B]/40 group-hover:text-[#183F32]" />
          </div>
          <p className="mt-3 text-2xl font-serif font-bold text-[#183F32]">{categories.length}</p>
          <p className="text-xs text-[#26312B]/70 font-medium">Product Categories</p>
          <div className="mt-2 text-[10px] text-[#26312B]/60">
            <span>Dynamic filter groups</span>
          </div>
        </div>

        {/* Card 3: Orders */}
        <div
          onClick={() => onSwitchTab('orders')}
          className="bg-white p-5 rounded-2xl border border-[#AFC7A5]/30 shadow-xs cursor-pointer hover:border-[#183F32]/40 transition-colors group"
        >
          <div className="flex items-center justify-between text-[#183F32]">
            <div className="p-2.5 bg-[#E3EBDD] rounded-xl group-hover:bg-[#183F32] group-hover:text-white transition-colors">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#26312B]/40 group-hover:text-[#183F32]" />
          </div>
          <p className="mt-3 text-2xl font-serif font-bold text-[#183F32]">{orders.length}</p>
          <p className="text-xs text-[#26312B]/70 font-medium">Customer Orders</p>
          <div className="mt-2 text-[10px] text-amber-800 font-semibold">
            {pendingOrders} awaiting fulfillment
          </div>
        </div>

        {/* Card 4: Revenue */}
        <div className="bg-white p-5 rounded-2xl border border-[#AFC7A5]/30 shadow-xs">
          <div className="flex items-center justify-between text-[#183F32]">
            <div className="p-2.5 bg-[#E3EBDD] rounded-xl">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-800">
              COD Sales
            </span>
          </div>
          <p className="mt-3 text-2xl font-serif font-bold text-[#183F32]">
            Rs. {totalRevenue.toLocaleString()}
          </p>
          <p className="text-xs text-[#26312B]/70 font-medium">Gross Orders Value</p>
          <div className="mt-2 text-[10px] text-[#26312B]/60">
            {orders.length} total transactions
          </div>
        </div>
      </div>

      {/* Alert Banners / Quick Notices */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {outOfStockCount > 0 ? (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-amber-700 shrink-0" />
              <div>
                <p className="text-xs font-bold text-amber-900">Inventory Alert</p>
                <p className="text-xs text-amber-800">
                  {outOfStockCount} formulation{outOfStockCount > 1 ? 's' : ''} currently marked out of stock.
                </p>
              </div>
            </div>
            <button
              onClick={() => onSwitchTab('products')}
              className="text-xs font-bold text-amber-900 underline hover:opacity-80 cursor-pointer"
            >
              Update Stock
            </button>
          </div>
        ) : (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-700 shrink-0" />
            <div className="text-xs text-emerald-900">
              <p className="font-bold">Catalog In Stock</p>
              <p className="text-emerald-800">All published botanical formulas are currently available.</p>
            </div>
          </div>
        )}

        <div className="p-4 bg-[#FAF9F3] border border-[#AFC7A5]/30 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Tag className="w-5 h-5 text-[#183F32] shrink-0" />
            <div>
              <p className="text-xs font-bold text-[#183F32]">Featured Botanical Highlights</p>
              <p className="text-xs text-[#26312B]/70">
                {featuredCount} products featured on the homepage. {promotions.length} promotion banner{promotions.length !== 1 ? 's' : ''} active.
              </p>
            </div>
          </div>
          <button
            onClick={() => onSwitchTab('promotions')}
            className="text-xs font-bold text-[#183F32] underline hover:opacity-80 cursor-pointer"
          >
            Promotions
          </button>
        </div>
      </div>

      {/* Recent Formulations List */}
      <div className="bg-white p-6 rounded-2xl border border-[#AFC7A5]/30 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif font-bold text-base text-[#183F32]">
            Latest Store Formulations
          </h3>
          <button
            onClick={() => onSwitchTab('products')}
            className="text-xs font-bold text-[#183F32] hover:underline cursor-pointer"
          >
            View All Products →
          </button>
        </div>

        <div className="divide-y divide-[#AFC7A5]/20">
          {products.slice(0, 5).map((p) => (
            <div key={p.id} className="py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-10 h-10 rounded-xl object-cover border border-[#AFC7A5]/30 bg-[#FAF9F3]"
                />
                <div>
                  <p className="text-xs font-bold text-[#183F32]">{p.name}</p>
                  <p className="text-[11px] text-[#26312B]/60">
                    {p.category} • {p.currency} {p.price.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    p.status === 'active'
                      ? 'bg-[#E3EBDD] text-[#183F32]'
                      : 'bg-stone-100 text-stone-600'
                  }`}
                >
                  {p.status}
                </span>
                <span className="text-xs font-semibold text-[#183F32]">
                  {p.inStock ? `${p.stockQuantity ?? 50} in stock` : 'Out of stock'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
