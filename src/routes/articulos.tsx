import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage, seo } from "@/components/nexavoz/CategoryPage";
import { getCategory } from "@/content/repository";

const cat = getCategory("articulos");

export const Route = createFileRoute("/articulos")({
  head: () => seo(cat.name, cat.description),
  component: () => <CategoryPage slug="articulos" />,
});
