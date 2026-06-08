'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  fetchParticipantById,
  fetchGroups,
  assignParticipantGroup,
  updateParticipantStatus,
  editParticipantDetails,
  removeParticipant,
  fetchAttendance,
  saveGeneratedCertificate,
  fetchCertificates
} from '../../../actions/dbActions';
import { Participant, Parent, MedicalInfo, AuthorizedPickup, Group, Attendance, Certificate } from '../../../../lib/db/seedData';
import {
  ArrowLeft,
  User,
  Shield,
  Heart,
  Calendar,
  Save,
  X,
  Award,
  Trash2,
  Mail,
  Edit2,
  CheckCircle,
  FileText
} from 'lucide-react';

interface PageProps {
  params: {
    id: string;
  };
}

export default function ParticipantDetails({ params }: PageProps) {
  const router = useRouter();
  const studentId = params.id;

  // Database records state
  const [student, setStudent] = useState<Participant | null>(null);
  const [parent, setParent] = useState<Parent | null>(null);
  const [medical, setMedical] = useState<MedicalInfo | null>(null);
  const [pickups, setPickups] = useState<AuthorizedPickup[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [attendanceLogs, setAttendanceLogs] = useState<Attendance[]>([]);
  const [certs, setCerts] = useState<Certificate[]>([]);
  
  const [loading, setLoading] = useState(true);

  // Editing state
  const [editMode, setEditMode] = useState<'view' | 'edit'>('view');
  
  // Form editing values
  const [formStudent, setFormStudent] = useState<Partial<Participant>>({});
  const [formParent, setFormParent] = useState<Partial<Parent>>({});
  const [formMedical, setFormMedical] = useState<Partial<MedicalInfo>>({});
  
  // Right sidebar controls
  const [selectedGroupId, setSelectedGroupId] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');

  useEffect(() => {
    async function loadData() {
      try {
        const [pDetails, gList, allAtt, allCerts] = await Promise.all([
          fetchParticipantById(studentId),
          fetchGroups(),
          fetchAttendance(),
          fetchCertificates()
        ]);

        if (pDetails.participant) {
          setStudent(pDetails.participant);
          setParent(pDetails.parent);
          setMedical(pDetails.medical);
          setPickups(pDetails.pickups);
          setGroups(gList);
          
          // Filter logs for this participant
          setAttendanceLogs(allAtt.filter(a => a.participant_id === studentId));
          setCerts(allCerts.filter(c => c.participant_id === studentId));

          // Init form inputs
          setFormStudent(pDetails.participant);
          setFormParent(pDetails.parent || {});
          setFormMedical(pDetails.medical || {});
          
          setSelectedGroupId(pDetails.participant.group_id || 'none');
          setSelectedStatus(pDetails.participant.status);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [studentId]);

  if (loading) {
    return <div className="text-center py-20 text-slate-500 font-body">Loading student record...</div>;
  }

  if (!student) {
    return (
      <div className="text-center py-20 text-slate-500 font-body">
        <p>Participant not found.</p>
        <Link href="/admin/participants" className="text-stem-blue-mid underline mt-4 inline-block">
          Back to List
        </Link>
      </div>
    );
  }

  const handleSaveDetails = async () => {
    try {
      await editParticipantDetails(studentId, formStudent, formParent, formMedical);
      setStudent(prev => prev ? { ...prev, ...formStudent } : null);
      setParent(prev => prev ? { ...prev, ...formParent } : null);
      setMedical(prev => prev ? { ...prev, ...formMedical } : null);
      setEditMode('view');
    } catch (e) {
      console.error(e);
      alert("Error saving changes.");
    }
  };

  const handleGroupChange = async (val: string) => {
    const targetGroupId = val === 'none' ? null : val;
    try {
      await assignParticipantGroup(studentId, targetGroupId);
      setSelectedGroupId(val);
      setStudent(prev => prev ? { ...prev, group_id: targetGroupId } : null);
    } catch (e) {
      console.error(e);
    }
  };

  const handleStatusChange = async (val: any) => {
    try {
      await updateParticipantStatus(studentId, val);
      setSelectedStatus(val);
      setStudent(prev => prev ? { ...prev, status: val } : null);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async () => {
    if (confirm("Permanently delete this participant and all their history? This action cannot be undone.")) {
      try {
        await removeParticipant(studentId);
        router.push('/admin/participants');
      } catch (e) {
        console.error(e);
      }
    }
  };

  // Eligibility: attendance >= 80% (needs total active days calculation, here mock checked via logs)
  const totalDays = attendanceLogs.length;
  const presentDays = attendanceLogs.filter(a => a.present).length;
  const attendancePercentage = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;
  const isEligible = attendancePercentage >= 80;

  const handleGenerateCertificate = async () => {
    try {
      const certPath = `/assets/certificates/cert_${studentId}.pdf`;
      const res = await saveGeneratedCertificate({
        participant_id: studentId,
        session_id: student.session_id,
        generated_at: new Date().toISOString(),
        file_path: certPath
      });
      setCerts(prev => [...prev, res]);
      alert("Certificate generated successfully!");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6 text-left">
      {/* Top Navigation Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/participants"
            className="p-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-slate-900">
              {student.first_name} {student.last_name}
            </h1>
            <span className="font-mono text-xs text-slate-400 mt-1 block">ID: {student.id}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {editMode === 'view' ? (
            <button
              onClick={() => setEditMode('edit')}
              className="bg-white border border-slate-300 text-slate-700 font-body font-semibold text-xs px-4 py-2.5 rounded-lg flex items-center gap-1.5 hover:bg-slate-50 transition-all cursor-pointer shadow-sm"
            >
              <Edit2 className="w-4 h-4" />
              Edit Record
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSaveDetails}
                className="bg-stem-green hover:bg-opacity-95 text-white font-body font-bold text-xs px-4 py-2.5 rounded-lg flex items-center gap-1.5 hover:scale-[1.01] transition-all cursor-pointer shadow"
              >
                <Save className="w-4 h-4" />
                Save
              </button>
              <button
                onClick={() => {
                  setEditMode('view');
                  setFormStudent(student);
                  setFormParent(parent || {});
                  setFormMedical(medical || {});
                }}
                className="bg-white border border-slate-300 text-slate-700 font-body font-semibold text-xs px-4 py-2.5 rounded-lg flex items-center gap-1.5 hover:bg-slate-50 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>
          )}
          <button
            onClick={handleDelete}
            className="bg-red-50 hover:bg-red-100 text-red-600 font-body font-bold text-xs px-4 py-2.5 rounded-lg flex items-center gap-1.5 border border-red-200 transition-all cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>

      {/* Core Split Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (2/3): Profiles Information */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Card 1: Student Information */}
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-4">
            <h3 className="font-display font-bold text-lg text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <User className="w-5 h-5 text-stem-green" />
              Student Information
            </h3>
            
            {editMode === 'view' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-body text-sm text-slate-600">
                <div><strong>First Name:</strong> {student.first_name}</div>
                <div><strong>Last Name:</strong> {student.last_name}</div>
                <div><strong>Date of Birth:</strong> {student.date_of_birth}</div>
                <div><strong>Level:</strong> {student.school_level === 'middle' ? 'Middle School' : 'High School'}</div>
                <div className="sm:col-span-2"><strong>School:</strong> {student.school_name}</div>
              </div>
            ) : (
              <div className="space-y-4 font-body text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">First Name</label>
                    <input
                      type="text"
                      value={formStudent.first_name || ''}
                      onChange={(e) => setFormStudent({ ...formStudent, first_name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-stem-blue-mid"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Last Name</label>
                    <input
                      type="text"
                      value={formStudent.last_name || ''}
                      onChange={(e) => setFormStudent({ ...formStudent, last_name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-stem-blue-mid"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Date of Birth</label>
                    <input
                      type="date"
                      value={formStudent.date_of_birth || ''}
                      onChange={(e) => setFormStudent({ ...formStudent, date_of_birth: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">School Name</label>
                    <input
                      type="text"
                      value={formStudent.school_name || ''}
                      onChange={(e) => setFormStudent({ ...formStudent, school_name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-stem-blue-mid"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Card 2: Parent / Emergency details */}
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-4">
            <h3 className="font-display font-bold text-lg text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <Shield className="w-5 h-5 text-stem-blue-mid" />
              Parent & Guardian Contacts
            </h3>
            
            {editMode === 'view' ? (
              parent ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-body text-sm text-slate-600">
                  <div><strong>Parent Name:</strong> {parent.full_name}</div>
                  <div><strong>Email:</strong> {parent.email}</div>
                  <div><strong>Phone:</strong> {parent.phone}</div>
                  <div><strong>Alt Phone:</strong> {parent.phone_alt || 'Not provided'}</div>
                  <div className="sm:col-span-2 border-t border-slate-100 pt-4 mt-2">
                    <span className="font-display font-semibold text-xs text-slate-400 block uppercase tracking-wider mb-2">Emergency Contact</span>
                    <strong>Name:</strong> {parent.emergency_name} ({parent.emergency_relation}) · <strong>Phone:</strong> {parent.emergency_phone}
                  </div>
                </div>
              ) : (
                <p className="text-sm text-slate-400 italic">No parent information on record.</p>
              )
            ) : (
              <div className="space-y-4 font-body text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Parent Name</label>
                    <input
                      type="text"
                      value={formParent.full_name || ''}
                      onChange={(e) => setFormParent({ ...formParent, full_name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Email</label>
                    <input
                      type="email"
                      value={formParent.email || ''}
                      onChange={(e) => setFormParent({ ...formParent, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Phone</label>
                    <input
                      type="text"
                      value={formParent.phone || ''}
                      onChange={(e) => setFormParent({ ...formParent, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Alt Phone</label>
                    <input
                      type="text"
                      value={formParent.phone_alt || ''}
                      onChange={(e) => setFormParent({ ...formParent, phone_alt: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Card 3: Medical details */}
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-4">
            <h3 className="font-display font-bold text-lg text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" />
              Medical Record (Safety Alert)
            </h3>
            
            {editMode === 'view' ? (
              medical ? (
                <div className="space-y-3 font-body text-sm text-slate-600">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col p-3 rounded-lg border border-slate-100 bg-slate-50">
                      <span className="font-semibold text-xs text-slate-400 block mb-1">Allergies</span>
                      <span>{medical.has_allergies ? medical.allergies_detail : 'None'}</span>
                    </div>
                    <div className="flex flex-col p-3 rounded-lg border border-slate-100 bg-slate-50">
                      <span className="font-semibold text-xs text-slate-400 block mb-1">Dietary Restrictions</span>
                      <span>{medical.has_dietary ? medical.dietary_detail : 'None'}</span>
                    </div>
                    <div className="flex flex-col p-3 rounded-lg border border-slate-100 bg-slate-50">
                      <span className="font-semibold text-xs text-slate-400 block mb-1">Medications</span>
                      <span>{medical.has_medication ? medical.medication_detail : 'None'}</span>
                    </div>
                    <div className="flex flex-col p-3 rounded-lg border border-slate-100 bg-slate-50">
                      <span className="font-semibold text-xs text-slate-400 block mb-1">Medical Conditions</span>
                      <span>{medical.has_conditions ? medical.conditions_detail : 'None'}</span>
                    </div>
                  </div>
                  {(medical.doctor_name || medical.doctor_phone) && (
                    <div className="border-t border-slate-100 pt-3 mt-3 text-xs">
                      <strong>Primary Physician:</strong> {medical.doctor_name || 'Not listed'} · <strong>Phone:</strong> {medical.doctor_phone || 'Not listed'}
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-sm text-slate-400 italic">No medical information on record.</p>
              )
            ) : (
              <div className="space-y-4 font-body text-sm">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Allergies (details or leave blank)</label>
                  <input
                    type="text"
                    value={formMedical.allergies_detail || ''}
                    onChange={(e) => setFormMedical({ ...formMedical, has_allergies: !!e.target.value, allergies_detail: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none"
                    placeholder="Enter allergy details..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Dietary Restrictions (details or leave blank)</label>
                  <input
                    type="text"
                    value={formMedical.dietary_detail || ''}
                    onChange={(e) => setFormMedical({ ...formMedical, has_dietary: !!e.target.value, dietary_detail: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none"
                    placeholder="Enter dietary restrictions..."
                  />
                </div>
              </div>
            )}
          </div>

          {/* Card 4: Whitelist Pickups List */}
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-4">
            <h3 className="font-display font-bold text-lg text-slate-900 border-b border-slate-100 pb-2">
              Authorized Pickup Whitelist
            </h3>
            {pickups.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {pickups.map((p) => (
                  <div key={p.id} className="p-3 bg-slate-50 border border-slate-150 rounded-xl font-body text-sm flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                    <div className="flex flex-col text-left">
                      <span className="font-bold text-slate-800">{p.full_name}</span>
                      <span className="text-xs text-slate-500">{p.relationship} · {p.phone}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-400 italic">No authorized pickups on record.</p>
            )}
          </div>

          {/* Card 5: Attendance logs history */}
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-4">
            <h3 className="font-display font-bold text-lg text-slate-900 border-b border-slate-100 pb-2 flex items-center justify-between">
              <span>Attendance History (Rate: {attendancePercentage}%)</span>
              <span className="font-mono text-xs text-slate-400">Total: {presentDays}/{totalDays} sessions</span>
            </h3>
            
            {attendanceLogs.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-left font-mono text-[10px] text-slate-400 uppercase tracking-widest">
                      <th className="py-2 px-4">Date</th>
                      <th className="py-2 px-4">Period</th>
                      <th className="py-2 px-4">Status</th>
                      <th className="py-2 px-4">Note / Justification</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceLogs.map((log) => (
                      <tr key={log.id} className="border-b border-slate-100 text-sm font-body text-slate-600">
                        <td className="py-2 px-4">{log.session_date}</td>
                        <td className="py-2 px-4">{log.period}</td>
                        <td className="py-2 px-4">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${
                            log.present ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'
                          }`}>
                            {log.present ? 'Present' : 'Absent'}
                          </span>
                        </td>
                        <td className="py-2 px-4 text-xs italic">{log.note || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-sm text-slate-400 italic">No attendance records yet.</p>
            )}
          </div>

        </div>

        {/* Right Column (1/3): Assignment controls */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Card 1: Registration status control */}
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-4">
            <h3 className="font-display font-semibold text-sm text-slate-400 uppercase tracking-wider">Record Status</h3>
            <div className="flex flex-col gap-2">
              <select
                value={selectedStatus}
                onChange={(e) => handleStatusChange(e.target.value)}
                className={`w-full font-body text-sm font-bold border rounded-lg px-4 py-2.5 focus:outline-none bg-white ${
                  selectedStatus === 'confirmed' ? 'border-green-300 text-green-700' :
                  selectedStatus === 'waitlist' ? 'border-purple-300 text-purple-700' :
                  selectedStatus === 'cancelled' ? 'border-red-300 text-red-700' :
                  'border-amber-300 text-amber-700'
                }`}
              >
                <option value="pending">Under Review</option>
                <option value="review">In Review</option>
                <option value="confirmed">Confirmed</option>
                <option value="waitlist">Waitlisted</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <p className="font-body text-[11px] text-slate-400 leading-normal">
                Changing the status updates the student record in the database and determines group integration eligibility.
              </p>
            </div>
          </div>

          {/* Card 2: Group assignment */}
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-4">
            <h3 className="font-display font-semibold text-sm text-slate-400 uppercase tracking-wider">Assigned Group</h3>
            <div className="flex flex-col gap-2">
              <select
                value={selectedGroupId}
                onChange={(e) => handleGroupChange(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 font-body text-sm text-slate-800 focus:outline-none focus:border-stem-blue-mid"
              >
                <option value="none">Unassigned</option>
                {groups
                  .filter(g => g.session_id === student.session_id)
                  .map(g => (
                    <option key={g.id} value={g.id}>{g.name}</option>
                  ))
                }
              </select>
              <p className="font-body text-[11px] text-slate-400 leading-normal">
                Groups are filtered to match the student's session (MS or HS).
              </p>
            </div>
          </div>

          {/* Card 3: Graduation Certificate triggers */}
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-4">
            <h3 className="font-display font-semibold text-sm text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4 text-stem-green" />
              Participation Certificate
            </h3>
            
            {certs.length > 0 ? (
              <div className="space-y-3">
                <div className="p-3 bg-green-50 border border-green-200 text-green-800 rounded-lg flex items-start gap-2.5 text-xs font-body">
                  <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Certificate generated!</span>
                    <span className="block mt-0.5 text-slate-500">Date: {new Date(certs[0].generated_at).toLocaleDateString('en-US')}</span>
                  </div>
                </div>
                <a
                  href={`/api/pdf/certificate/${studentId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-body font-bold py-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-xs shadow-sm"
                >
                  <FileText className="w-4 h-4" />
                  Download Certificate
                </a>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="p-3 bg-slate-50 border border-slate-200 text-slate-600 rounded-lg flex items-start gap-2 text-xs font-body leading-normal">
                  {isEligible ? (
                    <span className="text-green-700 font-semibold">
                      🎉 Student meets eligibility criteria (≥ 80% attendance).
                    </span>
                  ) : (
                    <span className="text-red-700 font-semibold">
                      ⚠️ Insufficient attendance for certificate ({attendancePercentage}% / 80%).
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  disabled={!isEligible}
                  onClick={handleGenerateCertificate}
                  className="w-full bg-stem-green hover:bg-opacity-95 text-white font-body font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 hover:scale-[1.01] transition-all cursor-pointer text-xs shadow disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Award className="w-4 h-4" />
                  Generate Certificate
                </button>
              </div>
            )}
          </div>

          {/* Quick email / alert drawer */}
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-4">
            <h3 className="font-display font-semibold text-sm text-slate-400 uppercase tracking-wider">Contact Alert</h3>
            <button
              onClick={() => alert(`Simulated SMS sent to parent ${parent?.full_name} (${parent?.phone})`)}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-body font-bold py-2 rounded-lg flex items-center justify-center gap-1.5 transition-colors text-xs cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              Send Alert SMS
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
