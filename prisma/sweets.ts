import { SweetType } from "@/types";

export const sweets: SweetType[] = [
  {
    id: 1,
    name: "cheesecake",
    price: 5,
    madeAt: new Date(),
    ingredients: [
      {
        name: "sugar",
      },
      {
        name: "flour",
      },
      {
        name: "cacao",
      },
      {
        name: "almond milk",
      },
      {
        name: "dates",
      },
    ],
  },
  {
    id: 2,
    name: "apple cake",
    price: 3,
    madeAt: new Date(),
    ingredients: [
      {
        name: "sugar",
      },
      {
        name: "flour",
      },
      {
        name: "apples",
      },
      {
        name: "oat milk",
      },
    ],
  },
];
