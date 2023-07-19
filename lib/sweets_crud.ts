import { prisma } from "./prisma";
import {
  SweetType,
  SweetCreateType,
  IngredientType,
  SweetUpdateType,
} from "@/types";
import { prepareIngredients } from "./utils";

export const getSweets = async (): Promise<SweetType[] | null> => {
  try {
    const sweets = await prisma.sweet.findMany({
      include: { ingredients: true },
      orderBy: { id: "desc" },
    });

    return sweets;
  } catch (err) {
    console.error("error in getSweets", err);
    return null;
  }
};

export const createSweet = async (
  data: SweetCreateType
): Promise<string | null> => {
  try {
    for (let i = 1; i <= parseInt(data.quantity); i++) {
      await prisma.sweet.create({
        data: {
          name: data.name,
          price: parseFloat(data.price),
          ingredients: { create: data.ingredients },
          madeAt: new Date(),
        },
      });
    }

    return "success";
  } catch (err) {
    console.error("error in createSweet", err);

    throw new Error("error in createSweet");
  }
};

export const updateSweet = async (
  data: SweetUpdateType
): Promise<SweetType | null> => {
  try {
    await prisma.ingredient.deleteMany({
      where: { sweetId: parseFloat(data.id) },
    });

    const newIngredients = prepareIngredients(data.ingredients);
    await prisma.sweet.update({
      where: { id: parseFloat(data.id) },
      data: {
        name: data.name,
        price: data.price,
        ingredients: {
          set: [],
        },
        madeAt: new Date(data.madeAt),
      },
      include: {
        ingredients: true,
      },
    });

    const sweet = await prisma.sweet.update({
      where: { id: parseFloat(data.id) },
      data: {
        name: data.name,
        price: data.price,
        ingredients: {
          create: newIngredients,
        },
        madeAt: new Date(data.madeAt),
      },
      include: {
        ingredients: true,
      },
    });

    return sweet;
  } catch (err) {
    console.error("error in updateSweet", err);

    throw new Error("error in updateSweet");
  }
};

export const deleteSweet = async (id: number): Promise<string | null> => {
  try {
    await prisma.sweet.delete({
      where: { id },
    });

    return "success";
  } catch (err) {
    console.error("error in deleteSweet", err);

    throw new Error("error in deleteSweet");
  }
};

export const getSweet = async (id: number): Promise<SweetType | null> => {
  try {
    const sweet = await prisma.sweet.findUnique({
      where: { id },
      include: { ingredients: true },
    });

    return sweet;
  } catch (err) {
    console.error("error in getSweet", err);

    throw new Error("error in getSweet");
  }
};
