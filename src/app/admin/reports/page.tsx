'use client';

import { useState, useEffect } from 'react';
import {
  BarChart3,
  Download,
  Users,
  CalendarCheck,
  Award,
  Clock,
  Loader2,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import {
  fetchParticipants,
  fetchAttendance,
  fetchCertificates,
  fetchGroups
} from '../../actions/dbActions';
import { Participant, Attendance, Certificate, Group } from '../../../lib/db/seedData';

export default function ReportsPage() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'summary' | 'attendance' | 'demographics'>('summary');

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const [p, a, c, g] = await Promise.all([
        fetchParticipants(),
        fetchAttendance(),
        fetchCertificates(),
        fetchGroups()
      ]);
      setParticipants(p);
      setAttendance(a);
      setCerts(c);
      setGroups(g);
      setLoading(false);
    }
    loadData();
  }, []);

  // Computed stats
  const confirmed = participants.filter(p => p.status === 'confirmed');
  const pending = participants.filter(p => p.status === 'pending' || p.status === 'review');
  const waitlist = participants.filter(p => p.status === 'waitlist');
  const msCount = participants.filter(p => p.school_level === 'middle').length;
  const hsCount = participants.filter(p => p.school_level === 'high').length;
  const certsCount = certs.length;
  const attendanceRate = attendance.length > 0
    ? Math.round((attendance.filter(a => a.present).length / attendance.length) * 100)
    : 0;

  // Attendance by date chart
  const dateMap: Record<string, { present: number; absent: number }> = {};
  attendance.forEach(a => {
    if (!dateMap[a.session_date]) dateMap[a.session_date] = { present: 0, absent: 0 };
    if (a.present) dateMap[a.session_date].present++;
    else dateMap[a.session_date].absent++;
  });
  const attendanceChartData = Object.entries(dateMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, vals]) => ({
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: '2-digit' }),
      Present: vals.present,
      Absent: vals.absent
    }));

  // Status pie
  const statusData = [
    { name: 'Confirmed', value: confirmed.length },
    { name: 'Under Review', value: pending.length },
    { name: 'Waitlisted', value: waitlist.length },
  ].filter(d => d.value > 0);
  const STATUS_COLORS = ['#22C55E', '#F59E0B', '#A855F7'];

  // School distribution
  const schoolMap: Record<string, number> = {};
  participants.forEach(p => {
    schoolMap[p.school_name] = (schoolMap[p.school_name] || 0) + 1;
  });
  const schoolData = Object.entries(schoolMap)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6)
    .map(([name, value]) => ({ name: name.replace(' High School', ' HS').replace(' Middle School', ' MS'), value }));

  // Group fill rates
  const groupFillData = groups.map(g => {
    const count = participants.filter(p => p.group_id === g.id).length;
    return { name: g.name, Enrolled: count, Capacity: g.capacity };
  });

  function handleExportCSV() {
    const headers = ['ID', 'FirstName', 'LastName', 'School', 'Level', 'Status', 'Group', 'RegistrationDate'];
    const rows = participants.map(p => [
      p.id, p.first_name, p.last_name, p.school_name,
      p.school_level === 'middle' ? 'Middle School' : 'High School',
      p.status,
      p.group_id || 'Unassigned',
      new Date(p.created_at).toLocaleDateString('en-US')
    ]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `stem-report-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  const TABS = [
    { id: 'summary', label: 'Summary' },
    { id: 'attendance', label: 'Attendance' },
    { id: 'demographics', label: 'Demographics' },
  ] as const;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="font-display font-bold text-3xl text-slate-900">Reports & Analytics</h1>
          <p className="font-body text-sm text-slate-500 mt-1">Comprehensive data analysis for the 2026 program.</p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="/api/pdf/impact-report"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Download PDF Report
          </a>
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`font-body text-sm font-semibold px-4 py-2.5 border-b-2 -mb-[2px] transition-colors cursor-pointer ${
              activeTab === t.id
                ? 'border-stem-blue-mid text-stem-blue-mid'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-stem-blue-mid animate-spin" />
        </div>
      ) : (
        <>
          {/* Summary Tab */}
          {activeTab === 'summary' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: 'Total Enrolled', value: participants.length, icon: Users, color: 'blue' },
                  { label: 'Attendance Rate', value: `${attendanceRate}%`, icon: CalendarCheck, color: 'green' },
                  { label: 'Certificates', value: certsCount, icon: Award, color: 'purple' },
                  { label: 'Waitlisted', value: waitlist.length, icon: Clock, color: 'amber' },
                ].map(kpi => (
                  <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                    <p className="font-body text-xs font-semibold text-slate-500 uppercase tracking-wider">{kpi.label}</p>
                    <p className="font-mono text-3xl font-bold text-slate-900 mt-1">{kpi.value}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Status Distribution */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                  <h3 className="font-display font-bold text-lg text-slate-900 mb-4">Status Distribution</h3>
                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={statusData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
                          {statusData.map((_, i) => <Cell key={i} fill={STATUS_COLORS[i]} />)}
                        </Pie>
                        <Tooltip />
                        <Legend iconType="circle" fontSize={11} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Group Fill Rates */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                  <h3 className="font-display font-bold text-lg text-slate-900 mb-4">Group Fill Rates</h3>
                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={groupFillData} margin={{ left: -20 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" fontSize={10} tickLine={false} />
                        <YAxis fontSize={10} tickLine={false} />
                        <Tooltip />
                        <Bar dataKey="Enrolled" fill="#4A7FC1" radius={[3, 3, 0, 0]} />
                        <Bar dataKey="Capacity" fill="#E2E8F0" radius={[3, 3, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Attendance Tab */}
          {activeTab === 'attendance' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="font-display font-bold text-lg text-slate-900 mb-1">Daily Attendance</h3>
              <p className="font-body text-xs text-slate-400 mb-6">AM + PM combined by session date.</p>
              {attendanceChartData.length > 0 ? (
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={attendanceChartData} margin={{ left: -20 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="date" fontSize={11} tickLine={false} />
                      <YAxis fontSize={11} tickLine={false} />
                      <Tooltip />
                      <Legend iconType="circle" fontSize={11} />
                      <Bar dataKey="Present" fill="#22C55E" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Absent" fill="#EF4444" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="flex items-center justify-center h-48">
                  <p className="font-body text-slate-400">No attendance data recorded yet.</p>
                </div>
              )}
            </div>
          )}

          {/* Demographics Tab */}
          {activeTab === 'demographics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* MS vs HS */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                  <h3 className="font-display font-bold text-lg text-slate-900 mb-4">MS vs. HS</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between font-body text-sm mb-1">
                        <span className="text-slate-700">Middle School (MS)</span>
                        <span className="font-semibold">{msCount}</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-sky-500 rounded-full" style={{ width: `${participants.length ? (msCount / participants.length * 100) : 0}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between font-body text-sm mb-1">
                        <span className="text-slate-700">High School (HS)</span>
                        <span className="font-semibold">{hsCount}</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-violet-500 rounded-full" style={{ width: `${participants.length ? (hsCount / participants.length * 100) : 0}%` }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* School breakdown */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                  <h3 className="font-display font-bold text-lg text-slate-900 mb-4">Participants by School</h3>
                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={schoolData} layout="vertical" margin={{ left: 10, right: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        <XAxis type="number" fontSize={10} tickLine={false} />
                        <YAxis type="category" dataKey="name" fontSize={9} tickLine={false} width={90} />
                        <Tooltip />
                        <Bar dataKey="value" fill="#4A7FC1" radius={[0, 4, 4, 0]} label={{ position: 'right', fontSize: 10 }} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
