'use client';

import { useState, useEffect, useTransition } from 'react';
import {
  Truck,
  LogIn,
  LogOut,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Search
} from 'lucide-react';
import {
  fetchParticipants,
  fetchPickupLogs,
  checkInParticipant,
  checkOutParticipant
} from '../../actions/dbActions';
import { Participant, PickupLog } from '../../../lib/db/seedData';

function toISO(date: Date) {
  return date.toISOString().split('T')[0];
}
function now() {
  return new Date().toTimeString().slice(0, 5);
}
function formatDateEN(date: Date) {
  return date.toLocaleDateString('en-US', { weekday: 'long', day: '2-digit', month: 'long' });
}

export default function PickupPage() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [logs, setLogs] = useState<PickupLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isPending, startTransition] = useTransition();
  const [actionId, setActionId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  // Modal for checkout
  const [checkoutModal, setCheckoutModal] = useState<{ participantId: string; name: string } | null>(null);
  const [checkoutPerson, setCheckoutPerson] = useState('');
  const [checkoutNote, setCheckoutNote] = useState('');
  const [checkoutAuthorized, setCheckoutAuthorized] = useState(true);

  async function loadData() {
    setLoading(true);
    const [p, l] = await Promise.all([fetchParticipants(), fetchPickupLogs()]);
    setParticipants(p.filter(p => p.status === 'confirmed'));
    setLogs(l);
    setLoading(false);
  }

  useEffect(() => { loadData(); }, []);

  const dateStr = toISO(currentDate);
  const todayLogs = logs.filter(l => l.log_date === dateStr);

  const getLog = (participantId: string) =>
    todayLogs.find(l => l.participant_id === participantId);

  const filtered = participants.filter(p => {
    if (!search) return true;
    const q = search.toLowerCase();
    return p.first_name.toLowerCase().includes(q) || p.last_name.toLowerCase().includes(q);
  });

  function handleCheckIn(participantId: string) {
    setActionId(participantId + '-in');
    startTransition(async () => {
      await checkInParticipant(participantId, now(), dateStr);
      await loadData();
      setActionId(null);
    });
  }

  function handleCheckOut() {
    if (!checkoutModal) return;
    const { participantId } = checkoutModal;
    startTransition(async () => {
      await checkOutParticipant(participantId, now(), checkoutPerson, checkoutAuthorized, checkoutNote, dateStr);
      await loadData();
      setCheckoutModal(null);
      setCheckoutPerson('');
      setCheckoutNote('');
      setCheckoutAuthorized(true);
    });
  }

  const arrivedCount = filtered.filter(p => getLog(p.id)?.arrival_time).length;
  const departedCount = filtered.filter(p => getLog(p.id)?.departure_time).length;
  const pendingCount = filtered.length - arrivedCount;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="font-display font-bold text-3xl text-slate-900">Arrival & Pickup</h1>
          <p className="font-body text-sm text-slate-500 mt-1">Track arrivals and departures for each participant.</p>
        </div>
      </div>

      {/* Date Navigator */}
      <div className="flex items-center justify-between bg-white border border-slate-200 rounded-2xl px-6 py-4 shadow-sm">
        <button
          onClick={() => { const d = new Date(currentDate); d.setDate(d.getDate() - 1); setCurrentDate(d); }}
          className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <p className="font-display font-bold text-lg text-slate-900 capitalize">{formatDateEN(currentDate)}</p>
        <button
          onClick={() => { const d = new Date(currentDate); d.setDate(d.getDate() + 1); setCurrentDate(d); }}
          className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* KPI Chips */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 text-center shadow-sm">
          <p className="font-mono text-2xl font-bold text-green-600">{arrivedCount}</p>
          <p className="font-body text-xs text-slate-500 mt-1">Arrived</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4 text-center shadow-sm">
          <p className="font-mono text-2xl font-bold text-blue-600">{departedCount}</p>
          <p className="font-body text-xs text-slate-500 mt-1">Departed</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4 text-center shadow-sm">
          <p className="font-mono text-2xl font-bold text-amber-600">{pendingCount}</p>
          <p className="font-body text-xs text-slate-500 mt-1">Pending</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search for a participant..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl font-body text-sm focus:outline-none focus:ring-2 focus:ring-stem-blue-mid/30"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-stem-blue-mid animate-spin" />
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left font-body text-xs font-semibold text-slate-500 uppercase tracking-wider">Participant</th>
                <th className="px-6 py-3 text-center font-body text-xs font-semibold text-slate-500 uppercase tracking-wider">Arrival</th>
                <th className="px-6 py-3 text-center font-body text-xs font-semibold text-slate-500 uppercase tracking-wider">Departure</th>
                <th className="px-6 py-3 text-center font-body text-xs font-semibold text-slate-500 uppercase tracking-wider">Pickup Person</th>
                <th className="px-6 py-3 text-center font-body text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right font-body text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(p => {
                const log = getLog(p.id);
                const isActing = actionId?.startsWith(p.id) && isPending;
                return (
                  <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-mono text-xs font-bold">
                          {p.first_name[0]}{p.last_name[0]}
                        </div>
                        <p className="font-body text-sm font-semibold text-slate-800">{p.first_name} {p.last_name}</p>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-center">
                      {log?.arrival_time ? (
                        <span className="font-mono text-sm font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-md">{log.arrival_time}</span>
                      ) : (
                        <span className="font-mono text-xs text-slate-300">—</span>
                      )}
                    </td>
                    <td className="px-6 py-3 text-center">
                      {log?.departure_time ? (
                        <span className="font-mono text-sm font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">{log.departure_time}</span>
                      ) : (
                        <span className="font-mono text-xs text-slate-300">—</span>
                      )}
                    </td>
                    <td className="px-6 py-3 text-center">
                      {log?.pickup_person ? (
                        <div className="flex flex-col items-center">
                          <span className="font-body text-xs font-semibold text-slate-700">{log.pickup_person}</span>
                          {!log.authorized && <AlertTriangle className="w-3 h-3 text-red-500 mt-0.5" />}
                        </div>
                      ) : (
                        <span className="font-mono text-xs text-slate-300">—</span>
                      )}
                    </td>
                    <td className="px-6 py-3 text-center">
                      {!log?.arrival_time ? (
                        <span className="font-mono text-[10px] bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full">Not Arrived</span>
                      ) : !log?.departure_time ? (
                        <span className="font-mono text-[10px] bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full">Present</span>
                      ) : (
                        <span className="font-mono text-[10px] bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full">Departed</span>
                      )}
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex items-center justify-end gap-2">
                        {isActing ? (
                          <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                        ) : (
                          <>
                            {!log?.arrival_time && (
                              <button
                                onClick={() => handleCheckIn(p.id)}
                                title="Record Arrival"
                                className="flex items-center gap-1 bg-green-50 hover:bg-green-100 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-lg border border-green-200 transition-colors cursor-pointer"
                              >
                                <LogIn className="w-3.5 h-3.5" />
                                Arrival
                              </button>
                            )}
                            {log?.arrival_time && !log?.departure_time && (
                              <button
                                onClick={() => setCheckoutModal({ participantId: p.id, name: `${p.first_name} ${p.last_name}` })}
                                title="Record Departure"
                                className="flex items-center gap-1 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-lg border border-blue-200 transition-colors cursor-pointer"
                              >
                                <LogOut className="w-3.5 h-3.5" />
                                Departure
                              </button>
                            )}
                            {log?.departure_time && (
                              <CheckCircle2 className="w-4 h-4 text-slate-300" />
                            )}
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Checkout Modal */}
      {checkoutModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-5">
            <h3 className="font-display font-bold text-xl text-slate-900">Record Departure</h3>
            <p className="font-body text-sm text-slate-600">Participant: <span className="font-semibold">{checkoutModal.name}</span></p>
            <div>
              <label className="font-body text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">Person Picking Up</label>
              <input
                type="text"
                placeholder="First Last"
                value={checkoutPerson}
                onChange={e => setCheckoutPerson(e.target.value)}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm font-body focus:outline-none focus:ring-2 focus:ring-stem-blue-mid/30"
              />
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="authorized"
                checked={checkoutAuthorized}
                onChange={e => setCheckoutAuthorized(e.target.checked)}
                className="w-4 h-4 accent-green-500 cursor-pointer"
              />
              <label htmlFor="authorized" className="font-body text-sm text-slate-700 cursor-pointer">Authorized Person</label>
              {!checkoutAuthorized && (
                <span className="flex items-center gap-1 text-red-500 text-xs font-semibold">
                  <AlertTriangle className="w-3 h-3" /> Unauthorized
                </span>
              )}
            </div>
            <div>
              <label className="font-body text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">Note (optional)</label>
              <input
                type="text"
                placeholder="e.g. Early departure..."
                value={checkoutNote}
                onChange={e => setCheckoutNote(e.target.value)}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm font-body focus:outline-none focus:ring-2 focus:ring-stem-blue-mid/30"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleCheckOut}
                disabled={isPending || !checkoutPerson.trim()}
                className="flex-1 bg-stem-blue-mid text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-stem-blue-deep disabled:opacity-50 transition-colors cursor-pointer"
              >
                {isPending ? 'Saving...' : 'Confirm Departure'}
              </button>
              <button
                onClick={() => setCheckoutModal(null)}
                className="flex-1 bg-slate-100 text-slate-700 text-sm font-semibold py-2.5 rounded-xl hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
