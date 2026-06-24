'use client';

import { useState } from 'react';
import { Star, BadgeCheck } from 'lucide-react';
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
        <section className="bg-[#241765] text-white py-20 text-center relative overflow-hidden border-b-2 border-black/10">
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
          <div className="flex justify-center items-center gap-2 mb-16 bg-white p-2 rounded-full border border-[#241765]/10 max-w-md mx-auto shadow-inner">
            <button
              onClick={() => setActiveTab('all')}
              className={`flex-1 text-center font-body font-extrabold text-sm py-3 rounded-full transition-all cursor-pointer ${
                activeTab === 'all' 
                  ? 'bg-[#241765] text-white shadow-sm' 
                  : 'text-[#241765]/60 hover:text-[#241765]'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab('participant')}
              className={`flex-1 text-center font-body font-extrabold text-sm py-3 rounded-full transition-all cursor-pointer ${
                activeTab === 'participant' 
                  ? 'bg-[#241765] text-white shadow-sm' 
                  : 'text-[#241765]/60 hover:text-[#241765]'
              }`}
            >
              Participants
            </button>
            <button
              onClick={() => setActiveTab('parent')}
              className={`flex-1 text-center font-body font-extrabold text-sm py-3 rounded-full transition-all cursor-pointer ${
                activeTab === 'parent' 
                  ? 'bg-[#241765] text-white shadow-sm' 
                  : 'text-[#241765]/60 hover:text-[#241765]'
              }`}
            >
              Parents
            </button>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((t, idx) => {
              const accentColor = ['#AB80FF', '#6CAB53', '#241765', '#FFE566'][idx % 4];
              const isParent = t.category === 'parent';
              
              return (
                <div 
                  key={idx} 
                  className="relative bg-white p-7 flex flex-col justify-between gap-6 border-2 border-[#241765] rounded-[24px] transition-all duration-300 hover:-translate-y-1 hover:shadow-[7px_7px_0px_0px_var(--hover-shadow)] shadow-[4px_4px_0px_0px_var(--init-shadow)]"
                  style={{ 
                    ['--init-shadow' as any]: accentColor,
                    ['--hover-shadow' as any]: '#241765'
                  }}
                >
                  {/* Quote Mark background decoration */}
                  <div 
                    className="absolute -top-2 right-6 font-serif text-8xl select-none pointer-events-none opacity-[0.06] text-[#241765]"
                  >
                    “
                  </div>

                  <div className="space-y-4 relative z-10">
                    {/* Card Top Label & Stars */}
                    <div className="flex items-center justify-between gap-2">
                      <span 
                        className="px-2.5 py-1 text-[9px] font-accent uppercase tracking-wider rounded-md border border-[#241765] shadow-[1px_1px_0px_0px_#241765] font-normal"
                        style={{ 
                          backgroundColor: isParent ? '#F0EBFF' : '#E8F3FF',
                          color: '#241765'
                        }}
                      >
                        {isParent ? 'Parent Note' : 'Camper Story'}
                      </span>
                      
                      <div className="flex gap-0.5 text-yellow-400">
                        {[...Array(5)].map((_, s) => <Star key={s} className="w-3.5 h-3.5 fill-current" />)}
                      </div>
                    </div>

                    {/* Quote Content */}
                    <p className="font-body text-base text-[#241765] leading-relaxed italic font-bold">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center gap-3 pt-4 border-t border-[#241765]/10 mt-1 relative z-10 justify-between">
                    <div className="flex items-center gap-3">
                      {/* Letter Avatar - styled as squircle */}
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center font-display font-black text-[#241765] text-base border-2 border-[#241765] shadow-[2px_2px_0px_0px_#241765]"
                        style={{ backgroundColor: accentColor }}
                      >
                        {t.name[0]}
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-display font-extrabold text-sm text-[#241765]">{t.name}</span>
                          <BadgeCheck className="w-4 h-4 text-[#241765] fill-[rgba(36,23,101,0.08)] shrink-0" />
                        </div>
                        <div className="font-body text-xs text-[#6D7B9E] font-semibold">{t.role}</div>
                      </div>
                    </div>

                    <span className="pill bg-[#FCF9F2] text-[#241765] text-[9px] font-accent uppercase border-2 border-[#241765] shadow-[2px_2px_0px_0px_#241765] font-normal shrink-0">
                      {t.edition}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
