import React, { useState } from 'react';
import { Promotion } from '../../types';
import { useStore } from '../../context/StoreContext';
import { ConfirmDialog } from './ConfirmDialog';
import { Plus, Tag, Trash2, Edit2, Check, X, Upload } from 'lucide-react';

interface AdminPromotionsProps {
  onNotify: (msg: string) => void;
}

export const AdminPromotions: React.FC<AdminPromotionsProps> = ({ onNotify }) => {
  const { products, promotions, addPromotion, updatePromotion, deletePromotion, uploadProductImage } = useStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPromo, setEditingPromo] = useState<Promotion | null>(null);

  const [productId, setProductId] = useState('');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [discountPrice, setDiscountPrice] = useState('');
  const [badge, setBadge] = useState('Limited Botanical Batch');
  const [image, setImage] = useState('');
  const [active, setActive] = useState(true);

  const [promoToDelete, setPromoToDelete] = useState<Promotion | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOpenAdd = () => {
    setEditingPromo(null);
    setProductId(products[0]?.id || '');
    setTitle('Seasonal Botanical Revival');
    setSubtitle('Pure Artisan Slow-Macerated Blends');
    setDescription('Experience traditional Unani-Greek botanical vitality with special seasonal privileges.');
    setDiscountPrice('');
    setBadge('Special Offer');
    setImage(products[0]?.image || '');
    setActive(true);
    setError(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: Promotion) => {
    setEditingPromo(p);
    setProductId(p.productId || '');
    setTitle(p.title);
    setSubtitle(p.subtitle || '');
    setDescription(p.description);
    setDiscountPrice(p.discountPrice !== undefined ? String(p.discountPrice) : '');
    setBadge(p.badge || 'Limited Edition');
    setImage(p.image || '');
    setActive(p.active);
    setError(null);
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadProductImage(file);
      setImage(url);
    } catch {
      setError('Failed to upload banner image.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError('Title and description are required.');
      return;
    }

    try {
      const data = {
        productId: productId || undefined,
        title: title.trim(),
        subtitle: subtitle.trim() || undefined,
        description: description.trim(),
        discountPrice: discountPrice ? Number(discountPrice) : undefined,
        badge: badge.trim() || undefined,
        image: image.trim() || undefined,
        active,
      };

      if (editingPromo) {
        await updatePromotion(editingPromo.id, data);
        onNotify('Promotion updated successfully');
      } else {
        await addPromotion(data);
        onNotify('Promotion published successfully');
      }
      setIsModalOpen(false);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to save promotion');
    }
  };

  const handleConfirmDelete = async () => {
    if (!promoToDelete) return;
    try {
      await deletePromotion(promoToDelete.id);
      onNotify('Promotion removed');
    } catch {
      onNotify('Failed to delete promotion');
    } finally {
      setPromoToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl shadow-xs border border-[#AFC7A5]/30">
        <div>
          <h2 className="text-xl font-serif font-bold text-[#183F32]">
            Product Promotions & Highlights
          </h2>
          <p className="text-xs text-[#26312B]/70 mt-0.5">
            Create featured product campaigns, seasonal banners, and apothecary promotions.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#183F32] hover:bg-[#122F25] text-white text-sm font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Promotion</span>
        </button>
      </div>

      {/* Promotions List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {promotions.length === 0 ? (
          <div className="md:col-span-2 p-12 text-center bg-white rounded-2xl border border-dashed border-[#AFC7A5]/40 text-[#26312B]/60">
            <Tag className="w-10 h-10 mx-auto text-[#183F32]/40 mb-3" />
            <p className="font-semibold text-sm text-[#183F32]">No Active Promotions</p>
            <p className="text-xs mt-1 text-[#26312B]/60">
              Click &quot;New Promotion&quot; above to feature a special price or highlight a botanical blend.
            </p>
          </div>
        ) : (
          promotions.map((promo) => (
            <div
              key={promo.id}
              className="bg-white rounded-2xl border border-[#AFC7A5]/30 shadow-xs overflow-hidden flex flex-col justify-between"
            >
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#E3EBDD] text-[#183F32]">
                    {promo.badge || 'Promotion'}
                  </span>
                  <button
                    type="button"
                    onClick={() => updatePromotion(promo.id, { active: !promo.active })}
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase cursor-pointer ${
                      promo.active
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-stone-100 text-stone-600 border border-stone-200'
                    }`}
                  >
                    {promo.active ? 'Live on Store' : 'Inactive'}
                  </button>
                </div>

                <h3 className="mt-3 text-lg font-serif font-bold text-[#183F32]">{promo.title}</h3>
                {promo.subtitle && (
                  <p className="text-xs font-medium text-[#26312B]/70">{promo.subtitle}</p>
                )}
                <p className="mt-2 text-xs text-[#26312B]/80 leading-relaxed">{promo.description}</p>

                {promo.discountPrice && (
                  <div className="mt-3 p-2.5 bg-[#FAF9F3] rounded-xl flex items-center justify-between text-xs">
                    <span className="text-[#26312B]/70">Promotional Price:</span>
                    <span className="font-bold text-[#183F32] text-sm">
                      Rs. {promo.discountPrice.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-4 bg-[#FAF9F3]/60 border-t border-[#AFC7A5]/20 flex items-center justify-between text-xs">
                <span className="text-[11px] text-[#26312B]/50">
                  Target: {products.find((p) => p.id === promo.productId)?.name || 'General Banner'}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(promo)}
                    className="p-1.5 text-[#26312B]/70 hover:text-[#183F32] hover:bg-white rounded-lg transition-colors cursor-pointer"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setPromoToDelete(promo)}
                    className="p-1.5 text-[#26312B]/70 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Promotion Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-[#AFC7A5]/40 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#AFC7A5]/20">
              <h3 className="font-serif font-bold text-lg text-[#183F32]">
                {editingPromo ? 'Edit Promotion' : 'Create Botanical Promotion'}
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
                  Promoted Product
                </label>
                <select
                  value={productId}
                  onChange={(e) => {
                    setProductId(e.target.value);
                    const prod = products.find((p) => p.id === e.target.value);
                    if (prod && !image) setImage(prod.image);
                  }}
                  className="w-full px-3 py-2 border border-[#AFC7A5]/40 rounded-xl text-xs bg-white cursor-pointer"
                >
                  <option value="">General Store Announcement (No specific product)</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.currency} {p.price.toLocaleString()})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#183F32] mb-1">
                  Campaign Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Pure Almond & Amla Hair Elixir Privilege"
                  className="w-full px-3 py-2 border border-[#AFC7A5]/40 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#183F32] mb-1">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="e.g. Crafted in Small Artisan Batches"
                  className="w-full px-3 py-2 border border-[#AFC7A5]/40 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#183F32] mb-1">
                  Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Highlight key botanical ingredients, benefits, or seasonal offer..."
                  className="w-full px-3 py-2 border border-[#AFC7A5]/40 rounded-xl text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#183F32] mb-1">
                    Special Offer Price (Rs.)
                  </label>
                  <input
                    type="number"
                    value={discountPrice}
                    onChange={(e) => setDiscountPrice(e.target.value)}
                    placeholder="e.g. 1650"
                    className="w-full px-3 py-2 border border-[#AFC7A5]/40 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#183F32] mb-1">
                    Tag / Badge
                  </label>
                  <input
                    type="text"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    placeholder="e.g. Special Privilege"
                    className="w-full px-3 py-2 border border-[#AFC7A5]/40 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#183F32] mb-1">
                  Banner / Product Image
                </label>
                <div className="flex items-center gap-3">
                  <label className="px-3 py-1.5 bg-[#FAF9F3] border border-[#AFC7A5]/40 text-[#183F32] rounded-xl text-xs font-medium cursor-pointer inline-flex items-center gap-1.5 hover:bg-[#E3EBDD]/40">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploading ? 'Uploading...' : 'Upload Image'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploading}
                      className="hidden"
                    />
                  </label>
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="Image URL"
                    className="flex-1 px-3 py-1.5 border border-[#AFC7A5]/40 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={(e) => setActive(e.target.checked)}
                    className="w-4 h-4 text-[#183F32] rounded focus:ring-[#183F32]"
                  />
                  <span className="text-xs font-bold text-[#183F32]">
                    Make Live on Public Store
                  </span>
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-2 border-t border-[#AFC7A5]/20">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-[#26312B] bg-[#FAF9F3] hover:bg-[#E3EBDD]/40 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#183F32] hover:bg-[#122F25] rounded-xl flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{editingPromo ? 'Update Promotion' : 'Publish Promotion'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!promoToDelete}
        title="Remove Promotion"
        message={`Are you sure you want to delete promotion "${promoToDelete?.title}"?`}
        confirmLabel="Remove"
        onConfirm={handleConfirmDelete}
        onCancel={() => setPromoToDelete(null)}
      />
    </div>
  );
};
