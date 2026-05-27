import ShopClient from "./ShopClient";

type Props = {
  params: {
    category: string;
    type: string;
  };
};

export async function generateMetadata({
  params,
}: Props) {

  const category =
    params.category.charAt(0).toUpperCase() +
    params.category.slice(1);

  const type =
    params.type === "all"
      ? "Streetwear"
      : params.type
          .replace(/-/g, " ")
          .replace(/\b\w/g, (l) =>
            l.toUpperCase()
          );

  return {
    title: `${category} ${type} | MythStreet`,

    description:
      `${category} ${type} by MythStreet. Premium anime streetwear inspired by modern street culture.`,
  };
}

export default function Page() {
  return <ShopClient />;
}