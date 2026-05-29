import ShopClient from "./ShopClient";
import Script from "next/script";

type Props = {
  params: Promise<{
    category: string;
    type: string;
  }>;
};

export async function generateMetadata({
  params,
}: Props) {

  const {
    category: rawCategory,
    type: rawType,
  } = await params;

  const safeCategory =
    rawCategory || "all";

  const category =
    safeCategory.charAt(0).toUpperCase() +
    safeCategory.slice(1);

  const safeType =
    rawType || "all";

  const type =
    safeType === "all"
      ? "Streetwear"
      : safeType
          .replace(/-/g, " ")
          .replace(/\b\w/g, (l) =>
            l.toUpperCase()
          );

  return {
    title: `${category} ${type} | MythStreet`,

    description:
      `${category} ${type} by MythStreet. Premium anime streetwear inspired by modern street culture.`,

    alternates: {
      canonical:
        `https://mythstreet.com/shop/${safeCategory}/${safeType}`,
    },
  };
}

export default async function Page({
  params,
}: Props) {

  const {
    category,
    type,
  } = await params;

  const collectionSchema = {
    "@context": "https://schema.org",

    "@type": "CollectionPage",

    name:
      `${category} ${type} Collection`,

    url:
      `https://mythstreet.com/shop/${category}/${type}`,

    description:
      `Explore ${category} ${type} collection by MYTHSTREET.`,

    isPartOf: {
      "@type": "WebSite",
      name: "MYTHSTREET",
      url: "https://mythstreet.com",
    },
  };

  return (
    <>
      <Script
        id="collection-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            collectionSchema
          ),
        }}
      />

      <ShopClient />
    </>
  );
}