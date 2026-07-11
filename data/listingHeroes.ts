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
    title: "Кейсы, где будущий интерьер уже работает на решение клиента",
    description:
      "Не просто рендеры, а визуальные аргументы: атмосфера, материалы, свет и кадры, которые помогают согласовать проект увереннее.",
    image: "/images/cases/interior-dark.jpg",
    imageAlt: "Современный интерьер с тёмными рамами, камнем и мягким дневным светом",
    imagePosition: "center 50%",
    layout: "right-half",
  },
  {
    page: "services",
    eyebrow: "Услуги",
    title:
      "Визуализация, которая превращает идею пространства в понятное решение",
    description:
      "Готовим изображения для частных решений, архитектурных презентаций и коммерческих запусков — с вниманием к свету, материалам и ощущению стоимости.",
    image: "/images/cases/exterior-dusk.jpg",
    imageAlt: "Современный дом в вечернем свете без резких светлых краёв",
    imagePosition: "center 50%",
    layout: "right-half",
  },
];

export function getListingHero(page: ListingHeroPage) {
  return listingHeroes.find((item) => item.page === page);
}
