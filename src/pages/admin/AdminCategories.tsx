import React, { useState } from 'react';
import { Category } from '../../types';
import { useStore } from '../../context/StoreContext';
import { ConfirmDialog } from './ConfirmDialog';
import { Plus, Edit2, Trash2, Check, X, Layers } from 'lucide-react';

interface AdminCategoriesProps {
  onNotify: (msg: string) => void;
}

export const AdminCategories: React.FC<AdminCategoriesProps> = ({ onNotify }) => {
  const { categories, addCategory, updateCategory, deleteCategory } = useStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [displayOrder, setDisplayOrder] = useState<string>('1');
  const [active, setActive] = useState(true);

  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setName('');
    setSlug('');
    setDescription('');
    setDisplayOrder(String(categories.length + 1));
    setActive(true);
    setError(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (c: Category) => {
    setEditingCategory(c);
    setName(c.name);
    setSlug(c.slug);
    setDescription(c.description || '');
    setDisplayOrder(String(c.displayOrder));
    setActive(c.active);
    setError(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Category name is required.');
      return;
    }
    const computedSlug = slug.trim() || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, {
          name: name.trim(),
          slug: computedSlug,
          description: description.trim() || undefined,
          displayOrder: Number(displayOrder) || 1,
          active,
        });
        onNotify('Category updated successfully');
      } else {
        await addCategory({
          name: name.trim(),
          slug: computedSlug,
          description: description.trim() || undefined,
          displayOrder: Number(displayOrder) || 1,
          active,
        });
        onNotify('Category created successfully');
      }
      setIsModalOpen(false);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to save category');
    }
  };

  const handleConfirmDelete = async () => {
    if (!categoryToDelete) return;
    try {
      await deleteCategory(categoryToDelete.id);
      onNotify('Category deleted successfully');
    } catch {
      onNotify('Failed to delete category');
    } finally {
      setCategoryToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl shadow-xs border border-[#AFC7A5]/30">
        <div>
          <h2 className="text-xl font-serif font-bold text-[#183F32]">Product Categories</h2>
          <p className="text-xs text-[#26312B]/70 mt-0.5">
            Organize formulations into customer-facing botanical categories.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#183F32] hover:bg-[#122F25] text-white text-sm font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Category</span>
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id || cat.slug}
            className="bg-white p-5 rounded-2xl border border-[#AFC7A5]/30 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-[#E3EBDD] text-[#183F32] rounded-xl">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-[#183F32]">{cat.name}</h3>
                    <p className="text-[11px] text-[#26312B]/50 font-mono">slug: {cat.slug}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => updateCategory(cat.id, { active: !cat.active })}
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase cursor-pointer ${
                    cat.active
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-stone-100 text-stone-600 border border-stone-200'
                  }`}
                >
                  {cat.active ? 'Active' : 'Disabled'}
                </button>
              </div>

              {cat.description && (
                <p className="mt-3 text-xs text-[#26312B]/80 leading-relaxed">
                  {cat.description}
                </p>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-[#AFC7A5]/20 flex items-center justify-between text-xs text-[#26312B]/60">
              <span>Order #{cat.displayOrder}</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleOpenEdit(cat)}
                  className="p-1.5 text-[#26312B]/70 hover:text-[#183F32] hover:bg-[#E3EBDD]/40 rounded-lg transition-colors cursor-pointer"
                  title="Edit Category"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCategoryToDelete(cat)}
                  className="p-1.5 text-[#26312B]/70 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                  title="Delete Category"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#AFC7A5]/40">
            <div className="flex items-center justify-between pb-3 border-b border-[#AFC7A5]/20">
              <h3 className="font-serif font-bold text-lg text-[#183F32]">
                {editingCategory ? 'Edit Category' : 'Create Category'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-[#26312B]/60 hover:text-[#183F32] rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              {error && (
                <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl font-medium">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#183F32] mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Herbal Balms"
                  className="w-full px-3 py-2 border border-[#AFC7A5]/40 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#183F32]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#183F32] mb-1">
                  Slug (URL identifier)
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="e.g. herbal-balms"
                  className="w-full px-3 py-2 border border-[#AFC7A5]/40 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#183F32]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#183F32] mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description for category header..."
                  className="w-full px-3 py-2 border border-[#AFC7A5]/40 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#183F32]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#183F32] mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(e.target.value)}
                    className="w-full px-3 py-2 border border-[#AFC7A5]/40 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#183F32]"
                  />
                </div>

                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={active}
                      onChange={(e) => setActive(e.target.checked)}
                      className="w-4 h-4 text-[#183F32] rounded focus:ring-[#183F32]"
                    />
                    <span className="text-xs font-bold text-[#183F32]">Active</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-[#26312B] bg-[#FAF9F3] hover:bg-[#E3EBDD]/40 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#183F32] hover:bg-[#122F25] rounded-xl flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{editingCategory ? 'Update' : 'Create'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!categoryToDelete}
        title="Delete Category"
        message={`Are you sure you want to delete category "${categoryToDelete?.name}"? Products in this category will remain, but will not be grouped under this category title.`}
        confirmLabel="Delete Category"
        onConfirm={handleConfirmDelete}
        onCancel={() => setCategoryToDelete(null)}
      />
    </div>
  );
};
