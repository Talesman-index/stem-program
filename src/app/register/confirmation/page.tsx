'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../../components/public/Navbar';
import Footer from '../../../components/public/Footer';
import { useRegistrationStore } from '../../../lib/store/registrationStore';
import { CheckCircle2, Home, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Confirmation() {
  const router = useRouter();
  const { student, parent, submitStatus, resetForm } = useRegistrationStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // If user lands here directly without submitting, redirect to register
    if (submitStatus !== 'success') {
      router.push('/register');
      return;
    }

    // Trigger premium confetti burst
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 }
    });

  }, [submitStatus, router]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Livingstone College Summer STEM Camp',
          text: 'Register your children for the free science and technology camp at Livingstone College!',
          url: window.location.origin
        });
      } catch (e) {
        console.log("Sharing cancelled or failed", e);
      }
    } else {
      // Fallback copy to clipboard
      navigator.clipboard.writeText(window.location.origin);
      alert("Website link copied to clipboard!");
    }
  };

  const handleReturnHome = () => {
    resetForm();
    router.push('/');
  };

  if (!mounted || submitStatus !== 'success') return null;

  return (
    <>
      <Navbar />

      <main className="flex-grow pt-28 bg-[#FFF9F0] flex items-center justify-center py-16 px-4 sm:px-6 relative overflow-hidden">
        {/* Playful background blobs */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#FFE566] opacity-30 blob animate-float pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#8B6FE8] opacity-20 blob animate-float pointer-events-none" style={{ animationDelay: '2s' }} />
        
        <section className="max-w-2xl w-full relative z-10">
          <div className="camp-card bg-white border-2 border-black/15 shadow-[8px_8px_0px_0px_rgba(26,26,46,1)] p-8 sm:p-12 text-center flex flex-col items-center gap-8 rounded-[32px]">
            
            {/* Animated Success Check Circle with Playful Styling */}
            <div className="w-24 h-24 rounded-full bg-[#5AC87A] text-white flex items-center justify-center shadow-md border-4 border-white animate-bounce-in">
              <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
            </div>

            {/* Title & Badge */}
            <div>
              <span className="section-sticker mb-4">
                CONGRATULATIONS!
              </span>
              <h1 className="font-accent text-3xl sm:text-5xl text-[#1A1A2E] mt-3 leading-none">
                Registration Confirmed!
              </h1>
              <p className="font-body text-[#7B7B9E] text-base mt-4 max-w-md mx-auto">
                A confirmation email containing your welcome pack has been sent to:
                <span className="block font-bold text-[#1A1A2E] mt-1 text-sm sm:text-base font-mono bg-[#FFF9F0] border border-black/5 rounded-full py-1.5 px-4 inline-block mt-2">
                  {parent.email}
                </span>
              </p>
            </div>

            {/* Recipient summary block */}
            <div className="bg-[#FFF9F0] rounded-[24px] p-6 border-2 border-black/10 w-full text-left font-body text-sm space-y-3 shadow-inner">
              <div className="flex justify-between border-b border-black/5 pb-2">
                <span className="text-[#7B7B9E] font-semibold">Student:</span>
                <span className="font-extrabold text-[#1A1A2E]">{student.first_name} {student.last_name}</span>
              </div>
              <div className="flex justify-between border-b border-black/5 pb-2">
                <span className="text-[#7B7B9E] font-semibold">Level:</span>
                <span className="font-extrabold text-[#1A1A2E]">
                  {student.school_level === 'middle' ? 'Middle School' : 'High School'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7B7B9E] font-semibold">Camp Session:</span>
                <span className="font-extrabold text-[#5AC87A]">
                  {student.school_level === 'middle' 
                    ? 'June 15 — 19, 2026' 
                    : 'June 22 — 26, 2026'
                  }
                </span>
              </div>
            </div>

            <p className="font-body text-xs text-[#7B7B9E] leading-relaxed max-w-md">
              Our team will review and validate your child's registration folder. You will receive SMS alerts as the session approaches.
            </p>

            {/* CTA action cluster */}
            <div className="flex flex-col sm:flex-row gap-4 w-full mt-2">
              <button
                onClick={handleReturnHome}
                className="flex-grow btn-primary bg-[#5AC87A] text-white font-body font-bold py-3.5 px-6 rounded-full flex items-center justify-center gap-2 hover:scale-[1.03] active:scale-[0.97] transition-all cursor-pointer shadow-md text-sm border-2 border-transparent"
              >
                <Home className="w-4 h-4 stroke-[2.5]" />
                Return to Home
              </button>
              <button
                onClick={handleShare}
                className="flex-grow btn-outline border-2 border-[#1A1A2E] bg-transparent hover:bg-[#1A1A2E] hover:text-white text-[#1A1A2E] font-body font-bold py-3 px-6 rounded-full flex items-center justify-center gap-2 transition-all cursor-pointer text-sm"
              >
                <Share2 className="w-4 h-4 stroke-[2.5]" />
                Share the Program
              </button>
            </div>
            
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
