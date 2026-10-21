import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage, seo } from "@/components/nexavoz/CategoryPage";
import { getCategory } from "@/content/repository";

const cat = getCategory("reportajes");

export const Route = createFileRoute("/reportajes")({
  head: () => seo(cat.name, cat.description),
  component: () => <CategoryPage slug="reportajes" />,
});
