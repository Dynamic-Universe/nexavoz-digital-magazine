import type { CategorySlug } from "@/content/types";
import { getArticlesByCategory, getCategory } from "@/content/repository";
import { ArticleCard } from "./ArticleCard";
import { VerificationSheet } from "./VerificationSheet";

export function PageHero({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <section className="container-mag pb-10 pt-14 md:pt-20">
      <p className="eyebrow text-magenta">{eyebrow}</p>
      <h1 className="mt-3 max-w-4xl text-4xl font-bold leading-[1.05] md:text-7xl">
        <span className="text-metal">{title}</span>
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{description}</p>
      <div className="rule-brand mt-10 w-24" />
    </section>
  );
}

export function CategoryPage({ slug }: { slug: CategorySlug }) {
  const cat = getCategory(slug);
  const list = getArticlesByCategory(slug);
  const isNews = slug === "noticias";
  return (
    <>
      <PageHero eyebrow="Sección NEXAVOZ" title={cat.name} description={cat.description} />
      <div className="container-mag">
        {isNews && (
          <div className="mb-10 flex flex-wrap gap-3 text-xs">
            <span className="rounded-full border border-confirmed/50 px-3 py-1 text-confirmed">● Confirmado</span>
            <span className="rounded-full border border-statement/50 px-3 py-1 text-statement">● Declaración</span>
            <span className="rounded-full border border-forecast/50 px-3 py-1 text-forecast">● Previsión</span>
            <span className="px-1 py-1 text-muted-foreground">No publicamos rumores como hechos.</span>
          </div>
        )}
        {list.length === 0 ? (
          <p className="text-muted-foreground">Aún no hay publicaciones en esta sección.</p>
        ) : isNews ? (
          <div className="space-y-12">
            {list.map((a) => (
              <div key={a.slug} className="grid gap-6 lg:grid-cols-2">
                <ArticleCard article={a} />
                {a.verification && <VerificationSheet v={a.verification} compact />}
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((a) => <ArticleCard key={a.slug} article={a} />)}
          </div>
        )}
      </div>
    </>
  );
}

export const seo = (title: string, description: string) => ({
  meta: [
    { title: `${title} · NEXAVOZ` },
    { name: "description", content: description },
    { property: "og:title", content: `${title} · NEXAVOZ` },
    { property: "og:description", content: description },
  ],
});
