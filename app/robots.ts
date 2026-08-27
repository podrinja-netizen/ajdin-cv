import type { MetadataRoute } from "next";
import { IDENTITY } from "@/lib/content";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${IDENTITY.site}/sitemap.xml`,
    host: IDENTITY.site,
  };
}
