import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { StemLogo } from '../StemLogo';

export default function Footer() {
  const currentYear = 2026;

  const disciplines = [
    { name: 'Biology', href: '/programs/biology' },
    { name: 'Chemistry', href: '/programs/chemistry' },
    { name: 'Mathematics', href: '/programs/mathematics' },
    { name: 'Robotics', href: '/programs/robotics' },
    { name: 'Virtual Reality', href: '/programs/virtual-reality' },
    { name: 'Greenhouse Science', href: '/programs/greenhouse-science' },
    { name: 'eSports', href: '/programs/esports' }
  ];

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Programs', href: '/programs' },
    { name: 'Photo Gallery', href: '/gallery' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Partners & Funding', href: '/funding' },
    { name: 'Contact Us', href: '/contact' }
  ];

  return (
    <footer className="w-full mt-auto bg-transparent">
      {/* ── CTA Section (Rounded Card) ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="relative overflow-hidden rounded-[32px] bg-[#241765] text-white p-8 md:p-14 shadow-lg border-2 border-black/10">
          {/* Playful blobs */}
          <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white/10 blur-xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-black/10 blur-xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl text-center lg:text-left">
              <span className="section-sticker mb-5">
                Limited Edition • 2026
              </span>
              <h3 className="font-display font-extrabold text-3xl sm:text-4.5xl text-white leading-tight">
                One week to change a life trajectory.
              </h3>
              <p className="font-body text-white/90 mt-4 text-base sm:text-lg max-w-xl">
                Spaces for our June 2026 edition are limited. Register your child today or become an official partner!
              </p>
            </div>
            
            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full sm:w-auto">
              <Link
                href="/register"
                className="w-full sm:w-auto text-center bg-[#AB80FF] text-white hover:bg-[#8b5ce6] font-body font-extrabold px-8 py-4 rounded-full flex items-center justify-center gap-2 transition-all shadow-md hover:scale-105 active:scale-95 text-base"
              >
                Register for free
                <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
              </Link>
              <Link
                href="/funding"
                className="w-full sm:w-auto text-center bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 font-body font-extrabold px-8 py-4 rounded-full transition-all hover:scale-105 active:scale-95 text-base"
              >
                Support the camp
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Footer block with rounded top corners ── */}
      <div className="bg-[#241765] text-[#FFF9F0] rounded-t-[48px] border-t-2 border-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          
          {/* Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/10">
            
            {/* Column 1: Brand & Tagline */}
            <div className="flex flex-col gap-6">
              <Link href="/" className="flex items-center shrink-0 group hover:scale-[1.02] transition-transform duration-200" id="footer-logo">
                <StemLogo size="md" variant="white" />
              </Link>
              
              <p className="font-body text-sm text-[#FFF9F0]/85 leading-relaxed">
                The Summer STEM Camp inspires middle and high school students from underrepresented communities to explore the sciences and technologies of tomorrow.
              </p>
              
              {/* Social links */}
              <div className="flex items-center gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#6CAB53] text-white flex items-center justify-center transition-all hover:scale-110"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M9 8H7v3h2v9h4v-9h3.6l.4-3h-4V6.5c0-.8.2-1 1-1h3V2h-4.3C10.5 2 9 3.5 9 6.5V8z" />
                  </svg>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#AB80FF] text-white flex items-center justify-center transition-all hover:scale-110"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4 stroke-current fill-none stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#241765] text-white flex items-center justify-center transition-all hover:scale-110"
                  aria-label="Twitter"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Column 2: Navigation Links */}
            <div className="lg:pl-8">
              <h4 className="font-display font-extrabold text-base text-white mb-6 flex items-center gap-2">
                <span className="w-1.5 h-4 bg-[#6CAB53] rounded-full inline-block" />
                Navigation
              </h4>
              <ul className="space-y-3 font-body text-sm">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[#FFF9F0]/70 hover:text-[#6CAB53] hover:pl-1 transition-all duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Disciplines */}
            <div>
              <h4 className="font-display font-extrabold text-base text-white mb-6 flex items-center gap-2">
                <span className="w-1.5 h-4 bg-[#AB80FF] rounded-full inline-block" />
                Disciplines
              </h4>
              <ul className="space-y-3 font-body text-sm">
                {disciplines.map((disc) => (
                  <li key={disc.href}>
                    <Link
                      href={disc.href}
                      className="text-[#FFF9F0]/70 hover:text-[#AB80FF] hover:pl-1 transition-all duration-200"
                    >
                      {disc.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact info */}
            <div className="flex flex-col gap-6">
              <h4 className="font-display font-extrabold text-base text-white flex items-center gap-2">
                <span className="w-1.5 h-4 bg-[#241765] rounded-full inline-block" />
                Contact
              </h4>
              <ul className="space-y-4 font-body text-sm text-[#FFF9F0]/80">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#6CAB53] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">
                    Livingstone College<br />
                    Salisbury, NC 28144
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#6CAB53] shrink-0" />
                  <a href="mailto:stem@livingstone.edu" className="hover:text-[#6CAB53] transition-colors">
                    stem@livingstone.edu
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#6CAB53] shrink-0" />
                  <a href="tel:+17042166000" className="hover:text-[#6CAB53] transition-colors">
                    +1 (704) 216-6000
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* Copyright & Legal info */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#FFF9F0]/50 font-body">
            <p className="text-center md:text-left">
              &copy; {currentYear} Livingstone College STEM Program. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}

