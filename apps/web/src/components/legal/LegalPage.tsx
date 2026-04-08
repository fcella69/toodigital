import { PortableText, type PortableTextComponents } from "@portabletext/react";
import styles from "./LegalPage.module.css";

type Props = {
  title: string;
  updatedAt?: string;
  content?: any[];
};

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    h4: ({ children }) => <h4>{children}</h4>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
    number: ({ children }) => <ol>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ children, value }) => {
      const href = value?.href || "#";
      const isExternal =
        href.startsWith("http://") || href.startsWith("https://");

      return (
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    },
  },
};

function formatDate(date?: string) {
  if (!date) return null;

  try {
    return new Intl.DateTimeFormat("it-IT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date(date));
  } catch {
    return date;
  }
}

export default function LegalPage({ title, updatedAt, content = [] }: Props) {
  const formattedDate = formatDate(updatedAt);

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1>{title}</h1>

            {formattedDate && (
              <p className={styles.updatedAt}>
                Ultimo aggiornamento: {formattedDate}
              </p>
            )}
          </div>

          <article className={styles.content}>
            <PortableText
              value={content}
              components={portableTextComponents}
            />
          </article>
        </div>
      </section>
    </main>
  );
}