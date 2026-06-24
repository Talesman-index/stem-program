'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight } from 'lucide-react';
import { StemLogo } from '../StemLogo';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Programs', href: '/programs' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Partners', href: '/funding' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* ── Floating Navbar ── */}
      <header
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
          scrolled ? 'w-[96%] max-w-6xl' : 'w-[92%] max-w-5xl'
        }`}
      >
        <div className="navbar-floating px-5 py-3 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center shrink-0 group hover:scale-[1.02] transition-transform duration-200" id="nav-logo">
            <StemLogo size="md" variant="color" />
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-3.5 py-2 rounded-full font-body font-700 text-sm transition-all duration-200 ${
                    active
                      ? 'font-extrabold'
                      : 'hover:bg-black/5'
                  }`}
                  style={{
                    color: active ? 'var(--accent-orange)' : 'var(--text-dark)',
                    fontWeight: active ? 800 : 600,
                    background: active ? 'rgba(171,128,255,0.08)' : undefined,
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA + Burger */}
          <div className="flex items-center gap-3">
            <Link
              href="/register"
              id="nav-cta"
              className="hidden sm:flex btn-primary text-sm px-5 py-2.5"
              style={{ background: 'var(--stem-orange)', fontSize: '0.875rem', padding: '10px 22px' }}
            >
              Register
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              id="nav-mobile-toggle"
              className="lg:hidden p-2 rounded-full hover:bg-black/5 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile overlay ── */}
      <div
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* ── Mobile drawer ── */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-40 w-72 bg-white shadow-2xl p-7 flex flex-col gap-6 lg:hidden transform transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ borderTopLeftRadius: 28, borderBottomLeftRadius: 28 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mt-2">
          <Link href="/" className="flex items-center" onClick={() => setMobileOpen(false)}>
            <StemLogo size="sm" variant="color" />
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Links */}
        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 rounded-2xl font-body font-semibold text-base transition-all"
                style={{
                  color: active ? 'var(--stem-green)' : 'var(--text-dark)',
                  background: active ? 'rgba(108,171,83,0.10)' : undefined,
                  fontWeight: active ? 800 : 600,
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA */}
        <Link
          href="/register"
          onClick={() => setMobileOpen(false)}
          className="btn-primary justify-center"
          style={{ background: 'var(--stem-orange)' }}
        >
          Register Now
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </>
  );
}
