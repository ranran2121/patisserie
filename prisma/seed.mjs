import { PrismaClient } from "@prisma/client";
import { admins } from "./admins.mjs";
import { sweets } from "./sweets.mjs";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  for (let i = 0; i < admins.length; i++) {
    const hashedPwd = await bcrypt.hash(admins[i].password, 10);
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
      update: {},
      create: {
        name: sweets[i].name,
        price: sweets[i].price,
        madeAt: sweets[i].madeAt,
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
