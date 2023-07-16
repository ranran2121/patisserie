import prisma from "./prisma";

export const getSweets = async () => {
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
