import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { fetchSpaceNews } from "../../api/spaceApi.js";
import { fetchArchaeology } from "../../api/arkeologiApi.js";
import styles from "./ArticleCard.module.css";

export default function ArticleCard() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedArticles = async () => {
      try {
        setLoading(true);
        const [spaceData, archData] = await Promise.all([fetchSpaceNews(2), fetchArchaeology(2)]);

        const spaceHighlight = spaceData || spaceData;
        const archHighlight = archData || archData;

        const featured = [
          {
            id: "featured-space",
            category: "Aktuelt fra kosmos",
            title: spaceHighlight?.title || "Nye oppdagelser i solsystemet",
            summary: spaceHighlight?.summary ? spaceHighlight.summary.slice(0, 160) + "..." : "Les siste nytt fra romfartsforskningen og opplev temaet i vår utstilling i Bergen.",
            image: spaceHighlight?.image_url,
            linkTo: "/news",
            linkLabel: "Les flere nyheter",
          },
          {
            id: "featured-arch",
            category: "Utstilling i fokus • Arkeologi",
            title: archHighlight?.title || "Skatter fra antikkens sivilisasjoner",
            summary: `Utforsk autentiske gjenstander fra ${archHighlight?.culture || "antikkens verden"} (${archHighlight?.objectDate || "historisk tid"}) i museets hovedsal.`,
            image: archHighlight?.primaryImageSmall,
            linkTo: "/exhibits",
            linkLabel: "Gå til utstillinger",
          },
        ];

        setArticles(featured);
      } catch (error) {
        console.error("Feil ved henting av forsideartikler:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedArticles();
  }, []);

  return (
    <section className={styles.featuredSection}>
      <div className={styles.sectionHeader}>
        <h2>Aktuelt på Community Science Museum</h2>
        <p>Opplev ekte vitenskap, historie og romfart midt i Bergen.</p>
      </div>

      {loading ? (
        <p className={styles.loadingText}>Laster utvalgte artikler...</p>
      ) : (
        <div className={styles.articlesGrid}>
          {articles.map((article) => (
            <article key={article.id} className={styles.articleCard}>
              <div className={styles.imageWrapper}>
                <img src={article.image} alt={article.title} />
              </div>
              <div className={styles.cardBody}>
                <span className={styles.category}>{article.category}</span>
                <h3>{article.title}</h3>
                <p>{article.summary}</p>
                <Link to={article.linkTo} className={styles.readMore}>
                  <span>{article.linkLabel}</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
