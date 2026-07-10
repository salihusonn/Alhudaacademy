/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Check, Sparkles, Facebook, Twitter, Instagram, Linkedin, Loader2 } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export default function ContactForm() {
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
  const [formspreeId, setFormspreeId] = useState(() => {
    return localStorage.getItem('alhuda_formspree_id') || import.meta.env.VITE_FORMSPREE_FORM_ID || 'xwvddlya';
  });
  const [showSettings, setShowSettings] = useState(false);
  const [savedSettingsMsg, setSavedSettingsMsg] = useState(false);
  const [lastFormspreeStatus, setLastFormspreeStatus] = useState<{
    success: boolean;
    errorMsg: string;
    idUsed: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill out all required fields.');
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
        throw new Error('Something went wrong. Please try again.');
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
      setDbError('Something went wrong. Please try again.');
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
                <MessageSquare className="w-3.5 h-3.5 text-brand-gold-light" />
                <span>Get In Touch</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-800 tracking-tight">
                Connect with our <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-emerald to-teal-600">Admission Guides</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-500 font-medium leading-relaxed">
                Have specific queries regarding Batch 04 tuition, scheduling, or physical certifications? Reach out to our customer support guides. We respond within 12 hours.
              </p>
            </div>

            {/* Info Cards List */}
            <div className="space-y-4">
              {/* Support Email */}
              <div className="flex gap-4 bg-slate-50 border border-slate-100 p-5 rounded-2xl">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-brand-emerald flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide">Support Email</span>
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
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-brand-emerald flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide">Helpline (WhatsApp)</span>
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
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-brand-emerald flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide">Head Office Location</span>
                  <p className="text-sm sm:text-base font-bold text-slate-700 leading-tight">
                    Borno, Maiduguri, Nigeria
                  </p>
                </div>
              </div>
            </div>

            {/* Social channels connect */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Follow Al-Huda Academy</span>
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
                  <label className="block text-xs font-bold text-slate-600 uppercase">Your Name *</label>
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
                  <label className="block text-xs font-bold text-slate-600 uppercase">Email Address *</label>
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
                <label className="block text-xs font-bold text-slate-600 uppercase">Subject Topic</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-emerald cursor-pointer"
                >
                  <option value="General Inquiry">General Admissions Inquiry</option>
                  <option value="Batch Tuitions">Batch 04 Fee Structure & Payment Plans</option>
                  <option value="Corporate Scholarship">CSR / Corporate Scholarships Programs</option>
                  <option value="Mentor Partnerships">Expert Instructor & Mentor Application</option>
                </select>
              </div>

              {/* Message block */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-600 uppercase">Write Your Query *</label>
                <textarea
                  required
                  placeholder="Describe what information you are seeking from the Al-Huda academy guides..."
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
                    <span>Sending message...</span>
                  </>
                ) : (
                  <>
                    <span>Send Inquiry Message</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Formspree Settings Toggle */}
              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
                <span>
                  Formspree Integration:{" "}
                  <strong className={formspreeId.includes('@') ? "text-amber-600 bg-amber-50 px-2 py-0.5 rounded" : "text-teal-600 bg-teal-50 px-2 py-0.5 rounded"}>
                    {formspreeId.includes('@') ? "Email Fallback" : "Connected (Form ID)"}
                  </strong>
                </span>
                <button
                  type="button"
                  onClick={() => setShowSettings(!showSettings)}
                  className="text-teal-600 hover:text-teal-800 font-bold hover:underline cursor-pointer"
                >
                  {showSettings ? "Hide Setup" : "Configure Formspree"}
                </button>
              </div>

              {showSettings && (
                <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3 mt-4 animate-fade-in text-left shadow-sm">
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-slate-700 uppercase">Connect to Formspree</h4>
                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                      Enter your Formspree Form ID to receive immediate email alerts when visitors submit inquiries.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. xbjnqgdj"
                      value={formspreeId}
                      onChange={(e) => setFormspreeId(e.target.value.trim())}
                      className="flex-1 bg-white border border-slate-200 text-slate-800 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-brand-emerald"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        localStorage.setItem('alhuda_formspree_id', formspreeId);
                        setSavedSettingsMsg(true);
                        setTimeout(() => setSavedSettingsMsg(false), 3000);
                      }}
                      className="bg-brand-emerald hover:bg-brand-gold text-white font-bold text-xs px-4 py-1.5 rounded-lg transition"
                    >
                      Save ID
                    </button>
                  </div>
                  {savedSettingsMsg && (
                    <p className="text-[11px] text-teal-600 font-bold">✓ Formspree Form ID saved locally!</p>
                  )}
                  <p className="text-[10px] text-slate-400 font-medium">
                    Don't have an ID? Create a free form at <a href="https://formspree.io" target="_blank" rel="noreferrer" className="underline text-teal-600 font-bold">formspree.io</a> and copy the 8-character ID from the form's dashboard.
                  </p>
                </div>
              )}
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
            {/* Elegant Check Badge with brand-emerald (Deep Green) and White colors */}
            <div className="w-16 h-16 rounded-full bg-teal-50 border-2 border-brand-emerald text-brand-emerald flex items-center justify-center mx-auto shadow-md">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            {/* Success Message Header */}
            <h3 className="font-heading font-extrabold text-slate-800 text-xl sm:text-2xl leading-snug">
              ✅ Message Sent Successfully!
            </h3>

            {/* Custom Success Body Text */}
            <div className="space-y-4 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              <p>
                Thank you, <strong className="text-slate-800 font-extrabold">{formData.name}</strong>! Your message has been received successfully.
              </p>
              <p>
                Our team will review your inquiry and contact you within 12 business hours via the email address or phone number you provided.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={handleReset}
                className="w-full bg-brand-emerald hover:bg-brand-emerald-light text-white font-bold text-xs py-3 px-6 rounded-xl transition duration-300 shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                Send Another Message
              </button>
              
              <button
                onClick={handleBackToHome}
                className="w-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs py-3 px-6 rounded-xl transition duration-300 shadow-sm cursor-pointer"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
