'use client';

import { useState, useEffect, useTransition } from 'react';
import {
  Award,
  Download,
  CheckCircle2,
  Loader2,
  Search,
  Star,
  RefreshCw
} from 'lucide-react';
import Link from 'next/link';
import {
  fetchParticipants,
  fetchAttendance,
  fetchCertificates,
  saveGeneratedCertificate
} from '../../actions/dbActions';
import { Participant, Attendance, Certificate } from '../../../lib/db/seedData';

type ParticipantEligibility = {
  participant: Participant;
  totalSessions: number;
  attendedSessions: number;
  rate: number;
  eligible: boolean;
  cert: Certificate | null;
};

export default function CertificatesPage() {
  const [eligibility, setEligibility] = useState<ParticipantEligibility[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [generatingId, setGeneratingId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [filterEligible, setFilterEligible] = useState(false);

  async function loadData() {
    setLoading(true);
    const [participants, attendance, certs] = await Promise.all([
      fetchParticipants(),
      fetchAttendance(),
      fetchCertificates()
    ]);

    const confirmed = participants.filter(p => p.status === 'confirmed');

    // Count unique session dates in attendance
    const allDates = Array.from(new Set(attendance.map(a => a.session_date)));
    const totalSessions = allDates.length || 5; // fallback for demo

    const eligibilityList: ParticipantEligibility[] = confirmed.map(p => {
      const pAttendance = attendance.filter(a => a.participant_id === p.id && a.present);
      const uniqueDatesPresent = Array.from(new Set(pAttendance.map(a => a.session_date)));
      const rate = Math.round((uniqueDatesPresent.length / totalSessions) * 100);
      const eligible = rate >= 80;
      const cert = certs.find(c => c.participant_id === p.id) || null;
      return {
        participant: p,
        totalSessions,
        attendedSessions: uniqueDatesPresent.length,
        rate: Math.min(rate, 100),
        eligible,
        cert
      };
    });

    setEligibility(eligibilityList);
    setLoading(false);
  }

  useEffect(() => { loadData(); }, []);

  const filtered = eligibility.filter(r => {
    const q = search.toLowerCase();
    const matchSearch = !q ||
      r.participant.first_name.toLowerCase().includes(q) ||
      r.participant.last_name.toLowerCase().includes(q);
    const matchEligible = !filterEligible || r.eligible;
    return matchSearch && matchEligible;
  });

  function handleGenerate(r: ParticipantEligibility) {
    setGeneratingId(r.participant.id);
    startTransition(async () => {
      await saveGeneratedCertificate({
        participant_id: r.participant.id,
        session_id: r.participant.session_id,
        generated_at: new Date().toISOString(),
        file_path: `/certificates/${r.participant.id}-cert.pdf`
      });
      await loadData();
      setGeneratingId(null);
    });
  }

  const eligibleCount = eligibility.filter(r => r.eligible).length;
  const certCount = eligibility.filter(r => r.cert).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="font-display font-bold text-3xl text-slate-900">Graduation Certificates</h1>
          <p className="font-body text-sm text-slate-500 mt-1">Generate certificates for participants with &ge; 80% attendance.</p>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm text-center">
          <p className="font-mono text-2xl font-bold text-slate-900">{eligibility.length}</p>
          <p className="font-body text-xs text-slate-500 mt-1">Confirmed</p>
        </div>
        <div className="bg-white border border-amber-200 rounded-xl p-4 shadow-sm text-center">
          <p className="font-mono text-2xl font-bold text-amber-600">{eligibleCount}</p>
          <p className="font-body text-xs text-slate-500 mt-1">Eligible (≥80%)</p>
        </div>
        <div className="bg-white border border-green-200 rounded-xl p-4 shadow-sm text-center">
          <p className="font-mono text-2xl font-bold text-green-600">{certCount}</p>
          <p className="font-body text-xs text-slate-500 mt-1">Certificates Generated</p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search for a participant..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl font-body text-sm focus:outline-none focus:ring-2 focus:ring-stem-blue-mid/30"
          />
        </div>
        <button
          onClick={() => setFilterEligible(!filterEligible)}
          className={`flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl border transition-colors cursor-pointer ${
            filterEligible
              ? 'bg-amber-50 border-amber-300 text-amber-700'
              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
          }`}
        >
          <Star className="w-4 h-4" />
          Eligible Only
        </button>
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
                <th className="px-6 py-3 text-center font-body text-xs font-semibold text-slate-500 uppercase tracking-wider">Sessions</th>
                <th className="px-6 py-3 text-center font-body text-xs font-semibold text-slate-500 uppercase tracking-wider">Attendance Rate</th>
                <th className="px-6 py-3 text-center font-body text-xs font-semibold text-slate-500 uppercase tracking-wider">Eligibility</th>
                <th className="px-6 py-3 text-right font-body text-xs font-semibold text-slate-500 uppercase tracking-wider">Certificate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(r => {
                const isGenerating = generatingId === r.participant.id && isPending;
                return (
                  <tr key={r.participant.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-mono text-xs font-bold">
                          {r.participant.first_name[0]}{r.participant.last_name[0]}
                        </div>
                        <div>
                          <p className="font-body text-sm font-semibold text-slate-800">{r.participant.first_name} {r.participant.last_name}</p>
                          <p className="font-body text-xs text-slate-400">{r.participant.school_name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-center font-mono text-sm text-slate-700">
                      {r.attendedSessions}/{r.totalSessions}
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex flex-col items-center gap-1.5">
                        <span className={`font-mono text-sm font-bold ${r.rate >= 80 ? 'text-green-600' : 'text-amber-600'}`}>
                          {r.rate}%
                        </span>
                        <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${r.rate >= 80 ? 'bg-green-500' : 'bg-amber-400'}`}
                            style={{ width: `${r.rate}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-center">
                      {r.eligible ? (
                        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] bg-green-50 text-green-700 border border-green-200 px-2.5 py-1 rounded-full font-semibold">
                          <CheckCircle2 className="w-3 h-3" />
                          Eligible
                        </span>
                      ) : (
                        <span className="font-mono text-[10px] bg-slate-50 text-slate-400 border border-slate-200 px-2.5 py-1 rounded-full">
                          Not Eligible
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex items-center justify-end gap-2">
                        {r.cert ? (
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] text-green-600">
                              {new Date(r.cert.generated_at).toLocaleDateString('en-US')}
                            </span>
                            <a
                              href={`/api/pdf/certificate/${r.participant.id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                              title="Download"
                            >
                              <Download className="w-3.5 h-3.5" />
                            </a>
                            <button
                              title="Regenerate"
                              onClick={() => handleGenerate(r)}
                              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                            >
                              <RefreshCw className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : r.eligible ? (
                          <button
                            onClick={() => handleGenerate(r)}
                            disabled={isGenerating}
                            className="flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
                          >
                            {isGenerating ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <Award className="w-3.5 h-3.5" />
                            )}
                            Generate
                          </button>
                        ) : (
                          <span className="text-slate-300 font-mono text-xs">—</span>
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
    </div>
  );
}
