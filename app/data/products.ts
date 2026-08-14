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

  // OLD / COMPATIBILITY FIELDS
  image: string;
  hoverLeft: string;
  hoverRight: string;

  // NEW MEDIA FIELDS
  main_image: string | null;
  image_2: string | null;
  image_3: string | null;
  image_4: string | null;
  image_5: string | null;
  image_6: string | null;

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
// NORMALIZE IMAGE URL
// ======================================

function normalizeImageUrl(
  url: string | null | undefined
): string {
  if (!url) {
    return "/placeholder.webp";
  }

  // R2 / Cloudflare / external image
  if (
    url.startsWith("http://") ||
    url.startsWith("https://")
  ) {
    return url;
  }

  // Local public-folder image
  return `/${url.replace(/^\/+/, "")}`;
}


// ======================================
// GET PRODUCTS
// ======================================

export async function getProducts(): Promise<Product[]> {
  let data: any[] = [];

  try {
    const res = await fetch(
      `${BASE_URL}/api/products`,
      {
        next: {
          revalidate: 3600,
        },
      }
    );

    if (res.ok) {
      const response = await res.json();

      data = response.data ?? [];
    } else {
      console.error(
        "❌ API ERROR:",
        res.status
      );
    }

  } catch (error) {
    console.error(
      "⚠️ Fetch failed:",
      error
    );
  }


  return Array.isArray(data)
    ? data.map(
        (item: any): Product => {

          // ==================================
          // IMAGE URLS
          // ==================================

          const mainImage =
            normalizeImageUrl(
              item.main_image
            );

          const image2 =
            item.image_2
              ? normalizeImageUrl(
                  item.image_2
                )
              : mainImage;

          const image3 =
            item.image_3
              ? normalizeImageUrl(
                  item.image_3
                )
              : mainImage;

          const image4 =
            item.image_4
              ? normalizeImageUrl(
                  item.image_4
                )
              : null;

          const image5 =
            item.image_5
              ? normalizeImageUrl(
                  item.image_5
                )
              : null;

          const image6 =
            item.image_6
              ? normalizeImageUrl(
                  item.image_6
                )
              : null;


          return {

            // ==================================
            // BASIC PRODUCT DATA
            // ==================================

            id: Number(item.id),

            design_id: Number(
              item.design_id ?? item.id
            ),

            garment_type_id: Number(
              item.garment_type_id ?? 0
            ),

            color_id: Number(
              item.color_id ?? 0
            ),

            variant_code:
              item.variant_code ?? "",

            is_hero:
              Boolean(item.is_hero),

            gender_visibility:
              item.gender_visibility ??
              "unisex",

            hero_type:
              item.hero_type ?? "",

            title:
              item.title ?? "",

            price:
              Number(item.price ?? 0),

            category:
              item.category ?? "",

            type:
              item.type ?? "",

            collection:
              item.collection ?? "",

            design:
              item.design ?? "",

            color_name:
              item.color_name ?? "",

            color_slug:
              item.color_slug ?? "",

            hex_code:
              item.hex_code ?? "",


            // ==================================
            // NEW MEDIA ENGINE
            // ==================================

            main_image:
              mainImage,

            image_2:
              image2,

            image_3:
              image3,

            image_4:
              image4,

            image_5:
              image5,

            image_6:
              image6,


            // ==================================
            // OLD COMPATIBILITY FIELDS
            // ==================================

            image:
              mainImage,

            hoverLeft:
              image2,

            hoverRight:
              image3,


            // ==================================
            // HERO BANNER
            // ==================================

            banner:
              item.is_hero &&
              item.banner_image
                ? normalizeImageUrl(
                    item.banner_image
                  )
                : "",


            // ==================================
            // CREATED DATE
            // ==================================

            createdAt:
              item.created_at ?? "",
          };
        }
      )
    : [];
}