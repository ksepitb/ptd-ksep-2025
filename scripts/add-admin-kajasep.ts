import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const connectionString = process.env.DATABASE_URL!;
const prisma = new PrismaClient({ adapter: new PrismaNeon({ connectionString }) });

const BASE_URL = process.env.BETTER_AUTH_URL || "http://localhost:3000";

async function signUpUser(email: string, password: string, name: string) {
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
    throw new Error(`Failed to create user ${email}: ${error}`);
  }

  return response.json();
}

async function main() {
  console.log("🌱 Creating Frallex Kajasep account...");
  console.log(`📡 Using API at: ${BASE_URL}`);

  const email = "admin@ksepitb.com";
  const password = "opeganteng";
  const name = "Frallex";

  try {
    // Check if user exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      console.log(`⏭️  ${email} already exists`);
      return;
    }

    // Create user via BetterAuth API
    const result = await signUpUser(email, password, name);
    console.log(`✅ Created user: ${name} (${email})`);

    // Add kajasep profile
    await prisma.kajasep.create({
      data: {
        userId: result.user.id,
        name: "Frallex",
        jurusan: "IUP AI",
        idLine: "adalah pokoknya 😹",
        instagram: "adalah pokoknya",
        mbti: "adalah pokoknya",
        hobby: "adalah pokoknya",
        tigaKata: "adalah pokoknya",
        preferensiDejasep: "adalah pokoknya",
        photoUrl: null,
        amountDejasep: 1,
        description: "adalah pokoknya",
      },
    });
    console.log(`✅ Created Kajasep profile for ${name}`);

    // Update user role
    await prisma.user.update({
      where: { id: result.user.id },
      data: { role: "kajasep" },
    });
    console.log(`✅ Set role to kajasep`);

    console.log("\n🎉 Done!");
    console.log(`\n📝 Login: ${email} / ${password}`);
  } catch (error) {
    console.error(`❌ Error: ${error}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
