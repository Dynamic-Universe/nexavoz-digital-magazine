import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage, seo } from "@/components/nexavoz/CategoryPage";
import { getCategory } from "@/content/repository";

const cat = getCategory("musica-ia");

export const Route = createFileRoute("/musica-ia")({
  head: () => seo(cat.name, cat.description),
  component: () => <CategoryPage slug="musica-ia" />,
});
