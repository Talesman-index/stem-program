'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { fetchParticipants, fetchGroups, updateParticipantStatus, removeParticipant, registerParticipant } from '../../actions/dbActions';
import { Participant, Group } from '../../../lib/db/seedData';
import { Search, Download, Upload, UserX, Eye, UserPlus, Filter, X } from 'lucide-react';

export default function ParticipantsList() {
  const router = useRouter();
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter State
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState<'all' | 'middle' | 'high'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'review' | 'confirmed' | 'waitlist' | 'cancelled'>('all');

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [pData, gData] = await Promise.all([
          fetchParticipants(),
          fetchGroups()
        ]);
        setParticipants(pData);
        setGroups(gData);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Filter logic
  const filtered = participants.filter(p => {
    const fullName = `${p.first_name} ${p.last_name}`.toLowerCase();
    const matchesSearch = fullName.includes(search.toLowerCase()) || 
                          p.school_name.toLowerCase().includes(search.toLowerCase());
    const matchesLevel = levelFilter === 'all' || p.school_level === levelFilter;
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesLevel && matchesStatus;
  });

  const getGroupName = (groupId: string | null) => {
    if (!groupId) return 'Unassigned';
    return groups.find(g => g.id === groupId)?.name || 'Unassigned';
  };

  const handleStatusChange = async (id: string, newStatus: any) => {
    try {
      await updateParticipantStatus(id, newStatus);
      setParticipants(prev =>
        prev.map(p => p.id === id ? { ...p, status: newStatus } : p)
      );
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to permanently delete this participant and all associated records?")) {
      try {
        await removeParticipant(id);
        setParticipants(prev => prev.filter(p => p.id !== id));
      } catch (e) {
        console.error(e);
      }
    }
  };

  // Export CSV Handler
  const handleExportCSV = () => {
    const headers = ['FirstName', 'LastName', 'DateOfBirth', 'SchoolLevel', 'SchoolName', 'Status'];
    const rows = participants.map(p => [
      p.first_name,
      p.last_name,
      p.date_of_birth,
      p.school_level,
      p.school_name,
      p.status
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(r => r.map(val => `"${val.replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `participants_stem_2026.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Import CSV Handler (Client side parsing)
  const handleImportCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const text = event.target?.result as string;
      const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
      if (lines.length <= 1) return;

      setLoading(true);
      let importedCount = 0;

      for (let i = 1; i < lines.length; i++) {
        // Simple CSV split (supporting quotes)
        const parts = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(s => s.replace(/^"|"$/g, '').trim());
        if (parts.length < 5) continue;

        const [firstName, lastName, dob, schoolLevel, schoolName, status] = parts;

        // Mock registering via action
        try {
          await registerParticipant(
            {
              first_name: firstName,
              last_name: lastName,
              date_of_birth: dob,
              school_level: (schoolLevel === 'high' ? 'high' : 'middle'),
              school_name: schoolName,
              status: (status as any) || 'pending',
              session_id: (schoolLevel === 'high' ? 'hs-2026' : 'ms-2026')
            },
            {
              full_name: `Parent of ${firstName}`,
              phone: '000-000-0000',
              email: 'parent.import@example.com',
              emergency_name: 'Emergency Contact',
              emergency_relation: 'Other',
              emergency_phone: '000-000-0000'
            },
            {
              has_allergies: false,
              has_dietary: false,
              has_medication: false,
              has_conditions: false
            },
            []
          );
          importedCount++;
        } catch (err) {
          console.error("Failed importing row:", err);
        }
      }

      alert(`${importedCount} student(s) successfully imported!`);
      // Reload page data
      const pData = await fetchParticipants();
      setParticipants(pData);
      setLoading(false);
    };

    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = ''; // Reset input
  };

  return (
    <div className="space-y-6 text-left">
      {/* Top Banner Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="font-display font-bold text-3xl text-slate-900">Participant Management</h1>
          <p className="font-body text-sm text-slate-500 mt-1">
            Search, filter, edit profiles, and manage student records.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {/* CSV Import */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImportCSV}
            accept=".csv"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-white border border-slate-300 text-slate-700 font-body font-semibold text-xs px-4 py-2.5 rounded-lg flex items-center gap-1.5 hover:bg-slate-50 transition-all cursor-pointer shadow-sm"
          >
            <Upload className="w-4 h-4" />
            Import CSV
          </button>
          
          {/* CSV Export */}
          <button
            onClick={handleExportCSV}
            className="bg-white border border-slate-300 text-slate-700 font-body font-semibold text-xs px-4 py-2.5 rounded-lg flex items-center gap-1.5 hover:bg-slate-50 transition-all cursor-pointer shadow-sm"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>

          {/* Register Mock */}
          <Link
            href="/register"
            target="_blank"
            className="bg-stem-green hover:bg-opacity-95 text-white font-body font-bold text-xs px-4 py-2.5 rounded-lg flex items-center gap-1.5 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer shadow"
          >
            <UserPlus className="w-4 h-4" />
            Register Student
          </Link>
        </div>
      </div>

      {/* Filters Dashboard */}
      <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex flex-col sm:flex-row items-center gap-4">
        {/* Search */}
        <div className="relative flex-grow w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name or school..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-stem-blue-mid focus:bg-white transition-all"
          />
        </div>

        {/* Level Filter */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value as any)}
            className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-700 focus:outline-none focus:border-stem-blue-mid"
          >
            <option value="all">All Levels</option>
            <option value="middle">Middle School (MS)</option>
            <option value="high">High School (HS)</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-700 focus:outline-none focus:border-stem-blue-mid"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Under Review</option>
            <option value="review">In Review</option>
            <option value="confirmed">Confirmed</option>
            <option value="waitlist">Waitlisted</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Datatable Wrapper */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="text-center py-20 text-slate-500">
            Loading participants...
          </div>
        ) : filtered.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="font-display font-bold text-xs text-slate-500 uppercase tracking-wider text-left py-3.5 px-6">Student</th>
                  <th className="font-display font-bold text-xs text-slate-500 uppercase tracking-wider text-left py-3.5 px-6">Level</th>
                  <th className="font-display font-bold text-xs text-slate-500 uppercase tracking-wider text-left py-3.5 px-6">School</th>
                  <th className="font-display font-bold text-xs text-slate-500 uppercase tracking-wider text-left py-3.5 px-6">Group</th>
                  <th className="font-display font-bold text-xs text-slate-500 uppercase tracking-wider text-left py-3.5 px-6">Status</th>
                  <th className="font-display font-bold text-xs text-slate-500 uppercase tracking-wider text-right py-3.5 px-6">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr 
                    key={p.id} 
                    className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors cursor-pointer"
                    onClick={() => router.push(`/admin/participants/${p.id}`)}
                  >
                    <td className="py-4 px-6 font-body text-sm font-semibold text-slate-800">
                      {p.first_name} {p.last_name}
                    </td>
                    <td className="py-4 px-6 font-body text-xs text-slate-500">
                      {p.school_level === 'middle' ? 'Middle School (MS)' : 'High School (HS)'}
                    </td>
                    <td className="py-4 px-6 font-body text-sm text-slate-500">
                      {p.school_name}
                    </td>
                    <td className="py-4 px-6 font-body text-sm">
                      <span className="px-2.5 py-1 rounded bg-slate-100 font-medium text-slate-700 text-xs">
                        {getGroupName(p.group_id)}
                      </span>
                    </td>
                    <td className="py-4 px-6" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={p.status}
                        onChange={(e) => handleStatusChange(p.id, e.target.value as any)}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full border bg-white focus:outline-none ${
                          p.status === 'confirmed' ? 'border-green-300 text-green-700' :
                          p.status === 'waitlist' ? 'border-purple-300 text-purple-700' :
                          p.status === 'cancelled' ? 'border-red-300 text-red-700' :
                          'border-amber-300 text-amber-700'
                        }`}
                      >
                        <option value="pending">Under Review</option>
                        <option value="review">In Review</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="waitlist">Waitlisted</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/participants/${p.id}`}
                          className="p-2 border border-slate-200 hover:bg-slate-50 rounded-lg text-slate-600 hover:text-slate-800 transition-all"
                          title="View Profile"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(p.id)}
                          className="p-2 border border-slate-200 hover:bg-red-50 rounded-lg text-red-500 hover:text-red-700 transition-all cursor-pointer"
                          title="Delete"
                        >
                          <UserX className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-20 text-slate-400">
            No participants match the selected filters.
          </div>
        )}
      </div>
    </div>
  );
}
