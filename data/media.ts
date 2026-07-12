export const caseImages = {
  interiorWarm: "/images/cases/optimized/interior-warm.webp",
  interiorStone: "/images/cases/optimized/interior-stone.webp",
  interiorDark: "/images/cases/optimized/interior-dark.webp",
  exteriorVilla: "/images/cases/optimized/exterior-villa.webp",
  exteriorDusk: "/images/cases/optimized/exterior-dusk.webp",
  commercial: "/images/cases/optimized/commercial.webp",
} as const;

export const aboutMedia = {
  heroBackground: caseImages.interiorStone,
  portraitFallback: caseImages.interiorDark,
  portraitTarget: "/images/about/founder.webp",
} as const;

export type MediaUploadSlot = {
  slug: string;
  label: string;
  targetPath: string;
  recommendedSize: string;
  note: string;
};

export const mediaUploadSlots: MediaUploadSlot[] = [
  {
    slug: "founder-portrait",
    label: "Портрет основателя для страницы «О нас»",
    targetPath: "/public/images/about/founder.webp",
    recommendedSize: "1600×2000 px или крупнее, вертикальный кадр",
    note: "Лучше темный спокойный портрет или рабочий кадр у монитора/материалов; без ярких офисных фонов.",
  },
  {
    slug: "case-private-residence",
    label: "Галерея кейса Private Residence",
    targetPath: "/public/images/cases/private-residence/01.jpg ... 08.jpg",
    recommendedSize: "2400 px по широкой стороне, 8+ изображений",
    note: "Нужны общий ракурс, 2–3 средних плана, детали материалов, световой сценарий и финальный атмосферный кадр.",
  },
  {
    slug: "case-coastal-villa",
    label: "Галерея кейса Coastal Villa",
    targetPath: "/public/images/cases/coastal-villa/01.jpg ... 08.jpg",
    recommendedSize: "2400 px по широкой стороне, 8+ изображений",
    note: "Для экстерьера особенно важны дневной/вечерний свет, посадка на участок, фасадные материалы и окружение.",
  },
  {
    slug: "case-commercial-space",
    label: "Галерея коммерческого пространства",
    targetPath: "/public/images/cases/boutique-commercial-space/01.jpg ... 08.jpg",
    recommendedSize: "2400 px по широкой стороне, 8+ изображений",
    note: "Нужны входная зона, путь клиента, витрина/акцент, общий зал, детали света и материалов.",
  },
  {
    slug: "seo-og-images",
    label: "OG-изображения для соцсетей и превью",
    targetPath: "/public/images/og/avenor-main.jpg",
    recommendedSize: "1200×630 px",
    note: "Отдельный кадр с сильной композицией и темной зоной под возможный текст/логотип.",
  },
];
