'use client';

import { useState, useEffect, useTransition } from 'react';
import Link from 'next/link';
import {
  ClipboardList,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  Search,
  Filter,
  ArrowUpRight,
  AlertTriangle,
  Loader2
} from 'lucide-react';
import {
  fetchParticipants,
  updateParticipantStatus
} from '../../actions/dbActions';
import { Participant } from '../../../lib/db/seedData';

const STATUS_CONFIG = {
  pending: { label: 'Under Review', color: 'amber', bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700' },
  review: { label: 'In Review', color: 'blue', bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700' },
  confirmed: { label: 'Confirmed', color: 'green', bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700' },
  waitlist: { label: 'Waitlisted', color: 'purple', bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700' },
  cancelled: { label: 'Cancelled', color: 'red', bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700' },
};

export default function RegistrationsPage() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isPending, startTransition] = useTransition();
  const [actionId, setActionId] = useState<string | null>(null);

  async function loadData() {
    setLoading(true);
    const data = await fetchParticipants();
    setParticipants(data);
    setLoading(false);
  }

  useEffect(() => { loadData(); }, []);

  const filtered = participants.filter(p => {
    const q = search.toLowerCase();
    const matchSearch = !q || p.first_name.toLowerCase().includes(q) || p.last_name.toLowerCase().includes(q) || p.school_name.toLowerCase().includes(q);
    const matchStatus = filterStatus === 'all' || p.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const pendingCount = participants.filter(p => p.status === 'pending').length;
  const reviewCount = participants.filter(p => p.status === 'review').length;

  function handleStatusChange(id: string, status: Participant['status']) {
    setActionId(id);
    startTransition(async () => {
      await updateParticipantStatus(id, status);
      await loadData();
      setActionId(null);
    });
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="font-display font-bold text-3xl text-slate-900">Registration Files</h1>
          <p className="font-body text-sm text-slate-500 mt-1">Review and validate incoming admission applications.</p>
        </div>
        {(pendingCount + reviewCount) > 0 && (
          <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-4 py-2 rounded-xl">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span className="font-body text-sm text-amber-700 font-semibold">
              {pendingCount + reviewCount} file{(pendingCount + reviewCount) > 1 ? 's' : ''} pending review
            </span>
          </div>
        )}
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {(Object.entries(STATUS_CONFIG) as [string, typeof STATUS_CONFIG['pending']][]).map(([key, cfg]) => {
          const count = participants.filter(p => p.status === key).length;
          return (
            <button
              key={key}
              onClick={() => setFilterStatus(filterStatus === key ? 'all' : key)}
              className={`p-4 rounded-xl border text-left transition-all hover:shadow-md cursor-pointer ${
                filterStatus === key
                  ? `${cfg.bg} ${cfg.border} shadow-sm`
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <span className={`font-mono text-2xl font-bold ${filterStatus === key ? cfg.text : 'text-slate-900'}`}>{count}</span>
              <p className={`font-body text-xs font-semibold mt-1 ${filterStatus === key ? cfg.text : 'text-slate-500'}`}>{cfg.label}</p>
            </button>
          );
        })}
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name or school..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl font-body text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-stem-blue-mid/30 focus:border-stem-blue-mid transition-all"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="pl-10 pr-8 py-2.5 bg-white border border-slate-200 rounded-xl font-body text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-stem-blue-mid/30 focus:border-stem-blue-mid transition-all appearance-none cursor-pointer"
          >
            <option value="all">All Statuses</option>
            {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
              <option key={key} value={key}>{cfg.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-center py-20">
          <Loader2 className="w-8 h-8 text-stem-blue-mid animate-spin mx-auto" />
          <p className="font-body text-slate-400 mt-3">Loading files...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 bg-white border border-slate-200 rounded-2xl">
          <ClipboardList className="w-10 h-10 text-slate-300 mx-auto" />
          <p className="font-body text-slate-400 mt-3">No files found.</p>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 font-body text-xs font-semibold text-slate-500 uppercase tracking-wider">Participant</th>
                  <th className="px-6 py-3 font-body text-xs font-semibold text-slate-500 uppercase tracking-wider">School</th>
                  <th className="px-6 py-3 font-body text-xs font-semibold text-slate-500 uppercase tracking-wider">Level</th>
                  <th className="px-6 py-3 font-body text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 font-body text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 font-body text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map(p => {
                  const cfg = STATUS_CONFIG[p.status];
                  const isActing = actionId === p.id && isPending;
                  return (
                    <tr key={p.id} className="hover:bg-slate-50/70 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-mono text-xs font-bold uppercase shrink-0">
                            {p.first_name[0]}{p.last_name[0]}
                          </div>
                          <div>
                            <p className="font-body text-sm font-semibold text-slate-800">{p.first_name} {p.last_name}</p>
                            <p className="font-mono text-[10px] text-slate-400">{p.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-body text-sm text-slate-600">{p.school_name}</td>
                      <td className="px-6 py-4">
                        <span className={`font-mono text-[10px] px-2 py-0.5 rounded-full border ${p.school_level === 'middle' ? 'bg-sky-50 text-sky-700 border-sky-200' : 'bg-violet-50 text-violet-700 border-violet-200'}`}>
                          {p.school_level === 'middle' ? 'Middle School' : 'High School'}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-body text-sm text-slate-500">
                        {new Date(p.created_at).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`font-mono text-[10px] px-2.5 py-1 rounded-full border font-semibold ${cfg.bg} ${cfg.border} ${cfg.text}`}>
                          {cfg.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          {isActing ? (
                            <Loader2 className="w-4 h-4 text-slate-400 animate-spin" />
                          ) : (
                            <>
                              {p.status !== 'confirmed' && (
                                <button
                                  title="Confirm"
                                  onClick={() => handleStatusChange(p.id, 'confirmed')}
                                  className="p-1.5 rounded-lg hover:bg-green-50 text-slate-400 hover:text-green-600 transition-colors cursor-pointer"
                                >
                                  <CheckCircle2 className="w-4 h-4" />
                                </button>
                              )}
                              {p.status !== 'waitlist' && (
                                <button
                                  title="Waitlist"
                                  onClick={() => handleStatusChange(p.id, 'waitlist')}
                                  className="p-1.5 rounded-lg hover:bg-purple-50 text-slate-400 hover:text-purple-600 transition-colors cursor-pointer"
                                >
                                  <Clock className="w-4 h-4" />
                                </button>
                              )}
                              {p.status !== 'cancelled' && (
                                <button
                                  title="Cancel"
                                  onClick={() => handleStatusChange(p.id, 'cancelled')}
                                  className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                                >
                                  <XCircle className="w-4 h-4" />
                                </button>
                              )}
                              <Link
                                href={`/admin/participants/${p.id}`}
                                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
                              >
                                <ArrowUpRight className="w-4 h-4" />
                              </Link>
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
          <div className="px-6 py-3 border-t border-slate-100 flex items-center justify-between">
            <span className="font-body text-xs text-slate-400">{filtered.length} file{filtered.length > 1 ? 's' : ''} displayed</span>
          </div>
        </div>
      )}
    </div>
  );
}
