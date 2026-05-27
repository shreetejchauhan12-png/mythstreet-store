import ProductClient from "./ProductClient";

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({
  params,
}: Props) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products/${params.id}`,
      {
        next: { revalidate: 3600 },
      }
    );

    const product = await res.json();

    return {
      title: `${product.title} | MythStreet`,
      description:
  `${product.title} by MythStreet. Premium anime streetwear crafted for everyday comfort and street culture.`,

      openGraph: {
        title: product.title,
        description:
          "Premium anime streetwear by MythStreet.",
        images: [
          {
            url: `https://mythstreet.in/${product.image}`,
          },
        ],
      },

      twitter: {
        card: "summary_large_image",
        title: product.title,
        description:
          "Premium anime streetwear by MythStreet.",
        images: [
          `https://mythstreet.in/${product.image}`,
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

  const product = await getProduct(params.id);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",

    name: product.title,

    image: [
      `https://mythstreet.in/${product.image}`,
    ],

    description:
      `${product.title} by MythStreet. Premium anime streetwear crafted for everyday comfort and street culture.`,

    brand: {
      "@type": "Brand",
      name: "MythStreet",
    },

    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: product.price,
      availability:
        "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      <ProductClient />
    </>
  );
}