import { useState } from "react";

// Imports of styles
import styles from "./Navbar/Navbar.module.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);
}
