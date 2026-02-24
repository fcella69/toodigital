"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import styles from "./services.module.css";

type TechLogo = {
  asset?: { url: string };
  alt?: string;
};

type SiteType = {
  title: string;
  description?: string;
};

type ServiceWebData = {
  navTitle: string;
  kicker?: string;
  title: string;
  text?: string;
  image?: { asset?: { url: string }; alt?: string };
  technologies?: TechLogo[];
  siteTypes?: SiteType[];
  cta?: {
    title: string;
    text?: string;
    buttonLabel: string;
    buttonLink: string;
  };
};

type Props = {
  service: ServiceWebData;
  index: number;
  active: boolean;
  setSectionRef: (el: HTMLElement | null) => void;
};



export default function ServiceWeb({
  service,
  index,
  active,
  setSectionRef,
}: Props) {

  const sliderRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const techs = service.technologies || [];

  const startAutoplay = () => {
    if (!sliderRef.current) return;

    autoplayRef.current = setInterval(() => {
      const slider = sliderRef.current;
      if (!slider) return;

      const card = slider.querySelector(
        `.${styles.webTechCard}`
      ) as HTMLElement;

      if (!card) return;

      const scrollAmount = card.offsetWidth + 30; // 30 = gap

      if (
        slider.scrollLeft + slider.clientWidth >=
        slider.scrollWidth - scrollAmount
      ) {
        slider.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }, 3000);
  };

  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  };

  useEffect(() => {
    if (!techs.length) return;
    startAutoplay();
    return stopAutoplay;
  }, [techs.length]);

  return (
    <section
      id="web"
      ref={setSectionRef}
      data-index={index}
      className={`${styles.serviceWeb} ${active ? styles.isActive : ""}`}
    >
      {/* INTRO WHITE SECTION */}
      <div className={styles.webIntro}>
        <div className={styles.webIntroInner}>
          <div className={styles.webIntroContent}>
            {service.kicker && (
              <span className={styles.webKicker}>
                {service.kicker}
              </span>
            )}

            <h2 className={styles.webTitle}>
              {service.title}
            </h2>

            {service.text && (
              <p className={styles.webText}>
                {service.text}
              </p>
            )}
          </div>

          {service.image?.asset?.url && (
            <div className={styles.webImageWrapper}>
              <Image
                src={service.image.asset.url}
                alt={service.image.alt || ""}
                fill
                sizes="(max-width: 980px) 100vw, 50vw"
                className={styles.webImage}
              />
            </div>
          )}
        </div>
      </div>

      {/* TECHNOLOGIES CAROUSEL */}
      {techs.length > 0 && (
        <div
          className={styles.webTechSection}
          onMouseEnter={stopAutoplay}
          onMouseLeave={startAutoplay}
        >
          <div className={styles.webTechContainer}>

            <button
              className={styles.techArrow}
              onClick={() => {
                stopAutoplay();
                const slider = sliderRef.current;
                if (!slider) return;

                const card = slider.querySelector(
                  `.${styles.webTechCard}`
                ) as HTMLElement;

                if (!card) return;

                slider.scrollBy({
                  left: -(card.offsetWidth + 30),
                  behavior: "smooth",
                });
              }}
            >
              ←
            </button>

            <div className={styles.webTechViewport}>
              <div
                ref={sliderRef}
                className={styles.webTechSlider}
              >
                {techs.map((tech, i) =>
                  tech.asset?.url ? (
                    <div key={i} className={styles.webTechCard}>
                      <Image
                        src={tech.asset.url}
                        alt={tech.alt || ""}
                        width={150}
                        height={90}
                        className={styles.techImage}
                      />
                    </div>
                  ) : null
                )}
              </div>
            </div>

            <button
              className={styles.techArrow}
              onClick={() => {
                stopAutoplay();
                const slider = sliderRef.current;
                if (!slider) return;

                const card = slider.querySelector(
                  `.${styles.webTechCard}`
                ) as HTMLElement;

                if (!card) return;

                slider.scrollBy({
                  left: card.offsetWidth + 30,
                  behavior: "smooth",
                });
              }}
            >
              →
            </button>

          </div>
        </div>
      )}


      {/* SITE TYPES CARDS */}
      {service.siteTypes?.length ? (
        <div className={styles.webCardsSection}>
          <div className={styles.webCardsInner}>
            {service.siteTypes.map((type, i) => (
              <div key={i} className={styles.webCard}>
                <h3>{type.title}</h3>
                {type.description && <p>{type.description}</p>}
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {service.cta && (
        <div className={styles.webCtaSection}>
          <div className={styles.webCtaInner}>

            <div className={styles.webCtaContent}>
              <h3>{service.cta.title}</h3>
              {service.cta.text && (
                <p>{service.cta.text}</p>
              )}
            </div>

            <a
              href={service.cta.buttonLink}
              className={styles.webCtaButton}
            >
              {service.cta.buttonLabel}
            </a>

          </div>
        </div>
      )}

    </section>
  );
}