import { prisma } from "./prisma";
import { SweetType, SweetCreateType } from "@/types";

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
