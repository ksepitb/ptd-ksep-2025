import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import DejasepListClient from "./DejasepListClient";

export const metadata = {
  title: "Dejasep Saya",
};

export default async function DejasepPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Must be logged in
  if (!session?.user) {
    redirect("/sign-in");
  }

  // Get current user's kajasep info
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      kajasep: {
        include: {
          chosenBy: true,
        },
      },
      dejasep: true,
    },
  });

  // Must be a Kajasep to view this page
  if (!user?.kajasep) {
    redirect("/dashboard");
  }

  const kajasep = user.kajasep;
  const maxChoosers = kajasep.amountDejasep + 1;

  // Transform dejaseps for client component
  const dejaseps = kajasep.chosenBy.map((d) => ({
    id: d.id,
    name: d.name,
    nomorCaksep: d.nomorCaksep,
    fakultas: d.fakultas,
    status: d.status,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23] px-4 py-24">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-[#FFEED2]/5 to-[#A3863D]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-[#A3863D]/5 to-[#FFEED2]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#FFEED2] to-[#A3863D] text-transparent bg-clip-text mb-2">
            Dejasep
          </h1>
          <p className="text-gray-400">
            Dejasep yang memilihmu
          </p>
        </div>

        <DejasepListClient dejaseps={dejaseps} maxChoosers={maxChoosers} />
      </div>
    </div>
  );
}
