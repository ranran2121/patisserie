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

export const prepareIngredients = (list: listType[]) => {
  let result: listType[] = [];
  list.forEach((ingredient) => {
    result.push({ name: ingredient.name });
  });
  return result;
};
