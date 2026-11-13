import { useState, useEffect, useEffectEvent } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import styles from "../HeroCarousel/HeroCarousel.module.css";

// Swiper CSS
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Api calls
import { fetchArchaeology } from "../../api/arkeologiApi.js";
import { fetchDinosaurs } from "../../api/dinoApi.js";
import { fetchSpaceNews } from "../../api/spaceApi.js";

export default function HeroCarousell() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const loadHeroSlide = async () => {
      try {
        setLoading(true);
        const [spaceData, archData, dinoData] = await Promise.all([fetchSpaceNews(1), fetchArchaeology(1), fetchDinosaurs(1)]);
        const spaceItem = spaceData[0];
        const archItem = archData[0];
        const dinoItem = dinoData.find((d) => d.thumbnail) || dinoData[0];

        const formattedSlides = [
          {
            id: "space",
            category: "Verdensrommet",
            title: spaceItem?.title || "Utforsk universets mysterier",
            description: spaceItem?.summary?.slice(0, 150) + "..." || "Opplev siste nytt fra romfarten i vår kosmos-utstilling i Bergen.",
            image: spaceItem?.image_url,
            linkTo: "/news",
            btnText: "Les romfartsnyheter",
          },
          {
            id: "archaeology",
            category: "Arkeologi & Antikken",
            title: archItem?.title || "Skatter fra antikken",
            description: `Opplev ekte historiske gjenstander fra ${archItem?.culture || "antikkens sivilisasjoner"} (${archItem?.objectDate || "historisk tid"}).`,
            image: archItem?.primaryImageSmall,
            linkTo: "/exhibits",
            btnText: "Se utstillingen",
          },
          {
            id: "dinosaurs",
            category: "Paleontologi & Dinosaurer",
            title: dinoItem?.title || "Jordens forhistoriske giganter",
            description: dinoItem?.extract?.slice(0, 150) + "..." || "Møt dinosaurene ansikt til ansikt i museets paleontologi-avdeling.",
            image: dinoItem?.thumbnail?.source,
            linkTo: "/exhibits",
            btnText: "Utforsk dinosaurene",
          },
        ];

        setSlides(formattedSlides);
      } catch (err) {
        console.error("API-feil:", err);
        setError("Kunne ikke laste utstillingshøydepunkter akkurat nå.");
      } finally {
        setLoading(false);
      }
    };

    loadHeroSlide();
  }, []);

  if (loading) {
    return <div className={styles.statusBox}>Laster utstillinger fra Bergen og kosmos...</div>;
  }

  if (error) {
    return <div className={styles.statusBox}>{error}</div>;
  }

  return (
    <section className={styles.heroWrapper}>
      <Swiper modules={[Navigation, Pagination, Autoplay]} spaceBetween={0} slidesPerView={1} navigation pagination={{ clickable: true }} autoplay={{ delay: 5000, disableOnInteraction: false }} loop={true} className={styles.swiperContainer}>
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className={styles.slide}>
            <img src={slide.image} alt={slide.title} className={styles.slideImage} />
            <div className={styles.overlay}>
              <div className={styles.content}>
                <span className={styles.badge}>{slide.category}</span>
                <h2 className={styles.title}>{slide.title}</h2>
                <p className={styles.description}>{slide.description}</p>
                <Link to={slide.linkTo} className={styles.ctaBtn}>
                  {slide.btnText}
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
