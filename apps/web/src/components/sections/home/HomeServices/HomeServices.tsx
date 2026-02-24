"use client";

import { useRef } from "react";
import styles from "./HomeServices.module.css";
import Link from "next/link";
import Image from "next/image";

type ServiceItem = {
  title: string;
  text: string;
  slug: string;
  image?: {
    asset?: {
      url: string;
    };
    alt?: string;
  };
};

type Props = {
  services: {
    kicker?: string;
    title?: string;
    subtitle?: string;
    items?: ServiceItem[];
  };
};

export default function HomeServices({ services }: Props) {
  const items = services.items ?? [];
  const scrollerRef = useRef<HTMLDivElement>(null);

  if (!items.length) return null;

  /* =========================
     SCROLL WITH ARROWS
  ========================= */
  const scrollByAmount = (direction: "left" | "right") => {
    const container = scrollerRef.current;
    if (!container) return;

    const cardWidth = 360 + 28; // card width + gap
    container.scrollBy({
      left: direction === "right" ? cardWidth : -cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section id="home-services" className={styles.servicesSection}>
      <div className={styles.servicesInner}>
        {/* HEADER TESTI */}
        <div className={styles.servicesHeader}>
          {services.kicker && (
            <span className={styles.servicesKicker}>
              {services.kicker}
            </span>
          )}

          <h2 className={styles.servicesTitle}>
            {services.title}
          </h2>

          {services.subtitle && (
            <p className={styles.servicesSubtitle}>
              {services.subtitle}
            </p>
          )}
        </div>

        {/* ARROWS */}
        <div className={styles.servicesArrows}>
          <button
            onClick={() => scrollByAmount("left")}
            className={styles.arrowButton}
            aria-label="Scorri a sinistra"
          >
            ←
          </button>

          <button
            onClick={() => scrollByAmount("right")}
            className={styles.arrowButton}
            aria-label="Scorri a destra"
          >
            →
          </button>
        </div>

        {/* SCROLLER */}
        <div
          ref={scrollerRef}
          className={styles.servicesScroller}
        >

          {items.map((item, i) => (
            <Link
              key={i}
              href={`/${item.slug}`}
              className={styles.serviceCard}
            >
              {item.image?.asset?.url && (
                <div className={styles.serviceImageWrapper}>
                  <Image
                    src={item.image.asset.url}
                    alt={item.image.alt || item.title}
                    fill
                    sizes="360px"
                    className={styles.serviceImage}
                  />
                </div>
              )}

              <div className={styles.serviceContent}>
                <h3 className={styles.serviceTitle}>
                  {item.title}
                </h3>

                <p className={styles.serviceText}>
                  {item.text}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
