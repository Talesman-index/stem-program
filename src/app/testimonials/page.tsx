'use client';

import { useState } from 'react';
import Navbar from '../../components/public/Navbar';
import Footer from '../../components/public/Footer';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  category: 'participant' | 'parent';
  edition: string;
}

const listTestimonials: Testimonial[] = [
  {
    quote: "I had never thought about doing robotics before this camp. Now I know that is what I want to do. It was the best week of my summer.",
    name: "Marcus Tatum",
    role: "2024 Participant, High School",
    category: "participant",
    edition: "2024 Edition"
  },
  {
    quote: "My son came home transformed. He was talking about chemistry during dinner, asking questions about college. This camp opened doors he didn't even know existed.",
    name: "Denise Wilson",
    role: "Marcus's Mother, 2025",
    category: "parent",
    edition: "2025 Edition"
  },
  {
    quote: "We built a real robot in a team. We did experiments in a lab. And it was all free. I didn't believe it at first.",
    name: "Aaliyah Monroe",
    role: "2024 Participant, Middle School",
    category: "participant",
    edition: "2024 Edition"
  },
  {
    quote: "This program allowed my daughter to regain her confidence in science subjects. The mentors were exemplary in their listening and pedagogy. An invaluable opportunity.",
    name: "Robert Davis",
    role: "Chloe's Father, 2025",
    category: "parent",
    edition: "2025 Edition"
  },
  {
    quote: "I loved designing and navigating in our virtual reality universe. The teachers guide us without imposing limits. I'm going back next year!",
    name: "Chloe Davis",
    role: "2025 Participant, High School",
    category: "participant",
    edition: "2025 Edition"
  },
  {
    quote: "As a parent, seeing your child wake up motivated at 8:00 AM during the summer holidays to go do applied mathematics and biology is the best gift.",
    name: "Sarah Smith",
    role: "Elijah's Mother, 2024",
    category: "parent",
    edition: "2024 Edition"
  }
];

export default function Testimonials() {
  const [activeTab, setActiveTab] = useState<'all' | 'participant' | 'parent'>('all');

  const filtered = listTestimonials.filter(
    t => activeTab === 'all' || t.category === activeTab
  );

  return (
    <>
      <Navbar />

      <main className="flex-grow pt-24 bg-[#FFF9F0]">
        
        {/* ── Testimonials Header ── */}
        <section className="bg-[#133025] text-white py-20 text-center relative overflow-hidden border-b-2 border-black/10">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
          <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-white/20 blur-lg pointer-events-none" />
          <div className="absolute -left-12 -bottom-12 w-48 h-48 rounded-full bg-black/15 blur-lg pointer-events-none" />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
            <span className="section-sticker mb-4">
              Testimonials
            </span>
            <h1 className="font-accent text-4xl sm:text-6xl md:text-7xl leading-none tracking-wide text-white">
              They experienced the camp!
            </h1>
            <p className="font-body text-white/95 text-lg max-w-xl mt-6 leading-relaxed">
              Discover the authentic experiences of middle schoolers, high schoolers, and their parents.
            </p>
          </div>
        </section>

        {/* ── Content Directory ── */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Tabs Filter */}
          <div className="flex justify-center items-center gap-2 mb-16 bg-white p-2 rounded-full border border-[#133025]/10 max-w-md mx-auto shadow-inner">
            <button
              onClick={() => setActiveTab('all')}
              className={`flex-1 text-center font-body font-extrabold text-sm py-3 rounded-full transition-all cursor-pointer ${
                activeTab === 'all' 
                  ? 'bg-[#133025] text-white shadow-sm' 
                  : 'text-[#133025]/60 hover:text-[#133025]'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab('participant')}
              className={`flex-1 text-center font-body font-extrabold text-sm py-3 rounded-full transition-all cursor-pointer ${
                activeTab === 'participant' 
                  ? 'bg-[#133025] text-white shadow-sm' 
                  : 'text-[#133025]/60 hover:text-[#133025]'
              }`}
            >
              Participants
            </button>
            <button
              onClick={() => setActiveTab('parent')}
              className={`flex-1 text-center font-body font-extrabold text-sm py-3 rounded-full transition-all cursor-pointer ${
                activeTab === 'parent' 
                  ? 'bg-[#133025] text-white shadow-sm' 
                  : 'text-[#133025]/60 hover:text-[#133025]'
              }`}
            >
              Parents
            </button>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((t, idx) => (
              <div 
                key={idx} 
                className="camp-card bg-white border border-black/5 p-8 flex flex-col justify-between"
              >
                <div className="text-6xl text-[#5AC87A] opacity-20 font-serif absolute top-2 left-4 leading-none select-none">&ldquo;</div>
                <p className="font-body text-base text-[#1A1A2E] font-semibold italic leading-relaxed relative z-10 pt-4 pr-2">
                  {t.quote}
                </p>
                
                <div className="border-t border-black/5 mt-8 pt-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-[#E8F3FF] text-[#4A90D9] font-extrabold flex items-center justify-center font-display shadow-sm">
                      {t.name[0]}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-display font-extrabold text-sm text-[#1A1A2E]">{t.name}</span>
                      <span className="font-body text-xs text-[#7B7B9E] font-medium">{t.role}</span>
                    </div>
                  </div>
                  <span className="pill bg-[#FFF9F0] text-[#7B7B9E] text-[10px] font-accent uppercase border border-black/5 shrink-0">
                    {t.edition}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
