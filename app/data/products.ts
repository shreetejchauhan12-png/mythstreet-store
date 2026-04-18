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
  try {
    const res = await fetch(`${BASE_URL}/api/products`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("❌ API ERROR:", res.status);
      return [];
    }

    const data = await res.json();

    return Array.isArray(data)
      ? data.map((item: any): Product => ({
          id: Number(item.id),

          title: item.title ?? "",
          price: Number(item.price ?? item.base_price ?? 0),

          category: item.category ?? "",
          type: item.type ?? "",
          collection: item.collection ?? "",

          design: item.design ?? "",

          // 🔥 FORCE LOCAL IMAGES (NO BACKEND DEPENDENCY)
          image: `/p${item.id}.jpg`,
          hoverLeft: `/p${item.id}-left.jpg`,
          hoverRight: `/p${item.id}-right.jpg`,
          banner: `/p${item.id}.jpg`,

          createdAt: item.created_at ?? "",
        }))
      : [];
  } catch (error) {
    console.error("❌ Fetch error:", error);
    return [];
  }
}