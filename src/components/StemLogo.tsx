// Reusable styled text logo component
// Usage: <StemLogo size="md" variant="color" />

type LogoSize = 'sm' | 'md' | 'lg';
type LogoVariant = 'color' | 'white' | 'dark';

interface StemLogoProps {
  size?: LogoSize;
  variant?: LogoVariant;
  className?: string;
}

const sizeMap: Record<LogoSize, { outer: string; stem: string; sub: string; dot: number }> = {
  sm: { outer: 'h-7', stem: 'text-[18px]', sub: 'text-[8px]', dot: 5 },
  md: { outer: 'h-9', stem: 'text-[22px]', sub: 'text-[9px]', dot: 6 },
  lg: { outer: 'h-12', stem: 'text-[30px]', sub: 'text-[11px]', dot: 8 },
};

export function StemLogo({ size = 'md', variant = 'color', className = '' }: StemLogoProps) {
  const s = sizeMap[size];

  const stemColor = variant === 'white' ? '#FFFFFF' : variant === 'dark' ? '#0F172A' : '#87B67B';
  const accentColor = variant === 'white' ? 'rgba(255,255,255,0.7)' : variant === 'dark' ? '#2D4589' : '#A5A4D4';
  const subColor = variant === 'white' ? 'rgba(255,255,255,0.6)' : variant === 'dark' ? '#64748B' : '#2D4589';
  const dotColor = variant === 'white' ? 'rgba(255,255,255,0.7)' : variant === 'dark' ? '#2D4589' : '#A5A4D4';

  return (
    <span
      className={`inline-flex items-center gap-1.5 select-none ${s.outer} ${className}`}
      aria-label="STEM Camp Livingstone"
    >
      {/* Dot accent */}
      <svg
        width={s.dot}
        height={s.dot}
        viewBox="0 0 8 8"
        fill="none"
        className="shrink-0 mb-0.5"
      >
        <circle cx="4" cy="4" r="4" fill={dotColor} />
      </svg>

      {/* Wordmark */}
      <span className="flex flex-col leading-none">
        {/* STEM in bold display font */}
        <span
          className={`font-display font-black tracking-tight leading-none ${s.stem}`}
          style={{ color: stemColor, letterSpacing: '-0.02em' }}
        >
          STEM
          <span style={{ color: accentColor }}>.</span>
        </span>
        {/* CAMP subtitle */}
        <span
          className={`font-body font-bold uppercase tracking-[0.18em] leading-none mt-[1px] ${s.sub}`}
          style={{ color: subColor }}
        >
          LIVINGSTONE
        </span>
      </span>
    </span>
  );
}
