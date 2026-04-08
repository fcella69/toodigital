import Script from "next/script";

type Props = {
  cbid?: string;
  culture?: string;
};

export default function CookiebotScript({
  cbid,
  culture = "IT",
}: Props) {
  if (!cbid) return null;

  return (
    <Script
      id="Cookiebot"
      src="https://consent.cookiebot.com/uc.js"
      data-cbid={cbid}
      data-culture={culture}
      data-blockingmode="auto"
      type="text/javascript"
      strategy="beforeInteractive"
    />
  );
}