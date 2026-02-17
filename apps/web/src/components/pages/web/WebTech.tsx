"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./web.module.css";

type TechItem = {
  name: string;
  description?: string;
  category?: string;
};

type Props = {
  tech: {
    kicker?: string;
    title: string;
    text?: string;
    items?: TechItem[];
  };
};

export default function WebTech({ tech }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  /* =========================
     TRIGGER ON SCROLL
  ========================= */

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.webTechSection} ${
        visible ? styles.webTechVisible : ""
      }`}
    >
      <div className={styles.webTechInner}>
        <div className={styles.webTechHeader}>
          {tech.kicker && (
            <span className={styles.webTechKicker}>
              {tech.kicker}
            </span>
          )}

          <h2 className={styles.webTechTitle}>{tech.title}</h2>

          {tech.text && (
            <p className={styles.webTechText}>{tech.text}</p>
          )}
        </div>

        {tech.items && tech.items.length > 0 && (
          <div className={styles.webTechGrid}>
            {tech.items.map((item, i) => (
              <div key={i} className={styles.webTechCard}>
                {item.category && (
                  <span className={styles.webTechCategory}>
                    {item.category}
                  </span>
                )}

                <h3 className={styles.webTechName}>
                  {item.name}
                </h3>

                {item.description && (
                  <p className={styles.webTechDescription}>
                    {item.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
