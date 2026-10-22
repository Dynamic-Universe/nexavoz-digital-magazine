import { createFileRoute } from "@tanstack/react-router";
import { PageHero, seo } from "@/components/nexavoz/CategoryPage";
import { DemoBadge } from "@/components/nexavoz/Brand";
import { ArticleCard } from "@/components/nexavoz/ArticleCard";
import { EresArtista } from "@/components/nexavoz/EresArtista";
import { getArticlesByCategory, getArtists } from "@/content/repository";

export const Route = createFileRoute("/artistas")({
  head: () => seo("Artistas", "Perfiles de creadores humanos e híbridos en NEXAVOZ."),
  component: Page,
});

function Page() {
  const interviews = getArticlesByCategory("entrevistas", 3);
  return (
    <>
      <PageHero eyebrow="Escena" title="Artistas" description="Perfiles de creadores humanos e híbridos. Indicamos siempre el grado de uso de IA declarado." />
      <div className="container-mag grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {getArtists().map((a) => (
          <article key={a.id} className="glass card-neon overflow-hidden rounded-2xl">
            <img src={a.image.src} alt={a.image.alt} loading="lazy" className="aspect-square w-full object-cover" />
            <div className="p-5">
              <div className="flex items-center gap-2"><span className="eyebrow text-magenta">{a.discipline}</span>{a.isDemo && <DemoBadge />}</div>
              <h2 className="mt-2 text-xl font-bold">{a.name}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{a.bio}</p>
              <p className="mt-4 inline-block rounded-full border px-3 py-1 text-xs">Uso de IA: {a.aiUse}</p>
            </div>
          </article>
        ))}
      </div>
      {interviews.length > 0 && (
        <div className="container-mag mt-16 grid gap-6 md:grid-cols-3">
          {interviews.map((a) => <ArticleCard key={a.slug} article={a} />)}
        </div>
      )}
      <EresArtista />
    </>
  );
}
