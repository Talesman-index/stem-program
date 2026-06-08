'use client';

import Link from 'next/link';
import Navbar from '../../../components/public/Navbar';
import Footer from '../../../components/public/Footer';
import { DisciplineData } from '../../../data/disciplines';
import { 
  Leaf, 
  FlaskConical, 
  Sigma, 
  Cpu, 
  Tv, 
  Sprout, 
  Gamepad2, 
  ArrowLeft, 
  CheckCircle2, 
  Activity, 
  Award,
  ArrowRight
} from 'lucide-react';

const iconMap = {
  Leaf,
  FlaskConical,
  Sigma,
  Cpu,
  Tv,
  Sprout,
  Gamepad2
};

interface ClientProps {
  data: DisciplineData;
}

export default function DisciplineDetailClient({ data }: ClientProps) {
  const IconComponent = iconMap[data.iconName] || Leaf;

  return (
    <>
      <Navbar />

      <main className="flex-grow pt-24 bg-[#FFF9F0]">
        
        {/* ── Dynamic Header / Hero ── */}
        <section className="relative text-white py-20 overflow-hidden bg-[#1A1A2E] rounded-b-[48px] border-b-2 border-black/10">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Back Button */}
            <Link 
              href="/programs" 
              className="inline-flex items-center gap-2 text-sm text-white/75 hover:text-[#FFE566] mb-8 transition-colors group font-body font-bold"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to disciplines
            </Link>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-4 sm:gap-6">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center p-3 shadow-md bg-white border-2" 
                  style={{ borderColor: data.color }}
                >
                  <IconComponent className="w-8 h-8 stroke-[2.5]" style={{ color: data.color }} />
                </div>
                <div>
                  <span className="section-sticker mb-4" style={{ backgroundColor: `${data.color}25`, color: data.color, borderColor: data.color, boxShadow: `2px 2px 0px 0px ${data.color}` }}>
                    STEM Discipline
                  </span>
                  <h1 className="font-accent text-3xl sm:text-5xl mt-2 tracking-tight text-white">
                    {data.title}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Core Layout Grid ── */}
        <section className="py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16">
              
              {/* Left Column: Description & Activities */}
              <div className="lg:col-span-7 flex flex-col gap-10">
                
                {/* Description */}
                <div className="camp-card p-8 bg-white border border-black/5">
                  <h2 className="font-display font-extrabold text-2xl text-[#1A1A2E] mb-4 pb-2 border-b border-black/5">
                    General Overview
                  </h2>
                  <p className="font-body text-base text-[#3D3D5C] leading-relaxed">
                    {data.description}
                  </p>
                </div>

                {/* Activities List */}
                <div>
                  <h2 className="font-display font-extrabold text-2.5xl text-[#1A1A2E] mb-6 flex items-center gap-2.5">
                    <Activity className="w-6 h-6 stroke-[2.5]" style={{ color: data.color }} />
                    Hands-on Workshops & Activities
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {data.activities.map((act, idx) => (
                      <div key={idx} className="camp-card p-6 bg-white border border-black/5 flex items-start gap-3.5">
                        <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: data.color }} />
                        <span className="font-body text-sm text-[#1A1A2E] font-semibold leading-normal">{act}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Hero image, Skills, Testimonial Quote */}
              <div className="lg:col-span-5 flex flex-col gap-8">
                
                {/* Banner Media Card */}
                <div className="camp-card rounded-[32px] overflow-hidden aspect-video border border-black/5 bg-white p-2">
                  <img src={data.heroImage} alt={data.title} className="w-full h-full object-cover rounded-[24px]" />
                </div>

                {/* Skills gained */}
                <div className="camp-card p-8 bg-white border border-black/5">
                  <h3 className="font-display font-extrabold text-xl text-[#1A1A2E] mb-4 flex items-center gap-2 border-b border-black/5 pb-2">
                    <Award className="w-5 h-5 stroke-[2.5]" style={{ color: data.color }} />
                    Skills Gained
                  </h3>
                  <ul className="space-y-3.5">
                    {data.skills.map((skill, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-[#3D3D5C] font-medium leading-relaxed">
                        <span className="w-2 h-2 rounded-full shrink-0 mt-2" style={{ backgroundColor: data.color }} />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Testimonial Quote */}
                {data.quote && (
                  <div 
                    className="camp-card border-l-4 p-8 relative" 
                    style={{ borderLeftColor: data.color, backgroundColor: `${data.color}05` }}
                  >
                    <span className="font-serif text-6xl absolute top-1 right-5 leading-none opacity-20" style={{ color: data.color }}>&rdquo;</span>
                    <p className="font-body text-sm text-[#1A1A2E] font-semibold italic leading-relaxed relative z-10 pr-6">
                      &ldquo;{data.quote.text}&rdquo;
                    </p>
                    <span className="block font-display font-extrabold text-xs text-[#7B7B9E] mt-4">
                      — {data.quote.author}
                    </span>
                  </div>
                )}
              </div>

            </div>

            {/* Bottom Register Call to Action */}
            <div className="mt-20">
              <div className="camp-card relative overflow-hidden text-white p-8 md:p-12 border-2 border-black/10 flex flex-col md:flex-row items-center justify-between gap-8" style={{ backgroundColor: '#9795CE' }}>
                <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/10 blur-xl pointer-events-none" />
                
                <div className="relative z-10 text-center md:text-left">
                  <h3 className="font-display font-extrabold text-2xl sm:text-3.5xl text-white">
                    Want to try all 7 disciplines?
                  </h3>
                  <p className="font-body text-white/90 mt-2 text-sm sm:text-base max-w-xl">
                    Applications for the June 2026 edition are completely free and open now.
                  </p>
                </div>
                
                <div className="relative z-10 w-full md:w-auto shrink-0">
                  <Link
                    href="/register"
                    className="w-full md:w-auto text-center bg-[#FFE566] text-[#1A1A2E] hover:bg-[#fff099] font-body font-extrabold px-8 py-4 rounded-full flex items-center justify-center gap-2 transition-all shadow-md hover:scale-105 active:scale-95 text-base"
                  >
                    Register for free
                    <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
