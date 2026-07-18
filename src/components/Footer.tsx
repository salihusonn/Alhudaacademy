/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import AlHudaLogo from './AlHudaLogo';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const { language } = useLanguage();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);


  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
    setEmail('');
  };

  const learningPaths = [
    { label: language === 'en' ? 'Web Development' : 'Ginin Yanar Gizo', id: 'courses' },
    { label: language === 'en' ? 'Creative Design' : 'Zane na Zamani', id: 'courses' },
    { label: language === 'en' ? 'Growth Marketing' : 'Tallace-tallace na Dijital', id: 'courses' },
    { label: language === 'en' ? 'Freelancing Mastery' : 'Kwarewar Freelancing', id: 'courses' },
    { label: language === 'en' ? 'Python & Data Labs' : 'Python & Ilimin Bayanai', id: 'courses' },
  ];

  const quickLinks = [
    { label: language === 'en' ? 'Explore Courses' : 'Duba Kwasa-kwasai', id: 'courses' },
    { label: language === 'en' ? 'Admissions FAQ' : 'Tambayoyin Shiga Makaranta', id: 'faq' },
    { label: language === 'en' ? 'How It Works' : 'Yadda Yake Aiki', id: 'how-it-works' },
    { label: language === 'en' ? 'Meet Our Mentors' : 'Hadu da Malamanmu', id: 'mentors' },
    { label: language === 'en' ? 'Inquiry Form' : 'Fom Din Tambayoyi', id: 'contact' },
  ];

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
      
      {/* Upper Newsletter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-slate-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-2">
            <span className="text-brand-gold-light text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 justify-center lg:justify-start">
              <span>{language === 'en' ? 'Stay Updated with Al-Huda' : 'Kasance da Al-Huda'}</span>
            </span>
            <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-white text-center lg:text-left">
              {language === 'en' ? 'Subscribe to our Admissions Newsletter' : 'Yi Rajistar Jaridar Mu Ta Shiga Makaranta'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 text-center lg:text-left font-semibold">
              {language === 'en'
                ? 'Get weekly announcements about free masterclasses, open batch scholarships, and remote job guides.'
                : 'Sami sanarwar mako-mako game da darussan kyauta, tallafin karatu na bude baki daya, da jagororin aiki na nesa.'
              }
            </p>
          </div>

          <div className="lg:col-span-6">
            {!isSubscribed ? (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto lg:mr-0">
                <input
                  type="email"
                  required
                  placeholder={language === 'en' ? 'Enter your email address...' : 'Shigar da adireshin imel dinka...'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-850 border border-slate-800 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-brand-emerald-light flex-1"
                />
                <button
                  type="submit"
                  className="bg-brand-emerald hover:bg-brand-gold text-white font-bold px-6 py-3 rounded-xl transition duration-200 flex items-center justify-center gap-1.5 shrink-0 cursor-pointer text-sm"
                >
                  <span>{language === 'en' ? 'Subscribe' : 'Yi Rajista'}</span>
                </button>
              </form>
            ) : (
              <div className="flex items-center gap-2 bg-teal-950/40 border border-teal-900 text-brand-emerald-light p-4 rounded-2xl max-w-md mx-auto lg:mr-0 justify-center animate-fade-in text-xs font-bold">
                <span>
                  {language === 'en' 
                    ? 'Subscription Saved! Check inbox for free guide material.' 
                    : 'An ajiye rajistarka! Duba imel dinka don samun kayan koyo kyauta.'
                  }
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Multi-Column Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Brand Information */}
        <div className="space-y-6">
          <div 
            onClick={() => onNavigate('home')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative w-12 h-12 flex items-center justify-center group-hover:scale-105 transition duration-300">
              <AlHudaLogo size={48} className="object-contain" />
            </div>
            <div>
              <h2 className="text-white text-lg font-heading font-extrabold tracking-tight">Al-Huda</h2>
              <p className="text-[10px] text-brand-emerald-light font-sans font-bold uppercase tracking-wider">Digital Academy</p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-semibold">
            {language === 'en'
              ? 'Al-Huda Digital Academy is dedicated to providing premium digital skills training and mentorship, guiding students into highly compensated, flexible, and remote tech careers worldwide.'
              : 'Al-Huda Digital Academy ta sadaukar da kanta wajen samar da ingantaccen horo da jagoranci na fasahar dijital, tare da jagorantar dalibai zuwa manyan ayyukan yi na nesa a fadin duniya.'
            }
          </p>

          <div className="flex gap-3 pt-1">
            {[
              { icon: <Facebook className="w-4 h-4" />, href: 'https://www.facebook.com/profile.php?id=100094286896470' },
              { icon: <Twitter className="w-4 h-4" />, href: 'https://twitter.com' },
              { icon: <Instagram className="w-4 h-4" />, href: 'https://instagram.com' },
              { icon: <Linkedin className="w-4 h-4" />, href: 'https://linkedin.com' },
            ].map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-brand-emerald-light hover:bg-slate-800 transition"
              >
                {item.icon}
              </a>
            ))}
          </div>

          <p className="text-xs text-slate-500 font-bold">
            © {new Date().getFullYear()} Al-Huda Digital Academy. {language === 'en' ? 'All Rights Reserved.' : 'Duk Hakkoki Suna Kariya.'}
          </p>
        </div>

        {/* Learning Paths Links */}
        <div className="space-y-4">
          <h4 className="text-white font-heading font-bold text-sm uppercase tracking-wider">
            {language === 'en' ? 'Learning Paths' : 'Hanyoyin Koyo'}
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm">
            {learningPaths.map((link, idx) => (
              <li key={idx}>
                <button
                  onClick={() => onNavigate(link.id)}
                  className="hover:text-white transition duration-200 cursor-pointer text-left"
                >
                  {link.label} Bootcamp
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Help Resources Links */}
        <div className="space-y-4">
          <h4 className="text-white font-heading font-bold text-sm uppercase tracking-wider">
            {language === 'en' ? 'Resources' : 'Abubuwan Taimako'}
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm">
            {quickLinks.map((link, idx) => (
              <li key={idx}>
                <button
                  onClick={() => onNavigate(link.id)}
                  className="hover:text-white transition duration-200 cursor-pointer text-left"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Platform Contact details */}
        <div className="space-y-4">
          <h4 className="text-white font-heading font-bold text-sm uppercase tracking-wider">
            {language === 'en' ? 'Contact Head Office' : 'Tuntubi Babban Ofishinmu'}
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-400 font-semibold leading-relaxed">
            <li>
              <span>{language === 'en' ? 'Borno, Maiduguri, Nigeria' : 'Borno, Maiduguri, Najeriya'}</span>
            </li>
            <li className="pt-2">
              <span className="block text-[10px] uppercase text-slate-500 font-extrabold">
                {language === 'en' ? 'Support Direct Email:' : 'Imel Din Taimako Kai Tsaye:'}
              </span>
              <a 
                href="mailto:alhudadigitalacademy01@gmail.com"
                className="text-brand-emerald-light hover:underline font-bold"
              >
                alhudadigitalacademy01@gmail.com
              </a>
            </li>
            <li className="pt-2">
              <span className="block text-[10px] uppercase text-slate-500 font-extrabold">
                {language === 'en' ? 'Admissions Helpline:' : 'Layin Taimakon Rajista:'}
              </span>
              <a 
                href="tel:+2349028149646"
                className="text-white hover:underline font-bold"
              >
                +234 902 814 9646
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Sub Footer with disclaimer and terms links */}
      <div className="bg-slate-950 py-6 text-center text-[11px] text-slate-600 font-bold border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>
            {language === 'en'
              ? 'Al-Huda Digital Academy is a registered professional training center. All certificates carry unique verifiable hash tokens.'
              : 'Al-Huda Digital Academy cibiyar horarwa ce ta kwararru mai rijista. Duk shaidun karatu suna dauke da lambobin tabbatarwa na musamman.'
            }
          </p>
          <div className="flex gap-4">
            <button className="hover:text-slate-400 transition cursor-pointer">
              {language === 'en' ? 'Terms & Conditions' : 'Sharuda & Dokoki'}
            </button>
            <button className="hover:text-slate-400 transition cursor-pointer">
              {language === 'en' ? 'Privacy Policy' : 'Tsarin Tsare Sirri'}
            </button>
          </div>
        </div>
      </div>

    </footer>
  );
}
