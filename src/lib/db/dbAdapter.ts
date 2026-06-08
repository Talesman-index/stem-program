import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import {
  INITIAL_DB,
  Session,
  Group,
  Participant,
  Parent,
  MedicalInfo,
  AuthorizedPickup,
  Attendance,
  PickupLog,
  Partner,
  PartnershipRequest,
  Certificate
} from './seedData';

const useSupabase = !!(
  process.env.NEXT_PUBLIC_SUPABASE_URL && 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Initialize Supabase if variables are present
const supabase = useSupabase
  ? createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  : null;

// Local JSON file path
const DB_FILE_PATH = path.join(process.cwd(), 'src/data/db.json');

// Ensure local db directory and file exist with seed data
function getLocalData(): typeof INITIAL_DB {
  if (!fs.existsSync(path.dirname(DB_FILE_PATH))) {
    fs.mkdirSync(path.dirname(DB_FILE_PATH), { recursive: true });
  }
  if (!fs.existsSync(DB_FILE_PATH)) {
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(INITIAL_DB, null, 2), 'utf-8');
    return INITIAL_DB;
  }
  try {
    const raw = fs.readFileSync(DB_FILE_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (e) {
    // If corruption, rewrite and return seed data
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(INITIAL_DB, null, 2), 'utf-8');
    return INITIAL_DB;
  }
}

function saveLocalData(data: typeof INITIAL_DB) {
  if (!fs.existsSync(path.dirname(DB_FILE_PATH))) {
    fs.mkdirSync(path.dirname(DB_FILE_PATH), { recursive: true });
  }
  fs.writeFileSync(DB_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

// -------------------------------------------------------------
// Database Operations Interface
// -------------------------------------------------------------

export async function getSessions(): Promise<Session[]> {
  if (useSupabase && supabase) {
    const { data, error } = await supabase.from('sessions').select('*');
    if (error) throw error;
    return data || [];
  } else {
    return getLocalData().sessions;
  }
}

export async function getGroups(): Promise<Group[]> {
  if (useSupabase && supabase) {
    const { data, error } = await supabase.from('groups').select('*');
    if (error) throw error;
    return data || [];
  } else {
    return getLocalData().groups;
  }
}

export async function createGroup(group: Omit<Group, 'id'>): Promise<Group> {
  if (useSupabase && supabase) {
    const { data, error } = await supabase.from('groups').insert(group).select().single();
    if (error) throw error;
    return data;
  } else {
    const db = getLocalData();
    const newGroup: Group = {
      ...group,
      id: `group-${Date.now()}`
    };
    db.groups.push(newGroup);
    saveLocalData(db);
    return newGroup;
  }
}

export async function deleteGroup(id: string): Promise<void> {
  if (useSupabase && supabase) {
    const { error } = await supabase.from('groups').delete().eq('id', id);
    if (error) throw error;
  } else {
    const db = getLocalData();
    db.groups = db.groups.filter(g => g.id !== id);
    // Unassign participants in this group
    db.participants = db.participants.map(p => p.group_id === id ? { ...p, group_id: null } : p);
    saveLocalData(db);
  }
}

export async function getParticipants(): Promise<Participant[]> {
  if (useSupabase && supabase) {
    const { data, error } = await supabase.from('participants').select('*');
    if (error) throw error;
    return data || [];
  } else {
    return getLocalData().participants;
  }
}

export async function getParticipantById(id: string): Promise<{
  participant: Participant | null;
  parent: Parent | null;
  medical: MedicalInfo | null;
  pickups: AuthorizedPickup[];
}> {
  if (useSupabase && supabase) {
    const { data: participant } = await supabase.from('participants').select('*').eq('id', id).single();
    if (!participant) return { participant: null, parent: null, medical: null, pickups: [] };
    
    const { data: parent } = await supabase.from('parents').select('*').eq('participant_id', id).single();
    const { data: medical } = await supabase.from('medical_info').select('*').eq('participant_id', id).single();
    const { data: pickups } = await supabase.from('authorized_pickups').select('*').eq('participant_id', id);

    return {
      participant,
      parent: parent || null,
      medical: medical || null,
      pickups: pickups || []
    };
  } else {
    const db = getLocalData();
    const participant = db.participants.find(p => p.id === id) || null;
    if (!participant) return { participant: null, parent: null, medical: null, pickups: [] };

    const parent = db.parents.find(p => p.participant_id === id) || null;
    const medical = db.medical_info.find(m => m.participant_id === id) || null;
    const pickups = db.authorized_pickups.filter(p => p.participant_id === id);

    return { participant, parent, medical, pickups };
  }
}

export async function createParticipant(
  student: Omit<Participant, 'id' | 'created_at'>,
  parent: Omit<Parent, 'id' | 'participant_id'>,
  medical: Omit<MedicalInfo, 'id' | 'participant_id'>,
  pickups: Omit<AuthorizedPickup, 'id' | 'participant_id'>[]
): Promise<Participant> {
  if (useSupabase && supabase) {
    // Note: In real production, use transaction / RPC. 
    // Here we do sequential inserts for simplicity of design.
    const { data: newStudent, error: sErr } = await supabase
      .from('participants')
      .insert({ ...student, status: student.status || 'pending' })
      .select()
      .single();
    
    if (sErr) throw sErr;

    const pid = newStudent.id;
    await supabase.from('parents').insert({ ...parent, participant_id: pid });
    await supabase.from('medical_info').insert({ ...medical, participant_id: pid });
    if (pickups.length > 0) {
      await supabase.from('authorized_pickups').insert(
        pickups.map(p => ({ ...p, participant_id: pid }))
      );
    }

    return newStudent;
  } else {
    const db = getLocalData();
    const pid = `part-${Date.now()}`;
    const newStudent: Participant = {
      ...student,
      id: pid,
      status: student.status || 'pending',
      created_at: new Date().toISOString()
    };

    const newParent: Parent = {
      ...parent,
      id: `parent-${Date.now()}`,
      participant_id: pid
    };

    const newMedical: MedicalInfo = {
      ...medical,
      id: `med-${Date.now()}`,
      participant_id: pid
    };

    const newPickups = pickups.map((p, idx) => ({
      ...p,
      id: `pickup-${Date.now()}-${idx}`,
      participant_id: pid
    }));

    db.participants.push(newStudent);
    db.parents.push(newParent);
    db.medical_info.push(newMedical);
    db.authorized_pickups.push(...newPickups);

    saveLocalData(db);
    return newStudent;
  }
}

export async function updateParticipant(
  id: string,
  data: Partial<Participant>
): Promise<Participant> {
  if (useSupabase && supabase) {
    const { data: updated, error } = await supabase
      .from('participants')
      .update(data)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return updated;
  } else {
    const db = getLocalData();
    const idx = db.participants.findIndex(p => p.id === id);
    if (idx === -1) throw new Error('Participant not found');
    
    const updated = {
      ...db.participants[idx],
      ...data
    };
    db.participants[idx] = updated;
    saveLocalData(db);
    return updated;
  }
}

export async function updateParticipantDetails(
  id: string,
  studentData: Partial<Participant>,
  parentData: Partial<Parent>,
  medicalData: Partial<MedicalInfo>
): Promise<void> {
  if (useSupabase && supabase) {
    if (Object.keys(studentData).length > 0) {
      await supabase.from('participants').update(studentData).eq('id', id);
    }
    if (Object.keys(parentData).length > 0) {
      await supabase.from('parents').update(parentData).eq('participant_id', id);
    }
    if (Object.keys(medicalData).length > 0) {
      await supabase.from('medical_info').update(medicalData).eq('participant_id', id);
    }
  } else {
    const db = getLocalData();
    const pIdx = db.participants.findIndex(p => p.id === id);
    if (pIdx !== -1) {
      db.participants[pIdx] = { ...db.participants[pIdx], ...studentData };
    }
    const parIdx = db.parents.findIndex(p => p.participant_id === id);
    if (parIdx !== -1) {
      db.parents[parIdx] = { ...db.parents[parIdx], ...parentData };
    }
    const medIdx = db.medical_info.findIndex(m => m.participant_id === id);
    if (medIdx !== -1) {
      db.medical_info[medIdx] = { ...db.medical_info[medIdx], ...medicalData };
    }
    saveLocalData(db);
  }
}

export async function deleteParticipant(id: string): Promise<void> {
  if (useSupabase && supabase) {
    const { error } = await supabase.from('participants').delete().eq('id', id);
    if (error) throw error;
  } else {
    const db = getLocalData();
    db.participants = db.participants.filter(p => p.id !== id);
    db.parents = db.parents.filter(p => p.participant_id !== id);
    db.medical_info = db.medical_info.filter(m => m.participant_id !== id);
    db.authorized_pickups = db.authorized_pickups.filter(p => p.participant_id !== id);
    db.attendance = db.attendance.filter(a => a.participant_id !== id);
    db.pickup_log = db.pickup_log.filter(pl => pl.participant_id !== id);
    db.certificates = db.certificates.filter(c => c.participant_id !== id);
    saveLocalData(db);
  }
}

export async function getAttendance(): Promise<Attendance[]> {
  if (useSupabase && supabase) {
    const { data, error } = await supabase.from('attendance').select('*');
    if (error) throw error;
    return data || [];
  } else {
    return getLocalData().attendance;
  }
}

export async function saveAttendance(records: Omit<Attendance, 'id'>[]): Promise<void> {
  if (useSupabase && supabase) {
    // In real app, perform upsert on unique keys: participant_id, session_date, period
    for (const r of records) {
      await supabase.from('attendance').upsert(r, {
        onConflict: 'participant_id,session_date,period'
      });
    }
  } else {
    const db = getLocalData();
    for (const r of records) {
      const existingIdx = db.attendance.findIndex(
        a => a.participant_id === r.participant_id && 
             a.session_date === r.session_date && 
             a.period === r.period
      );
      if (existingIdx !== -1) {
        db.attendance[existingIdx] = { ...db.attendance[existingIdx], present: r.present, note: r.note };
      } else {
        db.attendance.push({
          ...r,
          id: `att-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`
        });
      }
    }
    saveLocalData(db);
  }
}

export async function getPickupLogs(): Promise<PickupLog[]> {
  if (useSupabase && supabase) {
    const { data, error } = await supabase.from('pickup_log').select('*');
    if (error) throw error;
    return data || [];
  } else {
    return getLocalData().pickup_log;
  }
}

export async function savePickupLog(log: Omit<PickupLog, 'id'>): Promise<PickupLog> {
  if (useSupabase && supabase) {
    const { data, error } = await supabase.from('pickup_log').insert(log).select().single();
    if (error) throw error;
    return data;
  } else {
    const db = getLocalData();
    const newLog: PickupLog = {
      ...log,
      id: `pl-${Date.now()}`
    };
    db.pickup_log.push(newLog);
    saveLocalData(db);
    return newLog;
  }
}

export async function updatePickupLog(id: string, log: Partial<PickupLog>): Promise<void> {
  if (useSupabase && supabase) {
    await supabase.from('pickup_log').update(log).eq('id', id);
  } else {
    const db = getLocalData();
    const idx = db.pickup_log.findIndex(pl => pl.id === id);
    if (idx !== -1) {
      db.pickup_log[idx] = { ...db.pickup_log[idx], ...log };
    }
    saveLocalData(db);
  }
}

export async function getPartners(): Promise<Partner[]> {
  if (useSupabase && supabase) {
    const { data, error } = await supabase.from('partners').select('*');
    if (error) throw error;
    return data || [];
  } else {
    return getLocalData().partners;
  }
}

export async function createPartner(partner: Omit<Partner, 'id'>): Promise<Partner> {
  if (useSupabase && supabase) {
    const { data, error } = await supabase.from('partners').insert(partner).select().single();
    if (error) throw error;
    return data;
  } else {
    const db = getLocalData();
    const newPartner: Partner = {
      ...partner,
      id: `partner-${Date.now()}`
    };
    db.partners.push(newPartner);
    saveLocalData(db);
    return newPartner;
  }
}

export async function updatePartner(id: string, partner: Partial<Partner>): Promise<void> {
  if (useSupabase && supabase) {
    await supabase.from('partners').update(partner).eq('id', id);
  } else {
    const db = getLocalData();
    const idx = db.partners.findIndex(p => p.id === id);
    if (idx !== -1) {
      db.partners[idx] = { ...db.partners[idx], ...partner };
    }
    saveLocalData(db);
  }
}

export async function getPartnershipRequests(): Promise<PartnershipRequest[]> {
  if (useSupabase && supabase) {
    const { data, error } = await supabase.from('partnership_requests').select('*');
    if (error) throw error;
    return data || [];
  } else {
    return getLocalData().partnership_requests;
  }
}

export async function createPartnershipRequest(request: Omit<PartnershipRequest, 'id' | 'created_at' | 'status'>): Promise<PartnershipRequest> {
  if (useSupabase && supabase) {
    const { data, error } = await supabase.from('partnership_requests').insert({
      ...request,
      status: 'new'
    }).select().single();
    if (error) throw error;
    return data;
  } else {
    const db = getLocalData();
    const newRequest: PartnershipRequest = {
      ...request,
      id: `req-${Date.now()}`,
      status: 'new',
      created_at: new Date().toISOString()
    };
    db.partnership_requests.push(newRequest);
    saveLocalData(db);
    return newRequest;
  }
}

export async function updatePartnershipRequestStatus(
  id: string,
  status: PartnershipRequest['status'],
  note?: string
): Promise<void> {
  if (useSupabase && supabase) {
    await supabase.from('partnership_requests').update({ status, internal_note: note }).eq('id', id);
  } else {
    const db = getLocalData();
    const idx = db.partnership_requests.findIndex(r => r.id === id);
    if (idx !== -1) {
      db.partnership_requests[idx] = {
        ...db.partnership_requests[idx],
        status,
        internal_note: note !== undefined ? note : db.partnership_requests[idx].internal_note
      };
    }
    saveLocalData(db);
  }
}

export async function getCertificates(): Promise<Certificate[]> {
  if (useSupabase && supabase) {
    const { data, error } = await supabase.from('certificates').select('*');
    if (error) throw error;
    return data || [];
  } else {
    return getLocalData().certificates;
  }
}

export async function saveCertificate(cert: Omit<Certificate, 'id'>): Promise<Certificate> {
  if (useSupabase && supabase) {
    const { data, error } = await supabase.from('certificates').insert(cert).select().single();
    if (error) throw error;
    return data;
  } else {
    const db = getLocalData();
    const newCert: Certificate = {
      ...cert,
      id: `cert-${Date.now()}`
    };
    db.certificates.push(newCert);
    saveLocalData(db);
    return newCert;
  }
}
