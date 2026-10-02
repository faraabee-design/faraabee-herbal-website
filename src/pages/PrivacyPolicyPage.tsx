import React from 'react';
import { Shield } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="bg-[#FAF9F3] min-h-screen py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#AFC7A5]/35 shadow-xs space-y-8">
          <div className="border-b border-[#AFC7A5]/25 pb-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#285844] mb-2">
              <Shield className="w-4 h-4" />
              <span>FARAABEE INTEGRITY</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#183F32]">
              Privacy & Data Policy
            </h1>
            <p className="text-xs text-[#26312B]/60 mt-1">
              Effective Date: March 2026 · Hostinger Deployment Ready
            </p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-[#26312B]/85 leading-relaxed">
            <section className="space-y-2">
              <h2 className="font-serif text-lg font-semibold text-[#183F32]">
                1. Our Commitment to Discretion
              </h2>
              <p>
                At FARAABEE ({siteConfig.brandName}), we view the privacy of our patrons with the same reverence we apply to our botanical ingredients. We only gather information strictly necessary to fulfill your orders, provide customer care, and share herbal journal dispatches when explicitly requested.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-semibold text-[#183F32]">
                2. Information We Collect
              </h2>
              <p>
                When ordering herbal products or contacting our desk, we may collect:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Your name and contact phone / WhatsApp number for delivery verification.</li>
                <li>Physical shipping address and city within Pakistan or international destinations.</li>
                <li>Email address if opting in to receive botanical essays or order confirmation notices.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-semibold text-[#183F32]">
                3. Zero Third-Party Monetization
              </h2>
              <p>
                We do not sell, rent, or lease your personal identifiers to marketing brokers, ad networks, or unrelated commercial third parties. Your details remain safeguarded within our direct order logistics chain.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-semibold text-[#183F32]">
                4. Cookies and Analytical Metrics
              </h2>
              <p>
                We use minimal, privacy-respecting local storage and session cookies strictly to preserve your cart items and language preferences.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-semibold text-[#183F32]">
                5. Contacting Our Data Custodian
              </h2>
              <p>
                For questions regarding personal records or to request removal from our journal dispatches, write to{' '}
                <strong className="text-[#183F32]">{siteConfig.contact.email}</strong>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
