import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { ArticleCard } from "@/components/nexavoz/ArticleCard";
import { PageHero } from "@/components/nexavoz/CategoryPage";
import { searchArticles } from "@/content/repository";

export const Route = createFileRoute("/buscar")({
  validateSearch: z.object({ q: z.string().optional().default("") }),
  head: () => ({
    meta: [
      { title: "Buscar · NEXAVOZ" },
      { name: "description", content: "Busca noticias, artículos y artistas en NEXAVOZ." },
      { property: "og:title", content: "Buscar · NEXAVOZ" },
      { property: "og:description", content: "Busca noticias, artículos y artistas en NEXAVOZ." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Page,
});

function Page() {
  const { q } = Route.useSearch();
  const navigate = useNavigate({ from: "/buscar" });
  const results = searchArticles(q);
  return (
    <>
      <PageHero eyebrow="Buscador" title="Buscar" description="Encuentra piezas por titular, tema o sección." />
      <div className="container-mag">
        <input
          defaultValue={q}
          aria-label="Buscar"
          placeholder="Escribe y pulsa Enter…"
          onKeyDown={(e) => { if (e.key === "Enter") navigate({ search: { q: e.currentTarget.value } }); }}
          className="glass mb-10 h-14 w-full rounded-2xl px-5 text-lg outline-none focus:border-cyan"
        />
        {q && <p className="mb-6 text-sm text-muted-foreground">{results.length} resultado(s) para “{q}”</p>}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((a) => <ArticleCard key={a.slug} article={a} />)}
        </div>
      </div>
    </>
  );
}
