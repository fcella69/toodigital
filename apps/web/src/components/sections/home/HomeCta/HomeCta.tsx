"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./HomeCta.module.css";

type Props = {
  cta: {
    kicker?: string;
    title: string;
    text?: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel?: string;
    secondaryHref?: string;

    backgroundImage?: {
      asset?: { url: string };
      alt?: string;
    };

    image?: {
      asset?: { url: string };
      alt?: string;
    };
  };
};

export default function HomeCta({ cta }: Props) {
  return (
    <section className={styles.section}>

      {/* BACKGROUND IMAGE */}
      {cta.backgroundImage?.asset?.url && (
        <div className={styles.bgWrapper}>
          <Image
            src={cta.backgroundImage.asset.url}
            alt={cta.backgroundImage.alt || ""}
            fill
            priority={false}
            className={styles.bgImage}
          />
          <div className={styles.overlay} />
        </div>
      )}

      <div className={styles.inner}>
        <div className={styles.grid}>

          {/* LEFT CONTENT */}
          <div className={styles.content}>
            {cta.kicker && (
              <span className={styles.kicker}>
                {cta.kicker}
              </span>
            )}

            <h2 className={styles.title}>
              {cta.title}
            </h2>

            {cta.text && (
              <p className={styles.text}>
                {cta.text}
              </p>
            )}

            <div className={styles.buttons}>
              <Link
                href={cta.primaryHref}
                className={styles.primaryBtn}
              >
                {cta.primaryLabel}
              </Link>

              {cta.secondaryLabel && cta.secondaryHref && (
                <Link
                  href={cta.secondaryHref}
                  className={styles.secondaryBtn}
                >
                  {cta.secondaryLabel}
                </Link>
              )}
            </div>
          </div>

          {/* RIGHT IMAGE */}
          {cta.image?.asset?.url && (
            <div className={styles.imageWrapper}>
              <Image
                src={cta.image.asset.url}
                alt={cta.image.alt || ""}
                fill
                sizes="(max-width: 980px) 100vw, 50vw"
                className={styles.image}
              />
            </div>
          )}

        </div>
      </div>
    </section>
  );
}