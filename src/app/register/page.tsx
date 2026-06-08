'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/public/Navbar';
import Footer from '../../components/public/Footer';
import { useRegistrationStore } from '../../lib/store/registrationStore';
import { registerParticipant } from '../actions/dbActions';
import {
  User,
  Shield,
  HeartHandshake,
  CheckCircle2,
  Trash2,
  ChevronRight,
  ChevronLeft,
  AlertTriangle
} from 'lucide-react';

export default function Register() {
  const router = useRouter();
  
  // Zustand store hook
  const {
    currentStep,
    student,
    parent,
    medical,
    pickups,
    agreedWaiver,
    agreedConsent,
    agreedImage,
    signatureName,
    submitStatus,
    errorMessage,
    setStep,
    updateStudent,
    updateParent,
    updateMedical,
    addPickup,
    removePickup,
    setAgreements,
    setSubmitStatus
  } = useRegistrationStore();

  // Guarding against hydration mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Authorized Pickups inline form state
  const [newPickup, setNewPickup] = useState({ full_name: '', relationship: '', phone: '' });
  const [pickupError, setPickupError] = useState('');

  // Scroll checks
  const waiverTextRef = useRef<HTMLDivElement>(null);
  const [waiverScrolled, setWaiverScrolled] = useState(false);

  const handleWaiverScroll = () => {
    if (waiverTextRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = waiverTextRef.current;
      // Scroll margin tolerance of 10px
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        setWaiverScrolled(true);
      }
    }
  };

  if (!mounted) return null; // Avoid hydration flash

  // Age Validation Check (10 - 18 years old)
  const validateAge = (dobString: string) => {
    if (!dobString) return false;
    const dob = new Date(dobString);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age >= 10 && age <= 18;
  };

  // Step 1 Validation
  const isStep1Valid = () => {
    return true;
  };

  // Step 2 Validation
  const isStep2Valid = () => {
    return true;
  };

  // Step 3 Validation (conditional checks)
  const isStep3Valid = () => {
    return true;
  };

  // Step 4 Validation
  const isStep4Valid = () => {
    return true;
  };

  // Step Navigation Action
  const nextStep = () => {
    if (currentStep === 1 && isStep1Valid()) setStep(2);
    else if (currentStep === 2 && isStep2Valid()) setStep(3);
    else if (currentStep === 3 && isStep3Valid()) setStep(4);
  };

  const prevStep = () => {
    if (currentStep > 1) setStep(currentStep - 1);
  };

  // Add pickup whitelist handler
  const handleAddPickup = () => {
    if (!newPickup.full_name.trim() || !newPickup.relationship.trim() || !newPickup.phone.trim()) {
      setPickupError("Please fill in all fields for the authorized person.");
      return;
    }
    addPickup({
      full_name: newPickup.full_name.trim(),
      relationship: newPickup.relationship.trim(),
      phone: newPickup.phone.trim()
    });
    setNewPickup({ full_name: '', relationship: '', phone: '' });
    setPickupError('');
  };

  // Form Submit Handler
  const handleFinalSubmit = async () => {
    if (!isStep4Valid()) return;
    setSubmitStatus('submitting');

    // Determine target session based on school level
    const session_id = student.school_level === 'middle' ? 'session-ms-2026' : 'session-hs-2026';

    const submissionData = {
      ...student,
      session_id
    };

    const res = await registerParticipant(submissionData, parent, medical, pickups);
    
    if (res.success) {
      setSubmitStatus('success');
      router.push('/register/confirmation');
    } else {
      setSubmitStatus('error', res.error || "An error occurred during registration.");
    }
  };

  return (
    <>
      <Navbar />

      <main className="flex-grow pt-24 bg-[#FFF9F0]">
        <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-10">
            <span className="section-sticker mb-4">
              Join Us
            </span>
            <h1 className="font-accent text-3xl sm:text-5xl text-[#1A1A2E] mt-3 leading-none">
              STEM Camp Registration
            </h1>
            <p className="font-body text-[#7B7B9E] text-base mt-2">
              Complete the form in 4 simple steps to reserve your child's spot.
            </p>
          </div>

          {/* Step Indicators */}
          <div className="camp-card bg-white border border-black/5 p-6 mb-8 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2 flex-grow">
              {/* Dot 1 */}
              <button 
                disabled={currentStep < 1}
                onClick={() => setStep(1)}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-display font-extrabold text-sm transition-all cursor-pointer ${
                  currentStep === 1 
                    ? 'bg-[#5AC87A] text-white ring-4 ring-[#5AC87A]/25' 
                    : currentStep > 1 
                      ? 'bg-[#2D4589] text-white shadow-sm' 
                      : 'bg-[#FFF9F0] border-2 border-black/10 text-[#7B7B9E]'
                }`}
              >
                1
              </button>
              <div className={`h-[3px] flex-grow rounded transition-colors ${currentStep > 1 ? 'bg-[#2D4589]' : 'bg-black/5'}`} />

              {/* Dot 2 */}
              <button 
                disabled={currentStep < 2 || !isStep1Valid()}
                onClick={() => setStep(2)}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-display font-extrabold text-sm transition-all ${
                  currentStep === 2 
                    ? 'bg-[#5AC87A] text-white ring-4 ring-[#5AC87A]/25' 
                    : currentStep > 2 
                      ? 'bg-[#2D4589] text-white shadow-sm' 
                      : 'bg-[#FFF9F0] border-2 border-black/10 text-[#7B7B9E]'
                } ${isStep1Valid() ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
              >
                2
              </button>
              <div className={`h-[3px] flex-grow rounded transition-colors ${currentStep > 2 ? 'bg-[#2D4589]' : 'bg-black/5'}`} />

              {/* Dot 3 */}
              <button 
                disabled={currentStep < 3 || !isStep2Valid()}
                onClick={() => setStep(3)}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-display font-extrabold text-sm transition-all ${
                  currentStep === 3 
                    ? 'bg-[#5AC87A] text-white ring-4 ring-[#5AC87A]/25' 
                    : currentStep > 3 
                      ? 'bg-[#2D4589] text-white shadow-sm' 
                      : 'bg-[#FFF9F0] border-2 border-black/10 text-[#7B7B9E]'
                } ${isStep2Valid() ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
              >
                3
              </button>
              <div className={`h-[3px] flex-grow rounded transition-colors ${currentStep > 3 ? 'bg-[#2D4589]' : 'bg-black/5'}`} />

              {/* Dot 4 */}
              <button 
                disabled={currentStep < 4 || !isStep3Valid()}
                onClick={() => setStep(4)}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-display font-extrabold text-sm transition-all ${
                  currentStep === 4 
                    ? 'bg-[#5AC87A] text-white ring-4 ring-[#5AC87A]/25' 
                    : 'bg-[#FFF9F0] border-2 border-black/10 text-[#7B7B9E]'
                } ${isStep3Valid() ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
              >
                4
              </button>
            </div>
          </div>

          {/* Form Content Wrapper */}
          <div className="camp-card bg-white border border-black/5 overflow-hidden p-8 sm:p-14">
            {submitStatus === 'error' && (
              <div className="mb-8 p-5 bg-[#FFF0E8] border-2 border-[#FF7A3D] text-[#1A1A2E] rounded-3xl flex items-start gap-3 text-sm animate-bounce-in">
                <AlertTriangle className="w-6 h-6 text-[#FF7A3D] shrink-0 stroke-[2.5]" />
                <span className="font-body font-bold">{errorMessage}</span>
              </div>
            )}

            {/* ==========================================
                STEP 1: Student Profile
               ========================================== */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-slide-up">
                <h2 className="font-display font-extrabold text-2xl text-[#1A1A2E] flex items-center gap-3 border-b-2 border-black/5 pb-4 mb-6">
                  <User className="w-6 h-6 text-[#5AC87A] stroke-[2.5]" />
                  Student Profile
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-extrabold text-[#3D3D5C] mb-2 pl-2">Student's First Name *</label>
                    <input
                      type="text"
                      value={student.first_name}
                      onChange={(e) => updateStudent({ first_name: e.target.value })}
                      className="w-full bg-white border-2 border-black/10 rounded-full px-5 py-3.5 font-body text-sm text-[#1A1A2E] focus:outline-none focus:border-[#5AC87A] transition-all"
                      placeholder="e.g., Marcus"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-extrabold text-[#3D3D5C] mb-2 pl-2">Student's Last Name *</label>
                    <input
                      type="text"
                      value={student.last_name}
                      onChange={(e) => updateStudent({ last_name: e.target.value })}
                      className="w-full bg-white border-2 border-black/10 rounded-full px-5 py-3.5 font-body text-sm text-[#1A1A2E] focus:outline-none focus:border-[#5AC87A] transition-all"
                      placeholder="e.g., Tatum"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-extrabold text-[#3D3D5C] mb-2 pl-2">Date of Birth *</label>
                    <input
                      type="date"
                      value={student.date_of_birth}
                      onChange={(e) => updateStudent({ date_of_birth: e.target.value })}
                      className="w-full bg-white border-2 border-black/10 rounded-full px-5 py-3.5 font-body text-sm text-[#1A1A2E] focus:outline-none focus:border-[#5AC87A] transition-all"
                    />
                    {student.date_of_birth && !validateAge(student.date_of_birth) && (
                      <p className="text-[#FF6B6B] text-xs mt-2 pl-3 font-extrabold">Student must be between 10 and 18 years old.</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-extrabold text-[#3D3D5C] mb-2 pl-2">Grade Level *</label>
                    <div className="relative">
                      <select
                        value={student.school_level}
                        onChange={(e) => updateStudent({ school_level: e.target.value as any })}
                        className="w-full bg-white border-2 border-black/10 rounded-full px-5 py-3.5 font-body text-sm text-[#1A1A2E] focus:outline-none focus:border-[#5AC87A] transition-all appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%234B5563%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1.25em] bg-[right_1.25rem_center] bg-no-repeat"
                      >
                        <option value="middle">Middle School</option>
                        <option value="high">High School</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-extrabold text-[#3D3D5C] mb-2 pl-2">Current School Name *</label>
                  <input
                    type="text"
                    value={student.school_name}
                    onChange={(e) => updateStudent({ school_name: e.target.value })}
                    className="w-full bg-white border-2 border-black/10 rounded-full px-5 py-3.5 font-body text-sm text-[#1A1A2E] focus:outline-none focus:border-[#5AC87A] transition-all"
                    placeholder="e.g., Salisbury High School"
                  />
                </div>
              </div>
            )}

            {/* ==========================================
                STEP 2: Parent & Whitelist Pickups
               ========================================== */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-slide-up">
                <h2 className="font-display font-extrabold text-2xl text-[#1A1A2E] flex items-center gap-3 border-b-2 border-black/5 pb-4 mb-6">
                  <Shield className="w-6 h-6 text-[#2D4589] stroke-[2.5]" />
                  Parent & Safety Contacts
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-extrabold text-[#3D3D5C] mb-2 pl-2">Parent/Guardian Full Name *</label>
                    <input
                      type="text"
                      value={parent.full_name}
                      onChange={(e) => updateParent({ full_name: e.target.value })}
                      className="w-full bg-white border-2 border-black/10 rounded-full px-5 py-3.5 font-body text-sm text-[#1A1A2E] focus:outline-none focus:border-[#5AC87A] transition-all"
                      placeholder="e.g., Tyrone Tatum"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-extrabold text-[#3D3D5C] mb-2 pl-2">Parent Email Address *</label>
                    <input
                      type="email"
                      value={parent.email}
                      onChange={(e) => updateParent({ email: e.target.value })}
                      className="w-full bg-white border-2 border-black/10 rounded-full px-5 py-3.5 font-body text-sm text-[#1A1A2E] focus:outline-none focus:border-[#5AC87A] transition-all"
                      placeholder="e.g., tyrone@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-extrabold text-[#3D3D5C] mb-2 pl-2">Primary Phone *</label>
                    <input
                      type="text"
                      value={parent.phone}
                      onChange={(e) => updateParent({ phone: e.target.value })}
                      className="w-full bg-white border-2 border-black/10 rounded-full px-5 py-3.5 font-body text-sm text-[#1A1A2E] focus:outline-none focus:border-[#5AC87A] transition-all"
                      placeholder="e.g., 704-555-0192"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-extrabold text-[#3D3D5C] mb-2 pl-2">Secondary Phone (Optional)</label>
                    <input
                      type="text"
                      value={parent.phone_alt}
                      onChange={(e) => updateParent({ phone_alt: e.target.value })}
                      className="w-full bg-white border-2 border-black/10 rounded-full px-5 py-3.5 font-body text-sm text-[#1A1A2E] focus:outline-none focus:border-[#5AC87A] transition-all"
                      placeholder="e.g., 704-555-0193"
                    />
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="border-t border-black/5 pt-6">
                  <h3 className="font-display font-extrabold text-sm text-[#1A1A2E] uppercase tracking-wider mb-4 pl-1">Alternative Emergency Contact</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-extrabold text-[#3D3D5C] mb-2 pl-2">Full Name *</label>
                      <input
                        type="text"
                        value={parent.emergency_name}
                        onChange={(e) => updateParent({ emergency_name: e.target.value })}
                        className="w-full bg-white border-2 border-black/10 rounded-full px-4 py-2.5 font-body text-sm text-[#1A1A2E] focus:outline-none focus:border-[#5AC87A] transition-all"
                        placeholder="e.g., Latoya Tatum"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold text-[#3D3D5C] mb-2 pl-2">Relationship *</label>
                      <input
                        type="text"
                        value={parent.emergency_relation}
                        onChange={(e) => updateParent({ emergency_relation: e.target.value })}
                        className="w-full bg-white border-2 border-black/10 rounded-full px-4 py-2.5 font-body text-sm text-[#1A1A2E] focus:outline-none focus:border-[#5AC87A] transition-all"
                        placeholder="e.g., Mother"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold text-[#3D3D5C] mb-2 pl-2">Phone *</label>
                      <input
                        type="text"
                        value={parent.emergency_phone}
                        onChange={(e) => updateParent({ emergency_phone: e.target.value })}
                        className="w-full bg-white border-2 border-black/10 rounded-full px-4 py-2.5 font-body text-sm text-[#1A1A2E] focus:outline-none focus:border-[#5AC87A] transition-all"
                        placeholder="e.g., 704-555-0193"
                      />
                    </div>
                  </div>
                </div>

                {/* Whitelisted Pickup People */}
                <div className="border-t border-black/5 pt-6">
                  <h3 className="font-display font-extrabold text-sm text-[#1A1A2E] uppercase tracking-wider mb-2 pl-1">
                    Authorized Pickup Persons (Minimum 1)
                  </h3>
                  <p className="font-body text-xs text-[#7B7B9E] mb-4">
                    For your child's safety, please add at least one person (yourself or a trusted contact) authorized to sign them out each afternoon.
                  </p>

                  {/* List */}
                  {pickups.length > 0 && (
                    <div className="bg-[#FFF9F0] rounded-[24px] p-5 mb-5 space-y-3 border-2 border-black/5">
                      {pickups.map((p, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-white px-5 py-3.5 border-2 border-black/5 rounded-full shadow-sm hover:border-black/10 transition-all">
                          <div className="flex flex-col text-left">
                            <span className="font-body font-bold text-sm text-[#1A1A2E]">{p.full_name}</span>
                            <span className="font-body text-xs text-[#7B7B9E] font-medium">{p.relationship} · {p.phone}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removePickup(idx)}
                            className="p-2 rounded-xl border border-black/5 hover:bg-[#FFF0E8] text-[#FF6B6B] transition-all cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4 stroke-[2.5]" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add inline Form */}
                  <div className="bg-[#FFF9F0] p-6 border-2 border-black/5 rounded-[24px]">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={newPickup.full_name}
                        onChange={(e) => setNewPickup({ ...newPickup, full_name: e.target.value })}
                        className="bg-white border-2 border-black/10 rounded-full px-4 py-2.5 font-body text-sm text-[#1A1A2E] focus:outline-none focus:border-[#5AC87A] transition-all"
                      />
                      <input
                        type="text"
                        placeholder="Relationship (e.g., Father, Mother)"
                        value={newPickup.relationship}
                        onChange={(e) => setNewPickup({ ...newPickup, relationship: e.target.value })}
                        className="bg-white border-2 border-black/10 rounded-full px-4 py-2.5 font-body text-sm text-[#1A1A2E] focus:outline-none focus:border-[#5AC87A] transition-all"
                      />
                      <input
                        type="text"
                        placeholder="Phone"
                        value={newPickup.phone}
                        onChange={(e) => setNewPickup({ ...newPickup, phone: e.target.value })}
                        className="bg-white border-2 border-black/10 rounded-full px-4 py-2.5 font-body text-sm text-[#1A1A2E] focus:outline-none focus:border-[#5AC87A] transition-all"
                      />
                    </div>
                    {pickupError && (
                      <p className="text-[#FF6B6B] text-xs mt-2 pl-3 font-extrabold">{pickupError}</p>
                    )}
                    <button
                      type="button"
                      onClick={handleAddPickup}
                      className="mt-4 bg-[#2D4589] text-white hover:bg-[#3d83cc] font-body font-extrabold text-xs px-6 py-2.5 rounded-full cursor-pointer hover:scale-105 active:scale-95 transition-all shadow-sm"
                    >
                      + Add authorized person
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ==========================================
                STEP 3: Medical Toggles
               ========================================== */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-slide-up">
                <h2 className="font-display font-extrabold text-2xl text-[#1A1A2E] flex items-center gap-3 border-b-2 border-black/5 pb-4 mb-6">
                  <HeartHandshake className="w-6 h-6 text-[#9795CE] stroke-[2.5]" />
                  Medical Information
                </h2>

                {/* Allergies Toggle */}
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <span className="font-body font-extrabold text-sm text-[#1A1A2E] pl-2">Does the student have any food or drug allergies?</span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => updateMedical({ has_allergies: true })}
                        className={`px-5 py-2 rounded-full font-body font-extrabold text-xs transition-all cursor-pointer hover:scale-105 active:scale-95 border-2 ${
                          medical.has_allergies ? 'bg-[#5AC87A] border-[#1A1A2E] text-white shadow-md' : 'bg-white border-black/5 text-[#3D3D5C]'
                        }`}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={() => updateMedical({ has_allergies: false, allergies_detail: '' })}
                        className={`px-5 py-2 rounded-full font-body font-extrabold text-xs transition-all cursor-pointer hover:scale-105 active:scale-95 border-2 ${
                          !medical.has_allergies ? 'bg-[#1A1A2E] border-[#1A1A2E] text-white shadow-md' : 'bg-white border-black/5 text-[#3D3D5C]'
                        }`}
                      >
                        No
                      </button>
                    </div>
                  </div>
                  {medical.has_allergies && (
                    <textarea
                      value={medical.allergies_detail}
                      onChange={(e) => updateMedical({ allergies_detail: e.target.value })}
                      placeholder="Please detail allergies and required treatments (e.g., EpiPen)..."
                      className="w-full bg-white border-2 border-black/10 rounded-[24px] px-5 py-4 font-body text-sm text-[#1A1A2E] focus:outline-none focus:border-[#5AC87A] transition-all"
                      rows={2}
                    />
                  )}
                </div>

                {/* Dietary Restrictions Toggle */}
                <div className="space-y-4 border-t-2 border-black/5 pt-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <span className="font-body font-extrabold text-sm text-[#1A1A2E] pl-2">Does the student follow a specific diet?</span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => updateMedical({ has_dietary: true })}
                        className={`px-5 py-2 rounded-full font-body font-extrabold text-xs transition-all cursor-pointer hover:scale-105 active:scale-95 border-2 ${
                          medical.has_dietary ? 'bg-[#5AC87A] border-[#1A1A2E] text-white shadow-md' : 'bg-white border-black/5 text-[#3D3D5C]'
                        }`}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={() => updateMedical({ has_dietary: false, dietary_detail: '' })}
                        className={`px-5 py-2 rounded-full font-body font-extrabold text-xs transition-all cursor-pointer hover:scale-105 active:scale-95 border-2 ${
                          !medical.has_dietary ? 'bg-[#1A1A2E] border-[#1A1A2E] text-white shadow-md' : 'bg-white border-black/5 text-[#3D3D5C]'
                        }`}
                      >
                        No
                      </button>
                    </div>
                  </div>
                  {medical.has_dietary && (
                    <textarea
                      value={medical.dietary_detail}
                      onChange={(e) => updateMedical({ dietary_detail: e.target.value })}
                      placeholder="Please detail any dietary restrictions (e.g., Vegetarian, Pork-free, Gluten-free)..."
                      className="w-full bg-white border-2 border-black/10 rounded-[24px] px-5 py-4 font-body text-sm text-[#1A1A2E] focus:outline-none focus:border-[#5AC87A] transition-all"
                      rows={2}
                    />
                  )}
                </div>

                {/* Medication Toggle */}
                <div className="space-y-4 border-t-2 border-black/5 pt-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <span className="font-body font-extrabold text-sm text-[#1A1A2E] pl-2">Does the student take daily medical treatments that need to be administered at the camp?</span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => updateMedical({ has_medication: true })}
                        className={`px-5 py-2 rounded-full font-body font-extrabold text-xs transition-all cursor-pointer hover:scale-105 active:scale-95 border-2 ${
                          medical.has_medication ? 'bg-[#5AC87A] border-[#1A1A2E] text-white shadow-md' : 'bg-white border-black/5 text-[#3D3D5C]'
                        }`}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={() => updateMedical({ has_medication: false, medication_detail: '' })}
                        className={`px-5 py-2 rounded-full font-body font-extrabold text-xs transition-all cursor-pointer hover:scale-105 active:scale-95 border-2 ${
                          !medical.has_medication ? 'bg-[#1A1A2E] border-[#1A1A2E] text-white shadow-md' : 'bg-white border-black/5 text-[#3D3D5C]'
                        }`}
                      >
                        No
                      </button>
                    </div>
                  </div>
                  {medical.has_medication && (
                    <textarea
                      value={medical.medication_detail}
                      onChange={(e) => updateMedical({ medication_detail: e.target.value })}
                      placeholder="Please detail the treatment and dosages..."
                      className="w-full bg-white border-2 border-black/10 rounded-[24px] px-5 py-4 font-body text-sm text-[#1A1A2E] focus:outline-none focus:border-[#5AC87A] transition-all"
                      rows={2}
                    />
                  )}
                </div>

                {/* Conditions Toggle */}
                <div className="space-y-4 border-t-2 border-black/5 pt-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <span className="font-body font-extrabold text-sm text-[#1A1A2E] pl-2">Does the student have any other medical conditions?</span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => updateMedical({ has_conditions: true })}
                        className={`px-5 py-2 rounded-full font-body font-extrabold text-xs transition-all cursor-pointer hover:scale-105 active:scale-95 border-2 ${
                          medical.has_conditions ? 'bg-[#5AC87A] border-[#1A1A2E] text-white shadow-md' : 'bg-white border-black/5 text-[#3D3D5C]'
                        }`}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={() => updateMedical({ has_conditions: false, conditions_detail: '' })}
                        className={`px-5 py-2 rounded-full font-body font-extrabold text-xs transition-all cursor-pointer hover:scale-105 active:scale-95 border-2 ${
                          !medical.has_conditions ? 'bg-[#1A1A2E] border-[#1A1A2E] text-white shadow-md' : 'bg-white border-black/5 text-[#3D3D5C]'
                        }`}
                      >
                        No
                      </button>
                    </div>
                  </div>
                  {medical.has_conditions && (
                    <textarea
                      value={medical.conditions_detail}
                      onChange={(e) => updateMedical({ conditions_detail: e.target.value })}
                      placeholder="Please detail the condition (e.g., Diabetes, Asthma)..."
                      className="w-full bg-white border-2 border-black/10 rounded-[24px] px-5 py-4 font-body text-sm text-[#1A1A2E] focus:outline-none focus:border-[#5AC87A] transition-all"
                      rows={2}
                    />
                  )}
                </div>

                {/* Doctor details */}
                <div className="border-t-2 border-black/5 pt-6">
                  <h3 className="font-display font-extrabold text-sm text-[#1A1A2E] uppercase tracking-wider mb-4 pl-1">Primary Care Physician</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-extrabold text-[#3D3D5C] mb-2 pl-2">Doctor's Name</label>
                      <input
                        type="text"
                        value={medical.doctor_name || ''}
                        onChange={(e) => updateMedical({ doctor_name: e.target.value })}
                        className="w-full bg-white border-2 border-black/10 rounded-full px-5 py-3.5 font-body text-sm text-[#1A1A2E] focus:outline-none focus:border-[#5AC87A]"
                        placeholder="e.g., Dr. Roberts"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-extrabold text-[#3D3D5C] mb-2 pl-2">Doctor's Phone</label>
                      <input
                        type="text"
                        value={medical.doctor_phone || ''}
                        onChange={(e) => updateMedical({ doctor_phone: e.target.value })}
                        className="w-full bg-white border-2 border-black/10 rounded-full px-5 py-3.5 font-body text-sm text-[#1A1A2E] focus:outline-none focus:border-[#5AC87A]"
                        placeholder="e.g., 704-555-0150"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ==========================================
                STEP 4: Consent & Review Summary
               ========================================== */}
            {currentStep === 4 && (
              <div className="space-y-8 animate-slide-up">
                
                {/* 4a. Summary Review */}
                <div>
                  <h2 className="font-display font-extrabold text-2xl text-[#1A1A2E] flex items-center gap-3 border-b-2 border-black/5 pb-4 mb-6">
                    <CheckCircle2 className="w-6 h-6 text-[#5AC87A] stroke-[2.5]" />
                    Registration Summary
                  </h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-6">
                    <div className="camp-card bg-[#FFF9F0] border border-black/5 p-6 sm:p-8">
                      <span className="font-display font-extrabold text-sm text-[#1A1A2E] uppercase tracking-wider block border-b-2 border-black/5 pb-2 mb-3">
                        Student
                      </span>
                      <ul className="space-y-2.5 text-sm font-body text-[#3D3D5C] font-semibold">
                        <li><span className="text-[#7B7B9E] font-medium">Full Name:</span> {student.first_name} {student.last_name}</li>
                        <li><span className="text-[#7B7B9E] font-medium">Level:</span> {student.school_level === 'middle' ? 'Middle School' : 'High School'}</li>
                        <li><span className="text-[#7B7B9E] font-medium">Date of Birth:</span> {student.date_of_birth}</li>
                        <li><span className="text-[#7B7B9E] font-medium">School:</span> {student.school_name}</li>
                      </ul>
                    </div>

                    <div className="camp-card bg-[#FFF9F0] border border-black/5 p-6 sm:p-8">
                      <span className="font-display font-extrabold text-sm text-[#1A1A2E] uppercase tracking-wider block border-b-2 border-black/5 pb-2 mb-3">
                        Parent / Guardian
                      </span>
                      <ul className="space-y-2.5 text-sm font-body text-[#3D3D5C] font-semibold">
                        <li><span className="text-[#7B7B9E] font-medium">Full Name:</span> {parent.full_name}</li>
                        <li><span className="text-[#7B7B9E] font-medium">Email:</span> {parent.email}</li>
                        <li><span className="text-[#7B7B9E] font-medium">Phone:</span> {parent.phone}</li>
                        <li><span className="text-[#7B7B9E] font-medium">Emergency:</span> {parent.emergency_name} ({parent.emergency_relation}) : {parent.emergency_phone}</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 4b. Waiver Legal document block (scroll check) */}
                <div className="border-t-2 border-black/5 pt-8">
                  <h2 className="font-display font-extrabold text-2xl text-[#1A1A2E] mb-4">
                    Waiver of Liability & Consents
                  </h2>
                  <p className="font-body text-xs text-[#7B7B9E] mb-4">
                    Please read the document below, scrolling all the way to the end to enable the required check boxes.
                  </p>

                  <div 
                    ref={waiverTextRef}
                    onScroll={handleWaiverScroll}
                    className="camp-card border-2 border-black/10 rounded-[24px] p-6 max-h-48 overflow-y-auto font-body text-xs text-[#3D3D5C] bg-[#FFF9F0] leading-relaxed select-none"
                  >
                    <h4 className="font-display font-extrabold text-[#1A1A2E] mb-3 text-sm">PARENTAL AUTHORIZATION AND LIABILITY WAIVER</h4>
                    <p className="mb-3">
                      By registering my child for the Livingstone College Summer STEM Camp, I expressly authorize their participation in all scientific, technological, and outdoor activities organized as part of this program.
                    </p>
                    <p className="mb-3">
                      I confirm that the medical information provided in this form is accurate and up-to-date. I authorize camp staff to take all necessary emergency medical actions in case of illness or accident, including hospitalization or administering surgical care if I cannot be reached immediately.
                    </p>
                    <p className="mb-3">
                      I acknowledge that the camp involves hands-on experiments under the close supervision of qualified mentors. I release Livingstone College, its trustees, employees, and partners from any liability for accidental injuries occurring during the camp, except in cases of proven gross negligence.
                    </p>
                    <p className="mb-3">
                      I agree that my child will follow the internal rules and safety guidelines established by the camp staff, subject to immediate dismissal.
                    </p>
                  </div>
                </div>

                {/* 4c. Checkboxes */}
                <div className="space-y-4.5 pl-2">
                  {/* Checkbox 1 */}
                  <div className="flex items-start gap-3.5">
                    <input
                      id="agreedWaiver"
                      type="checkbox"
                      disabled={!waiverScrolled && !agreedWaiver}
                      checked={agreedWaiver}
                      onChange={(e) => setAgreements({ agreedWaiver: e.target.checked })}
                      className="rounded border-black/15 text-[#2D4589] focus:ring-[#2D4589] w-5 h-5 mt-0.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <label 
                      htmlFor="agreedWaiver" 
                      className={`font-body text-sm select-none cursor-pointer leading-normal font-semibold ${
                        !waiverScrolled && !agreedWaiver ? 'text-[#7B7B9E]/60 cursor-not-allowed font-medium' : 'text-[#3D3D5C]'
                      }`}
                    >
                      I have read and accept the terms of the liability waiver * {!waiverScrolled && !agreedWaiver && "(Scroll down to activate)"}
                    </label>
                  </div>

                  {/* Checkbox 2 */}
                  <div className="flex items-start gap-3.5">
                    <input
                      id="agreedConsent"
                      type="checkbox"
                      checked={agreedConsent}
                      onChange={(e) => setAgreements({ agreedConsent: e.target.checked })}
                      className="rounded border-black/15 text-[#2D4589] focus:ring-[#2D4589] w-5 h-5 mt-0.5 cursor-pointer"
                    />
                    <label htmlFor="agreedConsent" className="font-body text-sm text-[#3D3D5C] font-semibold select-none cursor-pointer leading-normal">
                      I authorize my child's participation in the activities and confirm their availability for the selected week *
                    </label>
                  </div>

                  {/* Checkbox 3 */}
                  <div className="flex items-start gap-3.5">
                    <input
                      id="agreedImage"
                      type="checkbox"
                      checked={agreedImage}
                      onChange={(e) => setAgreements({ agreedImage: e.target.checked })}
                      className="rounded border-black/15 text-[#2D4589] focus:ring-[#2D4589] w-5 h-5 mt-0.5 cursor-pointer"
                    />
                    <label htmlFor="agreedImage" className="font-body text-sm text-[#3D3D5C] font-semibold select-none cursor-pointer leading-normal">
                      I authorize the use of my child's image (photos/videos taken at the camp) on the website and brochures of Livingstone College *
                    </label>
                  </div>
                </div>

                {/* 4d. Signature */}
                <div className="border-t-2 border-black/5 pt-6">
                  <label className="block text-sm font-extrabold text-[#3D3D5C] mb-2 pl-2">
                    Parent / Guardian Signature (Type your exact full name) *
                  </label>
                  <input
                    type="text"
                    value={signatureName}
                    onChange={(e) => setAgreements({ signatureName: e.target.value })}
                    className="w-full bg-white border-2 border-black/10 rounded-full px-5 py-3.5 font-body text-sm text-[#1A1A2E] focus:outline-none focus:border-[#5AC87A]"
                    placeholder="Type your signature"
                  />
                  {signatureName && signatureName.trim().toLowerCase() !== parent.full_name.trim().toLowerCase() && (
                    <p className="text-[#FF6B6B] text-xs mt-2 pl-3 font-extrabold">The signature must match exactly the parent's name entered in step 2 (“{parent.full_name}”).</p>
                  )}
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="mt-10 pt-6 border-t-2 border-black/5 flex items-center justify-between">
              <button
                type="button"
                disabled={currentStep === 1 || submitStatus === 'submitting'}
                onClick={prevStep}
                className="px-6 py-2.5 border-2 border-black/10 hover:bg-gray-50 rounded-full font-body font-extrabold text-sm text-[#3D3D5C] transition-all inline-flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
                Back
              </button>

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={
                    (currentStep === 1 && !isStep1Valid()) ||
                    (currentStep === 2 && !isStep2Valid()) ||
                    (currentStep === 3 && !isStep3Valid())
                  }
                  className="px-6 py-2.5 bg-[#2D4589] text-white hover:bg-[#3b83cc] rounded-full font-body font-extrabold text-sm inline-flex items-center gap-2 cursor-pointer shadow disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-all"
                >
                  Continue
                  <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  disabled={!isStep4Valid() || submitStatus === 'submitting'}
                  className="px-7 py-3 bg-[#5AC87A] text-white hover:bg-[#4eb96d] rounded-full font-body font-extrabold text-sm inline-flex items-center gap-2 cursor-pointer shadow disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-all"
                >
                  {submitStatus === 'submitting' ? 'Submitting...' : "Submit Registration"}
                  <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                </button>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

