"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useToast } from "@/components/Toast";
import KajasepModal from "./KajasepModal";

interface KajasepData {
  id: string;
  name: string;
  jurusan: string;
  mbti: string;
  hobby: string;
  tigaKata: string;
  photoUrl: string | null;
  description: string | null;
  amountDejasep: number;
  currentChoosers: number;
  idLine?: string;
  instagram?: string;
  preferensiDejasep?: string;
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
  const { showToast } = useToast();
  const [search, setSearch] = useState(initialSearch);
  const [loading, setLoading] = useState<string | null>(null);
  const [selectedKajasep, setSelectedKajasep] = useState<KajasepData | null>(null);

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
        showToast("Berhasil memilih Kajasep!", "success");
        setSelectedKajasep(null);
        router.refresh();
      } else {
        const data = await response.json();
        showToast(data.error || "Failed to choose Kajasep", "error");
      }
    } catch {
      showToast("Terjadi kesalahan", "error");
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
        showToast("Pilihan Kajasep dibatalkan", "info");
        router.refresh();
      } else {
        const data = await response.json();
        showToast(data.error || "Failed to unchoose Kajasep", "error");
      }
    } catch {
      showToast("Terjadi kesalahan", "error");
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

      {/* Hint */}
      <p className="text-gray-400 text-sm mb-4 text-center">
        Klik pada kartu Kajasep untuk melihat detail dan memilih
      </p>

      {/* Kajasep Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {initialKajaseps.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-400">Tidak ada Kajasep ditemukan</p>
          </div>
        ) : (
          initialKajaseps.map((kajasep) => {
            const maxChoosers = kajasep.amountDejasep + 1;
            const isFull = kajasep.currentChoosers >= maxChoosers;
            const isChosen = currentDejasep?.chosenKajasepId === kajasep.id;

            return (
              <div
                key={kajasep.id}
                onClick={() => setSelectedKajasep(kajasep)}
                className={`cursor-pointer backdrop-blur-xl bg-white/5 border rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02] ${isChosen
                  ? "border-[#A3863D]/50 bg-[#A3863D]/10"
                  : "border-white/10 hover:border-white/20"
                  }`}
              >
                <div className="flex gap-4">
                  {/* Photo */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-white/10 border border-white/10">
                      {kajasep.photoUrl ? (
                        <Image
                          src={kajasep.photoUrl}
                          alt={kajasep.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500">
                          <svg
                            className="w-6 h-6"
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
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 max-w-[200px]">
                        <h3 className="text-lg font-bold text-white mb-0.5 truncate" title={kajasep.name}>
                          {kajasep.name}
                        </h3>
                        <p className="text-gray-400 text-sm truncate">{kajasep.jurusan}</p>
                      </div>

                      {/* Status Badge */}
                      <span
                        className={`flex-shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${isChosen
                          ? "bg-[#A3863D]/30 text-[#FFEED2] border border-[#A3863D]/50"
                          : isFull
                            ? "bg-red-500/20 text-red-400 border border-red-500/30"
                            : "bg-green-500/20 text-green-400 border border-green-500/30"
                          }`}
                      >
                        {isChosen ? "✓ Dipilih" : `${kajasep.currentChoosers}/${maxChoosers}`}
                      </span>
                    </div>

                    {/* Quick Info */}
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <span className="inline-flex items-center px-2 py-0.5 bg-white/5 rounded text-xs text-gray-400">
                        {kajasep.mbti}
                      </span>
                    </div>
                  </div>
                </div>
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
            {(() => {
              const pages: (number | string)[] = [];
              const showEllipsisStart = currentPage > 3;
              const showEllipsisEnd = currentPage < totalPages - 2;

              // Always show first page
              pages.push(1);

              if (showEllipsisStart) {
                pages.push('...');
              }

              // Show pages around current page
              for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
                if (!pages.includes(i)) pages.push(i);
              }

              if (showEllipsisEnd) {
                pages.push('...');
              }

              // Always show last page
              if (totalPages > 1 && !pages.includes(totalPages)) {
                pages.push(totalPages);
              }

              return pages.map((page, idx) =>
                typeof page === 'string' ? (
                  <span key={`ellipsis-${idx}`} className="px-2 text-gray-500">...</span>
                ) : (
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
                )
              );
            })()}
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

      {/* Modal */}
      {selectedKajasep && (
        <KajasepModal
          kajasep={selectedKajasep}
          onClose={() => setSelectedKajasep(null)}
          onChoose={handleChoose}
          isChosen={currentDejasep?.chosenKajasepId === selectedKajasep.id}
          canChoose={!currentDejasep.chosenKajasepId && selectedKajasep.currentChoosers < selectedKajasep.amountDejasep + 1}
          loading={loading === selectedKajasep.id}
          hasChosenOther={!!currentDejasep.chosenKajasepId && currentDejasep.chosenKajasepId !== selectedKajasep.id}
        />
      )}
    </>
  );
}
