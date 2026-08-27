import type { MetadataRoute } from "next";
import { IDENTITY } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: IDENTITY.site, lastModified: now, changeFrequency: "monthly", priority: 1 },
    {
      url: `${IDENTITY.site}/cv`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
