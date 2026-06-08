export interface Session {
  id: string;
  year: number;
  type: 'middle' | 'high';
  start_date: string;
  end_date: string;
  capacity: number;
  active: boolean;
}

export interface Group {
  id: string;
  session_id: string;
  name: string;
  color: string;
  capacity: number;
}

export interface Participant {
  id: string;
  session_id: string;
  group_id: string | null;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  school_level: 'middle' | 'high';
  school_name: string;
  status: 'pending' | 'review' | 'confirmed' | 'waitlist' | 'cancelled';
  created_at: string;
}

export interface Parent {
  id: string;
  participant_id: string;
  full_name: string;
  phone: string;
  phone_alt?: string;
  email: string;
  emergency_name: string;
  emergency_relation: string;
  emergency_phone: string;
}

export interface AuthorizedPickup {
  id: string;
  participant_id: string;
  full_name: string;
  relationship: string;
  phone: string;
}

export interface MedicalInfo {
  id: string;
  participant_id: string;
  has_allergies: boolean;
  allergies_detail?: string;
  has_dietary: boolean;
  dietary_detail?: string;
  has_medication: boolean;
  medication_detail?: string;
  has_conditions: boolean;
  conditions_detail?: string;
  doctor_name?: string;
  doctor_phone?: string;
}

export interface Attendance {
  id: string;
  participant_id: string;
  session_date: string;
  period: 'AM' | 'PM' | 'FULL';
  present: boolean;
  note?: string;
}

export interface PickupLog {
  id: string;
  participant_id: string;
  log_date: string;
  arrival_time?: string;
  departure_time?: string;
  pickup_person?: string;
  authorized: boolean;
  note?: string;
}

export interface PartnershipRequest {
  id: string;
  request_type: 'corporate' | 'grant' | 'individual' | 'community' | 'other';
  org_name: string;
  contact_name: string;
  email: string;
  phone?: string;
  tier_interest: string;
  message: string;
  wants_dossier: boolean;
  status: 'new' | 'discussion' | 'confirmed' | 'declined';
  internal_note?: string;
  created_at: string;
}

export interface Partner {
  id: string;
  name: string;
  logo_path: string;
  tier: 'friend' | 'bronze' | 'silver' | 'gold' | 'platinum';
  start_date: string;
  end_date: string;
  contact_name: string;
  contact_email: string;
  active: boolean;
}

export interface Certificate {
  id: string;
  participant_id: string;
  session_id: string;
  generated_at: string;
  sent_at?: string;
  file_path: string;
}

export const INITIAL_SESSIONS: Session[] = [
  {
    id: "session-ms-2026",
    year: 2026,
    type: "middle",
    start_date: "2026-06-15",
    end_date: "2026-06-19",
    capacity: 30,
    active: true
  },
  {
    id: "session-hs-2026",
    year: 2026,
    type: "high",
    start_date: "2026-06-22",
    end_date: "2026-06-26",
    capacity: 30,
    active: true
  }
];

export const INITIAL_GROUPS: Group[] = [
  { id: "group-1", session_id: "session-ms-2026", name: "Bio-Bots", color: "#4ADE80", capacity: 10 },
  { id: "group-2", session_id: "session-ms-2026", name: "Chem-Explorers", color: "#FB923C", capacity: 10 },
  { id: "group-3", session_id: "session-hs-2026", name: "VR-Architects", color: "#F472B6", capacity: 15 },
  { id: "group-4", session_id: "session-hs-2026", name: "Quantum-Coders", color: "#60A5FA", capacity: 15 }
];

export const INITIAL_PARTICIPANTS: Participant[] = [
  {
    id: "part-1",
    session_id: "session-ms-2026",
    group_id: "group-1",
    first_name: "Marcus",
    last_name: "Tatum",
    date_of_birth: "2013-04-12",
    school_level: "middle",
    school_name: "Salisbury Middle School",
    status: "confirmed",
    created_at: "2026-05-10T10:00:00Z"
  },
  {
    id: "part-2",
    session_id: "session-ms-2026",
    group_id: "group-1",
    first_name: "Aaliyah",
    last_name: "Monroe",
    date_of_birth: "2012-08-23",
    school_level: "middle",
    school_name: "Knox Middle School",
    status: "confirmed",
    created_at: "2026-05-11T14:30:00Z"
  },
  {
    id: "part-3",
    session_id: "session-ms-2026",
    group_id: "group-2",
    first_name: "Jordan",
    last_name: "Smith",
    date_of_birth: "2013-11-05",
    school_level: "middle",
    school_name: "Salisbury Middle School",
    status: "confirmed",
    created_at: "2026-05-12T09:15:00Z"
  },
  {
    id: "part-4",
    session_id: "session-hs-2026",
    group_id: "group-3",
    first_name: "Chloe",
    last_name: "Davis",
    date_of_birth: "2010-02-17",
    school_level: "high",
    school_name: "Salisbury High School",
    status: "confirmed",
    created_at: "2026-05-13T16:40:00Z"
  },
  {
    id: "part-5",
    session_id: "session-hs-2026",
    group_id: "group-4",
    first_name: "Elijah",
    last_name: "Wilson",
    date_of_birth: "2009-07-29",
    school_level: "high",
    school_name: "North Rowan High School",
    status: "confirmed",
    created_at: "2026-05-14T11:20:00Z"
  },
  {
    id: "part-6",
    session_id: "session-ms-2026",
    group_id: null,
    first_name: "Mia",
    last_name: "Johnson",
    date_of_birth: "2014-01-15",
    school_level: "middle",
    school_name: "Sacred Heart School",
    status: "pending",
    created_at: "2026-05-20T08:00:00Z"
  },
  {
    id: "part-7",
    session_id: "session-hs-2026",
    group_id: null,
    first_name: "Lucas",
    last_name: "Brown",
    date_of_birth: "2010-09-02",
    school_level: "high",
    school_name: "Jesse C. Carson High",
    status: "waitlist",
    created_at: "2026-05-22T15:10:00Z"
  }
];

export const INITIAL_PARENTS: Parent[] = [
  {
    id: "parent-1",
    participant_id: "part-1",
    full_name: "Tyrone Tatum",
    phone: "704-555-0192",
    email: "tyrone.tatum@example.com",
    emergency_name: "Latoya Tatum",
    emergency_relation: "Mother",
    emergency_phone: "704-555-0193"
  },
  {
    id: "parent-2",
    participant_id: "part-2",
    full_name: "Denise Monroe",
    phone: "704-555-0144",
    email: "denise.m@example.com",
    emergency_name: "Gerald Monroe",
    emergency_relation: "Father",
    emergency_phone: "704-555-0145"
  },
  {
    id: "parent-3",
    participant_id: "part-3",
    full_name: "Sarah Smith",
    phone: "704-555-0122",
    email: "sarah.smith@example.com",
    emergency_name: "Thomas Smith",
    emergency_relation: "Father",
    emergency_phone: "704-555-0123"
  },
  {
    id: "parent-4",
    participant_id: "part-4",
    full_name: "Angela Davis",
    phone: "704-555-0188",
    email: "angela.davis@example.com",
    emergency_name: "Robert Davis",
    emergency_relation: "Father",
    emergency_phone: "704-555-0189"
  },
  {
    id: "parent-5",
    participant_id: "part-5",
    full_name: "David Wilson",
    phone: "704-555-0111",
    email: "d.wilson@example.com",
    emergency_name: "Mary Wilson",
    emergency_relation: "Mother",
    emergency_phone: "704-555-0112"
  },
  {
    id: "parent-6",
    participant_id: "part-6",
    full_name: "Jessica Johnson",
    phone: "704-555-0233",
    email: "jess.johnson@example.com",
    emergency_name: "Grandmother Marie",
    emergency_relation: "Grandmother",
    emergency_phone: "704-555-0234"
  },
  {
    id: "parent-7",
    participant_id: "part-7",
    full_name: "Richard Brown",
    phone: "704-555-0277",
    email: "richard.b@example.com",
    emergency_name: "Susan Brown",
    emergency_relation: "Mother",
    emergency_phone: "704-555-0278"
  }
];

export const INITIAL_MEDICAL: MedicalInfo[] = [
  {
    id: "med-1",
    participant_id: "part-1",
    has_allergies: false,
    has_dietary: false,
    has_medication: false,
    has_conditions: false,
    doctor_name: "Dr. Rowan Pediatrics",
    doctor_phone: "704-555-0100"
  },
  {
    id: "med-2",
    participant_id: "part-2",
    has_allergies: true,
    allergies_detail: "Peanut allergy. Carries EpiPen.",
    has_dietary: true,
    dietary_detail: "Vegetarian",
    has_medication: false,
    has_conditions: false,
    doctor_name: "Dr. Evans",
    doctor_phone: "704-555-0150"
  },
  {
    id: "med-3",
    participant_id: "part-3",
    has_allergies: false,
    has_dietary: false,
    has_medication: true,
    medication_detail: "Inhaler for exercise-induced asthma.",
    has_conditions: true,
    conditions_detail: "Asthma",
    doctor_name: "Dr. Carter",
    doctor_phone: "704-555-0102"
  },
  {
    id: "med-4",
    participant_id: "part-4",
    has_allergies: true,
    allergies_detail: "Penicillin",
    has_dietary: false,
    has_medication: false,
    has_conditions: false
  },
  {
    id: "med-5",
    participant_id: "part-5",
    has_allergies: false,
    has_dietary: false,
    has_medication: false,
    has_conditions: false
  },
  {
    id: "med-6",
    participant_id: "part-6",
    has_allergies: true,
    allergies_detail: "Bee stings.",
    has_dietary: false,
    has_medication: false,
    has_conditions: false
  },
  {
    id: "med-7",
    participant_id: "part-7",
    has_allergies: false,
    has_dietary: false,
    has_medication: false,
    has_conditions: false
  }
];

export const INITIAL_PICKUPS: AuthorizedPickup[] = [
  { id: "pickup-1", participant_id: "part-1", full_name: "Latoya Tatum", relationship: "Mother", phone: "704-555-0193" },
  { id: "pickup-2", participant_id: "part-1", full_name: "Grandpa Tatum", relationship: "Grandfather", phone: "704-555-0199" },
  { id: "pickup-3", participant_id: "part-2", full_name: "Gerald Monroe", relationship: "Father", phone: "704-555-0145" },
  { id: "pickup-4", participant_id: "part-3", full_name: "Sarah Smith", relationship: "Mother", phone: "704-555-0122" },
  { id: "pickup-5", participant_id: "part-4", full_name: "Angela Davis", relationship: "Mother", phone: "704-555-0188" },
  { id: "pickup-6", participant_id: "part-5", full_name: "David Wilson", relationship: "Father", phone: "704-555-0111" }
];

export const INITIAL_PARTNERS: Partner[] = [
  {
    id: "partner-1",
    name: "Rowan County Chamber",
    logo_path: "/assets/images/livingstone.jpg",
    tier: "platinum",
    start_date: "2026-01-01",
    end_date: "2026-12-31",
    contact_name: "Elaine Baker",
    contact_email: "e.baker@rowanchamber.org",
    active: true
  },
  {
    id: "partner-2",
    name: "Duke Energy",
    logo_path: "/assets/images/livingstone college.jpg",
    tier: "gold",
    start_date: "2026-02-15",
    end_date: "2026-12-31",
    contact_name: "Ken Miller",
    contact_email: "ken.miller@duke-energy.com",
    active: true
  },
  {
    id: "partner-3",
    name: "Novant Health",
    logo_path: "/assets/images/livingstone.jpg",
    tier: "silver",
    start_date: "2026-03-01",
    end_date: "2026-12-31",
    contact_name: "Dr. Sarah Jenkins",
    contact_email: "sjenkins@novanthealth.org",
    active: true
  },
  {
    id: "partner-4",
    name: "Food Lion",
    logo_path: "/assets/images/livingstone college.jpg",
    tier: "bronze",
    start_date: "2026-04-10",
    end_date: "2026-12-31",
    contact_name: "Greg Anderson",
    contact_email: "ganderson@foodlion.com",
    active: true
  }
];

export const INITIAL_ATTENDANCE: Attendance[] = [
  { id: "att-1", participant_id: "part-1", session_date: "2026-06-15", period: "AM", present: true },
  { id: "att-2", participant_id: "part-1", session_date: "2026-06-15", period: "PM", present: true },
  { id: "att-3", participant_id: "part-2", session_date: "2026-06-15", period: "AM", present: true },
  { id: "att-4", participant_id: "part-2", session_date: "2026-06-15", period: "PM", present: false, note: "Excused dentist appointment" },
  { id: "att-5", participant_id: "part-3", session_date: "2026-06-15", period: "AM", present: true },
  { id: "att-6", participant_id: "part-3", session_date: "2026-06-15", period: "PM", present: true }
];

export const INITIAL_PICKUPS_LOG: PickupLog[] = [
  { id: "pl-1", participant_id: "part-1", log_date: "2026-06-15", arrival_time: "08:45", departure_time: "15:20", pickup_person: "Latoya Tatum", authorized: true },
  { id: "pl-2", participant_id: "part-2", log_date: "2026-06-15", arrival_time: "08:50", departure_time: "12:15", pickup_person: "Gerald Monroe", authorized: true, note: "Early release for dentist" },
  { id: "pl-3", participant_id: "part-3", log_date: "2026-06-15", arrival_time: "08:55", departure_time: "15:25", pickup_person: "Sarah Smith", authorized: true }
];

export const INITIAL_PARTNERSHIP_REQUESTS: PartnershipRequest[] = [
  {
    id: "req-1",
    request_type: "corporate",
    org_name: "Rowan Tech Solutions",
    contact_name: "James Kelly",
    email: "jkelly@rowantech.com",
    phone: "704-555-9988",
    tier_interest: "silver",
    message: "We would love to support the kids with some laptops or sponsorship. Let's discuss details.",
    wants_dossier: true,
    status: "new",
    created_at: "2026-06-05T12:00:00Z"
  }
];

export const INITIAL_DB = {
  sessions: INITIAL_SESSIONS,
  groups: INITIAL_GROUPS,
  participants: INITIAL_PARTICIPANTS,
  parents: INITIAL_PARENTS,
  medical_info: INITIAL_MEDICAL,
  authorized_pickups: INITIAL_PICKUPS,
  attendance: INITIAL_ATTENDANCE,
  pickup_log: INITIAL_PICKUPS_LOG,
  partners: INITIAL_PARTNERS,
  partnership_requests: INITIAL_PARTNERSHIP_REQUESTS,
  certificates: [] as Certificate[]
};
