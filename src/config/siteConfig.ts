export interface SiteConfig {
  brandName: string;
  brandUrdu: string;
  tagline: string;
  taglineUrdu: string;
  description: string;
  contact: {
    email: string;
    phone: string;
    whatsappNumber: string;
    whatsappDisplay: string;
    address: string;
    city: string;
    country: string;
    businessHours: string;
  };
  social: {
    instagram: string;
    facebook: string;
    youtube: string;
    whatsapp: string;
  };
  currency: {
    code: string;
    symbol: string;
    freeShippingThreshold: number;
    standardShippingFee: number;
  };
  categories: string[];
}

export const siteConfig: SiteConfig = {
  brandName: 'FARAABEE',
  brandUrdu: 'فارابی',
  tagline: 'Natural Wisdom, Modern Herbal Care',
  taglineUrdu: 'روایت سے وابستہ، جدید دیکھ بھال',
  description:
    'Thoughtfully prepared herbal wellness products inspired by traditional botanical knowledge and crafted for everyday vitality.',
  contact: {
    email: 'contact@faraabee.com',
    phone: '+92 3091655743',
    whatsappNumber: '923091655743',
    whatsappDisplay: '+92 3091655743',
    address: 'Kacha Eminabad Road',
    city: 'Gujranwala',
    country: 'Pakistan',
    businessHours: 'Monday – Saturday: 9:00 AM – 7:00 PM PKT',
  },
  social: {
    instagram: 'https://instagram.com/faraabeeherbal',
    facebook: 'https://facebook.com/faraabeeherbal',
    youtube: 'https://youtube.com/@faraabeeherbal',
    whatsapp: 'https://wa.me/923091655743',
  },
  currency: {
    code: 'PKR',
    symbol: 'Rs.',
    freeShippingThreshold: 5000,
    standardShippingFee: 250,
  },
  categories: [
    'All Products',
    'Herbal Oils',
    'Herbal Balms',
    'Botanical Elixirs',
    'Herbal Preparations',
  ],
};
