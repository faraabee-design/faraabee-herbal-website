import React, { useState } from 'react';
import { Product, Category } from '../../types';
import { X, Upload, Check, Image as ImageIcon } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

interface ProductFormModalProps {
  isOpen: boolean;
  product?: Product | null;
  categories: Category[];
  onClose: () => void;
  onSave: (productData: Partial<Product>) => Promise<void>;
}

export const ProductFormModal: React.FC<ProductFormModalProps> = ({
  isOpen,
  product,
  categories,
  onClose,
  onSave,
}) => {
  const { uploadProductImage } = useStore();
  const isEditing = !!product;

  const [name, setName] = useState(product?.name || '');
  const [urduName, setUrduName] = useState(product?.urduName || '');
  const [category, setCategory] = useState(product?.category || (categories[0]?.name || 'Herbal Oils'));
  const [price, setPrice] = useState<string>(product?.price !== undefined ? String(product.price) : '');
  const [salePrice, setSalePrice] = useState<string>(product?.salePrice !== undefined ? String(product.salePrice) : '');
  const [currency, setCurrency] = useState(product?.currency || 'PKR');
  const [volume, setVolume] = useState(product?.volume || '100 ml');
  const [shortDescription, setShortDescription] = useState(product?.shortDescription || '');
  const [description, setDescription] = useState(product?.description || '');
  const [image, setImage] = useState(product?.image || '');
  const [secondaryImage, setSecondaryImage] = useState(product?.secondaryImage || '');
  const [sku, setSku] = useState(product?.sku || '');
  const [stockQuantity, setStockQuantity] = useState<string>(
    product?.stockQuantity !== undefined ? String(product.stockQuantity) : '50'
  );
  const [inStock, setInStock] = useState(product?.inStock ?? true);
  const [featured, setFeatured] = useState(product?.featured ?? false);
  const [status, setStatus] = useState<Product['status']>(product?.status || 'active');
  const [displayOrder, setDisplayOrder] = useState<string>(
    product?.displayOrder !== undefined ? String(product.displayOrder) : '1'
  );

  // Apothecary rich attributes
  const [traditionalUse, setTraditionalUse] = useState(product?.traditionalUse || '');
  const [directions, setDirections] = useState(product?.directions || '');
  const [precautions, setPrecautions] = useState(product?.precautions || '');
  const [packagingInfo, setPackagingInfo] = useState(product?.packagingInfo || '');

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const url = await uploadProductImage(file);
      setImage(url);
    } catch (err) {
      setError('Failed to upload image. Please try again or paste a URL.');
    } finally {
      setUploading(false);
    }
  };

  const handleSecondaryImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const url = await uploadProductImage(file);
      setSecondaryImage(url);
    } catch {
      setError('Failed to upload secondary image.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Product name is required.');
      return;
    }
    if (!price || Number(price) <= 0) {
      setError('Please provide a valid price greater than 0.');
      return;
    }
    if (!shortDescription.trim()) {
      setError('Short description is required.');
      return;
    }
    if (!image.trim()) {
      setError('Please upload or provide a product image.');
      return;
    }

    setSaving(true);
    setError(null);
    try {
      await onSave({
        name: name.trim(),
        urduName: urduName.trim() || undefined,
        category,
        price: Number(price),
        salePrice: salePrice ? Number(salePrice) : undefined,
        currency: currency.trim() || 'PKR',
        volume: volume.trim(),
        shortDescription: shortDescription.trim(),
        description: description.trim() || shortDescription.trim(),
        image: image.trim(),
        secondaryImage: secondaryImage.trim() || undefined,
        sku: sku.trim() || undefined,
        stockQuantity: Number(stockQuantity) || 0,
        inStock,
        featured,
        status,
        displayOrder: Number(displayOrder) || 1,
        traditionalUse: traditionalUse.trim() || undefined,
        directions: directions.trim() || undefined,
        precautions: precautions.trim() || undefined,
        packagingInfo: packagingInfo.trim() || undefined,
      });
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-[#AFC7A5]/40 my-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#AFC7A5]/20 flex items-center justify-between bg-[#FAF9F3] rounded-t-3xl">
          <div>
            <h2 className="text-xl font-serif font-bold text-[#183F32]">
              {isEditing ? `Edit Formulation: ${product.name}` : 'Add New Herbal Formulation'}
            </h2>
            <p className="text-xs text-[#26312B]/70 mt-0.5">
              Updates will instantly sync to the live store catalogue.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#26312B]/60 hover:text-[#183F32] hover:bg-[#E3EBDD]/40 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {error && (
            <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-medium">
              {error}
            </div>
          )}

          {/* Section 1: Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#183F32] mb-1">
                Product Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Farabi Herbal Oil"
                className="w-full px-3.5 py-2.5 border border-[#AFC7A5]/40 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#183F32]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#183F32] mb-1">
                Urdu Calligraphy / Subtitle (Optional)
              </label>
              <input
                type="text"
                value={urduName}
                onChange={(e) => setUrduName(e.target.value)}
                placeholder="e.g. مقویِ مو ہربل تیل"
                dir="rtl"
                className="w-full px-3.5 py-2.5 border border-[#AFC7A5]/40 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#183F32]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#183F32] mb-1">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-[#AFC7A5]/40 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#183F32] bg-white cursor-pointer"
              >
                {categories.map((c) => (
                  <option key={c.id || c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Section 2: Pricing, Currency & Stock */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#FAF9F3] rounded-2xl border border-[#AFC7A5]/25">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#183F32] mb-1">
                Regular Price *
              </label>
              <input
                type="number"
                required
                min="0"
                step="any"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="1850"
                className="w-full px-3 py-2 border border-[#AFC7A5]/40 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#183F32] bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#183F32] mb-1">
                Sale Price (Optional)
              </label>
              <input
                type="number"
                min="0"
                step="any"
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value)}
                placeholder="1650"
                className="w-full px-3 py-2 border border-[#AFC7A5]/40 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#183F32] bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#183F32] mb-1">
                Currency
              </label>
              <input
                type="text"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                placeholder="PKR or Rs."
                className="w-full px-3 py-2 border border-[#AFC7A5]/40 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#183F32] bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#183F32] mb-1">
                Volume / Size
              </label>
              <input
                type="text"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                placeholder="100 ml / 50 g"
                className="w-full px-3 py-2 border border-[#AFC7A5]/40 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#183F32] bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#183F32] mb-1">
                Stock Quantity
              </label>
              <input
                type="number"
                min="0"
                value={stockQuantity}
                onChange={(e) => setStockQuantity(e.target.value)}
                placeholder="50"
                className="w-full px-3 py-2 border border-[#AFC7A5]/40 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#183F32] bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#183F32] mb-1">
                SKU / Code
              </label>
              <input
                type="text"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                placeholder="FB-1001"
                className="w-full px-3 py-2 border border-[#AFC7A5]/40 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#183F32] bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#183F32] mb-1">
                Display Order
              </label>
              <input
                type="number"
                value={displayOrder}
                onChange={(e) => setDisplayOrder(e.target.value)}
                placeholder="1"
                className="w-full px-3 py-2 border border-[#AFC7A5]/40 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#183F32] bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#183F32] mb-1">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as Product['status'])}
                className="w-full px-3 py-2 border border-[#AFC7A5]/40 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#183F32] bg-white cursor-pointer"
              >
                <option value="active">Active (Visible)</option>
                <option value="draft">Draft (Hidden)</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          {/* Section 3: Switches (In Stock & Featured) */}
          <div className="flex flex-wrap items-center gap-6 p-4 bg-white rounded-2xl border border-[#AFC7A5]/30">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={inStock}
                onChange={(e) => setInStock(e.target.checked)}
                className="w-4 h-4 text-[#183F32] rounded-md focus:ring-[#183F32]"
              />
              <span className="text-sm font-semibold text-[#183F32]">
                In Stock (Available for Purchase)
              </span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 text-[#183F32] rounded-md focus:ring-[#183F32]"
              />
              <span className="text-sm font-semibold text-[#183F32]">
                Featured Product (Show in Homepage Featured Section)
              </span>
            </label>
          </div>

          {/* Section 4: Images */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#183F32] mb-1.5">
                Primary Product Image *
              </label>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                {image ? (
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-[#AFC7A5]/40 shrink-0 bg-[#FAF9F3]">
                    <img src={image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-2xl border-2 border-dashed border-[#AFC7A5]/40 flex items-center justify-center text-[#26312B]/40 shrink-0">
                    <ImageIcon className="w-8 h-8" />
                  </div>
                )}
                <div className="flex-1 w-full space-y-2">
                  <div className="flex items-center gap-3">
                    <label className="px-4 py-2 bg-[#E3EBDD] text-[#183F32] hover:bg-[#AFC7A5]/40 rounded-xl text-xs font-semibold cursor-pointer transition-colors inline-flex items-center gap-1.5">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{uploading ? 'Uploading Image...' : 'Upload Image File'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileChange}
                        disabled={uploading}
                        className="hidden"
                      />
                    </label>
                    <span className="text-xs text-[#26312B]/50">Or paste image URL:</span>
                  </div>
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="https://... or uploaded image path"
                    className="w-full px-3 py-2 border border-[#AFC7A5]/40 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#183F32]"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#183F32] mb-1.5">
                Secondary Image (Hover / Detail view)
              </label>
              <div className="flex items-center gap-3">
                <label className="px-3 py-1.5 bg-[#FAF9F3] border border-[#AFC7A5]/40 text-[#183F32] rounded-xl text-xs font-medium cursor-pointer inline-flex items-center gap-1.5 hover:bg-[#E3EBDD]/40">
                  <Upload className="w-3 h-3" />
                  <span>Upload Secondary File</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleSecondaryImageFileChange}
                    className="hidden"
                  />
                </label>
                <input
                  type="url"
                  value={secondaryImage}
                  onChange={(e) => setSecondaryImage(e.target.value)}
                  placeholder="Secondary image URL (optional)"
                  className="flex-1 px-3 py-1.5 border border-[#AFC7A5]/40 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#183F32]"
                />
              </div>
            </div>
          </div>

          {/* Section 5: Descriptions */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#183F32] mb-1">
                Short Description (Cards & Previews) *
              </label>
              <textarea
                required
                rows={2}
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="A restorative botanical oil handcrafted to nourish scalp and hair vitality..."
                className="w-full px-3.5 py-2.5 border border-[#AFC7A5]/40 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#183F32]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#183F32] mb-1">
                Full Formulation Description (Detail Page)
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detailed herbal breakdown, extraction methodology, and benefits..."
                className="w-full px-3.5 py-2.5 border border-[#AFC7A5]/40 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#183F32]"
              />
            </div>
          </div>

          {/* Section 6: Herbal Wellness Details (Directions, Traditional Use) */}
          <details className="p-4 bg-[#FAF9F3]/60 rounded-2xl border border-[#AFC7A5]/30 group">
            <summary className="text-xs font-bold uppercase tracking-wider text-[#183F32] cursor-pointer flex items-center justify-between">
              <span>Apothecary Details (Usage, Directions & Precautions)</span>
              <span className="text-[#26312B]/40 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="mt-4 space-y-3 pt-3 border-t border-[#AFC7A5]/20">
              <div>
                <label className="block text-xs font-semibold text-[#183F32] mb-1">
                  Traditional Use
                </label>
                <input
                  type="text"
                  value={traditionalUse}
                  onChange={(e) => setTraditionalUse(e.target.value)}
                  placeholder="Historically applied as a warm scalp massage..."
                  className="w-full px-3 py-2 border border-[#AFC7A5]/40 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#183F32] mb-1">
                  Directions for Use
                </label>
                <input
                  type="text"
                  value={directions}
                  onChange={(e) => setDirections(e.target.value)}
                  placeholder="Dispense 8-12 drops and gently massage..."
                  className="w-full px-3 py-2 border border-[#AFC7A5]/40 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#183F32] mb-1">
                  Precautions
                </label>
                <input
                  type="text"
                  value={precautions}
                  onChange={(e) => setPrecautions(e.target.value)}
                  placeholder="Conduct a patch test prior to first use..."
                  className="w-full px-3 py-2 border border-[#AFC7A5]/40 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#183F32] mb-1">
                  Packaging & Storage
                </label>
                <input
                  type="text"
                  value={packagingInfo}
                  onChange={(e) => setPackagingInfo(e.target.value)}
                  placeholder="Supplied in amber UV-protective pharmaceutical glass..."
                  className="w-full px-3 py-2 border border-[#AFC7A5]/40 rounded-xl text-xs"
                />
              </div>
            </div>
          </details>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-[#AFC7A5]/20 flex items-center justify-end gap-3 sticky bottom-0 bg-white py-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-medium text-[#26312B] bg-[#FAF9F3] hover:bg-[#E3EBDD]/40 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || uploading}
              className="px-6 py-2.5 bg-[#183F32] hover:bg-[#122F25] text-white text-sm font-semibold rounded-xl transition-colors shadow-sm disabled:opacity-50 cursor-pointer flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>{saving ? 'Saving...' : isEditing ? 'Update Product' : 'Add Product'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
