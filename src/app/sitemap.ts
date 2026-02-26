import type { MetadataRoute } from "next";
import { events } from "@/data/events";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://blessingsglobal.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE, priority: 1.0, changeFrequency: "weekly" as const },
    { url: `${BASE}/about`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE}/programs`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE}/events`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${BASE}/media`, priority: 0.7, changeFrequency: "weekly" as const },
    { url: `${BASE}/get-involved`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${BASE}/donate`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${BASE}/contact`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${BASE}/pray`, priority: 0.7, changeFrequency: "weekly" as const },
    { url: `${BASE}/pods`, priority: 0.6, changeFrequency: "monthly" as const },
    { url: `${BASE}/learn`, priority: 0.6, changeFrequency: "monthly" as const },
    { url: `${BASE}/portal`, priority: 0.5, changeFrequency: "monthly" as const },
  ].map((p) => ({ ...p, lastModified: new Date() }));

  const eventPages = events.map((e) => ({
    url: `${BASE}/events/${e.slug ?? e.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...eventPages];
}
