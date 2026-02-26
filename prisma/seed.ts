import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL ?? "admin@blessingsglobal.org";
  const password = process.env.ADMIN_PASSWORD ?? "admin123change-me";
  const hashed = await hash(password, 12);
  const admin = await prisma.user.upsert({
    where: { email },
    update: { role: "admin", password: hashed },
    create: {
      email,
      name: "Admin",
      password: hashed,
      role: "admin",
    },
  });
  console.log("Admin user ready:", admin.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
