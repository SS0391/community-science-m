import { useEffect, useState } from "react";
import { fetchSpaceNews } from "../../api/spaceApi";
import { Newspaper, Search, Calendar, ExternalLink, Sparkles } from "lucide-react";
import Styles from "../NewsPage/News.module.css";

export default function News() {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchSpaceNews(9);
        setArticles(data);
      } catch (err) {
        console.error("Error fetching news from APi", err);
        setError("Kan ikke vise nyheter nå. Prøv igjen senere");
      } finally {
        setLoading(false);
      }
    };
    loadNews();
  }, []);

  const filteredArticles = articles.filter((article) => article.title.toLowerCase().includes(searchQuery.toLowerCase()) || article.summary.toLowerCase().includes(searchQuery.toLowerCase()));
  const featuredArticle = filteredArticles;
  const remainingArticles = featuredArticle.slice(1);

  const formatDate = (dateString) => {
    if (!dateString) return "Nylig publisert";
    return new Date(dateString).toLocaleDateString("nb-NO", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };
}
