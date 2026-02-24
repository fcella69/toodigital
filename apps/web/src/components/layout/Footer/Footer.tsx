"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css";
import { HiOutlineArrowUp } from "react-icons/hi";
import {
    FaInstagram,
    FaLinkedinIn,
    FaFacebookF,
    FaXTwitter,
} from "react-icons/fa6";

type FooterData = {
    logo?: { asset?: { url: string }; alt?: string };
    tagline?: string;
    menuLinks?: { label: string; href: string }[];
    policyLinks?: { label: string; href: string }[];
    extraLinks?: { label: string; href: string }[];
    socialLinks?: { platform: string; url: string }[];
    copyrightText?: string;
};

type Props = {
    data: FooterData | null;
};

export default function Footer({ data }: Props) {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (!data) return null;

    const getIcon = (platform: string) => {
        switch (platform.toLowerCase()) {
            case "instagram":
                return <FaInstagram />;
            case "linkedin":
                return <FaLinkedinIn />;
            case "facebook":
                return <FaFacebookF />;
            case "twitter":
            case "x":
                return <FaXTwitter />;
            default:
                return null;
        }
    };

    return (
        <footer className={styles.footer}>
            <div className={styles.footerTopBorder}></div>

            <div className={styles.footerInner}>

                {/* BRAND */}
                <div className={styles.footerBrand}>
                    {data.logo?.asset?.url && (
                        <div className={styles.footerLogoWrapper}>
                            <Image
                                src={data.logo.asset.url}
                                alt={data.logo.alt || "Logo"}
                                fill
                                sizes="200px"
                                className={styles.footerLogo}
                                priority={false}
                            />
                        </div>
                    )}

                    {data.tagline && (
                        <p className={styles.footerTagline}>{data.tagline}</p>
                    )}

                    {data.socialLinks?.length ? (
                        <div className={styles.footerSocial}>
                            {data.socialLinks.map((s, i) => (
                                <a
                                    key={i}
                                    href={s.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {getIcon(s.platform)}
                                </a>
                            ))}
                        </div>
                    ) : null}
                </div>

                {/* MENU */}
                <div className={styles.footerCol}>
                    <h4>Servizi</h4>
                    {data.menuLinks?.map((link, i) => (
                        <Link key={i} href={link.href}>
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* EXTRA */}
                <div className={styles.footerCol}>
                    <h4>Web Company</h4>
                    {data.extraLinks?.map((link, i) => (
                        <Link key={i} href={link.href}>
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* LEGAL */}
                <div className={styles.footerCol}>
                    <h4>Legal</h4>
                    {data.policyLinks?.map((link, i) => (
                        <Link key={i} href={link.href}>
                            {link.label}
                        </Link>
                    ))}
                </div>

            </div>

            <div className={styles.footerBottomWrapper}>
                <div className={styles.footerBottom}>
                    <span>{data.copyrightText}</span>

                    <button
                        onClick={scrollToTop}
                        className={styles.scrollTopInline}
                    >
                        <HiOutlineArrowUp />
                        Torna su
                    </button>
                </div>
            </div>
        </footer>
    );
}