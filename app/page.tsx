import Hero from "./components/home/Hero";
import CategorySection from "./components/home/CategorySection";
import TrustBadges from "./components/home/TrustBadges";
import NewArrivals from "./components/home/NewArrivals";
import TrendingBanner from "./components/home/TrendingBanner";
import LatestDropSlider from "./components/home/LatestDropSlider";
import CollectionSection from "./components/home/CollectionSection";
import Newsletter from "./components/home/Newsletter";

export default function Home() {
  return (
    <main>
      <Hero />
      <CategorySection />
      <TrustBadges />
      <NewArrivals />
      <TrendingBanner />
      <LatestDropSlider />
      <CollectionSection />
      <Newsletter />
    </main>
  );
}