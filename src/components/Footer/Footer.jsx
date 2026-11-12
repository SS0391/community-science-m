import { Link } from "react-router-dom";
import { Landmark, Clock, MapPin, Mail, Phone, StrokeLineCapButt } from "lucide-react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerGrid}>
        <div className={styles.footerSection}>
          <Link to="/" className={styles.logo}>
            <Landmark size={24} />
            <span>Community Science Museum</span>
          </Link>
          <p className={styles.tagline}>Utforsk fortidens mysterier, jordens giganter og universets yttergrenser midt i hjertet av Bergen.</p>
        </div>
        <div className={styles.footerSection}>
          <h3>Utforsk</h3>
          <ul>
            <li>
              <Link to="/exhibits">Utstillinger</Link>
            </li>
            <li>
              <Link to="/news">Nyheter</Link>
            </li>
            <li>
              <Link to="/events">Kommende hendelser</Link>
            </li>
            <li>
              <Link to="/guides">Våre guider</Link>
            </li>
            <li>
              <Link to="/contact">Booking & Kontakt</Link>
            </li>
          </ul>
        </div>
        <div className={styles.footerSection}>
          <h3>Besøk oss i Bergen</h3>
          <p className={styles.infoRow}>
            <MapPin size={16} />
            <span>Bryggen 14, 5003 Bergen</span>
          </p>
          <p className={styles.infoRow}>
            <Clock size={16} />
            <span>Man–Søn: 10:00 – 18:00</span>
          </p>
          <p className={styles.infoRow}>
            <Phone size={16} />
            <span>+47 55 12 34 56</span>
          </p>
          <p className={styles.infoRow}>
            <Mail size={16} />
            <span>post@sciencemuseum.no</span>
          </p>
        </div>
        <div className={styles.bottomBar}>
          <p>© {new Date().getFullYear()} Community Science Museum Bergen. Alle rettigheter reservert.</p>
        </div>
      </div>
    </footer>
  );
}
