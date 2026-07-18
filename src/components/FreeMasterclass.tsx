/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useLanguage } from '../lib/LanguageContext';

export default function FreeMasterclass() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    masterclass: 'Graphic Design', // default selected option
  });
  
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to LocalStorage
    try {
      const existing = JSON.parse(localStorage.getItem('alhuda_masterclass_registrations') || '[]');
      existing.push({
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        masterclass: formData.masterclass,
        date: new Date().toISOString(),
      });
      localStorage.setItem('alhuda_masterclass_registrations', JSON.stringify(existing));
    } catch (err) {
      console.warn('LocalStorage save failed:', err);
    }

    setIsSuccess(true);
  };

  return (
    <section id="free-masterclass" className="py-20 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
      {/* Decorative background visual elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#075C33]/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#B08922]/5 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Context & Information */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-[#075C33] text-xs font-bold tracking-wider uppercase">
              <span>{language === 'en' ? 'Limited Seats Available' : 'Gurbi Kalilan Ne Ya Rage'}</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-slate-900 tracking-tight leading-tight">
              {language === 'en' ? (
                <>
                  Free 2-Day <br />
                  <span className="text-[#075C33]">Intensive Masterclass</span>
                </>
              ) : (
                <>
                  Horon Kwana 2 <br />
                  <span className="text-[#075C33]">Kyauta na Musamman</span>
                </>
              )}
            </h2>

            <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-2xl">
              {language === 'en'
                ? 'Experience practical digital skills training in a free 2-day intensive masterclass designed for beginners.'
                : 'Kware a kan fasahar dijital ta hanyar horarwa ta zahiri na kwana biyu kyauta, wanda aka tsara shi musamman domin sababbin koya.'
              }
            </p>

            {/* What you get list */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div>
                  <h4 className="font-bold text-slate-800 text-sm sm:text-base">
                    {language === 'en' ? '100% Free & No Hidden Fees' : 'Kyauta 100% Ba tare da Boyayyen Kudi Ba'}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500 font-semibold leading-relaxed">
                    {language === 'en' 
                      ? 'No credit card or payments required. Simply join and start learning.'
                      : 'Ba a bukatar katin kuɗi ko biyan kuɗi. Shiga kawai ka fara koyo.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div>
                  <h4 className="font-bold text-slate-800 text-sm sm:text-base">
                    {language === 'en' ? 'Live Interactive Project' : 'Ayyukan Koyo Na Kai Tsaye'}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500 font-semibold leading-relaxed">
                    {language === 'en' 
                      ? 'Create a real-world project within 48 hours under expert guidance.'
                      : 'Gudanar da aiki na gaske a cikin sa\'o\'i 48 a ƙarƙashin jagorancin ƙwararru.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div>
                  <h4 className="font-bold text-slate-800 text-sm sm:text-base">
                    {language === 'en' ? 'WhatsApp Learning Group Access' : 'Samun Shiga Rukunin WhatsApp'}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500 font-semibold leading-relaxed">
                    {language === 'en' 
                      ? 'Get lifetime access to the discussion channel and updates.'
                      : 'Sami damar shiga rukunin tattaunawa har abada don duba sababbin bayanai.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Registration Card */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-slate-100 shadow-xl rounded-3xl p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#075C33] to-[#B08922]"></div>
              
              {!isSuccess ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1">
                    <h3 className="text-lg sm:text-xl font-heading font-extrabold text-slate-800 tracking-tight">
                      {language === 'en' ? 'Register For Free' : 'Yi Rajista Kyauta'}
                    </h3>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                      {language === 'en' ? 'Quick 1-Minute Registration' : 'Rajista Mai Sauri Cikin Minti 1'}
                    </p>
                  </div>

                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                      {language === 'en' ? 'Full Name' : 'Cikakken Suna'} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="fullName"
                        required
                        placeholder={language === 'en' ? 'e.g. Adam s Adam' : 'Misali: Adam s Adam'}
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl pl-4 pr-4 py-3 text-sm focus:outline-none focus:border-[#075C33] focus:bg-white transition font-medium"
                      />
                    </div>
                  </div>

                  {/* Phone Number field */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                      {language === 'en' ? 'Phone Number / WhatsApp' : 'Lambar Waya / WhatsApp'} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="e.g. +234 803 123 4567"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl pl-4 pr-4 py-3 text-sm focus:outline-none focus:border-[#075C33] focus:bg-white transition font-medium"
                      />
                    </div>
                  </div>

                  {/* Email Address field (Optional) */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                      {language === 'en' ? 'Email Address (Optional)' : 'Imel Adireshin (Na Zabi)'}
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        placeholder="e.g. example@domain.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl pl-4 pr-4 py-3 text-sm focus:outline-none focus:border-[#075C33] focus:bg-white transition font-medium"
                      />
                    </div>
                  </div>

                  {/* Choose Masterclass Radio buttons */}
                  <div className="space-y-2.5">
                    <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                      {language === 'en' ? 'Choose Your Masterclass' : 'Zabi Masterclass Dinka'} <span className="text-red-500">*</span>
                    </label>
                    
                    <div className="grid grid-cols-1 gap-3">
                      {/* Graphic Design option */}
                      <label 
                        className={`flex items-center gap-3.5 p-3.5 rounded-xl border-2 cursor-pointer transition ${
                          formData.masterclass === 'Graphic Design' 
                            ? 'bg-emerald-50/50 border-[#075C33]' 
                            : 'bg-slate-50 border-slate-200 hover:bg-slate-100/50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="masterclass"
                          value="Graphic Design"
                          checked={formData.masterclass === 'Graphic Design'}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-[#075C33] border-slate-300 focus:ring-[#075C33]"
                        />
                        <span className="text-xs sm:text-sm font-extrabold text-slate-700">
                          {language === 'en' ? 'Graphic Design Masterclass' : 'Kwas na Zane da Waya'}
                        </span>
                      </label>

                      {/* Video Editing option */}
                      <label 
                        className={`flex items-center gap-3.5 p-3.5 rounded-xl border-2 cursor-pointer transition ${
                          formData.masterclass === 'Video Editing' 
                            ? 'bg-emerald-50/50 border-[#075C33]' 
                            : 'bg-slate-50 border-slate-200 hover:bg-slate-100/50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="masterclass"
                          value="Video Editing"
                          checked={formData.masterclass === 'Video Editing'}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-[#075C33] border-slate-300 focus:ring-[#075C33]"
                        />
                        <span className="text-xs sm:text-sm font-extrabold text-slate-700">
                          {language === 'en' ? 'Video Editing Masterclass' : 'Kwas na Gyaran Bidiyo'}
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full mt-2 bg-[#075C33] hover:bg-[#0c7040] text-white text-xs sm:text-sm font-extrabold py-3.5 rounded-xl shadow-lg shadow-emerald-900/10 transition duration-200 hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{language === 'en' ? 'Register for Free Masterclass' : 'Yi Rajistar Masterclass Kyauta'}</span>
                  </button>
                </form>
              ) : (
                /* Success Card Layout */
                <div className="space-y-6 text-center py-6 animate-fade-in">
                  <div className="space-y-2">
                    <h3 className="text-xl font-heading font-extrabold text-slate-800 tracking-tight">
                      {language === 'en' ? 'Registration Successful!' : 'Rajista Ta Tabbata!'}
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-semibold">
                      {language === 'en' 
                        ? 'Registration Successful! Thank you for registering for our Free 2-Day Intensive Masterclass. We will contact you via WhatsApp with the class schedule and joining instructions.'
                        : 'Rajista ta yi nasara! Mun gode da yin rajista don Shiga Horon Kwana 2 na Kyauta. Za mu tuntuɓe ku ta WhatsApp tare da jadawalin aji da umarnin shiga.'}
                    </p>
                  </div>

                  <button
                    onClick={() => setIsSuccess(false)}
                    className="mt-4 px-6 py-2.5 bg-[#B08922] hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition duration-200 cursor-pointer"
                  >
                    {language === 'en' ? 'Register Another Student' : 'Yi Rajistar Wani Dalibin'}
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
