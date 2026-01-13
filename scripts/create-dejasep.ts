import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const connectionString = process.env.DATABASE_URL!;
const prisma = new PrismaClient({ adapter: new PrismaNeon({ connectionString }) });

const BASE_URL = process.env.BETTER_AUTH_URL || "http://localhost:3000";

async function main() {
  const email = "equinoxera@ksepitb.com";
  const password = "gunggalega";
  const name = "Equinoxera";

  console.log(`🚀 Creating dejasep account: ${email}`);

  // Check if user already exists
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log(`❌ User ${email} already exists!`);
    return;
  }

  // Sign up via BetterAuth API
  const response = await fetch(`${BASE_URL}/api/auth/sign-up/email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Origin": BASE_URL,
    },
    body: JSON.stringify({ email, password, name }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to create user: ${error}`);
  }

  const result = await response.json();
  console.log(`✅ User created with ID: ${result.user.id}`);

  // Create dejasep profile
  await prisma.dejasep.create({
    data: {
      userId: result.user.id,
      name,
      nomorCaksep: "0", // Placeholder number
      fakultas: "Test",
    },
  });
  console.log(`✅ Dejasep profile created`);

  // Update user role to dejasep
  await prisma.user.update({
    where: { id: result.user.id },
    data: { role: "dejasep" },
  });
  console.log(`✅ User role set to dejasep`);

  console.log(`\n🎉 Done! Login with:`);
  console.log(`   Email: ${email}`);
  console.log(`   Password: ${password}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
