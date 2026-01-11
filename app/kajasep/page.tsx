import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import KajasepList from "./KajasepList";

interface PageProps {
  searchParams: Promise<{ search?: string; page?: string }>;
}

export default async function KajasepPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Must be logged in
  if (!session?.user) {
    redirect("/sign-in");
  }

  // Get current user's info
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      kajasep: true,
      dejasep: {
        include: {
          chosenKajasep: true,
        },
      },
    },
  });

  // Must be a Dejasep to view this page
  if (!user?.dejasep) {
    redirect("/dashboard");
  }

  const currentDejasep = {
    id: user.dejasep.id,
    chosenKajasepId: user.dejasep.chosenKajasepId,
  };

  // Pagination params
  const search = params.search || "";
  const page = parseInt(params.page || "1");
  const perPage = 10;

  // Build where clause for search
  const whereClause = search
    ? {
      name: {
        contains: search,
        mode: "insensitive" as const,
      },
    }
    : {};

  // Get total count
  const totalCount = await prisma.kajasep.count({
    where: whereClause,
  });

  // Get kajasep list with count of choosers
  const kajasepList = await prisma.kajasep.findMany({
    where: whereClause,
    include: {
      _count: {
        select: { chosenBy: true },
      },
    },
    orderBy: { name: "asc" },
    skip: (page - 1) * perPage,
    take: perPage,
  });

  const totalPages = Math.ceil(totalCount / perPage);

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
            Kajasep
          </h1>
          <p className="text-gray-400">
            Pilih satu Kajasep favoritmu
          </p>
        </div>

        <KajasepList
          initialKajaseps={kajasepList.map((k) => ({
            id: k.id,
            name: k.name,
            jurusan: k.jurusan,
            mbti: k.mbti,
            hobby: k.hobby,
            tigaKata: k.tigaKata,
            photoUrl: k.photoUrl,
            amountDejasep: k.amountDejasep,
            currentChoosers: k._count.chosenBy,
          }))}
          totalPages={totalPages}
          currentPage={page}
          initialSearch={search}
          currentDejasep={currentDejasep}
        />
      </div>
    </div>
  );
}
