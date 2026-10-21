import { Link } from "@tanstack/react-router";
import { BrandLogo } from "./Brand";
import { mainNav } from "./nav";

const socials = ["Instagram", "YouTube", "TikTok", "X", "Spotify", "Bluesky"];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t bg-card/40">
      <div className="rule-brand" />
      <div className="container-mag grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <BrandLogo />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Revista digital de música, tecnología e inteligencia artificial. Periodismo verificable con criterio humano.
          </p>
        </div>
        <nav aria-label="Secciones" className="md:col-span-5">
          <h2 className="eyebrow mb-4 text-muted-foreground">Secciones</h2>
          <ul className="grid grid-cols-2 gap-y-2 text-sm">
            {mainNav.map((n) => (
              <li key={n.to}><Link to={n.to} className="text-foreground/80 transition hover:text-cyan">{n.label}</Link></li>
            ))}
          </ul>
        </nav>
        <div className="md:col-span-3">
          <h2 className="eyebrow mb-4 text-muted-foreground">Contacto</h2>
          <p className="text-sm text-foreground/80">redaccion@nexavoz.demo</p>
          <p className="mt-1 text-xs text-muted-foreground">Dirección de ejemplo (pendiente)</p>
          <h2 className="eyebrow mb-3 mt-8 text-muted-foreground">Redes</h2>
          <ul className="flex flex-wrap gap-2">
            {socials.map((s) => (
              <li key={s}><span className="inline-block rounded-full border px-3 py-1 text-xs text-muted-foreground" title="Enlace pendiente">{s}</span></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t">
        <div className="container-mag flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted-foreground md:flex-row">
          <p className="font-display tracking-[0.2em] text-brand">NEXAVOZ — IA + HUMANO</p>
          <p>© 2026 NEXAVOZ · Contenido de demostración</p>
        </div>
      </div>
    </footer>
  );
}
