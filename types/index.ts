export type AdminType = {
  id: number;
  name: string;
  email: string;
  password: string;
};

export type AdminTypeLogin = {
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

export type SweetTypeFe = {
  id: number;
  name: string;
  ingredients: IngredientType[];
  price: number;
  madeAt: string;
  discount: number;
};

export type IngredientType = {
  id?: number;
  name: string;
};

export type SweetCreateType = {
  name: string;
  ingredients: IngredientType[];
  price: string;
  madeAt: Date;
  quantity: string;
};

export type SweetUpdateType = {
  name: string;
  ingredients: IngredientType[];
  price: number;
  madeAt: Date;
  quantity: string;
  id: string;
};

export type listType = {
  id?: number;
  name: string;
  sweetId?: number;
};
