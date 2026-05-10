export const dynamic = "force-dynamic";
export const revalidate = 0;

export type Product = {
  id: number;
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
      cache: "no-store",
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
        const productId = Number(item.id);

return {
  id: productId,

  title: item.title ?? "",
  price: Number(item.price ?? item.base_price ?? 0),

  category: item.category ?? "",
  type: item.type ?? "",
  collection: item.collection ?? "",

  design: item.design ?? "",

  // MAIN IMAGE
  image:
  item.image
    ? `/${item.image.replace(/^\/+/, "")}`
    : `/pd${productId}-1.jpg`,

hoverLeft:
  item.hover_left
    ? `/${item.hover_left.replace(/^\/+/, "")}`
    : `/pd${productId}-2.jpg`,

hoverRight:
  item.hover_right
    ? `/${item.hover_right.replace(/^\/+/, "")}`
    : `/pd${productId}-3.jpg`,

banner:
  item.banner
    ? `/${item.banner.replace(/^\/+/, "")}`
    : `/bn${productId}.jpg`,

  createdAt: item.created_at ?? "",
};
      })
    : [];
}