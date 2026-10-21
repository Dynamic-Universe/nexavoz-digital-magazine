import { Link } from "@tanstack/react-router";
import type { Article } from "@/content/types";
import { formatDate, getCategory } from "@/content/repository";
import { CategoryTag, DemoBadge } from "./Brand";

type Variant = "default" | "horizontal" | "minimal";

export function ArticleCard({ article, variant = "default" }: { article: Article; variant?: Variant }) {
  const cat = getCategory(article.category);
  const meta = (
    <div className="flex flex-wrap items-center gap-2">
      <CategoryTag name={cat.name} />
      {article.isDemo && <DemoBadge />}
    </div>
  );
  if (variant === "minimal") {
    return (
      <Link to="/articulo/$slug" params={{ slug: article.slug }} className="group block border-t py-5">
        {meta}
        <h3 className="mt-2 text-base font-semibold leading-snug transition group-hover:text-cyan">{article.title}</h3>
        <time className="mt-2 block text-xs text-muted-foreground">{formatDate(article.date)}</time>
      </Link>
    );
  }
  const horizontal = variant === "horizontal";
  return (
    <Link
      to="/articulo/$slug"
      params={{ slug: article.slug }}
      className={`group card-neon glass flex overflow-hidden rounded-2xl ${horizontal ? "flex-col sm:flex-row" : "flex-col"}`}
    >
      <div className={`overflow-hidden ${horizontal ? "sm:w-2/5" : ""}`}>
        <img src={article.image.src} alt={article.image.alt} loading="lazy" width={article.image.width} height={article.image.height} className="aspect-[16/10] h-full w-full object-cover transition duration-700 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
        {meta}
        <h3 className="text-lg font-semibold leading-tight md:text-xl">{article.title}</h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">{article.excerpt}</p>
        <time className="mt-auto pt-2 text-xs text-muted-foreground">{formatDate(article.date)} · {article.readingMinutes} min</time>
      </div>
    </Link>
  );
}

export function SectionHeader({ eyebrow, title, to }: { eyebrow: string; title: string; to?: string }) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <div>
        <p className="eyebrow text-magenta">{eyebrow}</p>
        <h2 className="mt-2 text-2xl font-bold md:text-4xl">{title}</h2>
      </div>
      {to && (
        <Link to={to} className="eyebrow shrink-0 rounded-full border px-4 py-2 text-foreground/80 transition hover:border-cyan hover:text-cyan">
          Ver todo →
        </Link>
      )}
    </div>
  );
}
