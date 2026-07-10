export type HomeBanner = {
  placement: "after-process" | "after-trust";
  kicker: string;
  title: string;
  titleAccent: string;
  text: string;
  image: string;
  imagePosition: string;
  mobileHeightClass: "h-[280px]";
  desktopHeightClass: "md:h-[400px]";
  bleedClass: "w-screen";
};

export const homeBanners: HomeBanner[] = [
  {
    placement: "after-process",
    kicker: "Материалы / свет / кадр",
    title: "Между чертежом и эмоцией появляется",
    titleAccent: "сцена",
    text: "Мы собираем пространство так, чтобы фактуры, глубина и свет работали на один цельный образ.",
    image: "/images/cases/interior-stone.jpg",
    imagePosition: "center 58%",
    mobileHeightClass: "h-[280px]",
    desktopHeightClass: "md:h-[400px]",
    bleedClass: "w-screen",
  },
  {
    placement: "after-trust",
    kicker: "Точность / спокойствие / доверие",
    title: "Фотореализм помогает принимать решения",
    titleAccent: "без шума",
    text: "Понятная визуальная подача снижает неопределённость и делает согласование проекта тише.",
    image: "/images/cases/exterior-dusk.jpg",
    imagePosition: "center 54%",
    mobileHeightClass: "h-[280px]",
    desktopHeightClass: "md:h-[400px]",
    bleedClass: "w-screen",
  },
];
