/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sparkles, Linkedin, Twitter, Globe, Award, BookOpen, MessageSquare, Facebook } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../lib/LanguageContext';

interface Mentor {
  id: number;
  name: string;
  role: { en: string; ha: string };
  expertise: { en: string; ha: string };
  bio: { en: string; ha: string };
  photoUrl: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    globe?: string;
    facebook?: string;
  };
  skills: { en: string[]; ha: string[] };
  imageFit?: 'cover' | 'contain';
  imageClass?: string;
}

const MENTORS_DATA: Mentor[] = [
  {
    id: 1,
    name: 'Adam Salihu Adam',
    role: {
      en: 'Founder, Al-Huda Digital Academy',
      ha: 'Wanda Ya Kafa, Al-Huda Digital Academy'
    },
    expertise: {
      en: 'Professional Graphic Designer, Video Editor & Freelancer',
      ha: 'Kwararren Mai Zane, Gyaran Bidiyo & Freelancer'
    },
    bio: {
      en: 'Adam Salihu Adam is the Founder of Al-Huda Digital Academy and a passionate creative professional specializing in graphic design, video editing, and freelance digital services. He is dedicated to empowering young people with practical, in-demand digital skills that help them build successful careers, grow businesses, and create opportunities in the digital economy.',
      ha: 'Adam Salihu Adam shi ne wanda ya kafa Al-Huda Digital Academy, kuma babban kwararren mai zane, gyaran bidiyo, da freelance dijital. Ya sadaukar da kansa don taimakawa matasa su sami kwarewar fasaha ta gari domin gina rayuwar aiki mai nasara.'
    },
    photoUrl: 'https://lh3.googleusercontent.com/d/1NkYPJjiRTgE8ny4xMC_BVPzMGwnQQxdN',
    skills: {
      en: ['Graphic Design', 'Video Editing', 'Branding', 'Freelancing', 'Digital Skills Training'],
      ha: ['Zane da Waya', 'Gyaran Bidiyo', 'Branding', 'Freelancing', 'Horar da Fasaha']
    },
    socials: {
      facebook: 'https://www.facebook.com/adam.salihuadam.16',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      globe: 'https://alhudadigitalacademy01.com'
    }
  },
  {
    id: 2,
    name: 'Bala Sadiq',
    role: {
      en: 'Co-founder',
      ha: 'Abokin Hadin Gwiwa'
    },
    expertise: {
      en: 'Professional Graphic Designer & Freelancer',
      ha: 'Kwararren Mai Zane & Freelancer'
    },
    bio: {
      en: 'Bala Sadiq is the Co-founder of Al-Huda Digital Academy, a professional graphic designer, and freelancer.',
      ha: 'Bala Sadiq shi ne abokin hadin gwiwa na Al-Huda Digital Academy, kwararren mai zane ta wayar salula da freelancer.'
    },
    photoUrl: 'https://lh3.googleusercontent.com/d/1fY83wDkZ1UfFWTFalkoDr_LTbRZ5-Djm',
    skills: {
      en: ['Graphic Design', 'Freelancing', 'Branding', 'Creative Design'],
      ha: ['Zane da Waya', 'Freelancing', 'Branding', 'Zane Mai Kyau']
    },
    socials: {
      facebook: 'https://www.facebook.com/profile.php?id=100094286896470',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      globe: 'https://alhudadigitalacademy01.com'
    }
  },
  {
    id: 3,
    name: 'ADEYEMI RIDWAN',
    role: {
      en: 'Co-founder',
      ha: 'Abokin Hadin Gwiwa'
    },
    expertise: {
      en: 'Professional Graphic Designer',
      ha: 'Kwararren Mai Zane'
    },
    bio: {
      en: 'A highly experienced professional graphic designer specializing in advanced typographic compositions, color theories, and brand identity projects.',
      ha: 'Kwararren mai zane mai zurfin kwarewa a fannin tsara hotuna, zabar kalar alama, da zane-zane na tallace-tallace.'
    },
    photoUrl: 'https://lh3.googleusercontent.com/d/1w6hT-d5PP1LX6afXn4pkDWn-4hfErj3R',
    imageClass: 'object-contain object-top scale-[1.65] origin-top bg-white group-hover:scale-[1.73] transition duration-500',
    skills: {
      en: ['Graphic Design', 'Branding', 'Creative Design', 'Visual Communication'],
      ha: ['Zane da Waya', 'Branding', 'Zane Mai Kyau', 'Sadarwar Hoto']
    },
    socials: {
      facebook: 'https://www.facebook.com/profile.php?id=100094286896470',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      globe: 'https://alhudadigitalacademy01.com'
    }
  },
  {
    id: 4,
    name: 'Agyiri Timothy',
    role: {
      en: 'Co-Founder',
      ha: 'Abokin Hadin Gwiwa'
    },
    expertise: {
      en: 'Graphic Designer & Branding Specialist',
      ha: 'Mai Zane & Kwararren Branding'
    },
    bio: {
      en: 'A skilled Graphic Designer, Branding Specialist, and Creative Visual Designer passionate about creating impactful designs and supporting the growth of Al-Huda Digital Academy through creativity, innovation, and teamwork.',
      ha: 'Kwararren mai zane da branding, mai matukar sha\'awar samar da kyawawan hotunan talla da goyon bayan bunkasar Al-Huda Digital Academy ta hanyar kirkire-kirkire.'
    },
    photoUrl: 'https://lh3.googleusercontent.com/d/1sB-jzHSoHL7fSWZD6uFqJyAJBeCzcNNA',
    skills: {
      en: ['Graphic Design', 'Branding', 'Visual Design', 'Teamwork'],
      ha: ['Zane da Waya', 'Branding', 'Zane Mai Kyau', 'Aikin Kungiya']
    },
    socials: {
      facebook: 'https://www.facebook.com/profile.php?id=100094286896470',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      globe: 'https://alhudadigitalacademy01.com'
    }
  }
];

export default function MentorsSection() {
  const { language } = useLanguage();
  const activeLang = language === 'en' ? 'en' : 'ha';

  return (
    <section id="mentors" className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Visual background enhancements */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-emerald-50/30 -z-10 blur-3xl rounded-full"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-amber-50/20 -z-10 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto space-y-4 mb-16"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-brand-emerald text-xs font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>{language === 'en' ? 'Academy Leadership' : 'Jagorancin Academy'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-800 tracking-tight">
            {language === 'en' ? (
              <>
                Meet Our <span className="text-brand-emerald">Founders</span>
              </>
            ) : (
              <>
                Gana da <span className="text-brand-emerald">Malamanmu</span>
              </>
            )}
          </h2>
          <p className="text-sm sm:text-base text-slate-500 font-medium">
            {language === 'en'
              ? 'Learn directly from our founders and creative professionals dedicated to guiding you toward a thriving digital career.'
              : 'Koyi kai tsaye daga wadanda suka kafa wannan makaranta da kwararrun da suka sadaukar da kansu wajen yi muku jagora.'
            }
          </p>
        </motion.div>

        {/* Mentors Responsive Grid / Centered layout for leadership cards */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 lg:gap-12 max-w-5xl mx-auto">
          {MENTORS_DATA.map((mentor, idx) => (
            <motion.div 
              key={mentor.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              whileHover={{ 
                y: -10, 
                scale: 1.025,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              className="bg-white rounded-2xl border border-slate-100 shadow-md shadow-slate-100/40 flex flex-col h-full overflow-hidden group max-w-[320px] w-full hover:border-emerald-500/30 hover:ring-4 hover:ring-emerald-500/5 hover:shadow-[0_20px_40px_-12px_rgba(7,92,51,0.18),_0_15px_30px_-15px_rgba(176,137,34,0.15)] transition-all duration-300"
            >
              {/* Image & Overlay container */}
              <div className={`relative aspect-[5/4] w-full ${mentor.imageFit === 'contain' || mentor.imageClass ? 'bg-white' : 'bg-slate-100'} overflow-hidden`}>
                <img 
                  src={mentor.photoUrl} 
                  alt={mentor.name}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className={`w-full h-full ${mentor.imageClass || `${mentor.imageFit === 'contain' ? 'object-contain object-top' : 'object-cover object-top'} group-hover:scale-105 transition duration-500`}`}
                  onError={(e) => {
                    // Fallback to stylized SVG avatar placeholder if image fails to load
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                
                {/* Fallback avatar */}
                <div 
                  className="absolute inset-0 hidden flex-col items-center justify-center bg-gradient-to-br from-emerald-800 to-teal-900 text-white"
                  style={{ display: 'none' }}
                >
                  <Award className="w-12 h-12 text-brand-gold animate-pulse mb-1.5" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-200">Al-Huda Expert</span>
                </div>

                {/* Badge area */}
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase bg-emerald-500/90 text-white shadow-sm backdrop-blur-sm">
                    {mentor.expertise[activeLang].split('&')[0].split(',')[0]}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 flex flex-col flex-grow">
                {/* Meta details */}
                <div className="mb-3">
                  <h3 className="text-base font-heading font-extrabold text-slate-800 leading-snug group-hover:text-brand-emerald transition duration-200">
                    {mentor.name}
                  </h3>
                  <p className="text-[11px] font-bold text-brand-gold mt-0.5">
                    {mentor.role[activeLang]}
                  </p>
                </div>

                {/* Core Expertise label */}
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 mb-3 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                  <BookOpen className="w-3 h-3 text-brand-emerald flex-shrink-0" />
                  <span className="truncate">{mentor.expertise[activeLang]}</span>
                </div>

                {/* Short Bio */}
                <p className="text-xs text-slate-500 leading-relaxed font-medium flex-grow mb-3">
                  {mentor.bio[activeLang]}
                </p>

                {/* Skills Badges */}
                {mentor.skills && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {mentor.skills[activeLang].map((skill, sIdx) => (
                      <span 
                        key={sIdx}
                        className="px-1.5 py-0.5 rounded-md text-[9px] font-extrabold bg-emerald-50 text-[#075C33] border border-emerald-100/60 shadow-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                {/* Social links & Contact Trigger */}
                <div className="flex items-center justify-between border-t border-slate-100 pt-3 mt-auto">
                  {/* Optional social icons */}
                  <div className="flex gap-1.5">
                    {mentor.socials.facebook && (
                      <a 
                        href={mentor.socials.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${mentor.name} Facebook Profile`}
                        className="p-1 rounded-md bg-slate-50 border border-slate-100 text-slate-400 hover:text-brand-emerald hover:border-brand-emerald hover:bg-emerald-50 transition"
                      >
                        <Facebook className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {mentor.socials.linkedin && (
                      <a 
                        href={mentor.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${mentor.name} LinkedIn Profile`}
                        className="p-1 rounded-md bg-slate-50 border border-slate-100 text-slate-400 hover:text-brand-emerald hover:border-brand-emerald hover:bg-emerald-50 transition"
                      >
                        <Linkedin className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {mentor.socials.twitter && (
                      <a 
                        href={mentor.socials.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${mentor.name} Twitter Profile`}
                        className="p-1 rounded-md bg-slate-50 border border-slate-100 text-slate-400 hover:text-brand-emerald hover:border-brand-emerald hover:bg-emerald-50 transition"
                      >
                        <Twitter className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {mentor.socials.globe && (
                      <a 
                        href={mentor.socials.globe}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${mentor.name} Website`}
                        className="p-1 rounded-md bg-slate-50 border border-slate-100 text-slate-400 hover:text-brand-emerald hover:border-brand-emerald hover:bg-emerald-50 transition"
                      >
                        <Globe className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  {/* Tiny CTAs */}
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider group-hover:text-brand-emerald transition">
                    {language === 'en' ? 'Verified Mentor' : 'Tabbataccen Malami'}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
