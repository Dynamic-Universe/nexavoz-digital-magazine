import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BrandLogo } from "./Brand";
import { mainNav } from "./nav";

export function SiteHeader() {
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (search) inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setSearch(false); setMenu(false); }
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setSearch(true); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [search]);

  const primary = mainNav.slice(0, 7);

  return (
    <header className="sticky top-0 z-40 glass border-x-0 border-t-0">
      {/* Editorial top strip: edition line */}
      <div className="border-b">
        <div className="container-mag flex h-8 items-center justify-between text-[0.6rem] uppercase tracking-[0.22em] text-muted-foreground">
          <span>Nº 01 · Octubre 2026</span>
          <span className="hidden sm:inline">Revista digital de música & IA</span>
          <span className="text-brand font-semibold">IA + HUMANO</span>
        </div>
      </div>
      <div className="container-mag flex h-16 items-center justify-between gap-4 md:h-20">
        <BrandLogo />
        <nav aria-label="Principal" className="hidden items-center gap-1 xl:flex">
          {primary.map((n) => (
            <Link key={n.to} to={n.to} className="rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground" activeProps={{ className: "text-foreground bg-secondary" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <button onClick={() => setSearch(true)} aria-label="Buscar" className="flex h-10 items-center gap-2 rounded-full border px-3 text-sm text-muted-foreground transition hover:border-cyan hover:text-foreground">
            <Search className="h-4 w-4" /> <span className="hidden sm:inline">Buscar</span>
          </button>
          <button onClick={() => setMenu(true)} aria-label="Abrir menú" className="flex h-10 w-10 items-center justify-center rounded-full border transition hover:border-magenta">
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="rule-brand opacity-60" />

      {menu && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-background/95 backdrop-blur-xl animate-in fade-in" role="dialog" aria-modal="true" aria-label="Menú">
          <div className="container-mag flex h-16 items-center justify-between md:h-20">
            <BrandLogo />
            <button onClick={() => setMenu(false)} aria-label="Cerrar menú" className="flex h-10 w-10 items-center justify-center rounded-full border"><X className="h-4 w-4" /></button>
          </div>
          <nav className="container-mag grid gap-x-10 py-10 sm:grid-cols-2 lg:grid-cols-3">
            {mainNav.map((n, i) => (
              <Link key={n.to} to={n.to} onClick={() => setMenu(false)} className="group flex items-baseline gap-4 border-b py-4">
                <span className="eyebrow text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-2xl font-semibold transition group-hover:text-brand md:text-3xl">{n.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}

      {search && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-background/85 px-4 pt-28 backdrop-blur-xl animate-in fade-in" onClick={() => setSearch(false)} role="dialog" aria-modal="true" aria-label="Buscar">
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={(e) => { e.preventDefault(); setSearch(false); navigate({ to: "/buscar", search: { q } }); }}
            className="glass w-full max-w-2xl rounded-2xl p-2 shadow-[var(--shadow-neon)]"
          >
            <label className="flex items-center gap-3 px-4">
              <Search className="h-5 w-5 text-cyan" />
              <span className="sr-only">Buscar en NEXAVOZ</span>
              <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Busca artistas, DAW, derechos, LAB…" className="h-14 w-full bg-transparent text-lg outline-none placeholder:text-muted-foreground" />
            </label>
          </form>
        </div>
      )}
    </header>
  );
}
