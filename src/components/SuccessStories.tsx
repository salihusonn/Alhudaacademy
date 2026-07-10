/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Star, Quote, Sparkles, ChevronLeft, ChevronRight, Award } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { TESTIMONIALS_EN, TESTIMONIALS_HA } from '../data/translations';

export default function SuccessStories() {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = language === 'en' ? TESTIMONIALS_EN : TESTIMONIALS_HA;

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
  };

  const currentStory = testimonials[currentIndex];

  return (
    <section id="stories" className="py-20 md:py-28 bg-white relative">
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-teal-50/50 -z-10 blur-3xl rounded-full"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-100 text-brand-emerald text-xs font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold-light" />
            <span>{language === 'en' ? 'Graduate Success Spotlight' : 'Hasken Nasarar Karatu'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-800 tracking-tight">
            {language === 'en' ? (
              <>
                From Al-Huda Students to <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-emerald to-teal-600">Global Professionals</span>
              </>
            ) : (
              <>
                Daga Dalibai Zuwa <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-emerald to-teal-600">Kwararrun Duniya</span>
              </>
            )}
          </h2>
          <p className="text-sm sm:text-base text-slate-500 font-medium">
            {language === 'en'
              ? 'Read inspiring stories of real individuals who took control of their financial destinies by acquiring digital skills through our online bootcamps.'
              : 'Karanta labarai masu ban sha\'awa na matasan da suka dauki iko da makomarsu ta kudi ta hanyar samun kwarewar fasahar zamani.'
            }
          </p>
        </div>

        {/* Carousel Container */}
        <div className="max-w-4xl mx-auto bg-slate-50 border border-slate-100 rounded-3xl p-6 sm:p-10 relative shadow-xl shadow-slate-100/50">
          
          {/* Quote Mark Icon background decorative */}
          <div className="absolute -top-4 -left-4 w-12 h-12 rounded-2xl bg-brand-emerald text-white flex items-center justify-center shadow-lg shadow-teal-900/10">
            <Quote className="w-6 h-6 fill-current" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Student Avatar / Photo */}
            <div className="md:col-span-4 flex flex-col items-center text-center space-y-3">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden border-4 border-white shadow-xl relative">
                <img
                  src={currentStory.avatarUrl}
                  alt={currentStory.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-heading font-extrabold text-slate-800 text-base">{currentStory.name}</h4>
                <p className="text-xs text-brand-emerald font-bold">{currentStory.role}</p>
                {currentStory.company && (
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{currentStory.company}</p>
                )}
              </div>
            </div>

            {/* Quote details */}
            <div className="md:col-span-8 space-y-4">
              {/* Star Rating */}
              <div className="flex items-center gap-1 text-brand-gold-light">
                {Array.from({ length: currentStory.rating }).map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-current" />
                ))}
              </div>

              {/* Core testimonial */}
              <p className="text-sm sm:text-base text-slate-600 italic font-medium leading-relaxed">
                "{currentStory.quote}"
              </p>

              {/* Course Completed Detail Tag */}
              <div className="border-t border-slate-100/80 pt-4 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-1.5 text-slate-500 font-semibold">
                  <Award className="w-4 h-4 text-brand-gold" />
                  <span>
                    {language === 'en' ? 'Completed: ' : 'Ya Kammala: '}
                    <strong className="text-slate-700">{currentStory.courseCompleted}</strong>
                  </span>
                </div>
                <span className="bg-white border border-slate-200 text-slate-400 text-[10px] font-bold px-2 py-0.5 rounded-lg">
                  {language === 'en' ? `Graduate of ${currentStory.year}` : `Dalibin Shekarar ${currentStory.year}`}
                </span>
              </div>
            </div>

          </div>

          {/* Slider controls button overlays */}
          <div className="flex justify-end gap-2.5 mt-6 border-t border-slate-100 pt-4">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-brand-emerald hover:border-teal-200 hover:bg-teal-50/20 transition cursor-pointer"
              aria-label="Previous story"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-brand-emerald hover:border-teal-200 hover:bg-teal-50/20 transition cursor-pointer"
              aria-label="Next story"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* Quick highlight success stats grids */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-slate-50 border border-slate-100/70 p-6 rounded-2xl text-center space-y-1">
            <span className="block text-2xl font-heading font-extrabold text-slate-800">$1.2M+ USD</span>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
              {language === 'en' ? 'Earned by Freelance Alumni' : 'Kudin Da Dalibai Masu Zaman Kansu Suka Samu'}
            </p>
          </div>
          <div className="bg-slate-50 border border-slate-100/70 p-6 rounded-2xl text-center space-y-1">
            <span className="block text-2xl font-heading font-extrabold text-slate-800">92%</span>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
              {language === 'en' ? 'Employment or Gig Launch Rate' : 'Yawan Samun Aiki Ko Kwangila'}
            </p>
          </div>
          <div className="bg-slate-50 border border-slate-100/70 p-6 rounded-2xl text-center space-y-1">
            <span className="block text-2xl font-heading font-extrabold text-slate-800">4.8 / 5</span>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
              {language === 'en' ? 'Average Graduate Score rating' : 'Matsakaicin Kimar Dalibanda Suka Gama'}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
