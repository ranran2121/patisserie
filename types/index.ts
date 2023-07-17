export type AdminType = {
  id: number;
  name: string;
  email: string;
  password: string;
};

export type SweetType = {
  id: number;
  name: string;
  ingredients: IngredientType[];
  price: number;
  madeAt: Date;
};

export type IngredientType = {
  name: string;
};

export type SweetCreateType = {
  sweetName: string;
  ingredients: IngredientType[];
  price: string;
  madeAt: Date;
  quantity: string;
};
