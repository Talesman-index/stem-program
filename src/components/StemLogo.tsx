// Reusable logo component rendering the brand logo image
// Usage: <StemLogo size="md" variant="color" />

type LogoSize = 'sm' | 'md' | 'lg';
type LogoVariant = 'color' | 'white' | 'dark';
type LogoLayout = 'horizontal' | 'vertical' | 'auto';

interface StemLogoProps {
  size?: LogoSize;
  variant?: LogoVariant;
  layout?: LogoLayout;
  className?: string;
}

// Custom SVG Dome Icon of F. George Shipman Science Annex
function ScienceAnnexDomeIcon({ className = '', style = {} }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 100 85"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`stroke-current ${className}`}
      style={{ strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', ...style }}
    >
      {/* Upper curved dome roof top */}
      <path d="M 12 32 C 12 10, 88 10, 88 32" />
      
      {/* Inner pane curve ceiling line */}
      <path d="M 15 38 C 15 18, 85 18, 85 38" />

      {/* Horizontal window grid line */}
      <path d="M 14 26 C 14 14, 86 14, 86 26" />

      {/* Vertical window panes grid line */}
      <path d="M 23 20 L 23 35" />
      <path d="M 37 14 L 37 32" />
      <path d="M 50 12 L 50 31" />
      <path d="M 63 14 L 63 32" />
      <path d="M 77 20 L 77 35" />

      {/* Lower roof arch trim */}
      <path d="M 8 38 C 8 20, 92 20, 92 38" />

      {/* Support pillars/columns below the glass dome */}
      {/* Left column */}
      <path d="M 12 38 L 9 70 L 16 71 L 18 38 Z" fill="currentColor" fillOpacity="0.05" />
      {/* Right column */}
      <path d="M 88 38 L 91 70 L 84 71 L 82 38 Z" fill="currentColor" fillOpacity="0.05" />
      {/* Center column */}
      <path d="M 46 37 L 46 73 L 54 73 L 54 37 Z" fill="currentColor" fillOpacity="0.1" />

      {/* Facade wall partitions */}
      {/* Left partition */}
      <path d="M 18 38 L 18 70 L 46 70 L 46 37" />
      {/* Right partition */}
      <path d="M 82 38 L 82 70 L 54 70 L 54 37" />

      {/* Base/Foundation Curve */}
      <path d="M 9 70 C 30 73, 70 73, 91 70" />
    </svg>
  );
}

export function StemLogo({
  size = 'md',
  variant = 'color',
  layout = 'auto',
  className = '',
}: StemLogoProps) {
  const resolvedLayout = layout === 'auto' ? (size === 'lg' ? 'vertical' : 'horizontal') : layout;

  // Size mapping for the SVG icon
  const iconSizeClass =
    resolvedLayout === 'vertical'
      ? { sm: 'w-12 h-12', md: 'w-16 h-16', lg: 'w-24 h-24' }[size]
      : { sm: 'w-8 h-8', md: 'w-9 h-9', lg: 'w-14 h-14' }[size];

  // Dynamic colors based on variant
  const colors = {
    color: {
      dome: '#AB80FF', // Excellence Purple
      stem: '#6CAB53', // Innovative Green
      text: '#241765', // Professional Blue
    },
    white: {
      dome: '#FFFFFF',
      stem: '#FFFFFF',
      text: '#FFFFFF',
    },
    dark: {
      dome: '#000000',
      stem: '#000000',
      text: '#000000',
    },
  }[variant];

  if (resolvedLayout === 'horizontal') {
    // Top text size configurations
    const stemTextClass = {
      sm: 'text-[11px] tracking-[0.22em] mr-[-0.22em]',
      md: 'text-[13px] tracking-[0.25em] mr-[-0.25em]',
      lg: 'text-[18px] tracking-[0.28em] mr-[-0.28em]',
    }[size];

    // Bottom text size configurations
    const collegeTextClass = {
      sm: 'text-[8px] tracking-[0.06em] leading-none mt-0.5',
      md: 'text-[9.5px] tracking-[0.08em] leading-none mt-0.5',
      lg: 'text-[13px] tracking-[0.1em] leading-none mt-1',
    }[size];

    return (
      <div className={`flex items-center gap-2.5 font-display select-none ${className}`}>
        <ScienceAnnexDomeIcon className={iconSizeClass} style={{ color: colors.dome }} />
        <div className="flex flex-col justify-center text-left">
          <span
            className={`font-black uppercase leading-none ${stemTextClass}`}
            style={{ color: colors.stem }}
          >
            S·T·E·M
          </span>
          <span
            className={`font-bold uppercase ${collegeTextClass}`}
            style={{ color: colors.text }}
          >
            LIVINGSTONE COLLEGE
          </span>
        </div>
      </div>
    );
  }

  // Vertical Stacked Layout (standard print logo replication)
  const stemTextClass = {
    sm: 'text-xs tracking-[0.28em] mr-[-0.28em]',
    md: 'text-sm tracking-[0.3em] mr-[-0.3em]',
    lg: 'text-xl tracking-[0.32em] mr-[-0.32em]',
  }[size];

  const subTextClass = {
    sm: 'text-[8.5px] tracking-[0.12em]',
    md: 'text-[10px] tracking-[0.15em]',
    lg: 'text-sm tracking-[0.18em]',
  }[size];

  return (
    <div className={`flex flex-col items-center text-center font-display select-none ${className}`}>
      <ScienceAnnexDomeIcon className={iconSizeClass} style={{ color: colors.dome, marginBottom: '0.25rem' }} />
      <span
        className={`font-black uppercase leading-none mb-1 ${stemTextClass}`}
        style={{ color: colors.stem }}
      >
        S·T·E·M
      </span>
      <div className={`flex flex-col items-center leading-none ${subTextClass}`} style={{ color: colors.text }}>
        <span className="font-extrabold uppercase">LIVINGSTONE</span>
        <span className="font-extrabold uppercase mt-0.5">COLLEGE</span>
      </div>
    </div>
  );
}

