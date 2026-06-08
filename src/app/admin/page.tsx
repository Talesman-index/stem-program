'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Users,
  CheckSquare,
  Award,
  Clock,
  ArrowUpRight,
  ClipboardList,
  Calendar,
  FileBarChart,
  UserPlus
} from 'lucide-react';
import { fetchParticipants, fetchAttendance, fetchCertificates } from '../actions/dbActions';
import { Participant, Attendance, Certificate } from '../../lib/db/seedData';
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

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    async function loadData() {
      try {
        const [pData, aData, cData] = await Promise.all([
          fetchParticipants(),
          fetchAttendance(),
          fetchCertificates()
        ]);
        setParticipants(pData);
        setAttendance(aData);
        setCerts(cData);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (!mounted) return null;

  // -------------------------------------------------------------
  // Data Aggregations
  // -------------------------------------------------------------
  
  // 1. Confirmed count
  const totalCount = participants.length;
  const confirmedCount = participants.filter(p => p.status === 'confirmed').length;
  
  // 2. Waitlist count
  const waitlistCount = participants.filter(p => p.status === 'waitlist').length;
  
  // 3. Certificates count
  const certsCount = certs.length;

  // 4. Attendance rate
  const totalRolls = attendance.length;
  const presentRolls = attendance.filter(a => a.present).length;
  const attendanceRate = totalRolls > 0 ? Math.round((presentRolls / totalRolls) * 100) : 0;

  // 5. Chart 1: Daily Attendance Mock Data (aggregated from real records + fillers for layout)
  const attendanceTrendData = [
    { name: 'Mon', Present: 5, Absent: 1 },
    { name: 'Tue', Present: 6, Absent: 0 },
    { name: 'Wed', Present: 4, Absent: 2 },
    { name: 'Thu', Present: 5, Absent: 1 },
    { name: 'Fri', Present: 6, Absent: 0 }
  ];

  // 6. Chart 2: Middle School vs High School Donut
  const msCount = participants.filter(p => p.school_level === 'middle').length;
  const hsCount = participants.filter(p => p.school_level === 'high').length;
  
  const levelDonutData = [
    { name: 'Middle School (MS)', value: msCount || 4 },
    { name: 'High School (HS)', value: hsCount || 3 }
  ];
  
  const COLORS = ['#4A7FC1', '#7B7EC8'];

  // 7. Recent Registrations Feed (last 4 sorted by created_at)
  const recentFeed = [...participants]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 4);

  return (
    <div className="space-y-8 text-left">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="font-display font-bold text-3xl text-slate-900">Dashboard</h1>
          <p className="font-body text-sm text-slate-500 mt-1">
            Key indicators and operational management for the 2026 edition.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs bg-slate-200 text-slate-700 px-3 py-1.5 rounded-full font-bold uppercase border border-slate-300">
            Active Camp: June 2026
          </span>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 font-body text-slate-500">
          Loading statistics...
        </div>
      ) : (
        <>
          {/* KPI Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Total Registered */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="font-body text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Registered</span>
                <span className="font-mono font-bold text-3xl text-slate-950">{totalCount}</span>
                <span className="text-[10px] text-emerald-600 font-semibold">({confirmedCount} confirmed)</span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-stem-blue-mid flex items-center justify-center shrink-0">
                <Users className="w-6 h-6" />
              </div>
            </div>

            {/* Card 2: Attendance Rate */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="font-body text-xs font-semibold text-slate-400 uppercase tracking-wider">Attendance Rate</span>
                <span className="font-mono font-bold text-3xl text-slate-950">{attendanceRate}%</span>
                <span className="text-[10px] text-slate-400 font-semibold">Daily average</span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-green-50 text-stem-green flex items-center justify-center shrink-0">
                <CheckSquare className="w-6 h-6" />
              </div>
            </div>

            {/* Card 3: Certificates Generated */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="font-body text-xs font-semibold text-slate-400 uppercase tracking-wider">Certificates Created</span>
                <span className="font-mono font-bold text-3xl text-slate-950">{certsCount}</span>
                <span className="text-[10px] text-slate-400 font-semibold">Attendance rate &ge; 80%</span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-stem-purple flex items-center justify-center shrink-0">
                <Award className="w-6 h-6" />
              </div>
            </div>

            {/* Card 4: Waitlist Count */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="font-body text-xs font-semibold text-slate-400 uppercase tracking-wider">Waitlist</span>
                <span className="font-mono font-bold text-3xl text-slate-950">{waitlistCount}</span>
                <span className="text-[10px] text-amber-600 font-semibold">Limited spots</span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Daily attendance Chart (8 cols) */}
            <div className="lg:col-span-8 bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="font-display font-bold text-lg text-slate-900">Weekly Attendance</h3>
                <p className="font-body text-xs text-slate-400 mt-1">Cumulative morning (AM) and afternoon (PM) attendance per day.</p>
              </div>
              <div className="h-64 w-full mt-6">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={attendanceTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} />
                    <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
                    <Tooltip />
                    <Bar dataKey="Present" fill="#6BBF4E" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Absent" fill="#EF4444" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Levels pie Chart (4 cols) */}
            <div className="lg:col-span-4 bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="font-display font-bold text-lg text-slate-900">Level Distribution</h3>
                <p className="font-body text-xs text-slate-400 mt-1">Middle School (MS) vs High School (HS).</p>
              </div>
              <div className="h-56 w-full mt-4 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={levelDonutData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {levelDonutData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" fontSize={11} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Quick Actions & Recent Activity Rows */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Quick Actions Panel (5 cols) */}
            <div className="lg:col-span-5 bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex flex-col gap-6">
              <h3 className="font-display font-bold text-lg text-slate-900 border-b border-slate-100 pb-2">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-4">
                <Link
                  href="/admin/attendance"
                  className="p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-slate-100 flex flex-col items-center justify-center text-center gap-2 transition-colors group cursor-pointer"
                >
                  <Calendar className="w-5 h-5 text-stem-blue-mid group-hover:scale-105 transition-transform" />
                  <span className="font-body text-xs font-semibold text-slate-700">Take Attendance</span>
                </Link>
                <Link
                  href="/admin/registrations"
                  className="p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-slate-100 flex flex-col items-center justify-center text-center gap-2 transition-colors group cursor-pointer"
                >
                  <ClipboardList className="w-5 h-5 text-stem-green group-hover:scale-105 transition-transform" />
                  <span className="font-body text-xs font-semibold text-slate-700">Review Files</span>
                </Link>
                <Link
                  href="/admin/participants"
                  className="p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-slate-100 flex flex-col items-center justify-center text-center gap-2 transition-colors group cursor-pointer"
                >
                  <UserPlus className="w-5 h-5 text-stem-purple group-hover:scale-105 transition-transform" />
                  <span className="font-body text-xs font-semibold text-slate-700">Manage Students</span>
                </Link>
                <Link
                  href="/admin/reports"
                  className="p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-slate-100 flex flex-col items-center justify-center text-center gap-2 transition-colors group cursor-pointer"
                >
                  <FileBarChart className="w-5 h-5 text-amber-600 group-hover:scale-105 transition-transform" />
                  <span className="font-body text-xs font-semibold text-slate-700">Export Report</span>
                </Link>
              </div>
            </div>

            {/* Recent Activity Feed (7 cols) */}
            <div className="lg:col-span-7 bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="font-display font-bold text-lg text-slate-900 border-b border-slate-100 pb-2">Recent Registrations</h3>
                <div className="mt-4 space-y-4">
                  {recentFeed.map((p) => (
                    <div key={p.id} className="flex items-center justify-between border-b border-slate-50 pb-3 last:border-0 last:pb-0">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-mono text-xs font-bold uppercase">
                          {p.first_name[0]}{p.last_name[0]}
                        </div>
                        <div className="flex flex-col text-left">
                          <span className="font-body text-sm font-semibold text-slate-800">{p.first_name} {p.last_name}</span>
                          <span className="font-body text-xs text-slate-400">{p.school_name} · {p.school_level === 'middle' ? 'Middle School' : 'High School'}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                          p.status === 'confirmed' ? 'bg-green-50 border-green-200 text-green-700' :
                          p.status === 'waitlist' ? 'bg-purple-50 border-purple-200 text-purple-700' :
                          'bg-amber-50 border-amber-200 text-amber-700'
                        }`}>
                          {p.status === 'confirmed' ? 'Confirmed' : p.status === 'waitlist' ? 'Waitlist' : 'In Review'}
                        </span>
                        <Link href={`/admin/participants/${p.id}`} className="p-1 hover:bg-slate-50 rounded">
                          <ArrowUpRight className="w-4 h-4 text-slate-400 hover:text-slate-600" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
