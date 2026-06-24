'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Leaf, FlaskConical, Sigma, Cpu, Tv, Sprout, Gamepad2,
  ShieldCheck, RefreshCw, Users, Award, Calendar, Utensils,
  ArrowRight, ChevronLeft, ChevronRight, Star, MapPin, CheckCircle, Map,
  BadgeCheck, Heart, Quote, Sparkles, GraduationCap
} from 'lucide-react';
import Navbar from '../components/public/Navbar';
import Footer from '../components/public/Footer';

// ─── Data ────────────────────────────────────────────────────────────────────

interface Discipline {
  slug: string; title: string; icon: any;
  color: string; bgColor: string; excerpt: string;
  image: string;
}

const disciplines: Discipline[] = [
  { slug: 'biology',          title: 'Biology',            icon: Leaf,        color: '#6CAB53', bgColor: '#EAEFE3', excerpt: 'Explore living things in all their forms: microscopes, cells, and ecosystems.', image: '/assets/images/children-studying-science-using-microscope-in-clas-2026-04-13-23-13-15-utc.jpg' },
  { slug: 'chemistry',        title: 'Chemistry',          icon: FlaskConical,color: '#FF7A3D', bgColor: '#FFF0E8', excerpt: 'Laboratory experiments that illuminate minds through spectacular reactions.', image: '/assets/images/enthusiastic-children-explore-chemistry-in-science-2026-03-25-10-42-26-utc.jpg' },
  { slug: 'mathematics',      title: 'Mathematics',        icon: Sigma,       color: '#241765', bgColor: 'rgba(36,23,101,0.08)', excerpt: 'Logic serving real-world problems through collaborative challenges and puzzles.', image: '/assets/images/girl-writing-math-problems-on-a-whiteboard-2026-01-07-02-11-58-utc.jpg' },
  { slug: 'robotics',         title: 'Robotics',           icon: Cpu,         color: '#AB80FF', bgColor: 'rgba(171,128,255,0.08)', excerpt: 'Build and program robots to tackle exciting technical challenges.', image: '/assets/images/children-learn-about-robotics-with-robotics-kit-2026-03-05-11-56-52-utc.jpg' },
  { slug: 'virtual-reality',  title: 'Virtual Reality',    icon: Tv,          color: '#E84FA0', bgColor: '#FFE8F5', excerpt: 'Dive into the heart of immersive worlds and design custom 3D environments.', image: '/assets/images/child-using-virtual-reality-headset-in-classroom-2026-03-25-01-35-09-utc.jpg' },
  { slug: 'greenhouse-science', title: 'Greenhouse Science', icon: Sprout,    color: '#6CAB53', bgColor: '#EAEFE3', excerpt: 'Combine technology and agronomy to understand sustainable agriculture.', image: '/assets/images/greenhouse_science.png' },
  { slug: 'esports',          title: 'eSports',            icon: Gamepad2,    color: '#FFB800', bgColor: '#FFF8E0', excerpt: 'Team strategy, performance analysis, and exploring gaming careers.', image: '/assets/images/esports_camp.png' },
];

const testimonials = [
  { quote: "I had never thought about doing robotics before this camp. Now I know that is what I want to do.", name: 'Marcus T.', role: '2024 Participant, High School', category: 'participant', initial: 'M' },
  { quote: "My son came home transformed. He was talking about chemistry during dinner. This camp opened doors he didn't even know existed.", name: 'Denise W.', role: 'Mother of a 2025 participant', category: 'parent', initial: 'D' },
  { quote: "We built a real robot in a team. We did experiments in a lab. And it was all free. I didn't believe it at first.", name: 'Aaliyah M.', role: '2024 Participant, Middle School', category: 'participant', initial: 'A' },
  { quote: "This program allowed my daughter to regain her self-confidence. The mentors listened to her and guided her. An incredible opportunity!", name: 'Robert D.', role: 'Father of a 2025 participant', category: 'parent', initial: 'R' },
];

// ── Partner SVG Logotypes ─────────────────────────────────────────────────────
function LogoRowanChamber() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="80" height="80" rx="14" fill="#F5F7FA"/>
      {/* Shield shape */}
      <path d="M40 10 L62 20 L62 46 C62 58 52 66 40 70 C28 66 18 58 18 46 L18 20 Z" fill="#1B3A6B" stroke="#1B3A6B" strokeWidth="0.5"/>
      {/* Inner shield highlight */}
      <path d="M40 16 L57 24 L57 45 C57 55 49 62 40 65 C31 62 23 55 23 45 L23 24 Z" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
      {/* RC Monogram */}
      <text x="40" y="39" textAnchor="middle" fill="#FFD15C" fontSize="16" fontFamily="Georgia, serif" fontWeight="bold" letterSpacing="1">RC</text>
      {/* Stars */}
      <text x="40" y="52" textAnchor="middle" fill="#FFD15C" fontSize="8" fontFamily="sans-serif">★ ★ ★</text>
      {/* Bottom label */}
      <text x="40" y="72" textAnchor="middle" fill="#1B3A6B" fontSize="5.5" fontFamily="Arial, sans-serif" fontWeight="bold" letterSpacing="0.5">CHAMBER OF COMMERCE</text>
    </svg>
  );
}

function LogoDukeEnergy() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="80" height="80" rx="14" fill="#F5F7FA"/>
      {/* D shape background */}
      <path d="M22 18 L22 62 L42 62 C56 62 63 53 63 40 C63 27 56 18 42 18 Z" fill="#003087"/>
      {/* D inner cutout */}
      <path d="M30 26 L30 54 L41 54 C51 54 55 48 55 40 C55 32 51 26 41 26 Z" fill="#F5F7FA"/>
      {/* Lightning bolt */}
      <path d="M43 30 L37 41 L42 41 L38 52 L48 38 L43 38 Z" fill="#FF6B00"/>
      {/* DUKE text */}
      <text x="40" y="74" textAnchor="middle" fill="#003087" fontSize="7.5" fontFamily="Arial Black, sans-serif" fontWeight="900" letterSpacing="2">DUKE</text>
    </svg>
  );
}

function LogoNovantHealth() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="80" height="80" rx="14" fill="#F5F7FA"/>
      {/* Cross shape */}
      <rect x="34" y="14" width="12" height="52" rx="4" fill="#00A499"/>
      <rect x="14" y="34" width="52" height="12" rx="4" fill="#00A499"/>
      {/* Inner cross highlight */}
      <rect x="34" y="14" width="12" height="52" rx="4" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
      <rect x="14" y="34" width="52" height="12" rx="4" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
      {/* Center circle */}
      <circle cx="40" cy="40" r="6" fill="white"/>
      {/* N monogram */}
      <text x="40" y="44" textAnchor="middle" fill="#00A499" fontSize="8" fontFamily="Arial, sans-serif" fontWeight="bold">N</text>
    </svg>
  );
}

function LogoFoodLion() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="80" height="80" rx="14" fill="#F5F7FA"/>
      {/* Red banner */}
      <rect x="8" y="48" width="64" height="18" rx="4" fill="#CC0000"/>
      {/* Lion head silhouette (simplified) */}
      <ellipse cx="40" cy="34" rx="16" ry="14" fill="#CC0000"/>
      {/* Mane */}
      <ellipse cx="40" cy="36" rx="20" ry="16" fill="#AA0000"/>
      <ellipse cx="40" cy="34" rx="14" ry="12" fill="#CC0000"/>
      {/* Face */}
      <ellipse cx="40" cy="35" rx="10" ry="9" fill="#E8A040"/>
      {/* Eyes */}
      <ellipse cx="36.5" cy="32" rx="2" ry="2.2" fill="#1A1A1A"/>
      <ellipse cx="43.5" cy="32" rx="2" ry="2.2" fill="#1A1A1A"/>
      <circle cx="37.2" cy="31.3" r="0.7" fill="white"/>
      <circle cx="44.2" cy="31.3" r="0.7" fill="white"/>
      {/* Nose */}
      <path d="M38.5 36 Q40 37.5 41.5 36 Q40 38.5 38.5 36Z" fill="#8B4513"/>
      {/* Mouth */}
      <path d="M37 38 Q40 40 43 38" fill="none" stroke="#8B4513" strokeWidth="1" strokeLinecap="round"/>
      {/* Ears */}
      <ellipse cx="27" cy="26" rx="4.5" ry="5" fill="#CC0000"/>
      <ellipse cx="53" cy="26" rx="4.5" ry="5" fill="#CC0000"/>
      <ellipse cx="27" cy="26" rx="2.5" ry="3" fill="#E8A040"/>
      <ellipse cx="53" cy="26" rx="2.5" ry="3" fill="#E8A040"/>
      {/* Text */}
      <text x="40" y="60" textAnchor="middle" fill="white" fontSize="7" fontFamily="Arial Black, sans-serif" fontWeight="900" letterSpacing="1.5">FOOD LION</text>
    </svg>
  );
}

const partners = [
  { name: 'Rowan County Chamber', LogoComponent: LogoRowanChamber },
  { name: 'Duke Energy',           LogoComponent: LogoDukeEnergy },
  { name: 'Novant Health',         LogoComponent: LogoNovantHealth },
  { name: 'Food Lion',             LogoComponent: LogoFoodLion },
];

// Circular rotating text badge component
function RotatingBadge({ text, size = 110, color = '#fff', bgColor = 'rgba(255,255,255,0.15)', textColor = '#fff' }: {
  text: string; size?: number; color?: string; bgColor?: string; textColor?: string;
}) {
  const radius = size / 2 - 14;
  const circumference = 2 * Math.PI * radius;
  const chars = text.split('');
  const angleStep = 360 / chars.length;

  return (
    <div
      className="animate-[spin_18s_linear_infinite]"
      style={{ width: size, height: size, borderRadius: '50%', background: bgColor, border: `2px solid ${color}`, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <svg width={size} height={size} style={{ position: 'absolute', top: 0, left: 0 }}>
        {chars.map((char, i) => {
          const angle = (angleStep * i - 90) * (Math.PI / 180);
          const x = size / 2 + radius * Math.cos(angle);
          const y = size / 2 + radius * Math.sin(angle);
          return (
            <text
              key={i}
              x={x} y={y}
              textAnchor="middle"
              dominantBaseline="central"
              fill={textColor}
              fontSize="10"
              fontFamily="'Nunito', sans-serif"
              fontWeight="700"
              letterSpacing="0.05em"
              transform={`rotate(${angleStep * i}, ${x}, ${y})`}
            >
              {char}
            </text>
          );
        })}
      </svg>
      {/* Center dot */}
      <div style={{ width: 8, height: 8, borderRadius: '50%', background: color, position: 'relative', zIndex: 1 }} />
    </div>
  );
}

const markers = [
  { id: 'labs', label: 'Science Labs', x: '25%', y: '30%', icon: FlaskConical, color: '#241765', desc: 'Where chemistry and biology workshops are held in high-tech collegiate laboratories.' },
  { id: 'vr', label: 'Robotics & VR Arena', x: '55%', y: '45%', icon: Cpu, color: '#AB80FF', desc: 'Step into virtual worlds and build/program modular robots to solve challenges.' },
  { id: 'greenhouse', label: 'Greenhouse & Gardens', x: '35%', y: '68%', icon: Sprout, color: '#6CAB53', desc: 'Combine agronomy and technology inside our automated university greenhouse.' },
  { id: 'dining', label: 'Dining & Social Hall', x: '75%', y: '60%', icon: Utensils, color: '#FFB800', desc: 'Where students enjoy free chef-prepared daily meals and collaborative activities.' }
];

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Home() {
  const router = useRouter();
  const programsRef = useRef<HTMLDivElement>(null);
  const [selectedMarker, setSelectedMarker] = useState<string>('labs');

  // Stats count-up
  const [stats, setStats] = useState([
    { target: 3,   value: 0, label: 'Editions Hosted', suffix: '+' },
    { target: 7,   value: 0, label: 'STEM Disciplines',    suffix: ''  },
    { target: 100, value: 0, label: 'Youth Inspired',     suffix: '+' },
    { target: 100, value: 0, label: 'Free for Everyone',   suffix: '%' },
  ]);
  const statsRef   = useRef<HTMLDivElement>(null);
  const [counted, setCounted] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !counted) {
        setCounted(true);
        let step = 0; const steps = 60;
        const timer = setInterval(() => {
          step++;
          setStats(prev => prev.map(s => {
            const prog = step / steps;
            const eased = prog * (2 - prog);
            return { ...s, value: Math.min(Math.round(s.target * eased), s.target) };
          }));
          if (step >= steps) clearInterval(timer);
        }, 1800 / steps);
      }
    }, { threshold: 0.3 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, [counted]);

  // Testimonial filter
  const [activeTab, setActiveTab] = useState<'all' | 'participant' | 'parent'>('all');
  const filtered = testimonials.filter(t => activeTab === 'all' || t.category === activeTab);

  // Countdown
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, started: false });
  useEffect(() => {
    const target = new Date('2026-06-15T09:00:00');
    const calc = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) { setTimeLeft(p => ({ ...p, started: true })); return; }
      setTimeLeft({
        days:    Math.floor(diff / 86400000),
        hours:   Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000)  / 60000),
        seconds: Math.floor((diff % 60000)    / 1000),
        started: false,
      });
    };
    calc();
    const iv = setInterval(calc, 1000);
    return () => clearInterval(iv);
  }, []);

  return (
    <>
      <Navbar />
      <main className="overflow-x-hidden bg-bg-cream">

        {/* ══════════════════════════════════════════════════════════════════
            1. HERO SECTION — photo backdrop, bouncy title, curved mask
        ══════════════════════════════════════════════════════════════════ */}
        <section className="relative w-full overflow-hidden" style={{ height: '100svh', minHeight: 600 }}>

          {/* Background photo */}
          <Image
            src="/assets/images/close-up-shot-group-of-multiracial-teen-boy-and-gi-2026-03-26-10-38-06-utc.jpg"
            alt="STEM Camp participants"
            fill
            priority
            className="object-cover object-center"
          />

          {/* Dark gradient overlay */}
          <div
            className="absolute inset-0 z-10"
            style={{
              background: 'linear-gradient(to bottom, rgba(36,23,101,0.35) 0%, rgba(36,23,101,0.20) 50%, rgba(36,23,101,0.75) 100%)',
            }}
          />

          {/* Bouncy Title + Text & CTA */}
          <div
            className="absolute z-20 px-6 sm:px-10 lg:px-14 text-center sm:text-left"
            style={{ bottom: '18%', left: 0, right: 0 }}
          >
            {/* Session badge */}
            <div
              className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full"
              style={{ background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)', border: '1.5px solid rgba(255,255,255,0.3)' }}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#6CAB53] animate-pulse inline-block" />
              <span className="font-body font-extrabold text-white text-xs tracking-widest uppercase">
                Applications Open · Summer 2026
              </span>
            </div>

            {/* Giant Bouncy Title */}
            <h1
              className="font-accent text-white leading-none tracking-wide"
              style={{
                fontSize: 'clamp(3.8rem, 11.5vw, 8.5rem)',
                textShadow: '0 4px 24px rgba(36,23,101,0.5)',
              }}
            >
              STEM CAMP
            </h1>

            {/* Subtitle + CTA row */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 mt-3 max-w-4xl">
              <p
                className="font-body text-white/95 text-base sm:text-lg max-w-xl leading-relaxed"
                style={{ textShadow: '0 2px 10px rgba(36,23,101,0.6)' }}
              >
                A free one-week science and technology program for middle and high school students at Livingstone College. Explore coding, robotics, VR, and biochemistry.
              </p>
              <Link
                href="/register"
                id="hero-cta"
                className="btn-primary shrink-0 self-center sm:self-auto"
                style={{ background: 'var(--accent-orange)', padding: '15px 36px', fontSize: '1.05rem' }}
              >
                Register Now
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </Link>
            </div>
          </div>

          {/* Curved divider bottom mask */}
          <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-20">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-12 sm:h-20 md:h-28 fill-[#FCF9F2] translate-y-[2px]">
              <path d="M0,0 C150,90 350,120 600,120 C850,120 1050,90 1200,0 L1200,120 L0,120 Z" />
            </svg>
          </div>

          {/* Rotating badge — top-left corner */}
          <div className="absolute z-20 hidden lg:block" style={{ top: '150px', left: '4%' }}>
            <RotatingBadge
              text="✦ FREE FOR ALL ✦ LIVINGSTONE COLLEGE ✦ "
              size={120}
              color="rgba(255,255,255,0.75)"
              bgColor="rgba(82,183,136,0.18)"
              textColor="white"
            />
          </div>

          {/* Rotating badge — bottom-right corner */}
          <div className="absolute z-20 hidden lg:block" style={{ bottom: '12%', right: '3%' }}>
            <RotatingBadge
              text="✦ SUMMER 2026 ✦ SALISBURY NC ✦ STEM CAMP ✦ "
              size={120}
              color="rgba(255,255,255,0.75)"
              bgColor="rgba(171,128,255,0.18)"
              textColor="white"
            />
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            2. DISCOVER THE WONDER — floating portraits around central text
        ══════════════════════════════════════════════════════════════════ */}
        <section className="relative py-28 px-6 bg-[#FCF9F2] overflow-hidden">
          {/* Floating Circle Images (Desktop-only) */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none z-10">
            {/* Left floaters */}
            <div className="absolute left-[5%] top-[12%] animate-float" style={{ width: 85, height: 85 }}>
              <img src="/assets/images/children-learn-about-robotics-with-robotics-kit-2026-03-05-11-56-52-utc.jpg" className="w-full h-full rounded-full object-cover border-4 border-[#241765] shadow-md" alt="" />
            </div>
            <div className="absolute left-[11%] top-[42%] animate-float" style={{ width: 100, height: 100, animationDelay: '1.5s' }}>
              <img src="/assets/images/child-using-virtual-reality-headset-in-classroom-2026-03-25-01-35-09-utc.jpg" className="w-full h-full rounded-full object-cover border-4 border-[#241765] shadow-md" alt="" />
            </div>
            <div className="absolute left-[6%] top-[72%] animate-float" style={{ width: 80, height: 80, animationDelay: '3s' }}>
              <img src="/assets/images/enthusiastic-children-explore-chemistry-in-science-2026-03-25-10-42-26-utc.jpg" className="w-full h-full rounded-full object-cover border-4 border-[#241765] shadow-md" alt="" />
            </div>
            {/* Right floaters */}
            <div className="absolute right-[6%] top-[14%] animate-float" style={{ width: 90, height: 90, animationDelay: '0.8s' }}>
              <img src="/assets/images/portrait-of-male-and-female-students-building-robo-2026-03-10-04-49-54-utc.jpg" className="w-full h-full rounded-full object-cover border-4 border-[#241765] shadow-md" alt="" />
            </div>
            <div className="absolute right-[12%] top-[45%] animate-float" style={{ width: 105, height: 105, animationDelay: '2.2s' }}>
              <img src="/assets/images/multiethnic-schoolkids-building-robots-at-stem-eng-2026-01-08-00-20-01-utc.jpg" className="w-full h-full rounded-full object-cover border-4 border-[#241765] shadow-md" alt="" />
            </div>
            <div className="absolute right-[5%] top-[70%] animate-float" style={{ width: 85, height: 85, animationDelay: '3.6s' }}>
              <img src="/assets/images/boy-playing-and-building-with-lego-toys-2026-01-05-23-25-50-utc.jpg" className="w-full h-full rounded-full object-cover border-4 border-[#241765] shadow-md" alt="" />
            </div>
          </div>

          <div className="max-w-3xl mx-auto text-center relative z-20 flex flex-col items-center gap-6">
            <span className="section-sticker mb-4">
              Welcome
            </span>
            <h2 className="font-display text-4xl sm:text-6xl text-[#241765] tracking-tight leading-[1.1] font-extrabold max-w-2xl">
              Discover the wonder, friendship, and life-changing science
            </h2>
            <p className="font-body text-lg text-[#3D4A3E] max-w-xl leading-relaxed">
              Livingstone STEM Camp brings Salisbury youth together for one incredible, free week. We build confidence, foster local friendships, and unlock career paths.
            </p>
            <div className="mt-4">
              <Link href="#dates-rates" className="btn-primary" style={{ background: 'var(--accent-orange)' }}>
                Rates & Dates
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </Link>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            3. A WELCOMING NATURAL HAVEN — arched frames layout
        ══════════════════════════════════════════════════════════════════ */}
        <section className="py-24 px-6 bg-[#FCF9F2]">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left: Large arched photo */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="arched-frame w-full max-w-md aspect-[3/4] relative shadow-lg">
                <Image
                  src="/assets/images/portrait-of-happy-group-of-high-school-student-wit-2026-01-09-12-10-31-utc.jpg"
                  alt="Students at Livingstone campus"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right: Description & features */}
            <div className="lg:col-span-6 flex flex-col gap-6 text-[#241765]">
              <span className="section-sticker mb-4">
                Our Campus
              </span>
              <h2 className="font-display text-3xl sm:text-5xl leading-tight font-extrabold">
                A welcoming learning haven close to home
              </h2>
              <p className="font-body text-base sm:text-lg text-[#3D4A3E] leading-relaxed">
                Hosted at Livingstone College, our campus provides a secure and beautiful historic setting. Students get hands-on access to advanced collegiate labs and greenhouse technologies.
              </p>
              
              {/* Bullet points */}
              <ul className="flex flex-col gap-3 font-body font-bold text-sm sm:text-base text-[#241765] mt-2">
                {[
                  "150+ acres of historic learning spaces",
                  "State-of-the-art laboratory and virtual reality facilities",
                  "Safe environment guided by professional educators",
                ].map((bullet, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#6CAB53] shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Bottom minor arched frame */}
              <div className="flex gap-4 items-center mt-6">
                <div className="arched-frame-sm w-36 h-24 relative shadow-md shrink-0">
                  <Image
                    src="/assets/images/portrait-of-male-and-female-students-building-robo-2026-03-10-04-49-54-utc.jpg"
                    alt="Camp activity"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="font-body text-sm text-[#7A8C7B] italic">
                  Students build, code, and test real-world systems every single day.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            4. REGISTRATION TIMELINE — dark forest green, dashed timeline
        ══════════════════════════════════════════════════════════════════ */}
        <section className="py-24 px-6 bg-[#241765] text-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 flex flex-col items-center gap-4">
              <span className="section-sticker mb-4">Steps</span>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white">
                From registration to adventure journey
              </h2>
            </div>

            {/* Stepper with relative line */}
            <div className="step-line-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Dashed line on desktop */}
              <div className="hidden lg:block step-line" />
              
              {[
                { n: '01', label: 'Register Online',   desc: 'Fill out the form in under 10 minutes. A confirmation is sent to parents immediately.',        color: '#6CAB53' },
                { n: '02', label: 'Prep Time',          desc: 'Receive your welcome pack with schedules, behavior agreements, and camp logistics.',           color: '#241765' },
                { n: '03', label: 'Welcome to Campus', desc: 'Arrive at Livingstone College ready to meet your group, mentors, and program leaders.',        color: '#AB80FF' },
                { n: '04', label: 'Camp Life & Closing', desc: 'Dive into STEM workshops, complete challenges, and celebrate at our closing ceremony.',      color: '#241765' },
              ].map((step, idx) => (
                <div key={idx} className="relative z-10 bg-[#FCF9F2] border-2 border-[#241765] rounded-[24px] p-7 flex flex-col gap-4 shadow-[4px_4px_0px_0px_#241765]">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-accent text-xl border-2 border-[#241765] shadow-[1.5px_1.5px_0px_0px_#241765]"
                    style={{ 
                      backgroundColor: step.color, 
                      color: (step.color === '#241765' ? '#FFFFFF' : '#241765') 
                    }}
                  >
                    {step.n}
                  </div>
                  <h3 className="font-display text-xl font-extrabold text-[#241765]">{step.label}</h3>
                  <p className="font-body text-sm text-[#3D4A3E] leading-relaxed font-semibold">{step.desc}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-14">
              <Link href="/register" className="btn-primary" style={{ background: 'var(--accent-orange)' }}>
                Register Now
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </Link>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            5. CAMP SPACES SECTION — card grid of special facilities
        ══════════════════════════════════════════════════════════════════ */}
        <section className="py-24 px-6 bg-[#FCF9F2]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 flex flex-col items-center gap-4">
              <span className="section-sticker mb-4">Facilities</span>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#241765]">
                Discover the spaces that make camp special
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Science Labs',
                  desc: 'Equipped chemistry and biology workspaces where students perform safe hands-on experiments.',
                  image: '/assets/images/enthusiastic-children-explore-chemistry-in-science-2026-03-25-10-42-26-utc.jpg'
                },
                {
                  title: 'Robotics Arena',
                  desc: 'A custom workshop layout loaded with sensors and robot platforms for modular building.',
                  image: '/assets/images/children-learn-about-robotics-with-robotics-kit-2026-03-05-11-56-52-utc.jpg'
                },
                {
                  title: 'Greenhouse & Gardens',
                  desc: 'Active educational crop serres demonstrating agronomy, botany, and green tech.',
                  image: '/assets/images/greenhouse_science.png'
                }
              ].map((space, idx) => (
                <div key={idx} className="camp-card flex flex-col h-full bg-white">
                  <div className="h-56 relative w-full overflow-hidden">
                    <Image
                      src={space.image}
                      alt={space.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-7 flex flex-col gap-3 flex-grow">
                    <h3 className="font-display text-2xl font-bold text-[#241765]">{space.title}</h3>
                    <p className="font-body text-sm text-[#3D4A3E] leading-relaxed">{space.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            6. PROGRAMS THAT INSPIRE — circular disciplines grid
        ══════════════════════════════════════════════════════════════════ */}
        <section id="programs-preview" ref={programsRef} className="py-24 px-6 bg-[#FCF9F2] border-t border-[#241765]/10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 flex flex-col items-center gap-4">
              <span className="inline-block bg-[#FFD15C] text-[#241765] font-accent text-xs px-3 py-1 uppercase tracking-widest rounded border-2 border-[#241765] shadow-[1.5px_1.5px_0px_0px_#241765] transform -rotate-1 select-none">
                Disciplines
              </span>
              <h2 className="font-accent text-4xl sm:text-5.5xl text-[#241765] leading-none tracking-wide">
                Programs that inspire
              </h2>
              <p className="font-body text-base text-[#241765]/80 max-w-xl font-semibold mt-1">
                We rotate all students through 7 core disciplines, giving them a rich spectrum of experiences.
              </p>
            </div>

            {/* Cards program grid */}
            <div className="flex flex-wrap justify-center gap-6">
              {disciplines.map((d) => (
                <div
                  key={d.slug}
                  onClick={() => router.push(`/programs/${d.slug}`)}
                  className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] xl:w-[calc(25%-18px)] flex flex-col justify-between bg-[#FFF9F0] border-2 border-[#241765] rounded-[24px] overflow-hidden shadow-[4px_4px_0px_0px_#241765] hover:-translate-y-1 hover:translate-x-[-1px] hover:shadow-[5px_5px_0px_0px_#241765] cursor-pointer transition-all duration-200 group"
                >
                  {/* Top Image Banner */}
                  <div className="relative h-40 w-full overflow-hidden border-b-2 border-[#241765] bg-[#F1F6EF]">
                    <img
                      src={d.image}
                      alt={d.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Icon Container overlay */}
                    <div 
                      className="absolute bottom-3 right-3 w-10 h-10 rounded-lg flex items-center justify-center border-2 border-[#241765] shadow-[1.5px_1.5px_0px_0px_#241765]"
                      style={{ backgroundColor: '#FCF9F2' }}
                    >
                      <d.icon className="w-5 h-5 text-[#241765]" />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-grow flex flex-col justify-between gap-4">
                    <div className="space-y-2">
                      <h3 className="font-display text-lg font-extrabold text-[#241765] tracking-tight group-hover:text-[#241765] transition-colors">
                        {d.title}
                      </h3>
                      <p className="font-body text-xs text-[#3D4A3E]/90 leading-relaxed font-semibold">
                        {d.excerpt}
                      </p>
                    </div>

                    {/* Read more / Arrow */}
                    <div className="pt-2 flex items-center gap-1.5 text-[11px] font-accent uppercase tracking-wider text-[#241765] group-hover:text-[#241765] transition-colors mt-4">
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-16">
              <Link href="/programs" className="btn-outline border-2 border-[#241765] hover:bg-[#241765] hover:text-white transition-all shadow-[2px_2px_0px_0px_#241765]">
                View all disciplines
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            7. SAFETY BANNER — Care You Can Count On
        ══════════════════════════════════════════════════════════════════ */}
        <section className="py-24 px-6 bg-[#241765] text-white">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left: Arched image of safety/mentor */}
            <div className="lg:col-span-6 order-2 lg:order-1 flex justify-center">
              <div className="arched-frame w-full max-w-md aspect-[3/4] relative border-white/20 shadow-xl">
                <Image
                  src="/assets/images/multiethnic-schoolkids-building-robots-at-stem-eng-2026-01-08-00-20-01-utc.jpg"
                  alt="Safe learning experience"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right: Text details */}
            <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col gap-6">
              <span className="section-sticker mb-4">
                Safety First
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white leading-tight">
                Care you can count on every step of the way!
              </h2>
              <p className="font-body text-base sm:text-lg text-white/80 leading-relaxed">
                Nothing is more important to us than your child's well-being. Our camp has strict supervision ratios, licensed health professionals on staff, and clean modern classrooms.
              </p>
              
              <ul className="flex flex-col gap-3 font-body font-bold text-sm sm:text-base text-white/95">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#6CAB53] shrink-0" />
                  <span>1:8 Mentor to student supervision ratio</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#6CAB53] shrink-0" />
                  <span>Licensed nurse present on campus during sessions</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#6CAB53] shrink-0" />
                  <span>Strict check-in and authorized pick-up logs</span>
                </li>
              </ul>

              <div className="mt-4">
                <Link href="/faq" className="btn-primary" style={{ background: 'var(--accent-orange)' }}>
                  Learn about safety
                  <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            8. TESTIMONIALS — sage green bg, star cards
        ══════════════════════════════════════════════════════════════════ */}
        {/* ══════════════════════════════════════════════════════════════════
            8. TESTIMONIALS — Bento grid, high contrast, parent trust signals
        ══════════════════════════════════════════════════════════════════ */}
        <section className="py-24 px-6 bg-[#F1F6EF] border-t-2 border-[#241765]">
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-16 flex flex-col items-center">
              <span className="inline-block bg-[#FFE566] text-[#241765] font-accent text-xs px-3.5 py-1.5 uppercase tracking-widest rounded-md shadow-[2px_2px_0px_0px_#241765] transform -rotate-1.5 border-2 border-[#241765] mb-5 select-none font-normal">
                Testimonials
              </span>
              <h2 className="font-accent text-4xl sm:text-6xl text-[#241765] tracking-wide leading-none max-w-4xl mx-auto">
                WHAT OUR COMMUNITY SAYS
              </h2>
            </div>

            {/* Bento Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left: Rating and highlights dashboard card (span 4) */}
              <div className="lg:col-span-4 bg-[#241765] text-white p-8 rounded-[32px] border-2 border-[#241765] shadow-[6px_6px_0px_0px_#6CAB53] relative overflow-hidden flex flex-col gap-6">
                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-[#241765] rounded-full opacity-35 blur-xl pointer-events-none" />
                <div className="absolute -left-6 -top-6 w-24 h-24 bg-[#AB80FF] rounded-full opacity-25 blur-lg pointer-events-none" />

                <div className="relative z-10 flex flex-col gap-5">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1.5 text-[9px] font-accent uppercase tracking-wider bg-[#FFE566] text-[#241765] rounded-md border border-[#241765] shadow-[1px_1px_0px_0px_#241765] select-none font-normal">
                      Parent Verified
                    </span>
                    <div className="h-[2px] bg-white/20 flex-grow" />
                  </div>

                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="font-accent text-6xl text-[#FFE566] leading-none">4.9</span>
                    <span className="font-body text-white/70 text-lg font-bold">/ 5.0</span>
                  </div>

                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#FFE566] text-[#FFE566]" />
                    ))}
                  </div>

                  <p className="font-body text-sm text-white/80 leading-relaxed font-semibold">
                    Unbiased feedback from middle and high school parents and participants in Gaston, Rowan & Cabarrus counties.
                  </p>

                  <div className="space-y-4 pt-5 border-t border-white/10 mt-2">
                    <div className="flex items-start gap-3">
                      <div className="p-1 rounded bg-white/10 text-[#6CAB53] shrink-0 mt-0.5">
                        <BadgeCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-display font-extrabold text-sm text-white">100% Free STEM Camp</h4>
                        <p className="font-body text-xs text-white/65">Covers all course tools, snacks, lunch and field trips.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="p-1 rounded bg-white/10 text-[#6CAB53] shrink-0 mt-0.5">
                        <BadgeCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-display font-extrabold text-sm text-white">Inspiring & Safe Campus</h4>
                        <p className="font-body text-xs text-white/65">Full safety check-in, on-campus health coordinator.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-1 rounded bg-white/10 text-[#6CAB53] shrink-0 mt-0.5">
                        <BadgeCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-display font-extrabold text-sm text-white">Hands-on College Labs</h4>
                        <p className="font-body text-xs text-white/65">Robotics arenas, organic greenhouses & VR studios.</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center pt-6 relative mt-2">
                    <RotatingBadge text="★ PARENT TRUSTED ★ STEM CAMP ★" size={115} color="#6CAB53" bgColor="rgba(255,255,255,0.03)" textColor="#fff" />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <Heart className="w-6 h-6 text-[#6CAB53] fill-[#6CAB53]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Filter tabs & Reviews List (span 8) */}
              <div className="lg:col-span-8 flex flex-col gap-8">
                
                {/* Custom Filter Bar with a neat label */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/50 p-3 rounded-2xl border border-[#241765]/10 backdrop-blur-sm">
                  <span className="font-display font-extrabold text-sm text-[#241765] px-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#AB80FF]" />
                    Filter feedback:
                  </span>
                  
                  <div className="flex flex-wrap gap-2">
                    {(['all', 'participant', 'parent'] as const).map(tab => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className="px-5 py-2.5 rounded-xl font-accent text-xs tracking-wider uppercase transition-all duration-150 border-2 border-[#241765] cursor-pointer font-normal"
                        style={{
                          background: activeTab === tab ? '#AB80FF' : '#FFFFFF',
                          color:      activeTab === tab ? '#FFFFFF' : '#241765',
                          boxShadow:  activeTab === tab ? '3px 3px 0px 0px #241765' : '0px 0px 0px 0px #241765',
                          transform:  activeTab === tab ? 'translate(1px, 1px)' : 'none',
                        }}
                      >
                        {tab === 'all' ? 'All Reviews' : tab === 'participant' ? 'Participants' : 'Parents'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Reviews Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        <div className="flex items-center gap-3 pt-4 border-t border-[#241765]/10 mt-1 relative z-10">
                          {/* Letter Avatar - styled as squircle */}
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center font-display font-black text-[#241765] text-base border-2 border-[#241765] shadow-[2px_2px_0px_0px_#241765]"
                            style={{ backgroundColor: accentColor }}
                          >
                            {t.initial}
                          </div>
                          
                          <div className="flex-grow">
                            <div className="flex items-center gap-1.5">
                              <span className="font-display font-extrabold text-sm text-[#241765]">{t.name}</span>
                              <BadgeCheck className="w-4 h-4 text-[#241765] fill-[rgba(36,23,101,0.08)] shrink-0" />
                            </div>
                            <div className="font-body text-xs text-[#6D7B9E] font-semibold">{t.role}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            9. EXPLORE OUR CAMP MAP
        ══════════════════════════════════════════════════════════════════ */}
        <section className="py-24 px-6 bg-[#FCF9F2]">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
            <span className="section-sticker mb-4">Visual Map</span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#241765]">
              Explore our camp map
            </h2>
            <p className="font-body text-base text-[#3D4A3E] max-w-xl leading-relaxed">
              Livingstone College has a beautiful compact campus layout. See where the science labs, VR zones, and dining spaces are located.
            </p>
            
            {/* Interactive Campus Map Container */}
            <div className="relative w-full aspect-[16/10] border-4 border-[#241765] rounded-[32px] overflow-hidden shadow-lg mt-4 bg-[#F1F6EF]">
              {/* Background Image of Livingstone College */}
              <Image
                src="/assets/images/livingstone college.jpg"
                alt="Livingstone College Campus"
                fill
                className="object-cover brightness-[0.85] contrast-[1.05]"
              />
              
              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none" />
            </div>

            <div className="mt-4">
              <Link href="/contact" className="btn-outline">
                View Location details
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            9b. OUR PARTNERS & SUPPORTERS
        ══════════════════════════════════════════════════════════════════ */}
        <section className="py-24 px-6 bg-[#FCF9F2] border-t-2 border-[#241765]">
          <div className="max-w-6xl mx-auto text-center flex flex-col items-center gap-6">
            <span className="section-sticker mb-4 font-normal">Camp Sponsors</span>
            <h2 className="font-accent text-3xl sm:text-5xl text-[#241765] tracking-wide leading-none uppercase">
              Empowered by local partners
            </h2>
            <p className="font-body text-base text-[#3D4A3E] max-w-xl leading-relaxed">
              Our camp is 100% free for all students thanks to the generous support of corporate sponsors and local community leaders.
            </p>

            {/* Logo Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl mt-6">
              {partners.map((partner, i) => {
                const borderColors = ['#AB80FF', '#6CAB53', '#241765', '#FFE566'];
                const cardColor = borderColors[i % 4];
                return (
                  <div
                    key={i}
                    className="bg-white p-4 rounded-2xl border-2 border-[#241765] flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-[5px_5px_0px_0px_var(--shadow-color)]"
                    style={{ 
                      ['--shadow-color' as any]: cardColor,
                      boxShadow: `3px 3px 0px 0px ${cardColor}` 
                    }}
                  >
                    <div className="w-20 h-20 flex items-center justify-center">
                      <partner.LogoComponent />
                    </div>
                    <span className="font-display font-extrabold text-sm text-[#241765] text-center">
                      {partner.name}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-10">
              <Link href="/funding" className="btn-primary" style={{ background: '#AB80FF' }}>
                View Partnership Tiers & Support
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            10. DATES & RATES — bright green schedule bar
        ══════════════════════════════════════════════════════════════════ */}
        <section id="dates-rates" className="py-16 px-6 bg-[#6CAB53]">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
            <div>
              <h2 className="font-display text-3xl sm:text-5.5xl text-[#241765] font-extrabold tracking-tight">
                Dates to look forward to for Camp 2026
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="bg-white border-2 border-[#241765] rounded-2xl p-5 shadow-[3px_3px_0px_0px_#241765]">
                  <span className="block font-display font-extrabold text-lg text-[#241765]">Middle Schoolers (MS)</span>
                  <span className="font-body text-sm text-[#241765] font-bold mt-1 block">June 15 — 19, 2026 (9:00 AM - 3:00 PM)</span>
                </div>
                <div className="bg-white border-2 border-[#241765] rounded-2xl p-5 shadow-[3px_3px_0px_0px_#241765]">
                  <span className="block font-display font-extrabold text-lg text-[#241765]">High Schoolers (HS)</span>
                  <span className="font-body text-sm text-[#241765] font-bold mt-1 block">June 22 — 26, 2026 (9:00 AM - 3:00 PM)</span>
                </div>
              </div>
            </div>
            <div className="shrink-0 flex flex-col items-center gap-3">
              <Link
                href="/register"
                className="btn-primary"
                style={{ background: 'var(--accent-orange)', padding: '16px 40px', fontSize: '1.05rem' }}
              >
                Register Now
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </Link>
              <span className="font-body text-xs text-[#241765] font-bold uppercase tracking-wider">
                100% Free • Space is limited
              </span>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            11. INSTAGRAM MEDIA STRIP — marquee
        ══════════════════════════════════════════════════════════════════ */}
        <section className="py-8 bg-[#FCF9F2] overflow-hidden border-t border-[#241765]/5">
          <div className="relative flex overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap">
              {[
                '/assets/images/children-learn-about-robotics-with-robotics-kit-2026-03-05-11-56-52-utc.jpg',
                '/assets/images/child-using-virtual-reality-headset-in-classroom-2026-03-25-01-35-09-utc.jpg',
                '/assets/images/enthusiastic-children-explore-chemistry-in-science-2026-03-25-10-42-26-utc.jpg',
                '/assets/images/students-and-teacher-constructing-robots-in-school-2026-01-08-23-48-20-utc.jpg',
              ].map((src, i) => (
                <div key={i} className="w-64 h-48 relative overflow-hidden rounded-2xl mx-3 shrink-0 shadow-sm border border-[#241765]/10">
                  <Image src={src} alt="STEM activity" fill className="object-cover hover:scale-105 transition-transform duration-300" />
                </div>
              ))}
              {[
                '/assets/images/children-learn-about-robotics-with-robotics-kit-2026-03-05-11-56-52-utc.jpg',
                '/assets/images/child-using-virtual-reality-headset-in-classroom-2026-03-25-01-35-09-utc.jpg',
                '/assets/images/enthusiastic-children-explore-chemistry-in-science-2026-03-25-10-42-26-utc.jpg',
                '/assets/images/students-and-teacher-constructing-robots-in-school-2026-01-08-23-48-20-utc.jpg',
              ].map((src, i) => (
                <div key={i + 4} className="w-64 h-48 relative overflow-hidden rounded-2xl mx-3 shrink-0 shadow-sm border border-[#241765]/10">
                  <Image src={src} alt="STEM activity" fill className="object-cover hover:scale-105 transition-transform duration-300" />
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
