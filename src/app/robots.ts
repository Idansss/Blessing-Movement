import type { MetadataRoute } from "next";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://blessingsglobal.org";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/portal/dashboard", "/portal/receipt/"],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  };
}
