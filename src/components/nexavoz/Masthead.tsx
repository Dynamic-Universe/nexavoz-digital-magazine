import { Link } from "@tanstack/react-router";
import { mainNav } from "./nav";

/**
 * Magazine masthead: the NEXAVOZ nameplate, edition line and table of contents.
 * Uses the project's existing brand mark (Brand.tsx) as identity — this is the cover treatment.
 */
export function Masthead() {
  const today = new Date().toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="container-mag pt-6 md:pt-10" aria-label="Mancheta NEXAVOZ">
      {/* Edition line */}
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
        <span>Nº 01 · Edición Octubre 2026</span>
        <span className="hidden capitalize sm:inline">{today}</span>
        <span className="text-brand font-semibold">IA + HUMANO</span>
      </div>
      <div className="rule-brand mt-3 opacity-70" />

      {/* Nameplate */}
      <div className="py-8 text-center md:py-12">
        <p className="eyebrow text-magenta">AI Music · Digital Magazine</p>
        <h1 className="font-display mt-3 text-[15vw] font-bold leading-[0.95] tracking-tight sm:text-[12vw] lg:text-[8.5rem]">
          <span className="text-metal">NEXAVOZ</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground md:text-base">
          La revista de la música en la era algorítmica. La máquina propone; la persona decide qué merece sonar.
        </p>
      </div>
      <div className="rule-brand opacity-70" />

      {/* Sumario — table of contents strip */}
      <nav aria-label="Sumario" className="overflow-x-auto">
        <ul className="flex min-w-max items-stretch divide-x">
          {mainNav.slice(0, 10).map((n, i) => (
            <li key={n.to}>
              <Link
                to={n.to}
                className="group flex items-baseline gap-2 px-4 py-3 transition-colors hover:bg-secondary/60"
              >
                <span className="font-display text-[0.6rem] text-magenta">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-xs uppercase tracking-[0.14em] text-foreground/80 transition group-hover:text-cyan">
                  {n.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="border-b" />
    </section>
  );
}

/** Numbered editorial section divider. */
export function SectionDivider({
  index,
  eyebrow,
  title,
  to,
  description,
}: {
  index: number;
  eyebrow: string;
  title: string;
  to?: string;
  description?: string;
}) {
  return (
    <div className="mb-10">
      <div className="flex items-end justify-between gap-6">
        <div className="flex items-baseline gap-4 md:gap-6">
          <span className="font-display text-4xl font-bold text-brand md:text-6xl">
            {String(index).padStart(2, "0")}
          </span>
          <div>
            <p className="eyebrow text-magenta">{eyebrow}</p>
            <h2 className="mt-1 text-2xl font-bold md:text-4xl">{title}</h2>
          </div>
        </div>
        {to && (
          <Link
            to={to}
            className="eyebrow shrink-0 rounded-full border px-4 py-2 text-foreground/80 transition hover:border-cyan hover:text-cyan"
          >
            Ver sección →
          </Link>
        )}
      </div>
      {description && <p className="mt-3 max-w-2xl text-sm text-muted-foreground">{description}</p>}
      <div className="rule-brand mt-6 opacity-60" />
    </div>
  );
}
