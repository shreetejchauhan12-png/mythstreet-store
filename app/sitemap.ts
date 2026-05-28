import type { MetadataRoute } from "next";

const BASE_URL = "https://mythstreet.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticRoutes = [
  "",
  "/about",
  "/contact",
  "/terms",
  "/privacy",
  "/returns",
  "/support",
];

  const staticPages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));

    const shopPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/shop/anime/oversized`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/shop/anime/hoodie`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/shop/anime/sweatshirt`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // Fetch products
  let productPages: MetadataRoute.Sitemap = [];

  try {
    const response = await fetch(
      "https://mythstreet-backend.onrender.com/api/products",
      {
        next: { revalidate: 3600 }, // refresh every 1 hour
      }
    );

    const products = await response.json();

    productPages = products.map((product: any) => ({
      url: `${BASE_URL}/product/${product.id}`,
      lastModified: new Date(product.created_at),
      changeFrequency: "weekly",
      priority: 0.9,
    }));
  } catch (error) {
    console.error("Failed to fetch products for sitemap:", error);
  }

  return [...staticPages, ...shopPages, ...productPages];
}