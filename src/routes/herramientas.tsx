import { createFileRoute } from "@tanstack/react-router";
import { PageHero, seo } from "@/components/nexavoz/CategoryPage";
import { DemoBadge } from "@/components/nexavoz/Brand";
import { getTools } from "@/content/repository";

export const Route = createFileRoute("/herramientas")({
  head: () => seo("Herramientas", "Directorio de herramientas de música, IA y producción."),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero eyebrow="Directorio" title="Herramientas" description="Categorías de herramientas para crear, mezclar y verificar. Las fichas de productos reales se añadirán tras analizarlos." />
      <div className="container-mag grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {getTools().map((t) => (
          <article key={t.id} className="glass card-neon rounded-2xl p-6">
            <div className="flex items-center justify-between"><span className="eyebrow text-cyan">{t.kind}</span>{t.isDemo && <DemoBadge />}</div>
            <h2 className="mt-4 text-xl font-bold">{t.name}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{t.description}</p>
          </article>
        ))}
      </div>
    </>
  );
}
