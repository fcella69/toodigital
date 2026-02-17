import styles from "./web.module.css";
import Image from "next/image";

type Props = {
  intro: {
    kicker?: string;
    title: string;
    text: string;
    image?: string; // url sanity
  };
};

export default function WebIntro({ intro }: Props) {
  return (
    <section className={styles.webIntroSection}>
      <div className={styles.webIntroInner}>
        <div className={styles.webIntroGrid}>
          
          {/* LEFT CONTENT */}
          <div className={styles.webIntroContent}>
            {intro.kicker && (
              <span className={styles.webIntroKicker}>
                {intro.kicker}
              </span>
            )}

            <h2 className={styles.webIntroTitle}>
              {intro.title}
            </h2>

            <p className={styles.webIntroText}>
              {intro.text}
            </p>
          </div>

          {/* RIGHT VISUAL */}
          <div className={styles.webIntroVisual}>
            {intro.image ? (
              <Image
                src={intro.image}
                alt="Web experience mockup"
                fill
                className={styles.webIntroImage}
              />
            ) : (
              <div className={styles.webIntroPlaceholder} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
