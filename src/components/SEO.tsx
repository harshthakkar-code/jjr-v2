import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
  structuredData?: object;
}

const SITE_URL = "https://jjrsoftware.com"; // Update with actual domain
const DEFAULT_TITLE = "JJR SOFTWARE | Custom Software Development Company in Ahmedabad";
const DEFAULT_DESCRIPTION = "JJR SOFTWARE is a software development company in Ahmedabad, Gujarat providing web, mobile, and enterprise solutions.";
// Default social share image used by WhatsApp/Facebook/Twitter.
// Recommended: 1200x630 PNG/JPG at /public/social-share.png
const DEFAULT_OG_IMAGE = `${SITE_URL}/social-share.png`;

export const SEO = ({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  ogType = "website",
  noindex = false,
  structuredData,
}: SEOProps) => {
  const fullTitle = title ? `${title} | JJR SOFTWARE` : DEFAULT_TITLE;
  const metaDescription = description || DEFAULT_DESCRIPTION;
  const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : SITE_URL;

  useEffect(() => {
    const resolveImageUrl = (img?: string) => {
      if (!img) return DEFAULT_OG_IMAGE;
      if (img.startsWith("http://") || img.startsWith("https://")) return img;
      // treat as relative to SITE_URL
      return `${SITE_URL}${img.startsWith("/") ? img : `/${img}`}`;
    };

    // Use provided ogImage, or default, with fallback to logo.png
    let finalOgImage = resolveImageUrl(ogImage);
    // If using default and it might not exist, WhatsApp will fallback better with logo.png
    if (!ogImage && finalOgImage === DEFAULT_OG_IMAGE) {
      // Keep DEFAULT_OG_IMAGE but ensure it's absolute URL
      finalOgImage = DEFAULT_OG_IMAGE;
    }
    // Update document title
    document.title = fullTitle;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? "property" : "name";
      let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Basic meta tags
    updateMetaTag("description", metaDescription);
    if (keywords) {
      updateMetaTag("keywords", keywords);
    }
    updateMetaTag("author", "JJR SOFTWARE");

    // Open Graph tags (WhatsApp/Facebook)
    updateMetaTag("og:title", fullTitle, true);
    updateMetaTag("og:description", metaDescription, true);
    updateMetaTag("og:type", ogType, true);
    updateMetaTag("og:url", canonicalUrl, true);
    updateMetaTag("og:image", finalOgImage, true);
    updateMetaTag("og:image:secure_url", finalOgImage, true);
    updateMetaTag("og:image:type", "image/png", true);
    updateMetaTag("og:image:width", "1200", true);
    updateMetaTag("og:image:height", "630", true);
    updateMetaTag("og:image:alt", fullTitle, true);
    updateMetaTag("og:site_name", "JJR SOFTWARE", true);
    updateMetaTag("og:locale", "en_US", true);
    updateMetaTag("og:updated_time", new Date().toISOString(), true);

    // Twitter Card tags
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", fullTitle);
    updateMetaTag("twitter:description", metaDescription);
    updateMetaTag("twitter:image", finalOgImage);
    updateMetaTag("twitter:image:alt", fullTitle);

    // Canonical URL
    let canonicalLink = document.querySelector("link[rel='canonical']") as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonicalUrl);

    // Robots meta tag
    if (noindex) {
      updateMetaTag("robots", "noindex, nofollow");
    } else {
      updateMetaTag("robots", "index, follow");
    }

    // Structured Data (JSON-LD)
    if (structuredData) {
      // Remove existing structured data scripts
      const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
      existingScripts.forEach(script => script.remove());
      
      // Add new structured data
      const dataArray = Array.isArray(structuredData) ? structuredData : [structuredData];
      dataArray.forEach((data) => {
        const scriptTag = document.createElement("script");
        scriptTag.setAttribute("type", "application/ld+json");
        scriptTag.textContent = JSON.stringify(data);
        document.head.appendChild(scriptTag);
      });
    }
  }, [fullTitle, metaDescription, keywords, canonicalUrl, ogImage, ogType, noindex, structuredData]);

  return null;
};

// Default Organization structured data
export const getOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "JJR SOFTWARE",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-94-281-951-57",
    contactType: "Customer Service",
    email: "info@jjrsoftware.com",
    areaServed: "IN",
    availableLanguage: ["English", "Hindi", "Gujarati"],
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ahmedabad",
    addressRegion: "Gujarat",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.facebook.com/jjrsoftware",
    "https://x.com/JjrSoftware",
    "https://www.linkedin.com/company/jjrsoftware",
    "https://www.instagram.com/jjrsoftware/",
  ],
});

// LocalBusiness schema for better local SEO
export const getLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}#organization`,
  name: "JJR SOFTWARE",
  image: `${SITE_URL}/logo.png`,
  telephone: "+91-94-281-951-57",
  email: "info@jjrsoftware.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Ahmedabad",
    addressLocality: "Ahmedabad",
    addressRegion: "Gujarat",
    postalCode: "",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "23.0225",
    longitude: "72.5714",
  },
  url: SITE_URL,
  priceRange: "$$",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
});

