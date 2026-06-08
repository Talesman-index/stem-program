'use server';

import { cookies } from 'next/headers';

export interface AdminUser {
  email: string;
  name: string;
  role: 'super_admin' | 'admin' | 'coordinator' | 'teacher' | 'volunteer';
}

export async function login(email: string, password: string) {
  // Offline credentials check
  if (email.toLowerCase() === 'admin@livingstonestem.org' && password === 'admin123') {
    const user: AdminUser = {
      email: 'admin@livingstonestem.org',
      name: 'Dr. Sarah Smith',
      role: 'super_admin'
    };

    cookies().set('sb-auth-token', JSON.stringify(user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/'
    });

    return { success: true };
  }

  return { success: false, error: 'Invalid credentials.' };
}

export async function logout() {
  cookies().delete('sb-auth-token');
  return { success: true };
}

export async function getAdminUser(): Promise<AdminUser | null> {
  const cookieStore = cookies();
  const token = cookieStore.get('sb-auth-token');
  
  if (!token?.value) return null;

  try {
    return JSON.parse(token.value) as AdminUser;
  } catch {
    return null;
  }
}
