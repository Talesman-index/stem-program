'use client';

import { useState, useEffect, useTransition } from 'react';
import {
  Handshake,
  Plus,
  Eye,
  EyeOff,
  Mail,
  Phone,
  Loader2,
  Search,
  MessageSquare,
  CheckCircle2,
  XCircle,
  Clock,
  ChevronDown,
  ChevronUp,
  X
} from 'lucide-react';
import {
  fetchPartners,
  fetchPartnershipRequests,
  addSponsor,
  toggleSponsorActive,
  editSponsorDetails,
  updateRequestStatusAction
} from '../../actions/dbActions';
import { Partner, PartnershipRequest } from '../../../lib/db/seedData';

const TIER_CONFIG: Record<string, { label: string; bg: string; text: string; border: string }> = {
  platinum: { label: 'Platinum', bg: 'bg-slate-100', text: 'text-slate-800', border: 'border-slate-300' },
  gold: { label: 'Gold', bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-300' },
  silver: { label: 'Silver', bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-200' },
  bronze: { label: 'Bronze', bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
  friend: { label: 'Friend', bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-200' },
};

const REQ_STATUS: Record<string, { label: string; color: string }> = {
  new: { label: 'New', color: 'amber' },
  discussion: { label: 'In Discussion', color: 'blue' },
  confirmed: { label: 'Confirmed', color: 'green' },
  declined: { label: 'Declined', color: 'red' },
};

export default function PartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [requests, setRequests] = useState<PartnershipRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState('');
  const [showRequests, setShowRequests] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  // New partner form
  const [formName, setFormName] = useState('');
  const [formTier, setFormTier] = useState<Partner['tier']>('bronze');
  const [formContact, setFormContact] = useState('');
  const [formEmail, setFormEmail] = useState('');

  async function loadData() {
    setLoading(true);
    const [p, r] = await Promise.all([fetchPartners(), fetchPartnershipRequests()]);
    setPartners(p);
    setRequests(r);
    setLoading(false);
  }

  useEffect(() => { loadData(); }, []);

  const filtered = partners.filter(p => {
    if (!search) return true;
    return p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.contact_name.toLowerCase().includes(search.toLowerCase());
  });

  const activeCount = partners.filter(p => p.active).length;
  const newRequestCount = requests.filter(r => r.status === 'new').length;

  function handleToggleActive(id: string, active: boolean) {
    startTransition(async () => {
      await toggleSponsorActive(id, !active);
      await loadData();
    });
  }

  function handleAddPartner() {
    if (!formName.trim()) return;
    startTransition(async () => {
      await addSponsor({
        name: formName,
        logo_path: '/assets/images/livingstone.jpg',
        tier: formTier,
        start_date: new Date().toISOString().split('T')[0],
        end_date: new Date(Date.now() + 365 * 86400000).toISOString().split('T')[0],
        contact_name: formContact,
        contact_email: formEmail,
        active: true
      });
      setFormName('');
      setFormContact('');
      setFormEmail('');
      setShowAddForm(false);
      await loadData();
    });
  }

  function handleRequestStatus(id: string, status: PartnershipRequest['status']) {
    startTransition(async () => {
      await updateRequestStatusAction(id, status);
      await loadData();
    });
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="font-display font-bold text-3xl text-slate-900">Partnerships & Sponsors</h1>
          <p className="font-body text-sm text-slate-500 mt-1">Manage active sponsors and incoming partnership requests.</p>
        </div>
        <div className="flex items-center gap-3">
          {newRequestCount > 0 && (
            <button
              onClick={() => setShowRequests(!showRequests)}
              className="flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-amber-100 transition-colors cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              {newRequestCount} request{newRequestCount > 1 ? 's' : ''}
              {showRequests ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          )}
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 bg-stem-blue-mid text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-stem-blue-deep transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add Sponsor
          </button>
        </div>
      </div>

      {/* Partnership Requests Drawer */}
      {showRequests && requests.length > 0 && (
        <div className="bg-white border border-amber-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-lg text-slate-900">Partnership Requests</h3>
            <button onClick={() => setShowRequests(false)} className="p-1 hover:bg-slate-100 rounded-lg cursor-pointer">
              <X className="w-4 h-4 text-slate-400" />
            </button>
          </div>
          <div className="space-y-3">
            {requests.map(r => {
              const statusCfg = REQ_STATUS[r.status];
              return (
                <div key={r.id} className="border border-slate-100 rounded-xl p-4 bg-slate-50 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-body text-sm font-semibold text-slate-800">{r.org_name}</p>
                      <p className="font-body text-xs text-slate-500">{r.contact_name} · {r.email}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`font-mono text-[10px] px-2 py-0.5 rounded-full border bg-${statusCfg.color}-50 text-${statusCfg.color}-700 border-${statusCfg.color}-200 font-semibold`}>
                        {statusCfg.label}
                      </span>
                    </div>
                  </div>
                  <p className="font-body text-xs text-slate-600 leading-relaxed">{r.message}</p>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-slate-400">Tier: {r.tier_interest}</span>
                    <span className="font-mono text-[10px] text-slate-400">·</span>
                    <span className="font-mono text-[10px] text-slate-400">{r.request_type}</span>
                    {r.wants_dossier && <span className="font-mono text-[10px] text-blue-500 ml-auto">Dossier Requested</span>}
                  </div>
                  {r.status === 'new' && (
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => handleRequestStatus(r.id, 'discussion')}
                        className="flex items-center gap-1 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-lg border border-blue-200 transition-colors cursor-pointer"
                      >
                        <Clock className="w-3 h-3" /> Discuss
                      </button>
                      <button
                        onClick={() => handleRequestStatus(r.id, 'confirmed')}
                        className="flex items-center gap-1 bg-green-50 hover:bg-green-100 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-lg border border-green-200 transition-colors cursor-pointer"
                      >
                        <CheckCircle2 className="w-3 h-3" /> Confirm
                      </button>
                      <button
                        onClick={() => handleRequestStatus(r.id, 'declined')}
                        className="flex items-center gap-1 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold px-3 py-1.5 rounded-lg border border-red-200 transition-colors cursor-pointer"
                      >
                        <XCircle className="w-3 h-3" /> Decline
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Add Sponsor Form */}
      {showAddForm && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="font-display font-bold text-lg text-slate-900">New Sponsor</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="font-body text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5 block">Organization Name</label>
              <input
                type="text"
                value={formName}
                onChange={e => setFormName(e.target.value)}
                placeholder="e.g. Rowan Tech"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-body focus:outline-none focus:ring-2 focus:ring-stem-blue-mid/30"
              />
            </div>
            <div>
              <label className="font-body text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5 block">Tier</label>
              <select
                value={formTier}
                onChange={e => setFormTier(e.target.value as Partner['tier'])}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-body focus:outline-none focus:ring-2 focus:ring-stem-blue-mid/30 appearance-none cursor-pointer"
              >
                {Object.entries(TIER_CONFIG).map(([k, v]) => (
                  <option key={k} value={k}>{v.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-body text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5 block">Contact</label>
              <input
                type="text"
                value={formContact}
                onChange={e => setFormContact(e.target.value)}
                placeholder="First Last"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-body focus:outline-none focus:ring-2 focus:ring-stem-blue-mid/30"
              />
            </div>
            <div>
              <label className="font-body text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5 block">Email</label>
              <input
                type="email"
                value={formEmail}
                onChange={e => setFormEmail(e.target.value)}
                placeholder="email@org.com"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-body focus:outline-none focus:ring-2 focus:ring-stem-blue-mid/30"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleAddPartner}
              disabled={isPending || !formName.trim()}
              className="flex items-center gap-2 bg-stem-blue-mid text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-stem-blue-deep disabled:opacity-50 transition-colors cursor-pointer"
            >
              {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              Add
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="bg-slate-100 text-slate-700 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* KPI Strip */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 text-center shadow-sm">
          <p className="font-mono text-2xl font-bold text-slate-900">{partners.length}</p>
          <p className="font-body text-xs text-slate-500 mt-1">Total Sponsors</p>
        </div>
        <div className="bg-white border border-green-200 rounded-xl p-4 text-center shadow-sm">
          <p className="font-mono text-2xl font-bold text-green-600">{activeCount}</p>
          <p className="font-body text-xs text-slate-500 mt-1">Active</p>
        </div>
        <div className="bg-white border border-amber-200 rounded-xl p-4 text-center shadow-sm">
          <p className="font-mono text-2xl font-bold text-amber-600">{requests.length}</p>
          <p className="font-body text-xs text-slate-500 mt-1">Requests</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search for a sponsor..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl font-body text-sm focus:outline-none focus:ring-2 focus:ring-stem-blue-mid/30"
        />
      </div>

      {/* Partners Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-stem-blue-mid animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 bg-white border border-slate-200 rounded-2xl">
          <Handshake className="w-10 h-10 text-slate-300 mx-auto" />
          <p className="font-body text-slate-400 mt-3">No sponsors found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(p => {
            const tier = TIER_CONFIG[p.tier] || TIER_CONFIG.friend;
            return (
              <div
                key={p.id}
                className={`bg-white border rounded-2xl p-5 shadow-sm space-y-4 transition-all hover:shadow-md ${
                  p.active ? 'border-slate-200' : 'border-slate-100 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-mono text-sm font-bold">
                      {p.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-display font-bold text-slate-900 text-sm">{p.name}</p>
                      <span className={`font-mono text-[10px] px-2 py-0.5 rounded-full border ${tier.bg} ${tier.text} ${tier.border}`}>
                        {tier.label}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggleActive(p.id, p.active)}
                    title={p.active ? 'Deactivate' : 'Activate'}
                    className={`p-2 rounded-lg transition-colors cursor-pointer ${
                      p.active ? 'hover:bg-red-50 text-green-600' : 'hover:bg-green-50 text-slate-400'
                    }`}
                  >
                    {p.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-body text-xs text-slate-600">{p.contact_email}</span>
                  </div>
                  <p className="font-body text-xs text-slate-500 pl-5.5">{p.contact_name}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <span className="font-mono text-[10px] text-slate-400">
                    {new Date(p.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} — {new Date(p.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                  {p.active ? (
                    <span className="inline-flex items-center gap-1 font-mono text-[10px] text-green-600">
                      <CheckCircle2 className="w-3 h-3" /> Active
                    </span>
                  ) : (
                    <span className="font-mono text-[10px] text-slate-400">Inactive</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
