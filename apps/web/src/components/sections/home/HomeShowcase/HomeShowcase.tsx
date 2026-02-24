"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./HomeShowcase.module.css";

type Props = {
  showcase: {
    kicker?: string;
    title: string;
    text: string;
    media?: {
      type?: "image" | "video";
      image?: {
        asset?: {
          url: string;
        };
        alt?: string;
      };
      videoUrl?: string;
    };
  };
};

export default function HomeShowcase({ showcase }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);

  /* =========================
     SCROLL REVEAL
  ========================= */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add(styles.visible);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const mediaType = showcase.media?.type;

  return (
    <section className={styles.section}>
      <div ref={sectionRef} className={styles.inner}>
        <div className={styles.grid}>
          
          {/* LEFT CONTENT */}
          <div className={styles.content}>
            {showcase.kicker && (
              <span className={styles.kicker}>
                {showcase.kicker}
              </span>
            )}

            <h2 className={styles.title}>
              {showcase.title}
            </h2>

            <p className={styles.text}>
              {showcase.text}
            </p>
          </div>

          {/* RIGHT MEDIA */}
          {(mediaType === "image" && showcase.media?.image?.asset?.url) ||
          (mediaType === "video" && showcase.media?.videoUrl) ? (
            <div className={styles.media}>
              
              <div className={styles.mediaInner}>
                
                {mediaType === "image" && (
                  <Image
                    src={showcase.media!.image!.asset!.url}
                    alt={
                      showcase.media?.image?.alt || showcase.title
                    }
                    fill
                    sizes="(max-width: 980px) 100vw, 50vw"
                    className={styles.image}
                  />
                )}

                {mediaType === "video" && (
                  <iframe
                    src={showcase.media!.videoUrl}
                    className={styles.video}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}

              </div>
            </div>
          ) : null}

        </div>
      </div>
    </section>
  );
}
