/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Loader2 } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export default function ContactForm() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dbError, setDbError] = useState<string | null>(null);

  // Live Formspree configuration state
  const [formspreeId] = useState(() => {
    return localStorage.getItem('alhuda_formspree_id') || import.meta.env.VITE_FORMSPREE_FORM_ID || 'xwvddlya';
  });
  const [lastFormspreeStatus, setLastFormspreeStatus] = useState<{
    success: boolean;
    errorMsg: string;
    idUsed: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert(language === 'en' ? 'Please fill out all required fields.' : 'Da fatan za a cika dukkan bayanan da ake bukata.');
      return;
    }

    setIsSubmitting(true);
    setDbError(null);

    try {
      // Determine the correct Formspree endpoint URL
      const formspreeUrl = formspreeId.includes('@') 
        ? `https://formspree.io/${formspreeId}`
        : `https://formspree.io/f/${formspreeId}`;

      let formspreeSuccess = false;
      let formspreeErrorMsg = '';

      try {
        const response = await fetch(formspreeUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
            _subject: `New Al-Huda Academy Inquiry: ${formData.subject}`
          })
        });

        if (response.ok) {
          formspreeSuccess = true;
        } else {
          const errData = await response.json().catch(() => ({}));
          formspreeErrorMsg = errData.error || 'Formspree submission rejected by server.';
        }
      } catch (fetchErr: any) {
        console.warn('Formspree direct fetch failed (possibly due to CORS or unverified Formspree email/ID):', fetchErr);
        formspreeErrorMsg = 'Network Error or CORS Block.';
      }

      // If submission fails, throw an error to show the exact error message required
      if (!formspreeSuccess) {
        throw new Error(language === 'en' ? 'Something went wrong. Please try again.' : 'Wani abu ya faru ba daidai ba. Da fatan za a sake gwadawa.');
      }

      // Also save to Supabase / Local Storage as fallback so inquiries are NEVER lost!
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase
          .from('contacts')
          .insert([
            {
              name: formData.name,
              email: formData.email,
              subject: formData.subject,
              message: formData.message,
            }
          ]);

        if (error) {
          console.warn('Supabase contact saving error:', error.message);
        }
      } else {
        // Local simulation fallback
        console.warn('Supabase not configured. Saving submission locally.');
        const existingContacts = JSON.parse(localStorage.getItem('alhuda_contacts') || '[]');
        existingContacts.push({
          ...formData,
          id: `local-${Date.now()}`,
          created_at: new Date().toISOString(),
        });
        localStorage.setItem('alhuda_contacts', JSON.stringify(existingContacts));
      }

      // Store Formspree submission results so the site administrator can verify integration status
      setLastFormspreeStatus({
        success: formspreeSuccess,
        errorMsg: formspreeErrorMsg,
        idUsed: formspreeId
      });

      setIsSubmitted(true);
    } catch (err: any) {
      console.error('Contact form submission error:', err);
      setDbError(language === 'en' ? 'Something went wrong. Please try again.' : 'Wani abu ya faru ba daidai ba. Da fatan za a sake gwadawa.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      subject: 'General Inquiry',
      message: '',
    });
    setDbError(null);
    setIsSubmitted(false);
    setLastFormspreeStatus(null);
  };

  const handleBackToHome = () => {
    handleReset();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-white relative">
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-teal-50/40 -z-10 blur-3xl rounded-full"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Side: Contact Information Cards */}
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-100 text-brand-emerald text-xs font-bold tracking-wider uppercase">
                <span>{language === 'en' ? 'Get In Touch' : 'Tuntube Mu'}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-800 tracking-tight">
                {language === 'en' ? (
                  <>
                    Connect with our <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-emerald to-teal-600">Admission Guides</span>
                  </>
                ) : (
                  <>
                    Tuntubi Masu <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-emerald to-teal-600">Jagorantar Rajista</span>
                  </>
                )}
              </h2>
              <p className="text-sm sm:text-base text-slate-500 font-medium leading-relaxed">
                {language === 'en'
                  ? 'Have specific queries regarding Batch 04 tuition, scheduling, or physical certifications? Reach out to our customer support guides. We respond within 12 hours.'
                  : 'Kuna da tambayoyi na musamman game da kudin makaranta na Batch 04, tsarin darussa, ko takaddun shaida na zahiri? Tuntubi jagororin tallafin abokan cinikinmu. Muna ba da amsa a cikin sa\'o\'i 12.'
                }
              </p>
            </div>

            {/* Info Cards List */}
            <div className="space-y-4">
              {/* Support Email */}
              <div className="flex gap-4 bg-slate-50 border border-slate-100 p-5 rounded-2xl">
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                    {language === 'en' ? 'Support Email' : 'Imel Din Taimako'}
                  </span>
                  <a 
                    href="mailto:alhudadigitalacademy01@gmail.com" 
                    className="text-sm sm:text-base font-bold text-slate-700 hover:text-brand-emerald transition"
                  >
                    alhudadigitalacademy01@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone Line */}
              <div className="flex gap-4 bg-slate-50 border border-slate-100 p-5 rounded-2xl">
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                    {language === 'en' ? 'Helpline (WhatsApp)' : 'Layin Taimako (WhatsApp)'}
                  </span>
                  <a 
                    href="tel:+2349028149646" 
                    className="text-sm sm:text-base font-bold text-slate-700 hover:text-brand-emerald transition"
                  >
                    +234 902 814 9646
                  </a>
                </div>
              </div>

              {/* Head Office location */}
              <div className="flex gap-4 bg-slate-50 border border-slate-100 p-5 rounded-2xl">
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                    {language === 'en' ? 'Head Office Location' : 'Wurin Babban Ofishi'}
                  </span>
                  <p className="text-sm sm:text-base font-bold text-slate-700 leading-tight">
                    {language === 'en' ? 'Borno, Maiduguri, Nigeria' : 'Borno, Maiduguri, Najeriya'}
                  </p>
                </div>
              </div>
            </div>

            {/* Social channels connect */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                {language === 'en' ? 'Follow Al-Huda Academy' : 'Ku Bi Al-Huda Academy'}
              </span>
              <div className="flex gap-3">
                {[
                  { icon: <Facebook className="w-5 h-5" />, href: 'https://www.facebook.com/profile.php?id=100094286896470' },
                  { icon: <Twitter className="w-5 h-5" />, href: 'https://twitter.com' },
                  { icon: <Instagram className="w-5 h-5" />, href: 'https://instagram.com' },
                  { icon: <Linkedin className="w-5 h-5" />, href: 'https://linkedin.com' },
                ].map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 hover:text-brand-emerald hover:border-teal-200 hover:bg-teal-50/10 transition"
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Interactive Inquiry Form */}
          <div className="lg:col-span-7 bg-slate-50/60 border border-slate-100/80 rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-100/30 flex flex-col justify-center">
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name field */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-600 uppercase">
                    {language === 'en' ? 'Your Name *' : 'Sunanka *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Halima Sani"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-emerald"
                  />
                </div>

                {/* Email field */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-600 uppercase">
                    {language === 'en' ? 'Email Address *' : 'Adireshin Imel *'}
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="halima.sani@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-emerald"
                  />
                </div>
              </div>

              {/* Subject dropdown */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-600 uppercase">
                  {language === 'en' ? 'Subject Topic' : 'Maudu\'in Tambaya'}
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-emerald cursor-pointer"
                >
                  <option value="General Inquiry">
                    {language === 'en' ? 'General Admissions Inquiry' : 'Bayanai na Gaba Daya Game da Rajista'}
                  </option>
                  <option value="Batch Tuitions">
                    {language === 'en' ? 'Batch 04 Fee Structure & Payment Plans' : 'Tsarin Kudin Karatu na Batch 04'}
                  </option>
                  <option value="Corporate Scholarship">
                    {language === 'en' ? 'CSR / Corporate Scholarships Programs' : 'Shirye-shiryen Tallafin Karatu na Kamfanoni'}
                  </option>
                  <option value="Mentor Partnerships">
                    {language === 'en' ? 'Expert Instructor & Mentor Application' : 'Neman Shiga A Matsayin Malami Ko Mai Jagora'}
                  </option>
                </select>
              </div>

              {/* Message block */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-600 uppercase">
                  {language === 'en' ? 'Write Your Query *' : 'Rubuta Tambayarka *'}
                </label>
                <textarea
                  required
                  placeholder={
                    language === 'en'
                      ? 'Describe what information you are seeking from the Al-Huda academy guides...'
                      : 'Kwatanta irin bayanan da kake nema daga jagororin makarantar Al-Huda...'
                  }
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-emerald resize-none"
                ></textarea>
              </div>

              {dbError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-semibold animate-fade-in">
                  {dbError}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-emerald hover:bg-brand-gold text-white font-bold py-3.5 px-6 rounded-xl shadow-md transition duration-300 flex items-center justify-center gap-2 cursor-pointer text-sm disabled:opacity-55"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{language === 'en' ? 'Sending message...' : 'Ana tura sako...'}</span>
                  </>
                ) : (
                  <>
                    <span>{language === 'en' ? 'Send Inquiry Message' : 'Tura Sakon Tambaya'}</span>
                  </>
                )}
              </button>
            </form>

          </div>

        </div>

      </div>

      {/* Centered Success Message Modal Overlay with Backdrop Blur */}
      {isSubmitted && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={handleReset}
        >
          <div 
            className="bg-white rounded-3xl max-w-md w-full p-8 md:p-10 shadow-2xl border border-slate-100 text-center relative space-y-6 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Success Message Header */}
            <h3 className="font-heading font-extrabold text-slate-800 text-xl sm:text-2xl leading-snug">
              {language === 'en' ? 'Message Sent Successfully!' : 'An Tura Sako Cikin Nasara!'}
            </h3>

            {/* Custom Success Body Text */}
            <div className="space-y-4 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              <p>
                {language === 'en' ? (
                  <>
                    Thank you, <strong className="text-slate-800 font-extrabold">{formData.name}</strong>! Your message has been received successfully.
                  </>
                ) : (
                  <>
                    Godiya gare ku, <strong className="text-slate-800 font-extrabold">{formData.name}</strong>! An sami sakonku cikin nasara.
                  </>
                )}
              </p>
              <p>
                {language === 'en'
                  ? 'Our team will review your inquiry and contact you within 12 business hours via the email address or phone number you provided.'
                  : 'Tawagar mu za ta duba tambayarku kuma ta tuntube ku a cikin sa\'o\'i 12 na aiki ta hanyar adireshin imel ko lambar waya da kuka bayar.'
                }
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={handleReset}
                className="w-full bg-brand-emerald hover:bg-brand-emerald-light text-white font-bold text-xs py-3 px-6 rounded-xl transition duration-300 shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                {language === 'en' ? 'Send Another Message' : 'Sake Tura Wani Sakon'}
              </button>
              
              <button
                onClick={handleBackToHome}
                className="w-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs py-3 px-6 rounded-xl transition duration-300 shadow-sm cursor-pointer"
              >
                {language === 'en' ? 'Back to Home' : 'Koma Gida'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
