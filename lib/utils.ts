import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function categoryLabel(category: "Interior" | "Exterior" | "Commercial") {
  return {
    Interior: "Интерьер",
    Exterior: "Экстерьер",
    Commercial: "Коммерческое пространство",
  }[category];
}

