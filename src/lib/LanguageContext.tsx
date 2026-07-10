import React, { createContext, useContext, useState, useEffect } from 'react';
import { TRANSLATIONS, COURSES_EN, COURSES_HA, ACADEMY_STATS_EN, ACADEMY_STATS_HA, TESTIMONIALS_EN, TESTIMONIALS_HA, FAQS_EN, FAQS_HA, BENEFITS_EN, BENEFITS_HA } from '../data/translations';
import { Course, Testimonial, FAQItem } from '../types';

export type Language = 'en' | 'ha';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, replacements?: Record<string, string>) => string;
  courses: Course[];
  stats: Array<{ label: string; value: string; description: string }>;
  testimonials: Testimonial[];
  faqs: FAQItem[];
  benefits: Array<{ id: string; title: string; description: string }>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const stored = localStorage.getItem('alhuda_lang');
      if (stored === 'en' || stored === 'ha') {
        return stored;
      }
    } catch (e) {
      console.warn('Could not read language preference from localStorage:', e);
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('alhuda_lang', lang);
    } catch (e) {
      console.warn('Could not save language preference to localStorage:', e);
    }
  };

  const t = (key: string, replacements?: Record<string, string>): string => {
    const translationEntry = TRANSLATIONS[key];
    if (!translationEntry) {
      console.warn(`Missing translation for key: "${key}"`);
      return key;
    }
    let val = translationEntry[language] || translationEntry['en'] || key;
    if (replacements) {
      Object.entries(replacements).forEach(([k, v]) => {
        val = val.replace(`{${k}}`, v);
      });
    }
    return val;
  };

  // Localized collections
  const courses = language === 'en' ? COURSES_EN : COURSES_HA;
  const stats = language === 'en' ? ACADEMY_STATS_EN : ACADEMY_STATS_HA;
  const testimonials = language === 'en' ? TESTIMONIALS_EN : TESTIMONIALS_HA;
  const faqs = language === 'en' ? FAQS_EN : FAQS_HA;
  const benefits = language === 'en' ? BENEFITS_EN : BENEFITS_HA;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, courses, stats, testimonials, faqs, benefits }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
