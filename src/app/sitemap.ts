import { MetadataRoute } from "next";
import { SEO_ARTICLES } from "@/data/seoArticles";
import { CORPORATE_ARTICLES } from "@/data/corporateSeoArticles";
import { STORIES } from "@/data/siteData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.whitefrogproductions.com";
  const currentDate = new Date().toISOString().split("T")[0];

  // Core Pages
  const corePages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/films`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/pre-weddings`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/music-videos`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/in-media`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/experience`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/corporate`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/reserve-your-experience`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.95,
    },
  ];

  // Programmatic SEO Blog Articles (327+ high intent keywords)
  const blogPages: MetadataRoute.Sitemap = SEO_ARTICLES.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: article.date || currentDate,
    changeFrequency: "weekly",
    priority: article.featured ? 0.9 : 0.8,
  }));

  // Programmatic Corporate B2B SEO Pages (880 enterprise hubs & services)
  const corporatePages: MetadataRoute.Sitemap = CORPORATE_ARTICLES.map((article) => ({
    url: `${baseUrl}/corporate/${article.slug}`,
    lastModified: article.date || currentDate,
    changeFrequency: "weekly",
    priority: article.featured ? 0.9 : 0.85,
  }));

  // Wedding Story Pages (34 real luxury wedding heirloom galleries)
  const storyPages: MetadataRoute.Sitemap = STORIES.map((story) => ({
    url: `${baseUrl}/${story.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  return [...corePages, ...blogPages, ...corporatePages, ...storyPages];
}
