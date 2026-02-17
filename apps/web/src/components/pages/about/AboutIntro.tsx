"use client";

import Image from "next/image";
import styles from "./about.module.css";

type Props = {
  intro: {
    kicker?: string;
    title: string;
    text: string;
    image?: {
      asset?: {
        url: string;
      };
    };
  };
};

export default function AboutIntro({ intro }: Props) {
  return (
    <section className={styles.introSection}>
      <div className={styles.introInner}>
        <div className={styles.introGrid}>
          {/* LEFT */}
          <div className={styles.introContent}>
            {intro.kicker && (
              <span className={styles.introKicker}>{intro.kicker}</span>
            )}

            <h2 className={styles.introTitle}>{intro.title}</h2>

            <p className={styles.introText}>{intro.text}</p>
          </div>

          {/* RIGHT */}
          <div className={styles.introVisual}>
            {intro.image?.asset?.url && (
              <Image
                src={intro.image.asset.url}
                alt={intro.title}
                fill
                sizes="50vw"
                style={{ objectFit: "cover" }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
