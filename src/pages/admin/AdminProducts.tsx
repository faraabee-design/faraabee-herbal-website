import React, { useState, useMemo } from 'react';
import { Product, Category } from '../../types';
import { useStore } from '../../context/StoreContext';
import { ProductFormModal } from './ProductFormModal';
import { ConfirmDialog } from './ConfirmDialog';
import {
  Plus,
  Search,
  Filter,
  Copy,
  Edit2,
  Trash2,
  Star,
  CheckCircle2,
  XCircle,
  Eye,
} from 'lucide-react';

interface AdminProductsProps {
  onNotify: (msg: string) => void;
  onPreviewProduct?: (slug: string) => void;
}

export const AdminProducts: React.FC<AdminProductsProps> = ({ onNotify, onPreviewProduct }) => {
  const {
    products,
    categories,
    addProduct,
    updateProduct,
    deleteProduct,
    duplicateProduct,
    toggleProductFeatured,
    toggleProductStatus,
  } = useStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Confirm delete dialog
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        searchTerm === '' ||
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.sku && p.sku.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchCategory =
        selectedCategory === 'all' || p.category === selectedCategory;

      const matchStatus =
        selectedStatus === 'all' || p.status === selectedStatus;

      return matchSearch && matchCategory && matchStatus;
    });
  }, [products, searchTerm, selectedCategory, selectedStatus]);

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setIsFormOpen(true);
  };

  const handleSaveProduct = async (productData: Partial<Product>) => {
    if (editingProduct) {
      await updateProduct(editingProduct.id, productData);
      onNotify('Product updated successfully');
    } else {
      await addProduct(productData);
      onNotify('Product added successfully');
    }
  };

  const handleDuplicate = async (p: Product) => {
    try {
      await duplicateProduct(p.id);
      onNotify(`Duplicated ${p.name} as Draft`);
    } catch {
      onNotify('Failed to duplicate product');
    }
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;
    try {
      await deleteProduct(productToDelete.id);
      onNotify('Product deleted successfully');
    } catch {
      onNotify('Failed to delete product');
    } finally {
      setProductToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl shadow-xs border border-[#AFC7A5]/30">
        <div>
          <h2 className="text-xl font-serif font-bold text-[#183F32]">
            Herbal Products & Formulations
          </h2>
          <p className="text-xs text-[#26312B]/70 mt-0.5">
            Manage pricing, inventory, images, and live store catalog visibility.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#183F32] hover:bg-[#122F25] text-white text-sm font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Search & Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white p-4 rounded-2xl border border-[#AFC7A5]/30 shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#26312B]/40" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, SKU, or keywords..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-[#AFC7A5]/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#183F32] bg-[#FAF9F3]/30"
          />
        </div>

        <div className="relative">
          <Filter className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#26312B]/40" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-[#AFC7A5]/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#183F32] bg-white cursor-pointer"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.id || c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-3 py-2 text-xs border border-[#AFC7A5]/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#183F32] bg-white cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active (Visible)</option>
            <option value="draft">Draft (Hidden)</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-[#AFC7A5]/30 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#AFC7A5]/25 bg-[#FAF9F3] text-[11px] font-bold uppercase tracking-wider text-[#183F32]">
                <th className="py-3.5 px-4">Product</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">Stock</th>
                <th className="py-3.5 px-4 text-center">Featured</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#AFC7A5]/15 text-xs text-[#26312B]">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#26312B]/60">
                    No products found matching your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => {
                  const isDiscounted = p.salePrice && p.salePrice < p.price;
                  return (
                    <tr key={p.id} className="hover:bg-[#FAF9F3]/60 transition-colors">
                      {/* Column 1: Image & Name */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-12 h-12 rounded-xl object-cover border border-[#AFC7A5]/30 shrink-0 bg-[#FAF9F3]"
                          />
                          <div>
                            <div className="font-semibold text-[#183F32] flex items-center gap-1.5">
                              <span>{p.name}</span>
                              {p.urduName && (
                                <span className="text-[10px] text-[#26312B]/50 font-serif" dir="rtl">
                                  {p.urduName}
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] text-[#26312B]/50 flex items-center gap-2 mt-0.5">
                              {p.sku && <span>SKU: {p.sku}</span>}
                              {p.volume && <span>• {p.volume}</span>}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Column 2: Category */}
                      <td className="py-3 px-4 font-medium text-[#26312B]/80">
                        {p.category}
                      </td>

                      {/* Column 3: Price */}
                      <td className="py-3 px-4 font-medium">
                        {isDiscounted ? (
                          <div>
                            <span className="font-bold text-[#183F32]">
                              {p.currency} {p.salePrice?.toLocaleString()}
                            </span>
                            <span className="block text-[10px] text-[#26312B]/40 line-through">
                              {p.currency} {p.price.toLocaleString()}
                            </span>
                          </div>
                        ) : (
                          <span className="font-bold text-[#183F32]">
                            {p.currency} {p.price.toLocaleString()}
                          </span>
                        )}
                      </td>

                      {/* Column 4: Stock */}
                      <td className="py-3 px-4">
                        {p.inStock ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>In Stock ({p.stockQuantity ?? 50})</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-red-50 text-red-800 border border-red-200">
                            <XCircle className="w-3 h-3 text-red-600" />
                            <span>Out of Stock</span>
                          </span>
                        )}
                      </td>

                      {/* Column 5: Featured Toggle */}
                      <td className="py-3 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => toggleProductFeatured(p.id, p.featured)}
                          title={p.featured ? 'Featured on Homepage (Click to disable)' : 'Not Featured (Click to enable)'}
                          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                            p.featured
                              ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                              : 'text-[#26312B]/30 hover:bg-[#FAF9F3] hover:text-amber-600'
                          }`}
                        >
                          <Star className={`w-4 h-4 ${p.featured ? 'fill-amber-500' : ''}`} />
                        </button>
                      </td>

                      {/* Column 6: Status Toggle */}
                      <td className="py-3 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => toggleProductStatus(p.id, p.status)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                            p.status === 'active'
                              ? 'bg-[#E3EBDD] text-[#183F32] hover:bg-[#AFC7A5]/50'
                              : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                          }`}
                        >
                          {p.status}
                        </button>
                      </td>

                      {/* Column 7: Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {onPreviewProduct && (
                            <button
                              type="button"
                              onClick={() => onPreviewProduct(p.slug)}
                              title="View on store"
                              className="p-1.5 text-[#26312B]/60 hover:text-[#183F32] hover:bg-[#E3EBDD]/40 rounded-lg transition-colors cursor-pointer"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleDuplicate(p)}
                            title="Duplicate product"
                            className="p-1.5 text-[#26312B]/60 hover:text-[#183F32] hover:bg-[#E3EBDD]/40 rounded-lg transition-colors cursor-pointer"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(p)}
                            title="Edit product"
                            className="p-1.5 text-[#26312B]/60 hover:text-[#183F32] hover:bg-[#E3EBDD]/40 rounded-lg transition-colors cursor-pointer"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setProductToDelete(p)}
                            title="Delete product"
                            className="p-1.5 text-[#26312B]/60 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Form Modal */}
      {isFormOpen && (
        <ProductFormModal
          isOpen={isFormOpen}
          product={editingProduct}
          categories={categories}
          onClose={() => setIsFormOpen(false)}
          onSave={handleSaveProduct}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!productToDelete}
        title="Delete Product"
        message={`Are you sure you want to delete "${productToDelete?.name}"? This action cannot be undone and will immediately remove this product from the live store.`}
        confirmLabel="Delete Permanently"
        isDestructive={true}
        onConfirm={handleConfirmDelete}
        onCancel={() => setProductToDelete(null)}
      />
    </div>
  );
};
