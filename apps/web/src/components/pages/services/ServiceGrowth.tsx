"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./services.module.css";
import { HiOutlineArrowRight, HiOutlineArrowLeft } from "react-icons/hi";

type Img = {
  asset?: { url: string };
  alt?: string;
};

type ShowcaseItem = Img;

type IdentityItem = {
  icon?: Img;
  title: string;
  text?: string;
};

type GrowthCta = {
  title: string;
  text?: string;
  buttonLabel: string;
  buttonLink: string;
};

type GrowthData = {
  navTitle?: string;
  kicker?: string;
  title?: string;
  text?: string;
  image?: Img;

  showcaseKicker?: string;
  showcaseTitle?: string;
  showcase?: ShowcaseItem[];

  identityKicker?: string;
  identityTitle?: string;
  identity?: IdentityItem[];

  cta?: GrowthCta;
};

type Props = {
  service: GrowthData | null;
  index: number;
  active: boolean;
  setSectionRef: (el: HTMLElement | null) => void;
};

export default function ServiceGrowth({
  service,
  index,
  active,
  setSectionRef,
}: Props) {
  // ✅ guard: se Sanity non passa il blocco, non esplodiamo
  if (!service) return null;

  const sliderRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const showcase = service.showcase || [];

  const startAutoplay = () => {
    if (!sliderRef.current) return;

    autoplayRef.current = setInterval(() => {
      const slider = sliderRef.current;
      if (!slider) return;

      const card = slider.querySelector(
        `.${styles.growthShowcaseCard}`
      ) as HTMLElement;

      if (!card) return;

      const gap = 30;
      const scrollAmount = card.offsetWidth + gap;

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
    if (!showcase.length) return;
    startAutoplay();
    return stopAutoplay;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showcase.length]);

  return (
    <section
      id="growth"
      ref={setSectionRef}
      data-index={index}
      className={`${styles.serviceGrowth} ${active ? styles.isActive : ""}`}
    >
      {/* INTRO WHITE (come Social) */}
      <div className={styles.growthIntro}>
        <div className={styles.growthIntroInner}>
          <div className={styles.growthIntroContent}>
            {service.kicker && <span className={styles.growthKicker}>{service.kicker}</span>}

            {service.title && <h2 className={styles.growthTitle}>{service.title}</h2>}

            {service.text && <p className={styles.growthText}>{service.text}</p>}
          </div>

          {service.image?.asset?.url && (
            <div className={styles.growthImageWrapper}>
              <Image
                src={service.image.asset.url}
                alt={service.image.alt || ""}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.growthImage}
              />
            </div>
          )}
        </div>
      </div>

      {/* SHOWCASE CAROUSEL (uguale al carousel platforms) */}
      {showcase.length > 0 && (
        <div
          className={styles.growthShowcase}
          onMouseEnter={stopAutoplay}
          onMouseLeave={startAutoplay}
        >
          <div className={styles.growthShowcaseHeader}>
            <div className={styles.growthShowcaseHeaderInner}>
              <div>
                {service.showcaseKicker && (
                  <span className={styles.growthShowcaseKicker}>{service.showcaseKicker}</span>
                )}
                {service.showcaseTitle && (
                  <h3 className={styles.growthShowcaseTitle}>{service.showcaseTitle}</h3>
                )}
              </div>
            </div>
          </div>

          <div className={styles.growthShowcaseContainer}>
            <button
              className={styles.techArrow}
              onClick={() => {
                stopAutoplay();
                const slider = sliderRef.current;
                if (!slider) return;

                const card = slider.querySelector(
                  `.${styles.growthShowcaseCard}`
                ) as HTMLElement;

                if (!card) return;

                slider.scrollBy({
                  left: -(card.offsetWidth + 30),
                  behavior: "smooth",
                });
              }}
              aria-label="Precedente"
            >
              <HiOutlineArrowLeft />
            </button>

            <div className={styles.growthShowcaseViewport}>
              <div ref={sliderRef} className={styles.growthShowcaseSlider}>
                {showcase.map((item, i) =>
                  item.asset?.url ? (
                    <div key={i} className={styles.growthShowcaseCard}>
                      <Image
                        src={item.asset.url}
                        alt={item.alt || ""}
                        width={560}
                        height={320}
                        className={styles.growthShowcaseImage}
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
                  `.${styles.growthShowcaseCard}`
                ) as HTMLElement;

                if (!card) return;

                slider.scrollBy({
                  left: card.offsetWidth + 30,
                  behavior: "smooth",
                });
              }}
              aria-label="Successivo"
            >
              <HiOutlineArrowRight />
            </button>
          </div>
        </div>
      )}

      {/* IDENTITÀ — 3 card premium dark */}
      {service.identity?.length ? (
        <div className={styles.growthIdentity}>
          <div className={styles.growthIdentityInner}>
            <div className={styles.growthIdentityHead}>
              {service.identityKicker && (
                <span className={styles.growthIdentityKicker}>{service.identityKicker}</span>
              )}
              {service.identityTitle && (
                <h3 className={styles.growthIdentityTitle}>{service.identityTitle}</h3>
              )}
            </div>

            <div className={styles.growthIdentityGrid}>
              {service.identity.slice(0, 3).map((it, i) => (
                <div key={i} className={styles.growthIdentityCard}>
                  <div className={styles.growthIdentityIcon}>
                    {it.icon?.asset?.url ? (
                      <Image
                        src={it.icon.asset.url}
                        alt={it.icon.alt || ""}
                        width={46}
                        height={46}
                      />
                    ) : null}
                  </div>

                  <h4 className={styles.growthIdentityCardTitle}>{it.title}</h4>
                  {it.text && <p className={styles.growthIdentityCardText}>{it.text}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {/* CTA — uguale a Web/Social */}
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