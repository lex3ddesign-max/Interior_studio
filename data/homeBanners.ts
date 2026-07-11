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
    kicker: "Материалы / свет / решение",
    title: "Когда пространство видно заранее, решение становится",
    titleAccent: "спокойнее",
    text: "Мы собираем кадр так, чтобы фактуры, глубина и свет не украшали проект, а помогали понять его ценность до начала работ.",
    image: "/images/cases/interior-stone.jpg",
    imagePosition: "center 58%",
    mobileHeightClass: "h-[280px]",
    desktopHeightClass: "md:h-[400px]",
    bleedClass: "w-screen",
  },
  {
    placement: "after-trust",
    kicker: "Точность / доверие / согласование",
    title: "Фотореализм убирает лишние споры",
    titleAccent: "до стройки",
    text: "Когда материалы, свет и масштаб уже видны в кадре, проще утвердить проект, защитить бюджет и избежать дорогих переделок.",
    image: "/images/cases/exterior-dusk.jpg",
    imagePosition: "center 54%",
    mobileHeightClass: "h-[280px]",
    desktopHeightClass: "md:h-[400px]",
    bleedClass: "w-screen",
  },
];
