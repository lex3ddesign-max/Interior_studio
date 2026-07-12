import { caseImages } from "./media";

export type ListingHeroPage = "cases" | "services";

export type ListingHero = {
  page: ListingHeroPage;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  imagePosition: string;
  layout: "right-half";
};

export const listingHeroes: ListingHero[] = [
  {
    page: "cases",
    eyebrow: "Портфолио",
    title: "Кейсы, где визуализация помогает принять решение до реализации",
    description:
      "Каждый проект собран как визуальный аргумент: атмосфера, материалы, свет и ракурсы работают не на эффект, а на уверенное согласование.",
    image: caseImages.interiorDark,
    imageAlt: "Современный интерьер с тёмными рамами, камнем и мягким дневным светом",
    imagePosition: "center 50%",
    layout: "right-half",
  },
  {
    page: "services",
    eyebrow: "Услуги",
    title:
      "Визуализация, которая переводит идею пространства в ясное решение",
    description:
      "Готовим изображения для частных проектов, архитектурных презентаций и коммерческих запусков — с вниманием к масштабу, материалам и ощущению будущей стоимости.",
    image: caseImages.exteriorDusk,
    imageAlt: "Современный дом в вечернем свете без резких светлых краёв",
    imagePosition: "center 50%",
    layout: "right-half",
  },
];

export function getListingHero(page: ListingHeroPage) {
  return listingHeroes.find((item) => item.page === page);
}
