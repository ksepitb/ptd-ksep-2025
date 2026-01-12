import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import * as fs from "fs";
import * as path from "path";

const connectionString = process.env.DATABASE_URL!;
const prisma = new PrismaClient({ adapter: new PrismaNeon({ connectionString }) });

const BASE_URL = process.env.BETTER_AUTH_URL || "http://localhost:3000";

// Generate email from name: "Nicholas Wise Saragih" -> "nicholaswise@ksepitb.com"
function generateEmail(name: string): string {
  const parts = name.trim().toLowerCase().split(/\s+/);
  const firstTwo = parts.slice(0, 2).join("");
  // Remove any special characters
  const clean = firstTwo.replace(/[^a-z0-9]/g, "");
  return `${clean}@ksepitb.com`;
}

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

// Parse CSV - handles quoted fields with commas and newlines
function parseCSV(content: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentField = "";
  let insideQuotes = false;

  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    const nextChar = content[i + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        // Escaped quote
        currentField += '"';
        i++;
      } else {
        // Toggle quote mode
        insideQuotes = !insideQuotes;
      }
    } else if (char === "," && !insideQuotes) {
      currentRow.push(currentField);
      currentField = "";
    } else if ((char === "\r" || char === "\n") && !insideQuotes) {
      if (char === "\r" && nextChar === "\n") {
        i++; // Skip \n after \r
      }
      if (currentField || currentRow.length > 0) {
        currentRow.push(currentField);
        rows.push(currentRow);
        currentRow = [];
        currentField = "";
      }
    } else {
      currentField += char;
    }
  }

  // Don't forget the last field/row
  if (currentField || currentRow.length > 0) {
    currentRow.push(currentField);
    rows.push(currentRow);
  }

  return rows;
}

async function main() {
  console.log("🌱 Starting seed from CSV...");
  console.log(`📡 Using API at: ${BASE_URL}`);

  // Read and parse CSV
  const csvPath = path.join(__dirname, "..", "kajasep.csv");
  const csvContent = fs.readFileSync(csvPath, "utf-8");
  const rows = parseCSV(csvContent);

  // Skip header row (first row)
  const dataRows = rows.slice(1);

  console.log(`📊 Found ${dataRows.length} rows in CSV\n`);

  let created = 0;
  let skipped = 0;
  let errors = 0;

  for (const row of dataRows) {
    // Skip empty rows
    if (!row[1] || row[1].trim() === "") continue;

    const name = row[1].trim();
    const jurusan = row[2]?.trim() || "";
    const idLine = row[3]?.trim() || "";
    const instagram = row[5]?.trim() || "";
    const mbti = row[6]?.trim() || "";
    const hobby = row[7]?.trim() || "";
    const tigaKata = row[8]?.trim() || "";
    const preferensiDejasep = row[9]?.trim() || "";
    const photoUrl = null; // Google Drive URL (maybe change later)
    const amountDejasepRaw = row[11]?.trim() || "1";

    // Parse amountDejasep (1 or 2)
    const amountDejasep = amountDejasepRaw === "2" ? 2 : 1;

    const email = generateEmail(name);

    try {
      // Check if user exists
      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) {
        console.log(`  ⏭️  ${email} (${name}) already exists`);
        skipped++;
        continue;
      }

      // Create user via BetterAuth API
      const result = await signUpUser(email, "equinoxera", name);

      // Add kajasep profile
      await prisma.kajasep.create({
        data: {
          userId: result.user.id,
          name,
          jurusan,
          idLine,
          instagram,
          mbti,
          hobby,
          tigaKata,
          preferensiDejasep,
          photoUrl: null, // Set to null for now, can upload photos later
          amountDejasep,
          description: "", // Empty for now
        },
      });

      // Update user role
      await prisma.user.update({
        where: { id: result.user.id },
        data: { role: "kajasep" },
      });

      console.log(`  ✅ Created ${name} (${email})`);
      created++;
    } catch (error) {
      console.log(`  ❌ Failed ${email}: ${error}`);
      errors++;
    }
  }

  console.log(`\n   Kajasep: ✅ ${created} | ⏭️ ${skipped} | ❌ ${errors}`);

  // ========== DEJASEP SEEDING ==========
  console.log("\n📝 Creating Dejasep users from dejasep.csv...");

  const dejasepCsvPath = path.join(__dirname, "..", "dejasep.csv");
  const dejasepCsvContent = fs.readFileSync(dejasepCsvPath, "utf-8");
  const dejasepRows = parseCSV(dejasepCsvContent);

  // Skip first 2 rows (empty + header)
  const dejasepDataRows = dejasepRows.slice(2);

  let dejasepCreated = 0;
  let dejasepSkipped = 0;
  let dejasepErrors = 0;

  for (const row of dejasepDataRows) {
    // Skip empty rows
    const nomorCaksep = row[1]?.trim();
    if (!nomorCaksep || nomorCaksep === "") continue;

    const name = row[2]?.trim() || "";
    const fakultas = row[3]?.trim() || "";

    if (!name) continue;

    // Email format: caksep-<nomor>@ksepitb.com
    const email = `caksep-${nomorCaksep}@ksepitb.com`;

    try {
      // Check if user exists
      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) {
        console.log(`  ⏭️  ${email} (${name}) already exists`);
        dejasepSkipped++;
        continue;
      }

      // Create user via BetterAuth API
      const result = await signUpUser(email, "vanguard", name);

      // Add dejasep profile
      await prisma.dejasep.create({
        data: {
          userId: result.user.id,
          name,
          nomorCaksep,
          fakultas,
        },
      });

      // Update user role
      await prisma.user.update({
        where: { id: result.user.id },
        data: { role: "dejasep" },
      });

      console.log(`  ✅ Created ${name} (${email})`);
      dejasepCreated++;
    } catch (error) {
      console.log(`  ❌ Failed ${email}: ${error}`);
      dejasepErrors++;
    }
  }

  console.log(`\n   Dejasep: ✅ ${dejasepCreated} | ⏭️ ${dejasepSkipped} | ❌ ${dejasepErrors}`);

  console.log("\n🎉 Seed completed!");
  console.log("\n📝 Login credentials:");
  console.log("   Kajasep: firstnamesecondname@ksepitb.com (password: equinoxera)");
  console.log("   Dejasep: caksep-<nomor>@ksepitb.com (password: vanguard)");
  console.log("   Example: nicholaswise@ksepitb.com | caksep-4@ksepitb.com");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

