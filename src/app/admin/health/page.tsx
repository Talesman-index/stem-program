'use client';

import { useState, useEffect } from 'react';
import { HeartPulse, AlertTriangle, CheckCircle2, Loader2, Search, Printer, Download } from 'lucide-react';
import { fetchParticipants } from '../../actions/dbActions';
import * as dbActions from '../../actions/dbActions';
import { Participant, MedicalInfo, Parent, AuthorizedPickup } from '../../../lib/db/seedData';

type ParticipantRecord = {
  participant: Participant;
  parent: Parent | null;
  medical: MedicalInfo | null;
  pickups: AuthorizedPickup[];
};

export default function HealthPage() {
  const [records, setRecords] = useState<ParticipantRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterAlert, setFilterAlert] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const participants = await fetchParticipants();
      const confirmed = participants.filter(p => p.status === 'confirmed');
      const full = await Promise.all(
        confirmed.map(async p => {
          const data = await dbActions.fetchParticipantById(p.id);
          return { participant: p, parent: data.parent, medical: data.medical, pickups: data.pickups };
        })
      );
      setRecords(full);
      setLoading(false);
    }
    loadData();
  }, []);

  const hasAlert = (r: ParticipantRecord) =>
    r.medical?.has_allergies || r.medical?.has_medication || r.medical?.has_conditions;

  const filtered = records.filter(r => {
    const q = search.toLowerCase();
    const matchSearch = !q ||
      r.participant.first_name.toLowerCase().includes(q) ||
      r.participant.last_name.toLowerCase().includes(q);
    const matchAlert = !filterAlert || hasAlert(r);
    return matchSearch && matchAlert;
  });

  const alertCount = records.filter(r => hasAlert(r)).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="font-display font-bold text-3xl text-slate-900">Health & Safety</h1>
          <p className="font-body text-sm text-slate-500 mt-1">Medical information and emergency contacts for camp staff.</p>
        </div>
        <div className="flex items-center gap-2 print:hidden">
          <a
            href="/api/pdf/health-safety"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </a>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            Print List
          </button>
        </div>
      </div>

      {/* Alert Banner */}
      {alertCount > 0 && (
        <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
          <p className="font-body text-sm text-amber-800">
            <span className="font-bold">{alertCount} participant{alertCount > 1 ? 's' : ''}</span> {alertCount > 1 ? 'have' : 'has'} medical conditions or allergies requiring attention.
          </p>
          <button
            onClick={() => setFilterAlert(!filterAlert)}
            className={`ml-auto font-body text-xs font-semibold px-3 py-1 rounded-full border transition-colors cursor-pointer ${
              filterAlert
                ? 'bg-amber-600 text-white border-amber-600'
                : 'bg-white text-amber-700 border-amber-300 hover:bg-amber-50'
            }`}
          >
            {filterAlert ? 'Show All' : 'View Alerts'}
          </button>
        </div>
      )}

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
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 bg-white border border-slate-200 rounded-2xl">
          <HeartPulse className="w-10 h-10 text-slate-300 mx-auto" />
          <p className="font-body text-slate-400 mt-3">No participants found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filtered.map(r => {
            const { participant: p, parent, medical, pickups } = r;
            const alert = hasAlert(r);
            return (
              <div
                key={p.id}
                className={`bg-white border rounded-2xl p-5 shadow-sm space-y-4 ${
                  alert ? 'border-amber-200' : 'border-slate-200'
                }`}
              >
                {/* Card Header */}
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono text-sm font-bold ${
                    alert ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {p.first_name[0]}{p.last_name[0]}
                  </div>
                  <div className="flex-grow">
                    <p className="font-display font-bold text-slate-900">{p.first_name} {p.last_name}</p>
                    <p className="font-body text-xs text-slate-400">{p.school_name} · {p.school_level === 'middle' ? 'Middle School' : 'High School'}</p>
                  </div>
                  {alert ? (
                    <div className="flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-semibold px-2.5 py-1 rounded-full">
                      <AlertTriangle className="w-3 h-3" />
                      Medical Alert
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 bg-green-50 text-green-700 border border-green-200 text-[10px] font-semibold px-2.5 py-1 rounded-full">
                      <CheckCircle2 className="w-3 h-3" />
                      No Issues
                    </div>
                  )}
                </div>

                {/* Medical Flags */}
                {medical && (
                  <div className="border border-slate-100 rounded-xl p-3 bg-slate-50 space-y-2">
                    <p className="font-body text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Medical Information</p>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                      <Flag label="Allergies" active={medical.has_allergies} detail={medical.allergies_detail} />
                      <Flag label="Dietary" active={medical.has_dietary} detail={medical.dietary_detail} />
                      <Flag label="Medication" active={medical.has_medication} detail={medical.medication_detail} />
                      <Flag label="Condition" active={medical.has_conditions} detail={medical.conditions_detail} />
                    </div>
                    {(medical.doctor_name || medical.doctor_phone) && (
                      <p className="font-body text-xs text-slate-500 pt-1">
                        Physician: <span className="font-semibold text-slate-700">{medical.doctor_name}</span>
                        {medical.doctor_phone && ` · ${medical.doctor_phone}`}
                      </p>
                    )}
                  </div>
                )}

                {/* Emergency Contact */}
                {parent && (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-body text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Emergency Contact</p>
                      <p className="font-body text-sm font-semibold text-slate-800">{parent.emergency_name} <span className="font-normal text-slate-500">({parent.emergency_relation})</span></p>
                      <p className="font-mono text-xs text-slate-600">{parent.emergency_phone}</p>
                    </div>
                    {pickups.length > 0 && (
                      <div>
                        <p className="font-body text-[10px] font-semibold text-slate-500 uppercase tracking-wider text-right">Authorized Pickups</p>
                        {pickups.map(pk => (
                          <p key={pk.id} className="font-body text-xs text-slate-600 text-right">{pk.full_name} <span className="text-slate-400">({pk.relationship})</span></p>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Flag({ label, active, detail }: { label: string; active: boolean; detail?: string }) {
  if (!active) return (
    <div className="flex items-center gap-1.5">
      <div className="w-2 h-2 rounded-full bg-slate-200 shrink-0"></div>
      <span className="font-body text-xs text-slate-400">{label}</span>
    </div>
  );
  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex items-center gap-1.5">
        <div className="w-2 h-2 rounded-full bg-amber-500 shrink-0"></div>
        <span className="font-body text-xs font-semibold text-amber-700">{label}</span>
      </div>
      {detail && <span className="font-body text-[10px] text-slate-500 pl-3.5">{detail}</span>}
    </div>
  );
}
