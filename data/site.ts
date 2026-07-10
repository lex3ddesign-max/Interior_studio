const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://avenor.studio").replace(
  /\/$/,
  "",
);

export const site = {
  name: "AVENOR",
  url: siteUrl,
  descriptor: "visual production for interiors & architecture",
  heroTitle: "Визуализируем пространства, в которые хочется войти",
  heroSubtitle:
    "Премиальная 3D-визуализация интерьеров, экстерьеров и коммерческих объектов для частных клиентов, дизайнеров и архитекторов.",
  ctaPrimary: "Обсудить проект",
  ctaSecondary: "Посмотреть кейсы",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@avenor.studio",
  telegram: process.env.NEXT_PUBLIC_CONTACT_TELEGRAM ?? "https://t.me/avenor_studio",
  whatsapp: process.env.NEXT_PUBLIC_CONTACT_WHATSAPP ?? "https://wa.me/79990000000",
} as const;
