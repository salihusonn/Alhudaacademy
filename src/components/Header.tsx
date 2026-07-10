/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, GraduationCap, ChevronDown, Calendar, Sparkles, Globe } from 'lucide-react';
import { CURRENT_BATCH } from '../data/academyData';
import AlHudaLogo from './AlHudaLogo';
import { useLanguage } from '../lib/LanguageContext';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  onEnrollClick: () => void;
}

export default function Header({ onNavigate, activeSection, onEnrollClick }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { labelKey: 'nav.home', id: 'home' },
    { labelKey: 'nav.courses', id: 'courses' },
    { labelKey: 'nav.whyUs', id: 'why-us' },
    { labelKey: 'nav.mentors', id: 'mentors' },
    { labelKey: 'nav.howItWorks', id: 'how-it-works' },
    { labelKey: 'nav.faq', id: 'faq' },
    { labelKey: 'nav.contact', id: 'contact' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Main Navbar */}
      <div className={`transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-white/80 backdrop-blur-sm py-4 border-b border-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div 
              onClick={() => handleNavClick('home')} 
              className="flex items-center gap-3 cursor-pointer group"
              id="brand-logo"
            >
              <div className="relative w-12 h-12 flex items-center justify-center group-hover:scale-105 transition duration-300">
                <AlHudaLogo size={48} className="object-contain" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-heading font-extrabold text-slate-800 tracking-tight leading-none">
                  Al-Huda
                </h1>
                <p className="text-[10px] font-sans font-bold text-brand-emerald uppercase tracking-wider">
                  Digital Academy
                </p>
              </div>
            </div>

            {/* Desktop Nav Items */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 cursor-pointer ${
                    activeSection === item.id
                      ? 'bg-teal-50 text-brand-emerald'
                      : 'text-slate-600 hover:text-brand-emerald hover:bg-slate-50'
                  }`}
                >
                  {t(item.labelKey)}
                </button>
              ))}
            </nav>

            {/* Right side CTA & Language Switcher */}
            <div className="hidden sm:flex items-center gap-4">
              {/* Segmented language switcher control */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-600 border border-slate-200/80 mr-1" id="desktop-lang-switcher">
                <button 
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${language === 'en' ? 'bg-white text-brand-emerald shadow-xs' : 'hover:text-brand-emerald text-slate-500'}`}
                >
                  English
                </button>
                <button 
                  onClick={() => setLanguage('ha')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${language === 'ha' ? 'bg-white text-brand-emerald shadow-xs' : 'hover:text-brand-emerald text-slate-500'}`}
                >
                  Hausa
                </button>
              </div>

              <button
                onClick={() => handleNavClick('mentors')}
                className="text-sm font-semibold text-brand-gold hover:text-amber-800 transition cursor-pointer whitespace-nowrap"
              >
                {t('nav.mentors')}
              </button>
              <button
                onClick={onEnrollClick}
                className="bg-brand-emerald text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-teal-800/10 hover:bg-brand-gold transition duration-300 hover:scale-[1.02] cursor-pointer whitespace-nowrap"
                id="header-enroll-btn"
              >
                {t('nav.enrollBtn')}
              </button>
            </div>

            {/* Mobile Actions: directly contains compact toggle */}
            <div className="flex sm:hidden items-center gap-2">
              <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-[10px] font-bold text-slate-600 border border-slate-200" id="mobile-lang-switcher-header">
                <button 
                  onClick={() => setLanguage('en')}
                  className={`px-2 py-1 rounded transition-all cursor-pointer ${language === 'en' ? 'bg-white text-brand-emerald shadow-xs' : 'text-slate-500'}`}
                >
                  EN
                </button>
                <button 
                  onClick={() => setLanguage('ha')}
                  className={`px-2 py-1 rounded transition-all cursor-pointer ${language === 'ha' ? 'bg-white text-brand-emerald shadow-xs' : 'text-slate-500'}`}
                >
                  HA
                </button>
              </div>
              
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-slate-600 hover:text-brand-emerald hover:bg-slate-100 transition cursor-pointer"
                aria-label="Toggle menu"
                id="menu-toggle"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Tablet Menu Toggle (hidden on small screens, shown when sm but not lg) */}
            <div className="hidden sm:flex lg:hidden items-center gap-3">
              <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-[10px] font-bold text-slate-600 border border-slate-200" id="tablet-lang-switcher-header">
                <button 
                  onClick={() => setLanguage('en')}
                  className={`px-2.5 py-1 rounded transition-all cursor-pointer ${language === 'en' ? 'bg-white text-brand-emerald shadow-xs' : 'text-slate-500'}`}
                >
                  EN
                </button>
                <button 
                  onClick={() => setLanguage('ha')}
                  className={`px-2.5 py-1 rounded transition-all cursor-pointer ${language === 'ha' ? 'bg-white text-brand-emerald shadow-xs' : 'text-slate-500'}`}
                >
                  HA
                </button>
              </div>
              
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-slate-600 hover:text-brand-emerald hover:bg-slate-100 transition cursor-pointer"
                aria-label="Toggle menu"
                id="menu-toggle-tablet"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-xl border-b border-slate-100 py-4 px-6 animate-fade-in">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg text-base font-semibold transition cursor-pointer ${
                  activeSection === item.id
                    ? 'bg-teal-50 text-brand-emerald'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-brand-emerald'
                }`}
              >
                {t(item.labelKey)}
              </button>
            ))}
            <div className="h-px bg-slate-100 my-2"></div>
            <div className="flex flex-col gap-3 pt-2">
              <button
                onClick={() => handleNavClick('mentors')}
                className="text-center py-2.5 rounded-lg border border-brand-gold text-brand-gold font-bold text-sm hover:bg-amber-50 transition cursor-pointer"
              >
                {t('nav.mentors')}
              </button>
              <button
                onClick={() => {
                  onEnrollClick();
                  setIsOpen(false);
                }}
                className="text-center py-2.5 rounded-lg bg-brand-emerald text-white font-bold text-sm shadow-md hover:bg-brand-gold transition cursor-pointer"
                id="mobile-enroll-btn"
              >
                {t('nav.enrollBtn')}
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

