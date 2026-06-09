'use client';

import { useState, useRef } from 'react';
import Navbar from '../../components/public/Navbar';
import Footer from '../../components/public/Footer';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { submitPartnershipForm } from '../actions/dbActions';
import { 
  Heart, 
  Download, 
  Mail, 
  Award, 
  ShieldCheck, 
  Send, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  TrendingUp
} from 'lucide-react';

const fundingSchema = z.object({
  requestType: z.string().min(1, "Please select an organization type."),
  orgName: z.string().min(2, "Organization name must contain at least 2 characters.").max(100),
  contactName: z.string().min(2, "Contact name must contain at least 2 characters.").max(50),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().optional(),
  tierInterest: z.string().min(1, "Please select a support tier."),
  message: z.string().min(20, "Please write a message of at least 20 characters describing your inquiry."),
  wantsDossier: z.boolean()
});

type FundingFormFields = z.infer<typeof fundingSchema>;

interface PartnershipTier {
  id: string;
  name: string;
  amount: string;
  color: string;
  featured: boolean;
  perks: string[];
  impact: string;
  image: string;
}

const TIERS: PartnershipTier[] = [
  {
    id: 'bronze',
    name: 'Bronze Partner',
    amount: '$500 — $1,499',
    color: '#FF7A3D',
    featured: false,
    perks: ['Logo displayed on the website', 'Full annual impact report', 'Recognition during the closing ceremony'],
    impact: 'Covers daily nutritious snacks and learning materials for ten participants.',
    image: '/assets/images/young-school-kids-eating-lunch-talking-at-a-table-2026-01-05-06-28-36-utc.jpg'
  },
  {
    id: 'silver',
    name: 'Silver Partner',
    amount: '$1,500 — $4,999',
    color: '#2D4589',
    featured: false,
    perks: ['Bronze perks', 'Logo visibility on camp t-shirts', 'VIP invitation for 2 to the ceremony'],
    impact: 'Funds hardware kits (Robotics/VR) for an entire workgroup.',
    image: '/assets/images/VR_stem.png'
  },
  {
    id: 'gold',
    name: 'Gold Partner',
    amount: '$5,000+',
    color: '#FFE566',
    featured: true,
    perks: ['Silver perks', 'Physical banner display at the camp', 'Round table with college leadership', 'Exclusive sponsorship of a STEM discipline'],
    impact: 'Provides full-immersion training resources, specialized lab experiments, and mentor stipends.',
    image: '/assets/images/Labo_stem.png'
  }
];

export default function Funding() {
  const formRef = useRef<HTMLDivElement>(null);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm<FundingFormFields>({
    resolver: zodResolver(fundingSchema),
    defaultValues: {
      orgName: '',
      contactName: '',
      email: '',
      phone: '',
      tierInterest: 'define',
      message: '',
      wantsDossier: false
    }
  });

  const selectTierAndScroll = (tierId: string) => {
    setValue('tierInterest', tierId);
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const onSubmit = async (data: FundingFormFields) => {
    setSubmitStatus('loading');
    try {
      const res = await submitPartnershipForm(data as any);
      if (res.success) {
        setSubmitStatus('success');
        reset();
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    }
  };

  return (
    <>
      <Navbar />

      <main className="flex-grow pt-24 bg-[#FFF9F0]">
        
        {/* ── Funding Hero ── */}
        <section className="bg-[#162248] text-white py-20 relative overflow-hidden border-b-2 border-black/10">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
          <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-white/20 blur-lg pointer-events-none" />
          <div className="absolute -left-12 -bottom-12 w-48 h-48 rounded-full bg-[#FFE566]/25 blur-lg pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center">
            <span className="section-sticker mb-4">
              Sponsorship & Support
            </span>
            <h1 className="font-accent text-4xl sm:text-6xl md:text-7xl max-w-4xl leading-none tracking-wide text-white">
              Invest in the scientists of tomorrow.
            </h1>
            <p className="font-body text-white/95 text-lg sm:text-xl max-w-2xl mt-6 leading-relaxed">
              Every dollar invested in our program creates a hands-on learning opportunity for a youth who wouldn&apos;t have had access otherwise.
            </p>
          </div>
        </section>

        {/* ── Impact Numbers Section ── */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="section-sticker mb-4">
              Our Impact
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4.5xl text-[#1A1A2E]">
              What your support helps fund
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="camp-card bg-white border border-black/5 p-8 text-center flex flex-col items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#8CB97A]/15 text-[#8CB97A] flex items-center justify-center shadow-inner">
                <Heart className="w-7 h-7 stroke-[2.5]" />
              </div>
              <h3 className="font-display font-extrabold text-xl text-[#1A1A2E]">1 Week of Camp</h3>
              <p className="font-body text-sm text-[#3D3D5C] leading-relaxed">
                Allows a child to explore the 7 STEM disciplines daily without financial burden.
              </p>
            </div>
            
            <div className="camp-card bg-white border border-black/5 p-8 text-center flex flex-col items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#2D4589]/15 text-[#2D4589] flex items-center justify-center shadow-inner">
                <ShieldCheck className="w-7 h-7 stroke-[2.5]" />
              </div>
              <h3 className="font-display font-extrabold text-xl text-[#1A1A2E]">100% Free</h3>
              <p className="font-body text-sm text-[#3D3D5C] leading-relaxed">
                Guarantees absolute equality of opportunity for all families in Rowan County and surrounding areas.
              </p>
            </div>
            
            <div className="camp-card bg-white border border-black/5 p-8 text-center flex flex-col items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#162248]/15 text-[#162248] flex items-center justify-center shadow-inner">
                <Award className="w-7 h-7 stroke-[2.5]" />
              </div>
              <h3 className="font-display font-extrabold text-xl text-[#1A1A2E]">1 Official Certificate</h3>
              <p className="font-body text-sm text-[#3D3D5C] leading-relaxed">
                Recognizes student commitment and encourages them in their future educational and academic path.
              </p>
            </div>
            
            <div className="camp-card bg-white border border-black/5 p-8 text-center flex flex-col items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#2D4589]/15 text-[#2D4589] flex items-center justify-center shadow-inner">
                <TrendingUp className="w-7 h-7 stroke-[2.5]" />
              </div>
              <h3 className="font-display font-extrabold text-xl text-[#1A1A2E]">Quality Mentoring</h3>
              <p className="font-body text-sm text-[#3D3D5C] leading-relaxed">
                Offers educational workshops led by teachers and professionals from the innovation sector.
              </p>
            </div>
          </div>
        </section>

        {/* ── Why Support Block ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="camp-card text-[#1A1A2E] border-2 border-black/10 p-8 sm:p-14 text-center flex flex-col items-center gap-6" style={{ backgroundColor: '#FFE566' }}>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl">
              A program of community impact
            </h2>
            <p className="font-body text-[#1A1A2E]/90 text-base sm:text-lg leading-relaxed max-w-4xl">
              The Livingstone College Summer STEM Camp is not an ordinary summer camp. It is a real lever for social equality. Your funding allows for the purchase of laboratory equipment, reusable robotics kits, virtual reality headsets, as well as covering daily complimentary snacks, learning materials, and transportation for young participants.
            </p>
          </div>
        </section>

        {/* ── Partnership Tiers ── */}
        <section className="py-24 bg-[#F1F6EF] border-y-3 border-[#162248]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 flex flex-col items-center">
              <span className="inline-block bg-[#FFD15C] text-[#162248] font-accent text-xs px-3.5 py-1.5 uppercase tracking-widest rounded-md shadow-[2px_2px_0px_0px_#162248] transform -rotate-2 border-2 border-[#162248] mb-5 select-none">
                Sponsorship Tiers
              </span>
              <h2 className="font-accent text-4xl sm:text-5.5xl md:text-6.5xl text-[#162248] tracking-wide leading-none max-w-4xl mx-auto">
                CHOOSE YOUR IMPACT PATHWAY
              </h2>
              <p className="font-body text-[#162248]/85 text-base sm:text-lg mt-5 max-w-2xl mx-auto font-semibold leading-relaxed">
                Click on a pathway below to select that level. Your investment goes directly to supporting Rowan County youth.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-8">
              {TIERS.map((tier) => (
                <div
                  key={tier.id}
                  onClick={() => selectTierAndScroll(tier.id)}
                  className={`w-full md:w-[calc(50%-16px)] lg:w-[calc(33.33%-22px)] flex flex-col justify-between bg-[#FFF9F0] border-3 border-[#162248] rounded-[32px] overflow-hidden shadow-[6px_6px_0px_0px_#162248] hover:-translate-y-2 hover:translate-x-[-2px] hover:shadow-[8px_8px_0px_0px_#162248] cursor-pointer transition-all duration-300 relative group ${
                    tier.featured ? 'border-4 border-[#2D4589] shadow-[6px_6px_0px_0px_#2D4589] hover:shadow-[8px_8px_0px_0px_#2D4589]' : ''
                  }`}
                >
                  {/* Top Image block */}
                  <div className="relative h-52 w-full overflow-hidden border-b-3 border-[#162248] bg-[#F1F6EF]">
                    <img
                      src={tier.image}
                      alt={tier.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Amount sticker overlay */}
                    <div 
                      className="absolute top-4 left-4 text-white font-accent text-sm md:text-base px-4 py-1.5 rounded-xl uppercase tracking-wider border-2 border-[#162248] shadow-[2.5px_2.5px_0px_0px_#162248] transform -rotate-3 select-none"
                      style={{ backgroundColor: tier.featured ? '#FFD15C' : '#2D4589', color: tier.featured ? '#162248' : '#FFFFFF' }}
                    >
                      {tier.amount}
                    </div>
                    
                    {tier.featured && (
                      <div className="absolute top-4 right-4 bg-[#162248] text-[#FFD15C] font-display font-extrabold text-[10px] px-3 py-1 rounded-full uppercase tracking-widest border border-white/10 shadow-sm animate-pulse">
                        ⭐ Popular
                      </div>
                    )}
                  </div>

                  {/* Card Content block */}
                  <div className="p-6 flex-grow flex flex-col justify-between gap-6">
                    <div className="space-y-4">
                      {/* Title */}
                      <h3 className="font-display font-extrabold text-2xl text-[#162248] leading-tight">
                        {tier.name}
                      </h3>

                      {/* Direct Impact */}
                      <div className="bg-[#F1F6EF]/50 rounded-2xl p-4 border border-[#162248]/10">
                        <span className="text-[10px] font-mono font-extrabold text-[#2D4589] uppercase tracking-wider block mb-1">
                          Community Impact
                        </span>
                        <p className="font-body text-[#162248]/90 text-sm font-semibold leading-relaxed">
                          {tier.impact}
                        </p>
                      </div>

                      {/* Perks list */}
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono font-extrabold text-[#162248]/50 uppercase tracking-wider block">
                          Partner Perks
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {tier.perks.map((perk, perkIdx) => (
                            <span
                              key={perkIdx}
                              className="inline-flex items-center gap-1 bg-white border border-[#162248]/10 px-2.5 py-1 rounded-lg text-xs font-body font-semibold text-[#162248] shadow-[1px_1px_0px_0px_rgba(19,48,37,0.15)] hover:bg-[#F1F6EF]/30 transition-colors"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#2D4589] shrink-0 stroke-[2.5]" />
                              {perk}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="pt-2">
                      <button
                        className={`w-full py-3.5 px-6 rounded-2xl font-accent text-sm uppercase tracking-wider border-2 border-[#162248] shadow-[3px_3px_0px_0px_#162248] transition-all duration-150 group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:shadow-[1px_1px_0px_0px_#162248] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[0px_0px_0px_0px_#162248] cursor-pointer ${
                          tier.featured
                            ? 'bg-[#2D4589] text-white'
                            : 'bg-[#162248] text-white'
                        }`}
                      >
                        Select Pathway
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Resources Downloads ── */}
        <section className="py-16 bg-[#FFF9F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display font-extrabold text-2xl text-[#1A1A2E] mb-8">
              Resources for your administrative records
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-4">
              <a
                href="#"
                className="camp-card bg-white border border-black/5 px-6 py-4 flex items-center gap-3 font-body font-extrabold text-sm text-[#1A1A2E] hover:scale-105 transition-all shadow-sm"
              >
                <Download className="w-5 h-5 text-[#2D4589] stroke-[2.5]" />
                Camp Presentation Document (PDF)
              </a>
              <a
                href="#"
                className="camp-card bg-white border border-black/5 px-6 py-4 flex items-center gap-3 font-body font-extrabold text-sm text-[#1A1A2E] hover:scale-105 transition-all shadow-sm"
              >
                <Download className="w-5 h-5 text-[#2D4589] stroke-[2.5]" />
                2024 Edition Impact Report (PDF)
              </a>
            </div>
          </div>
        </section>

        {/* ── Partnership contact form ── */}
        <section ref={formRef} className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="camp-card bg-white border border-black/5 p-8 sm:p-14">
            <div className="text-center mb-10">
              <h2 className="font-display font-extrabold text-3xl text-[#1A1A2E]">Partner Form</h2>
              <p className="font-body text-[#7B7B9E] text-base mt-3 max-w-2xl mx-auto">
                Whether you are a corporation, a foundation, or an individual donor, let&apos;s discuss your support project.
              </p>
            </div>

            {submitStatus === 'success' && (
              <div className="mb-8 p-6 bg-[#DFFBE8] border-2 border-[#5AC87A] rounded-3xl text-green-900 flex items-start gap-4 animate-bounce-in">
                <CheckCircle2 className="w-6 h-6 text-[#5AC87A] shrink-0 mt-0.5 stroke-[2.5]" />
                <div>
                  <span className="font-display font-extrabold block text-base">Form sent!</span>
                  <span className="font-body text-sm mt-1.5 block">Your partnership request has been registered. Our team will contact you within 48 hours.</span>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-8 p-6 bg-[#FFF0E8] border-2 border-[#FF7A3D] rounded-3xl text-red-900 flex items-start gap-4 animate-bounce-in">
                <AlertCircle className="w-6 h-6 text-[#FF7A3D] shrink-0 mt-0.5 stroke-[2.5]" />
                <div>
                  <span className="font-display font-extrabold block text-base">Transmission Error</span>
                  <span className="font-body text-sm mt-1.5 block">A technical error is preventing your form from being sent. Please contact us directly by email.</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Org Type */}
                <div>
                  <label htmlFor="requestType" className="block text-sm font-extrabold text-[#3D3D5C] mb-2 pl-2">
                    Organization Type *
                  </label>
                  <div className="relative">
                    <select
                      id="requestType"
                      {...register('requestType')}
                      className={`w-full bg-white border-2 rounded-full px-5 py-3.5 font-body text-sm text-[#1A1A2E] focus:outline-none focus:ring-2 focus:ring-[#162248]/20 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%234B5563%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1.25em] bg-[right_1.25rem_center] bg-no-repeat ${
                        errors.requestType ? 'border-[#FF6B6B]' : 'border-black/10'
                      }`}
                    >
                      <option value="" disabled>Select an option</option>
                      <option value="corporate">Corporation / Private Sponsor</option>
                      <option value="grant">Institutional Grant</option>
                      <option value="individual">Individual Donor</option>
                      <option value="community">Community Partnership</option>
                      <option value="other">Other Organization</option>
                    </select>
                  </div>
                  {errors.requestType && (
                    <p className="text-[#FF6B6B] text-xs mt-2 pl-3 font-extrabold">{errors.requestType.message}</p>
                  )}
                </div>

                {/* Org Name */}
                <div>
                  <label htmlFor="orgName" className="block text-sm font-extrabold text-[#3D3D5C] mb-2 pl-2">
                    Organization Name *
                  </label>
                  <input
                    id="orgName"
                    type="text"
                    {...register('orgName')}
                    className={`w-full bg-white border-2 rounded-full px-5 py-3.5 font-body text-sm text-[#1A1A2E] focus:outline-none focus:ring-2 focus:ring-[#162248]/20 ${
                      errors.orgName ? 'border-[#FF6B6B]' : 'border-black/10'
                    }`}
                    placeholder="Company, association name..."
                  />
                  {errors.orgName && (
                    <p className="text-[#FF6B6B] text-xs mt-2 pl-3 font-extrabold">{errors.orgName.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Contact Name */}
                <div>
                  <label htmlFor="contactName" className="block text-sm font-extrabold text-[#3D3D5C] mb-2 pl-2">
                    Your First & Last Name *
                  </label>
                  <input
                    id="contactName"
                    type="text"
                    {...register('contactName')}
                    className={`w-full bg-white border-2 rounded-full px-5 py-3.5 font-body text-sm text-[#1A1A2E] focus:outline-none focus:ring-2 focus:ring-[#162248]/20 ${
                      errors.contactName ? 'border-[#FF6B6B]' : 'border-black/10'
                    }`}
                    placeholder="e.g. Sarah Smith"
                  />
                  {errors.contactName && (
                    <p className="text-[#FF6B6B] text-xs mt-2 pl-3 font-extrabold">{errors.contactName.message}</p>
                  )}
                </div>

                {/* Contact Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-extrabold text-[#3D3D5C] mb-2 pl-2">
                    Contact Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register('email')}
                    className={`w-full bg-white border-2 rounded-full px-5 py-3.5 font-body text-sm text-[#1A1A2E] focus:outline-none focus:ring-2 focus:ring-[#162248]/20 ${
                      errors.email ? 'border-[#FF6B6B]' : 'border-black/10'
                    }`}
                    placeholder="e.g. contact@company.com"
                  />
                  {errors.email && (
                    <p className="text-[#FF6B6B] text-xs mt-2 pl-3 font-extrabold">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Contact Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-extrabold text-[#3D3D5C] mb-2 pl-2">
                    Phone (optional)
                  </label>
                  <input
                    id="phone"
                    type="text"
                    {...register('phone')}
                    className="w-full bg-white border-2 border-black/10 rounded-full px-5 py-3.5 font-body text-sm text-[#1A1A2E] focus:outline-none focus:ring-2 focus:ring-[#162248]/20"
                    placeholder="e.g. 704-555-0100"
                  />
                </div>

                {/* Tier Interest */}
                <div>
                  <label htmlFor="tierInterest" className="block text-sm font-extrabold text-[#3D3D5C] mb-2 pl-2">
                    Support Tier of Interest *
                  </label>
                  <div className="relative">
                    <select
                      id="tierInterest"
                      {...register('tierInterest')}
                      className={`w-full bg-white border-2 rounded-full px-5 py-3.5 font-body text-sm text-[#1A1A2E] focus:outline-none focus:ring-2 focus:ring-[#162248]/20 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%234B5563%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1.25em] bg-[right_1.25rem_center] bg-no-repeat ${
                        errors.tierInterest ? 'border-[#FF6B6B]' : 'border-black/10'
                      }`}
                    >
                      <option value="define">To be defined / Discussed</option>
                      <option value="bronze">Bronze ($500 — $1,499)</option>
                      <option value="silver">Silver ($1,500 — $4,999)</option>
                      <option value="gold">Gold ($5,000+)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-extrabold text-[#3D3D5C] mb-2 pl-2">
                  Describe your partnership inquiry *
                </label>
                <textarea
                  id="message"
                  rows={4}
                  {...register('message')}
                  className={`w-full bg-white border-2 rounded-[24px] px-5 py-4 font-body text-sm text-[#1A1A2E] focus:outline-none focus:ring-2 focus:ring-[#162248]/20 ${
                    errors.message ? 'border-[#FF6B6B]' : 'border-black/10'
                  }`}
                  placeholder="Explain how you or your company would like to support the camp (hardware donations, financial sponsorship, scholarships...)"
                />
                {errors.message && (
                  <p className="text-[#FF6B6B] text-xs mt-2 pl-3 font-extrabold">{errors.message.message}</p>
                )}
              </div>

              {/* Checkbox Wants Dossier */}
              <div className="flex items-start gap-3.5 pl-2">
                <input
                  id="wantsDossier"
                  type="checkbox"
                  {...register('wantsDossier')}
                  className="rounded border-black/15 text-[#162248] focus:ring-[#162248] w-4.5 h-4.5 mt-1 cursor-pointer"
                />
                <label htmlFor="wantsDossier" className="font-body text-sm text-[#3D3D5C] font-semibold select-none cursor-pointer leading-normal">
                  I wish to receive the complete presentation pack and detailed estimated budget by email.
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitStatus === 'loading'}
                className="w-full bg-[#5AC87A] text-white hover:bg-[#4eb96d] font-body font-extrabold py-4 rounded-full flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-md disabled:opacity-50"
              >
                {submitStatus === 'loading' ? (
                  <>
                    <Clock className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 stroke-[2.5]" />
                    Submit Partnership Request
                  </>
                )}
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
