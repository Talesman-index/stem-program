'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Navbar from '../../components/public/Navbar';
import Footer from '../../components/public/Footer';
import { submitContactForm } from '../actions/contactActions';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Clock } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, "Name must contain at least 2 characters.").max(50),
  email: z.string().email("Please enter a valid email address."),
  subject: z.string().min(1, "Please select a contact subject."),
  message: z.string().min(10, "Message must contain at least 10 characters.").max(1000)
});

type ContactFormFields = z.infer<typeof contactSchema>;

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormFields>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      message: ''
    }
  });

  const onSubmit = async (data: ContactFormFields) => {
    setStatus('loading');
    try {
      const response = await submitContactForm(data as any);
      if (response.success) {
        setStatus('success');
        reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  const subjectLabels = {
    register: 'Registration Question',
    partner: 'Partnerships & Sponsorship',
    press: 'Press & Media',
    other: 'Other Request'
  };

  return (
    <>
      <Navbar />

      <main className="flex-grow pt-24 bg-[#FFF9F0]">
        
        {/* ── Contact Hero ── */}
        <section className="bg-[#133025] text-white py-20 text-center relative overflow-hidden border-b-2 border-black/10">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
          <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-white/20 blur-lg pointer-events-none" />
          <div className="absolute -left-12 -bottom-12 w-48 h-48 rounded-full bg-black/15 blur-lg pointer-events-none" />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
            <span className="section-sticker mb-4">
              Contact
            </span>
            <h1 className="font-accent text-4xl sm:text-6xl md:text-7xl leading-none tracking-wide text-white">
              Let&apos;s Talk!
            </h1>
            <p className="font-body text-white/95 text-lg max-w-xl mt-6 leading-relaxed">
              Our team is available to answer all your academic, logistical, or financial questions.
            </p>
          </div>
        </section>

        {/* ── Contact Layout ── */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16">
            
            {/* Form Column (Left - 7 cols) */}
            <div className="lg:col-span-7 camp-card bg-white p-8 sm:p-12 border border-black/5 flex flex-col justify-between">
              <div>
                <h2 className="font-display font-extrabold text-2.5xl text-[#1A1A2E] mb-6">Send a Message</h2>
                
                {status === 'success' && (
                  <div className="mb-8 p-6 bg-[#DFFBE8] border-2 border-[#5AC87A] rounded-3xl text-green-900 flex items-start gap-4 animate-bounce-in">
                    <CheckCircle2 className="w-6 h-6 text-[#5AC87A] shrink-0 mt-0.5 stroke-[2.5]" />
                    <div>
                      <span className="font-display font-extrabold block text-base">Message sent!</span>
                      <span className="font-body text-sm mt-1.5 block">Your request has been successfully sent. Our team will get back to you within 48 hours.</span>
                    </div>
                  </div>
                )}

                {status === 'error' && (
                  <div className="mb-8 p-6 bg-[#FFF0E8] border-2 border-[#FF7A3D] rounded-3xl text-red-900 flex items-start gap-4 animate-bounce-in">
                    <AlertCircle className="w-6 h-6 text-[#FF7A3D] shrink-0 mt-0.5 stroke-[2.5]" />
                    <div>
                      <span className="font-display font-extrabold block text-base">An error occurred</span>
                      <span className="font-body text-sm mt-1.5 block">Unable to send your message at this time. Please try again later.</span>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-extrabold text-[#3D3D5C] mb-2 pl-2">
                      Your Full Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      disabled={status === 'loading'}
                      {...register('name')}
                      className={`w-full bg-white border-2 rounded-full px-5 py-3.5 font-body text-sm text-[#1A1A2E] focus:outline-none focus:ring-2 focus:ring-[#FF7A3D]/10 transition-all ${
                        errors.name ? 'border-[#FF6B6B] focus:border-[#FF6B6B]' : 'border-black/10 focus:border-[#FF7A3D]'
                      }`}
                      placeholder="e.g. John Doe"
                    />
                    {errors.name && (
                      <p className="text-[#FF6B6B] text-xs mt-2 pl-3 font-extrabold">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-extrabold text-[#3D3D5C] mb-2 pl-2">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      disabled={status === 'loading'}
                      {...register('email')}
                      className={`w-full bg-white border-2 rounded-full px-5 py-3.5 font-body text-sm text-[#1A1A2E] focus:outline-none focus:ring-2 focus:ring-[#FF7A3D]/10 transition-all ${
                        errors.email ? 'border-[#FF6B6B] focus:border-[#FF6B6B]' : 'border-black/10 focus:border-[#FF7A3D]'
                      }`}
                      placeholder="e.g. john.doe@example.com"
                    />
                    {errors.email && (
                      <p className="text-[#FF6B6B] text-xs mt-2 pl-3 font-extrabold">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-extrabold text-[#3D3D5C] mb-2 pl-2">
                      Contact Subject *
                    </label>
                    <div className="relative">
                      <select
                        id="subject"
                        disabled={status === 'loading'}
                        {...register('subject')}
                        className={`w-full bg-white border-2 rounded-full px-5 py-3.5 font-body text-sm text-[#1A1A2E] focus:outline-none focus:ring-2 focus:ring-[#FF7A3D]/10 transition-all appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%234B5563%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1.25em] bg-[right_1.25rem_center] bg-no-repeat ${
                          errors.subject ? 'border-[#FF6B6B] focus:border-[#FF6B6B]' : 'border-black/10 focus:border-[#FF7A3D]'
                        }`}
                      >
                        <option value="" disabled>Select an option</option>
                        {Object.entries(subjectLabels).map(([val, label]) => (
                          <option key={val} value={val}>{label}</option>
                        ))}
                      </select>
                    </div>
                    {errors.subject && (
                      <p className="text-[#FF6B6B] text-xs mt-2 pl-3 font-extrabold">{errors.subject.message}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-extrabold text-[#3D3D5C] mb-2 pl-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      disabled={status === 'loading'}
                      {...register('message')}
                      className={`w-full bg-white border-2 rounded-[24px] px-5 py-4 font-body text-sm text-[#1A1A2E] focus:outline-none focus:ring-2 focus:ring-[#FF7A3D]/10 transition-all ${
                        errors.message ? 'border-[#FF6B6B] focus:border-[#FF6B6B]' : 'border-black/10 focus:border-[#FF7A3D]'
                      }`}
                      placeholder="Write your message here..."
                    />
                    {errors.message && (
                      <p className="text-[#FF6B6B] text-xs mt-2 pl-3 font-extrabold">{errors.message.message}</p>
                    )}
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-[#5AC87A] text-white hover:bg-[#4eb96d] font-body font-extrabold py-4 rounded-full flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50 shadow-md"
                  >
                    {status === 'loading' ? (
                      <>
                        <Clock className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 stroke-[2.5]" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Info (Right - 5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              
              {/* Card 1: Contact Details */}
              <div className="camp-card bg-white border border-black/5 p-8 flex flex-col gap-6">
                <h3 className="font-display font-extrabold text-xl text-[#1A1A2E] mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-[#5AC87A] rounded-full inline-block" />
                  Contact Information
                </h3>
                
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#5AC87A]/15 text-[#5AC87A] flex items-center justify-center shrink-0 shadow-inner">
                      <MapPin className="w-6 h-6 stroke-[2.5]" />
                    </div>
                    <div>
                      <span className="font-display font-extrabold text-sm text-[#1A1A2E] block">Address</span>
                      <span className="font-body text-sm text-[#3D3D5C] mt-1.5 block leading-relaxed">
                        Livingstone College<br />Salisbury, NC 28144
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#4A90D9]/15 text-[#4A90D9] flex items-center justify-center shrink-0 shadow-inner">
                      <Mail className="w-6 h-6 stroke-[2.5]" />
                    </div>
                    <div>
                      <span className="font-display font-extrabold text-sm text-[#1A1A2E] block">Direct Email</span>
                      <a href="mailto:stem@livingstone.edu" className="font-body text-sm text-[#4A90D9] hover:underline mt-1.5 block font-bold">
                        stem@livingstone.edu
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#8B6FE8]/15 text-[#8B6FE8] flex items-center justify-center shrink-0 shadow-inner">
                      <Phone className="w-6 h-6 stroke-[2.5]" />
                    </div>
                    <div>
                      <span className="font-display font-extrabold text-sm text-[#1A1A2E] block">Phone</span>
                      <a href="tel:+17042166000" className="font-body text-sm text-[#3D3D5C] mt-1.5 block font-bold">
                        +1 (704) 216-6000
                      </a>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Card 2: Interactive map mockup */}
              <div className="camp-card bg-white border border-black/5 p-6 flex flex-col gap-4">
                <h3 className="font-display font-extrabold text-sm text-[#7B7B9E] uppercase tracking-wider pl-1">
                  Camp Location
                </h3>
                <div className="rounded-[20px] overflow-hidden aspect-video border border-black/5 bg-gray-50 relative">
                  <img
                    src="/assets/images/livingstone.jpg"
                    alt="Livingstone campus map"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-dark/30 flex items-center justify-center">
                    <div className="bg-white text-[#1A1A2E] font-body font-extrabold text-xs px-4 py-2.5 rounded-full shadow-md border-2 border-black/10 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-[#FF7A3D] stroke-[2.5]" />
                      Livingstone Campus
                    </div>
                  </div>
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
