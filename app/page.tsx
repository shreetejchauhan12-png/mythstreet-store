import Hero from "./components/home/Hero";
import CategorySection from "./components/home/CategorySection";
import TrustBadges from "./components/home/TrustBadges";
import NewArrivals from "./components/home/NewArrivals";
import TrendingBanner from "./components/home/TrendingBanner";
import LatestDropSlider from "./components/home/LatestDropSlider";
import CollectionSection from "./components/home/CollectionSection";
import Newsletter from "./components/home/Newsletter";

import { getProducts } from "@/app/data/products";

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="space-y-2 md:space-y-3">

  <h1 className="sr-only">
    MYTHSTREET Premium Oversized Streetwear India
  </h1>

  <Hero />
<CategorySection />
<TrustBadges />

<TrendingBanner products={products} />

<NewArrivals products={products} />

<LatestDropSlider products={products} />

<CollectionSection />



<Newsletter />
    </main>
  );
}