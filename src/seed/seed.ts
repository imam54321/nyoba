import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash("admin123", 10);

  await prisma.admin.upsert({
    where: {
      username: "admin",
    },
    update: {},
    create: {
      username: "admin",
      password: hash,
    },
  });

  console.log("Admin berhasil dibuat");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });