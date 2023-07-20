import { SweetType } from "@/types";
const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
const twoDaysAgo = new Date(Date.now() - 48 * 60 * 60 * 1000);
const threeDaysAgo = new Date(Date.now() - 72 * 60 * 60 * 1000);

export const sweets: SweetType[] = [
  {
    id: 1,
    name: "cheesecake",
    price: 5,
    madeAt: new Date(Date.now()),
    quantity: 1,
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
    quantity: 2,
    madeAt: yesterday,
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
  {
    id: 3,
    name: "coffee cake",
    price: 3,
    quantity: 2,
    madeAt: twoDaysAgo,
    ingredients: [
      {
        name: "sugar",
      },
      {
        name: "flour",
      },
      {
        name: "coffee",
      },
      {
        name: "oat milk",
      },
    ],
  },
  {
    id: 4,
    name: "budino",
    price: 3,
    quantity: 2,
    madeAt: threeDaysAgo,
    ingredients: [
      {
        name: "sugar",
      },
      {
        name: "starch",
      },
      {
        name: "vanilla",
      },
      {
        name: "almond milk",
      },
    ],
  },
];
