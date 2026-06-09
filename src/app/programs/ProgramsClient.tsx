'use client';

import Link from 'next/link';
import Navbar from '../../components/public/Navbar';
import Footer from '../../components/public/Footer';
import { Leaf, FlaskConical, Sigma, Cpu, Tv, Sprout, Gamepad2, ArrowRight } from 'lucide-react';

const iconMap = {
  Leaf,
  FlaskConical,
  Sigma,
  Cpu,
  Tv,
  Sprout,
  Gamepad2
};

const programsList = [
  {
    slug: 'biology',
    title: 'Biology',
    iconName: 'Leaf',
    color: '#8CB97A', // Sage Green
    image: '/assets/images/children-studying-science-using-microscope-in-clas-2026-04-13-23-13-15-utc.jpg',
    desc: "Dive deep into the study of life. Participants learn to operate professional microscopes, study biological specimens, and analyze local ecosystems."
  },
  {
    slug: 'chemistry',
    title: 'Chemistry',
    iconName: 'FlaskConical',
    color: '#FF7A3D', // Keep original Bronze/Chemistry color
    image: '/assets/images/Labo_stem.png',
    desc: "Discover the science of transformation. Through safe hands-on experiments, students study thermal reactions, molecular structures, and color science."
  },
  {
    slug: 'mathematics',
    title: 'Mathematics',
    iconName: 'Sigma',
    color: '#2D4589', // Brand Blue
    image: '/assets/images/girl-writing-math-problems-on-a-whiteboard-2026-01-07-02-11-58-utc.jpg',
    desc: "Develop logic and applied reasoning. Forget abstract theories: mathematics is presented through brain teasers, secret codes, and complex puzzles."
  },
  {
    slug: 'robotics',
    title: 'Robotics',
    iconName: 'Cpu',
    color: '#9795CE', // Brand Lavender
    image: '/assets/images/children-learn-about-robotics-with-robotics-kit-2026-03-05-11-56-52-utc.jpg',
    desc: "Get introduced to the basics of modern engineering. In teams, students design, assemble, and program autonomous mobile robots using sensors and visual code interfaces."
  },
  {
    slug: 'virtual-reality',
    title: 'Virtual Reality',
    iconName: 'Tv',
    color: '#9795CE', // Use Lavender for VR too as per brand colors or another matching color
    image: '/assets/images/VR_stem.png',
    desc: "Explore the frontiers of the virtual. Students learn the basics of 3D modeling and use VR headsets to explore the universe or travel inside the human body."
  },
  {
    slug: 'greenhouse-science',
    title: 'Greenhouse Science',
    iconName: 'Sprout',
    color: '#8CB97A', // Sage Green
    image: '/assets/images/children-studying-a-model-solar-system-at-school-2026-03-25-01-24-35-utc.jpg',
    desc: "Combine agricultural sciences and connected technologies. Students study smart irrigation, photosynthesis, and the design of modern hydroponic systems."
  },
  {
    slug: 'esports',
    title: 'eSports',
    iconName: 'Gamepad2',
    color: '#FFE566', // Keep Yellow for eSports
    image: '/assets/images/gamincg.png',
    desc: "Learn teamwork and strategy. Beyond gaming, we cover statistical performance analysis, media project management, and live broadcasting technologies."
  }
];

export default function ProgramsClient() {
  return (
    <>
      <Navbar />

      <main className="flex-grow pt-24 bg-[#FFF9F0]">
        
        {/* ── Programs Hero ── */}
        <section className="bg-[#162248] text-white py-20 relative overflow-hidden border-b-2 border-black/10">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
          <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-white/20 blur-lg pointer-events-none" />
          <div className="absolute -left-12 -bottom-12 w-48 h-48 rounded-full bg-[#FFE566]/20 blur-lg pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <span className="section-sticker mb-4">
              Academic Program
            </span>
            <h1 className="font-accent text-4xl sm:text-6xl md:text-7xl max-w-4xl mx-auto leading-none tracking-wide text-white mt-3">
              7 disciplines. One week to explore everything.
            </h1>
            <p className="font-body text-white/95 text-lg sm:text-xl max-w-2xl mx-auto mt-6 leading-relaxed">
              We don&apos;t limit options here. All participants participate in daily rotations to experience our entire STEM curriculum.
            </p>
          </div>
        </section>

        {/* ── Programs Grid ── */}
        <section className="py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {programsList.map((prog) => {
                const IconComponent = (iconMap as any)[prog.iconName] || Leaf;
                return (
                  <div
                    key={prog.slug}
                    className="camp-card bg-white border border-black/5 flex flex-col justify-between"
                  >
                    {/* Header Image */}
                    <div className="h-52 overflow-hidden relative border-b-2 border-black/5">
                      <img src={prog.image} alt={prog.title} className="w-full h-full object-cover" />
                      <div
                        className="absolute top-4 left-4 w-12 h-12 rounded-2xl flex items-center justify-center border-2 shadow-md bg-white"
                        style={{ borderColor: prog.color }}
                      >
                        <IconComponent className="w-6 h-6 stroke-[2.5]" style={{ color: prog.color }} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 flex-grow flex flex-col justify-between">
                      <div>
                        <h2 className="font-display font-extrabold text-2.5xl text-[#1A1A2E] mb-3">
                          {prog.title}
                        </h2>
                        <p className="font-body text-sm text-[#3D3D5C] leading-relaxed">
                          {prog.desc}
                        </p>
                      </div>

                      <div className="mt-8 pt-6 border-t border-black/5 flex items-center justify-between">
                        <Link
                          href={`/programs/${prog.slug}`}
                          className="font-body font-extrabold text-sm flex items-center gap-2 hover:scale-105 transition-transform"
                          style={{ color: prog.color }}
                        >
                          Explore this discipline
                          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
