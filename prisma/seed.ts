import { PrismaClient } from "@prisma/client";
import { admins } from "./admins";
import { sweets } from "./sweets";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
const SALT = Number(process.env.SALT) ?? 10;

async function main() {
  for (let i = 0; i < admins.length; i++) {
    const salt = bcrypt.genSaltSync(SALT);
    const hashedPwd = bcrypt.hashSync(admins[i].password, salt);
    await prisma.admin.upsert({
      where: { id: admins[i].id },
      update: {},
      create: {
        id: admins[i].id,
        name: admins[i].name,
        email: admins[i].email,
        password: hashedPwd,
      },
    });
  }
  for (let i = 0; i < sweets.length; i++) {
    await prisma.sweet.upsert({
      where: { id: sweets[i].id },
      update: {
        name: sweets[i].name,
        price: sweets[i].price,
        madeAt: sweets[i].madeAt,
        quantity: sweets[i].quantity,
        ingredients: { create: sweets[i].ingredients },
      },
      create: {
        name: sweets[i].name,
        price: sweets[i].price,
        madeAt: sweets[i].madeAt,
        quantity: sweets[i].quantity,
        ingredients: { create: sweets[i].ingredients },
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
