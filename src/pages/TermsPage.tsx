import React from 'react';
import { FileText, AlertCircle } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export const TermsPage: React.FC = () => {
  return (
    <div className="bg-[#FAF9F3] min-h-screen py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#AFC7A5]/35 shadow-xs space-y-8">
          <div className="border-b border-[#AFC7A5]/25 pb-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#285844] mb-2">
              <FileText className="w-4 h-4" />
              <span>TERMS OF ENGAGEMENT</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#183F32]">
              Terms & Conditions
            </h1>
            <p className="text-xs text-[#26312B]/60 mt-1">
              Effective Date: March 2026 · FARAABEE Herbal Wellness
            </p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-[#26312B]/85 leading-relaxed">
            <div className="p-4 bg-[#E8F1DF]/70 rounded-xl border border-[#AFC7A5]/40 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[#285844] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#183F32] block mb-1">
                  Responsible Botanical Wellness Disclaimer
                </strong>
                <span>
                  FARAABEE products are traditional herbal wellness and topical self-care preparations. Statements have not been evaluated by regulatory agencies. Products are not intended to diagnose, treat, cure, or prevent any illness or disease. Always seek advice from certified medical practitioners for health concerns.
                </span>
              </div>
            </div>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-semibold text-[#183F32]">
                1. Order Placement & Acceptance
              </h2>
              <p>
                By placing an order via our online portal, WhatsApp desk, or authorized stockists, you confirm that your provided delivery coordinates are accurate. All orders remain subject to batch availability and verification by our Lahore desk.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-semibold text-[#183F32]">
                2. Pricing and Shipping
              </h2>
              <p>
                All prices are stated in {siteConfig.currency.code} ({siteConfig.currency.symbol}). Orders exceeding {siteConfig.currency.symbol} {siteConfig.currency.freeShippingThreshold.toLocaleString()} qualify for complimentary domestic delivery. Standard domestic transit requires 2–4 business days depending on city destination.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-semibold text-[#183F32]">
                3. Topical Herbal Usage & Sensitivity
              </h2>
              <p>
                Because natural plant oils and extracts are potent, the user agrees to perform a 24-hour skin patch test prior to full topical application. If skin irritation develops, discontinue use immediately.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-semibold text-[#183F32]">
                4. Returns & Damaged Goods
              </h2>
              <p>
                Due to hygienic apothecary standards, opened cosmetic bottles and balms cannot be returned. Should a package arrive damaged or compromised in transit, notify our team within 48 hours with photographic evidence for immediate replacement.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-semibold text-[#183F32]">
                5. Intellectual Property
              </h2>
              <p>
                The FARAABEE brand mark, Urdu calligraphy (فارابی), formulation names, visual compositions, and herbal journal essays are the original property of FARAABEE Herbal Wellness.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
