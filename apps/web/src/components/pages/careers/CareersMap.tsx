// components/pages/careers/CareersMap.tsx
"use client";

import { useMemo, useState } from "react";
import styles from "./careers.module.css";
import ItalyMap from "./ItalyMap";
import JobApplicationForm from "./JobApplicationForm";

type RoleOption = {
  label: string;
  regions?: string[];
};

type FormConfig = {
  kicker: string;
  title: string;
  subtitle?: string;
  privacyText?: string;
  submitLabel?: string;
};

type Props = {
  roles: RoleOption[];
  formConfig: FormConfig;
};

export default function CareersMap({ roles, formConfig }: Props) {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const hint = useMemo(() => {
    if (!selectedRegion) {
      return "Seleziona una regione dalla mappa per iniziare.";
    }
    return `Regione selezionata: ${selectedRegion}`;
  }, [selectedRegion]);

  return (
    <section className={styles.section}>
      <div className={styles.sectionInner}>
        <div className={styles.grid}>
          {/* LEFT: MAP */}
          <div className={styles.leftPane}>
            <div className={styles.panelHeader}>
              <div className={styles.panelKicker}>Seleziona area</div>
              <div className={styles.panelTitle}>Italia</div>
              <div className={styles.panelHint}>{hint}</div>
            </div>

            <div className={styles.mapWrap}>
              <ItalyMap
                selected={selectedRegion}
                onSelect={(region) => setSelectedRegion(region)}
              />
            </div>

            <div className={styles.mapLegend}>
              <span className={styles.legendDot} />
              <span>
                Disponibilità in espansione: candidati anche se non vedi annunci.
              </span>
            </div>
          </div>

          {/* RIGHT: FORM */}
          <div className={styles.rightPane}>
            <JobApplicationForm
              selectedRegion={selectedRegion}
              roles={roles}
              formConfig={formConfig}
              onPickRegion={() => {
                document
                  .querySelector(`[data-careers-map="true"]`)
                  ?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
