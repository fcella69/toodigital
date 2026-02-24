"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import styles from "./services.module.css";
import { HiOutlineArrowRight, HiOutlineArrowLeft } from "react-icons/hi";
import { FiCheckCircle } from "react-icons/fi";

type Platform = {
  asset?: { url: string };
  alt?: string;
};

type BrandService = {
  title: string;
  description?: string;
  bullets?: string[];
};

type Metric = {
  value: number;
  suffix?: string;
  label: string;
};

type BrandData = {
  navTitle: string;
  kicker?: string;
  title: string;
  text?: string;
  image?: { asset?: { url: string }; alt?: string };

  platforms?: Platform[];
  services?: BrandService[];
  metrics?: Metric[];

  cta?: {
    title: string;
    text?: string;
    buttonLabel: string;
    buttonLink: string;
  };
};

type Props = {
  service: BrandData;
  index: number;
  active: boolean;
  setSectionRef: (el: HTMLElement | null) => void;
};

export default function ServiceBrand({
  service,
  index,
  active,
  setSectionRef,
}: Props) {
  const sliderRef = useRef<HTMLDivElement>(null);

  // ✅ in browser meglio questo rispetto a NodeJS.Timeout
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const platforms = useMemo(() => service.platforms || [], [service.platforms]);

  const startAutoplay = () => {
    if (!sliderRef.current) return;

    autoplayRef.current = setInterval(() => {
      const slider = sliderRef.current;
      if (!slider) return;

      const card = slider.querySelector(
        `.${styles.platformCard}`
      ) as HTMLElement | null;

      if (!card) return;

      const scrollAmount = card.offsetWidth + 30;

      if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - scrollAmount) {
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
    if (!platforms.length) return;
    startAutoplay();
    return stopAutoplay;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [platforms.length]);

  /* =========================
     COUNTER ANIMATION
     ✅ FIX: countersRef ora è HTMLSpanElement (non Div)
  ========================= */

  const countersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!service.metrics?.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const el = entry.target as HTMLSpanElement;
          const target = Number(el.dataset.target || 0);

          let current = 0;
          const increment = target / 60;

          const update = () => {
            current += increment;

            if (current < target) {
              el.innerText = Math.floor(current).toString();
              requestAnimationFrame(update);
            } else {
              el.innerText = target.toString();
            }
          };

          update();
          observer.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );

    countersRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [service.metrics]);

  return (
    <section
      id="brand"
      ref={setSectionRef}
      data-index={index}
      className={`${styles.serviceBrand} ${active ? styles.isActive : ""}`}
    >
      {/* INTRO WHITE */}
      <div className={styles.brandIntro}>
        <div className={styles.brandIntroInner}>
          <div className={styles.brandIntroContent}>
            {service.kicker && (
              <span className={styles.brandKicker}>{service.kicker}</span>
            )}

            <h2 className={styles.brandTitle}>{service.title}</h2>

            {service.text && <p className={styles.brandText}>{service.text}</p>}
          </div>

          {service.image?.asset?.url && (
            <div className={styles.brandImageWrapper}>
              <Image
                src={service.image.asset.url}
                alt={service.image.alt || ""}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.brandImage}
              />
            </div>
          )}
        </div>
      </div>

      {/* PLATFORMS CAROUSEL */}
      {platforms.length > 0 && (
        <div
          className={styles.brandPlatforms}
          onMouseEnter={stopAutoplay}
          onMouseLeave={startAutoplay}
        >
          <div className={styles.platformContainer}>
            <button
              type="button"
              className={styles.techArrow}
              aria-label="Scorri a sinistra"
              onClick={() => {
                stopAutoplay();
                const slider = sliderRef.current;
                if (!slider) return;

                const card = slider.querySelector(
                  `.${styles.platformCard}`
                ) as HTMLElement | null;

                if (!card) return;

                slider.scrollBy({
                  left: -(card.offsetWidth + 30),
                  behavior: "smooth",
                });
              }}
            >
              <HiOutlineArrowLeft />
            </button>

            <div className={styles.platformViewport}>
              <div ref={sliderRef} className={styles.platformSlider}>
                {platforms.map((platform, i) =>
                  platform.asset?.url ? (
                    <div key={i} className={styles.platformCard}>
                      <Image
                        src={platform.asset.url}
                        alt={platform.alt || ""}
                        width={140}
                        height={80}
                        className={styles.platformImage}
                      />
                    </div>
                  ) : null
                )}
              </div>
            </div>

            <button
              type="button"
              className={styles.techArrow}
              aria-label="Scorri a destra"
              onClick={() => {
                stopAutoplay();
                const slider = sliderRef.current;
                if (!slider) return;

                const card = slider.querySelector(
                  `.${styles.platformCard}`
                ) as HTMLElement | null;

                if (!card) return;

                slider.scrollBy({
                  left: card.offsetWidth + 30,
                  behavior: "smooth",
                });
              }}
            >
              <HiOutlineArrowRight />
            </button>
          </div>
        </div>
      )}

      {/* WHAT WE DO */}
      {service.services?.length ? (
        <div className={styles.brandServices}>
          <div className={styles.brandServicesInner}>
            {service.services.map((item, i) => (
              <div key={i} className={styles.brandServiceCard}>
                <h3>{item.title}</h3>
                {item.description && <p>{item.description}</p>}

                {!!item.bullets?.length && (
                  <ul>
                    {item.bullets.map((b, j) => (
                      <li key={j}>
                        <FiCheckCircle className={styles.bulletIcon} />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* METRICS */}
      {service.metrics?.length ? (
        <div className={styles.brandMetrics}>
          <div className={styles.brandMetricsInner}>
            {service.metrics.map((metric, i) => (
              <div key={i} className={styles.metricItem}>
                <span
                  ref={(el) => {
                    countersRef.current[i] = el;
                  }}
                  data-target={metric.value}
                  className={styles.metricValue}
                >
                  0
                </span>
                <span className={styles.metricSuffix}>{metric.suffix}</span>
                <p>{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* CTA */}
      {service.cta && (
        <div className={styles.webCtaSection}>
          <div className={styles.webCtaInner}>
            <div className={styles.webCtaContent}>
              <h3>{service.cta.title}</h3>
              {service.cta.text && <p>{service.cta.text}</p>}
            </div>

            <a href={service.cta.buttonLink} className={styles.webCtaButton}>
              {service.cta.buttonLabel}
            </a>
          </div>
        </div>
      )}
    </section>
  );
}