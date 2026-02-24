"use client";

import Image from "next/image";
import styles from "./services.module.css";

type Img = {
  asset?: { url: string };
  alt?: string;
};

type ProcessItem = {
  title: string;
  text?: string;
};

type ProjectType = {
  title: string;
  text?: string;
};

type ConsultingData = {
  navTitle?: string;
  kicker?: string;
  title?: string;
  text?: string;
  image?: Img;

  processKicker?: string;
  processTitle?: string;
  process?: ProcessItem[];

  typesKicker?: string;
  typesTitle?: string;
  types?: ProjectType[];

  cta?: {
    title: string;
    text?: string;
    buttonLabel: string;
    buttonLink: string;
  };
};

type Props = {
  service: ConsultingData | null;
  index: number;
  active: boolean;
  setSectionRef: (el: HTMLElement | null) => void;
};

export default function ServiceConsulting({
  service,
  index,
  active,
  setSectionRef,
}: Props) {

  if (!service) return null;

  return (
    <section
      id="consulting"
      ref={setSectionRef}
      data-index={index}
      className={`${styles.serviceConsulting} ${active ? styles.isActive : ""}`}
    >

      {/* INTRO WHITE */}
      <div className={styles.consultingIntro}>
        <div className={styles.consultingIntroInner}>

          <div className={styles.consultingIntroContent}>
            {service.kicker && (
              <span className={styles.consultingKicker}>{service.kicker}</span>
            )}

            {service.title && (
              <h2 className={styles.consultingTitle}>{service.title}</h2>
            )}

            {service.text && (
              <p className={styles.consultingText}>{service.text}</p>
            )}
          </div>

          {service.image?.asset?.url && (
            <div className={styles.consultingImageWrapper}>
              <Image
                src={service.image.asset.url}
                alt={service.image.alt || ""}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.consultingImage}
              />
            </div>
          )}

        </div>
      </div>

      {/* PROCESS (light premium) */}
      {service.process?.length && (
        <div className={styles.consultingProcess}>
          <div className={styles.consultingProcessInner}>

            <div className={styles.consultingProcessHead}>
              {service.processKicker && (
                <span className={styles.consultingSectionKicker}>
                  {service.processKicker}
                </span>
              )}

              {service.processTitle && (
                <h3 className={styles.consultingSectionTitle}>
                  {service.processTitle}
                </h3>
              )}
            </div>

            <div className={styles.consultingProcessGrid}>
              {service.process.map((item, i) => (
                <div key={i} className={styles.consultingProcessCard}>
                  <span className={styles.consultingProcessIndex}>
                    {`0${i + 1}`}
                  </span>
                  <h4>{item.title}</h4>
                  {item.text && <p>{item.text}</p>}
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* PROJECT TYPES (dark tech) */}
      {service.types?.length && (
        <div className={styles.consultingTypes}>
          <div className={styles.consultingTypesInner}>

            <div className={styles.consultingTypesHead}>
              {service.typesKicker && (
                <span className={styles.consultingSectionKickerDark}>
                  {service.typesKicker}
                </span>
              )}

              {service.typesTitle && (
                <h3 className={styles.consultingSectionTitleDark}>
                  {service.typesTitle}
                </h3>
              )}
            </div>

            <div className={styles.consultingTypesGrid}>
              {service.types.map((item, i) => (
                <div key={i} className={styles.consultingTypeCard}>
                  <h4>{item.title}</h4>
                  {item.text && <p>{item.text}</p>}
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* CTA */}
      {service.cta && (
        <div className={styles.webCtaSection}>
          <div className={styles.webCtaInner}>
            <div className={styles.webCtaContent}>
              <h3>{service.cta.title}</h3>
              {service.cta.text && <p>{service.cta.text}</p>}
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