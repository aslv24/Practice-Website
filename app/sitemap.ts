import type { MetadataRoute } from "next"

import { modules } from "@/data/modules"

const siteUrl = "https://automation-practice-theta.vercel.app"
const lastModified = new Date("2026-06-27T00:00:00.000Z")

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...modules.map((module) => ({
      url: `${siteUrl}${module.link}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ]
}
