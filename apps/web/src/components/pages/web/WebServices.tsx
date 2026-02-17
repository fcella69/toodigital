"use client";

import { useEffect, useRef } from "react";
import styles from "./web.module.css";

type Service = {
  title: string;
  text: string;
};

type Props = {
  services: {
    kicker?: string;
    title: string;
    text?: string;
    items?: Service[];
  };
};

export default function WebServices({ services }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);

  /* =========================
     ANIMAZIONE ON SCROLL
  ========================= */

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll(`.${styles.webServiceCard}`);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            cards.forEach((card, i) => {
              setTimeout(() => {
                card.classList.add(styles.webServiceCardVisible);
              }, i * 150);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.webServicesSection}>
      <div className={styles.webServicesInner}>
        
        {/* HEADER */}
        <div className={styles.webServicesHeader}>
          {services.kicker && (
            <span className={styles.webServicesKicker}>
              {services.kicker}
            </span>
          )}

          <h2 className={styles.webServicesTitle}>
            {services.title}
          </h2>

          {services.text && (
            <p className={styles.webServicesText}>
              {services.text}
            </p>
          )}
        </div>

        {/* CARDS */}
        {services.items && services.items.length > 0 && (
          <div className={styles.webServicesGrid}>
            {services.items.map((item, i) => (
              <div key={i} className={styles.webServiceCard}>
                <div className={styles.webServiceIcon} />

                <h3 className={styles.webServiceTitle}>
                  {item.title}
                </h3>

                <p className={styles.webServiceDescription}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
