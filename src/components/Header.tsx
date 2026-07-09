/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, GraduationCap, ChevronDown, Calendar, Sparkles } from 'lucide-react';
import { CURRENT_BATCH } from '../data/academyData';
import AlHudaLogo from './AlHudaLogo';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  onEnrollClick: () => void;
}

export default function Header({ onNavigate, activeSection, onEnrollClick }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);


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
    { label: 'Home', id: 'home' },
    { label: 'Courses', id: 'courses' },
    { label: 'Why Us', id: 'why-us' },
    { label: 'Our Mentors', id: 'mentors' },
    { label: 'How It Works', id: 'how-it-works' },
    { label: 'Success Stories', id: 'stories' },
    { label: 'FAQs', id: 'faq' },
    { label: 'Contact', id: 'contact' },
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
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Right side CTA */}
            <div className="hidden sm:flex items-center gap-4">
              <button
                onClick={() => handleNavClick('mentors')}
                className="text-sm font-semibold text-brand-gold hover:text-amber-800 transition cursor-pointer"
              >
                Meet Mentors
              </button>
              <button
                onClick={onEnrollClick}
                className="bg-brand-emerald text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-teal-800/10 hover:bg-brand-gold transition duration-300 hover:scale-[1.02] cursor-pointer"
                id="header-enroll-btn"
              >
                Enroll Now
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-slate-600 hover:text-brand-emerald hover:bg-slate-100 transition cursor-pointer"
                aria-label="Toggle menu"
                id="menu-toggle"
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
                {item.label}
              </button>
            ))}
            <div className="h-px bg-slate-100 my-2"></div>
            <div className="flex flex-col gap-3 pt-2">
              <button
                onClick={() => handleNavClick('mentors')}
                className="text-center py-2.5 rounded-lg border border-brand-gold text-brand-gold font-bold text-sm hover:bg-amber-50 transition cursor-pointer"
              >
                Meet Our Mentors
              </button>
              <button
                onClick={() => {
                  onEnrollClick();
                  setIsOpen(false);
                }}
                className="text-center py-2.5 rounded-lg bg-brand-emerald text-white font-bold text-sm shadow-md hover:bg-brand-gold transition cursor-pointer"
                id="mobile-enroll-btn"
              >
                Enroll Now
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
