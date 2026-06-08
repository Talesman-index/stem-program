# PRD — Livingstone College STEM Program Platform
**Format** : Developer-oriented | **Version** 3.0 | **Juin 2026**  
**Stack cible** : Next.js 14 (App Router) · Tailwind CSS · Supabase · Framer Motion · Vercel

---

## 0. Périmètre & Livrables

Ce PRD couvre **l'intégralité de la plateforme** :

| Périmètre | Inclus |
|---|---|
| Site public promotionnel | ✅ |
| Système d'inscription en ligne | ✅ |
| Section financement & partenariat | ✅ |
| Portail administratif | ✅ |

---

## 1. Architecture des Routes

```
app/
├── (public)/
│   ├── page.tsx                          → /
│   ├── about/page.tsx                    → /about
│   ├── programs/
│   │   ├── page.tsx                      → /programs
│   │   └── [slug]/page.tsx               → /programs/:slug
│   ├── register/
│   │   ├── page.tsx                      → /register
│   │   └── confirmation/page.tsx         → /register/confirmation
│   ├── gallery/page.tsx                  → /gallery
│   ├── testimonials/page.tsx             → /testimonials
│   ├── impact/page.tsx                   → /impact
│   ├── partners/page.tsx                 → /partners
│   ├── funding/page.tsx                  → /funding
│   ├── news/page.tsx                     → /news
│   ├── faq/page.tsx                      → /faq
│   ├── contact/page.tsx                  → /contact
│   └── not-found.tsx                     → /404
│
├── (auth)/
│   └── admin/
│       ├── login/page.tsx                → /admin/login
│       └── layout.tsx                    → wrapper auth guard
│
└── admin/
    ├── page.tsx                          → /admin (dashboard)
    ├── participants/
    │   ├── page.tsx                      → /admin/participants
    │   └── [id]/page.tsx                 → /admin/participants/:id
    ├── registrations/page.tsx            → /admin/registrations
    ├── groups/page.tsx                   → /admin/groups
    ├── attendance/page.tsx               → /admin/attendance
    ├── pickup/page.tsx                   → /admin/pickup
    ├── health/page.tsx                   → /admin/health
    ├── certificates/page.tsx             → /admin/certificates
    ├── reports/page.tsx                  → /admin/reports
    ├── partners/page.tsx                 → /admin/partners
    └── settings/page.tsx                 → /admin/settings
```

---

## 2. Composants Partagés (Shared)

### 2.1 Layout Public

**`<Navbar />`**
- Props : `transparent?: boolean` (hero) | `solid` (autres pages)
- État scroll : `useScrollPosition()` → classe `.scrolled` à 80px
- Mobile : drawer `<Sheet />` côté droit, trigger hamburger
- Items nav : Accueil · À Propos · Disciplines · Galerie · Partenaires · Contact
- CTA : `<Button variant="primary" size="sm">S'inscrire</Button>`
- Logo : `<Image src="/logo-stem.png" />` + version blanc pour fond sombre

**`<Footer />`**
- Colonnes (4) : Logo+tagline · Navigation · Disciplines · Contact
- CTA strip au-dessus : double CTA "S'inscrire" + "Soutenir"
- Réseaux sociaux : Facebook, Instagram, Twitter/X
- Ligne légale : copyright · Privacy Policy · Terms

**`<SectionPill label="..." />`**
- Badge label au-dessus des titres de section
- Variantes : `default` (vert) | `blue` | `purple`

**`<SectionHeader title="..." subtitle="..." pill="..." align="center|left" />`**
- Composition : `<SectionPill>` + `<h2>` + `<p>`

---

## 3. Pages Publiques — Specs Détaillées

---

### 3.1 Page d'Accueil `/`

#### Sections & Composants dans l'ordre du DOM

---

**`<HeroSection />`**

```
Layout : plein écran (100vh min), fond --color-dark-forest (#133025)
Background : Image haute définition de participants au camp
Overlay : Gradient dégradé sombre (linear-gradient) pour lisibilité du texte
Transition bas : Diviseur de courbe SVG blanche masquant la limite basse de la photo (.curve-divider)

Contenu (placé en bas à gauche) :
  <SessionBadge>                    → pill "Applications Open · Summer 2026"
  <h1>                              → "STEM CAMP" en Luckiest Guy (taille clamp)
  <p class="hero-subtitle">         → Description courte du programme (Free 1-week program)
  <div class="cta-group">
    <Button variant="primary" size="lg" href="/register">
      Register Now
    </Button>
  </div>

Badges rotatifs :
  - Coin bas-gauche : "FREE FOR ALL ✦ LIVINGSTONE COLLEGE" (Badge rotatif CSS)
  - Coin bas-droit : "SUMMER 2026 ✦ SALISBURY NC ✦ STEM CAMP"
```

---

**`<IntroSection />` (Discover the Wonder)**

```
Layout : centré, fond --color-cream-light (#FCF9F2)
Contenu :
  Titre H2 : "Discover the wonder, friendship, adventure and life-long memories"
  Bouton : Orange CTA "Rates & Dates" ou "Register Now"
Visuals :
  - Cercle central avec point décoratif
  - 6 photos circulaires d'élèves flottant de manière asymétrique autour du texte
    (Animations CSS translate/float décalées)
```

---

**`<AboutSection />` (A Welcoming Natural Haven)**

```
Layout : 2 colonnes (desktop) / vertical (mobile), fond --color-cream-light (#FCF9F2)
Colonne Gauche :
  - Grande photo du campus de Livingstone College avec cadres arrondis arqués (.arched-frame)
Colonne Droite :
  - Titre H2 : "A welcoming natural haven close to home"
  - Sous-titre et paragraphes détaillant l'expérience du camp
  - Liste de caractéristiques (puces cochées) : "150+ acres of STEM space", "Advanced equipment labs", "Safety first guidance"
  - Petite photo arquée secondaire en bas (.arched-frame-sm)
```

---

**`<TimelineSection />` (From Registration to Adventure Journey)**

```
Fond : --color-dark-forest (#133025)
Layout : Ligne pointillée (dash) reliant les cercles d'étapes horizontales (desktop) / verticales (mobile)
Composant <TimelineStep number={n} title="..." body="..." />
4 étapes :
  01 · Register Online
  02 · Prep Time
  03 · Welcome to Camp
  04 · Camp Life
Style : Numéros dans des cercles colorés contrastés, titres et descriptifs en blanc.
```

---

**`<SpacesGridSection />` (Spaces That Make Camp Special)**

```
Fond : --color-cream-light (#FCF9F2)
Header : "Discover the spaces that make camp special"
Layout : Grille 3 colonnes (→ 1 mobile)
Cards (3) — Composant <SpaceCard image="..." title="..." body="..." /> :
  1. "Science Labs"      · "Equipped chemistry & biology workspaces..."
  2. "Robotics Arena"    · "Zones for building and testing crawler robots..."
  3. "Greenhouse Project"· "Agricultural technology and agronomy gardens..."
Style cards : Coins arrondis 24px, ombre douce, photo sur les 2/3, titre H3 et texte en bas.
```

---

**`<DisciplinesCircularGrid />` (Programs That Inspire)**

```
Fond : --color-cream-light (#FCF9F2)
Header : <SectionPill>Disciplines</SectionPill> + "Programs that inspire"
Layout : Grille de 7 disciplines
Chaque item :
  - Photo circulaire de la discipline avec bordure verte/orange
  - Titre de la discipline en Gabarito gras sous la photo
  - Courte description (1-2 phrases)
```

---

**`<SafetyBannerSection />` (Care You Can Count On)**

```
Fond : --color-dark-forest (#133025)
Layout : 2 colonnes (desktop)
Gauche :
  - Grande photo arquée (.arched-frame) montrant l'encadrement des étudiants par les mentors.
Droite :
  - Titre H2 : "Care you can count on every step of the way!"
  - Paragraphes sur l'importance du ratio mentors/élèves, la présence de secouristes et de médecins.
  - CTA : Bouton orange "Learn about safety"
```

---

**`<TestimonialsGridSection />` (From the Parents Who Trusted Us)**

```
Fond : --color-sage-green (#EAEFE3)
Header : "From the parents who trusted us"
Layout : Grille 2 ou 3 colonnes de cartes de témoignages
Cartes : Fond blanc, coins arrondis, 5 étoiles dorées, texte de citation, nom et rôle du parent.
```

---

**`<CampMapSection />` (Explore Our Camp Map)**

```
Fond : --color-cream-light (#FCF9F2)
Layout : Centré
Contenu :
  - Titre H2 : "Explore our camp map"
  - Carte illustrée vectorielle du campus (Plan Livingstone STEM)
  - CTA : Bouton "View Camp Map" ou indications pour rejoindre Salisbury, NC.
```

---

**`<DatesRatesBar />` (Dates to Look Forward to)**

```
Fond : --color-accent-green (#52B788)
Layout : Bandeau horizontal vert vif avec texte blanc
Contenu :
  - Titre H2 : "Dates to look forward to for Camp 2026"
  - Grille des sessions (Middle School / High School avec dates)
  - CTA : Bouton orange "Register"
```

---

**`<InstagramMarquee />` (Media Strip)**

```
Fond : --color-cream-light (#FCF9F2)
Layout : Défilement infini d'images carrées (mosaïque d'activités STEM)
Hover : pause sur survol
```

---

**`<Footer />`**

```
Fond : --color-dark-forest (#133025)
Layout : Grille à 4 colonnes, textes et liens en blanc crème
Style :
  - Titre en Luckiest Guy géant "STARLIGHT CAMP" remplacé par "STEM CAMP"
  - Colonnes claires de liens
  - Copyright et mentions légales en bas
```

---

### 3.2 Disciplines STEM

**`/programs` — Page liste**

```
Hero : titre + sous-titre + 7 discipline cards en grille
Grille : 4 cols desktop · 2 tablet · 1 mobile

<DisciplineCard /> — version étendue :
  - Image/illustration header
  - Couleur bande top
  - Titre + icône
  - Description 2-3 phrases
  - "Explorer →" → /programs/:slug
```

**`/programs/[slug]` — Page discipline**

```
Données : src/data/disciplines.ts → tableau de 7 objets
Champs requis :
  slug, title, color, icon, heroImage,
  description (long), activities: string[],
  skills: string[], quote?: { text, author }

Layout :
  <DisciplineHero color={color} title={title} icon={icon} />
  <DisciplineDescription body={description} />
  <ActivitiesList items={activities} />
  <SkillsGained skills={skills} />
  <Quote /> (optionnel)
  <BackToProgramsCTA />
  <RegisterCTA />
```

---

### 3.3 Galerie `/gallery`

```
Filtres : [Toutes] [2023] [2024] [2025] + [par discipline]
State : useState({ year: 'all', discipline: 'all' })

Grid masonry CSS (columns: 3 desktop · 2 tablet · 1 mobile)
Composant <GalleryItem src="..." alt="..." year={} discipline="..." />

Click → <LightboxModal> (state lifted) avec navigation prev/next, close Escape
Images : next/image avec placeholder blur
Chargement : pagination "Voir plus" (charge 12 items par batch)
```

---

### 3.4 FAQ `/faq`

```
Composant <AccordionItem question="..." answer="..." />
State : useState(null) → index ouvert (1 seul à la fois)
Animation : height transition CSS (max-height: 0 → auto)
9 questions (voir content guide)
Search bar optionnelle : filtre côté client sur question+réponse
```

---

### 3.5 Contact `/contact`

```
Layout : 2 colonnes (formulaire gauche, infos droite) → 1 col mobile

Formulaire :
  Champs : nom*, email*, sujet (select)*, message* (textarea)
  Sujet options : Inscription · Partenariat · Presse · Autre
  Validation : React Hook Form + Zod
  Submit → Server Action → email via Resend API
  States : idle | loading | success | error
  Success : toast + reset form

Infos contact :
  email, téléphone, adresse
  Google Maps embed (optionnel)
```

---

## 4. Système d'Inscription `/register`

### 4.1 Flow Complet

```
/register
  → Step 1 : Profil élève
  → Step 2 : Parent & contacts
  → Step 3 : Informations médicales
  → Step 4 : Documents & signature
  → /register/confirmation
```

### 4.2 Architecture du Formulaire Multi-Étapes

```typescript
// State global (Zustand store)
interface RegistrationStore {
  currentStep: 1 | 2 | 3 | 4
  formData: {
    student: StudentFields
    parent: ParentFields
    medical: MedicalFields
    documents: DocumentFields
  }
  status: 'idle' | 'submitting' | 'success' | 'error'
  
  setStep: (step: number) => void
  updateField: (section: string, field: string, value: any) => void
  submitRegistration: () => Promise<void>
  resetForm: () => void
}

// Persistance brouillon : localStorage sync (zustand-persist)
// Clé : 'stem-registration-draft'
// Clear on: successful submit
```

### 4.3 Composant `<StepIndicator />`

```
4 dots + connecteurs
Dot states : pending | active | completed
Active : stem-green + pulse animation
Completed : check icon, stem-blue-mid
Clic sur étape complétée → retour arrière autorisé
```

### 4.4 Step 1 — Profil Élève

```typescript
interface StudentFields {
  firstName: string       // required, min 2
  lastName: string        // required, min 2
  dateOfBirth: string     // required, format YYYY-MM-DD, age 10-18
  schoolLevel: 'middle' | 'high'  // required
  schoolName: string      // required
  sessionYear: number     // auto: current year
}

// Validation Zod
const studentSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName:  z.string().min(2).max(50),
  dateOfBirth: z.string().refine(isValidAge, "L'élève doit avoir entre 10 et 18 ans"),
  schoolLevel: z.enum(['middle', 'high']),
  schoolName:  z.string().min(2).max(100),
})

// Règle métier : schoolLevel auto-detected si possible depuis dateOfBirth
// Middle School : ~11-14 ans / High School : ~14-18 ans (suggestion seulement)
```

### 4.5 Step 2 — Parent & Contacts

```typescript
interface ParentFields {
  fullName:    string   // required
  phone:       string   // required, format validation
  phoneAlt?:   string
  email:       string   // required, email format
  
  emergencyContact: {
    name:         string  // required
    relationship: string  // required
    phone:        string  // required
  }
  
  authorizedPickups: Array<{
    id:           string  // uuid client
    name:         string  // required
    relationship: string  // required
    phone:        string  // required
  }>  // min 1, max 5
}

// UI : <AuthorizedPickupList /> avec add/remove dynamique
// Ajout : bouton "+ Ajouter une personne" → inline form append
// Suppression : icône trash, confirmation si seul item non autorisée
```

### 4.6 Step 3 — Informations Médicales

```typescript
interface MedicalFields {
  hasAllergies:        boolean
  allergiesDetail?:    string   // required if hasAllergies
  hasDietaryRestrictions: boolean
  dietaryDetail?:      string
  hasMedication:       boolean
  medicationDetail?:   string
  hasMedicalConditions: boolean
  medicalDetail?:      string
  doctorName?:         string
  doctorPhone?:        string
}

// Pattern UI : toggle "Oui/Non" → conditional reveal du champ texte
// Composant <MedicalToggleField label="..." field="..." detailField="..." />
```

### 4.7 Step 4 — Documents & Validation

```typescript
interface DocumentFields {
  liabilityWaiver:    boolean  // required: true
  parentalConsent:    boolean  // required: true
  imageAuthorization: boolean  // required: true
  signatureFullName:  string   // required, doit matcher parent.fullName (loose match)
  signatureDate:      string   // auto: today
}

// UI :
// <DocumentBlock title="Décharge de responsabilité">
//   <LegalText>...</LegalText>  (scroll obligatoire avant activation checkbox)
//   <Checkbox field="liabilityWaiver" />
// </DocumentBlock>

// Récapitulatif : <RegistrationSummary data={formData} />
//   → toutes les infos en readonly avant submit final

// Submit button désactivé tant que les 3 checkboxes ne sont pas cochées
```

### 4.8 Logique Submit

```typescript
async function submitRegistration(data: RegistrationStore['formData']) {
  // 1. Vérification doublon
  const duplicate = await supabase
    .from('participants')
    .select('id')
    .eq('first_name', data.student.firstName)
    .eq('last_name', data.student.lastName)
    .eq('date_of_birth', data.student.dateOfBirth)
    .single()
  
  if (duplicate.data) {
    throw new Error('DUPLICATE_REGISTRATION')
    // UI : message "Un participant avec ce nom et cette date de naissance existe déjà."
  }
  
  // 2. Insert Supabase (transaction)
  const { data: participant } = await supabase
    .from('participants').insert({...}).select().single()
  
  await supabase.from('parents').insert({ participant_id: participant.id, ...})
  await supabase.from('medical_info').insert({ participant_id: participant.id, ...})
  await supabase.from('authorized_pickups').insert(pickups)
  
  // 3. Email confirmation (Server Action → Resend)
  await sendConfirmationEmail({
    to: data.parent.email,
    participantName: `${data.student.firstName} ${data.student.lastName}`,
    confirmationPDF: await generateSummaryPDF(data)
  })
  
  // 4. Redirect
  router.push('/register/confirmation')
}
```

### 4.9 Page Confirmation `/register/confirmation`

```
Affiché uniquement si state store === 'success' (sinon redirect /register)
Contenu :
  ✅ Icône succès animée (Framer Motion scale spring)
  Titre : "Inscription enregistrée !"
  Message : "Un email de confirmation a été envoyé à [email]"
  Récapitulatif léger : nom participant, session, niveau
  CTA : "Retour à l'accueil" + "Partager le programme" (share API)
  
Store reset appelé à ce stade (clearDraft)
```

---

## 5. Section Financement & Partenariat `/funding`

### 5.1 Structure de la Page

```
<FundingHeroSection />
<ImpactNumbers />           → mêmes KPIs que /impact, format cards
<WhySupportSection />       → 3 blocs raison
<PartnershipTiersSection /> → 5 niveaux avec cards
<DownloadableResourcesSection />
<FundingContactForm />
```

### 5.2 `<PartnershipTiersSection />`

```typescript
interface Tier {
  id: 'friend' | 'bronze' | 'silver' | 'gold' | 'platinum'
  label: string
  range: string
  color: string
  featured: boolean
  perks: string[]
}

const TIERS: Tier[] = [
  { id: 'friend',   label: 'Ami du Programme', range: '< $500',         color: '#6B7280', featured: false, perks: ['Mention site web', 'Certificat de remerciement'] },
  { id: 'bronze',   label: 'Partenaire Bronze', range: '$500–$1,499',   color: '#CD7F32', featured: false, perks: ['Logo site web', 'Rapport d\'impact annuel', 'Remerciements cérémonie'] },
  { id: 'silver',   label: 'Partenaire Argent', range: '$1,500–$4,999', color: '#9CA3AF', featured: false, perks: ['Tout Bronze', 'Visibilité matériaux camp', 'Invitation cérémonie'] },
  { id: 'gold',     label: 'Partenaire Or',     range: '$5,000–$9,999', color: '#F59E0B', featured: true,  perks: ['Tout Argent', 'Panneau au camp', 'Mention communications'] },
  { id: 'platinum', label: 'Partenaire Platine', range: '$10,000+',     color: '#7B7EC8', featured: false, perks: ['Tout Or', 'Table ronde direction', 'Naming discipline possible'] },
]

// Card "Or" : featured=true → scale 1.05, fond sombre, badge "⭐ Recommandé"
// Click CTA → scroll smooth vers <FundingContactForm /> + pre-fill tier select
```

### 5.3 `<FundingContactForm />`

```typescript
interface FundingFormFields {
  requestType: 'corporate' | 'grant' | 'individual' | 'community' | 'other'
  orgName:     string
  contactName: string   // required
  email:       string   // required
  phone?:      string
  tierInterest: string  // pre-filled si click depuis tier card
  message:     string   // required, min 20 chars
  wantsDossier: boolean
}

// Submit → Server Action → Resend (email interne) + Supabase insert partnership_requests
// States : idle | submitting | success | error
// Success message : "Votre demande a été transmise. Nous reviendrons vers vous sous 48h."
// Si wantsDossier : envoyer email avec lien PDF impact
```

---

## 6. Portail Admin

### 6.1 Auth Guard

```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const session = request.cookies.get('sb-auth-token')
  if (!session && request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }
}

// Layout admin : <AdminLayout> wraps toutes les routes /admin/**
// Vérifie session Supabase côté serveur (getServerSession)
// Rôles récupérés depuis profiles.role (super_admin | admin | coordinator | teacher | volunteer)
```

### 6.2 Layout Admin

```
<AdminLayout>
  <Sidebar>                       → 240px fixe, fond #0D1B2A
    <Logo />
    <NavItem icon="..." href="..."> × N
    <UserInfo />                  → avatar, nom, rôle, logout
  </Sidebar>
  <MainArea>
    <AdminHeader title={pageTitle} actions={[...]} />
    {children}
  </MainArea>
</AdminLayout>

Navigation items (avec permissions) :
  Dashboard        → super_admin, admin, coordinator
  Participants     → super_admin, admin, coordinator, teacher
  Inscriptions     → super_admin, admin
  Groupes          → super_admin, admin, coordinator
  Présences        → tous les rôles
  Dépôts/Récup.    → super_admin, admin, coordinator
  Santé & Sécurité → super_admin, admin
  Certificats      → super_admin, admin
  Rapports         → super_admin, admin
  Partenariats     → super_admin, admin
  Paramètres       → super_admin seulement
```

### 6.3 Dashboard `/admin`

```
KPI Cards (grille 4 cols → 2 mobile) :
  <KPICard label="Total inscrits"      value={n}   icon="Users"       trend="+12 vs 2025" />
  <KPICard label="Taux de présence"    value="87%" icon="CheckSquare" trend="..." />
  <KPICard label="Certificats générés" value={n}   icon="Certificate" />
  <KPICard label="Liste d'attente"     value={n}   icon="Clock"       variant="warning" />

Charts (section en dessous) :
  <AttendanceChart />    → bar chart : présence par jour (Recharts BarChart)
  <LevelDonut />         → donut : MS vs HS (Recharts PieChart)

Actions rapides :
  [Pointer les présences d'aujourd'hui]
  [Voir nouvelles inscriptions]
  [Générer rapport de la semaine]

Activité récente :
  <ActivityFeed limit={10} /> → log des dernières actions (inscriptions, présences, etc.)
```

### 6.4 Participants `/admin/participants`

```
Header actions :
  <SearchInput placeholder="Rechercher un participant..." />
  <FilterBar filters={['session', 'group', 'status', 'level']} />
  <Button onClick={exportCSV}>Exporter CSV</Button>
  <Button onClick={importCSV}>Importer</Button>

Table :
  Colonnes : Nom | Niveau | École | Groupe | Statut | Présence % | Actions
  
  <DataTable
    columns={participantColumns}
    data={participants}
    sortable
    pagination={{ pageSize: 25 }}
    rowClick={(id) => router.push(`/admin/participants/${id}`)}
  />

Badge statuts : Confirmé (vert) | En attente (jaune) | Liste d'attente (violet) | Annulé (rouge)
```

**Fiche participant `/admin/participants/[id]`**

```
Layout 2 colonnes :
  Colonne gauche (2/3) : infos complètes en sections pliables (Accordion)
    - Profil élève
    - Contact parent/tuteur
    - Contacts d'urgence + personnes autorisées pickup
    - Informations médicales (accès restreint : admin+ uniquement)
    - Historique présences (tableau)
    
  Colonne droite (1/3) :
    - Carte statut avec dropdown changement statut
    - Groupe assigné (select + save)
    - Actions : Générer certificat | Envoyer email | Supprimer

Edition inline :
  Clic sur un champ → devient input/textarea
  Boutons [Sauvegarder] [Annuler] apparaissent
  Submit → PATCH /api/participants/:id → Supabase update
  Toast confirmation
```

### 6.5 Inscriptions `/admin/registrations`

```
Tabs : [Nouvelles (n)] [En révision] [Confirmées] [Annulées]

Table par tab :
  Colonnes : Nom · Date soumission · Niveau · Statut · Actions

Actions par ligne :
  Voir détails | Confirmer | Mettre en révision | Annuler
  Confirmation → modal "Êtes-vous sûr ?" + email automatique au parent

Batch actions (checkboxes) :
  [Confirmer la sélection] [Exporter la sélection]
```

### 6.6 Groupes `/admin/groups`

```
Vue : grille de cards groupe + tableau de répartition

<GroupCard
  name="Groupe 1"
  color="#4A7FC1"
  count={n}
  capacity={20}
  members={participants[]}
/>

Actions sur card :
  - Renommer
  - Changer couleur
  - Voir liste membres
  - Imprimer liste (PDF)

Drag & Drop participants :
  Bibliothèque : @dnd-kit/core
  Zone "Non assignés" → drag vers un groupe card
  OU : dans fiche participant, select "Groupe"

Indicateur remplissage :
  <ProgressBar value={count/capacity} />
  Rouge si count > capacity
```

### 6.7 Présences `/admin/attendance`

```
Interface principale :
  Select : [Session] → [Groupe] → [Date]
  
  Vue liste noms du groupe :
    <AttendanceRow
      participant={p}
      morningPresent={bool}
      afternoonPresent={bool}
      onToggle={handleToggle}
    />
    
  Bouton global : [Tous présents] [Tous absents]
  Submit : [Enregistrer les présences]
  
  Après enregistrement : toast + redirect vers vue du jour

Vue calendrier (onglet "Historique") :
  Par participant : mini-calendrier coloré (vert=présent, rouge=absent, gris=week-end)
  
Rapport présence :
  Filtres date + session + groupe
  Export : PDF (liste) | CSV (données)
```

### 6.8 Dépôts & Récupérations `/admin/pickup`

```
Date picker → vue du jour

Table :
  Colonnes : Nom participant · Heure arrivée · Heure départ · Récupéré par · Actions

Inline edit :
  Clic "Enregistrer arrivée" → input heure + save
  Clic "Enregistrer départ" → input heure + nom personne (select depuis authorized_pickups) + save

Alerte visuelle si personne de départ n'est pas dans la liste autorisée :
  <Badge variant="warning">⚠ Personne non listée</Badge>
  → admin doit confirmer manuellement

Export log du jour : bouton PDF
```

### 6.9 Santé & Sécurité `/admin/health`

```
Vue : tableau de tous les participants avec flags santé
Colonnes : Nom · Allergies · Restrictions · Médicaments · Contact urgence

Filtre rapide : [Avec allergies] [Avec restrictions] [Avec médicaments]

Génération liste sécurité :
  <Button variant="primary" onClick={generateSafetyPDF}>
    Générer liste de sécurité (PDF)
  </Button>
  → PDF : liste nom + allergies + restrictions + contact urgence
  → Formaté pour impression A4

Accès restreint : admin, super_admin uniquement (RLS Supabase + vérification rôle)
```

### 6.10 Certificats `/admin/certificates`

```
Logique éligibilité :
  Taux présence ≥ seuil configurable (défaut : 80%)
  Calculé : (jours présents / total jours camp) × 100

Vue :
  Tabs : [Éligibles (n)] [Générés] [Envoyés] [Non éligibles]
  Table avec checkbox par participant

Actions :
  Sélection + [Générer les certificats sélectionnés]
  Sélection + [Envoyer par email]
  Individuel : [Prévisualiser] [Télécharger] [Envoyer]

Template certificat :
  React-PDF component
  Variables : nom, session, année, disciplines suivies, date, signature directeur
  Logo Livingstone College

Batch generation :
  Server Action asynchrone
  Progress bar modale : "Génération en cours... 12/45"
```

### 6.11 Rapports `/admin/reports`

```
Sections :
  1. Rapport annuel → génère PDF complet (stats, participants, présences, disciplines)
  2. Rapport d'impact → version pour sponsors/subventions (KPIs + visuels)
  3. Export données brutes → CSV / Excel

Composant <ReportBuilder> :
  - Sélection année / session
  - Sélection sections à inclure (checkboxes)
  - Aperçu live (iFrame PDF ou HTML)
  - Bouton "Générer & Télécharger"

Génération : Server Action → puppeteer ou @react-pdf/renderer
```

### 6.12 Partenariats Admin `/admin/partners`

```
Tabs : [Demandes reçues] [Partenaires actifs]

Tab Demandes :
  Table : Org · Type · Niveau · Date · Statut · Actions
  Statuts : Nouveau | En discussion | Confirmé | Décliné
  Action inline : changer statut + note interne
  Click ligne → drawer détail (tous les champs du formulaire funding)

Tab Partenaires actifs :
  Cards partenaires :
    - Logo upload
    - Niveau (badge coloré)
    - Date début/fin
    - Contact référent
    - Actif/Inactif toggle
  Bouton : + Ajouter un partenaire manuel
```

---

## 7. Base de Données Supabase

### 7.1 Tables

```sql
-- Sessions du camp
CREATE TABLE sessions (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  year        int  NOT NULL,
  type        text CHECK (type IN ('middle', 'high')) NOT NULL,
  start_date  date NOT NULL,
  end_date    date NOT NULL,
  capacity    int  DEFAULT 30,
  active      bool DEFAULT true,
  created_at  timestamptz DEFAULT now()
);

-- Participants
CREATE TABLE participants (
  id           uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id   uuid REFERENCES sessions(id),
  group_id     uuid REFERENCES groups(id),
  first_name   text NOT NULL,
  last_name    text NOT NULL,
  date_of_birth date NOT NULL,
  school_level text CHECK (school_level IN ('middle', 'high')),
  school_name  text NOT NULL,
  status       text DEFAULT 'pending' CHECK (status IN ('pending', 'review', 'confirmed', 'waitlist', 'cancelled')),
  created_at   timestamptz DEFAULT now(),
  UNIQUE(first_name, last_name, date_of_birth)
);

-- Parents
CREATE TABLE parents (
  id                  uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  participant_id      uuid REFERENCES participants(id) ON DELETE CASCADE,
  full_name           text NOT NULL,
  phone               text NOT NULL,
  phone_alt           text,
  email               text NOT NULL,
  emergency_name      text NOT NULL,
  emergency_relation  text NOT NULL,
  emergency_phone     text NOT NULL
);

-- Personnes autorisées pickup
CREATE TABLE authorized_pickups (
  id             uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  participant_id uuid REFERENCES participants(id) ON DELETE CASCADE,
  full_name      text NOT NULL,
  relationship   text NOT NULL,
  phone          text NOT NULL
);

-- Informations médicales
CREATE TABLE medical_info (
  id                   uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  participant_id       uuid REFERENCES participants(id) ON DELETE CASCADE,
  has_allergies        bool DEFAULT false,
  allergies_detail     text,
  has_dietary          bool DEFAULT false,
  dietary_detail       text,
  has_medication       bool DEFAULT false,
  medication_detail    text,
  has_conditions       bool DEFAULT false,
  conditions_detail    text,
  doctor_name          text,
  doctor_phone         text
);

-- Groupes
CREATE TABLE groups (
  id         uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id uuid REFERENCES sessions(id),
  name       text NOT NULL,
  color      text DEFAULT '#4A7FC1',
  capacity   int  DEFAULT 10
);

-- Présences
CREATE TABLE attendance (
  id             uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  participant_id uuid REFERENCES participants(id),
  session_date   date NOT NULL,
  period         text CHECK (period IN ('AM', 'PM', 'FULL')),
  present        bool DEFAULT false,
  note           text,
  recorded_by    uuid REFERENCES auth.users(id),
  UNIQUE(participant_id, session_date, period)
);

-- Log pickup
CREATE TABLE pickup_log (
  id             uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  participant_id uuid REFERENCES participants(id),
  log_date       date NOT NULL,
  arrival_time   time,
  departure_time time,
  pickup_person  text,
  authorized     bool DEFAULT true,
  note           text
);

-- Certificats
CREATE TABLE certificates (
  id             uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  participant_id uuid REFERENCES participants(id),
  session_id     uuid REFERENCES sessions(id),
  generated_at   timestamptz,
  sent_at        timestamptz,
  file_path      text
);

-- Demandes de partenariat
CREATE TABLE partnership_requests (
  id           uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  request_type text CHECK (request_type IN ('corporate','grant','individual','community','other')),
  org_name     text,
  contact_name text NOT NULL,
  email        text NOT NULL,
  phone        text,
  tier_interest text,
  message      text NOT NULL,
  wants_dossier bool DEFAULT false,
  status       text DEFAULT 'new' CHECK (status IN ('new','discussion','confirmed','declined')),
  internal_note text,
  created_at   timestamptz DEFAULT now()
);

-- Partenaires actifs
CREATE TABLE partners (
  id           uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name         text NOT NULL,
  logo_path    text,
  tier         text CHECK (tier IN ('friend','bronze','silver','gold','platinum')),
  start_date   date,
  end_date     date,
  contact_name text,
  contact_email text,
  active       bool DEFAULT true
);

-- Profils utilisateurs admin
CREATE TABLE profiles (
  id    uuid REFERENCES auth.users(id) PRIMARY KEY,
  role  text DEFAULT 'volunteer' CHECK (role IN ('super_admin','admin','coordinator','teacher','volunteer')),
  name  text NOT NULL
);
```

### 7.2 Row Level Security (exemples critiques)

```sql
-- medical_info : lecture uniquement pour admin+
ALTER TABLE medical_info ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admin_read_medical" ON medical_info
  FOR SELECT USING (
    auth.uid() IN (SELECT id FROM profiles WHERE role IN ('super_admin', 'admin'))
  );

-- participants : lecture par rôle teacher limitée à son groupe
CREATE POLICY "teacher_read_own_group" ON participants
  FOR SELECT USING (
    auth.uid() IN (SELECT id FROM profiles WHERE role = 'teacher')
    AND group_id IN (
      SELECT group_id FROM teacher_groups WHERE teacher_id = auth.uid()
    )
  );

-- partnership_requests : admin+ seulement
ALTER TABLE partnership_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admin_manage_partnerships" ON partnership_requests
  FOR ALL USING (
    auth.uid() IN (SELECT id FROM profiles WHERE role IN ('super_admin','admin'))
  );
```

---

## 8. API Routes & Server Actions

```typescript
// app/actions/registration.ts
export async function submitRegistration(data: FormData)
export async function checkDuplicate(firstName: string, lastName: string, dob: string)

// app/actions/attendance.ts
export async function saveAttendance(records: AttendanceRecord[])
export async function getAttendanceByDate(date: string, groupId: string)

// app/actions/certificates.ts
export async function generateCertificate(participantId: string)
export async function batchGenerateCertificates(participantIds: string[])
export async function sendCertificateEmail(participantId: string)

// app/actions/funding.ts
export async function submitPartnershipRequest(data: FundingFormFields)

// app/actions/reports.ts
export async function generateAnnualReport(sessionId: string)
export async function generateImpactReport(year: number)
export async function exportParticipantsCSV(filters: Filters)
```

---

## 9. Variables d'Environnement

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Email (Resend)
RESEND_API_KEY=
EMAIL_FROM=noreply@livingstonestem.org

# App
NEXT_PUBLIC_APP_URL=https://livingstonestem.org
NEXT_PUBLIC_CAMP_YEAR=2026
```

---

## 10. Checklist Développeur

### Avant de commencer
- [ ] Supabase projet créé, tables migrées, RLS configuré
- [ ] Variables d'environnement en place (local + Vercel)
- [ ] Google Fonts chargées : Space Grotesk · DM Sans · Space Mono
- [ ] Tailwind config étendu (tokens design system)
- [ ] Zustand store registration initialisé

### Site public
- [ ] Toutes les pages publiques créées et linkées dans la nav
- [ ] Formulaire inscription multi-step fonctionnel + validation Zod
- [ ] Submit inscription → Supabase + email confirmation Resend
- [ ] Formulaire funding → Supabase + email interne
- [ ] Countdown dynamique fonctionnel
- [ ] Galerie lightbox fonctionnelle
- [ ] Responsive validé : 375px · 768px · 1280px

### Portail admin
- [ ] Auth guard middleware en place
- [ ] Tous les rôles et RLS testés
- [ ] CRUD participants opérationnel
- [ ] Système présences sauvegarde correctement
- [ ] Génération certificat PDF fonctionnelle
- [ ] Export CSV données participants
- [ ] Dashboard charts avec données réelles

### Performances & SEO
- [ ] next/image sur toutes les images
- [ ] Metadata (title, description, og:image) sur chaque page publique
- [ ] Sitemap.xml généré
- [ ] Score Lighthouse ≥ 90 (performance, accessibilité)

---

*PRD v3.0 — Developer-oriented | Livingstone College STEM Program | Juin 2026*
