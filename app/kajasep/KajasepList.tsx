"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

interface KajasepData {
  id: string;
  name: string;
  jurusan: string;
  mbti: string;
  hobby: string;
  tigaKata: string;
  photoUrl: string | null;
  amountDejasep: number;
  currentChoosers: number;
}

interface KajasepListProps {
  initialKajaseps: KajasepData[];
  totalPages: number;
  currentPage: number;
  initialSearch: string;
  currentDejasep: { id: string; chosenKajasepId: string | null };
}

export default function KajasepList({
  initialKajaseps,
  totalPages,
  currentPage,
  initialSearch,
  currentDejasep,
}: KajasepListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(initialSearch);
  const [loading, setLoading] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }
    params.set("page", "1");
    router.push(`/kajasep?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`/kajasep?${params.toString()}`);
  };

  const handleChoose = async (kajasepId: string) => {
    if (!currentDejasep) return;

    setLoading(kajasepId);
    try {
      const response = await fetch("/api/choose-kajasep", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kajasepId }),
      });

      if (response.ok) {
        router.refresh();
      } else {
        const data = await response.json();
        alert(data.error || "Failed to choose Kajasep");
      }
    } catch {
      alert("An error occurred");
    } finally {
      setLoading(null);
    }
  };

  const handleUnchoose = async () => {
    if (!currentDejasep) return;

    setLoading("unchoose");
    try {
      const response = await fetch("/api/choose-kajasep", {
        method: "DELETE",
      });

      if (response.ok) {
        router.refresh();
      } else {
        const data = await response.json();
        alert(data.error || "Failed to unchoose Kajasep");
      }
    } catch {
      alert("An error occurred");
    } finally {
      setLoading(null);
    }
  };

  return (
    <>
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari Kajasep berdasarkan nama..."
            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#A3863D]/50 focus:border-[#A3863D]/50 transition-all duration-300 pr-14"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-r from-[#FFEED2] to-[#A3863D] rounded-xl hover:scale-105 transition-transform duration-300"
          >
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </form>

      {/* Current Selection Banner */}
      {currentDejasep?.chosenKajasepId && (
        <div className="mb-6 p-4 bg-gradient-to-r from-[#FFEED2]/10 to-[#A3863D]/10 border border-[#A3863D]/30 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="text-[#FFEED2] font-medium">
              Kamu sudah memilih Kajasep
            </p>
          </div>
          <button
            onClick={handleUnchoose}
            disabled={loading === "unchoose"}
            className="px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-400 rounded-xl hover:bg-red-500/30 transition-colors disabled:opacity-50"
          >
            {loading === "unchoose" ? "..." : "Batalkan Pilihan"}
          </button>
        </div>
      )}

      {/* Kajasep List */}
      <div className="space-y-4">
        {initialKajaseps.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">Tidak ada Kajasep ditemukan</p>
          </div>
        ) : (
          initialKajaseps.map((kajasep) => {
            const maxChoosers = kajasep.amountDejasep + 1;
            const isFull = kajasep.currentChoosers >= maxChoosers;
            const isChosen = currentDejasep?.chosenKajasepId === kajasep.id;
            const canChoose = !currentDejasep.chosenKajasepId && !isFull;

            return (
              <div
                key={kajasep.id}
                className={`backdrop-blur-xl bg-white/5 border rounded-2xl p-6 transition-all duration-300 ${isChosen
                  ? "border-[#A3863D]/50 bg-[#A3863D]/10"
                  : "border-white/10 hover:border-white/20"
                  }`}
              >
                <div className="flex gap-4">
                  {/* Photo */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-white/10 border border-white/10">
                      {kajasep.photoUrl ? (
                        <Image
                          src={kajasep.photoUrl}
                          alt={kajasep.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500">
                          <svg
                            className="w-8 h-8"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">
                          {kajasep.name}
                        </h3>
                        <p className="text-gray-400 text-sm">{kajasep.jurusan}</p>
                      </div>

                      {/* Status Badge */}
                      <div className="flex-shrink-0">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${isFull
                            ? "bg-red-500/20 text-red-400 border border-red-500/30"
                            : "bg-green-500/20 text-green-400 border border-green-500/30"
                            }`}
                        >
                          {kajasep.currentChoosers}/{maxChoosers}
                        </span>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="inline-flex items-center px-2 py-1 bg-white/5 rounded-lg text-xs text-gray-300">
                        MBTI: {kajasep.mbti}
                      </span>
                      <span className="inline-flex items-center px-2 py-1 bg-white/5 rounded-lg text-xs text-gray-300">
                        Hobby: {kajasep.hobby}
                      </span>
                    </div>

                    <p className="mt-2 text-sm text-gray-400 italic">
                      &quot;{kajasep.tigaKata}&quot;
                    </p>
                  </div>
                </div>

                {/* Action Button */}
                {currentDejasep && (
                  <div className="mt-4 flex justify-end">
                    {isChosen ? (
                      <span className="px-4 py-2 bg-gradient-to-r from-[#FFEED2]/20 to-[#A3863D]/20 text-[#FFEED2] rounded-xl font-medium">
                        ✓ Dipilih
                      </span>
                    ) : canChoose ? (
                      <button
                        onClick={() => handleChoose(kajasep.id)}
                        disabled={loading === kajasep.id}
                        className="px-6 py-2 bg-gradient-to-r from-[#FFEED2] to-[#A3863D] text-[#1a1a2e] font-bold rounded-xl hover:scale-105 transition-transform duration-300 disabled:opacity-50"
                      >
                        {loading === kajasep.id ? "..." : "Pilih"}
                      </button>
                    ) : isFull ? (
                      <span className="px-4 py-2 bg-red-500/10 text-red-400 rounded-xl font-medium">
                        Penuh
                      </span>
                    ) : currentDejasep.chosenKajasepId ? (
                      <span className="px-4 py-2 bg-white/5 text-gray-500 rounded-xl font-medium">
                        Sudah memilih lain
                      </span>
                    ) : null}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:bg-white/10 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            ←
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 rounded-xl font-medium transition-all duration-300 ${page === currentPage
                  ? "bg-gradient-to-r from-[#FFEED2] to-[#A3863D] text-[#1a1a2e]"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                  }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:bg-white/10 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            →
          </button>
        </div>
      )}
    </>
  );
}
