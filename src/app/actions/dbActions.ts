'use server';

import { revalidatePath } from 'next/cache';
import * as db from '../..//lib/db/dbAdapter';
import {
  Participant,
  Parent,
  MedicalInfo,
  AuthorizedPickup,
  Attendance,
  PickupLog,
  Partner,
  PartnershipRequest,
  Certificate
} from '../../lib/db/seedData';

export async function fetchSessions() {
  return await db.getSessions();
}

export async function fetchGroups() {
  return await db.getGroups();
}

export async function createNewGroup(name: string, sessionId: string, color: string, capacity: number) {
  const newGroup = await db.createGroup({
    session_id: sessionId,
    name,
    color,
    capacity
  });
  revalidatePath('/admin/groups');
  return newGroup;
}

export async function removeGroup(id: string) {
  await db.deleteGroup(id);
  revalidatePath('/admin/groups');
  revalidatePath('/admin/participants');
}

export async function fetchParticipants() {
  return await db.getParticipants();
}

export async function fetchParticipantById(id: string) {
  return await db.getParticipantById(id);
}

export async function registerParticipant(
  student: Omit<Participant, 'id' | 'created_at' | 'group_id'>,
  parent: Omit<Parent, 'id' | 'participant_id'>,
  medical: Omit<MedicalInfo, 'id' | 'participant_id'>,
  pickups: Omit<AuthorizedPickup, 'id' | 'participant_id'>[]
) {
  try {
    const newStudent = await db.createParticipant(
      { ...student, group_id: null },
      parent,
      medical,
      pickups
    );
    revalidatePath('/admin/participants');
    revalidatePath('/admin/registrations');
    revalidatePath('/admin');
    return { success: true, participant: newStudent };
  } catch (error: any) {
    console.error('Registration error:', error);
    return { success: false, error: error.message || 'An error occurred during registration.' };
  }
}

export async function updateParticipantStatus(
  id: string,
  status: Participant['status']
) {
  const updated = await db.updateParticipant(id, { status });
  revalidatePath(`/admin/participants/${id}`);
  revalidatePath('/admin/participants');
  revalidatePath('/admin/registrations');
  return updated;
}

export async function assignParticipantGroup(
  id: string,
  groupId: string | null
) {
  const updated = await db.updateParticipant(id, { group_id: groupId });
  revalidatePath(`/admin/participants/${id}`);
  revalidatePath('/admin/groups');
  revalidatePath('/admin/participants');
  return updated;
}

export async function editParticipantDetails(
  id: string,
  studentData: Partial<Participant>,
  parentData: Partial<Parent>,
  medicalData: Partial<MedicalInfo>
) {
  await db.updateParticipantDetails(id, studentData, parentData, medicalData);
  revalidatePath(`/admin/participants/${id}`);
  revalidatePath('/admin/participants');
}

export async function removeParticipant(id: string) {
  await db.deleteParticipant(id);
  revalidatePath('/admin/participants');
  revalidatePath('/admin/registrations');
  revalidatePath('/admin');
}

export async function fetchAttendance() {
  return await db.getAttendance();
}

export async function saveDailyAttendance(records: Omit<Attendance, 'id'>[]) {
  await db.saveAttendance(records);
  revalidatePath('/admin/attendance');
  revalidatePath('/admin');
}

export async function fetchPickupLogs() {
  return await db.getPickupLogs();
}

export async function checkInParticipant(participantId: string, time: string, date: string) {
  // Check if log already exists for this date
  const logs = await db.getPickupLogs();
  const existingLog = logs.find(l => l.participant_id === participantId && l.log_date === date);

  if (existingLog) {
    await db.updatePickupLog(existingLog.id, { arrival_time: time });
  } else {
    await db.savePickupLog({
      participant_id: participantId,
      log_date: date,
      arrival_time: time,
      authorized: true
    });
  }
  revalidatePath('/admin/pickup');
}

export async function checkOutParticipant(
  participantId: string, 
  time: string, 
  person: string, 
  authorized: boolean, 
  note: string,
  date: string
) {
  const logs = await db.getPickupLogs();
  const existingLog = logs.find(l => l.participant_id === participantId && l.log_date === date);

  if (existingLog) {
    await db.updatePickupLog(existingLog.id, {
      departure_time: time,
      pickup_person: person,
      authorized,
      note
    });
  } else {
    await db.savePickupLog({
      participant_id: participantId,
      log_date: date,
      departure_time: time,
      pickup_person: person,
      authorized,
      note
    });
  }
  revalidatePath('/admin/pickup');
}

export async function fetchPartners() {
  return await db.getPartners();
}

export async function addSponsor(partner: Omit<Partner, 'id'>) {
  const newPartner = await db.createPartner(partner);
  revalidatePath('/admin/partners');
  revalidatePath('/partners');
  revalidatePath('/');
  return newPartner;
}

export async function toggleSponsorActive(id: string, active: boolean) {
  await db.updatePartner(id, { active });
  revalidatePath('/admin/partners');
  revalidatePath('/');
}

export async function editSponsorDetails(id: string, partner: Partial<Partner>) {
  await db.updatePartner(id, partner);
  revalidatePath('/admin/partners');
  revalidatePath('/');
}

export async function submitPartnershipForm(request: Omit<PartnershipRequest, 'id' | 'created_at' | 'status'>) {
  try {
    const newRequest = await db.createPartnershipRequest(request);
    revalidatePath('/admin/partners');
    return { success: true, request: newRequest };
  } catch (error: any) {
    console.error('Partnership submit error:', error);
    return { success: false, error: error.message || 'An error occurred submitting the form.' };
  }
}

export async function fetchPartnershipRequests() {
  return await db.getPartnershipRequests();
}

export async function updateRequestStatusAction(id: string, status: PartnershipRequest['status'], note?: string) {
  await db.updatePartnershipRequestStatus(id, status, note);
  revalidatePath('/admin/partners');
}

export async function fetchCertificates() {
  return await db.getCertificates();
}

export async function saveGeneratedCertificate(cert: Omit<Certificate, 'id'>) {
  const saved = await db.saveCertificate(cert);
  revalidatePath('/admin/certificates');
  revalidatePath(`/admin/participants/${cert.participant_id}`);
  return saved;
}
