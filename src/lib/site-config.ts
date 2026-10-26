export const siteConfig = {
  name: "Claridad Digital",
  shortName: "Claridad Digital",
  description:
    "Guías prácticas y consejos sobre productividad, finanzas personales, salud y tecnología para mejorar tu día a día.",
  url: process.env.NEXT_PUBLIC_SITE_URL || process.env.RENDER_EXTERNAL_URL || "http://localhost:3000",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  adsenseEnabled: process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true" && process.env.NEXT_PUBLIC_ADSENSE_CMP_READY === "true",
  locale: "es_ES",
  language: "es",
  twitterHandle: "@claridaddigital",
  keywords: [
    "productividad",
    "finanzas personales",
    "vida saludable",
    "tecnología",
    "consejos prácticos",
    "blog de interés general",
  ],
  // ID de cliente de AdSense (ca-pub-XXXXXXXXXXXXXXXX). Déjalo vacío hasta tener
  // la cuenta aprobada: así el script de Auto Ads no se inyecta en desarrollo.
  adsenseClientId: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID ?? "",
};

export type SiteConfig = typeof siteConfig;
