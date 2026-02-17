import styles from "./contacts.module.css";
import ContactForm from "./ContactForm";

type SelectOption = {
    label: string;
    value: string;
};

type FormConfig = {
    services: SelectOption[];
    budgets?: SelectOption[];
    submitLabel?: string;
    privacyText?: string;
};

type Props = {
    form: {
        kicker?: string;
        title?: string;
        subtitle?: string;
        image?: {
            asset?: {
                url: string;
            };
            alt?: string;
        };
        config: FormConfig; // oppure direttamente services/budgets ecc (dipende dalla tua query)
    };
};

export default function ContactsFormSection({ form }: Props) {
    return (
        <section className={styles.formSection}>
            <div className={styles.formInner}>
                <div className={styles.formGrid}>
                    {/* LEFT */}
                    <div className={styles.formIntro}>
                        <h2>{form.title ?? "Richiedi informazioni"}</h2>
                        {form.subtitle ? (
                            <p>{form.subtitle}</p>
                        ) : (
                            <p>
                                Raccontaci cosa stai cercando: un nuovo sito, una piattaforma, una strategia digitale o una consulenza.
                            </p>
                        )}

                        {form.image?.asset?.url && (
                            <div className={styles.formImageWrapper}>
                                <img
                                    src={form.image.asset.url}
                                    alt={form.image.alt || ""}
                                    className={styles.formImage}
                                />
                            </div>
                        )}
                    </div>

                    {/* RIGHT */}
                    <div className={styles.formWrapper}>
                        <ContactForm config={form.config} />
                    </div>
                </div>
            </div>
        </section>
    );
}
