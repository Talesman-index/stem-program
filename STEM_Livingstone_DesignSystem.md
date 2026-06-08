# Design System — STEM Livingstone College
**Document** : Système de Design & Directives de Construction | **Version** 1.0 | **Juin 2026**

---

## 1. Identité Visuelle & Direction Artistique

### 1.1 Philosophie de Design

**Concept directeur** : *"Énergie scientifique accessible"*

Le design traduit trois tensions propres au programme :
1. **Sérieux académique** × **Énergie juvénile** → Un style structuré mais vivant, jamais austère.
2. **Haute technologie** × **Chaleur communautaire** → Des formes nettes avec des textures humaines.
3. **Ambition** × **Accessibilité** → Des compositions aspirationnelles sans jamais intimider.

**Références visuelles** : MIT Media Lab, Khan Academy, Starlight Camp (structure de navigation), FIRST Robotics (énergie et couleur).

**Ce que le design n'est PAS** :
- ❌ Pastels mous et arrondis (trop école maternelle)
- ❌ Corporate navy/grey (trop institutionnel froid)
- ❌ Purple gradient sur blanc (AI slop générique)
- ❌ Illustrations vectorielles stock (sans âme)

---

## 2. Palette de Couleurs

### 2.1 Couleurs Primaires

```css
/* Extraites et harmonisées depuis la référence Starlight Camp */

--color-dark-forest: #133025;
/* Vert forêt très sombre - Fond principal hero, footer, et texte sur fond clair */
/* Usage : Textes importants, fonds de sections contrastées, footer */

--color-cream-light: #FCF9F2;
/* Blanc chaud/crème très clair - Fond par défaut des pages */
/* Usage : Arrière-plan principal */

--color-sage-green: #EAEFE3;
/* Vert sauge doux - Fond alternatif pour les sections */
/* Usage : Alternance de sections, arrière-plan de formulaires */

--color-accent-orange: #FF5A1F;
/* Orange vif - Couleur d'accentuation dynamique */
/* Usage : CTAs primaires, boutons d'action clés, highlights */

--color-accent-green: #52B788;
/* Vert vif/lumineux - Complémentaire de marque */
/* Usage : Badges, états positifs, sections à fort impact visuel */
```

### 2.2 Couleurs Neutres

```css
--color-bg-base: var(--color-cream-light);
--color-bg-section-alt: var(--color-sage-green);
--color-bg-dark: var(--color-dark-forest);

--color-text-primary: var(--color-dark-forest);
--color-text-secondary: #3D4A3E;
--color-text-muted: #7A8C7B;
--color-text-white: #FFFFFF;

--color-border: rgba(19, 48, 37, 0.08);
--color-border-strong: rgba(19, 48, 37, 0.15);
```

### 2.3 Couleurs Sémantiques

```css
--color-success: #2E7D32;
--color-warning: #ED6C02;
--color-error: #D32F2F;
--color-info: #0288D1;
```

### 2.4 Couleurs par Discipline STEM

```css
--discipline-biology: #52B788;       /* Vert brillant */
--discipline-chemistry: #FF7A3D;     /* Orange */
--discipline-mathematics: #4A90D9;   /* Bleu ciel */
--discipline-robotics: #8B6FE8;      /* Violet */
--discipline-vr: #E84FA0;            /* Rose */
--discipline-greenhouse: #74C69D;    /* Vert menthe */
--discipline-esports: #FFB800;       /* Jaune */
```

### 2.5 Couleurs Niveaux de Partenariat

```css
--partner-friend: #7A8C7B;
--partner-bronze: #CD7F32;
--partner-silver: #B0BEC5;
--partner-gold: #FFB800;
--partner-platinum: #8B6FE8;
```

---

## 3. Typographie

### 3.1 Choix des Polices

**Police Display / Grands Titres H1** : `Luckiest Guy`
*(Cursive / Bouncy / Ludique - Donne l'esprit Summer Camp marquant)*

**Police Titres H2-H4** : `Gabarito`
*(Sans-serif géométrique chaleureux et lisible)*

**Police Corps / Interface** : `Nunito`
*(Arrondi, accueillant et hautement lisible pour les familles et élèves)*

```html
<!-- Google Fonts import -->
<link href="https://fonts.googleapis.com/css2?family=Gabarito:wght@400;500;600;700;800;900&family=Nunito:wght@400;600;700;800&family=Luckiest+Guy&display=swap" rel="stylesheet">
```

```css
--font-display: 'Gabarito', sans-serif;
--font-body: 'Nunito', sans-serif;
--font-accent: 'Luckiest Guy', cursive;
```

### 3.2 Échelle Typographique

```css
/* Display — Hero headlines (Bouncy accent) */
--text-display-xl: clamp(3.5rem, 10vw, 8.5rem);
font-family: var(--font-accent);
font-weight: 400;
line-height: 1.0;
letter-spacing: 0.02em;

/* H1 — Titres de pages */
--text-h1: clamp(2.5rem, 5vw, 4.5rem);
font-family: var(--font-accent);
font-weight: 400;
line-height: 1.1;

/* H2 — Titres de sections */
--text-h2: clamp(1.85rem, 3.5vw, 3.25rem);
font-family: var(--font-display);
font-weight: 800;
line-height: 1.15;
letter-spacing: -0.01em;

/* H3 — Sous-sections */
--text-h3: clamp(1.35rem, 2vw, 1.75rem);
font-family: var(--font-display);
font-weight: 800;
line-height: 1.25;

/* Body Large — Sous-titres, intro */
--text-body-lg: 1.125rem;
font-family: var(--font-body);
font-weight: 600;
line-height: 1.6;

/* Body — Corps courant */
--text-body: 1rem;
font-family: var(--font-body);
font-weight: 500;
line-height: 1.6;

/* Body Small — Labels, métadonnées */
--text-body-sm: 0.875rem;
font-family: var(--font-body);
font-weight: 500;
line-height: 1.5;
```

---

## 4. Spacing & Layout

### 4.1 Grille

```css
/* Conteneur principal */
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 clamp(1rem, 5vw, 5rem);
}

/* Grille 12 colonnes */
.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1.5rem;
}
```

### 4.2 Échelle de Spacing

```css
--space-1:  0.25rem;   /*  4px */
--space-2:  0.5rem;    /*  8px */
--space-3:  0.75rem;   /* 12px */
--space-4:  1rem;      /* 16px */
--space-5:  1.25rem;   /* 20px */
--space-6:  1.5rem;    /* 24px */
--space-8:  2rem;      /* 32px */
--space-10: 2.5rem;    /* 40px */
--space-12: 3rem;      /* 48px */
--space-16: 4rem;      /* 64px */
--space-20: 5rem;      /* 80px */
--space-24: 6rem;      /* 96px */
--space-32: 8rem;      /* 128px */
```

### 4.3 Padding Sections

```css
/* Section standard */
.section { padding: clamp(4rem, 8vw, 8rem) 0; }

/* Section hero */
.section-hero { padding: clamp(5rem, 12vw, 12rem) 0; }

/* Section compact */
.section-sm { padding: clamp(2.5rem, 5vw, 5rem) 0; }
```

---

## 5. Composants UI

### 5.1 Boutons

```css
/* Bouton Primaire (Starlight style) */
.btn-primary {
  background: var(--color-accent-orange);
  color: #fff;
  font-family: var(--font-body);
  font-weight: 800;
  font-size: 1rem;
  padding: 0.85rem 2.25rem;
  border-radius: 9999px; /* Rounded pill style */
  transition: all 0.2s ease;
  border: none;
  box-shadow: var(--shadow-btn);
}
.btn-primary:hover {
  background: #e04a10;
  transform: translateY(-2px) scale(1.03);
  box-shadow: 0 8px 28px rgba(255, 90, 31, 0.35);
}

/* Bouton Outline (Starlight style) */
.btn-outline {
  background: transparent;
  color: var(--color-dark-forest);
  border: 2.5px solid var(--color-dark-forest);
  font-family: var(--font-body);
  font-weight: 800;
  font-size: 1rem;
  padding: 0.8rem 2.25rem;
  border-radius: 9999px;
  transition: all 0.2s ease;
}
.btn-outline:hover {
  background: var(--color-dark-forest);
  color: #fff;
  transform: translateY(-2px);
}
```

### 5.2 Cards

```css
/* Card standard */
.card {
  background: #fff;
  border-radius: 24px;
  border: 2px solid var(--color-border);
  overflow: hidden;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-heavy);
}

/* Arched photo container classes */
.arched-frame {
  border-radius: 120px 120px 24px 24px;
  overflow: hidden;
  border: 2.5px solid var(--color-dark-forest);
}

.arched-frame-sm {
  border-radius: 80px 80px 16px 16px;
  overflow: hidden;
  border: 2px solid var(--color-dark-forest);
}
```

### 5.3 Badges & Pills

```css
/* Pill de section (label au-dessus des titres) */
.section-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  background: rgba(82, 183, 136, 0.12);
  color: var(--color-accent-green);
  border: 1.5px solid rgba(82, 183, 136, 0.25);
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 0.4rem 1.1rem;
  border-radius: 9999px;
  margin-bottom: 1rem;
}

/* Badge discipline */
.badge-discipline {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  background: var(--discipline-color);
  color: #fff;
}

/* Badge statut admin */
.badge-confirmed { background: #DCFCE7; color: #166534; }
.badge-pending   { background: #FEF9C3; color: #854D0E; }
.badge-waitlist  { background: #F3E8FF; color: #6B21A8; }
.badge-cancelled { background: #FEE2E2; color: #991B1B; }
```

### 5.4 Navigation

```css
/* Navbar */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 4rem;
  background: rgba(13, 27, 42, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255,255,255,0.08);
  display: flex;
  align-items: center;
}

/* Scrolled state */
.navbar.scrolled {
  background: rgba(13, 27, 42, 0.97);
  box-shadow: 0 4px 24px rgba(0,0,0,0.25);
}

/* Nav links */
.nav-link {
  color: rgba(255,255,255,0.75);
  font-size: 0.9375rem;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.15s;
  padding: 0.375rem 0;
}
.nav-link:hover, .nav-link.active {
  color: #fff;
}
.nav-link.active {
  border-bottom: 2px solid var(--color-stem-green);
}
```

### 5.5 Formulaires

```css
/* Input standard */
.input {
  width: 100%;
  background: #fff;
  border: 1.5px solid var(--color-border-strong);
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  font-family: var(--font-body);
  font-size: 0.9375rem;
  color: var(--color-text-primary);
  transition: border-color 0.15s, box-shadow 0.15s;
  outline: none;
}
.input:focus {
  border-color: var(--color-stem-blue-mid);
  box-shadow: 0 0 0 3px rgba(74, 127, 193, 0.15);
}
.input.error {
  border-color: var(--color-error);
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

/* Label */
.label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  margin-bottom: 0.375rem;
  letter-spacing: 0.01em;
}

/* Select */
.select {
  /* Mêmes styles que .input */
  appearance: none;
  background-image: url("data:image/svg+xml,..."); /* chevron SVG */
  background-repeat: no-repeat;
  background-position: right 1rem center;
}

/* Step indicator (formulaire multi-étapes) */
.form-step {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.step-dot {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  transition: all 0.2s;
}
.step-dot.active  { background: var(--color-stem-green); color: #fff; }
.step-dot.done    { background: var(--color-stem-blue-mid); color: #fff; }
.step-connector   { flex: 1; height: 2px; background: var(--color-border); }
.step-connector.done { background: var(--color-stem-blue-mid); }
```

---

## 6. Sections Spécifiques

### 6.1 Hero Section

```
Fond : Image de fond haute définition avec overlay dégradé sombre
Masquage : Diviseur SVG en courbe blanche au bas de la section
Titre : Luckiest Guy, taille géante, centré ou bas-gauche
CTA : Bouton orange d'inscription
Badges : Badges rotatifs animés aux coins inférieurs
```

### 6.2 Section "Discover the Wonder"

```
Fond : var(--color-cream-light)
Mise en page : Titre centré avec photos circulaires d'élèves flottant sur les côtés (animation float CSS)
CTA : Bouton orange "Register Now" au centre
```

### 6.3 Section "A Welcoming Natural Haven Close to Home"

```
Fond : var(--color-cream-light)
Mise en page : 2 colonnes
  - Gauche : Cadre photo arqué (.arched-frame) montrant le campus
  - Droite : H2 + description + liste de puces caractéristiques + vignette arquée secondaire (.arched-frame-sm)
```

### 6.4 Timeline "From Registration to Adventure Journey"

```
Fond : var(--color-dark-forest)
Mise en page : Ligne horizontale ou verticale en pointillés (dash) reliant les étapes numérotées.
Étapes : Bulles colorées avec numéros, titres Gabarito et détails Nunito en blanc.
```

### 6.5 Grille des Espaces du Camp ("Spaces That Make Camp Special")

```
Mise en page : Grille de 3 cartes décrivant les espaces (ex: Science Labs, Robotics Arena, Greenhouse).
Chaque carte : Coins arrondis (24px), photo d'illustration, titre H3 et description textuelle.
```

### 6.6 Grille des Disciplines ("Programs That Inspire")

```
Mise en page : Grille circulaire de photos représentant les 7 disciplines STEM, avec titres et détails.
```

### 6.7 Bannière Sécurité ("Care You Can Count On")

```
Fond : var(--color-dark-forest)
Mise en page : Zone sombre, cadre arqué contenant des photos de tuteurs/sécurité, liste d'arguments clés et bouton CTA orange.
```

### 6.8 Section Témoignages ("From the Parents Who Trusted Us")

```
Fond : var(--color-sage-green)
Mise en page : Cartes blanches avec bordures discrètes affichant les citations de parents d'élèves.
```

### 6.9 Bar de Dates de Sessions ("Dates to Look Forward to")

```
Fond : var(--color-accent-green)
Mise en page : Bandeau coloré avec les détails des sessions MS et HS et un bouton orange CTA.
```

---

## 7. Animations & Motion

```css
/* Fade-in au scroll (IntersectionObserver) */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Stagger sur liste d'items */
.reveal-item:nth-child(1) { transition-delay: 0.05s; }
.reveal-item:nth-child(2) { transition-delay: 0.10s; }
.reveal-item:nth-child(3) { transition-delay: 0.15s; }
.reveal-item:nth-child(4) { transition-delay: 0.20s; }

/* Compteur animé (JS) */
/* countUp({ from: 0, to: target, duration: 2000 }) */

/* Défilement logos partenaires */
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
.logos-track {
  animation: marquee 25s linear infinite;
}
.logos-track:hover { animation-play-state: paused; }

/* Hover card lift */
.card-hover {
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
              box-shadow 0.25s ease;
}
.card-hover:hover {
  transform: translateY(-6px) scale(1.01);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.12);
}
```

---

## 8. Responsive Breakpoints

```css
/* Tailwind-compatible */
--screen-sm:  640px;
--screen-md:  768px;
--screen-lg:  1024px;
--screen-xl:  1280px;
--screen-2xl: 1536px;

/* Règles clés */
@media (max-width: 768px) {
  /* Navigation → hamburger menu */
  /* Grid 4 cols → 1 col */
  /* Tailles fonts : réduites via clamp() */
  /* Cards stacks vertical */
  /* CTA full-width */
  /* Section steps → vertical */
}
```

---

## 9. Icônes

**Librairie recommandée** : Phosphor Icons (`phosphor-react` ou SVG inline)

| Contexte | Icône suggérée |
|---|---|
| Biologie | `Leaf`, `Flask` |
| Chimie | `Flask`, `Atom` |
| Mathématiques | `MathOperations`, `Sigma` |
| Robotique | `Robot`, `Cpu` |
| Réalité Virtuelle | `Goggles`, `CubeFocus` |
| Serre | `Plant`, `Sun` |
| eSports | `GameController`, `Trophy` |
| Inscription | `ClipboardText` |
| Certificat | `Certificate`, `Medal` |
| Partenariat | `Handshake` |
| Financement | `Money`, `Buildings` |
| Sécurité | `ShieldCheck` |
| Téléphone | `Phone` |
| Email | `Envelope` |
| Lieu | `MapPin` |
| Succès | `CheckCircle` |
| Calendrier | `CalendarBlank` |

---

## 10. Tokens Tailwind Config

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        stem: {
          green:    '#6BBF4E',
          'blue-mid': '#4A7FC1',
          'blue-deep': '#2D4E8A',
          purple:   '#7B7EC8',
        },
        dark: '#0D1B2A',
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body:    ['DM Sans', 'sans-serif'],
        mono:    ['Space Mono', 'monospace'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'count-up': 'countUp 2s ease-out forwards',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    }
  }
}
```

---

## 11. Composants Admin (Portail Interne)

### Palette Admin

```css
/* Le portail admin utilise un thème plus sobre */
--admin-bg:       #F8FAFC;
--admin-sidebar:  #0D1B2A;
--admin-header:   #ffffff;
--admin-accent:   var(--color-stem-blue-mid);
--admin-text:     #1E293B;
```

### Layout Admin

```
┌─────────────────────────────────────────────────────────┐
│  Sidebar (240px fixe)  │  Main Content Area              │
│  ─────────────────────  │  ─────────────────────────────  │
│  [Logo]                 │  [Header : page title + actions]│
│  ─────────────────────  │  ─────────────────────────────  │
│  Navigation items       │  [Content : tables, cards, etc] │
│  avec icônes Phosphor   │                                 │
│  ─────────────────────  │                                 │
│  [User info / logout]   │                                 │
└─────────────────────────────────────────────────────────┘
```

### Tableau de données

```css
.data-table {
  width: 100%;
  border-collapse: collapse;
}
.data-table th {
  background: var(--admin-bg);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
  padding: 0.75rem 1rem;
  border-bottom: 2px solid var(--color-border);
  text-align: left;
}
.data-table td {
  padding: 0.875rem 1rem;
  border-bottom: 1px solid var(--color-border);
  font-size: 0.9375rem;
  vertical-align: middle;
}
.data-table tr:hover td {
  background: rgba(74, 127, 193, 0.04);
}
```

---

## 12. Checklist Qualité Design

Avant livraison de chaque page, vérifier :

- [ ] Toutes les couleurs utilisent les CSS variables du design system
- [ ] La hiérarchie typographique est respectée (H1 → H2 → H3 → body)
- [ ] Aucun texte <14px sur fond coloré (contraste WCAG AA)
- [ ] Tous les CTAs ont un état hover visible
- [ ] Les images ont un alt text descriptif
- [ ] La grille est respectée sur desktop ET mobile
- [ ] Les animations ne durent pas plus de 0.6s (sauf compteurs)
- [ ] Le formulaire d'inscription fonctionne sur mobile (test tactile)
- [ ] Le logo Livingstone STEM est visible en blanc sur fond sombre ET en version couleur sur fond clair
- [ ] La page `/funding` contient le formulaire de contact partenariat complet

---

*Design System — STEM Livingstone College | Juin 2026*
