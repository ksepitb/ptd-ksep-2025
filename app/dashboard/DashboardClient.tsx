"use client";

import { useState } from "react";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useToast } from "@/components/Toast";

interface KajasepData {
  id: string;
  name: string;
  jurusan: string;
  idLine: string;
  instagram: string;
  mbti: string;
  hobby: string;
  tigaKata: string;
  preferensiDejasep: string;
  photoUrl: string | null;
  description: string | null;
  amountDejasep: number;
  _count?: {
    chosenBy: number;
  };
}

interface ChosenKajasep {
  id: string;
  name: string;
  jurusan: string;
  idLine: string;
  instagram: string;
  mbti: string;
  hobby: string;
  tigaKata: string;
  photoUrl: string | null;
}

interface DejasepData {
  id: string;
  name: string;
  nomorCaksep: string;
  fakultas: string;
  chosenKajasepId: string | null;
  chosenKajasep: ChosenKajasep | null;
  status: string;
}

interface UserData {
  id: string;
  name: string;
  email: string;
  image: string | null;
  role: string;
  kajasep: KajasepData | null;
  dejasep: DejasepData | null;
}

export default function DashboardClient({ user }: { user: UserData }) {
  const router = useRouter();
  const { showToast } = useToast();
  const [showEditModal, setShowEditModal] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(user.kajasep?.photoUrl || null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [formData, setFormData] = useState({
    name: user.kajasep?.name || "",
    jurusan: user.kajasep?.jurusan || "",
    idLine: user.kajasep?.idLine || "",
    instagram: user.kajasep?.instagram || "",
    mbti: user.kajasep?.mbti || "",
    hobby: user.kajasep?.hobby || "",
    tigaKata: user.kajasep?.tigaKata || "",
    preferensiDejasep: user.kajasep?.preferensiDejasep || "",
    description: user.kajasep?.description || "",
  });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showToast("Ukuran file maksimal 5MB", "error");
        return;
      }
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSignOut = async () => {
    showToast("Berhasil logout. Sampai jumpa!", "info");
    await signOut();
    router.push("/");
    router.refresh();
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditLoading(true);

    try {
      let photoUrl = user.kajasep?.photoUrl;

      // Upload photo if a new one was selected
      if (photoFile) {
        setUploadingPhoto(true);
        const uploadFormData = new FormData();
        uploadFormData.append("file", photoFile);

        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: uploadFormData,
        });

        if (uploadResponse.ok) {
          const uploadData = await uploadResponse.json();
          photoUrl = uploadData.url;
        } else {
          showToast("Gagal mengupload foto", "error");
          setUploadingPhoto(false);
          setEditLoading(false);
          return;
        }
        setUploadingPhoto(false);
      }

      const response = await fetch("/api/kajasep/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, photoUrl }),
      });

      if (response.ok) {
        showToast("Profil berhasil diperbarui!", "success");
        setShowEditModal(false);
        setPhotoFile(null);
        router.refresh();
      } else {
        const data = await response.json();
        showToast(data.error || "Gagal memperbarui profil", "error");
      }
    } catch {
      showToast("Terjadi kesalahan", "error");
    } finally {
      setEditLoading(false);
    }
  };

  const accountType = user.kajasep
    ? "Kajasep"
    : user.dejasep
      ? "Dejasep"
      : "User";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23] px-4 py-24">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-[#FFEED2]/5 to-[#A3863D]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-[#A3863D]/5 to-[#FFEED2]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#FFEED2] to-[#A3863D] text-transparent bg-clip-text">
              Dashboard
            </h1>
            <p className="text-gray-400 mt-1 text-sm sm:text-base">Welcome back, {user.name}!</p>
          </div>
          <button
            onClick={handleSignOut}
            className="self-start sm:self-auto px-4 sm:px-6 py-2 bg-white/5 border border-white/10 rounded-xl text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-300 text-sm sm:text-base"
          >
            Sign Out
          </button>
        </div>

        {/* Account Type Badge */}
        <div className="mb-6 sm:mb-8">
          <span
            className={`inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium ${accountType === "Kajasep"
              ? "bg-gradient-to-r from-[#FFEED2]/20 to-[#A3863D]/20 text-[#FFEED2] border border-[#A3863D]/30"
              : accountType === "Dejasep"
                ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-500/30"
                : "bg-white/10 text-gray-400 border border-white/20"
              }`}
          >
            {accountType == "Dejasep" ? "Ca-KSEP" : accountType}
          </span>
        </div>

        {/* Kajasep Data */}
        {user.kajasep && (
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-semibold text-white flex items-center gap-2">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-[#A3863D]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
                Kajasep Profile
              </h2>
              <button
                onClick={() => setShowEditModal(true)}
                className="self-start sm:self-auto px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-[#FFEED2] to-[#A3863D] text-[#1a1a2e] font-medium rounded-xl hover:scale-105 transition-transform duration-300 flex items-center gap-2 text-sm"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Profile
              </button>
            </div>

            {/* Chooser Count */}
            {user.kajasep._count && (
              <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gradient-to-r from-[#FFEED2]/10 to-[#A3863D]/10 border border-[#A3863D]/30 rounded-xl sm:rounded-2xl">
                <p className="text-[#FFEED2] font-medium text-sm sm:text-base">
                  Dejasep yang memilihmu: {user.kajasep._count.chosenBy} /{" "}
                  {user.kajasep.amountDejasep + 1}
                </p>
              </div>
            )}

            {/* Photo */}
            {user.kajasep.photoUrl && (
              <div className="mb-6 flex justify-center">
                <div className="relative w-32 h-32 rounded-2xl overflow-hidden border-2 border-[#A3863D]/30">
                  <Image
                    src={user.kajasep.photoUrl}
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
              <InfoItem label="Nama" value={user.kajasep.name} />
              <InfoItem label="Jurusan" value={user.kajasep.jurusan} />
              <InfoItem label="ID Line" value={user.kajasep.idLine} />
              <InfoItem label="Instagram" value={user.kajasep.instagram} />
              <InfoItem label="MBTI" value={user.kajasep.mbti} />
              <InfoItem label="Hobby" value={user.kajasep.hobby} />
              <InfoItem label="3 Kata" value={user.kajasep.tigaKata} />
              <InfoItem
                label="Amount Dejasep"
                value={String(user.kajasep.amountDejasep)}
              />
            </div>

            <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
              <InfoItem
                label="Preferensi Dejasep"
                value={user.kajasep.preferensiDejasep}
                fullWidth
              />
              <InfoItem
                label="Deskripsi"
                value={user.kajasep.description || "Belum ada deskripsi"}
                fullWidth
              />
            </div>
          </div>
        )}

        {/* Dejasep Data */}
        {user.dejasep && (
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6 flex items-center gap-2">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400"
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
              Dejasep Profile
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
              <InfoItem label="Nama" value={user.dejasep.name} />
              <InfoItem label="Nomor Caksep" value={user.dejasep.nomorCaksep} />
              <InfoItem label="Fakultas" value={user.dejasep.fakultas} />
            </div>
          </div>
        )}

        {/* Chosen Kajasep for Dejasep */}
        {user.dejasep?.chosenKajasep && (
          <div className="backdrop-blur-xl bg-gradient-to-r from-[#FFEED2]/5 to-[#A3863D]/5 border border-[#A3863D]/30 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-semibold text-[#FFEED2] flex items-center gap-2">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
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
                Kajasep Pilihanmu
              </h2>
              <span
                className={`self-start sm:self-auto px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded-full ${user.dejasep.status === "accepted"
                  ? "bg-green-500/20 text-green-400 border border-green-500/30"
                  : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                  }`}
              >
                {user.dejasep.status === "accepted" ? "✓ Diterima" : "⏳ Menunggu"}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              {/* Photo */}
              <div className="flex-shrink-0 flex justify-center sm:justify-start">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl sm:rounded-2xl overflow-hidden bg-white/10 border-2 border-[#A3863D]/30">
                  {user.dejasep.chosenKajasep.photoUrl ? (
                    <Image
                      src={user.dejasep.chosenKajasep.photoUrl}
                      alt={user.dejasep.chosenKajasep.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      <svg
                        className="w-8 h-8 sm:w-10 sm:h-10"
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
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                  {user.dejasep.chosenKajasep.name}
                </h3>
                <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                  {user.dejasep.chosenKajasep.jurusan}
                </p>

                <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-3">
                  <span className="inline-flex items-center px-2 sm:px-3 py-1 bg-white/5 rounded-lg text-xs sm:text-sm text-gray-300">
                    MBTI: {user.dejasep.chosenKajasep.mbti}
                  </span>
                  <span className="inline-flex items-center px-2 sm:px-3 py-1 bg-white/5 rounded-lg text-xs sm:text-sm text-gray-300">
                    Line: {user.dejasep.chosenKajasep.idLine}
                  </span>
                  <span className="inline-flex items-center px-2 sm:px-3 py-1 bg-white/5 rounded-lg text-xs sm:text-sm text-gray-300">
                    IG: {user.dejasep.chosenKajasep.instagram}
                  </span>
                </div>

                <p className="mt-3 text-xs sm:text-sm text-gray-400 italic">
                  &quot;{user.dejasep.chosenKajasep.tigaKata}&quot;
                </p>
              </div>
            </div>
          </div>
        )}

        {/* CTA for Dejasep without chosen Kajasep */}
        {user.dejasep && !user.dejasep.chosenKajasep && (
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-gradient-to-r from-[#FFEED2]/20 to-[#A3863D]/20 flex items-center justify-center">
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8 text-[#FFEED2]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <h3 className="text-base sm:text-lg font-medium text-white mb-2">
              Belum Memilih Kajasep
            </h3>
            <p className="text-gray-400 text-sm sm:text-base mb-4 sm:mb-6">
              Kamu belum memilih Kajasep favoritmu. Yuk pilih sekarang!
            </p>
            <Link
              href="/kajasep"
              className="inline-flex items-center px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-[#FFEED2] to-[#A3863D] text-[#1a1a2e] font-bold rounded-xl hover:scale-105 transition-transform duration-300 text-sm sm:text-base"
            >
              Pilih Kajasep
            </Link>
          </div>
        )}

        {/* No Profile Data */}
        {!user.kajasep && !user.dejasep && (
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-white/10 flex items-center justify-center">
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h3 className="text-base sm:text-lg font-medium text-white mb-2">
              No Profile Data Yet
            </h3>
            <p className="text-gray-400 text-sm sm:text-base">
              Your Kajasep or Dejasep profile hasn&apos;t been set up yet.
              <br />
              Please contact the administrator to complete your profile.
            </p>
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && user.kajasep && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/50 backdrop-blur-sm" onClick={() => setShowEditModal(false)}>
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-hide backdrop-blur-xl bg-[#1a1a2e]/95 border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white">Edit Profile</h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="p-1.5 sm:p-2 hover:bg-white/10 rounded-xl transition-colors"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-3 sm:space-y-4">
              {/* Photo Upload */}
              <div className="flex flex-col items-center mb-3 sm:mb-4">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl sm:rounded-2xl overflow-hidden bg-white/10 border-2 border-[#A3863D]/30 mb-2 sm:mb-3">
                  {photoPreview ? (
                    <Image
                      src={photoPreview}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                  {uploadingPhoto && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 sm:h-6 sm:w-6 text-white" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    </div>
                  )}
                </div>
                <label className="cursor-pointer px-3 sm:px-4 py-1.5 sm:py-2 bg-white/5 border border-white/10 rounded-xl text-gray-300 text-xs sm:text-sm hover:bg-white/10 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                  {photoFile ? "Ganti Foto" : "Upload Foto"}
                </label>
                <p className="text-xs text-gray-500 mt-1">Maksimal 5MB</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <FormField label="Nama" value={formData.name} onChange={(v) => setFormData({ ...formData, name: v })} />
                <FormField label="Jurusan" value={formData.jurusan} onChange={(v) => setFormData({ ...formData, jurusan: v })} />
                <FormField label="ID Line" value={formData.idLine} onChange={(v) => setFormData({ ...formData, idLine: v })} />
                <FormField label="Instagram" value={formData.instagram} onChange={(v) => setFormData({ ...formData, instagram: v })} />
                <FormField label="MBTI" value={formData.mbti} onChange={(v) => setFormData({ ...formData, mbti: v })} />
                <FormField label="Hobby" value={formData.hobby} onChange={(v) => setFormData({ ...formData, hobby: v })} />
              </div>

              <FormField label="3 Kata" value={formData.tigaKata} onChange={(v) => setFormData({ ...formData, tigaKata: v })} />

              <FormTextArea
                label="Preferensi Dejasep"
                value={formData.preferensiDejasep}
                onChange={(v) => setFormData({ ...formData, preferensiDejasep: v })}
              />

              <FormTextArea
                label="Deskripsi"
                value={formData.description}
                onChange={(v) => setFormData({ ...formData, description: v })}
                placeholder="Ceritakan tentang dirimu..."
              />

              <div className="flex gap-3 sm:gap-4 pt-3 sm:pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 py-2.5 sm:py-3 px-3 sm:px-4 bg-white/5 border border-white/10 text-gray-300 font-medium rounded-xl btn-interactive hover:bg-white/10 transition-all text-sm sm:text-base"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={editLoading}
                  className="flex-1 py-2.5 sm:py-3 px-3 sm:px-4 bg-gradient-to-r from-[#FFEED2] to-[#A3863D] text-[#1a1a2e] font-bold rounded-xl btn-interactive hover:scale-[1.02] transition-all disabled:opacity-50 text-sm sm:text-base"
                >
                  {editLoading ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function InfoItem({
  label,
  value,
  fullWidth = false,
}: {
  label: string;
  value: string;
  fullWidth?: boolean;
}) {
  return (
    <div className={fullWidth ? "col-span-full" : ""}>
      <p className="text-xs sm:text-sm text-gray-400 mb-1">{label}</p>
      <p className="text-white bg-white/5 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 border border-white/10 whitespace-pre-wrap text-sm sm:text-base">
        {value || "-"}
      </p>
    </div>
  );
}

function FormField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="block text-xs sm:text-sm text-gray-400 mb-1">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#A3863D]/50 transition-all text-sm sm:text-base"
      />
    </div>
  );
}

function FormTextArea({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs sm:text-sm text-gray-400 mb-1">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        placeholder={placeholder}
        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#A3863D]/50 transition-all resize-none text-sm sm:text-base"
      />
    </div>
  );
}
