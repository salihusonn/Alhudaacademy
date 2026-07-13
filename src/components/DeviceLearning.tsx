/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Smartphone, Laptop, Wifi, Award, Sparkles } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export default function DeviceLearning() {
  const { language } = useLanguage();

  const features = [
    {
      icon: <Smartphone className="w-6 h-6 text-brand-emerald" />,
      title: language === 'en' ? 'Smartphone-Friendly Learning' : 'Koyo Mai Sauki A Waya',
      description: language === 'en' 
        ? 'Access all lessons and assignments on your smartphone.'
        : 'Samun damar duba dukkan darussa da ayyuka a kan wayar ku ta salula.',
    },
    {
      icon: <Laptop className="w-6 h-6 text-brand-emerald" />,
      title: language === 'en' ? 'Computer Compatibility' : 'Daidaito Da Kwamfuta',
      description: language === 'en'
        ? 'Learn seamlessly on desktop or laptop computers.'
        : 'Koyi karatu ba tare da wata matsala ba a kan kwamfyutar tafi-da-gidanka ko ta kan tebur.',
    },
    {
      icon: <Wifi className="w-6 h-6 text-brand-emerald" />,
      title: language === 'en' ? 'Flexible Online Access' : 'Saukin Shiga Ta Yanar Gizo',
      description: language === 'en'
        ? 'Study from home or anywhere with an internet connection.'
        : 'Yi karatu daga gida ko kuma a kowane wuri muddin kuna da intanet.',
    },
    {
      icon: <Award className="w-6 h-6 text-brand-emerald" />,
      title: language === 'en' ? 'Practical, Hands-On Training' : 'Horarwa Ta Zahiri',
      description: language === 'en'
        ? 'Build real-world skills through projects and guided exercises.'
        : 'Gina kwarewa ta zahiri ta hynar ayyuka da darussan koyarwa.',
    },
  ];

  return (
    <section id="device-learning" className="py-20 bg-slate-50 relative overflow-hidden">
      {/* Background ambient light effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-50/40 -z-10 blur-3xl rounded-full"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-brand-emerald text-xs font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold-light" />
            <span>{language === 'en' ? 'Learn Anywhere' : 'Koyi a Kowani Wuri'}</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-800 tracking-tight leading-tight">
            {language === 'en' ? (
              <>
                Learn Using Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-emerald to-emerald-700">Smartphone</span> or <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-emerald to-emerald-700">Computer</span>
              </>
            ) : (
              <>
                Koyi Karatu Ta Hanyar <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-emerald to-emerald-700">Wayar Salula</span> ko <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-emerald to-emerald-700">Kwamfuta</span>
              </>
            )}
          </h2>
          
          <p className="text-base text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
            {language === 'en'
              ? "At Al-Huda Digital Academy, you don't need expensive equipment to start learning. Our courses are designed to be accessible on both smartphones and computers, allowing you to learn anytime, anywhere, at your own pace."
              : "A Al-Huda Digital Academy, ba kwa bukatar kayan aiki masu tsada don fara koyo. An tsara darussanmu domin a iya samunsu a wayoyin salula da kwamfutoci, wanda hakan zai ba ku damar koyo a kowane lokaci, a kowane wuri, kuma cikin sauki."
            }
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 group flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Icon Container with gold brand color on hover */}
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center group-hover:bg-brand-emerald group-hover:text-white transition duration-300">
                  {React.cloneElement(feature.icon, {
                    className: 'w-6 h-6 text-brand-emerald group-hover:text-white transition duration-300'
                  })}
                </div>
                
                <h3 className="font-heading font-extrabold text-slate-800 text-base leading-snug group-hover:text-brand-emerald transition">
                  {feature.title}
                </h3>
                
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-semibold">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
