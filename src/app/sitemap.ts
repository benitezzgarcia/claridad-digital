import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/articles";
import { siteConfig } from "@/lib/site-config";
import { categories } from "@/lib/categories";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/articulos`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/sobre-nosotros`,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${siteConfig.url}/contacto`,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${siteConfig.url}/privacidad`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const articleRoutes: MetadataRoute.Sitemap = getAllArticles().map((article) => ({
    url: `${siteConfig.url}/articulos/${article.slug}`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...categories.map(c => ({ url: `${siteConfig.url}/categorias/${c.slug}`, changeFrequency: 'weekly' as const, priority: 0.8 })), ...articleRoutes];
}
