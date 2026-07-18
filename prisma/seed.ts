// /prisma/seed.ts

import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import { PrismaClient, AdminRole } from "@/src/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL as string,
});
const prisma = new PrismaClient({ adapter });

const DEMO_ADMIN_NAME = "FR Shift Admin";
const DEMO_ADMIN_EMAIL = "admin@findingroots.demo";
const DEMO_ADMIN_PASSWORD = "ChangeMe123!"; // demo only — rotate before any real use

async function main(): Promise<void> {
  const passwordHash: string = await bcrypt.hash(DEMO_ADMIN_PASSWORD, 10);

  const admin = await prisma.adminUser.upsert({
    where: { email: DEMO_ADMIN_EMAIL },
    update: {},
    create: {
      name: DEMO_ADMIN_NAME,
      email: DEMO_ADMIN_EMAIL,
      passwordHash,
      role: AdminRole.SUPER_ADMIN,
    },
  });

  console.log(`Seeded admin user: ${admin.email}`);
}

main()
  .catch((error: unknown) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });