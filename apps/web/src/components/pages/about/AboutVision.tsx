"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./about.module.css";
import Image from "next/image";

type VisionPoint = {
  title: string;
  text: string;
};

type Props = {
  vision: {
    kicker?: string;
    title: string;
    text: string;
    points?: VisionPoint[];
    image?: {
      asset?: {
        url: string;
      };
    };
  };
};


export default function AboutVision({ vision }: Props) {
  const points = vision.points ?? [];
  const [active, setActive] = useState(0);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const startY = useRef<number | null>(null);

  /* =========================
     NAVIGATION
  ========================= */

  const goNext = () => {
    setActive((prev) => (prev + 1) % points.length);
  };

  const goPrev = () => {
    setActive((prev) =>
      prev === 0 ? points.length - 1 : prev - 1
    );
  };

  /* =========================
     AUTO ROTATE
  ========================= */

  useEffect(() => {
    if (points.length <= 1) return;

    intervalRef.current = setInterval(goNext, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [points.length]);

  /* =========================
     PAUSE ON HOVER
  ========================= */

  const pause = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const resume = () => {
    if (points.length <= 1) return;
    intervalRef.current = setInterval(goNext, 5000);
  };

  /* =========================
     WHEEL FIX
  ========================= */

  useEffect(() => {
    const el = carouselRef.current;
    if (!el || points.length <= 1) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 0) goNext();
      else goPrev();
    };

    el.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      el.removeEventListener("wheel", handleWheel);
    };
  }, [points.length]);

  /* =========================
     DRAG SUPPORT
  ========================= */

  const handlePointerDown = (e: React.PointerEvent) => {
    startY.current = e.clientY;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (startY.current === null) return;

    const diff = e.clientY - startY.current;

    if (diff > 40) goPrev();
    if (diff < -40) goNext();

    startY.current = null;
  };

  const getCardState = (index: number) => {
    if (index === active) return styles.visionCardActive;

    if (
      index === active - 1 ||
      (active === 0 && index === points.length - 1)
    )
      return styles.visionCardPrev;

    if (
      index === active + 1 ||
      (active === points.length - 1 && index === 0)
    )
      return styles.visionCardNext;

    return styles.visionCardHidden;
  };

  return (
    <section className={styles.visionSection}>
      <div className={styles.visionLayout}>
        {/* LEFT IMAGE */}
        <div className={styles.visionImage}>
          {vision.image?.asset?.url && (
            <Image
              src={vision.image.asset.url}
              alt={vision.title}
              fill
              sizes="50vw"
              style={{ objectFit: "cover" }}
            />
          )}
        </div>


        {/* RIGHT CONTENT */}
        <div className={styles.visionContent}>
          {vision.kicker && (
            <span className={styles.visionKicker}>{vision.kicker}</span>
          )}

          <h2 className={styles.visionTitle}>{vision.title}</h2>

          <p className={styles.visionText}>{vision.text}</p>

          {/* POINTS CAROUSEL */}
          {points.length > 0 && (
            <div
              ref={carouselRef}
              className={styles.visionCarousel}
              onMouseEnter={pause}
              onMouseLeave={resume}
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
            >
              <div className={styles.visionStack}>
                {points.map((point, i) => (
                  <div
                    key={i}
                    className={`${styles.visionCard} ${getCardState(i)}`}
                  >
                    <h3 className={styles.visionCardTitle}>
                      {point.title}
                    </h3>
                    <p className={styles.visionCardText}>
                      {point.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
