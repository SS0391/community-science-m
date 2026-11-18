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

  return (
    <section className={Styles.newsSection}>
      <div className={Styles.header}>
        <div>
          <span className={Styles.subBadge}>
            <Sparkles size={14} />
            <span>Direkte fra kosmos & forskningsverdenen</span>
          </span>
          <h1>Nyheter & Oppdagelser</h1>
          <p>Følg med på de nyeste gjennombruddene innen romfart og vitenskap – temaer du kan utforske videre i utstillingene våre i Bergen.</p>
        </div>

        {/* Søkefelt */}
        <div className={Styles.searchBox}>
          <Search size={18} className={Styles.searchIcon} />
          <input type="text" placeholder="Søk i nyheter (f.eks. NASA, Mars, SpaceX)..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} aria-label="Søk i nyheter" />
        </div>
      </div>

      {loading ? (
        <div className={Styles.statusBox}>Henter ferske nyheter fra verdensrommet...</div>
      ) : error ? (
        <div className={Styles.statusBox}>{error}</div>
      ) : filteredArticles.length === 0 ? (
        <div className={Styles.statusBox}>Ingen nyheter matchet søket «{searchQuery}». Prøv et annet søkeord!</div>
      ) : (
        <>
          {/* Hovedoppslag (Første artikkel i stort format) */}
          {featuredArticle && (
            <article className={Styles.heroNewsCard}>
              <div className={Styles.heroImage}>
                <img
                  src={featuredArticle.image_url}
                  alt={featuredArticle.title}
                  onError={(e) => {
                    e.target.src = "https://unsplash.com";
                  }}
                />
              </div>

              <div className={Styles.heroBody}>
                <div className={Styles.metaRow}>
                  <span className={Styles.sourceBadge}>{featuredArticle.news_site || "Space News"}</span>
                  <span className={Styles.dateInfo}>
                    <Calendar size={14} />
                    <span>{formatDate(featuredArticle.published_at)}</span>
                  </span>
                </div>

                <h2>{featuredArticle.title}</h2>
                <p>{featuredArticle.summary}</p>

                <a href={featuredArticle.url} target="_blank" rel="noopener noreferrer" className={Styles.externalBtn}>
                  <span>Les originalartikkel</span>
                  <ExternalLink size={16} />
                </a>
              </div>
            </article>
          )}

          {remainingArticles.length > 0 && (
            <div className={Styles.newsGrid}>
              {remainingArticles.map((article) => (
                <article key={article.id} className={Styles.newsCard}>
                  <div className={Styles.cardImage}>
                    <img
                      src={article.image_url}
                      alt={article.title}
                      onError={(e) => {
                        e.target.src = "https://unsplash.com";
                      }}
                    />
                  </div>

                  <div className={Styles.cardBody}>
                    <div className={Styles.metaRow}>
                      <span className={Styles.sourceBadge}>{article.news_site || "Space News"}</span>
                      <span className={Styles.dateInfo}>{formatDate(article.published_at)}</span>
                    </div>

                    <h3>{article.title}</h3>
                    <p>{article.summary}</p>

                    <a href={article.url} target="_blank" rel="noopener noreferrer" className={Styles.readLink}>
                      <span>Les mer hos kilden</span>
                      <ExternalLink size={15} />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
