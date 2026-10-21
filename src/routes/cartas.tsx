import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage, seo } from "@/components/nexavoz/CategoryPage";
import { getCategory } from "@/content/repository";

const cat = getCategory("cartas");

export const Route = createFileRoute("/cartas")({
  head: () => seo(cat.name, cat.description),
  component: () => <CategoryPage slug="cartas" />,
});
