import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Image from "next/image";

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

        {/* Stats Card */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Jumlah yang memilihmu</p>
              <p className="text-3xl font-bold text-white mt-1">
                {kajasep.chosenBy.length}{" "}
                <span className="text-lg text-gray-400">/ {maxChoosers}</span>
              </p>
            </div>
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center ${kajasep.chosenBy.length >= maxChoosers
                  ? "bg-gradient-to-r from-[#FFEED2] to-[#A3863D]"
                  : "bg-white/10"
                }`}
            >
              <svg
                className={`w-8 h-8 ${kajasep.chosenBy.length >= maxChoosers
                    ? "text-[#1a1a2e]"
                    : "text-gray-400"
                  }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Dejasep List */}
        <div className="space-y-4">
          {kajasep.chosenBy.length === 0 ? (
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">
                Belum Ada yang Memilihmu
              </h3>
              <p className="text-gray-400">
                Tunggu sampai ada Dejasep yang memilihmu sebagai Kajasep favoritnya!
              </p>
            </div>
          ) : (
            kajasep.chosenBy.map((dejasep) => (
              <div
                key={dejasep.id}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300"
              >
                <div className="flex gap-4 items-center">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 flex items-center justify-center">
                      <span className="text-2xl font-bold text-blue-300">
                        {dejasep.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">
                      {dejasep.name}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      <span className="inline-flex items-center px-3 py-1 bg-white/5 rounded-lg text-sm text-gray-300">
                        No. Caksep: {dejasep.nomorCaksep}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 bg-white/5 rounded-lg text-sm text-gray-300">
                        Fakultas: {dejasep.fakultas}
                      </span>
                    </div>
                  </div>

                  {/* Badge */}
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FFEED2] to-[#A3863D] flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-[#1a1a2e]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
