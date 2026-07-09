/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Award, Laptop, Users, Calendar, ShieldCheck, HeartHandshake, Briefcase, Sparkles } from 'lucide-react';

export default function Benefits() {
  const benefits = [
    {
      icon: <Laptop className="w-6 h-6 text-brand-emerald" />,
      title: 'Structured, Guided Learning',
      description: 'True to our name (Al-Huda, meaning "The Guidance"), we provide comprehensive learning paths that lead you step-by-step from zero to industry ready.',
    },
    {
      icon: <Users className="w-6 h-6 text-brand-emerald" />,
      title: 'Expert Mentorship & Support',
      description: 'Get taught by senior software developers, brand managers, and top-rated freelancers who review your work and provide 1-on-1 Q&A sessions.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-brand-emerald" />,
      title: 'Verifiable Certification',
      description: 'Receive professional course completion certificates recognized globally, ready to upload to LinkedIn, portfolios, or submit with job applications.',
    },
    {
      icon: <Calendar className="w-6 h-6 text-brand-emerald" />,
      title: 'Ultra Flexible Online Learning',
      description: 'Study at your own pace with 24/7 access to state-of-the-art video modules, combined with high-quality weekly live support workshops.',
    },
    {
      icon: <Briefcase className="w-6 h-6 text-brand-emerald" />,
      title: 'Freelancing Mastery Focus',
      description: 'We do not just teach you coding or design. We train you how to package your skills, bid on Upwork & Fiverr, win clients, and earn in USD.',
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-brand-emerald" />,
      title: 'Thriving Alumni Network',
      description: 'Gain lifelong access to our premium community channels, job boards, collaboration groups, and exclusive partner recruitment events.',
    },
  ];

  return (
    <section id="why-us" className="py-20 md:py-28 bg-white relative">
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-emerald-50/30 -z-10 blur-3xl rounded-full"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* About Al-Huda Digital Academy Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 pb-16 border-b border-slate-100">
          <div className="lg:col-span-5 space-y-5 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-brand-emerald text-xs font-bold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
              <span>About Our Academy</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-800 tracking-tight leading-tight">
              Empowering the Next Generation of <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-emerald to-emerald-700">Digital Leaders</span>
            </h2>
            <p className="text-slate-500 font-sans font-semibold text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
              True to our name, <span className="text-brand-emerald font-bold">Al-Huda</span> (meaning "The Guidance"), we provide the clear direction, professional mentorship, and career-focused curriculum needed to dominate the modern tech landscape.
            </p>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-[#075C33] to-[#033B21] text-white rounded-2xl p-6 sm:p-8 shadow-lg shadow-emerald-950/10 hover:shadow-xl hover:shadow-emerald-950/20 hover:scale-[1.02] transition duration-300 border border-emerald-800/40 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition duration-500"></div>
              <h3 className="font-heading font-extrabold text-[#B08922] text-lg sm:text-xl mb-3 tracking-wide uppercase">Our Mission</h3>
              <p className="text-sm sm:text-base text-emerald-50/90 leading-relaxed font-sans font-medium">
                To provide accessible, high-quality, and practical digital education through innovative training, mentorship, and professional development programs that equip learners for academic, career, and entrepreneurial success.
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#B08922] to-[#806114] text-white rounded-2xl p-6 sm:p-8 shadow-lg shadow-amber-950/10 hover:shadow-xl hover:shadow-amber-950/20 hover:scale-[1.02] transition duration-300 border border-amber-700/40 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition duration-500"></div>
              <h3 className="font-heading font-extrabold text-white text-lg sm:text-xl mb-3 tracking-wide uppercase">Our Vision</h3>
              <p className="text-sm sm:text-base text-amber-50/90 leading-relaxed font-sans font-medium">
                To become a leading center of excellence in digital education, empowering individuals with the knowledge, skills, and confidence to thrive in the digital economy and make meaningful contributions to society.
              </p>
            </div>
            <div className="sm:col-span-2 bg-gradient-to-r from-emerald-50/40 to-amber-50/40 rounded-2xl p-6 border border-emerald-100/40">
              <p className="text-xs sm:text-sm text-slate-700 font-sans font-semibold leading-relaxed">
                Al-Huda Digital Academy is a premium skill-acquisition hub. We deliver world-class programs in Graphic Design, Web Development, Digital Marketing, Video Editing, Freelancing, and AI, driving tangible professional outcomes.
              </p>
            </div>
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-brand-emerald text-xs font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold-light" />
            <span>Why Al-Huda Digital Academy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-800 tracking-tight leading-tight">
            How We Prepare You for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-emerald to-emerald-700">Global Digital Market</span>
          </h2>
          <p className="text-base text-slate-500 font-medium max-w-2xl mx-auto">
            We bridge the gap between academic theory and real-world execution, providing the ideal framework for modern digital success.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, idx) => (
            <div 
              key={idx} 
              className="bg-slate-50/50 hover:bg-white rounded-2xl p-6 sm:p-8 border border-slate-100/70 hover:border-emerald-100 shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 transition duration-300 group flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Icon Container */}
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center group-hover:bg-brand-emerald group-hover:text-white transition duration-300">
                  {React.cloneElement(benefit.icon, {
                    className: 'w-6 h-6 text-brand-emerald group-hover:text-white transition'
                  })}
                </div>
                
                <h3 className="font-heading font-extrabold text-slate-800 text-lg group-hover:text-brand-emerald transition">
                  {benefit.title}
                </h3>
                
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Banner callout */}
        <div className="mt-16 bg-gradient-to-tr from-slate-900 to-emerald-950 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-emerald/10 blur-3xl rounded-full"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <span className="bg-brand-gold text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                Our Guarantee
              </span>
              <h3 className="text-2xl sm:text-3xl font-heading font-extrabold tracking-tight">
                Not Just Theory. 100% Practical Experience.
              </h3>
              <p className="text-sm sm:text-base text-slate-300 font-medium max-w-2xl">
                Every course is bundled with hands-on labs, peer-reviewed assignments, and a final capstone project where you build a real-world product. When you finish, you don't just have a certificate—you have an active portfolio to show clients.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center max-w-xs">
                <span className="block text-4xl font-heading font-black text-brand-gold-light tracking-tight">
                  100%
                </span>
                <span className="block text-xs font-bold uppercase text-slate-200 mt-1 tracking-wider">
                  Hands-on Portfolio-Based
                </span>
                <p className="text-[11px] text-slate-400 mt-2">
                  Build 4-6 real projects during any course of your choice.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
