import { useState } from "react";
import { Link } from "react-router-dom";

// Imports of styles
import styles from "./Navbar.module.css";
import { Landmark, Menu, X, Clock, MapPin } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <Link to="/" className={styles.logo} onClick={closeMenu}>
          <Landmark size={26} />
          <span>Community Science Museum</span>
        </Link>
        <button className={styles.menuBtn} onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close Menu" : "Open Menu"} aria-expanded={menuOpen}>
          <span className={styles.menuLabel}>Menu</span>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>
      {menuOpen && (
        <div className={styles.dropdown}>
          <div className={styles.dropdownGrid}>
            <div className={styles.menuSection}>
              <h3>Utstillinger & Nyheter</h3>
              <ul>
                <li>
                  <Link to="/dinosaur" onClick={closeMenu}>
                    Dinosaurer
                  </Link>
                </li>
                <li>
                  <Link to="/verdensrommet" onClick={closeMenu}>
                    Verdensrommet
                  </Link>
                </li>
                <li>
                  <Link to="/arkeologi" onClick={closeMenu}>
                    Arkeologi
                  </Link>
                </li>
              </ul>
            </div>

            <div className={styles.menuSection}>
              <h3>Praktisk informasjon</h3>
              <ul>
                <li>
                  <Link to="/faq" onClick={closeMenu}>
                    FAQ – Ofte stilte spørsmål
                  </Link>
                </li>
                <li>
                  <Link to="/kontakt" onClick={closeMenu}>
                    Kontakt oss
                  </Link>
                </li>
              </ul>
            </div>

            <div className={styles.menuSection}>
              <h3>Besøk oss</h3>
              <p className={styles.infoRow}>
                <Clock size={16} />
                <span>Man–Søn: 10:00 – 18:00</span>
              </p>
              <p className={styles.infoRow}>
                <MapPin size={16} />
                <span>1007 Mountain Drive, Gotham City</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
