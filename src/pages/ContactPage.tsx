import React, { useState } from 'react';
import { siteConfig } from '../config/siteConfig';
import { Mail, Phone, MapPin, Clock, MessageCircle, Send, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Product Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulated reliable frontend contact dispatch (Ready for Formspree / Hostinger endpoint)
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 600);
  };

  const openWhatsApp = () => {
    const text = `Salam FARAABEE Team,%0A%0AI have an inquiry regarding your herbal wellness products.`;
    window.open(`https://wa.me/${siteConfig.contact.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="bg-[#FAF9F3] min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contact Hero */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#285844]">
            GET IN TOUCH
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-[#183F32] mt-2">
            Contact FARAABEE
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#26312B]/75 leading-relaxed">
            Have questions regarding botanical preparations, custom orders, or wholesale inquiries? Our herbal desk in Lahore is at your service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-[#AFC7A5]/35 shadow-xs">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#E8F1DF] text-[#183F32] mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-[#285844]" />
                </div>
                <h3 className="font-serif text-2xl font-medium text-[#183F32]">
                  Message Dispatched
                </h3>
                <p className="text-sm text-[#26312B]/80 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out to FARAABEE Herbal Wellness. An apothecary advisor will review your note and respond within 24 business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 bg-[#183F32] text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#285844] transition-colors cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="font-serif text-2xl font-medium text-[#183F32] mb-1">
                    Send a Message
                  </h3>
                  <p className="text-xs text-[#26312B]/70">
                    Fill out the fields below and our herbal team will assist you.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#26312B] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tariq Faraabee"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-[#AFC7A5]/50 focus:border-[#183F32] focus:outline-none bg-[#FAF9F3]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#26312B] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-[#AFC7A5]/50 focus:border-[#183F32] focus:outline-none bg-[#FAF9F3]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#26312B] mb-1">
                      Phone / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 0300 1234567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-[#AFC7A5]/50 focus:border-[#183F32] focus:outline-none bg-[#FAF9F3]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#26312B] mb-1">
                      Subject Inquiry
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-[#AFC7A5]/50 focus:border-[#183F32] focus:outline-none bg-[#FAF9F3] text-[#26312B] cursor-pointer"
                    >
                      <option value="Product Inquiry">Product Inquiry</option>
                      <option value="Order Tracking">Order & Delivery Assistance</option>
                      <option value="Wholesale / Stockist">Wholesale & Stockist Inquiries</option>
                      <option value="Botanical Guidance">Botanical Usage Guidance</option>
                      <option value="General Feedback">General Note</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-[#26312B] mb-1">
                      Your Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="How may our herbalist desk assist you today?"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-[#AFC7A5]/50 focus:border-[#183F32] focus:outline-none bg-[#FAF9F3] text-[#26312B]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-6 bg-[#183F32] hover:bg-[#285844] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
                >
                  {loading ? (
                    <span>Transmitting...</span>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Direct Touchpoints & WhatsApp */}
          <div className="lg:col-span-5 space-y-6">
            {/* WhatsApp Quick Order Highlight Box */}
            <div className="p-6 rounded-3xl bg-[#183F32] text-white shadow-md space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-[#AFC7A5]" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-medium">
                    Immediate WhatsApp Desk
                  </h4>
                  <p className="text-xs text-[#FAF9F3]/70">
                    Connect directly with our team for prompt orders
                  </p>
                </div>
              </div>

              <p className="text-xs text-[#FAF9F3]/80 leading-relaxed">
                Prefer direct messaging? Send us a WhatsApp text with your requested herbal products, quantity, and delivery city for expedited dispatch.
              </p>

              <button
                onClick={openWhatsApp}
                className="w-full py-2.5 px-4 bg-[#AFC7A5] hover:bg-white text-[#183F32] text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp ({siteConfig.contact.whatsappDisplay})</span>
              </button>
            </div>

            {/* Direct Contact Points */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#AFC7A5]/35 shadow-xs space-y-5">
              <h4 className="font-serif text-lg font-semibold text-[#183F32] pb-3 border-b border-[#AFC7A5]/25">
                Headquarters & Hours
              </h4>

              <div className="space-y-4 text-xs sm:text-sm text-[#26312B]/85">
                <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-[#FAF9F3]/60 border border-[#AFC7A5]/30">
                  <div className="p-2 bg-[#E3EBDD] text-[#183F32] rounded-xl shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-[#183F32]" />
                  </div>
                  <div>
                    <span className="font-semibold text-[#183F32] block text-xs uppercase tracking-wider mb-0.5">
                      Apothecary Atelier & Headquarters
                    </span>
                    <span className="text-sm font-semibold text-[#183F32] leading-relaxed block tracking-wide">
                      {siteConfig.contact.address}, {siteConfig.contact.city}, {siteConfig.contact.country}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#285844] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#183F32] block">Business Hours</span>
                    <span>{siteConfig.contact.businessHours}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#285844] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#183F32] block">Electronic Correspondence</span>
                    <span>{siteConfig.contact.email}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#285844] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#183F32] block">Phone Desk</span>
                    <span>{siteConfig.contact.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
