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

  banner: string;        // ✅ NEW
  createdAt: string;     // ✅ NEW
};

const BASE_URL = "http://localhost:5000";

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
          title: item.title || "",
          price: Number(item.price) || 0,

          category: item.category || "",
          type: item.type || "",
          collection: item.collection || "",

          design: item.design || "",

          image: item.image || "/fallback.jpg",
          hoverLeft: item.hover_left || item.image,
          hoverRight: item.hover_right || item.image,

          banner: item.banner || item.image,      // ✅ FIX
          createdAt: item.created_at || "",       // ✅ FIX
        }))
      : [];
  } catch (error) {
    console.error("❌ Fetch error:", error);
    return [];
  }
}