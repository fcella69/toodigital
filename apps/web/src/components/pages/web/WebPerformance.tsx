"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./web.module.css";

type Metric = {
  value: number;
  suffix?: string;
  label: string;
};

type Props = {
  performance: {
    kicker?: string;
    title: string;
    text?: string;
    metrics?: Metric[];
    points?: { text: string }[];
  };
};

export default function WebPerformance({ performance }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  /* =========================
     TRIGGER ON SCROLL
  ========================= */

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.webPerformanceSection}>
      <div className={styles.webPerformanceInner}>
        
        {/* HEADER */}
        <div className={styles.webPerformanceHeader}>
          {performance.kicker && (
            <span className={styles.webPerformanceKicker}>
              {performance.kicker}
            </span>
          )}

          <h2 className={styles.webPerformanceTitle}>
            {performance.title}
          </h2>

          {performance.text && (
            <p className={styles.webPerformanceText}>
              {performance.text}
            </p>
          )}
        </div>

        <div className={styles.webPerformanceGrid}>
          
          {/* METRICS */}
          <div className={styles.webMetrics}>
            {performance.metrics?.map((metric, i) => (
              <AnimatedMetric
                key={i}
                value={metric.value}
                suffix={metric.suffix}
                label={metric.label}
                start={visible}
              />
            ))}
          </div>

          {/* POINTS */}
          <div className={styles.webPerformancePoints}>
            {performance.points?.map((p, i) => (
              <div key={i} className={styles.webPerformancePoint}>
                {p.text}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

/* =========================
   COUNTER COMPONENT
========================= */

function AnimatedMetric({
  value,
  suffix,
  label,
  start,
}: {
  value: number;
  suffix?: string;
  label: string;
  start: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let frame: number;
    let startTime: number | null = null;
    const duration = 1200;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;

      const percentage = Math.min(progress / duration, 1);
      setCount(Math.floor(percentage * value));

      if (percentage < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [start, value]);

  return (
    <div className={styles.webMetric}>
      <div className={styles.webMetricValue}>
        {count}
        {suffix}
      </div>
      <div className={styles.webMetricLabel}>{label}</div>
    </div>
  );
}
