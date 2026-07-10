export type CaseCategory = "Interior" | "Exterior" | "Commercial";

export type CaseStudy = {
  slug: string;
  title: string;
  category: CaseCategory;
  subtitle: string;
  description: string;
  coverImage: string;
  gallery: string[];
  details: string[];
  year?: string;
  location?: string;
  services: string[];
};

const images = {
  interiorWarm: "/images/cases/interior-warm.jpg",
  interiorStone: "/images/cases/interior-stone.jpg",
  interiorDark: "/images/cases/interior-dark.jpg",
  exteriorVilla: "/images/cases/exterior-villa.jpg",
  exteriorDusk: "/images/cases/exterior-dusk.jpg",
  commercial: "/images/cases/commercial.jpg",
} as const;

export const cases: CaseStudy[] = [
  {
    slug: "private-residence",
    title: "Private Residence",
    category: "Interior",
    subtitle: "Тихий интерьер, построенный на свете и натуральных материалах.",
    description:
      "Серия визуализаций частной резиденции с мягким дневным светом, выразительной геометрией и тактильной палитрой дерева, камня и текстиля.",
    coverImage: images.interiorWarm,
    gallery: [images.interiorWarm, images.interiorStone, images.interiorDark],
    details: ["Естественный свет", "Травертин", "Тёмное дерево", "Мягкий текстиль"],
    year: "2025",
    location: "Москва",
    services: ["Интерьерная визуализация", "Постобработка"],
  },
  {
    slug: "coastal-villa",
    title: "Coastal Villa",
    category: "Exterior",
    subtitle: "Архитектура на границе скалы, моря и вечернего света.",
    description:
      "Экстерьерная серия раскрывает силуэт виллы, посадку в ландшафте и переход от дневной ясности к камерному вечернему сценарию.",
    coverImage: images.exteriorVilla,
    gallery: [images.exteriorVilla, images.exteriorDusk, images.interiorStone],
    details: ["Архитектурный свет", "Камень", "Ландшафт", "Вечерняя атмосфера"],
    year: "2025",
    location: "Черноморское побережье",
    services: ["Экстерьерная визуализация", "Ландшафт"],
  },
  {
    slug: "warm-minimalism-apartment",
    title: "Apartment in Warm Minimalism",
    category: "Interior",
    subtitle: "Спокойная квартира с точным балансом фактур и пустоты.",
    description:
      "Визуальная история тёплого минимализма: лаконичная архитектура, рассеянный свет и материалы, которые работают без лишнего декора.",
    coverImage: images.interiorStone,
    gallery: [images.interiorStone, images.interiorWarm, images.interiorDark],
    details: ["Рассеянный свет", "Шпон", "Штукатурка", "Сдержанная композиция"],
    year: "2024",
    location: "Санкт-Петербург",
    services: ["Интерьерная визуализация"],
  },
  {
    slug: "boutique-commercial-space",
    title: "Boutique Commercial Space",
    category: "Commercial",
    subtitle: "Камерное коммерческое пространство с галерейной подачей.",
    description:
      "Концепция бутика, в которой архитектурный ритм, направленный свет и сдержанная палитра формируют премиальный клиентский опыт.",
    coverImage: images.commercial,
    gallery: [images.commercial, images.interiorDark, images.interiorStone],
    details: ["Сценарный свет", "Бренд-зона", "Металл", "Камень"],
    year: "2025",
    location: "Дубай",
    services: ["Коммерческие пространства", "Концептуальная визуализация"],
  },
  {
    slug: "evening-house-exterior",
    title: "Evening House Exterior",
    category: "Exterior",
    subtitle: "Частный дом в момент перехода от сумерек к ночи.",
    description:
      "Вечерняя экстерьерная серия показывает взаимодействие архитектурного света, отражений и окружающего ландшафта.",
    coverImage: images.exteriorDusk,
    gallery: [images.exteriorDusk, images.exteriorVilla, images.interiorWarm],
    details: ["Сумеречный сценарий", "Стекло", "Отражения", "Окружение"],
    year: "2024",
    location: "Московская область",
    services: ["Экстерьерная визуализация"],
  },
];

export function getCaseBySlug(slug: string) {
  return cases.find((item) => item.slug === slug);
}
