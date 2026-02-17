"use client";

import { useEffect, useRef } from "react";
import styles from "./about.module.css";

type MethodStep = {
  title: string;
  text: string;
};

type Props = {
  method: {
    kicker?: string;
    title: string;
    steps: MethodStep[];
  };
};

export default function AboutMethod({ method }: Props) {

  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add(styles.isVisible);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.methodSection}>
      <div className={styles.methodInner}>
        <div className={styles.methodHeader}>
          {method.kicker && (
            <span className={styles.methodKicker}>{method.kicker}</span>
          )}
          <h2 className={styles.methodTitle}>{method.title}</h2>
        </div>

        <div className={styles.methodGrid}>
          {method.steps.map((step, i) => (
            <div key={i} className={styles.methodCard}>
              <div className={styles.methodIndex}>
                {(i + 1).toString().padStart(2, "0")}
              </div>

              <h3 className={styles.methodStepTitle}>{step.title}</h3>
              <p className={styles.methodStepText}>{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
