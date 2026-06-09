'use client';

import { useState } from 'react';
import Navbar from '../../components/public/Navbar';
import Footer from '../../components/public/Footer';
import { Search, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQItem {
  q: string;
  r: string;
  category: 'general' | 'admission' | 'practical';
}

const faqs: FAQItem[] = [
  {
    q: "Is the camp really free?",
    r: "Yes, completely. Registration fees, materials, laboratory equipment, robotics kits, and complimentary daily snacks are all fully covered. There are no hidden fees for families.",
    category: "general"
  },
  {
    q: "Who can participate?",
    r: "The camp is open to middle school students (ages 10 to 14) and high school students (ages 14 to 18). Two separate one-week sessions are organized based on grade levels.",
    category: "admission"
  },
  {
    q: "When does the camp take place?",
    r: "Every year in June. In 2026, the Middle School session will run from June 15 to 19, and the High School session will take place from June 22 to 26.",
    category: "general"
  },
  {
    q: "What is the daily schedule?",
    r: "Activities run from 9:00 AM to 3:15 PM, Monday through Friday. Drop-off begins at 8:30 AM. Each day includes hands-on STEM activities, projects, and interactive challenges.",
    category: "practical"
  },
  {
    q: "Are meals provided?",
    r: "Lunch is held at 12:00 PM. Families are encouraged to pack a lunch for their child. Complimentary snacks are provided throughout the day.",
    category: "practical"
  },
  {
    q: "How do I register?",
    r: "You can register directly online through the 'Register' page. The form takes less than 10 minutes. A confirmation email is sent after administrative verification.",
    category: "admission"
  },
  {
    q: "Does my child need prior scientific knowledge?",
    r: "No prior knowledge is required. Our program is designed to spark curiosity, encourage questioning, and introduce science through hands-on practice, without exams or grades.",
    category: "general"
  },
  {
    q: "How many participants?",
    r: "Enrollment capacity is determined annually based on available funding, staffing, and program resources to ensure a high-quality experience for all participants.",
    category: "admission"
  },
  {
    q: "Are there prizes or awards?",
    r: "Yes! Students have opportunities to win prizes every day through STEM knowledge competitions, challenges, and participation activities. All participants also receive a certificate of completion at the end of the program.",
    category: "general"
  },
  {
    q: "Is a certificate of participation awarded?",
    r: "Yes. Each participant who maintains at least an 80% attendance rate receives an official certificate of participation signed by the leadership of Livingstone College during the closing ceremony.",
    category: "general"
  },
  {
    q: "How can I become a partner or financially support the program?",
    r: "You can visit our 'Partners & Funding' page (/funding) to discover our sponsorship tiers (Friend, Bronze, Silver, Gold, Platinum) or fill out the dedicated contact form to be contacted within 48 hours.",
    category: "practical"
  }
];

export default function FAQ() {
  const [search, setSearch] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'general' | 'admission' | 'practical'>('all');

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const filteredFaqs = faqs.filter(item => {
    const matchesSearch = item.q.toLowerCase().includes(search.toLowerCase()) || 
                          item.r.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Navbar />

      <main className="flex-grow pt-24 bg-[#FFF9F0]">
        
        {/* ── FAQ Header ── */}
        <section className="bg-[#162248] text-white py-20 text-center relative overflow-hidden border-b-2 border-black/10">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
          <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-white/20 blur-lg pointer-events-none" />
          <div className="absolute -left-12 -bottom-12 w-48 h-48 rounded-full bg-black/15 blur-lg pointer-events-none" />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
            <span className="section-sticker mb-4">
              Need Help?
            </span>
            <h1 className="font-accent text-4xl sm:text-6xl md:text-7xl leading-none tracking-wide text-white">
              Frequently Asked Questions
            </h1>
            <p className="font-body text-white/95 text-lg max-w-xl mt-6 leading-relaxed">
              Find answers about the schedule, registration criteria, and supervision of our summer camp.
            </p>
          </div>
        </section>

        {/* ── FAQ Content Area ── */}
        <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Controls Bar: Search & Categories */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-12 w-full">
            
            {/* Search Input */}
            <div className="relative flex-grow w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7B7B9E]" />
              <input
                type="text"
                placeholder="Search for a question or keyword..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white border-2 border-black/10 rounded-full pl-12 pr-6 py-3.5 font-body text-sm text-[#1A1A2E] focus:outline-none focus:border-[#162248] transition-all shadow-inner"
              />
            </div>
            
            {/* Category filters */}
            <div className="flex gap-2 shrink-0 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
              <button
                onClick={() => setCategoryFilter('all')}
                className={`px-5 py-2.5 rounded-full font-body font-extrabold text-xs sm:text-sm border-2 transition-all whitespace-nowrap cursor-pointer hover:scale-105 active:scale-95 ${
                  categoryFilter === 'all'
                    ? 'bg-[#162248] border-[#162248] text-white shadow-md'
                    : 'bg-white border-[#162248]/15 text-[#162248]/80 hover:bg-[#F1F6EF]/30 hover:border-[#162248]/30 hover:text-[#162248]'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setCategoryFilter('general')}
                className={`px-5 py-2.5 rounded-full font-body font-extrabold text-xs sm:text-sm border-2 transition-all whitespace-nowrap cursor-pointer hover:scale-105 active:scale-95 ${
                  categoryFilter === 'general'
                    ? 'bg-[#162248] border-[#162248] text-white shadow-md'
                    : 'bg-white border-[#162248]/15 text-[#162248]/80 hover:bg-[#F1F6EF]/30 hover:border-[#162248]/30 hover:text-[#162248]'
                }`}
              >
                General
              </button>
              <button
                onClick={() => setCategoryFilter('admission')}
                className={`px-5 py-2.5 rounded-full font-body font-extrabold text-xs sm:text-sm border-2 transition-all whitespace-nowrap cursor-pointer hover:scale-105 active:scale-95 ${
                  categoryFilter === 'admission'
                    ? 'bg-[#162248] border-[#162248] text-white shadow-md'
                    : 'bg-white border-[#162248]/15 text-[#162248]/80 hover:bg-[#F1F6EF]/30 hover:border-[#162248]/30 hover:text-[#162248]'
                }`}
              >
                Admissions
              </button>
              <button
                onClick={() => setCategoryFilter('practical')}
                className={`px-5 py-2.5 rounded-full font-body font-extrabold text-xs sm:text-sm border-2 transition-all whitespace-nowrap cursor-pointer hover:scale-105 active:scale-95 ${
                  categoryFilter === 'practical'
                    ? 'bg-[#162248] border-[#162248] text-white shadow-md'
                    : 'bg-white border-[#162248]/15 text-[#162248]/80 hover:bg-[#F1F6EF]/30 hover:border-[#162248]/30 hover:text-[#162248]'
                }`}
              >
                Practical Info
              </button>
            </div>
          </div>

          {/* Accordion Lists */}
          <div className="space-y-5">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div
                    key={idx}
                    className="camp-card bg-white border border-black/5 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleAccordion(idx)}
                      className="w-full flex items-center justify-between p-6 sm:p-7 text-left font-display font-extrabold text-base sm:text-xl text-[#1A1A2E] hover:bg-gray-50/50 transition-colors focus:outline-none"
                    >
                      <span className="flex items-center gap-3.5 pr-4">
                        <HelpCircle className="w-5.5 h-5.5 text-[#5AC87A] shrink-0" />
                        {faq.q}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-[#7B7B9E] shrink-0 stroke-[2.5]" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-[#7B7B9E] shrink-0 stroke-[2.5]" />
                      )}
                    </button>
                    
                    {/* Collapsible content */}
                    <div
                      className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        isOpen ? 'max-h-[300px] border-t-2 border-black/5' : 'max-h-0'
                      }`}
                    >
                      <div className="p-6 sm:p-7 font-body text-base text-[#3D3D5C] leading-relaxed bg-[#FFF9F0]/40">
                        {faq.r}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="camp-card py-20 bg-white border border-black/5 text-center">
                <p className="font-body text-[#7B7B9E] text-lg">
                  No questions match your search. Try other keywords.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
