import ArticleCard from "../../components/ArticleCard/ArticleCard.jsx";
import CtaBanner from "../../components/CtaBanner/CtaBanner.jsx";
import HeroCarousell from "../../components/HeroCarousel/HeroCarousel.jsx";
import NewsArticle from "../../components/NewsArticle/NewsArticle.jsx";
import Guides from "../GuidesPage/Guides.jsx";

export default function Home() {
  return (
    <div>
      <HeroCarousell />
      <ArticleCard />
      <CtaBanner />
      <NewsArticle />
      <Guides />
    </div>
  );
}
