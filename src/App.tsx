/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
import CourseDirectory from './components/CourseDirectory';
import MentorsSection from './components/MentorsSection';
import HowItWorks from './components/HowItWorks';
import FAQSection from './components/FAQSection';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import EnrollModal from './components/EnrollModal';
import FloatingChatButtons from './components/FloatingChatButtons';


export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isEnrollOpen, setIsEnrollOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | undefined>(undefined);

  const handleEnrollClick = (courseId?: string) => {
    setSelectedCourseId(courseId);
    setIsEnrollOpen(true);
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 110; // offset for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'courses', 'why-us', 'mentors', 'how-it-works', 'faq', 'contact'];
      const scrollPosition = window.scrollY + 180; // trigger point with margin

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-[#0F172A] font-sans antialiased overflow-x-hidden">
      {/* Header Navigation */}
      <Header onNavigate={handleNavigate} activeSection={activeSection} onEnrollClick={() => handleEnrollClick()} />

      {/* Main Page Layout */}
      <main>
        {/* Hero Section & Quick Stats */}
        <Hero onNavigate={handleNavigate} onEnrollClick={() => handleEnrollClick()} />

        {/* Benefits & Guarantees ("Why Us") */}
        <Benefits />

        {/* Course Catalog Directory */}
        <CourseDirectory onEnrollClick={handleEnrollClick} />

        {/* Meet Our Mentors */}
        <MentorsSection />

        {/* Roadmap Roadmap ("How It Works") */}
        <HowItWorks />

        {/* Searchable Accordion FAQs */}
        <FAQSection />

        {/* Inquiry Contact Form & Offices */}
        <ContactForm />
      </main>

      {/* Footer & Newsletter signup */}
      <Footer onNavigate={handleNavigate} />

      {/* Modern Student Enrollment Modal */}
      <EnrollModal 
        isOpen={isEnrollOpen} 
        onClose={() => setIsEnrollOpen(false)} 
        preSelectedCourseId={selectedCourseId} 
      />

      {/* Floating Chat Integrations (WhatsApp and Telegram) */}
      <FloatingChatButtons />
    </div>
  );
}
