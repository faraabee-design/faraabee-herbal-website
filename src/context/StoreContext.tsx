import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  onSnapshot,
  writeBatch,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/firestoreErrors';
import { Product, Category, Promotion, Order } from '../types';
import { products as fallbackProducts } from '../data/products';
import { useAuth } from './FirebaseContext';

interface StoreContextType {
  products: Product[];
  categories: Category[];
  promotions: Promotion[];
  orders: Order[];
  loading: boolean;
  featuredProducts: Product[];
  activePromotion: Promotion | null;
  // CRUD Products
  addProduct: (productData: Partial<Product>) => Promise<string>;
  updateProduct: (id: string, updates: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  duplicateProduct: (id: string) => Promise<string>;
  toggleProductFeatured: (id: string, current: boolean) => Promise<void>;
  toggleProductStatus: (id: string, currentStatus: Product['status']) => Promise<void>;
  // CRUD Categories
  addCategory: (categoryData: Omit<Category, 'id'>) => Promise<string>;
  updateCategory: (id: string, updates: Partial<Category>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  // CRUD Promotions
  addPromotion: (promoData: Omit<Promotion, 'id'>) => Promise<string>;
  updatePromotion: (id: string, updates: Partial<Promotion>) => Promise<void>;
  deletePromotion: (id: string) => Promise<void>;
  // Orders
  createOrder: (orderData: Omit<Order, 'id' | 'createdAt'>) => Promise<string>;
  updateOrderStatus: (orderId: string, status: Order['status']) => Promise<void>;
  // Image upload
  uploadProductImage: (file: File) => Promise<string>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const DEFAULT_CATEGORIES: Omit<Category, 'id'>[] = [
  { name: 'All Products', slug: 'all', displayOrder: 1, active: true, description: 'All handcrafted herbal formulas' },
  { name: 'Herbal Oils', slug: 'herbal-oils', displayOrder: 2, active: true, description: 'Traditional cold-pressed and slow-macerated herbal oils' },
  { name: 'Herbal Balms', slug: 'herbal-balms', displayOrder: 3, active: true, description: 'Botanical salves infused with pure beeswax and extracts' },
  { name: 'Botanical Elixirs', slug: 'botanical-elixirs', displayOrder: 4, active: true, description: 'Concentrated plant essences and nourishing drops' },
  { name: 'Herbal Preparations', slug: 'herbal-preparations', displayOrder: 5, active: true, description: 'Artisanal apothecary blends and herbal tonics' },
];

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAdmin } = useAuth();
  const [products, setProducts] = useState<Product[]>(fallbackProducts);
  const [categories, setCategories] = useState<Category[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Subscribe to Products
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, 'products'),
      (snapshot) => {
        if (!snapshot.empty) {
          const loaded: Product[] = [];
          snapshot.forEach((docSnap) => {
            const data = docSnap.data();
            loaded.push({
              id: docSnap.id,
              ...data,
            } as Product);
          });
          // Sort by displayOrder or fallback
          loaded.sort((a, b) => (a.displayOrder ?? 999) - (b.displayOrder ?? 999));
          setProducts(loaded);
        } else {
          // Empty in Firestore -> seed initial data if needed
          seedInitialProducts();
        }
        setLoading(false);
      },
      (error) => {
        console.warn('Could not read products from Firestore:', error.message);
        setLoading(false);
      }
    );

    return () => unsub();
  }, []);

  // 2. Subscribe to Categories
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, 'categories'),
      (snapshot) => {
        if (!snapshot.empty) {
          const loaded: Category[] = [];
          snapshot.forEach((docSnap) => {
            loaded.push({
              id: docSnap.id,
              ...docSnap.data(),
            } as Category);
          });
          loaded.sort((a, b) => a.displayOrder - b.displayOrder);
          setCategories(loaded);
        } else {
          seedInitialCategories();
        }
      },
      (error) => {
        console.warn('Could not read categories from Firestore:', error.message);
      }
    );

    return () => unsub();
  }, []);

  // 3. Subscribe to Promotions
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, 'promotions'),
      (snapshot) => {
        const loaded: Promotion[] = [];
        snapshot.forEach((docSnap) => {
          loaded.push({
            id: docSnap.id,
            ...docSnap.data(),
          } as Promotion);
        });
        setPromotions(loaded);
      },
      (error) => {
        console.warn('Could not read promotions:', error.message);
      }
    );

    return () => unsub();
  }, []);

  // 4. Subscribe to Orders (only if Admin)
  useEffect(() => {
    if (!isAdmin) {
      setOrders([]);
      return;
    }
    const unsub = onSnapshot(
      collection(db, 'orders'),
      (snapshot) => {
        const loaded: Order[] = [];
        snapshot.forEach((docSnap) => {
          loaded.push({
            id: docSnap.id,
            ...docSnap.data(),
          } as Order);
        });
        loaded.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setOrders(loaded);
      },
      (error) => {
        console.warn('Could not read orders:', error.message);
      }
    );

    return () => unsub();
  }, [isAdmin]);

  // Seeding helpers
  const seedInitialProducts = async () => {
    try {
      const batch = writeBatch(db);
      for (const p of fallbackProducts) {
        const docRef = doc(db, 'products', p.id);
        batch.set(docRef, {
          ...p,
          status: 'active',
          displayOrder: 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }
      await batch.commit();
    } catch {
      // Ignore if unauthenticated visitor cannot write
    }
  };

  const seedInitialCategories = async () => {
    try {
      const batch = writeBatch(db);
      for (let i = 0; i < DEFAULT_CATEGORIES.length; i++) {
        const cat = DEFAULT_CATEGORIES[i];
        const docRef = doc(db, 'categories', cat.slug);
        batch.set(docRef, {
          ...cat,
          id: cat.slug,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }
      await batch.commit();
    } catch {
      // Ignore if unauthenticated
    }
  };

  // Products CRUD
  const addProduct = async (productData: Partial<Product>): Promise<string> => {
    const slug = (productData.name || 'product')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    const id = `farabi-${slug}-${Date.now().toString(36)}`;
    const fullProduct: Product = {
      id,
      slug,
      name: productData.name || 'New Herbal Product',
      urduName: productData.urduName || '',
      category: productData.category || 'Herbal Oils',
      price: Number(productData.price) || 0,
      salePrice: productData.salePrice ? Number(productData.salePrice) : undefined,
      currency: productData.currency || 'PKR',
      volume: productData.volume || '100 ml',
      shortDescription: productData.shortDescription || '',
      description: productData.description || '',
      image: productData.image || fallbackProducts[0].image,
      secondaryImage: productData.secondaryImage || '',
      featured: !!productData.featured,
      inStock: productData.inStock !== false,
      stockQuantity: productData.stockQuantity ?? 50,
      sku: productData.sku || `FB-${Math.floor(1000 + Math.random() * 9000)}`,
      status: productData.status || 'active',
      displayOrder: productData.displayOrder ?? (products.length + 1),
      rating: productData.rating || 5.0,
      reviewsCount: productData.reviewsCount || 0,
      traditionalUse: productData.traditionalUse || '',
      directions: productData.directions || '',
      precautions: productData.precautions || '',
      packagingInfo: productData.packagingInfo || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      await setDoc(doc(db, 'products', id), fullProduct);
      return id;
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `products/${id}`);
    }
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    try {
      await updateDoc(doc(db, 'products', id), {
        ...updates,
        updatedAt: new Date().toISOString(),
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `products/${id}`);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'products', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `products/${id}`);
    }
  };

  const duplicateProduct = async (id: string): Promise<string> => {
    const existing = products.find((p) => p.id === id);
    if (!existing) throw new Error('Product not found');
    const newName = `${existing.name} (Copy)`;
    const newSlug = `${existing.slug}-copy-${Date.now().toString(36)}`;
    const newId = `farabi-${newSlug}`;

    const duplicated: Product = {
      ...existing,
      id: newId,
      slug: newSlug,
      name: newName,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      await setDoc(doc(db, 'products', newId), duplicated);
      return newId;
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `products/${newId}`);
    }
  };

  const toggleProductFeatured = async (id: string, current: boolean) => {
    await updateProduct(id, { featured: !current });
  };

  const toggleProductStatus = async (id: string, currentStatus: Product['status']) => {
    const nextStatus: Product['status'] = currentStatus === 'active' ? 'draft' : 'active';
    await updateProduct(id, { status: nextStatus });
  };

  // Categories CRUD
  const addCategory = async (categoryData: Omit<Category, 'id'>): Promise<string> => {
    const slug = categoryData.slug || categoryData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const id = slug;
    try {
      await setDoc(doc(db, 'categories', id), {
        ...categoryData,
        id,
        slug,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      return id;
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `categories/${id}`);
    }
  };

  const updateCategory = async (id: string, updates: Partial<Category>) => {
    try {
      await updateDoc(doc(db, 'categories', id), {
        ...updates,
        updatedAt: new Date().toISOString(),
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `categories/${id}`);
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'categories', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `categories/${id}`);
    }
  };

  // Promotions CRUD
  const addPromotion = async (promoData: Omit<Promotion, 'id'>): Promise<string> => {
    const id = `promo-${Date.now().toString(36)}`;
    try {
      await setDoc(doc(db, 'promotions', id), {
        ...promoData,
        id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      return id;
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `promotions/${id}`);
    }
  };

  const updatePromotion = async (id: string, updates: Partial<Promotion>) => {
    try {
      await updateDoc(doc(db, 'promotions', id), {
        ...updates,
        updatedAt: new Date().toISOString(),
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `promotions/${id}`);
    }
  };

  const deletePromotion = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'promotions', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `promotions/${id}`);
    }
  };

  // Orders CRUD
  const createOrder = async (orderData: Omit<Order, 'id' | 'createdAt'>): Promise<string> => {
    const id = `order-${Date.now().toString(36)}-${Math.floor(100 + Math.random() * 900)}`;
    const fullOrder: Order = {
      ...orderData,
      id,
      createdAt: new Date().toISOString(),
    };
    try {
      await setDoc(doc(db, 'orders', id), fullOrder);
      return id;
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `orders/${id}`);
    }
  };

  const updateOrderStatus = async (orderId: string, status: Order['status']) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), { status });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `orders/${orderId}`);
    }
  };

  // Image Upload (Firebase Storage with instant Base64 fallback)
  const uploadProductImage = async (file: File): Promise<string> => {
    try {
      const storageRef = ref(storage, `products/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(snapshot.ref);
      return downloadUrl;
    } catch {
      // Fallback to Data URL for instant offline or permissions-restricted environments
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }
  };

  const featuredProducts = useMemo(() => {
    return products.filter((p) => p.featured && p.status === 'active');
  }, [products]);

  const activePromotion = useMemo(() => {
    return promotions.find((p) => p.active) || null;
  }, [promotions]);

  return (
    <StoreContext.Provider
      value={{
        products,
        categories: categories.length > 0 ? categories : (DEFAULT_CATEGORIES as Category[]),
        promotions,
        orders,
        loading,
        featuredProducts,
        activePromotion,
        addProduct,
        updateProduct,
        deleteProduct,
        duplicateProduct,
        toggleProductFeatured,
        toggleProductStatus,
        addCategory,
        updateCategory,
        deleteCategory,
        addPromotion,
        updatePromotion,
        deletePromotion,
        createOrder,
        updateOrderStatus,
        uploadProductImage,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
