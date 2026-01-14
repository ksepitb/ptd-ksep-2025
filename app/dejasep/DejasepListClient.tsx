"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/Toast";

interface DejasepData {
  id: string;
  name: string;
  nomorCaksep: string;
  fakultas: string;
  status: string;
}

interface DejasepListClientProps {
  dejaseps: DejasepData[];
  maxChoosers: number;
}

export default function DejasepListClient({
  dejaseps,
  maxChoosers,
}: DejasepListClientProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const [loading, setLoading] = useState<string | null>(null);

  const handleAction = async (dejasepId: string, action: "accept" | "reject") => {
    setLoading(`${action}-${dejasepId}`);
    try {
      const response = await fetch("/api/manage-dejasep", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dejasepId, action }),
      });

      if (response.ok) {
        if (action === "accept") {
          showToast("Dejasep berhasil diterima!", "success");
        } else {
          showToast("Dejasep ditolak. Mereka dapat memilih Kajasep lain.", "info");
        }
        router.refresh();
      } else {
        const data = await response.json();
        showToast(data.error || `Gagal ${action} Dejasep`, "error");
      }
    } catch {
      showToast("Terjadi kesalahan", "error");
    } finally {
      setLoading(null);
    }
  };

  const acceptedCount = dejaseps.filter((d) => d.status === "accepted").length;
  const pendingCount = dejaseps.filter((d) => d.status === "pending").length;

  return (
    <>
      {/* Stats Card */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0 flex-1">
            <p className="text-gray-400 text-xs sm:text-sm">Jumlah yang memilihmu</p>
            <p className="text-2xl sm:text-3xl font-bold text-white mt-1">
              {dejaseps.length}{" "}
              <span className="text-base sm:text-lg text-gray-400">/ {maxChoosers}</span>
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-4 mt-2">
              <span className="text-xs sm:text-sm text-green-400">
                ✓ {acceptedCount} diterima
              </span>
              <span className="text-xs sm:text-sm text-yellow-400">
                ⏳ {pendingCount} menunggu
              </span>
            </div>
          </div>
          <div
            className={`w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0 rounded-xl sm:rounded-2xl flex items-center justify-center ${dejaseps.length >= maxChoosers
              ? "bg-gradient-to-r from-[#FFEED2] to-[#A3863D]"
              : "bg-white/10"
              }`}
          >
            <svg
              className={`w-6 h-6 sm:w-8 sm:h-8 ${dejaseps.length >= maxChoosers
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
        {dejaseps.length === 0 ? (
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
          dejaseps.map((dejasep) => (
            <div
              key={dejasep.id}
              className={`backdrop-blur-xl bg-white/5 border rounded-xl sm:rounded-2xl p-4 sm:p-6 transition-all duration-300 ${dejasep.status === "accepted"
                ? "border-green-500/30 bg-green-500/5"
                : "border-white/10 hover:border-white/20"
                }`}
            >
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                {/* Avatar + Info row */}
                <div className="flex gap-3 sm:gap-4 items-start sm:items-center flex-1 min-w-0">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl overflow-hidden bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 flex items-center justify-center">
                      <span className="text-lg sm:text-2xl font-bold text-blue-300">
                        {dejasep.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-base sm:text-xl font-bold text-white truncate">
                        {dejasep.name}
                      </h3>
                      {/* Status Badge */}
                      <span
                        className={`flex-shrink-0 px-2 py-0.5 sm:py-1 text-xs font-medium rounded-full ${dejasep.status === "accepted"
                          ? "bg-green-500/20 text-green-400 border border-green-500/30"
                          : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                          }`}
                      >
                        {dejasep.status === "accepted" ? "Diterima" : "Menunggu"}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      <span className="inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 bg-white/5 rounded-lg text-xs sm:text-sm text-gray-300">
                        No. {dejasep.nomorCaksep}
                      </span>
                      <span className="inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 bg-white/5 rounded-lg text-xs sm:text-sm text-gray-300">
                        {dejasep.fakultas}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex-shrink-0 flex gap-2 self-end sm:self-center">
                  {dejasep.status === "pending" ? (
                    <>
                      <button
                        onClick={() => handleAction(dejasep.id, "accept")}
                        disabled={loading === `accept-${dejasep.id}`}
                        className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-medium rounded-lg sm:rounded-xl btn-interactive hover:scale-105 transition-all duration-300 disabled:opacity-50"
                      >
                        {loading === `accept-${dejasep.id}` ? "..." : "Terima"}
                      </button>
                      <button
                        onClick={() => handleAction(dejasep.id, "reject")}
                        disabled={loading === `reject-${dejasep.id}`}
                        className="px-3 sm:px-4 py-1.5 sm:py-2 bg-red-500/20 border border-red-500/30 text-red-400 text-sm font-medium rounded-lg sm:rounded-xl btn-interactive hover:bg-red-500/30 transition-all disabled:opacity-50"
                      >
                        {loading === `reject-${dejasep.id}` ? "..." : "Tolak"}
                      </button>
                    </>
                  ) : (
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
