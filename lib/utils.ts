import { listType } from "@/types";
import { format } from "date-fns";

export function isActive(pathname: string, route: string) {
  return pathname == route ? "active" : "";
}

export function calcDiscount(date: string): number {
  const today = format(new Date(), "u-MM-dd");
  let todayNumber = new Date(today).getTime();
  let sweetDate = new Date(date).getTime();
  const hoursPassed = (todayNumber - sweetDate) / (1000 * 60 * 60);

  if (hoursPassed < 24) {
    return 1;
  }
  if (hoursPassed >= 24 && hoursPassed < 48) {
    return 0.2;
  }
  if (hoursPassed >= 48 && hoursPassed < 72) {
    return 0.8;
  }
  return 0;
}

export const arrangeIngredients = (list: listType[]) => {
  const result = list.map((ingredient) => {
    return { name: ingredient.name };
  });
  return result;
};

export const choseColor = (number: number) => {
  if (number === 0) return "bg-slate-300";
  if (number === 0.2) return "bg-color6";
  if (number === 0.8) return "bg-color7";
  return "";
};
