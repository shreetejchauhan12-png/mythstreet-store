import ProductClient from "./ProductClient";
import Script from "next/script";
import { getDesignVariants } from "@/app/data/getDesignVariants";

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

    const response = await res.json();

const product = response.data;

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

  const response = await res.json();

return response.data;
}

export default async function Page({
  params,
}: Props) {

  const { id } = await params;

  const product = await getProduct(id);

  const variants =
  await getDesignVariants(
    product.design_id
  );

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",

    name: product.title,

    image: [
      `https://mythstreet.com/${product.image}`,
    ],

    description:
      `${product.title} by MythStreet. Premium anime streetwear crafted for everyday comfort and street culture.`,

    sku: `${product.id}`,

brand: {
  "@type": "Brand",
  name: "MythStreet",
},

category: product.type,

offers: {
  "@type": "Offer",

  url: `https://mythstreet.com/product/${id}`,

  priceCurrency: "INR",

  price: product.price,

  availability:
    "https://schema.org/InStock",

  itemCondition:
    "https://schema.org/NewCondition",
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
  <Script
  id="product-schema"
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(schema),
  }}
/>

  <Script
  id="breadcrumb-schema"
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(
      breadcrumbSchema
    ),
  }}
/>

  <ProductClient variants={variants} />
</>
  );
}