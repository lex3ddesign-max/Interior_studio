export type PricingItem = {
  title: string;
  price: string;
  unit: string;
  note: string;
};

export const pricing: PricingItem[] = [
  {
    title: "Интерьерная визуализация",
    price: "от XX 000 ₽",
    unit: "за ракурс",
    note: "Для квартир, домов, апартаментов и частных пространств.",
  },
  {
    title: "Экстерьерная визуализация",
    price: "от XX 000 ₽",
    unit: "за ракурс",
    note: "Для домов, фасадов, архитектуры и ландшафтных сцен.",
  },
  {
    title: "Коммерческие пространства",
    price: "от XX 000 ₽",
    unit: "за проект",
    note: "Для ресторанов, офисов, шоурумов и общественных интерьеров.",
  },
];

