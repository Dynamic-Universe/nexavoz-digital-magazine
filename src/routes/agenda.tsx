import { createFileRoute } from "@tanstack/react-router";
import { PageHero, seo } from "@/components/nexavoz/CategoryPage";
import { DemoBadge } from "@/components/nexavoz/Brand";
import { getEvents } from "@/content/repository";

export const Route = createFileRoute("/agenda")({
  head: () => seo("Agenda", "Festivales, talleres, debates y directos de música e IA."),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero eyebrow="Calendario" title="Agenda" description="Festivales, talleres, debates y directos. Eventos de ejemplo hasta conectar la agenda real." />
      <ol className="container-mag divide-y border-y">
        {getEvents().map((e) => {
          const d = new Date(e.date + "T12:00:00Z");
          return (
            <li key={e.id} className="grid grid-cols-[auto_1fr] items-center gap-6 py-6 transition hover:bg-card/40 md:grid-cols-[120px_1fr_auto]">
              <div className="text-center">
                <p className="font-display text-4xl font-bold text-brand">{d.getUTCDate()}</p>
                <p className="eyebrow text-muted-foreground">{d.toLocaleDateString("es-ES", { month: "short" })}</p>
              </div>
              <div>
                <div className="flex items-center gap-2"><span className="eyebrow text-cyan">{e.type}</span>{e.isDemo && <DemoBadge />}</div>
                <h2 className="mt-1 text-lg font-semibold md:text-xl">{e.title}</h2>
                <p className="text-sm text-muted-foreground">{e.venue} · {e.city}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </>
  );
}
