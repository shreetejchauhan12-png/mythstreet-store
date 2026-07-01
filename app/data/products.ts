export type Product = {
  id: number;
  design_id: number;
  variant_code: string;

  garment_type_id: number;
  color_id: number;

  color_name: string;
  color_slug: string;
  hex_code: string;

  is_hero: boolean;
  gender_visibility: string;
  hero_type: string;

  title: string;
  price: number;

  category: string;
  type: string;
  collection: string;

  design: string;

  image: string;
  hoverLeft: string;
  hoverRight: string;

  banner: string;

  createdAt: string;
};

// ======================================
// API URL
// ======================================

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://mythstreet-backend.onrender.com";

// ======================================
// GET PRODUCTS
// ======================================

export async function getProducts(): Promise<Product[]> {
  let data: any[] = [];

  try {
    const res = await fetch(`${BASE_URL}/api/products`, {
      next: { revalidate: 3600 },
    });

    if (res.ok) {
      const response = await res.json();
      data = response.data ?? [];
    } else {
      console.error("❌ API ERROR:", res.status);
    }
  } catch (error) {
    console.error("⚠️ Fetch failed:", error);
  }

  return Array.isArray(data)
    ? data.map((item: any): Product => ({
        id: Number(item.id),

        design_id: Number(item.design_id ?? item.id),

        garment_type_id: Number(item.garment_type_id ?? 0),

        color_id: Number(item.color_id ?? 0),

        variant_code: item.variant_code ?? "",

        is_hero: Boolean(item.is_hero),

        gender_visibility:
          item.gender_visibility ?? "unisex",

        hero_type: item.hero_type ?? "",

        title: item.title ?? "",

        price: Number(item.price ?? 0),

        category: item.category ?? "",

        type: item.type ?? "",

        collection: item.collection ?? "",

        design: item.design ?? "",

        color_name: item.color_name ?? "",

        color_slug: item.color_slug ?? "",

        hex_code: item.hex_code ?? "",

        // ✅ Main Image
        image: item.main_image
          ? `/${item.main_image.replace(/^\/+/, "")}`
          : "/placeholder.webp",

        // ✅ Back Image
        hoverLeft: item.image_2
          ? `/${item.image_2.replace(/^\/+/, "")}`
          : item.main_image
          ? `/${item.main_image.replace(/^\/+/, "")}`
          : "/placeholder.webp",

        // ✅ Model Front
        hoverRight: item.image_3
          ? `/${item.image_3.replace(/^\/+/, "")}`
          : item.main_image
          ? `/${item.main_image.replace(/^\/+/, "")}`
          : "/placeholder.webp",

        // ✅ Hero Banner
        banner:
          item.is_hero && item.banner_image
            ? `/${item.banner_image.replace(/^\/+/, "")}`
            : "",

        createdAt: item.created_at ?? "",
      }))
    : [];
}