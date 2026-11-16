import Styles from "../GuidesPage/GuidesPage.module.css";
import { Link } from "react-router-dom";
import { Calendar, Award, BookOpen, Languages } from "lucide-react";
const GUIDES_DATA = [
  {
    id: "amalie",
    name: "Arkeolog Amalie",
    role: "Fagansvarlig for Arkeologi & Antikken",
    bio: "Amalie har en mastergrad i middelhavsarkeologi fra Universitetet i Bergen og har deltatt på utgravninger i både Hellas og Egypt. Hun elsker å levendegjøre antikkens hverdagsliv for skoleklasser.",
    specialty: "Egyptiske gravskatter & gresk keramikk",
    languages: "Norsk, Engelsk",
    experience: "8 års erfaring som museumsformidler",
  },
  {
    id: "per",
    name: "Paleontolog Per",
    role: "Ekspert på Dinosaurer & Forhistorisk Liv",
    bio: "Per er bergenseren som aldri sluttet å fascinere seg for Tyrannosaurus rex. Med bakgrunn i geologi og paleontologi tar han besøkende med 66 millioner år tilbake i tid gjennom museets fossilutstilling.",
    specialty: "Kritt-tiden, rov-dinosaurer & fossiler",
    languages: "Norsk, Engelsk, Tysk",
    experience: "11 års erfaring med undervisningsopplegg",
  },
  {
    id: "astrid",
    name: "Astrofysiker Astrid",
    role: "Leder for Verdensrommet & Planetariet",
    bio: "Astrid forsker på eksoplaneter og romfartsteknologi. Hun leder også museets populære kveldsturer for stjernekikking på Fløyen og viser hvordan moderne teleskoper avslører universets hemmeligheter.",
    specialty: "Romfart, solsystemet & nordlys",
    languages: "Norsk, Engelsk",
    experience: "6 års erfaring i Bergen",
  },
];

export default function Guides() {
  return (
    <section className={Styles.guidesSection}>
      <div className={Styles.header}>
        <span className={Styles.subBadge}>Våre Eksperter</span>
        <h1>Møt våre guider!</h1>
        <p>Våre kunnskapsrike formidlere brenner for å gjøre vitenskap og historie levende. Velg en guide som passer ditt fagområde for en skreddersydd omvisning.</p>
      </div>
      <div className={Styles.guidesGrid}>
        {GUIDES_DATA.map((guide) => (
          <article key={guide.id} className={Styles.guideCard}>
            <div className={Styles.imageWrapper}>
              <img src="../../assets/images.png" alt={guide.name} />
            </div>

            <div className={Styles.cardBody}>
              <span className={Styles.roleBadge}>{guide.role}</span>
              <h2>{guide.name}</h2>
              <p className={Styles.bio}>{guide.bio}</p>

              <div className={Styles.detailsList}>
                <p>
                  <BookOpen size={16} />
                  <span>
                    <strong>Spesialfelt:</strong> {guide.specialty}
                  </span>
                </p>
                <p>
                  <Award size={16} />
                  <span>{guide.experience}</span>
                </p>
                <p>
                  <Languages size={16} />
                  <span>{guide.languages}</span>
                </p>
              </div>

              <Link to={`/contact?guide=${encodeURIComponent(guide.name)}`} className={Styles.bookBtn}>
                <Calendar size={18} />
                <span>Book omvisning med {guide.name.split(" ")[1]}</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
