const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://avenor-studio.lex3ddesign.chatgpt.site"
).replace(/\/$/, "");

export const site = {
  name: "AVENOR",
  url: siteUrl,
  descriptor: "quiet visual production for interiors & architecture",
  heroTitle: "Показываем пространство до того, как оно станет реальностью",
  heroSubtitle:
    "Фотореалистичная 3D-визуализация интерьеров, экстерьеров и коммерческих объектов, которая помогает согласовать решения, почувствовать атмосферу и уверенно двигаться к реализации.",
  ctaPrimary: "Обсудить проект",
  ctaSecondary: "Посмотреть кейсы",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@avenor.studio",
  telegram: process.env.NEXT_PUBLIC_CONTACT_TELEGRAM ?? "https://t.me/avenor_studio",
  whatsapp: process.env.NEXT_PUBLIC_CONTACT_WHATSAPP ?? "https://wa.me/79990000000",
  vk: process.env.NEXT_PUBLIC_CONTACT_VK ?? "https://vk.com/avenor_studio",
} as const;
