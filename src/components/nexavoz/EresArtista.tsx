import { Mail } from "lucide-react";

/** Open call module: "¿ERES ARTISTA?" — visible invitation with contact email. */
export function EresArtista() {
  return (
    <section className="container-mag mt-24" aria-label="Convocatoria para artistas">
      <div className="card-neon relative overflow-hidden rounded-3xl border">
        <div className="absolute inset-0 -z-10 opacity-25 bg-brand blur-3xl" aria-hidden />
        <div className="grid gap-8 p-8 md:grid-cols-12 md:p-14">
          <div className="md:col-span-7">
            <p className="eyebrow text-cyan">Convocatoria abierta</p>
            <h2 className="font-display mt-3 text-4xl font-bold leading-none md:text-6xl">
              <span className="text-metal">¿ERES ARTISTA?</span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-foreground/85 md:text-lg">
              Si creas música —con IA, sin IA o en algún punto intermedio— queremos escucharte. Cuéntanos tu
              proceso, qué herramientas usas y qué decides tú. NEXAVOZ busca voces nuevas para perfiles,
              entrevistas y experimentos del LAB.
            </p>
          </div>
          <div className="flex flex-col justify-center gap-4 md:col-span-5">
            <a
              href="mailto:faro69@mailfence.com?subject=Soy%20artista%20%E2%80%94%20NEXAVOZ"
              className="bg-brand inline-flex items-center justify-center gap-3 rounded-full px-8 py-4 font-display text-sm font-bold tracking-wide text-primary-foreground transition hover:opacity-90"
            >
              <Mail className="h-4 w-4" /> Escríbenos
            </a>
            <p className="text-center text-sm text-muted-foreground">
              <a href="mailto:faro69@mailfence.com" className="text-cyan underline-offset-4 hover:underline">
                faro69@mailfence.com
              </a>
            </p>
            <p className="text-center text-xs text-muted-foreground">
              Indícanos tu nombre artístico, disciplina y si usas IA en tu proceso.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
