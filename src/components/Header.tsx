import React, { useState, useEffect } from 'react';
import { FarabiLogo } from './FarabiLogo';
import { PageId } from '../types';
import { ShoppingBag, Menu, X, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId, slug?: string) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  cartCount,
  onOpenCart,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; page: PageId }[] = [
    { label: 'Home', page: 'home' },
    { label: 'About', page: 'about' },
    { label: 'Products', page: 'products' },
    { label: 'Herbal Journal', page: 'journal' },
    { label: 'About Herbal', page: 'about-herbal' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full bg-white transition-all duration-300 ${
          isScrolled
            ? 'shadow-xs border-b border-[#AFC7A5]/30 py-3.5'
            : 'border-b border-[#AFC7A5]/20 py-4 lg:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Zone 1: Logo Wordmark */}
            <button
              onClick={() => handleNavClick('home')}
              className="focus-visible:outline-2 focus-visible:outline-[#183F32] rounded-md text-left transition-opacity hover:opacity-90 cursor-pointer"
              aria-label="FARAABEE Home"
            >
              <FarabiLogo variant="dark" />
            </button>

            {/* Zone 2: Navigation Links (Desktop) */}
            <nav
              className="hidden lg:flex items-center gap-7 xl:gap-8"
              aria-label="Main Navigation"
            >
              {navLinks.map((link) => {
                const isActive = currentPage === link.page;
                return (
                  <button
                    key={link.page}
                    onClick={() => handleNavClick(link.page)}
                    className={`relative py-1 text-sm font-medium transition-colors cursor-pointer ${
                      isActive
                        ? 'text-[#183F32] font-semibold'
                        : 'text-[#26312B]/80 hover:text-[#183F32]'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#183F32] rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: Actions (Cart & CTA) */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Shopping Bag Trigger */}
              <button
                onClick={onOpenCart}
                className="relative p-2.5 text-[#183F32] hover:bg-[#E8F1DF]/50 rounded-full transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#183F32]"
                aria-label={`Shopping bag with ${cartCount} items`}
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 flex items-center justify-center min-w-4.5 h-4.5 px-1 text-[11px] font-bold text-white bg-[#183F32] rounded-full tabular-nums">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Desktop CTA */}
              <button
                onClick={() => handleNavClick('products')}
                className="hidden sm:inline-flex items-center justify-center gap-1.5 px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-white bg-[#183F32] hover:bg-[#285844] rounded-lg transition-colors shadow-xs cursor-pointer focus-visible:outline-2 focus-visible:outline-[#183F32]"
              >
                <span>Explore Products</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-[#183F32] hover:bg-[#E8F1DF]/50 rounded-md transition-colors cursor-pointer"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#183F32]/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl flex flex-col z-50">
            <div className="p-5 border-b border-[#AFC7A5]/20 flex items-center justify-between">
              <FarabiLogo variant="dark" size="sm" />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-[#26312B] hover:text-[#183F32] rounded-md cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-6 py-6 flex-1 overflow-y-auto">
              <div className="mb-4 pb-4 border-b border-[#E8F1DF]">
                <p className="text-xs uppercase tracking-widest text-[#285844] font-medium">
                  Traditional Botanical Care
                </p>
                <p className="font-urdu text-sm text-[#183F32] mt-0.5">
                  فارابی ہربل ویلنس
                </p>
              </div>

              <nav className="flex flex-col space-y-3" aria-label="Mobile Navigation">
                {navLinks.map((link) => {
                  const isActive = currentPage === link.page;
                  return (
                    <button
                      key={link.page}
                      onClick={() => handleNavClick(link.page)}
                      className={`text-left py-2.5 px-3 rounded-md text-base transition-colors cursor-pointer flex items-center justify-between ${
                        isActive
                          ? 'bg-[#E8F1DF] text-[#183F32] font-semibold'
                          : 'text-[#26312B] hover:bg-[#FAF9F3]'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-50" />
                    </button>
                  );
                })}
              </nav>

              <div className="mt-8 pt-6 border-t border-[#E8F1DF] space-y-3">
                <button
                  onClick={() => handleNavClick('products')}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold tracking-wider uppercase text-white bg-[#183F32] hover:bg-[#285844] rounded-lg transition-colors cursor-pointer"
                >
                  <span>Explore Products</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <div className="text-xs text-[#26312B]/70 space-y-1.5 pt-2">
                  <p>Inquiries: {siteConfig.contact.email}</p>
                  <p>WhatsApp: {siteConfig.contact.whatsappDisplay}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
