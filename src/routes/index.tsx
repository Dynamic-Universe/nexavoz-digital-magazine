import { createFileRoute, Link } from "@tanstack/react-router";
import { ArticleCard } from "@/components/nexavoz/ArticleCard";
import { CategoryTag, DemoBadge } from "@/components/nexavoz/Brand";
import { EresArtista } from "@/components/nexavoz/EresArtista";
import { Masthead, SectionDivider } from "@/components/nexavoz/Masthead";
import { VerificationSheet } from "@/components/nexavoz/VerificationSheet";
import { formatDate, getArticles, getArticlesByCategory, getCategory, getFeatured } from "@/content/repository";
import type { Article } from "@/content/types";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NEXAVOZ · AI Music Digital Magazine — Nº 01" },
      { name: "description", content: "Revista digital de música, tecnología e inteligencia artificial. IA + HUMANO." },
      { property: "og:title", content: "NEXAVOZ · AI Music Digital Magazine" },
      { property: "og:description", content: "Revista digital de música, tecnología e inteligencia artificial. IA + HUMANO." },
      { property: "og:type", content: "magazine" },
    ],
  }),
  component: Home,
});

function Home() {
  const f = getFeatured();
  if (!f) return null;
  const latest = getArticles().filter((a) => a.slug !== f.slug).slice(0, 6);
  const news = getArticlesByCategory("noticias", 2);
  const mia = getArticlesByCategory("musica-ia", 2);
  const articulos = getArticlesByCategory("articulos", 2);
  const rep = getArticlesByCategory("reportajes", 2);
  const entrevistas = getArticlesByCategory("entrevistas", 2);
  const critica = getArticlesByCategory("critica", 2);
  const lab = getArticlesByCategory("lab", 2);
  const cartas = getArticlesByCategory("cartas", 2);

  return (
    <>
      <Masthead />

      {/* ===== PORTADA ===== */}
      <section className="container-mag mt-8 md:mt-12" aria-label="Portada del número">
        <Link to="/articulo/$slug" params={{ slug: f.slug }} className="group relative block overflow-hidden rounded-3xl border">
          <img
            src={f.image.src}
            alt={f.image.alt}
            width={f.image.width}
            height={f.image.height}
            className="aspect-[4/5] w-full object-cover transition duration-[1.5s] group-hover:scale-105 sm:aspect-[16/9]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-transparent" />
          <p className="eyebrow absolute right-5 top-5 rounded-full border border-magenta/60 bg-background/60 px-4 py-1.5 text-magenta backdrop-blur">
            Portada
          </p>
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-12">
            <div className="flex items-center gap-3">
              <CategoryTag name={getCategory(f.category).name} />
              {f.isDemo && <DemoBadge />}
            </div>
            <h2 className="mt-4 max-w-4xl text-3xl font-bold leading-[1.05] md:text-6xl">
              <span className="text-metal">{f.title}</span>
            </h2>
            <p className="mt-4 max-w-2xl text-base text-foreground/80 md:text-lg">{f.excerpt}</p>
            <p className="mt-4 text-xs text-muted-foreground">
              {f.author.name} · {formatDate(f.date)} · {f.readingMinutes} min de lectura
            </p>
          </div>
        </Link>
      </section>

      {/* ===== SUMARIO DEL NÚMERO ===== */}
      <section className="container-mag mt-20" aria-label="En este número">
        <SectionDivider index={1} eyebrow="Sumario" title="En este número" />
        <ol className="grid gap-x-10 md:grid-cols-2 lg:grid-cols-3">
          {latest.map((a, i) => (
            <li key={a.slug}>
              <Link to="/articulo/$slug" params={{ slug: a.slug }} className="group flex gap-4 border-b py-5">
                <span className="font-display text-2xl font-bold text-brand">{String(i + 2).padStart(2, "0")}</span>
                <span>
                  <span className="eyebrow text-cyan">{getCategory(a.category).name}</span>
                  <span className="mt-1 block font-semibold leading-snug transition group-hover:text-cyan">{a.title}</span>
                  <span className="mt-1 block text-xs text-muted-foreground">
                    {a.author.name} · {formatDate(a.date)}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {/* ===== NOTICIAS con ficha editorial ===== */}
      <section className="container-mag mt-24" aria-label="Noticias">
        <SectionDivider
          index={2}
          eyebrow="Actualidad verificada"
          title="Noticias"
          to="/noticias"
          description="Cada noticia lleva su ficha: fuente primaria, fecha, y qué está confirmado, declarado o es previsión."
        />
        <div className="mb-8 flex flex-wrap gap-3 text-xs">
          <span className="rounded-full border border-confirmed/50 px-3 py-1 text-confirmed">● Confirmado</span>
          <span className="rounded-full border border-statement/50 px-3 py-1 text-statement">● Declaración</span>
          <span className="rounded-full border border-forecast/50 px-3 py-1 text-forecast">● Previsión</span>
          <span className="px-1 py-1 text-muted-foreground">No publicamos rumores como hechos.</span>
        </div>
        <div className="space-y-12">
          {news.map((a) => (
            <div key={a.slug} className="grid gap-6 lg:grid-cols-2">
              <ArticleCard article={a} />
              {a.verification && <VerificationSheet v={a.verification} compact />}
            </div>
          ))}
        </div>
      </section>

      {/* ===== MÚSICA & IA — bloque destacado ===== */}
      <section className="container-mag mt-24" aria-label="Música e inteligencia artificial">
        <div className="relative overflow-hidden rounded-3xl border p-8 md:p-14">
          <div className="absolute inset-0 -z-10 opacity-30 bg-brand blur-3xl" aria-hidden />
          <p className="eyebrow text-cyan">El corazón de la revista</p>
          <h2 className="font-display mt-3 text-4xl font-bold md:text-6xl">
            <span className="text-brand">Música & IA</span>
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Creación, modelos y escucha en la era algorítmica. Qué hace la máquina, qué decide la persona.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {mia.map((a) => (
              <ArticleCard key={a.slug} article={a} variant="horizontal" />
            ))}
          </div>
        </div>
      </section>

      <Band index={3} eyebrow="Análisis y ensayo" title="Artículos" to="/articulos" items={articulos} />
      <Band index={4} eyebrow="Largo formato" title="Reportajes" to="/reportajes" items={rep} />
      <Band index={5} eyebrow="Conversaciones" title="Entrevistas" to="/entrevistas" items={entrevistas} />
      <Band index={6} eyebrow="Bajo la lupa" title="Crítica & Reseñas" to="/critica" items={critica} />

      <EresArtista />

      {/* ===== NEXAVOZ LAB ===== */}
      <section className="container-mag mt-24" aria-label="NEXAVOZ LAB">
        <SectionDivider
          index={7}
          eyebrow="Experimentos de la redacción"
          title="NEXAVOZ LAB"
          to="/lab"
          description="Probamos herramientas, documentamos cada paso y contamos qué hizo la máquina y qué hicimos nosotros."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {lab.map((a) => (
            <ArticleCard key={a.slug} article={a} variant="horizontal" />
          ))}
        </div>
      </section>

      {/* ===== CARTAS AL DIRECTOR ===== */}
      <section className="container-mag mt-24" aria-label="Cartas al Director">
        <SectionDivider
          index={8}
          eyebrow="La voz de quienes nos leen"
          title="Cartas al Director"
          to="/cartas"
        />
        <div className="grid gap-6 md:grid-cols-2">
          {cartas.map((c) => (
            <Link
              key={c.slug}
              to="/articulo/$slug"
              params={{ slug: c.slug }}
              className="glass card-neon rounded-2xl p-8"
            >
              <p className="font-serif text-2xl italic leading-snug md:text-3xl">{c.title}</p>
              <p className="mt-4 text-sm text-muted-foreground">{c.excerpt}</p>
              <p className="eyebrow mt-6 text-magenta">{c.author.name}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

function Band({
  index,
  eyebrow,
  title,
  to,
  items,
}: {
  index: number;
  eyebrow: string;
  title: string;
  to: string;
  items: Article[];
}) {
  if (items.length === 0) return null;
  return (
    <section className="container-mag mt-24" aria-label={title}>
      <SectionDivider index={index} eyebrow={eyebrow} title={title} to={to} />
      <div className="grid gap-6 md:grid-cols-2">
        {items.map((a) => (
          <ArticleCard key={a.slug} article={a} variant="horizontal" />
        ))}
      </div>
    </section>
  );
}
