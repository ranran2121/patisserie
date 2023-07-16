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

export const createSweet = async (data) => {
  try {
    console.log("DA", data);
    for (let i = 1; i <= parseInt(data.quantity); i++) {
      const sweet = await prisma.sweet.create({
        data: {
          name: data.sweetName,
          price: parseFloat(data.price),
          ingredients: { create: data.ingredients },
          madeAt: new Date(),
        },
      });
    }

    return "success";
  } catch (err) {
    console.error("error in createSweet", err);
    return null;
  }
};
