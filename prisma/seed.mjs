import { PrismaClient } from "@prisma/client";
import { admins } from "./admins.mjs";

const prisma = new PrismaClient();

async function main() {
  for (let i = 0; i < admins.length; i++) {
    await prisma.admin.upsert({
      where: { id: admins[i].id },
      update: {},
      create: {
        id: admins[i].id,
        name: admins[i].name,
        email: admins[i].email,
        password: admins[i].password,
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
