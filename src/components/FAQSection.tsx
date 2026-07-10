/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search, Sparkles } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { FAQS_EN, FAQS_HA } from '../data/translations';

export default function FAQSection() {
  const { language } = useLanguage();
  const [openIndex, setOpenIndex] = useState<string | null>('faq1');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const toggleAccordion = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  const categories = [
    { label: language === 'en' ? 'All FAQs' : 'Duk Tambayoyi', value: 'all' },
    { label: language === 'en' ? 'General Info' : 'Bayanai na Gari', value: 'general' },
    { label: language === 'en' ? 'Admissions & Pricing' : 'Rajista & Kudin Makaranta', value: 'admissions' },
    { label: language === 'en' ? 'Certificates' : 'Shaidun Karatu', value: 'certificates' },
    { label: language === 'en' ? 'Technical Details' : 'Kayan Aiki na Fasaha', value: 'technical' },
  ];

  const faqs = language === 'en' ? FAQS_EN : FAQS_HA;

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="faq" className="py-20 md:py-28 bg-slate-50 relative">
      <div className="absolute top-10 right-10 w-96 h-96 bg-teal-50/50 -z-10 blur-3xl rounded-full"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-100 text-brand-emerald text-xs font-bold tracking-wider uppercase">
            <HelpCircle className="w-3.5 h-3.5 text-brand-gold-light" />
            <span>{language === 'en' ? 'Answers to your Queries' : 'Amsoshin Tambayoyinku'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-800 tracking-tight">
            {language === 'en' ? (
              <>
                Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-emerald to-teal-600">Questions</span>
              </>
            ) : (
              <>
                Tambayoyin da Ake <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-emerald to-teal-600">Yawan Yi</span>
              </>
            )}
          </h2>
          <p className="text-sm sm:text-base text-slate-500 font-medium">
            {language === 'en'
              ? 'Find answers to common questions about admissions, hardware, certificates, and our online guided curriculum format.'
              : 'Nemi amsoshi cikin sauri ga tambayoyin gama gari game da shiga karatu, kayan aiki, takaddun shaida, da tsarin karatunmu.'
            }
          </p>
        </div>

        {/* Filter and Search Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
          {/* Categories select pills */}
          <div className="flex gap-2 overflow-x-auto w-full sm:w-auto pb-2 scrollbar-none -mx-4 px-4 sm:px-0">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  selectedCategory === cat.value
                    ? 'bg-brand-emerald text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:max-w-xs shrink-0">
            <input
              type="text"
              placeholder={language === 'en' ? 'Search FAQs...' : 'Nemi Tambayoyi...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-brand-emerald transition"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* FAQ Accordions Grid */}
        {filteredFaqs.length > 0 ? (
          <div className="space-y-4">
            {filteredFaqs.map((faq) => {
              const isOpen = openIndex === faq.id;
              return (
                <div 
                  key={faq.id}
                  className="bg-white border border-slate-100 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm"
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full text-left p-5 sm:p-6 flex justify-between items-center gap-4 hover:bg-slate-50/50 transition cursor-pointer"
                  >
                    <span className="font-heading font-extrabold text-slate-800 text-sm sm:text-base">
                      {faq.question}
                    </span>
                    <span className="p-1.5 rounded-lg bg-teal-50 text-brand-emerald shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 animate-fade-in border-t border-slate-50/50">
                      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-semibold">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-100 p-8 text-center max-w-sm mx-auto space-y-3">
            <h4 className="font-heading font-extrabold text-slate-800 text-sm">
              {language === 'en' ? 'No FAQs found' : 'Babu tambayar da aka samu'}
            </h4>
            <p className="text-xs text-slate-400 font-medium">
              {language === 'en' 
                ? `We couldn't find any FAQs matching your query "${searchQuery}". Try refiltering categories.`
                : `Ba mu sami tambayar da ta dace da bincikenku ba "${searchQuery}". Gwada sake tace rukuni.`
              }
            </p>
          </div>
        )}

        {/* Callout Footer */}
        <div className="mt-12 text-center p-6 bg-white border border-slate-100 rounded-2xl max-w-lg mx-auto shadow-sm space-y-2.5">
          <p className="text-xs sm:text-sm text-slate-500 font-semibold">
            {language === 'en' ? 'Still have questions that are not answered here?' : 'Kuna da sauran tambayoyin da ba a amsa muku a nan ba?'}
          </p>
          <button
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-xs font-bold text-brand-emerald hover:text-teal-800 underline cursor-pointer"
          >
            {language === 'en' ? 'Ask our admission counselors directly via our query form' : 'Tambayi masu jagorantar rajistarmu kai tsaye ta hanyar fom dinmu'}
          </button>
        </div>

      </div>
    </section>
  );
}
