import { createFileRoute, Link } from "@tanstack/react-router";
import { ArticleCard, SectionHeader } from "@/components/nexavoz/ArticleCard";
import { CategoryTag, DemoBadge } from "@/components/nexavoz/Brand";
import { formatDate, getArticles, getArticlesByCategory, getArtists, getCategory, getFeatured } from "@/content/repository";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NEXAVOZ · AI Music Digital Magazine" },
      { name: "description", content: "Revista digital de música, tecnología e inteligencia artificial. IA + HUMANO." },
      { property: "og:title", content: "NEXAVOZ · AI Music Digital Magazine" },
      { property: "og:description", content: "Revista digital de música, tecnología e inteligencia artificial. IA + HUMANO." },
    ],
  }),
  component: Home,
});

function Home() {
  const f = getFeatured();
  const latest = getArticles().filter((a) => a.slug !== f.slug).slice(0, 4);
  const news = getArticlesByCategory("noticias", 3);
  const mia = getArticlesByCategory("musica-ia", 2);
  const daw = getArticlesByCategory("daw-tecnologia", 2);
  const rep = getArticlesByCategory("reportajes", 2);
  const lab = getArticlesByCategory("lab", 2);
  const cartas = getArticlesByCategory("cartas", 2);

  return (
    <>
      {/* Hero */}
      <section className="container-mag pt-8 md:pt-12">
        <div className="mb-6 flex items-center justify-between text-xs text-muted-foreground">
          <span className="eyebrow">Edición digital · Octubre 2026</span>
          <span className="eyebrow hidden text-brand sm:inline">IA + HUMANO</span>
        </div>
        <Link to="/articulo/$slug" params={{ slug: f.slug }} className="group relative block overflow-hidden rounded-3xl border">
          <img src={f.image.src} alt={f.image.alt} width={f.image.width} height={f.image.height} className="aspect-[4/5] w-full object-cover transition duration-[1.5s] group-hover:scale-105 sm:aspect-[16/9]" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-12">
            <div className="flex items-center gap-3"><CategoryTag name={getCategory(f.category).name} />{f.isDemo && <DemoBadge />}</div>
            <h1 className="mt-4 max-w-4xl text-3xl font-bold leading-[1.05] md:text-6xl"><span className="text-metal">{f.title}</span></h1>
            <p className="mt-4 max-w-2xl text-base text-foreground/80 md:text-lg">{f.excerpt}</p>
            <p className="mt-4 text-xs text-muted-foreground">{f.author.name} · {formatDate(f.date)} · {f.readingMinutes} min</p>
          </div>
        </Link>
      </section>

      {/* Latest */}
      <section className="container-mag mt-20">
        <SectionHeader eyebrow="Ahora" title="Últimas noticias" to="/noticias" />
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-8">
            {latest.map((a) => <ArticleCard key={a.slug} article={a} />)}
          </div>
          <aside className="lg:col-span-4">
            <p className="eyebrow mb-2 text-cyan">Noticias verificadas</p>
            {news.map((a) => <ArticleCard key={a.slug} article={a} variant="minimal" />)}
          </aside>
        </div>
      </section>

      <Band eyebrow="Creación algorítmica" title="Música & IA" to="/musica-ia" items={mia} />

      {/* Artists */}
      <section className="container-mag mt-24">
        <SectionHeader eyebrow="Escena" title="Artistas destacados" to="/artistas" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {getArtists().map((ar) => (
            <Link key={ar.id} to="/artistas" className="group card-neon relative overflow-hidden rounded-2xl border">
              <img src={ar.image.src} alt={ar.image.alt} loading="lazy" className="aspect-[3/4] w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
              <div className="absolute bottom-0 p-4">
                <p className="eyebrow text-magenta">{ar.discipline}</p>
                <p className="mt-1 font-display text-lg font-bold">{ar.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">IA: {ar.aiUse} · demo</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Band eyebrow="Estudio" title="DAW & Tecnología" to="/daw-tecnologia" items={daw} />
      <Band eyebrow="Largo formato" title="Reportajes" to="/reportajes" items={rep} />

      {/* LAB */}
      <section className="container-mag mt-24">
        <div className="relative overflow-hidden rounded-3xl border p-8 md:p-14">
          <div className="absolute inset-0 -z-10 opacity-30 bg-brand blur-3xl" />
          <p className="eyebrow text-cyan">Experimentos de la redacción</p>
          <h2 className="mt-3 text-4xl font-bold md:text-6xl"><span className="text-brand">NEXAVOZ LAB</span></h2>
          <p className="mt-4 max-w-xl text-muted-foreground">Probamos herramientas, documentamos cada paso y contamos qué hizo la máquina y qué hicimos nosotros.</p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {lab.map((a) => <ArticleCard key={a.slug} article={a} variant="horizontal" />)}
          </div>
        </div>
      </section>

      {/* Letters */}
      <section className="container-mag mt-24">
        <SectionHeader eyebrow="Lectores" title="Cartas al Director" to="/cartas" />
        <div className="grid gap-6 md:grid-cols-2">
          {cartas.map((c) => (
            <Link key={c.slug} to="/articulo/$slug" params={{ slug: c.slug }} className="glass card-neon rounded-2xl p-8">
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

function Band({ eyebrow, title, to, items }: { eyebrow: string; title: string; to: string; items: ReturnType<typeof getArticles> }) {
  return (
    <section className="container-mag mt-24">
      <SectionHeader eyebrow={eyebrow} title={title} to={to} />
      <div className="grid gap-6 md:grid-cols-2">
        {items.map((a) => <ArticleCard key={a.slug} article={a} variant="horizontal" />)}
      </div>
    </section>
  );
}
