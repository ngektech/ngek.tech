import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ngek.tech";

  const blogPosts = [
    "big-o-notation-for-websites",
    "tso-time-space-organization",
    "how-does-yoga-work-on-web-apps",
    "quantum-science-behind-nextjs",
    "data-analytics-on-jio-wifi-by-nikola-frequency",
    "nikola-tonic-in-reactjs",
    "nikola-sonic-using-cpp",
    "the-truth-of-c-language-by-aditya-patange",
    "data-mining-business-intelligence-friston-signals",
    "solid-principles-ydni-you-do-need-it",
    "divine-programming-system-dps",
    "ebxo-energy-bits-xi-openers-polyglot-programmers",
  ];

  const blogUrls = blogPosts.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/vaccine-policy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...blogUrls,
  ];
}
