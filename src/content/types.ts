/**
 * Content model for NEXAVOZ. Mirrors the shape a future CMS/database will return.
 * Keep UI components dependent on these types only — never on the demo data file.
 */
export type CategorySlug =
  | "noticias" | "articulos" | "reportajes" | "entrevistas" | "musica-ia"
  | "daw-tecnologia" | "artistas" | "critica" | "ia-derechos" | "lab" | "cartas";

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
}

export interface Author {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
}

export interface MediaImage {
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
  width?: number;
  height?: number;
}

export interface MediaEmbed {
  kind: "audio" | "video";
  src: string;
  title: string;
}

export interface SourceLink {
  label: string;
  url?: string; // undefined = pending / demo
}

/** Editorial verification sheet, required for pieces in "noticias". */
export interface Verification {
  primarySource: string;
  sourceDate: string; // ISO
  confirmed: string[];
  statements: string[];
  forecasts: string[];
  sourceUrl?: string;
}

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "highlight"; title: string; text: string }
  | { type: "media"; media: MediaEmbed };

export interface Article {
  slug: string;
  category: CategorySlug;
  title: string;
  excerpt: string;
  date: string; // ISO
  readingMinutes: number;
  author: Author;
  image: MediaImage;
  body: Block[];
  tags: string[];
  sources?: SourceLink[];
  verification?: Verification;
  isDemo: boolean;
  featured?: boolean;
  artistIds?: string[];
}

export interface Artist {
  id: string;
  name: string;
  discipline: string;
  bio: string;
  image: MediaImage;
  aiUse: "ninguna" | "asistida" | "co-creación";
  isDemo: boolean;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  city: string;
  venue: string;
  type: string;
  isDemo: boolean;
}

export interface Tool {
  id: string;
  name: string;
  kind: string;
  description: string;
  url?: string;
  isDemo: boolean;
}
