import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage, seo } from "@/components/nexavoz/CategoryPage";
import { getCategory } from "@/content/repository";

const cat = getCategory("ia-derechos");

export const Route = createFileRoute("/ia-derechos")({
  head: () => seo(cat.name, cat.description),
  component: () => <CategoryPage slug="ia-derechos" />,
});
