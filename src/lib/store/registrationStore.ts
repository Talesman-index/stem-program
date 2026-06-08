import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Participant, Parent, MedicalInfo, AuthorizedPickup } from '../db/seedData';

interface RegistrationState {
  currentStep: 1 | 2 | 3 | 4;
  student: Omit<Participant, 'id' | 'created_at' | 'group_id' | 'session_id'>;
  parent: Omit<Parent, 'id' | 'participant_id'>;
  medical: Omit<MedicalInfo, 'id' | 'participant_id'>;
  pickups: Omit<AuthorizedPickup, 'id' | 'participant_id'>[];
  agreedWaiver: boolean;
  agreedConsent: boolean;
  agreedImage: boolean;
  signatureName: string;
  submitStatus: 'idle' | 'submitting' | 'success' | 'error';
  errorMessage: string;

  setStep: (step: number) => void;
  updateStudent: (fields: Partial<RegistrationState['student']>) => void;
  updateParent: (fields: Partial<RegistrationState['parent']>) => void;
  updateMedical: (fields: Partial<RegistrationState['medical']>) => void;
  addPickup: (pickup: Omit<AuthorizedPickup, 'id' | 'participant_id'>) => void;
  removePickup: (index: number) => void;
  setAgreements: (fields: Partial<Pick<RegistrationState, 'agreedWaiver' | 'agreedConsent' | 'agreedImage' | 'signatureName'>>) => void;
  setSubmitStatus: (status: RegistrationState['submitStatus'], message?: string) => void;
  resetForm: () => void;
}

export const useRegistrationStore = create<RegistrationState>()(
  persist(
    (set) => ({
      currentStep: 1,
      student: {
        first_name: '',
        last_name: '',
        date_of_birth: '',
        school_level: 'middle',
        school_name: '',
        status: 'pending'
      },
      parent: {
        full_name: '',
        phone: '',
        phone_alt: '',
        email: '',
        emergency_name: '',
        emergency_relation: '',
        emergency_phone: ''
      },
      medical: {
        has_allergies: false,
        allergies_detail: '',
        has_dietary: false,
        dietary_detail: '',
        has_medication: false,
        medication_detail: '',
        has_conditions: false,
        conditions_detail: '',
        doctor_name: '',
        doctor_phone: ''
      },
      pickups: [],
      agreedWaiver: false,
      agreedConsent: false,
      agreedImage: false,
      signatureName: '',
      submitStatus: 'idle',
      errorMessage: '',

      setStep: (step) => set({ currentStep: step as any }),
      
      updateStudent: (fields) => set((state) => ({
        student: { ...state.student, ...fields }
      })),

      updateParent: (fields) => set((state) => ({
        parent: { ...state.parent, ...fields }
      })),

      updateMedical: (fields) => set((state) => ({
        medical: { ...state.medical, ...fields }
      })),

      addPickup: (pickup) => set((state) => ({
        pickups: [...state.pickups, pickup]
      })),

      removePickup: (index) => set((state) => ({
        pickups: state.pickups.filter((_, i) => i !== index)
      })),

      setAgreements: (fields) => set(fields),

      setSubmitStatus: (status, message = '') => set({ submitStatus: status, errorMessage: message }),

      resetForm: () => set({
        currentStep: 1,
        student: {
          first_name: '',
          last_name: '',
          date_of_birth: '',
          school_level: 'middle',
          school_name: '',
          status: 'pending'
        },
        parent: {
          full_name: '',
          phone: '',
          phone_alt: '',
          email: '',
          emergency_name: '',
          emergency_relation: '',
          emergency_phone: ''
        },
        medical: {
          has_allergies: false,
          allergies_detail: '',
          has_dietary: false,
          dietary_detail: '',
          has_medication: false,
          medication_detail: '',
          has_conditions: false,
          conditions_detail: '',
          doctor_name: '',
          doctor_phone: ''
        },
        pickups: [],
        agreedWaiver: false,
        agreedConsent: false,
        agreedImage: false,
        signatureName: '',
        submitStatus: 'idle',
        errorMessage: ''
      })
    }),
    {
      name: 'stem-registration-draft'
    }
  )
);
