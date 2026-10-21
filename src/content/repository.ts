/**
 * Data access layer. Every page reads content through these functions.
 * To connect a CMS/database, re-implement these (async-ready) without touching UI.
 */
import { articles, artists, categories, events, tools } from "./demo-data";
import type { CategorySlug } from "./types";

const byDate = <T extends { date: string }>(list: T[]) =>
  [...list].sort((x, y) => y.date.localeCompare(x.date));

export const getCategories = () => categories;
export const getCategory = (slug: CategorySlug) => categories.find((c) => c.slug === slug)!;
export const getArticles = () => byDate(articles);
export const getArticlesByCategory = (slug: CategorySlug, limit?: number) =>
  byDate(articles.filter((x) => x.category === slug)).slice(0, limit);
export const getFeatured = () => articles.find((x) => x.featured) ?? getArticles()[0];
export const getArticle = (slug: string) => articles.find((x) => x.slug === slug);
export const getRelated = (slug: string, limit = 3) => {
  const art = getArticle(slug);
  if (!art) return [];
  const same = getArticlesByCategory(art.category).filter((x) => x.slug !== slug);
  const rest = getArticles().filter((x) => x.slug !== slug && x.category !== art.category);
  return [...same, ...rest].slice(0, limit);
};
export const searchArticles = (q: string) => {
  const t = q.trim().toLowerCase();
  if (!t) return [];
  return getArticles().filter((x) =>
    [x.title, x.excerpt, x.tags.join(" "), getCategory(x.category).name].join(" ").toLowerCase().includes(t),
  );
};
export const getArtists = () => artists;
export const getArtist = (id: string) => artists.find((x) => x.id === id);
export const getEvents = () => [...events].sort((x, y) => x.date.localeCompare(y.date));
export const getTools = () => tools;

export const formatDate = (iso: string) =>
  new Date(iso + "T12:00:00Z").toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });
