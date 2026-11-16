import { useEffect, useState } from "react";
import { fetchSpaceNews } from "../../api/spaceApi";
import { Newspaper, ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import Styles from "../NewsArticle/NewsArticle.module.css";

export default function NewsArticle() {
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true);
        const data = await fetchSpaceNews(3);
        const selected = data.at(2) || data.at(0);
        setNewsItem(selected);
      } catch (err) {
        console.error("Error while trying to fetch news", err);
      } finally {
        setLoading(false);
      }
    };
    loadNews();
  }, []);
  if (loading) {
    return (
      <section className={Styles.newsSection}>
        <p className={Styles.loadingTxt}>Vent snart kommer nyhetene</p>
      </section>
    );
  }

  if (!newsItem) return null;

  const formattedDate = newsItem.published_at
    ? new Date(newsItem.published_at).toLocaleDateString("nb-NO", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Nylig publisert";

  return (
    <section className={Styles.newsSection}>
      <div className={Styles.sectionHeader}>
        <div className={Styles.titleRow}>
          <Newspaper size={22} className={Styles.headerIcon} />
          <h2>Siste nytt fra romfart & forskning</h2>
        </div>
        <Link to="/news" className={Styles.allNewsLink}>
          <span>Se alle nyheter</span>
          <ArrowRight size={16} />
        </Link>
      </div>

      <article className={Styles.featuredNewsCard}>
        <div className={Styles.imageBox}>
          <img
            src={newsItem.image_url}
            alt={newsItem.title}
            onError={(e) => {
              e.target.src = "https://unsplash.com";
            }}
          />
        </div>

        <div className={Styles.contentBox}>
          <div className={Styles.metaRow}>
            <span className={Styles.sourceBadge}>{newsItem.news_site || "Space News"}</span>
            <span className={Styles.dateInfo}>
              <Calendar size={14} />
              <span>{formattedDate}</span>
            </span>
          </div>

          <h3>{newsItem.title}</h3>
          <p>{newsItem.summary}</p>

          <Link to="/news" className={Styles.readArticleBtn}>
            <span>Les hele saken på nyhetssiden</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </article>
    </section>
  );
}
