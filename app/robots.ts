import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://wanderly-a-travel-agency.vercel.app";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/studio/",
        "/sign-in",
        "/register",
        "/bookings",
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
