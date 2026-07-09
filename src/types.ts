/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Course {
  id: string;
  title: string;
  category: 'programming' | 'design' | 'marketing' | 'business' | 'tech';
  description: string;
  longDescription: string;
  duration: string;
  lessons: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  rating: number;
  reviewsCount: number;
  studentsCount: number;
  instructor: {
    name: string;
    role: string;
    avatar: string;
    bio: string;
  };
  outcomes: string[];
  curriculum: string[];
  tools: string[];
  imageUrl: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  courseCompleted: string;
  quote: string;
  avatarUrl: string;
  rating: number;
  year: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'admissions' | 'courses' | 'certificates' | 'technical';
}

export interface BatchInfo {
  batchNumber: number;
  registrationDeadline: string;
  commencementDate: string;
  status: 'Open' | 'Filling Fast' | 'Closed';
}

