'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { StemLogo } from '../../../components/StemLogo';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate auth check
    await new Promise(r => setTimeout(r, 800));

    if (username === 'admin' && password === 'stemcamp2026') {
      router.push('/admin');
    } else {
      setError('Invalid username or password.');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-sm">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-6">
          {/* Logo */}
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center">
              <StemLogo size="lg" variant="color" />
            </div>
            <div>
              <h1 className="font-display font-bold text-2xl text-slate-900">Admin Portal</h1>
              <p className="font-body text-sm text-slate-500 mt-1">STEM Summer Program — Livingstone College</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="admin-username" className="font-body text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5 block">
                Username
              </label>
              <input
                id="admin-username"
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                autoComplete="username"
                placeholder="admin"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl font-body text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-stem-blue-mid/40 transition-all"
              />
            </div>
            <div>
              <label htmlFor="admin-password" className="font-body text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5 block">
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="••••••••••"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl font-body text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-stem-blue-mid/40 transition-all"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm font-body rounded-lg px-4 py-2.5 text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-stem-blue-mid text-white font-body font-bold py-3.5 rounded-xl text-sm hover:bg-stem-blue-deep disabled:opacity-70 transition-all cursor-pointer"
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>

          {/* Hint */}
          <div className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-center">
            <p className="font-mono text-[10px] text-slate-400">Demo: admin / stemcamp2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}
