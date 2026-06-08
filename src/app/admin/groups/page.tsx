'use client';

import { useState, useEffect, useTransition } from 'react';
import {
  FolderKanban,
  Plus,
  Trash2,
  Users,
  GripVertical,
  Loader2,
  Check,
  X
} from 'lucide-react';
import {
  fetchGroups,
  fetchParticipants,
  fetchSessions,
  createNewGroup,
  removeGroup,
  assignParticipantGroup
} from '../../actions/dbActions';
import { Group, Participant, Session } from '../../../lib/db/seedData';

const GROUP_COLORS = [
  '#4ADE80', '#FB923C', '#F472B6', '#60A5FA',
  '#A78BFA', '#34D399', '#FBBF24', '#F87171',
  '#38BDF8', '#E879F9',
];

export default function GroupsPage() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [dragging, setDragging] = useState<string | null>(null);
  const [dragOverGroup, setDragOverGroup] = useState<string | null>(null);

  // New group form
  const [showForm, setShowForm] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupSession, setNewGroupSession] = useState('');
  const [newGroupColor, setNewGroupColor] = useState(GROUP_COLORS[0]);
  const [newGroupCapacity, setNewGroupCapacity] = useState(10);

  async function loadData() {
    setLoading(true);
    const [g, p, s] = await Promise.all([fetchGroups(), fetchParticipants(), fetchSessions()]);
    setGroups(g);
    setParticipants(p);
    setSessions(s);
    if (!newGroupSession && s.length > 0) setNewGroupSession(s[0].id);
    setLoading(false);
  }

  useEffect(() => { loadData(); }, []);

  const unassigned = participants.filter(p => !p.group_id && p.status === 'confirmed');

  function handleDragStart(participantId: string) {
    setDragging(participantId);
  }

  function handleDrop(groupId: string | null) {
    if (!dragging) return;
    startTransition(async () => {
      await assignParticipantGroup(dragging, groupId);
      await loadData();
    });
    setDragging(null);
    setDragOverGroup(null);
  }

  function handleCreateGroup() {
    if (!newGroupName.trim() || !newGroupSession) return;
    startTransition(async () => {
      await createNewGroup(newGroupName, newGroupSession, newGroupColor, newGroupCapacity);
      setNewGroupName('');
      setShowForm(false);
      await loadData();
    });
  }

  function handleDeleteGroup(id: string) {
    startTransition(async () => {
      await removeGroup(id);
      await loadData();
    });
  }

  const getGroupParticipants = (groupId: string) =>
    participants.filter(p => p.group_id === groupId);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="font-display font-bold text-3xl text-slate-900">Group Management</h1>
          <p className="font-body text-sm text-slate-500 mt-1">Assign confirmed participants to their working groups.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-stem-blue-mid text-white font-body text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-stem-blue-deep transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Create Group
        </button>
      </div>

      {/* Create Group Form */}
      {showForm && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="font-display font-bold text-lg text-slate-900">New Group</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="font-body text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5 block">Name</label>
              <input
                type="text"
                placeholder="e.g. Bio-Bots"
                value={newGroupName}
                onChange={e => setNewGroupName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-body text-slate-800 focus:outline-none focus:ring-2 focus:ring-stem-blue-mid/30"
              />
            </div>
            <div>
              <label className="font-body text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5 block">Session</label>
              <select
                value={newGroupSession}
                onChange={e => setNewGroupSession(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-body text-slate-700 focus:outline-none focus:ring-2 focus:ring-stem-blue-mid/30 appearance-none cursor-pointer"
              >
                {sessions.map(s => (
                  <option key={s.id} value={s.id}>{s.type === 'middle' ? 'Middle School' : 'High School'} {s.year}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-body text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5 block">Capacity</label>
              <input
                type="number"
                min={1}
                max={30}
                value={newGroupCapacity}
                onChange={e => setNewGroupCapacity(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-body text-slate-800 focus:outline-none focus:ring-2 focus:ring-stem-blue-mid/30"
              />
            </div>
            <div>
              <label className="font-body text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5 block">Color</label>
              <div className="flex flex-wrap gap-1.5">
                {GROUP_COLORS.map(c => (
                  <button
                    key={c}
                    onClick={() => setNewGroupColor(c)}
                    style={{ backgroundColor: c }}
                    className={`w-6 h-6 rounded-full border-2 transition-all cursor-pointer ${newGroupColor === c ? 'border-slate-900 scale-110' : 'border-transparent'}`}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleCreateGroup}
              disabled={isPending || !newGroupName.trim()}
              className="flex items-center gap-2 bg-stem-blue-mid text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-stem-blue-deep disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
              Create
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="flex items-center gap-2 bg-slate-100 text-slate-700 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-stem-blue-mid animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Unassigned Pool */}
          <div className="lg:col-span-3">
            <div
              className={`bg-white border-2 border-dashed rounded-2xl p-4 min-h-64 transition-all ${
                dragOverGroup === 'unassigned' ? 'border-stem-blue-mid bg-blue-50/30' : 'border-slate-200'
              }`}
              onDragOver={e => { e.preventDefault(); setDragOverGroup('unassigned'); }}
              onDragLeave={() => setDragOverGroup(null)}
              onDrop={() => handleDrop(null)}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-400"></div>
                <h3 className="font-display font-bold text-sm text-slate-700">Unassigned</h3>
                <span className="ml-auto font-mono text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{unassigned.length}</span>
              </div>
              <div className="space-y-2">
                {unassigned.length === 0 && (
                  <p className="font-body text-xs text-slate-400 text-center py-6">All confirmed participants have been assigned.</p>
                )}
                {unassigned.map(p => (
                  <div
                    key={p.id}
                    draggable
                    onDragStart={() => handleDragStart(p.id)}
                    className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 cursor-grab active:cursor-grabbing hover:border-slate-300 transition-colors group"
                  >
                    <GripVertical className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-500" />
                    <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-mono text-[9px] font-bold">
                      {p.first_name[0]}{p.last_name[0]}
                    </div>
                    <span className="font-body text-xs font-semibold text-slate-700 truncate">{p.first_name} {p.last_name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Group Columns */}
          <div className="lg:col-span-9">
            {groups.length === 0 ? (
              <div className="flex items-center justify-center h-64 bg-white border border-dashed border-slate-200 rounded-2xl">
                <div className="text-center">
                  <FolderKanban className="w-10 h-10 text-slate-300 mx-auto" />
                  <p className="font-body text-slate-400 mt-3 text-sm">No groups created. Start by creating a group.</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {groups.map(g => {
                  const members = getGroupParticipants(g.id);
                  const isFull = members.length >= g.capacity;
                  return (
                    <div
                      key={g.id}
                      className={`bg-white border-2 rounded-2xl p-4 min-h-48 transition-all ${
                        dragOverGroup === g.id ? 'shadow-lg scale-[1.01]' : 'border-slate-200'
                      }`}
                      style={{ borderTopColor: g.color, borderTopWidth: '3px' }}
                      onDragOver={e => { e.preventDefault(); setDragOverGroup(g.id); }}
                      onDragLeave={() => setDragOverGroup(null)}
                      onDrop={() => handleDrop(g.id)}
                    >
                      {/* Group Header */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: g.color }}></div>
                        <h3 className="font-display font-bold text-sm text-slate-800 truncate flex-grow">{g.name}</h3>
                        <span className={`font-mono text-[10px] px-2 py-0.5 rounded-full ${isFull ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-500'}`}>
                          {members.length}/{g.capacity}
                        </span>
                        <button
                          onClick={() => handleDeleteGroup(g.id)}
                          className="p-1 rounded hover:bg-red-50 text-slate-300 hover:text-red-500 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Members list */}
                      <div className="space-y-1.5">
                        {members.length === 0 && (
                          <div className="border border-dashed border-slate-200 rounded-lg py-4 text-center">
                            <p className="font-body text-[10px] text-slate-400">Drag participants here</p>
                          </div>
                        )}
                        {members.map(p => (
                          <div
                            key={p.id}
                            draggable
                            onDragStart={() => handleDragStart(p.id)}
                            className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-lg px-2.5 py-1.5 cursor-grab active:cursor-grabbing hover:border-slate-200 transition-colors group"
                          >
                            <GripVertical className="w-3 h-3 text-slate-300 group-hover:text-slate-500" />
                            <div
                              className="w-5 h-5 rounded-full flex items-center justify-center font-mono text-[8px] font-bold text-white"
                              style={{ backgroundColor: g.color }}
                            >
                              {p.first_name[0]}{p.last_name[0]}
                            </div>
                            <span className="font-body text-xs text-slate-700 truncate">{p.first_name} {p.last_name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
