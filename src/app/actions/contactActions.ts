'use server';

export interface ContactFormData {
  name: string;
  email: string;
  subject: 'register' | 'partner' | 'press' | 'other';
  message: string;
}

export async function submitContactForm(data: ContactFormData) {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.log('--- NEW CONTACT REQUEST SUBMITTED ---');
  console.log('Nom:', data.name);
  console.log('Email:', data.email);
  console.log('Sujet:', data.subject);
  console.log('Message:', data.message);
  console.log('------------------------------------');

  return { success: true };
}
