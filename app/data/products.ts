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
  ? data.map((item: any): Product => {
      const index = ((Number(item.id) - 1) % 8) + 1;

      return {
        id: Number(item.id),

        title: item.title ?? "",
        price: Number(item.price ?? item.base_price ?? 0),

        category: item.category ?? "",
        type: item.type ?? "",
        collection: item.collection ?? "",

        design: item.design ?? "",

        // ✅ FIXED (fallback if backend image missing)
        image:
  item.image ||
  (item.type === "hoodie"
    ? "/pd1.jpg"
    : item.type === "tshirt"
    ? "/pd2.jpg"
    : item.type === "sweatshirt"
    ? "/pd3.jpg"
    : item.type === "oversized"
    ? "/pd4.jpg"
    : "/pd2.jpg"),

hoverLeft:
  item.hover_left ||
  (item.type === "hoodie"
    ? "/pd1.jpg"
    : item.type === "tshirt"
    ? "/pd2.jpg"
    : item.type === "sweatshirt"
    ? "/pd3.jpg"
    : item.type === "oversized"
    ? "/pd4.jpg"
    : "/pd2.jpg"),

hoverRight:
  item.hover_right ||
  (item.type === "hoodie"
    ? "/pd1.jpg"
    : item.type === "tshirt"
    ? "/pd2.jpg"
    : item.type === "sweatshirt"
    ? "/pd3.jpg"
    : item.type === "oversized"
    ? "/pd4.jpg"
    : "/pd2.jpg"),

banner: item.banner || `/banner${index}.jpg`,

        createdAt: item.created_at ?? "",
      };
    })
  : [];
  } catch (error) {
    console.error("❌ Fetch error:", error);
    return [];
  }
}