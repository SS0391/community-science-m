import { useState } from "react";
import Styles from "./EventsPage.module.css";
import { Sparkles, Calendar, Users, Clock, MapPin, Ticket, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
const UPCOMING_EVENTS = [
  {
    id: "stjernekikking-floyen",
    category: "space",
    categoryLabel: "Verdensrommet",
    title: "Stjernekikking på Fløyen",
    date: "28. november 2026",
    time: "19:30 – 22:00",
    location: "Fløyen Utsiktsplatå (Oppmøte ved Fløibanen)",
    guide: "Astrofysiker Astrid",
    spots: "12 ledige plasser",
    price: "Gratis for skoleelever / 120 kr",
    image: "https://unsplash.com",
    description: "Bli med Astrofysiker Astrid opp på Fløyen med kraftige stjernekikkerter! Vi ser nærmere på Jupiter, Saturns ringer og vinterstjernehimmelen over Bergen.",
  },
  {
    id: "dinosaurnatt-bryggen",
    category: "dinosaurs",
    categoryLabel: "Dinosaurer",
    title: "Dinosaurnatt i museet (Lommelykt-ekspedisjon)",
    date: "5. desember 2026",
    time: "18:00 – 21:00",
    location: "Sal 2 – Paleontologi, Bryggen 14",
    guide: "Paleontolog Per",
    spots: "8 ledige plasser",
    price: "150 kr (inkl. ekspedisjonsdiplom)",
    image: "https://unsplash.com",
    description: "Når museet stenger og lyset slukkes, våkner fortidens giganter! Utforsk skjelettene av Tyrannosaurus og Triceratops kun utstyrt med lommelykt.",
  },
  {
    id: "antikkens-skatter",
    category: "archaeology",
    categoryLabel: "Arkeologi",
    title: "Hieroglyfer & Antikkens Mysterier",
    date: "12. desember 2026",
    time: "13:00 – 15:00",
    location: "Sal 1 – Antikken, Bryggen 14",
    guide: "Arkeolog Amalie",
    spots: "18 ledige plasser",
    price: "Inkludert i inngangsbillett",
    image: "https://unsplash.com",
    description: "Lær å tyde ekte egyptiske hieroglyfer og hør historiene bak våre nyeste arkeologiske funn fra Middelhavet og antikken.",
  },
  {
    id: "rakettverksted-bergen",
    category: "space",
    categoryLabel: "Verdensrommet",
    title: "Rakettverksted & Mars-landing",
    date: "19. desember 2026",
    time: "12:00 – 15:30",
    location: "Romlaben, Community Science Museum",
    guide: "Astrofysiker Astrid",
    spots: "10 ledige plasser",
    price: "100 kr per deltaker",
    image: "https://unsplash.com",
    description: "Bygg og test din egen trykkluftrakett i museets verksted, og lær hvordan ingeniører lander rovere trygt på overflaten av Mars.",
  },
];
export default function Events() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [registeredId, setRegisteredIds] = useState([]);

  const toggleRegistration = (eventId) => {
    setRegisteredIds((prev) => (prev.includes(eventId) ? prev.filter((id) => id !== eventId) : [...prev, eventId]));
  };
  const filteredEvents = selectedCategory === "all" ? UPCOMING_EVENTS : UPCOMING_EVENTS.filter((ev) => ev.category === selectedCategory);

  return (
    <section className={Styles.eventsSection}>
      <div className={Styles.header}>
        <span className={Styles.subBadge}>
          <Sparkles size={14} />
          <span>Hva skjer i Bergen..??</span>
        </span>
        <h1>Kommende Hendelser</h1>
        <p>Bli med på kveldsarrangementer, verksteder og eksklusive omvisninger både på museet på Bryggen og ute i Bergens natur.</p>
      </div>

      {/* Filtering BTNS */}
      <div className={Styles.filterRow}>
        {[
          { id: "all", label: "Alle arrangementer" },
          { id: "space", label: "Verdensrommet" },
          { id: "dinosaurs", label: "Dinosaurer" },
          { id: "archaeology", label: "Arkeologi" },
        ].map((cat) => (
          <button key={cat.id} type="button" onClick={() => setSelectedCategory(cat.id)} className={selectedCategory === cat.id ? Styles.activeFilter : Styles.filterBtn}>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Events list */}

      <div className={Styles.eventsList}>
        {filteredEvents.map((event) => {
          const isRegistered = registeredId.includes(event.id);

          return (
            <article key={event.id} className={Styles.eventCard}>
              <div className={Styles.imageBox}>
                <img src={event.image} alt={event.title} />
                <span className={Styles.categoryTag}>{event.categoryLabel}</span>
              </div>

              <div className={Styles.cardContent}>
                <div className={Styles.topMeta}>
                  <span className={Styles.dateHighlight}>
                    <Calendar size={15} />
                    <span>{event.date}</span>
                  </span>
                  <span className={Styles.spotsBadge}>
                    <Users size={14} />
                    <span>{event.spots}</span>
                  </span>
                </div>

                <h2>{event.title}</h2>
                <p className={Styles.description}>{event.description}</p>

                <div className={Styles.detailsGrid}>
                  <p>
                    <Clock size={15} />
                    <span>{event.time}</span>
                  </p>
                  <p>
                    <MapPin size={15} />
                    <span>{event.location}</span>
                  </p>
                  <p>
                    <Ticket size={15} />
                    <span>{event.price}</span>
                  </p>
                </div>

                <div className={Styles.cardActions}>
                  <button type="button" onClick={() => toggleRegistration(event.id)} className={isRegistered ? Styles.registeredBtn : Styles.registerBtn}>
                    {isRegistered ? (
                      <>
                        <CheckCircle size={18} />
                        <span>Plass reservert! (Klikk for å avmelde)</span>
                      </>
                    ) : (
                      <span>Hold av plass</span>
                    )}
                  </button>

                  <Link to={`/contact?guide=${encodeURIComponent(event.guide)}`} className={Styles.guideLink}>
                    Book {event.guide} for skoleklasse →
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
