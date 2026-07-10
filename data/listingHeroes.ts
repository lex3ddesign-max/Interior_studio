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
    title: "Кейсы, которые показывают пространство до реализации",
    description:
      "Интерьеры, экстерьеры и коммерческие объекты, оформленные как визуальные истории.",
    image: "/images/cases/interior-dark.jpg",
    imageAlt: "Современный интерьер с тёмными рамами, камнем и мягким дневным светом",
    imagePosition: "center 50%",
    layout: "right-half",
  },
  {
    page: "services",
    eyebrow: "Услуги",
    title:
      "3D-визуализация интерьеров, экстерьеров и коммерческих пространств",
    description:
      "Создаём изображения, которые помогают увидеть, согласовать и презентовать проект до реализации.",
    image: "/images/cases/exterior-dusk.jpg",
    imageAlt: "Современный дом в вечернем свете без резких светлых краёв",
    imagePosition: "center 50%",
    layout: "right-half",
  },
];

export function getListingHero(page: ListingHeroPage) {
  return listingHeroes.find((item) => item.page === page);
}
