import { caseImages } from "./media";

export type HeroScene = {
  id: string;
  category: "Interior" | "Exterior" | "Commercial";
  label: string;
  image: string;
  alt: string;
};

export const heroScenes: HeroScene[] = [
  {
    id: "interior",
    category: "Interior",
    label: "Интерьер",
    image: caseImages.interiorWarm,
    alt: "Атмосферный интерьер частной резиденции в мягком дневном свете",
  },
  {
    id: "exterior",
    category: "Exterior",
    label: "Экстерьер",
    image: caseImages.exteriorVilla,
    alt: "Современная вилла в природном окружении",
  },
  {
    id: "commercial",
    category: "Commercial",
    label: "Коммерческое пространство",
    image: caseImages.commercial,
    alt: "Камерное коммерческое пространство",
  },
];
