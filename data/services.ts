export type Service = {
  slug: "interior-visualization" | "exterior-visualization" | "commercial-spaces";
  eyebrow: string;
  title: string;
  shortTitle: string;
  description: string;
  href: string;
  heroImage: string;
  heroAlt: string;
  heroPosition: {
    desktop: string;
    mobile: string;
  };
  audience: string[];
  includes: string[];
  costFactors: string[];
  faq: Array<{ question: string; answer: string }>;
};

export const services: Service[] = [
  {
    slug: "interior-visualization",
    eyebrow: "01 / Интерьеры",
    title: "3D-визуализация интерьера",
    shortTitle: "Интерьеры",
    description:
      "Создаём фотореалистичные визуализации квартир, домов и апартаментов, чтобы увидеть атмосферу, материалы, мебель и свет до реализации.",
    href: "/services/interior-visualization",
    heroImage: "/images/cases/interior-dark.jpg",
    heroAlt: "Тёмный премиальный интерьер с архитектурным светом",
    heroPosition: { desktop: "center 54%", mobile: "62% center" },
    audience: ["Частные клиенты", "Дизайнеры", "Архитекторы", "Интерьерные студии"],
    includes: [
      "Подбор ракурсов",
      "Моделирование по материалам",
      "Настройка света и материалов",
      "Декорирование сцены",
      "Финальная постобработка",
    ],
    costFactors: ["Площадь", "Детализация", "Количество ракурсов", "Исходные материалы"],
    faq: [
      {
        question: "Какие материалы нужны для старта?",
        answer: "Планы, развёртки, референсы и описание желаемой атмосферы.",
      },
      {
        question: "Можно работать без готового дизайн-проекта?",
        answer: "Да, если есть понятная задача и достаточно визуальных ориентиров.",
      },
    ],
  },
  {
    slug: "exterior-visualization",
    eyebrow: "02 / Экстерьеры",
    title: "3D-визуализация экстерьера",
    shortTitle: "Экстерьеры",
    description:
      "Показываем архитектуру, фасады, окружение и настроение объекта до строительства, презентации или согласования проекта.",
    href: "/services/exterior-visualization",
    heroImage: "/images/cases/exterior-dusk.jpg",
    heroAlt: "Современный загородный дом в вечернем освещении",
    heroPosition: { desktop: "center 58%", mobile: "57% center" },
    audience: ["Архитекторы", "Девелоперы", "Частные заказчики", "Архитектурные бюро"],
    includes: [
      "Архитектурная модель",
      "Фасадные материалы",
      "Окружение и ландшафт",
      "Дневные и вечерние сцены",
      "Финальные ракурсы",
    ],
    costFactors: ["Сложность архитектуры", "Окружение", "Ландшафт", "Время суток"],
    faq: [
      {
        question: "Можно сделать визуализацию по чертежам?",
        answer: "Да, мы соберём модель по планам, фасадам и разрезам.",
      },
      {
        question: "Можно показать дом в разное время суток?",
        answer: "Да, дневной и вечерний сценарии можно включить в одну серию.",
      },
    ],
  },
  {
    slug: "commercial-spaces",
    eyebrow: "03 / Commercial",
    title: "3D-визуализация коммерческих пространств",
    shortTitle: "Коммерческие пространства",
    description:
      "Создаём визуализации ресторанов, офисов, салонов и шоурумов для презентаций, согласований и продаж.",
    href: "/services/commercial-spaces",
    heroImage: "/images/cases/commercial.jpg",
    heroAlt: "Камерное коммерческое пространство с премиальной отделкой",
    heroPosition: { desktop: "center 52%", mobile: "64% center" },
    audience: ["Бренды", "Рестораторы", "Девелоперы", "Дизайн-студии"],
    includes: [
      "Визуализация концепции",
      "Интерьерные сцены",
      "Брендовые элементы",
      "Коммерческие ракурсы",
      "Кадры для презентаций и сайта",
    ],
    costFactors: ["Масштаб объекта", "Фирменные элементы", "Число зон", "Форматы выдачи"],
    faq: [
      {
        question: "Подойдут ли изображения для презентации инвестору?",
        answer: "Да, композицию и форматы заранее адаптируем под задачу презентации.",
      },
      {
        question: "Можно подготовить кадры для сайта и соцсетей?",
        answer: "Да, финальные изображения можно кадрировать под нужные носители.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((item) => item.slug === slug);
}
