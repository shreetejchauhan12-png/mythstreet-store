const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://mythstreet-backend.onrender.com";

export async function getDesignVariants(
  designId: number
) {
  try {

    const res = await fetch(
      `${BASE_URL}/api/products/design/${designId}`,
      {
        next: {
          cache: "no-store",
        },
      }
    );

    if (!res.ok) {
      return [];
    }

    return await res.json();

  } catch (error) {

    console.error(
      "DESIGN VARIANTS ERROR:",
      error
    );

    return [];
  }
}