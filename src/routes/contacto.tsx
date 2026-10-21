import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero, seo } from "@/components/nexavoz/CategoryPage";

export const Route = createFileRoute("/contacto")({
  head: () => seo("Contacto", "Escribe a la redacción de NEXAVOZ o envía tu carta al director."),
  component: Page,
});

const field = "w-full rounded-xl border bg-background/60 px-4 py-3 outline-none transition focus:border-cyan";

function Page() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHero eyebrow="Redacción" title="Contacto" description="Propuestas, notas de prensa, correcciones o cartas al director." />
      <div className="container-mag grid gap-12 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-4">
          {[["Redacción", "redaccion@nexavoz.demo"], ["Cartas al Director", "cartas@nexavoz.demo"], ["Correcciones", "correcciones@nexavoz.demo"]].map(([k, v]) => (
            <div key={k} className="border-t pt-4"><p className="eyebrow text-magenta">{k}</p><p className="mt-1">{v}</p></div>
          ))}
          <p className="text-xs text-muted-foreground">Direcciones de ejemplo, pendientes de activar.</p>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="glass space-y-4 rounded-2xl p-6 md:p-8 lg:col-span-8">
          {sent ? (
            <p role="status" className="py-10 text-center text-lg">Gracias. El envío real se activará cuando conectemos el servicio de mensajes.</p>
          ) : (
            <>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-1 text-sm"><span>Nombre</span><input required className={field} /></label>
                <label className="space-y-1 text-sm"><span>Email</span><input required type="email" className={field} /></label>
              </div>
              <label className="block space-y-1 text-sm"><span>Asunto</span>
                <select className={field}><option>Propuesta editorial</option><option>Carta al director</option><option>Corrección</option><option>Prensa</option></select>
              </label>
              <label className="block space-y-1 text-sm"><span>Mensaje</span><textarea required rows={6} className={field} /></label>
              <button className="bg-brand rounded-full px-8 py-3 font-display text-sm font-bold text-primary-foreground transition hover:opacity-90">Enviar</button>
            </>
          )}
        </form>
      </div>
    </>
  );
}
