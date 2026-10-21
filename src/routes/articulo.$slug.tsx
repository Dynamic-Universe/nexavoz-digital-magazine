import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { BookOpen, Sparkles } from "lucide-react";
import { useState } from "react";
import { ArticleCard } from "@/components/nexavoz/ArticleCard";
import { CategoryTag, DemoBadge } from "@/components/nexavoz/Brand";
import { VerificationSheet } from "@/components/nexavoz/VerificationSheet";
import { formatDate, getArticle, getCategory, getRelated } from "@/content/repository";
import type { Block } from "@/content/types";

export const Route = createFileRoute("/articulo/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) =>
    loaderData
      ? {
          meta: [
            { title: `${loaderData.article.title} · NEXAVOZ` },
            { name: "description", content: loaderData.article.excerpt },
            { property: "og:title", content: loaderData.article.title },
            { property: "og:description", content: loaderData.article.excerpt },
            { property: "og:type", content: "article" },
          ],
        }
      : { meta: [{ title: "No disponible · NEXAVOZ" }, { name: "robots", content: "noindex" }] },
  component: ArticlePage,
});

function ArticlePage() {
  const { article: a } = Route.useLoaderData();
  const [reading, setReading] = useState(false);
  const cat = getCategory(a.category);
  const related = getRelated(a.slug);

  return (
    <article className={reading ? "reading-mode min-h-screen pb-20" : ""}>
      <div className="container-mag pt-10 md:pt-14">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <nav aria-label="Ruta" className={`text-xs ${reading ? "opacity-70" : "text-muted-foreground"}`}>
            <Link to="/" className="hover:underline">Inicio</Link> / <Link to={`/${a.category}`} className="hover:underline">{cat.name}</Link>
          </nav>
          <button
            onClick={() => setReading((r) => !r)}
            aria-pressed={reading}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${reading ? "border-ink/30" : "hover:border-cyan"}`}
          >
            {reading ? <Sparkles className="h-4 w-4" /> : <BookOpen className="h-4 w-4" />}
            {reading ? "Volver a modo NEXAVOZ" : "Modo lectura"}
          </button>
        </div>

        <header className="mx-auto mt-10 max-w-4xl text-center">
          <div className="flex items-center justify-center gap-3"><CategoryTag name={cat.name} />{a.isDemo && <DemoBadge />}</div>
          <h1 className={`mt-5 text-3xl font-bold leading-[1.08] md:text-6xl ${reading ? "" : "text-metal"}`}>{a.title}</h1>
          <p className={`mx-auto mt-5 max-w-2xl text-lg md:text-xl ${reading ? "font-serif opacity-80" : "text-muted-foreground"}`}>{a.excerpt}</p>
          <p className={`mt-6 text-sm ${reading ? "opacity-70" : "text-muted-foreground"}`}>
            Por <strong>{a.author.name}</strong> · {a.author.role} · <time dateTime={a.date}>{formatDate(a.date)}</time> · {a.readingMinutes} min
          </p>
        </header>

        <figure className="mx-auto mt-10 max-w-6xl">
          <img src={a.image.src} alt={a.image.alt} width={a.image.width} height={a.image.height} className="aspect-[16/9] w-full rounded-2xl object-cover" />
          <figcaption className={`mt-3 text-xs ${reading ? "opacity-70" : "text-muted-foreground"}`}>
            {a.image.caption ?? a.image.alt}{a.image.credit && <> · <span>{a.image.credit}</span></>}
          </figcaption>
        </figure>

        <div className="mx-auto mt-12 grid max-w-6xl gap-12 lg:grid-cols-12">
          <aside className="order-2 space-y-6 lg:order-1 lg:col-span-4">
            <div className="lg:sticky lg:top-28 space-y-6">
              {a.verification && <VerificationSheet v={a.verification} compact />}
              <div className={`rounded-2xl border p-5 ${reading ? "border-ink/15" : "glass"}`}>
                <p className="eyebrow text-magenta">Fuentes</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {(a.sources ?? (a.verification ? [{ label: a.verification.primarySource, url: a.verification.sourceUrl }] : [{ label: "Sin fuentes externas (pieza de opinión/demo)" }])).map((s) => (
                    <li key={s.label}>{s.url ? <a href={s.url} target="_blank" rel="noreferrer" className="underline">{s.label}</a> : s.label}</li>
                  ))}
                </ul>
              </div>
              {a.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">{a.tags.map((t) => <span key={t} className="rounded-full border px-3 py-1 text-xs">#{t}</span>)}</div>
              )}
            </div>
          </aside>
          <div className={`prose-body order-1 text-lg leading-relaxed lg:order-2 lg:col-span-8 ${reading ? "" : "text-foreground/90"}`}>
            {a.body.map((b, i) => <BodyBlock key={i} b={b} reading={reading} />)}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="container-mag mt-20">
          <div className={`rule-brand mb-10 w-24`} />
          <h2 className="mb-8 text-2xl font-bold md:text-3xl">Sigue leyendo</h2>
          <div className={`grid gap-6 md:grid-cols-3 ${reading ? "text-foreground" : ""}`}>
            {related.map((r) => <ArticleCard key={r.slug} article={r} />)}
          </div>
        </section>
      )}
    </article>
  );
}

function BodyBlock({ b, reading }: { b: Block; reading: boolean }) {
  switch (b.type) {
    case "p": return <p>{b.text}</p>;
    case "h2": return <h2 className="mb-4 mt-10 font-display text-2xl font-bold">{b.text}</h2>;
    case "quote":
      return (
        <blockquote className="my-10 border-l-2 border-magenta pl-6">
          <p className={`font-serif text-2xl italic leading-snug md:text-3xl ${reading ? "" : "text-brand"}`}>“{b.text}”</p>
          {b.cite && <cite className="mt-3 block text-sm not-italic opacity-70">— {b.cite}</cite>}
        </blockquote>
      );
    case "highlight":
      return (
        <div className={`my-10 rounded-2xl border p-6 ${reading ? "border-ink/15" : "glass shadow-[var(--shadow-neon)]"}`}>
          <p className="eyebrow text-cyan">{b.title}</p>
          <p className="mt-2 text-base">{b.text}</p>
        </div>
      );
    case "media":
      return b.media.kind === "audio"
        ? <audio controls src={b.media.src} className="my-8 w-full" aria-label={b.media.title} />
        : <video controls src={b.media.src} className="my-8 w-full rounded-2xl" aria-label={b.media.title} />;
  }
}
