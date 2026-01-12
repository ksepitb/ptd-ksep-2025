"use client";

import Image from "next/image";

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

interface KajasepModalProps {
  kajasep: KajasepData;
  onClose: () => void;
  onChoose: (id: string) => void;
  isChosen: boolean;
  canChoose: boolean;
  loading: boolean;
  hasChosenOther: boolean;
}

export default function KajasepModal({
  kajasep,
  onClose,
  onChoose,
  isChosen,
  canChoose,
  loading,
  hasChosenOther,
}: KajasepModalProps) {
  const maxChoosers = kajasep.amountDejasep + 1;
  const isFull = kajasep.currentChoosers >= maxChoosers;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto scrollbar-hide backdrop-blur-xl bg-[#1a1a2e]/95 border border-white/10 rounded-3xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with close button */}
        <div className="sticky top-0 bg-[#1a1a2e]/95 backdrop-blur-xl p-6 border-b border-white/10 flex items-center justify-between z-10">
          <h2 className="text-xl font-bold text-white">Detail Kajasep</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-xl transition-colors"
          >
            <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          {/* Photo and Info Section - Side by Side */}
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            {/* Large Photo - 3:4 portrait aspect ratio */}
            <div className="flex-shrink-0 w-full md:w-48">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-white/10 border-2 border-[#A3863D]/30">
                {kajasep.photoUrl ? (
                  <Image
                    src={kajasep.photoUrl}
                    alt={kajasep.name}
                    width={320}
                    height={240}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    <svg
                      className="w-16 h-16"
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

            {/* Info beside photo */}
            <div className="flex-1 flex flex-col">
              {/* Name & Jurusan */}
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-white mb-1">{kajasep.name}</h3>
                <p className="text-gray-400 mb-3">{kajasep.jurusan}</p>

                {/* Status Badge */}
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${isFull
                    ? "bg-red-500/20 text-red-400 border border-red-500/30"
                    : "bg-green-500/20 text-green-400 border border-green-500/30"
                    }`}
                >
                  {kajasep.currentChoosers}/{maxChoosers} Dejasep
                </span>
              </div>

              {/* Info Grid - MBTI, Hobby, ID Line, Instagram */}
              <div className="grid grid-cols-2 gap-3 flex-1">
                <InfoBox label="MBTI" value={kajasep.mbti} />
                <InfoBox label="Hobby" value={kajasep.hobby} />
                <InfoBox label="ID Line" value={kajasep.idLine || "-"} />
                <InfoBox label="Instagram" value={kajasep.instagram || "-"} />
              </div>
            </div>
          </div>

          {/* 3 Kata */}
          <div className="mb-6">
            <p className="text-sm text-gray-400 mb-2">3 Kata</p>
            <p className="text-white bg-white/5 rounded-xl px-4 py-3 border border-white/10 italic">
              &quot;{kajasep.tigaKata}&quot;
            </p>
          </div>

          {/* Description */}
          <div className="mb-6">
            <p className="text-sm text-gray-400 mb-2">Deskripsi</p>
            <p className="text-white bg-white/5 rounded-xl px-4 py-3 border border-white/10">
              {kajasep.description || "Belum ada deskripsi"}
            </p>
          </div>

          {/* Preferensi Dejasep */}
          {kajasep.preferensiDejasep && (
            <div className="mb-6">
              <p className="text-sm text-gray-400 mb-2">Preferensi Dejasep</p>
              <p className="text-white bg-white/5 rounded-xl px-4 py-3 border border-white/10">
                {kajasep.preferensiDejasep}
              </p>
            </div>
          )}

          {/* Action Button */}
          <div className="pt-4 border-t border-white/10">
            {isChosen ? (
              <div className="flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-[#FFEED2]/20 to-[#A3863D]/20 text-[#FFEED2] rounded-xl font-medium">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Kajasep Pilihanmu
              </div>
            ) : canChoose ? (
              <button
                onClick={() => onChoose(kajasep.id)}
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-[#FFEED2] to-[#A3863D] text-[#1a1a2e] font-bold rounded-xl btn-interactive hover:scale-[1.02] transition-all duration-300 disabled:opacity-50"
              >
                {loading ? "Memproses..." : "Pilih Kajasep Ini"}
              </button>
            ) : isFull ? (
              <div className="flex items-center justify-center py-3 bg-red-500/10 text-red-400 rounded-xl font-medium">
                Kuota Penuh
              </div>
            ) : hasChosenOther ? (
              <div className="flex items-center justify-center py-3 bg-white/5 text-gray-500 rounded-xl font-medium">
                Kamu sudah memilih Kajasep lain
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white/5 rounded-xl px-4 py-3 border border-white/10">
      <p className="text-xs text-gray-400 mb-1">{label}</p>
      <p className="text-white font-medium text-sm">{value}</p>
    </div>
  );
}
