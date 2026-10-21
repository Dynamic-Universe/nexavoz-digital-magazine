import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage, seo } from "@/components/nexavoz/CategoryPage";
import { getCategory } from "@/content/repository";

const cat = getCategory("lab");

export const Route = createFileRoute("/lab")({
  head: () => seo(cat.name, cat.description),
  component: () => <CategoryPage slug="lab" />,
});
