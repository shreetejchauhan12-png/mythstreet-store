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
        cache: "no-store",
      }
    );

    const product = await res.json();

    return {
      title: `${product.title} | MythStreet`,
      description:
        "Premium anime streetwear by MythStreet.",

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

export default function Page() {
  return <ProductClient />;
}