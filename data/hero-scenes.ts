import { cases } from "./cases";

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
    image: cases[0].coverImage,
    alt: "Тёплый интерьер частной резиденции",
  },
  {
    id: "exterior",
    category: "Exterior",
    label: "Экстерьер",
    image: cases[1].coverImage,
    alt: "Современная вилла в природном окружении",
  },
  {
    id: "commercial",
    category: "Commercial",
    label: "Коммерческое пространство",
    image: cases[3].coverImage,
    alt: "Камерное коммерческое пространство",
  },
];

