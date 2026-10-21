import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage, seo } from "@/components/nexavoz/CategoryPage";
import { getCategory } from "@/content/repository";

const cat = getCategory("daw-tecnologia");

export const Route = createFileRoute("/daw-tecnologia")({
  head: () => seo(cat.name, cat.description),
  component: () => <CategoryPage slug="daw-tecnologia" />,
});
