'use client';

import { useState } from 'react';
import {
  Settings,
  Shield,
  Database,
  Bell,
  Globe,
  Save,
  Check,
  Key,
  Server,
  Info
} from 'lucide-react';

type SettingsState = {
  siteName: string;
  sessionYear: string;
  maxCapacityMS: number;
  maxCapacityHS: number;
  registrationOpen: boolean;
  waitlistEnabled: boolean;
  autoConfirm: boolean;
  notifyNewRegistration: boolean;
  notifyPickupAlert: boolean;
  attendanceThreshold: number;
  supabaseUrl: string;
  supabaseKey: string;
  dataMode: 'local' | 'supabase';
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<SettingsState>({
    siteName: 'Livingstone College STEM Summer Program',
    sessionYear: '2026',
    maxCapacityMS: 30,
    maxCapacityHS: 30,
    registrationOpen: true,
    waitlistEnabled: true,
    autoConfirm: false,
    notifyNewRegistration: true,
    notifyPickupAlert: true,
    attendanceThreshold: 80,
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    supabaseKey: '',
    dataMode: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'supabase' : 'local'
  });
  const [saved, setSaved] = useState(false);

  function handleChange<K extends keyof SettingsState>(key: K, value: SettingsState[K]) {
    setSettings(prev => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  function handleSave() {
    // In a real app, persist to env / db
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="font-display font-bold text-3xl text-slate-900">Settings</h1>
          <p className="font-body text-sm text-slate-500 mt-1">Global configuration of the administration portal.</p>
        </div>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl transition-all cursor-pointer ${
            saved
              ? 'bg-green-500 text-white'
              : 'bg-stem-blue-mid text-white hover:bg-stem-blue-deep'
          }`}
        >
          {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? 'Saved' : 'Save Settings'}
        </button>
      </div>

      {/* Info Banner */}
      <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-2xl px-5 py-4">
        <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-body text-sm text-blue-800 font-semibold">Current mode: {settings.dataMode === 'local' ? 'Local File (db.json)' : 'Supabase Cloud'}</p>
          <p className="font-body text-xs text-blue-600 mt-0.5">
            {settings.dataMode === 'local'
              ? 'Data is stored in src/data/db.json. Ideal for development.'
              : 'Connected to remote Supabase database. Data is persisted in the cloud.'
            }
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Section */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-stem-blue-mid flex items-center justify-center">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-slate-900">General</h3>
              <p className="font-body text-xs text-slate-400">Program name and session year.</p>
            </div>
          </div>

          <Field label="Program Name">
            <input
              type="text"
              value={settings.siteName}
              onChange={e => handleChange('siteName', e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-body focus:outline-none focus:ring-2 focus:ring-stem-blue-mid/30"
            />
          </Field>
          <Field label="Session Year">
            <input
              type="text"
              value={settings.sessionYear}
              onChange={e => handleChange('sessionYear', e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-body focus:outline-none focus:ring-2 focus:ring-stem-blue-mid/30"
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="MS Capacity">
              <input
                type="number"
                min={1}
                max={100}
                value={settings.maxCapacityMS}
                onChange={e => handleChange('maxCapacityMS', Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-body focus:outline-none focus:ring-2 focus:ring-stem-blue-mid/30"
              />
            </Field>
            <Field label="HS Capacity">
              <input
                type="number"
                min={1}
                max={100}
                value={settings.maxCapacityHS}
                onChange={e => handleChange('maxCapacityHS', Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-body focus:outline-none focus:ring-2 focus:ring-stem-blue-mid/30"
              />
            </Field>
          </div>
          <Field label="Attendance Threshold (%)">
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={50}
                max={100}
                step={5}
                value={settings.attendanceThreshold}
                onChange={e => handleChange('attendanceThreshold', Number(e.target.value))}
                className="flex-grow accent-stem-blue-mid cursor-pointer"
              />
              <span className="font-mono text-sm font-bold text-slate-700 w-12 text-right">{settings.attendanceThreshold}%</span>
            </div>
          </Field>
        </div>

        {/* Registration Section */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="w-8 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-slate-900">Registrations</h3>
              <p className="font-body text-xs text-slate-400">Control the registration process.</p>
            </div>
          </div>

          <Toggle
            label="Registrations Open"
            description="Allows families to submit new applications."
            checked={settings.registrationOpen}
            onChange={v => handleChange('registrationOpen', v)}
          />
          <Toggle
            label="Waitlist Enabled"
            description="Accepts registrations beyond capacity limits."
            checked={settings.waitlistEnabled}
            onChange={v => handleChange('waitlistEnabled', v)}
          />
          <Toggle
            label="Auto-Confirm"
            description="Applications are automatically confirmed without manual review."
            checked={settings.autoConfirm}
            onChange={v => handleChange('autoConfirm', v)}
          />
        </div>

        {/* Notifications Section */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-slate-900">Notifications</h3>
              <p className="font-body text-xs text-slate-400">Email alerts and event notifications.</p>
            </div>
          </div>

          <Toggle
            label="New Registration"
            description="Notify admin when a new application is submitted."
            checked={settings.notifyNewRegistration}
            onChange={v => handleChange('notifyNewRegistration', v)}
          />
          <Toggle
            label="Unauthorized Pickup Alert"
            description="Immediate alert if an unauthorized person attempts to pick up a child."
            checked={settings.notifyPickupAlert}
            onChange={v => handleChange('notifyPickupAlert', v)}
          />
        </div>

        {/* Database Section */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-slate-900">Database</h3>
              <p className="font-body text-xs text-slate-400">Data storage configuration.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleChange('dataMode', 'local')}
              className={`p-4 rounded-xl border-2 text-center transition-all cursor-pointer ${
                settings.dataMode === 'local'
                  ? 'border-stem-blue-mid bg-blue-50'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <Server className={`w-5 h-5 mx-auto mb-1.5 ${settings.dataMode === 'local' ? 'text-stem-blue-mid' : 'text-slate-400'}`} />
              <p className="font-body text-sm font-semibold text-slate-700">Local File</p>
              <p className="font-body text-[10px] text-slate-400 mt-0.5">db.json (dev)</p>
            </button>
            <button
              onClick={() => handleChange('dataMode', 'supabase')}
              className={`p-4 rounded-xl border-2 text-center transition-all cursor-pointer ${
                settings.dataMode === 'supabase'
                  ? 'border-stem-blue-mid bg-blue-50'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <Database className={`w-5 h-5 mx-auto mb-1.5 ${settings.dataMode === 'supabase' ? 'text-stem-blue-mid' : 'text-slate-400'}`} />
              <p className="font-body text-sm font-semibold text-slate-700">Supabase</p>
              <p className="font-body text-[10px] text-slate-400 mt-0.5">Cloud (prod)</p>
            </button>
          </div>

          {settings.dataMode === 'supabase' && (
            <div className="space-y-3 pt-2">
              <Field label="Supabase URL">
                <div className="relative">
                  <Server className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={settings.supabaseUrl}
                    onChange={e => handleChange('supabaseUrl', e.target.value)}
                    placeholder="https://xxx.supabase.co"
                    className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm font-mono text-slate-700 focus:outline-none focus:ring-2 focus:ring-stem-blue-mid/30"
                  />
                </div>
              </Field>
              <Field label="Anon Key">
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="password"
                    value={settings.supabaseKey}
                    onChange={e => handleChange('supabaseKey', e.target.value)}
                    placeholder="eyJ..."
                    className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm font-mono text-slate-700 focus:outline-none focus:ring-2 focus:ring-stem-blue-mid/30"
                  />
                </div>
              </Field>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="font-body text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5 block">{label}</label>
      {children}
    </div>
  );
}

function Toggle({
  label,
  description,
  checked,
  onChange
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="font-body text-sm font-semibold text-slate-700">{label}</p>
        <p className="font-body text-xs text-slate-400 mt-0.5">{description}</p>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-colors shrink-0 cursor-pointer ${
          checked ? 'bg-stem-blue-mid' : 'bg-slate-200'
        }`}
      >
        <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
          checked ? 'translate-x-[22px]' : 'translate-x-0.5'
        }`} />
      </button>
    </div>
  );
}
