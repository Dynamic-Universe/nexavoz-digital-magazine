import { CheckCircle2, MessageSquareQuote, TrendingUp, ExternalLink } from "lucide-react";
import type { Verification } from "@/content/types";
import { formatDate } from "@/content/repository";

export function VerificationSheet({ v, compact = false }: { v: Verification; compact?: boolean }) {
  const groups = [
    { key: "c", label: "Confirmado", hint: "Hecho verificado en fuente primaria", items: v.confirmed, Icon: CheckCircle2, cls: "border-confirmed/40 text-confirmed" },
    { key: "s", label: "Declaración de la fuente", hint: "Lo que afirma la fuente; no verificado de forma independiente", items: v.statements, Icon: MessageSquareQuote, cls: "border-statement/40 text-statement" },
    { key: "f", label: "Previsión", hint: "Futuro o estimación; puede no cumplirse", items: v.forecasts, Icon: TrendingUp, cls: "border-forecast/40 text-forecast" },
  ];
  return (
    <aside aria-label="Ficha editorial" className="glass rounded-2xl p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="eyebrow text-cyan">Ficha editorial NEXAVOZ</p>
        <span className="text-xs text-muted-foreground">{formatDate(v.sourceDate)}</span>
      </div>
      <dl className="mt-3 text-sm">
        <dt className="text-muted-foreground">Fuente primaria</dt>
        <dd className="font-semibold">{v.primarySource}</dd>
      </dl>
      <div className={`mt-4 grid gap-3 ${compact ? "" : "md:grid-cols-3"}`}>
        {groups.map(({ key, label, hint, items, Icon, cls }) => (
          <section key={key} className={`rounded-xl border bg-background/40 p-3 ${cls.split(" ")[0]}`}>
            <h4 className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider ${cls.split(" ")[1]}`}>
              <Icon className="h-3.5 w-3.5" /> {label}
            </h4>
            <p className="mt-1 text-[0.7rem] text-muted-foreground">{hint}</p>
            <ul className={`mt-2 space-y-1.5 text-sm ${key === "c" ? "" : "italic"}`}>
              {items.length ? items.map((t) => <li key={t}>{t}</li>) : <li className="text-muted-foreground">—</li>}
            </ul>
          </section>
        ))}
      </div>
      {v.sourceUrl ? (
        <a href={v.sourceUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1 text-sm text-cyan hover:underline">
          Ver fuente original <ExternalLink className="h-3.5 w-3.5" />
        </a>
      ) : (
        <p className="mt-4 text-xs text-muted-foreground">Enlace a la fuente: pendiente (contenido demo).</p>
      )}
    </aside>
  );
}
