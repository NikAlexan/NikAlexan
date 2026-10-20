import type { Locale, SiteContent } from "./site";

export type Alternates = Record<Locale, string>;

const ogLocales: Record<Locale, string> = {
  ru: "ru_RU",
  en: "en_US"
};

export const getOgLocale = (locale: Locale) => ogLocales[locale];

// Paths of the same page in both languages, used for hreflang links.
export const homeAlternates: Alternates = {
  ru: "/",
  en: "/en/"
};

// Google reads the site name only from the domain's home page, so WebSite
// markup goes on "/" alone and stays the same for both languages.
const webSite = {
  "@type": "WebSite",
  "@id": "https://nikalexan.com/#website",
  url: "https://nikalexan.com/",
  name: "Nikita Vassilenko",
  alternateName: ["Никита Василенко", "nikalexan.com"]
};

export const getProfileJsonLd = (site: SiteContent) => {
  const { meta } = site;
  const sameAs = site.contact.socials
    .map((social) => social.href)
    .filter((href) => href.startsWith("https://"));
  const isDomainHome = new URL(meta.url).pathname === "/";

  return {
    "@context": "https://schema.org",
    "@graph": [
      ...(isDomainHome ? [webSite] : []),
      {
        "@type": "ProfilePage",
        url: meta.url,
        inLanguage: site.locale,
        mainEntity: {
          "@type": "Person",
          name: meta.personName,
          alternateName: meta.personAlternateName,
          jobTitle: meta.jobTitle,
          url: meta.url,
          sameAs
        }
      }
    ]
  };
};
