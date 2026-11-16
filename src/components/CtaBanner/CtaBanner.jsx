import { Link } from "react-router-dom";
import { Calendar, Sparkles } from "lucide-react";
import Styles from "../CtaBanner/CtaBanner.module.css";

export default function CtaBanner() {
  return (
    <section className={Styles.ctaWrapper}>
      <div className={Styles.ctaBox}>
        <div className={Styles.textContent}>
          <span className={Styles.badge}>
            <Sparkles size={15} />
            <span>For skoler i Bergen område</span>
          </span>
          <h2>Planlegg en uforglemmelig oppdagelseferd</h2>
          <p> Book en av våre dyktige guider innen arkeologi, paleontologi eller astronomi for en skreddersydd omvisning på museet.</p>
        </div>
        <div className={Styles.buttonGroup}>
          <Link to="/contact" className={Styles.primaryBtn}>
            <Calendar size={18} />
            <span>Book en guide</span>
          </Link>
          <Link to="/exhibits" className={Styles.secondaryBtn}>
            <span>Se alle utstillinger</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
