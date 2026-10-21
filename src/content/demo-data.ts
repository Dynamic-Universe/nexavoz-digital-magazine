import hero from "@/assets/hero.jpg";
import daw from "@/assets/daw.jpg";
import artist from "@/assets/artist.jpg";
import ai from "@/assets/ai.jpg";
import type { Article, Artist, Author, Category, EventItem, Tool } from "./types";

/** DEMO CONTENT — fictional. Replace via repository.ts once a CMS is connected. */

export const categories: Category[] = [
  { slug: "noticias", name: "Noticias", description: "Actualidad verificable con ficha editorial de fuentes." },
  { slug: "articulos", name: "Artículos", description: "Análisis y ensayo sobre la nueva música." },
  { slug: "reportajes", name: "Reportajes", description: "Historias largas, trabajo de campo y contexto." },
  { slug: "entrevistas", name: "Entrevistas", description: "Conversaciones con quienes hacen la música." },
  { slug: "musica-ia", name: "Música & IA", description: "Creación, modelos y escucha en la era algorítmica." },
  { slug: "daw-tecnologia", name: "DAW & Tecnología", description: "Estudio, software, hardware y flujos de trabajo." },
  { slug: "artistas", name: "Artistas", description: "Perfiles de creadores humanos e híbridos." },
  { slug: "critica", name: "Crítica & Reseñas", description: "Discos, directos y herramientas, bajo la lupa." },
  { slug: "ia-derechos", name: "IA & Derechos", description: "Autoría, licencias, ética y regulación." },
  { slug: "lab", name: "NEXAVOZ LAB", description: "Experimentos propios de la redacción entre IA y humano." },
  { slug: "cartas", name: "Cartas al Director", description: "La voz de quienes nos leen." },
];

const a = (id: string, name: string, role: string): Author => ({ id, name, role });
const authors = {
  lia: a("lia", "Lía Montero (demo)", "Redactora jefa"),
  dario: a("dario", "Darío Vélez (demo)", "Tecnología"),
  noa: a("noa", "Noa Arrieta (demo)", "Crítica musical"),
  ivan: a("ivan", "Iván Sol (demo)", "NEXAVOZ LAB"),
};

const img = {
  hero: { src: hero, alt: "Productor en estudio iluminado por ondas de audio de neón", width: 1600, height: 912 },
  daw: { src: daw, alt: "Sintetizador modular junto a un portátil con un DAW abierto", width: 1200, height: 800 },
  artist: { src: artist, alt: "Cantante con micrófono bajo luz magenta y azul", width: 1200, height: 800 },
  ai: { src: ai, alt: "Red neuronal abstracta formada por ondas de audio", width: 1200, height: 800 },
};

const lorem = (topic: string) => [
  { type: "p" as const, text: `Este es un texto de demostración de NEXAVOZ sobre ${topic}. Sirve para mostrar el diseño editorial y será sustituido por contenido real publicado desde el gestor de contenidos.` },
  { type: "p" as const, text: "La redacción trabaja con una premisa sencilla: la inteligencia artificial amplía herramientas, pero el criterio, la sensibilidad y la responsabilidad siguen siendo humanos. Cada pieza explica qué parte del proceso es automática y cuál es decisión de una persona." },
  { type: "h2" as const, text: "Lo que cambia en el estudio" },
  { type: "p" as const, text: "Los flujos de trabajo híbridos combinan generación asistida, edición manual y mezcla tradicional. En este espacio de ejemplo describiríamos casos concretos, con nombres reales y fuentes contrastadas, una vez estén disponibles." },
  { type: "quote" as const, text: "La máquina propone; la persona decide qué merece sonar.", cite: "Cita de ejemplo" },
  { type: "highlight" as const, title: "Claves NEXAVOZ", text: "Transparencia sobre el uso de IA · Crédito a quien crea · Fuentes siempre enlazadas." },
  { type: "p" as const, text: "El cierre de la pieza retomaría las preguntas abiertas y enlazaría a lecturas relacionadas dentro de la revista." },
];

const mk = (p: Partial<Article> & Pick<Article, "slug" | "category" | "title" | "excerpt" | "date">): Article => ({
  readingMinutes: 6,
  author: authors.lia,
  image: img.ai,
  body: lorem(p.title.toLowerCase()),
  tags: [],
  isDemo: true,
  ...p,
});

export const articles: Article[] = [
  mk({
    slug: "estudio-hibrido-ia-humano",
    category: "reportajes",
    title: "El estudio híbrido: dónde termina el algoritmo y empieza la voz",
    excerpt: "Un recorrido de demostración por los nuevos estudios donde productores y modelos generativos trabajan en la misma sesión.",
    date: "2026-10-20",
    readingMinutes: 12,
    image: { ...img.hero, caption: "Sesión nocturna en un estudio de ejemplo.", credit: "Imagen generada · NEXAVOZ" },
    featured: true,
    tags: ["estudio", "IA + humano"],
    sources: [{ label: "Fuente pendiente de verificación" }],
  }),
  mk({
    slug: "noticia-demo-marco-licencias",
    category: "noticias",
    title: "Un organismo ficticio publica un borrador de marco de licencias para entrenamiento musical",
    excerpt: "Pieza de ejemplo que muestra cómo NEXAVOZ separa hechos confirmados, declaraciones y previsiones.",
    date: "2026-10-19",
    readingMinutes: 4,
    author: authors.dario,
    image: { ...img.ai, caption: "Ilustración conceptual.", credit: "Imagen generada · NEXAVOZ" },
    tags: ["regulación"],
    verification: {
      primarySource: "Documento oficial del organismo (demo)",
      sourceDate: "2026-10-18",
      confirmed: ["El borrador ha sido publicado en la web del organismo.", "Incluye un periodo de consulta pública de 60 días."],
      statements: ["El organismo afirma que el marco 'protegerá a los autores'."],
      forecasts: ["Se espera una versión definitiva en 2027, según el propio documento."],
    },
  }),
  mk({
    slug: "noticia-demo-plugin-separacion",
    category: "noticias",
    title: "Una desarrolladora de ejemplo anuncia un plugin de separación de pistas en tiempo real",
    excerpt: "Demo de noticia tecnológica con ficha editorial: lo anunciado no se presenta como probado.",
    date: "2026-10-17",
    readingMinutes: 3,
    author: authors.dario,
    image: { ...img.daw, caption: "Equipo de estudio de ejemplo.", credit: "Imagen generada · NEXAVOZ" },
    tags: ["plugins"],
    verification: {
      primarySource: "Nota de prensa de la empresa (demo)",
      sourceDate: "2026-10-16",
      confirmed: ["La empresa ha emitido una nota de prensa con el anuncio."],
      statements: ["La compañía asegura una latencia inferior a 10 ms."],
      forecasts: ["Lanzamiento previsto para el primer trimestre, sin fecha cerrada."],
    },
  }),
  mk({
    slug: "noticia-demo-festival-sonido-generativo",
    category: "noticias",
    title: "Un festival de ejemplo dedicará una jornada a la música generativa en directo",
    excerpt: "Noticia de demostración sobre programación cultural con fuentes diferenciadas.",
    date: "2026-10-15",
    readingMinutes: 3,
    image: { ...img.artist, credit: "Imagen generada · NEXAVOZ" },
    verification: {
      primarySource: "Programa publicado por la organización (demo)",
      sourceDate: "2026-10-14",
      confirmed: ["La jornada aparece en el programa oficial."],
      statements: ["La dirección artística la describe como 'histórica'."],
      forecasts: ["La organización estima un aforo completo."],
    },
  }),
  mk({
    slug: "componer-con-modelos",
    category: "musica-ia",
    title: "Componer con modelos: guía crítica para no perder tu firma",
    excerpt: "Cómo usar herramientas generativas como boceto sin renunciar a la identidad sonora propia.",
    date: "2026-10-18",
    image: img.ai,
    author: authors.ivan,
  }),
  mk({
    slug: "escucha-algoritmica",
    category: "musica-ia",
    title: "La escucha algorítmica y el nuevo oído colectivo",
    excerpt: "Ensayo demo sobre recomendación, descubrimiento y la sorpresa como valor musical.",
    date: "2026-10-12",
    image: img.hero,
    author: authors.noa,
  }),
  mk({
    slug: "daw-flujo-2026",
    category: "daw-tecnologia",
    title: "Tu DAW en 2026: asistentes, stems y mezcla colaborativa",
    excerpt: "Repaso de demostración a funciones que redefinen el trabajo diario en el estudio.",
    date: "2026-10-16",
    image: img.daw,
    author: authors.dario,
  }),
  mk({
    slug: "modular-y-codigo",
    category: "daw-tecnologia",
    title: "Modular y código: el regreso del cable con cerebro",
    excerpt: "Hardware analógico controlado por scripts. Un texto demo sobre el estudio híbrido.",
    date: "2026-10-10",
    image: img.daw,
    author: authors.dario,
  }),
  mk({
    slug: "entrevista-vela-orion",
    category: "entrevistas",
    title: "Vela Orion: “Uso la IA como un espejo, no como un atajo”",
    excerpt: "Entrevista ficticia de demostración con una artista ficticia de pop electrónico.",
    date: "2026-10-14",
    image: img.artist,
    author: authors.noa,
    artistIds: ["vela"],
  }),
  mk({
    slug: "articulo-autoria-difusa",
    category: "articulos",
    title: "Autoría difusa: quién firma una canción en 2026",
    excerpt: "Artículo demo sobre créditos, colaboración y transparencia.",
    date: "2026-10-13",
    image: img.ai,
  }),
  mk({
    slug: "resena-disco-demo",
    category: "critica",
    title: "Reseña: ‘Señales de Ceniza’, un disco que respira entre máquinas",
    excerpt: "Crítica de ejemplo de un álbum ficticio. Valoración: 8/10 (demo).",
    date: "2026-10-11",
    image: img.artist,
    author: authors.noa,
  }),
  mk({
    slug: "derechos-entrenamiento",
    category: "ia-derechos",
    title: "Entrenar con música ajena: el mapa de preguntas abiertas",
    excerpt: "Explicador demo sobre consentimiento, licencias y remuneración.",
    date: "2026-10-09",
    image: img.ai,
    author: authors.dario,
  }),
  mk({
    slug: "lab-voz-sintetica",
    category: "lab",
    title: "LAB #01: le pedimos a un modelo que cantara un poema y lo corregimos a mano",
    excerpt: "Experimento de la redacción documentado paso a paso. Contenido demo.",
    date: "2026-10-08",
    image: img.hero,
    author: authors.ivan,
  }),
  mk({
    slug: "lab-mezcla-ciega",
    category: "lab",
    title: "LAB #02: mezcla ciega, ¿distingues la máquina?",
    excerpt: "Prueba de escucha con lectores. Demo pendiente de resultados reales.",
    date: "2026-10-05",
    image: img.daw,
    author: authors.ivan,
  }),
  mk({
    slug: "carta-oficio",
    category: "cartas",
    title: "“No quiero que mi oficio sea un botón”",
    excerpt: "Carta de ejemplo de una lectora ficticia, técnica de sonido.",
    date: "2026-10-07",
    image: img.daw,
    author: a("lector1", "Marta R. (demo)", "Lectora"),
    readingMinutes: 2,
  }),
  mk({
    slug: "carta-escuchar",
    category: "cartas",
    title: "“La IA me devolvió las ganas de componer”",
    excerpt: "Carta de ejemplo de un lector ficticio, músico aficionado.",
    date: "2026-10-04",
    image: img.artist,
    author: a("lector2", "Jon A. (demo)", "Lector"),
    readingMinutes: 2,
  }),
  mk({
    slug: "reportaje-escena-local",
    category: "reportajes",
    title: "Escenas locales, herramientas globales",
    excerpt: "Reportaje demo sobre colectivos que comparten modelos y salas de ensayo.",
    date: "2026-10-03",
    image: img.artist,
    readingMinutes: 14,
  }),
];

export const artists: Artist[] = [
  { id: "vela", name: "Vela Orion", discipline: "Pop electrónico", bio: "Artista ficticia de demostración. Voz humana sobre texturas co-creadas.", image: img.artist, aiUse: "co-creación", isDemo: true },
  { id: "kairo", name: "Kairo Lumen", discipline: "Ambient / modular", bio: "Perfil demo. Compone con modular y scripts propios.", image: img.daw, aiUse: "asistida", isDemo: true },
  { id: "nadir", name: "Nadir 808", discipline: "Productor", bio: "Perfil demo. Producción tradicional, sin IA generativa.", image: img.hero, aiUse: "ninguna", isDemo: true },
  { id: "sintra", name: "Sintra Delta", discipline: "Arte sonoro", bio: "Perfil demo. Instalaciones generativas en tiempo real.", image: img.ai, aiUse: "co-creación", isDemo: true },
];

export const events: EventItem[] = [
  { id: "e1", title: "Jornada de música generativa (demo)", date: "2026-11-08", city: "Madrid", venue: "Sala ejemplo", type: "Festival", isDemo: true },
  { id: "e2", title: "Taller: IA en la mezcla (demo)", date: "2026-11-15", city: "Barcelona", venue: "Espacio ejemplo", type: "Taller", isDemo: true },
  { id: "e3", title: "Mesa redonda: autoría y algoritmos (demo)", date: "2026-11-27", city: "Online", venue: "Streaming", type: "Debate", isDemo: true },
  { id: "e4", title: "NEXAVOZ LAB en directo (demo)", date: "2026-12-12", city: "Valencia", venue: "Sala ejemplo", type: "Directo", isDemo: true },
];

export const tools: Tool[] = [
  { id: "t1", name: "Separador de stems", kind: "Audio", description: "Categoría de herramienta para aislar voces e instrumentos. Fichas reales próximamente.", isDemo: true },
  { id: "t2", name: "Asistente de mezcla", kind: "DAW", description: "Plugins que sugieren ecualización y dinámica.", isDemo: true },
  { id: "t3", name: "Generador de bocetos", kind: "Composición", description: "Modelos que proponen ideas melódicas o armónicas.", isDemo: true },
  { id: "t4", name: "Síntesis de voz", kind: "Voz", description: "Herramientas de voz sintética con consentimiento del intérprete.", isDemo: true },
  { id: "t5", name: "Detector de origen", kind: "Verificación", description: "Herramientas para analizar si un audio contiene material generado.", isDemo: true },
  { id: "t6", name: "Gestión de créditos", kind: "Derechos", description: "Sistemas para documentar autoría y participación de IA.", isDemo: true },
];
