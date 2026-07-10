/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, User, Phone, BookOpen, Sparkles, GraduationCap, ArrowRight } from 'lucide-react';
import { COURSES, CURRENT_BATCH } from '../data/academyData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { useLanguage } from '../lib/LanguageContext';

interface EnrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedCourseId?: string;
}

export default function EnrollModal({ isOpen, onClose, preSelectedCourseId }: EnrollModalProps) {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
  });

  // Track the selected course object
  const selectedCourse = COURSES.find(c => c.id === preSelectedCourseId) || COURSES[0];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      alert(language === 'en' ? 'Please fill out all required fields.' : 'Da fatan za a cika duk guraren da ake bukata.');
      return;
    }

    const courseName = selectedCourse.title;

    // Build the pre-filled WhatsApp message
    const message = `Hello, I would like to enroll in a course at Al-Huda Digital Academy.

Name: ${formData.fullName.trim()}
Phone Number: ${formData.phone.trim()}
Course: ${courseName}

Please guide me through the registration process. Thank you.`;

    const whatsappUrl = `https://wa.me/2349028149646?text=${encodeURIComponent(message)}`;

    // Optional background tracking to Supabase/LocalStorage as best practice so inquiries are never lost
    if (isSupabaseConfigured) {
      try {
        const enrollmentId = `AHA-ENR-${Math.floor(100000 + Math.random() * 900000)}`;
        await supabase
          .from('enrollments')
          .insert([
            {
              id: enrollmentId,
              full_name: formData.fullName.trim(),
              phone: formData.phone.trim(),
              course_id: selectedCourse.id,
              course_title: courseName,
              payment_method: 'WhatsApp Enroll Direct',
              payment_status: 'Direct Inquiry',
              created_at: new Date().toISOString(),
            }
          ]);
      } catch (err) {
        console.warn('Silent database logging failed:', err);
      }
    }

    // Save to local storage
    try {
      const existingEnrollments = JSON.parse(localStorage.getItem('alhuda_enrollments') || '[]');
      existingEnrollments.push({
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        courseTitle: courseName,
        date: new Date().toLocaleDateString(),
      });
      localStorage.setItem('alhuda_enrollments', JSON.stringify(existingEnrollments));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }

    // Immediately open WhatsApp to the course owner's number
    window.open(whatsappUrl, '_blank');

    // Close the popup modal
    onClose();

    // Reset fields
    setFormData({
      fullName: '',
      phone: '',
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative bg-white rounded-3xl overflow-hidden w-full max-w-lg shadow-2xl border border-slate-100 my-8">
        
        {/* Top Header Panel in Al-Huda Brand Colors */}
        <div className="bg-gradient-to-r from-emerald-900 to-teal-950 p-6 text-white relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl"></div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
            aria-label="Close registration"
            id="close-enroll-modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <GraduationCap className="w-6 h-6 text-brand-gold-light" />
            </div>
            <div>
              <h2 className="text-xl font-heading font-extrabold tracking-tight">
                {language === 'en' ? 'Student Enrollment' : 'Rijistar Dalibai'}
              </h2>
              <p className="text-xs text-emerald-300 font-medium">
                {language === 'en' 
                  ? `Batch 0${CURRENT_BATCH.batchNumber} • Secure Academy Portal`
                  : `Rukuni 0${CURRENT_BATCH.batchNumber} • Amintaccen Shafi`
                }
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="p-3.5 bg-amber-50 border border-amber-100 rounded-2xl flex items-start gap-3 text-slate-700">
              <Sparkles className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
              <p className="text-[11px] font-semibold leading-normal">
                {language === 'en'
                  ? 'Admissions are live! Register your details below to activate your premium digital course seat.'
                  : 'Ana ci gaba da karbar dalibai! Shigar da bayananku a kasa don tabbatar da samun gurbin karatu.'
                }
              </p>
            </div>

            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                {language === 'en' ? 'Full Name' : 'Cikakken Suna'} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                  <User className="w-4.5 h-4.5 text-slate-400" />
                </span>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder={language === 'en' ? 'e.g. Yusuf Ibrahim' : 'Misali: Yusuf Ibrahim'}
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-brand-emerald focus:bg-white transition"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                {language === 'en' ? 'Phone Number (WhatsApp)' : 'Lambar Waya (WhatsApp)'} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                  <Phone className="w-4.5 h-4.5 text-slate-400" />
                </span>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="e.g. +234 803 123 4567"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-brand-emerald focus:bg-white transition"
                />
              </div>
            </div>

            {/* Course Name (Read-Only) */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                {language === 'en' ? 'Course Name' : 'Sunan Kwas'}
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                  <BookOpen className="w-4.5 h-4.5 text-slate-400" />
                </span>
                <input
                  type="text"
                  name="courseName"
                  readOnly
                  value={selectedCourse?.title || ''}
                  className="w-full bg-slate-100 border border-slate-200 text-slate-500 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none cursor-not-allowed select-none font-medium"
                />
              </div>
            </div>

            {/* Submit Enroll Button */}
            <div className="pt-4 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 border border-slate-200 text-slate-600 font-bold py-3.5 px-4 rounded-xl hover:bg-slate-50 transition cursor-pointer text-center text-sm"
              >
                {language === 'en' ? 'Cancel' : 'Soke'}
              </button>
              <button
                type="submit"
                className="flex-1 bg-brand-emerald hover:bg-teal-900 text-white font-extrabold py-3.5 px-4 rounded-xl shadow-lg hover:scale-[1.01] transition duration-200 flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                <span>{language === 'en' ? 'Enroll' : 'Yi Rajista'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
