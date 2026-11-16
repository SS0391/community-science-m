import ArticleCard from "../../components/ArticleCard/ArticleCard.jsx";
import CtaBanner from "../../components/CtaBanner/CtaBanner.jsx";
import HeroCarousell from "../../components/HeroCarousel/HeroCarousel.jsx";

export default function Home() {
  return (
    <div>
      <HeroCarousell />
      <ArticleCard />
      <CtaBanner />
    </div>
  );
}
