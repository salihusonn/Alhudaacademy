/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, CheckCircle } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

interface CountUpProps {
  value: string;
}

function CountUp({ value }: CountUpProps) {
  const [displayValue, setDisplayValue] = useState('');

  useEffect(() => {
    if (value === 'Loading...') {
      setDisplayValue('Loading...');
      return;
    }

    const match = value.match(/^([\d.]+)(.*)$/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const [, numStr, suffix] = match;
    const target = parseFloat(numStr);
    if (isNaN(target)) {
      setDisplayValue(value);
      return;
    }

    const isFloat = numStr.includes('.');
    const duration = 1200; // Animation duration in ms
    const frameRate = 60;
    const totalFrames = Math.round((duration / 1000) * frameRate);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const easedProgress = progress * (2 - progress); // easeOutQuad
      const current = easedProgress * target;

      if (frame >= totalFrames) {
        clearInterval(timer);
        setDisplayValue(value);
      } else {
        const formatted = isFloat ? current.toFixed(1) : Math.floor(current).toString();
        setDisplayValue(formatted + suffix);
      }
    }, 1000 / frameRate);

    return () => clearInterval(timer);
  }, [value]);

  return <>{displayValue}</>;
}

interface HeroProps {
  onNavigate: (sectionId: string) => void;
  onEnrollClick: () => void;
}

export default function Hero({ onNavigate, onEnrollClick }: HeroProps) {
  const { language, stats, t } = useLanguage();

  return (
    <section 
      id="home" 
      className="relative pt-24 pb-12 sm:pt-28 md:pb-16 overflow-hidden bg-slate-50"
    >
      {/* Dynamic Background visual aids */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none -z-10 opacity-30">
        <div className="absolute top-12 left-10 w-72 h-72 bg-[#075C33]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-12 right-10 w-72 h-72 bg-[#B08922]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Decorative Top Accent badge */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-[#075C33] shadow-sm">
            <Sparkles className="w-4 h-4 text-[#B08922] animate-pulse" />
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest">
              {language === 'en' ? 'EMPOWERING THE FUTURE THROUGH DIGITAL SKILLS' : 'INGANTA RAYUWA TA HANYAR FASAHAR DIJITAL'}
            </span>
          </div>
        </div>

        {/* High-Impact Typographic Heading & Course Badges */}
        <div className="text-center max-w-4xl mx-auto mb-10 mt-4 space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-none">
            {language === 'en' ? (
              <>
                Master In-Demand <br className="hidden sm:inline" />
                <span className="relative inline-block text-[#075C33] mt-2 pb-2">
                  Digital Skills
                  <span className="absolute bottom-0 left-0 w-full h-1.5 bg-[#B08922] rounded-full opacity-40"></span>
                </span>
              </>
            ) : (
              <>
                Kware a Manyan <br className="hidden sm:inline" />
                <span className="relative inline-block text-[#075C33] mt-2 pb-2">
                  Fasahar Dijital
                  <span className="absolute bottom-0 left-0 w-full h-1.5 bg-[#B08922] rounded-full opacity-40"></span>
                </span>
              </>
            )}
          </h1>

          {/* Key Course Tags styled elegantly in Al-Huda Brand Colors */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 max-w-3xl mx-auto pt-2">
            <span className="px-5 py-2.5 rounded-xl bg-[#075C33] text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-950/10 hover:scale-[1.03] transition duration-200">
              {language === 'en' ? 'Graphic Design' : 'Zane da Waya'}
            </span>
            <span className="px-5 py-2.5 rounded-xl bg-[#B08922] text-white text-xs sm:text-sm font-bold shadow-md shadow-amber-950/10 hover:scale-[1.03] transition duration-200">
              {language === 'en' ? 'Digital Marketing' : 'Tallan Dijital'}
            </span>
            <span className="px-5 py-2.5 rounded-xl bg-[#B08922] text-white text-xs sm:text-sm font-bold shadow-md shadow-amber-950/10 hover:scale-[1.03] transition duration-200">
              {language === 'en' ? 'Video Editing' : 'Gyaran Bidiyo'}
            </span>
            <span className="px-5 py-2.5 rounded-xl bg-[#075C33] text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-950/10 hover:scale-[1.03] transition duration-200">
              {language === 'en' ? 'AI Learning' : 'Koyon AI'}
            </span>
          </div>
        </div>

        {/* 2. Brand Standard Companion Interactive CTA Block */}
        <div className="max-w-3xl mx-auto text-center space-y-6">
          
          <p className="text-xs sm:text-sm md:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed font-sans font-semibold">
            {t('hero.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('courses')}
              className="w-full sm:w-auto bg-[#075C33] hover:bg-[#0d834b] text-white text-sm sm:text-base font-extrabold px-8 py-3.5 rounded-xl shadow-md shadow-emerald-900/10 transition duration-200 hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{t('hero.cta.browse')}</span>
              <ArrowRight className="w-4 h-4 text-[#B08922]" />
            </button>

            <button
              onClick={onEnrollClick}
              className="w-full sm:w-auto bg-[#B08922] hover:bg-amber-700 text-white text-sm sm:text-base font-extrabold px-8 py-3.5 rounded-xl shadow-md shadow-amber-900/10 transition duration-200 hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer"
              id="hero-enroll-btn"
            >
              <span>{t('hero.cta.start')}</span>
            </button>
          </div>

          {/* Verification highlights */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] sm:text-xs font-bold text-slate-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-[#B08922] shrink-0" />
              <span>{language === 'en' ? '100% Practical Bootcamps' : '100% Horaswa ta Zahiri'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-[#B08922] shrink-0" />
              <span>{language === 'en' ? 'Live Practical Projects' : 'Ayyuka na Kai Tsaye'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-[#B08922] shrink-0" />
              <span>{language === 'en' ? 'Verifiable Certificates' : 'Shaidar Karatu Mai Tabbaci'}</span>
            </div>
          </div>
        </div>

        {/* 3. Floating Stats Counter Dashboard Block */}
        <div className="max-w-5xl mx-auto w-full mt-12 md:mt-16">
          <div className="bg-white border border-slate-100 rounded-2xl md:rounded-3xl p-6 sm:p-8 shadow-md shadow-slate-100/40 grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {stats.map((stat, idx) => {
              const isOdd = idx % 2 === 0;
              const isLastInRowDesktop = (idx + 1) % 3 === 0;
              const itemBorderClass = `space-y-1 text-center sm:text-left ${
                isOdd ? 'border-r border-slate-100 pr-4' : 'pr-0'
              } ${
                isLastInRowDesktop ? 'md:border-r-0 md:pr-0' : 'md:border-r md:border-slate-100 md:pr-4'
              }`;

              return (
                <div 
                  key={idx} 
                  className={itemBorderClass}
                >
                  <span className="block text-2xl sm:text-3xl font-heading font-extrabold text-[#075C33] tracking-tight">
                    <CountUp value={stat.value} />
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-700">
                    {stat.label}
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-normal font-medium">
                    {stat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

