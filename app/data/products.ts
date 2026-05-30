

export type Product = {
  id: number;
  design_id: number;
  variant_code: string;
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

// ✅ SAFE BASE URL
const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://mythstreet-backend.onrender.com";

export async function getProducts(): Promise<Product[]> {
  let data: any[] = [];

  try {
    const res = await fetch(`${BASE_URL}/api/products`, {
      cache: "no-store"
    });

    if (res.ok) {
      data = await res.json();
    } else {
      console.error("❌ API ERROR:", res.status);
    }
  } catch (error) {
    console.error("⚠️ Fetch failed, using fallback", error);
  }

  return Array.isArray(data)
    ? data.map((item: any): Product => {
        const productId = Number(item.design_id || item.id);

return {
  id: Number(item.id),

  design_id: Number(item.design_id ?? item.id),

  variant_code: item.variant_code ?? "",

  is_hero: Boolean(item.is_hero),

  gender_visibility:
    item.gender_visibility ?? "unisex",

  hero_type: item.hero_type ?? "",

  title: item.title ?? "",

  price: Number(
    item.price ?? item.base_price ?? 0
  ),

  category: item.category ?? "",

  type: item.type ?? "",

  collection: item.collection ?? "",

  design: item.design ?? "",

  // ✅ MAIN IMAGE
  image:
    item.image
      ? `/${item.image.replace(/^\/+/, "")}`
      : `/pd${item.id}-1.jpg`,

  // ✅ HOVER LEFT
  hoverLeft:
    item.hover_left
      ? `/${item.hover_left.replace(/^\/+/, "")}`
      : `/pd${item.id}-2.jpg`,

  // ✅ HOVER RIGHT
  hoverRight:
    item.hover_right
      ? `/${item.hover_right.replace(/^\/+/, "")}`
      : `/pd${item.id}-3.jpg`,

  // ✅ BANNER (ONLY HERO PRODUCTS)
banner:
  item.is_hero
    ? item.banner
      ? `/${item.banner.replace(/^\/+/, "")}`
      : `/${item.design}-bn.jpg`
    : "",

  createdAt: item.created_at ?? "",
};
      })
    : [];
}