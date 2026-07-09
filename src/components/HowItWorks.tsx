/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { UserCheck, Laptop, FileCheck, Award, Briefcase, Sparkles, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: <UserCheck className="w-6 h-6 text-brand-emerald" />,
      title: '1. Register & Secure Slot',
      description: 'Choose your desired high-income digital skill and fill out our simple online registration form. Secure your seat during the open admission window.',
    },
    {
      icon: <Laptop className="w-6 h-6 text-brand-emerald" />,
      title: '2. Watch & Interact',
      description: 'Gain access to premium, structured video lessons combined with live interactive weekly mentorship workshops with your industry experts.',
    },
    {
      icon: <FileCheck className="w-6 h-6 text-brand-emerald" />,
      title: '3. Build Portfolio Projects',
      description: 'Apply what you learn. Complete real-world project labs and submit assignments that are manually graded by our professional mentor team.',
    },
    {
      icon: <Award className="w-6 h-6 text-brand-emerald" />,
      title: '4. Get Certified',
      description: 'Complete the course and pass assessments to earn your official verifiable Al-Huda Academy Digital Certificate to showcase to employers.',
    },
    {
      icon: <Briefcase className="w-6 h-6 text-brand-emerald" />,
      title: '5. Launch Remote Career',
      description: 'Enroll in our dedicated freelancing mastery modules to optimize your profiles, draft magnetic proposals, and start earning on Upwork & Fiverr.',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-slate-50 relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-teal-100/20 -z-10 blur-3xl rounded-full"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-100 text-brand-emerald text-xs font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold-light" />
            <span>Success Roadmap</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-800 tracking-tight">
            Your 5-Step Journey to <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-emerald to-teal-600">Digital Mastery</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-500 font-medium">
            We have designed a streamlined, high-support educational model that turns complete novices into productive digital consultants.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="relative">
          {/* Connector line for desktop layout */}
          <div className="hidden lg:block absolute top-12 left-1/12 right-1/12 h-1 bg-gradient-to-r from-teal-100 via-brand-emerald/40 to-teal-100 -z-10 rounded-full"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {steps.map((step, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 relative group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Step Icon with number banner */}
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center group-hover:bg-brand-emerald group-hover:text-white transition duration-300">
                      {React.cloneElement(step.icon, {
                        className: 'w-6 h-6 text-brand-emerald group-hover:text-white transition'
                      })}
                    </div>
                    <span className="text-slate-200 font-mono font-black text-3xl select-none leading-none group-hover:text-teal-100 transition duration-300">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-heading font-extrabold text-slate-800 text-base leading-snug group-hover:text-brand-emerald transition">
                    {step.title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-slate-400 font-medium leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic call to action */}
        <div className="mt-16 bg-white rounded-3xl border border-slate-100 p-8 text-center max-w-xl mx-auto shadow-md shadow-slate-100/50 space-y-4">
          <p className="text-sm text-slate-600 font-medium">
            Ready to secure your seat and begin the journey? The current batch is filling up fast.
          </p>
          <button
            onClick={() => {
              const element = document.getElementById('courses');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 bg-brand-emerald hover:bg-teal-800 text-white font-bold text-xs sm:text-sm py-3 px-6 rounded-xl transition shadow-md shadow-teal-900/10 hover:scale-[1.01] cursor-pointer"
          >
            <span>Explore Cohort Courses</span>
            <ArrowRight className="w-4.5 h-4.5" />
          </button>
        </div>

      </div>
    </section>
  );
}
