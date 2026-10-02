import React, { useState } from 'react';
import { FarabiLogo } from './FarabiLogo';
import { PageId } from '../types';
import { siteConfig } from '../config/siteConfig';
import { Mail, Phone, MapPin, Send, Check, MessageCircle } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 3500);
    }
  };

  const handleNav = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#183F32] text-white pt-16 pb-12 border-t border-[#285844]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <FarabiLogo variant="light" size="lg" />
              <p className="text-xs sm:text-sm text-[#FAF9F3]/80 mt-4 leading-relaxed max-w-sm">
                FARAABEE crafts thoughtful herbal wellness products inspired by classical botanical traditions. Pure carrier oils, whole herbs, and quiet daily care.
              </p>
              <p className="font-urdu text-sm text-[#AFC7A5] mt-3" dir="rtl">
                روایت، خالص تیاری اور جدید دیکھ بھال
              </p>
            </div>

            {/* Direct WhatsApp Action */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <a
                href={siteConfig.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#285844] hover:bg-[#285844]/80 text-[#FAF9F3] text-xs font-semibold rounded-lg transition-colors border border-white/10"
              >
                <MessageCircle className="w-4 h-4 text-[#AFC7A5]" />
                <span>WhatsApp Herbal Desk: {siteConfig.contact.whatsappDisplay}</span>
              </a>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase font-semibold tracking-[0.16em] text-[#AFC7A5] mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#FAF9F3]/80">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About FARAABEE
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('products')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Herbal Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('journal')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Herbal Journal
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about-herbal')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Herbal Wisdom
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact & Inquiries
                </button>
              </li>
            </ul>
          </div>

          {/* Customer & Policy */}
          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase font-semibold tracking-[0.16em] text-[#AFC7A5] mb-4">
              Care & Policies
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#FAF9F3]/80">
              <li>
                <button
                  onClick={() => handleNav('privacy')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('terms')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about-herbal')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Herbal Usage Guidance
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Wholesale & Bulk Orders
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <h4 className="text-xs uppercase font-semibold tracking-[0.16em] text-[#AFC7A5] mb-4">
                Botanical Journal Dispatch
              </h4>
              <p className="text-xs text-[#FAF9F3]/75 mb-3 leading-relaxed">
                Receive new product updates and herbal journal essays on traditional botanical care.
              </p>

              <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-white/50 focus:outline-none focus:border-[#AFC7A5] focus:ring-1 focus:ring-[#AFC7A5]"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#AFC7A5] hover:bg-white text-[#183F32] font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center shrink-0 cursor-pointer"
                  aria-label="Subscribe to newsletter"
                >
                  {subscribed ? <Check className="w-4 h-4" /> : <Send className="w-4 h-4" />}
                </button>
              </form>
              {subscribed && (
                <p className="text-[11px] text-[#AFC7A5] mt-1.5 font-medium">
                  Thank you. You are now subscribed to FARAABEE Journal.
                </p>
              )}
            </div>

            {/* Physical & Digital touchpoints */}
            <div className="mt-6 pt-4 border-t border-white/10 space-y-2 text-xs text-[#FAF9F3]/75">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#AFC7A5]" />
                <span>{siteConfig.contact.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#AFC7A5]" />
                <span>{siteConfig.contact.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#AFC7A5]" />
                <span>{siteConfig.contact.address}, {siteConfig.contact.city}, {siteConfig.contact.country}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Disclaimer & Hostinger Notice */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#FAF9F3]/60 gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <p>© 2026 FARAABEE. All rights reserved. Handcrafted herbal wellness.</p>
            <span className="text-[#FAF9F3]/30">•</span>
            <button
              onClick={() => handleNav('admin')}
              className="hover:text-white transition-colors cursor-pointer text-[11px] underline opacity-70 hover:opacity-100"
            >
              Admin Portal
            </button>
          </div>

          <p className="text-center md:text-right text-[11px] max-w-xl text-[#FAF9F3]/50">
            Disclaimer: Traditional herbal preparations. Statements have not been evaluated by regulatory agencies. Not intended to diagnose, treat, or cure any medical condition.
          </p>
        </div>
      </div>
    </footer>
  );
};
