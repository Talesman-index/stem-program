'use client';

import { useState, useEffect, useTransition } from 'react';
import {
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  Loader2,
  Save
} from 'lucide-react';
import {
  fetchParticipants,
  fetchAttendance,
  saveDailyAttendance
} from '../../actions/dbActions';
import { Participant, Attendance } from '../../../lib/db/seedData';

type AttendanceState = Record<string, { AM: boolean; PM: boolean; note: string }>;

function formatDateEN(date: Date): string {
  return date.toLocaleDateString('en-US', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' });
}

function toISO(date: Date): string {
  return date.toISOString().split('T')[0];
}

export default function AttendancePage() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [allAttendance, setAllAttendance] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, startSave] = useTransition();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [attendanceState, setAttendanceState] = useState<AttendanceState>({});
  const [saved, setSaved] = useState(false);

  async function loadData() {
    setLoading(true);
    const [p, a] = await Promise.all([fetchParticipants(), fetchAttendance()]);
    setParticipants(p.filter(p => p.status === 'confirmed'));
    setAllAttendance(a);
    setLoading(false);
  }

  useEffect(() => { loadData(); }, []);

  // Initialize state when date or participants change
  useEffect(() => {
    const dateStr = toISO(currentDate);
    const newState: AttendanceState = {};
    participants.forEach(p => {
      const amRecord = allAttendance.find(a => a.participant_id === p.id && a.session_date === dateStr && a.period === 'AM');
      const pmRecord = allAttendance.find(a => a.participant_id === p.id && a.session_date === dateStr && a.period === 'PM');
      newState[p.id] = {
        AM: amRecord?.present ?? false,
        PM: pmRecord?.present ?? false,
        note: amRecord?.note || pmRecord?.note || ''
      };
    });
    setAttendanceState(newState);
    setSaved(false);
  }, [currentDate, participants, allAttendance]);

  function toggleAttendance(participantId: string, period: 'AM' | 'PM') {
    setAttendanceState(prev => ({
      ...prev,
      [participantId]: {
        ...prev[participantId],
        [period]: !prev[participantId]?.[period]
      }
    }));
    setSaved(false);
  }

  function handleMarkAll(period: 'AM' | 'PM', value: boolean) {
    setAttendanceState(prev => {
      const next = { ...prev };
      participants.forEach(p => {
        next[p.id] = { ...next[p.id], [period]: value };
      });
      return next;
    });
    setSaved(false);
  }

  function handleSave() {
    const dateStr = toISO(currentDate);
    const records = participants.flatMap(p => {
      const state = attendanceState[p.id];
      return [
        { participant_id: p.id, session_date: dateStr, period: 'AM' as const, present: state?.AM ?? false, note: state?.note },
        { participant_id: p.id, session_date: dateStr, period: 'PM' as const, present: state?.PM ?? false, note: state?.note }
      ];
    });
    startSave(async () => {
      await saveDailyAttendance(records);
      await loadData();
      setSaved(true);
    });
  }

  const dateStr = toISO(currentDate);
  const presentAM = participants.filter(p => attendanceState[p.id]?.AM).length;
  const presentPM = participants.filter(p => attendanceState[p.id]?.PM).length;
  const total = participants.length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="font-display font-bold text-3xl text-slate-900">Daily Attendance</h1>
          <p className="font-body text-sm text-slate-500 mt-1">Record AM and PM attendance for each session.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving || participants.length === 0}
          className="flex items-center gap-2 bg-stem-blue-mid text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-stem-blue-deep disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? 'Saved' : 'Save'}
        </button>
      </div>

      {/* Date Navigator */}
      <div className="flex items-center justify-between bg-white border border-slate-200 rounded-2xl px-6 py-4 shadow-sm">
        <button
          onClick={() => { const d = new Date(currentDate); d.setDate(d.getDate() - 1); setCurrentDate(d); }}
          className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="text-center">
          <p className="font-display font-bold text-lg text-slate-900 capitalize">{formatDateEN(currentDate)}</p>
          <div className="flex items-center justify-center gap-6 mt-2">
            <span className="font-mono text-xs text-slate-500">AM: <span className="text-green-600 font-bold">{presentAM}/{total}</span></span>
            <span className="font-mono text-xs text-slate-500">PM: <span className="text-blue-600 font-bold">{presentPM}/{total}</span></span>
          </div>
        </div>
        <button
          onClick={() => { const d = new Date(currentDate); d.setDate(d.getDate() + 1); setCurrentDate(d); }}
          className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-stem-blue-mid animate-spin" />
        </div>
      ) : participants.length === 0 ? (
        <div className="text-center py-20 bg-white border border-slate-200 rounded-2xl">
          <CalendarCheck className="w-10 h-10 text-slate-300 mx-auto" />
          <p className="font-body text-slate-400 mt-3">No confirmed participants to take attendance.</p>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left font-body text-xs font-semibold text-slate-500 uppercase tracking-wider">Participant</th>
                <th className="px-6 py-3 text-left font-body text-xs font-semibold text-slate-500 uppercase tracking-wider">Group</th>
                <th className="px-6 py-3 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <span className="font-body text-xs font-semibold text-slate-500 uppercase tracking-wider">Morning (AM)</span>
                    <div className="flex gap-2">
                      <button onClick={() => handleMarkAll('AM', true)} className="text-[10px] text-green-600 hover:underline cursor-pointer">All</button>
                      <button onClick={() => handleMarkAll('AM', false)} className="text-[10px] text-red-500 hover:underline cursor-pointer">None</button>
                    </div>
                  </div>
                </th>
                <th className="px-6 py-3 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <span className="font-body text-xs font-semibold text-slate-500 uppercase tracking-wider">Afternoon (PM)</span>
                    <div className="flex gap-2">
                      <button onClick={() => handleMarkAll('PM', true)} className="text-[10px] text-green-600 hover:underline cursor-pointer">All</button>
                      <button onClick={() => handleMarkAll('PM', false)} className="text-[10px] text-red-500 hover:underline cursor-pointer">None</button>
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {participants.map(p => {
                const state = attendanceState[p.id] || { AM: false, PM: false, note: '' };
                return (
                  <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-mono text-xs font-bold">
                          {p.first_name[0]}{p.last_name[0]}
                        </div>
                        <div>
                          <p className="font-body text-sm font-semibold text-slate-800">{p.first_name} {p.last_name}</p>
                          <p className="font-body text-xs text-slate-400">{p.school_name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3">
                      <span className="font-mono text-xs text-slate-500">{p.group_id || 'Unassigned'}</span>
                    </td>
                    <td className="px-6 py-3 text-center">
                      <button
                        onClick={() => toggleAttendance(p.id, 'AM')}
                        className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center mx-auto transition-all cursor-pointer ${
                          state.AM
                            ? 'bg-green-500 border-green-500 text-white shadow-sm'
                            : 'bg-white border-slate-200 text-slate-300 hover:border-red-300'
                        }`}
                      >
                        {state.AM ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                      </button>
                    </td>
                    <td className="px-6 py-3 text-center">
                      <button
                        onClick={() => toggleAttendance(p.id, 'PM')}
                        className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center mx-auto transition-all cursor-pointer ${
                          state.PM
                            ? 'bg-blue-500 border-blue-500 text-white shadow-sm'
                            : 'bg-white border-slate-200 text-slate-300 hover:border-red-300'
                        }`}
                      >
                        {state.PM ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
