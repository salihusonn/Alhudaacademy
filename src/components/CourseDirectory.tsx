/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, Star, Clock, BookOpen, User, ArrowRight, X, Check, Award, Sparkles, Send } from 'lucide-react';
import { COURSES, CURRENT_BATCH } from '../data/academyData';
import { Course } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface CourseDirectoryProps {
  onEnrollClick: (courseId?: string) => void;
}

export default function CourseDirectory({ onEnrollClick }: CourseDirectoryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [enrollMode, setEnrollMode] = useState<boolean>(false);

  // Enrollment Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    experience: 'Beginner',
    motivation: '',
  });
  const [enrollSuccess, setEnrollSuccess] = useState<boolean>(false);

  const categories = [
    { label: 'All Fields', value: 'all' },
    { label: 'Programming & Tech', value: 'programming' },
    { label: 'Creative Design', value: 'design' },
    { label: 'Growth Marketing', value: 'marketing' },
    { label: 'Digital Business', value: 'business' },
  ];

  const filteredCourses = COURSES.filter((course) => {
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.tools.some(tool => tool.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleEnrollSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      alert('Please fill out all required fields.');
      return;
    }

    if (isSupabaseConfigured && selectedCourse) {
      try {
        const enrollmentId = `AHA-ENR-MINI-${Math.floor(100000 + Math.random() * 900000)}`;
        const { error: dbError } = await supabase
          .from('enrollments')
          .insert([
            {
              id: enrollmentId,
              full_name: formData.fullName,
              email: formData.email,
              phone: formData.phone,
              state_country: 'Direct Catalog Inquiry',
              payment_method: 'Direct Inquiry Form',
              payment_status: 'Pending Review',
              amount_paid: '₦0 (Under Review)',
              tx_ref: `INQ-${Math.floor(100000 + Math.random() * 900000)}`,
              course_id: selectedCourse.id,
              course_title: selectedCourse.title,
              course_duration: selectedCourse.duration,
              batch: `Batch 0${CURRENT_BATCH.batchNumber}`,
              commencement_date: CURRENT_BATCH.commencementDate,
              motivation: formData.motivation,
              experience_level: formData.experience,
              created_at: new Date().toISOString(),
            }
          ]);

        if (dbError) {
          console.error('Database direct enrollment error:', dbError);
        }
      } catch (err) {
        console.error('Error in handleEnrollSubmit Supabase action:', err);
      }
    }

    setEnrollSuccess(true);
  };

  const closeModals = () => {
    setSelectedCourse(null);
    setEnrollMode(false);
    setEnrollSuccess(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      experience: 'Beginner',
      motivation: '',
    });
  };

  return (
    <section id="courses" className="py-20 md:py-28 bg-slate-50 relative">
      <div className="absolute top-10 right-10 w-96 h-96 bg-amber-50/50 -z-10 blur-3xl rounded-full"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-100 text-brand-emerald text-xs font-bold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold-light" />
              <span>Explore Course Directory</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-800 tracking-tight leading-none">
              In-Demand Skills for <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-emerald to-teal-600">High-Earning Careers</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-500 font-medium">
              Carefully curated bootcamps designed to take you from a curious novice to a premium professional. Select a path below to begin.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:max-w-xs shrink-0">
            <input
              type="text"
              placeholder="Search courses or tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-brand-emerald transition shadow-sm"
            />
            <Search className="w-4.5 h-4.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 -mx-4 px-4 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm whitespace-nowrap transition cursor-pointer ${
                selectedCategory === cat.value
                  ? 'bg-brand-emerald text-white shadow-md shadow-teal-900/10'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Courses Cards Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <div 
                key={course.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:border-teal-50 transition duration-300 flex flex-col justify-between group"
              >
                {/* Course Header/Image */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={course.imageUrl}
                    alt={course.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                  
                  {/* Category Pill */}
                  <span className="absolute top-4 left-4 bg-teal-800 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {course.category === 'programming' ? 'Coding' : course.category}
                  </span>

                  {/* Level Tag */}
                  <span className="absolute bottom-4 left-4 text-xs font-bold text-white flex items-center gap-1">
                    <Award className="w-4 h-4 text-brand-gold-light" />
                    <span>{course.level}</span>
                  </span>
                </div>

                {/* Course Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    {/* Rating and Enrolled */}
                    <div className="flex items-center justify-between text-xs text-slate-400 font-bold">
                      <div className="flex items-center gap-1.5">
                        <Star className="w-4 h-4 fill-brand-gold-light text-brand-gold-light" />
                        <span className="text-slate-700 font-extrabold">{course.rating}</span>
                        <span>({course.reviewsCount} reviews)</span>
                      </div>
                      <span>{course.studentsCount.toLocaleString()}+ Enrolled</span>
                    </div>

                    <h3 className="font-heading font-extrabold text-slate-800 text-lg leading-snug group-hover:text-brand-emerald transition duration-200">
                      {course.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
                      {course.description}
                    </p>
                  </div>

                  {/* Course Details Pills */}
                  <div className="flex items-center gap-4 text-xs font-bold text-slate-500 border-t border-slate-100 pt-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4 text-slate-400" />
                      <span>{course.lessons} Lectures</span>
                    </div>
                  </div>

                  {/* Tools covered tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {course.tools.slice(0, 3).map((tool, idx) => (
                      <span key={idx} className="bg-slate-50 border border-slate-100 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded-lg">
                        {tool}
                      </span>
                    ))}
                    {course.tools.length > 3 && (
                      <span className="text-slate-400 text-[9px] font-bold self-center">
                        +{course.tools.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Course CTA Footer */}
                <div className="p-6 pt-0 flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedCourse(course);
                      setEnrollMode(false);
                    }}
                    className="flex-1 bg-slate-50 text-slate-700 hover:bg-slate-100 font-bold text-xs py-3 px-2 rounded-xl border border-slate-200 transition duration-300 flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>Syllabus</span>
                  </button>
                  <button
                    onClick={() => onEnrollClick(course.id)}
                    className="flex-1 bg-brand-emerald hover:bg-teal-900 text-white font-bold text-xs py-3 px-2 rounded-xl transition duration-300 flex items-center justify-center gap-1 cursor-pointer"
                    id={`enroll-btn-${course.id}`}
                  >
                    <span>Enroll Now</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center max-w-md mx-auto space-y-4 shadow-sm">
            <h3 className="font-heading font-extrabold text-slate-800 text-lg">No courses found</h3>
            <p className="text-sm text-slate-500">
              We couldn't find any courses matching your search "{searchQuery}". Try filtering by a different category or refining your keyword.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="bg-brand-emerald hover:bg-teal-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>

      {/* Course Detail / Enrollment Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="relative bg-white rounded-3xl overflow-hidden w-full max-w-3xl shadow-2xl border border-slate-100 my-8">
            
            {/* Modal Header Cover */}
            <div className="relative h-48 bg-slate-950 overflow-hidden">
              <img
                src={selectedCourse.imageUrl}
                alt={selectedCourse.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/30"></div>
              
              {/* Top controls */}
              <button
                onClick={closeModals}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6">
                <span className="bg-brand-gold text-white text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {selectedCourse.category} path
                </span>
                <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-800 leading-tight mt-2 drop-shadow-sm">
                  {selectedCourse.title}
                </h3>
              </div>
            </div>

            {/* Modal Content container */}
            <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto">
              
              {!enrollMode ? (
                /* Mode 1: Course Details and Curriculum */
                <div className="space-y-6">
                  {/* Quick stats panel */}
                  <div className="grid grid-cols-3 gap-4 bg-slate-50 rounded-2xl p-4 text-center border border-slate-100">
                    <div>
                      <span className="block text-[10px] font-bold text-slate-400 uppercase">Duration</span>
                      <strong className="text-slate-700 text-sm">{selectedCourse.duration}</strong>
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold text-slate-400 uppercase">Lectures</span>
                      <strong className="text-slate-700 text-sm">{selectedCourse.lessons} Modules</strong>
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold text-slate-400 uppercase">Skill Level</span>
                      <strong className="text-slate-700 text-sm">{selectedCourse.level}</strong>
                    </div>
                  </div>

                  {/* Detailed summary */}
                  <div className="space-y-2">
                    <h4 className="font-heading font-extrabold text-slate-800 text-sm">Course Overview</h4>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">
                      {selectedCourse.longDescription}
                    </p>
                  </div>

                  {/* Outcomes checklist */}
                  <div className="space-y-3 bg-teal-50/40 border border-teal-50 p-5 rounded-2xl">
                    <h4 className="font-heading font-extrabold text-brand-emerald text-sm flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-brand-gold-light" />
                      <span>What you will be able to do:</span>
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600 font-semibold">
                      {selectedCourse.outcomes.map((outcome, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Curriculum Accordion/List */}
                  <div className="space-y-3">
                    <h4 className="font-heading font-extrabold text-slate-800 text-sm">Syllabus Curriculum Breakdown</h4>
                    <div className="space-y-2.5">
                      {selectedCourse.curriculum.map((module, idx) => (
                        <div key={idx} className="flex gap-3 bg-slate-50 border border-slate-100 p-3 rounded-xl items-center">
                          <span className="w-6 h-6 rounded-lg bg-teal-50 border border-teal-100 text-brand-emerald text-xs font-bold flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <span className="text-xs sm:text-sm font-semibold text-slate-700">{module}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tools to Master tags */}
                  <div className="space-y-2">
                    <h4 className="font-heading font-extrabold text-slate-800 text-sm">Professional Tools You Will Master</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCourse.tools.map((tool, idx) => (
                        <span key={idx} className="bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold px-3 py-1.5 rounded-xl">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Mentor Card */}
                  <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row gap-4 items-start bg-slate-50/50 p-4 rounded-2xl border">
                    <img
                      src={selectedCourse.instructor.avatar}
                      alt={selectedCourse.instructor.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 rounded-full object-cover border border-teal-100 shadow-sm"
                    />
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Instructor & Mentor</span>
                      <h4 className="font-heading font-extrabold text-slate-800 text-sm">{selectedCourse.instructor.name}</h4>
                      <p className="text-xs text-brand-emerald font-bold">{selectedCourse.instructor.role}</p>
                      <p className="text-xs text-slate-500 leading-relaxed font-medium pt-1">
                        {selectedCourse.instructor.bio}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                /* Mode 2: Enrollment Form */
                <div className="space-y-6">
                  {!enrollSuccess ? (
                    <form onSubmit={handleEnrollSubmit} className="space-y-5">
                      <div className="text-center max-w-md mx-auto space-y-2 pb-2">
                        <h4 className="font-heading font-extrabold text-slate-800 text-lg">Apply for {selectedCourse.title}</h4>
                        <p className="text-xs text-slate-500 font-medium">
                          Submit your scholarship registration form for Batch 0{CURRENT_BATCH.batchNumber}. Our admission guides will review your profile.
                        </p>
                      </div>

                      {/* Full Name */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-600 uppercase">Full Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="Halima Sani"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-emerald"
                        />
                      </div>

                      {/* Email and Phone */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="block text-xs font-bold text-slate-600 uppercase">Email Address *</label>
                          <input
                            type="email"
                            required
                            placeholder="halima.sani@gmail.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-emerald"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="block text-xs font-bold text-slate-600 uppercase">Phone Number (WhatsApp) *</label>
                          <input
                            type="tel"
                            required
                            placeholder="+234 803 123 4567"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-emerald"
                          />
                        </div>
                      </div>

                      {/* Prior Experience Level */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-600 uppercase">Prior Tech Experience</label>
                        <select
                          value={formData.experience}
                          onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-emerald cursor-pointer"
                        >
                          <option value="Beginner">Absolute Beginner (Never coded/designed)</option>
                          <option value="Intermediate">Intermediate (Have basic theoretical knowledge)</option>
                          <option value="Advanced">Advanced (Working professional seeking specialized skills)</option>
                        </select>
                      </div>

                      {/* Motivation Statement */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-600 uppercase">Why do you want to learn this skill? (Optional)</label>
                        <textarea
                          placeholder="Describe your career goals and what you hope to achieve with Al-Huda Academy..."
                          rows={3}
                          value={formData.motivation}
                          onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-emerald resize-none"
                        ></textarea>
                      </div>

                      <div className="flex gap-3 pt-3">
                        <button
                          type="button"
                          onClick={() => setEnrollMode(false)}
                          className="flex-1 border border-slate-200 text-slate-600 font-bold py-3 px-4 rounded-xl hover:bg-slate-50 transition cursor-pointer text-center text-sm"
                        >
                          Back to Details
                        </button>
                        <button
                          type="submit"
                          className="flex-1 bg-brand-emerald text-white font-bold py-3 px-4 rounded-xl shadow-md hover:bg-brand-gold transition cursor-pointer flex items-center justify-center gap-2 text-sm"
                        >
                          <span>Submit Application</span>
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </form>
                  ) : (
                    /* Successful application State */
                    <div className="py-8 text-center space-y-4 max-w-md mx-auto animate-fade-in">
                      <div className="w-16 h-16 rounded-full bg-teal-50 border border-teal-100 text-brand-emerald flex items-center justify-center mx-auto shadow-md">
                        <Check className="w-8 h-8 stroke-[3]" />
                      </div>
                      <h4 className="font-heading font-extrabold text-slate-800 text-xl">Application Received Successfully!</h4>
                      <p className="text-sm text-slate-500 leading-relaxed font-medium">
                        Alhamdulillah, <strong>{formData.fullName}</strong>! We have registered your inquiry application for the <strong>{selectedCourse.title}</strong> bootcamp.
                      </p>
                      
                      <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl text-left text-xs text-slate-600 space-y-2 mt-4">
                        <p className="font-bold text-slate-700">Next Steps:</p>
                        <p>1. Check your email (<strong>{formData.email}</strong>) for a confirmation receipt containing curriculum material and pre-requirements.</p>
                        <p>2. Keep an eye on WhatsApp (<strong>{formData.phone}</strong>) for invitation to the official Batch 0{CURRENT_BATCH.batchNumber} group.</p>
                      </div>

                      <button
                        type="button"
                        onClick={closeModals}
                        className="bg-brand-emerald hover:bg-brand-gold text-white font-bold text-xs py-2.5 px-6 rounded-xl transition cursor-pointer mt-4"
                      >
                        Got it, thank you!
                      </button>
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* Modal Footer (only visible when not in enrollment submission success mode) */}
            {!enrollSuccess && (
              <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                <span className="text-xs text-slate-400 font-bold">
                  {!enrollMode ? 'Interested in this career path?' : 'Read curriculum guidelines first'}
                </span>
                
                {!enrollMode ? (
                  <button
                    onClick={() => {
                      const courseId = selectedCourse.id;
                      closeModals();
                      onEnrollClick(courseId);
                    }}
                    className="w-full sm:w-auto bg-brand-emerald text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md hover:bg-brand-gold transition cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Proceed to Application</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => setEnrollMode(false)}
                    className="w-full sm:w-auto border border-brand-emerald text-brand-emerald font-bold text-sm px-6 py-3 rounded-xl hover:bg-teal-50 transition cursor-pointer"
                  >
                    View Curriculum Detail
                  </button>
                )}
              </div>
            )}

          </div>
        </div>
      )}

    </section>
  );
}
