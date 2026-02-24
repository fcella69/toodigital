"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./HomeMetrics.module.css";

/* =========================
   TYPES
========================= */

type MetricItem = {
  value: string;
  label: string;
};

type Props = {
  metrics: {
    kicker?: string;
    title: string;
    subtitle?: string;
    mainValue: string; // es: "7500+"
    mainLabel: string;
    items?: MetricItem[];
  };
};

/* =========================
   HELPERS
========================= */

function extractNumber(value: string) {
  const number = parseInt(value.replace(/\D/g, ""));
  return isNaN(number) ? 0 : number;
}

function extractSuffix(value: string) {
  return value.replace(/[0-9]/g, "");
}

/* =========================
   COMPONENT
========================= */

export default function HomeMetrics({ metrics }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [count, setCount] = useState(0);

  const target = extractNumber(metrics.mainValue);
  const suffix = extractSuffix(metrics.mainValue);

  /* =========================
     OBSERVER
  ========================= */

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* =========================
     COUNT UP EFFECT
  ========================= */

  useEffect(() => {
    if (!visible) return;

    let start = 0;
    const duration = 1500;
    const increment = target / (duration / 16);

    const counter = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(counter);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(counter);
  }, [visible, target]);

  const items = metrics.items ?? [];

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          
          {/* LEFT TEXT */}
          <div className={styles.content}>
            {metrics.kicker && (
              <span className={styles.kicker}>
                {metrics.kicker}
              </span>
            )}

            <h2 className={styles.title}>
              {metrics.title}
            </h2>

            {metrics.subtitle && (
              <p className={styles.subtitle}>
                {metrics.subtitle}
              </p>
            )}
          </div>

          {/* RIGHT NUMBERS */}
          <div className={`${styles.metricsBox} ${visible ? styles.visible : ""}`}>
            
            <div className={styles.mainMetric}>
              <div className={styles.mainValue}>
                {count}
                {suffix}
              </div>
              <div className={styles.mainLabel}>
                {metrics.mainLabel}
              </div>
            </div>

            {items.length > 0 && (
              <div className={styles.secondaryGrid}>
                {items.map((item, i) => (
                  <div key={i} className={styles.metricItem}>
                    <div className={styles.metricValue}>
                      {item.value}
                    </div>
                    <div className={styles.metricLabel}>
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}