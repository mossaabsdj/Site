import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const newUser = await prisma.Compte.create({
    data: {
      User: "admin",
      Password: "admin",
    },
  });

  console.log(newUser);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
  });
