import { Link } from "@tanstack/react-router";

/**
 * Brand slot. Pass `src` with the official NEXAVOZ PNG to replace the vector placeholder:
 *   <BrandLogo src={logoPng} />
 */
export function BrandLogo({ src, compact = false }: { src?: string; compact?: boolean }) {
  return (
    <Link to="/" aria-label="NEXAVOZ — inicio" className="group inline-flex items-center gap-2.5">
      {src ? (
        <img src={src} alt="NEXAVOZ" className={compact ? "h-8 w-auto" : "h-10 w-auto"} />
      ) : (
        <>
          <svg viewBox="0 0 40 40" className={compact ? "h-8 w-8" : "h-10 w-10"} aria-hidden>
            <defs>
              <linearGradient id="nx-g" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="var(--neon-cyan)" />
                <stop offset="0.5" stopColor="var(--neon-blue)" />
                <stop offset="1" stopColor="var(--neon-magenta)" />
              </linearGradient>
            </defs>
            <path d="M8 32V8l24 24V8" fill="none" stroke="url(#nx-g)" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 20h3l2-5 3 10 2-5" fill="none" stroke="var(--neon-cyan)" strokeWidth="1.6" strokeLinecap="round" className="opacity-80" />
            <path d="M28 20l2-5 3 10 2-5h3" fill="none" stroke="var(--neon-magenta)" strokeWidth="1.6" strokeLinecap="round" className="opacity-80" />
          </svg>
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-bold tracking-[0.12em] text-metal md:text-xl">NEXAVOZ</span>
            {!compact && <span className="eyebrow mt-1 text-[0.5rem] text-muted-foreground">AI Music · Digital Magazine</span>}
          </span>
        </>
      )}
    </Link>
  );
}

export function DemoBadge() {
  return (
    <span className="eyebrow inline-flex items-center rounded-full border border-forecast/50 px-2 py-0.5 text-[0.55rem] text-forecast">
      Demo
    </span>
  );
}

export function CategoryTag({ name }: { name: string }) {
  return <span className="eyebrow text-cyan">{name}</span>;
}
