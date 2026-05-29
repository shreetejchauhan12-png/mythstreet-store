import ProductClient from "./ProductClient";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({
  params,
}: Props) {

  const { id } = await params;

  try {

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`,
      {
        next: { revalidate: 3600 },
      }
    );

    const product = await res.json();

    return {
      title: product?.title
        ? `${product.title} | MythStreet`
        : "MythStreet",

      description: product?.title
        ? `${product.title} by MythStreet. Premium anime streetwear crafted for everyday comfort and street culture.`
        : "Premium anime streetwear by MythStreet.",

      alternates: {
        canonical: `https://mythstreet.com/product/${id}`,
      },

      openGraph: {
        title: product?.title,
        description:
          "Premium anime streetwear by MythStreet.",

        images: [
          {
            url: `https://mythstreet.com/${product.image}`,
          },
        ],
      },

      twitter: {
        card: "summary_large_image",

        title: product?.title,

        description:
          "Premium anime streetwear by MythStreet.",

        images: [
          `https://mythstreet.com/${product.image}`,
        ],
      },
    };

  } catch {

    return {
      title: "MythStreet",
    };

  }
}

async function getProduct(id: string) {

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`,
    {
      next: { revalidate: 3600 },
    }
  );

  return res.json();
}

export default async function Page({
  params,
}: Props) {

  const { id } = await params;

  const product = await getProduct(id);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",

    name: product.title,

    image: [
      `https://mythstreet.com/${product.image}`,
    ],

    description:
      `${product.title} by MythStreet. Premium anime streetwear crafted for everyday comfort and street culture.`,

    brand: {
      "@type": "Brand",
      name: "MythStreet",
    },

    offers: {
      "@type": "Offer",
      url: `https://mythstreet.com/product/${id}`,
      priceCurrency: "INR",
      price: product.price,
      availability:
        "https://schema.org/InStock",
    },
  };

  const breadcrumbSchema = {
  "@context": "https://schema.org",

  "@type": "BreadcrumbList",

  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,

      name: "Home",

      item: "https://mythstreet.com",
    },

    {
      "@type": "ListItem",
      position: 2,

      name: "Shop",

      item: "https://mythstreet.com/shop/all/all",
    },

    {
      "@type": "ListItem",
      position: 3,

      name: product.title,

      item: `https://mythstreet.com/product/${id}`,
    },
  ],
};

  return (
    <>
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(schema),
    }}
  />

  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(
        breadcrumbSchema
      ),
    }}
  />

  <ProductClient />
</>
  );
}