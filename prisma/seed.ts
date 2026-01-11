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
  console.log("🌱 Starting seed...");
  console.log(`📡 Using API at: ${BASE_URL}`);

  // Kajasep data
  const kajasepData = [
    {
      email: "kajasep1@example.com",
      name: "Ahmad Fauzi",
      kajasep: {
        name: "Ahmad Fauzi",
        jurusan: "Teknik Informatika",
        idLine: "ahmadfauzi",
        instagram: "@ahmadfauzi",
        mbti: "INTJ",
        hobby: "Coding, Gaming",
        tigaKata: "Ambisius, Kreatif, Loyal",
        preferensiDejasep: "Saya mencari Dejasep yang aktif dan suka berdiskusi.",
        amountDejasep: 1,
      },
    },
    {
      email: "kajasep2@example.com",
      name: "Budi Santoso",
      kajasep: {
        name: "Budi Santoso",
        jurusan: "Teknik Elektro",
        idLine: "budisantoso",
        instagram: "@budisantoso",
        mbti: "ENFP",
        hobby: "Musik, Olahraga",
        tigaKata: "Energik, Ramah, Optimis",
        preferensiDejasep: "Mencari Dejasep yang supel dan suka ngobrol.",
        amountDejasep: 2,
      },
    },
    {
      email: "kajasep3@example.com",
      name: "Citra Dewi",
      kajasep: {
        name: "Citra Dewi",
        jurusan: "Teknik Kimia",
        idLine: "citradewi",
        instagram: "@citradewi",
        mbti: "ISFJ",
        hobby: "Membaca, Memasak",
        tigaKata: "Sabar, Perhatian, Teliti",
        preferensiDejasep: "Saya suka Dejasep yang kalem dan bisa diajak diskusi.",
        amountDejasep: 1,
      },
    },
    {
      email: "kajasep4@example.com",
      name: "Dimas Pratama",
      kajasep: {
        name: "Dimas Pratama",
        jurusan: "Teknik Mesin",
        idLine: "dimaspratama",
        instagram: "@dimaspratama",
        mbti: "ESTP",
        hobby: "Futsal, Traveling",
        tigaKata: "Spontan, Berani, Seru",
        preferensiDejasep: "Yang penting asik diajak main!",
        amountDejasep: 2,
      },
    },
    {
      email: "kajasep5@example.com",
      name: "Eka Putri",
      kajasep: {
        name: "Eka Putri",
        jurusan: "Teknik Lingkungan",
        idLine: "ekaputri",
        instagram: "@ekaputri",
        mbti: "INFP",
        hobby: "Menulis, Fotografi",
        tigaKata: "Kreatif, Sensitif, Idealis",
        preferensiDejasep: "Mencari Dejasep yang punya mimpi besar.",
        amountDejasep: 1,
      },
    },
  ];

  // Dejasep data
  const dejasepData = [
    {
      email: "dejasep1@example.com",
      name: "Farhan Hakim",
      dejasep: {
        name: "Farhan Hakim",
        nomorCaksep: "CS-001",
        fakultas: "FMIPA",
      },
    },
    {
      email: "dejasep2@example.com",
      name: "Gita Lestari",
      dejasep: {
        name: "Gita Lestari",
        nomorCaksep: "CS-002",
        fakultas: "FTI",
      },
    },
  ];

  console.log("\n📝 Creating Kajasep users via API...");
  for (const data of kajasepData) {
    try {
      // Check if user exists
      const existing = await prisma.user.findUnique({ where: { email: data.email } });
      if (existing) {
        console.log(`  ⏭️  ${data.email} already exists`);
        continue;
      }

      // Create user via BetterAuth API
      const result = await signUpUser(data.email, "password123", data.name);

      // Add kajasep profile
      await prisma.kajasep.create({
        data: {
          userId: result.user.id,
          ...data.kajasep,
        },
      });

      // Update user role
      await prisma.user.update({
        where: { id: result.user.id },
        data: { role: "kajasep" },
      });

      console.log(`  ✅ Created ${data.name}`);
    } catch (error) {
      console.log(`  ❌ Failed ${data.email}: ${error}`);
    }
  }

  console.log("\n📝 Creating Dejasep users via API...");
  for (const data of dejasepData) {
    try {
      // Check if user exists
      const existing = await prisma.user.findUnique({ where: { email: data.email } });
      if (existing) {
        console.log(`  ⏭️  ${data.email} already exists`);
        continue;
      }

      // Create user via BetterAuth API
      const result = await signUpUser(data.email, "password123", data.name);

      // Add dejasep profile
      await prisma.dejasep.create({
        data: {
          userId: result.user.id,
          ...data.dejasep,
        },
      });

      // Update user role
      await prisma.user.update({
        where: { id: result.user.id },
        data: { role: "dejasep" },
      });

      console.log(`  ✅ Created ${data.name}`);
    } catch (error) {
      console.log(`  ❌ Failed ${data.email}: ${error}`);
    }
  }

  console.log("\n🎉 Seed completed!");
  console.log("\n📝 Login credentials:");
  console.log("   Kajasep: kajasep1@example.com - kajasep5@example.com");
  console.log("   Dejasep: dejasep1@example.com - dejasep2@example.com");
  console.log("   Password for all: password123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
