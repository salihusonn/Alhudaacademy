/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Check, 
  User, 
  Mail, 
  Phone, 
  Globe, 
  BookOpen, 
  CreditCard, 
  Sparkles, 
  GraduationCap, 
  Printer, 
  AlertCircle,
  Building2,
  Award,
  ArrowRight,
  Upload
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { COURSES, CURRENT_BATCH } from '../data/academyData';
import AlHudaLogo from './AlHudaLogo';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

// Course Prices Lookup Table in NGN (Nigerian Naira)
const COURSE_PRICES: Record<string, number> = {
  'smartphone-graphic-design': 2500,
  'pixellab-graphic-design': 2500,
  'smartphone-video-editing': 2500,
  'social-media-content-creation': 2500,
  'prompt-engineering': 2500,
  'ai-for-business': 2500,
  'chatgpt-productivity': 2500,
};

interface EnrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedCourseId?: string;
}

type PaymentMethodType = 'BankTransfer' | 'Scholarship';

export default function EnrollModal({ isOpen, onClose, preSelectedCourseId }: EnrollModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    courseId: preSelectedCourseId || COURSES[0]?.id || '',
    stateCountry: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('BankTransfer');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [receiptData, setReceiptData] = useState<any | null>(null);
  const [slipFile, setSlipFile] = useState<File | null>(null);
  const [slipPreview, setSlipPreview] = useState<string | null>(null);
  const [dbError, setDbError] = useState<string | null>(null);

  // Update pre-selected course if prop changes
  useEffect(() => {
    if (preSelectedCourseId) {
      setFormData(prev => ({
        ...prev,
        courseId: preSelectedCourseId
      }));
    }
  }, [preSelectedCourseId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSlipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSlipFile(file);
      setSlipPreview(URL.createObjectURL(file));
    }
  };

  const getCoursePrice = (courseId: string): number => {
    return 2500; // Flat price ₦2500 as requested
  };

  const getWhatsAppLink = () => {
    if (!receiptData) return '#';
    const text = `Assalamualaikum Al-Huda Digital Academy,\n\nI have completed my enrollment. Here are my payment details:\n\n*Student Name:* ${receiptData.fullName}\n*Course:* ${receiptData.courseTitle}\n*Batch:* ${receiptData.batch}\n*Amount Paid:* ${receiptData.amountPaid}\n*Payment Method:* ${receiptData.paymentMethodName}\n*Reference:* ${receiptData.txRef}\n*Date:* ${receiptData.date}\n*Phone:* ${receiptData.phone}\n*Location:* ${receiptData.stateCountry}\n\nPlease verify my registration and send my classroom login credentials. Thank you!`;
    return `https://wa.me/2349028149646?text=${encodeURIComponent(text)}`;
  };

  const finalizeEnrollment = async (status: string, txRef: string) => {
    setDbError(null);
    const selectedCourse = COURSES.find(c => c.id === formData.courseId);
    const price = getCoursePrice(formData.courseId);
    const enrollmentId = `AHA-ENR-${Math.floor(100000 + Math.random() * 900000)}`;
    const enrollmentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    let slipUrl = '';
    if (slipFile && isSupabaseConfigured) {
      try {
        const fileExt = slipFile.name.split('.').pop();
        const fileName = `${enrollmentId}-${Date.now()}.${fileExt}`;
        const filePath = `slips/${fileName}`;
        
        const { error: uploadError } = await supabase.storage
          .from('payment-slips')
          .upload(filePath, slipFile, { cacheControl: '3600', upsert: true });

        if (!uploadError) {
          const { data: publicUrlData } = supabase.storage
            .from('payment-slips')
            .getPublicUrl(filePath);
          slipUrl = publicUrlData.publicUrl;
        } else {
          console.warn('Storage upload error:', uploadError);
          setDbError(`Failed to upload payment receipt: ${uploadError.message}`);
        }
      } catch (storageErr: any) {
        console.error('Storage upload exception:', storageErr);
        setDbError(`Failed to upload payment receipt: ${storageErr.message || storageErr}`);
      }
    }

    const amountPaidStr = paymentMethod === 'BankTransfer' ? `₦${price.toLocaleString()} (Pending Verification)` : '₦0 (Under Review)';
    const paymentMethodNameStr = paymentMethod === 'BankTransfer' ? 'Manual Bank Transfer' : 'Community Scholarship';

    if (isSupabaseConfigured) {
      try {
        const { error: enrollError } = await supabase
          .from('enrollments')
          .insert([
            {
              id: enrollmentId,
              full_name: formData.fullName,
              email: formData.email,
              phone: formData.phone,
              state_country: formData.stateCountry,
              payment_method: paymentMethodNameStr,
              payment_status: status,
              amount_paid: amountPaidStr,
              tx_ref: txRef,
              course_id: formData.courseId,
              course_title: selectedCourse?.title || formData.courseId,
              course_duration: selectedCourse?.duration || '6 Weeks',
              batch: `Batch 0${CURRENT_BATCH.batchNumber}`,
              commencement_date: CURRENT_BATCH.commencementDate,
              slip_url: slipUrl,
              created_at: new Date().toISOString(),
            }
          ]);

        if (enrollError) {
          console.error('Database enrollment save error:', enrollError);
          setDbError(`Database error: ${enrollError.message}`);
          setIsSubmitting(false);
          return; // Stop enrollment completion on database error
        }
      } catch (dbExceptionErr: any) {
        console.error('Database insertion exception:', dbExceptionErr);
        setDbError(`Database connection error: ${dbExceptionErr.message || dbExceptionErr}`);
        setIsSubmitting(false);
        return;
      }
    }

    const receipt = {
      id: enrollmentId,
      date: enrollmentDate,
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      stateCountry: formData.stateCountry,
      paymentStatus: status,
      paymentMethodName: paymentMethodNameStr,
      amountPaid: amountPaidStr,
      txRef: txRef,
      courseTitle: selectedCourse?.title || 'Selected Course',
      courseDuration: selectedCourse?.duration || '6 Weeks',
      batch: `Batch 0${CURRENT_BATCH.batchNumber}`,
      commencementDate: CURRENT_BATCH.commencementDate,
      slipUrl: slipUrl,
    };

    setReceiptData(receipt);
    setIsSuccess(true);
    setIsSubmitting(false);

    // Save to local storage for tracking/verification
    const existingEnrollments = JSON.parse(localStorage.getItem('alhuda_enrollments') || '[]');
    existingEnrollments.push(receipt);
    localStorage.setItem('alhuda_enrollments', JSON.stringify(existingEnrollments));

    // Best-effort auto redirect to WhatsApp
    try {
      const whatsappText = `Assalamualaikum Al-Huda Digital Academy,\n\nI have completed my enrollment. Here are my payment details:\n\n*Student Name:* ${receipt.fullName}\n*Course:* ${receipt.courseTitle}\n*Batch:* ${receipt.batch}\n*Amount Paid:* ${receipt.amountPaid}\n*Payment Method:* ${receipt.paymentMethodName}\n*Reference:* ${receipt.txRef}\n*Date:* ${receipt.date}\n*Phone:* ${receipt.phone}\n*Location:* ${receipt.stateCountry}${receipt.slipUrl ? `\n*Payment Slip:* ${receipt.slipUrl}` : ''}`;
      const url = `https://wa.me/2349028149646?text=${encodeURIComponent(whatsappText)}`;
      window.open(url, '_blank');
    } catch (e) {
      console.warn('Auto WhatsApp redirect blocked or failed:', e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone || !formData.courseId || !formData.stateCountry) {
      alert('Please fill in all required fields.');
      return;
    }

    const price = getCoursePrice(formData.courseId);

    if (paymentMethod === 'BankTransfer') {
      setIsSubmitting(true);
      try {
        await finalizeEnrollment('Pending Verification', `TRF-${Math.floor(100000 + Math.random() * 900000)}`);
      } catch (err) {
        console.error(err);
        setIsSubmitting(false);
      }
    } else if (paymentMethod === 'Scholarship') {
      setIsSubmitting(true);
      try {
        await finalizeEnrollment('Scholarship Pending Review', `SCH-${Math.floor(100000 + Math.random() * 900000)}`);
      } catch (err) {
        console.error(err);
        setIsSubmitting(false);
      }
    }
  };

  const handlePrint = () => {
    const printContent = document.getElementById('enrollment-receipt-print');
    if (!printContent) return;
    
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = printContent.innerHTML;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload(); // Reload to restore React state cleanly
  };

  const getPaymentStatusStyle = (status: string) => {
    if (status.includes('Fully Paid') || status === 'Fully Paid') {
      return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    }
    if (status.includes('Pending') || status.includes('Verification')) {
      return 'bg-amber-100 text-amber-800 border-amber-200';
    }
    return 'bg-purple-100 text-purple-800 border-purple-200';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative bg-white rounded-3xl overflow-hidden w-full max-w-lg shadow-2xl border border-slate-100 my-8">
        
        {/* Top Header Panel */}
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
              <h2 className="text-xl font-heading font-extrabold tracking-tight">Student Enrollment</h2>
              <p className="text-xs text-emerald-300 font-medium">Batch 0{CURRENT_BATCH.batchNumber} • Secure Academy Portal</p>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-6 sm:p-8"
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="p-3 bg-amber-50 border border-amber-100 rounded-2xl flex items-start gap-3 text-slate-700">
                  <Sparkles className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                  <p className="text-[11px] font-semibold leading-normal">
                    Admissions are live! Register your details below to activate your premium digital course seat.
                  </p>
                </div>

                {/* Full Name */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider">Full Name <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                      <User className="w-4.5 h-4.5 text-slate-400" />
                    </span>
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="e.g. Yusuf Ibrahim"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-brand-emerald focus:bg-white transition"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider">Email Address <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                      <Mail className="w-4.5 h-4.5 text-slate-400" />
                    </span>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="e.g. yusuf.ibrahim@gmail.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-brand-emerald focus:bg-white transition"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider">Phone Number (WhatsApp) <span className="text-red-500">*</span></label>
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

                {/* Course Selection */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider">Course Selection <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                      <BookOpen className="w-4.5 h-4.5 text-slate-400" />
                    </span>
                    <select
                      name="courseId"
                      required
                      value={formData.courseId}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-brand-emerald focus:bg-white transition cursor-pointer appearance-none"
                    >
                      {COURSES.map(course => (
                        <option key={course.id} value={course.id}>
                          {course.title} — ₦{getCoursePrice(course.id).toLocaleString()}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* State / Country */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider">State / Country <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                      <Globe className="w-4.5 h-4.5 text-slate-400" />
                    </span>
                    <input
                      type="text"
                      name="stateCountry"
                      required
                      placeholder="e.g. Kano, Nigeria"
                      value={formData.stateCountry}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-brand-emerald focus:bg-white transition"
                    />
                  </div>
                </div>

                {/* Real-time Tuition Indicator */}
                <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-2xl flex justify-between items-center text-slate-800">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-brand-emerald" />
                    <div>
                      <span className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider">Tuition Fee</span>
                      <span className="text-xs font-semibold">Course Enrollment Fee</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-extrabold text-brand-emerald">₦{getCoursePrice(formData.courseId).toLocaleString()}</span>
                    <span className="block text-[9px] text-emerald-700 font-bold">One-time payment</span>
                  </div>
                </div>

                {/* Enrollment Options Tabs */}
                <div className="space-y-2">
                  <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider">Select Enrollment Option <span className="text-red-500">*</span></label>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {/* Bank Transfer */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('BankTransfer')}
                      className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center gap-1 transition cursor-pointer ${
                        paymentMethod === 'BankTransfer' 
                          ? 'border-brand-emerald bg-emerald-50/50 text-brand-emerald shadow-sm' 
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'
                      }`}
                    >
                      <Building2 className="w-5 h-5 shrink-0" />
                      <span className="text-[10px] font-bold leading-tight">Bank Transfer</span>
                    </button>

                    {/* Scholarship */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('Scholarship')}
                      className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center gap-1 transition cursor-pointer ${
                        paymentMethod === 'Scholarship' 
                          ? 'border-brand-emerald bg-emerald-50/50 text-brand-emerald shadow-sm' 
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'
                      }`}
                    >
                      <Award className="w-5 h-5 shrink-0" />
                      <span className="text-[10px] font-bold leading-tight">Scholarship</span>
                    </button>
                  </div>
                </div>

                {/* Sub-panels depending on selected Enrollment Option */}
                <AnimatePresence mode="wait">
                  {paymentMethod === 'BankTransfer' && (
                    <motion.div
                      key="bank-info"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-700 space-y-2.5"
                    >
                      <h4 className="text-xs font-bold text-emerald-900 flex items-center gap-1.5 uppercase tracking-wider">
                        <Building2 className="w-4 h-4 text-brand-emerald" />
                        <span>Official Bank Details</span>
                      </h4>
                      <div className="text-xs space-y-1 text-slate-600 font-medium">
                        <div className="flex justify-between border-b border-slate-200/50 pb-1">
                          <span>Bank Name:</span>
                          <span className="font-bold text-slate-800">Opay</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-200/50 pb-1">
                          <span>Account Name:</span>
                          <span className="font-bold text-slate-800">Adam salihu Adam</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-200/50 pb-1">
                          <span>Account Number:</span>
                          <span className="font-extrabold text-brand-emerald font-mono tracking-wider">9028149646</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Ref:</span>
                          <span className="font-bold text-slate-500">Student Name / WhatsApp</span>
                        </div>
                      </div>
                      <p className="text-[10px] text-slate-500 leading-normal">
                        <strong>Note:</strong> Submit enrollment after transfer, then send your transaction slip to our official admission WhatsApp line (09028149646) for rapid validation.
                      </p>

                      {/* Optional Slip Upload */}
                      <div className="pt-2 border-t border-slate-200/50 space-y-1.5">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Upload Transfer Receipt (Optional)</label>
                        <div className="flex items-center gap-3 p-2 bg-white border border-slate-200 rounded-xl">
                          {slipPreview ? (
                            <img src={slipPreview} alt="Receipt preview" className="w-10 h-10 rounded object-cover border border-slate-100 shrink-0" />
                          ) : (
                            <div className="w-10 h-10 rounded bg-slate-50 border border-dashed border-slate-200 flex items-center justify-center shrink-0">
                              <Upload className="w-4 h-4 text-slate-400" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleSlipChange}
                              className="hidden"
                              id="slip-upload"
                            />
                            <label
                              htmlFor="slip-upload"
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-brand-emerald text-[9px] font-extrabold cursor-pointer transition shadow-sm"
                            >
                              <Upload className="w-3 h-3" />
                              {slipFile ? 'Change Receipt' : 'Select Image File'}
                            </label>
                            <p className="text-[8px] text-slate-400 truncate mt-0.5">{slipFile ? slipFile.name : 'JPEG, PNG file'}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {paymentMethod === 'Scholarship' && (
                    <motion.div
                      key="scholarship-info"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-4 bg-purple-50 border border-purple-100 rounded-2xl text-purple-950 space-y-2"
                    >
                      <h4 className="text-xs font-bold text-purple-900 flex items-center gap-1.5 uppercase tracking-wider">
                        <Award className="w-4 h-4 text-purple-700" />
                        <span>Scholarship Application</span>
                      </h4>
                      <p className="text-[11px] text-purple-800 leading-normal">
                        Al-Huda offers community-sponsored scholarships to passionate students who are unable to pay. Select this option if you satisfy our local scholarship requirements. 
                      </p>
                      <p className="text-[10px] text-purple-600 font-medium leading-normal">
                        <strong>Admissions Notice:</strong> Your submission will go under review, and you will receive a follow-up assessment form on email or WhatsApp.
                      </p>

                      {/* Optional Scholarship Document Upload */}
                      <div className="pt-2 border-t border-purple-200/50 space-y-1.5">
                        <label className="block text-[10px] font-bold text-purple-700 uppercase tracking-wider">Upload Recommendations / Supporting Document (Optional)</label>
                        <div className="flex items-center gap-3 p-2 bg-white border border-purple-100 rounded-xl">
                          {slipPreview ? (
                            <img src={slipPreview} alt="Document preview" className="w-10 h-10 rounded object-cover border border-purple-50 shrink-0" />
                          ) : (
                            <div className="w-10 h-10 rounded bg-purple-50/50 border border-dashed border-purple-200 flex items-center justify-center shrink-0">
                              <Upload className="w-4 h-4 text-purple-400" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleSlipChange}
                              className="hidden"
                              id="scholarship-doc-upload"
                            />
                            <label
                              htmlFor="scholarship-doc-upload"
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 text-[9px] font-extrabold cursor-pointer transition shadow-sm"
                            >
                              <Upload className="w-3 h-3" />
                              {slipFile ? 'Change Document' : 'Select Document File'}
                            </label>
                            <p className="text-[8px] text-purple-500 truncate mt-0.5">{slipFile ? slipFile.name : 'Proof of eligibility or letter'}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {dbError && (
                  <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-[11px] text-red-600 font-semibold mb-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                    <span>{dbError}</span>
                  </div>
                )}

                {/* Submit button */}
                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 border border-slate-200 text-slate-600 font-bold py-3 px-4 rounded-xl hover:bg-slate-50 transition cursor-pointer text-center text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-brand-emerald hover:bg-teal-900 text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:scale-[1.01] transition duration-200 flex items-center justify-center gap-2 cursor-pointer text-sm"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full inline-block"></span>
                        Processing...
                      </span>
                    ) : (
                      <>
                        <span>
                          {paymentMethod === 'Paystack' 
                            ? 'Pay with Paystack' 
                            : paymentMethod === 'BankTransfer' 
                            ? 'Submit Transfer Request' 
                            : 'Apply for Scholarship'}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          ) : (
            /* Success confirmation panel */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 sm:p-8 space-y-6"
            >
              <div className="text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 text-brand-emerald flex items-center justify-center mx-auto shadow-md">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <h3 className="text-xl font-heading font-extrabold text-slate-800">Enrollment Submitted!</h3>
                <p className="text-xs text-slate-500 font-medium max-w-sm mx-auto">
                  Alhamdulillah! Your enrollment for {receiptData?.courseTitle} has been recorded successfully. Please review your official receipt details.
                </p>
              </div>

              {/* Printable Receipt Block */}
              <div id="enrollment-receipt-print" className="border border-slate-200 rounded-2xl p-5 bg-slate-50/50 space-y-4">
                <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <AlHudaLogo size={32} />
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">Al-Huda Digital Academy</h4>
                      <p className="text-[8px] text-brand-emerald font-extrabold uppercase tracking-widest">Admissions & Billing</p>
                    </div>
                  </div>
                  <div className="text-right font-mono text-[9px] text-slate-400">
                    <div>No: {receiptData?.id}</div>
                    <div>Date: {receiptData?.date}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs font-medium text-slate-700">
                  <div className="col-span-2 border-b border-slate-100 pb-2">
                    <span className="block text-[9px] font-extrabold text-slate-400 uppercase">Student Name</span>
                    <span className="text-slate-800 font-bold text-sm">{receiptData?.fullName}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] font-extrabold text-slate-400 uppercase">Course Title</span>
                    <span className="text-slate-800 font-bold">{receiptData?.courseTitle}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] font-extrabold text-slate-400 uppercase">Class Batch</span>
                    <span className="text-slate-800 font-bold">{receiptData?.batch} ({receiptData?.courseDuration})</span>
                  </div>
                  <div>
                    <span className="block text-[9px] font-extrabold text-slate-400 uppercase">Phone (WhatsApp)</span>
                    <span className="text-slate-800 font-bold font-mono">{receiptData?.phone}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] font-extrabold text-slate-400 uppercase">State / Country</span>
                    <span className="text-slate-800 font-bold">{receiptData?.stateCountry}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] font-extrabold text-slate-400 uppercase">Tuition Fee</span>
                    <span className="text-slate-800 font-extrabold text-brand-emerald">{receiptData?.amountPaid}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] font-extrabold text-slate-400 uppercase">Payment Method</span>
                    <span className="text-slate-800 font-bold text-[11px]">{receiptData?.paymentMethodName}</span>
                  </div>
                  <div className="col-span-2 pt-2 border-t border-slate-100">
                    <span className="block text-[9px] font-extrabold text-slate-400 uppercase">Transaction Reference</span>
                    <span className="text-slate-800 font-mono text-[10px] break-all font-bold">{receiptData?.txRef}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] font-extrabold text-slate-400 uppercase">Batch Starts</span>
                    <span className="text-slate-800 font-bold">{receiptData?.commencementDate}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] font-extrabold text-slate-400 uppercase">Enrollment Status</span>
                    <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-extrabold border ${getPaymentStatusStyle(receiptData?.paymentStatus)}`}>
                      {receiptData?.paymentStatus}
                    </span>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-3 flex gap-2 items-start text-[10px] text-slate-500 font-medium">
                  <AlertCircle className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                  <p>
                    A copy of this registration has been sent to <strong>{receiptData?.email}</strong>. Please join the student onboarding cohort workspace using instructions dispatched to your WhatsApp.
                  </p>
                </div>
              </div>

              {/* WhatsApp Notification CTA (Pulse Action) */}
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-3 shadow-sm">
                <div className="flex items-start gap-2.5 text-emerald-950">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1 shrink-0 animate-ping"></span>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-emerald-900">Step 2: Confirm on WhatsApp</h4>
                    <p className="text-[10px] text-emerald-800 font-medium leading-normal mt-0.5">
                      To activate your portal logins instantly and connect with your mentor, click the button below to send your receipt info to <strong>09028149646</strong> on WhatsApp.
                    </p>
                  </div>
                </div>
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-black text-xs py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-transform hover:scale-[1.01] active:scale-[0.99] cursor-pointer shadow-md text-center"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.705 1.459h.008c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span>Send Confirmation on WhatsApp</span>
                </a>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="flex-1 bg-slate-800 hover:bg-slate-900 text-white font-bold py-2.5 px-4 rounded-xl transition cursor-pointer text-xs flex items-center justify-center gap-1.5"
                >
                  <Printer className="w-4 h-4" />
                  Print Receipt
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-brand-emerald hover:bg-teal-900 text-white font-bold py-2.5 px-4 rounded-xl transition cursor-pointer text-xs"
                >
                  Close Receipt
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
