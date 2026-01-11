"use client";

import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

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

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
    router.refresh();
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#FFEED2] to-[#A3863D] text-transparent bg-clip-text">
              Dashboard
            </h1>
            <p className="text-gray-400 mt-1">Welcome back, {user.name}!</p>
          </div>
          <button
            onClick={handleSignOut}
            className="px-6 py-2 bg-white/5 border border-white/10 rounded-xl text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-300"
          >
            Sign Out
          </button>
        </div>

        {/* Account Type Badge */}
        <div className="mb-8">
          <span
            className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${accountType === "Kajasep"
                ? "bg-gradient-to-r from-[#FFEED2]/20 to-[#A3863D]/20 text-[#FFEED2] border border-[#A3863D]/30"
                : accountType === "Dejasep"
                  ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-500/30"
                  : "bg-white/10 text-gray-400 border border-white/20"
              }`}
          >
            {accountType} Account
          </span>
        </div>

        {/* User Info Card */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl mb-8">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <svg
              className="w-5 h-5 text-[#A3863D]"
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
            Account Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoItem label="Name" value={user.name} />
            <InfoItem label="Email" value={user.email} />
          </div>
        </div>

        {/* Kajasep Data */}
        {user.kajasep && (
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl mb-8">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-[#A3863D]"
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

            {/* Chooser Count */}
            {user.kajasep._count && (
              <div className="mb-6 p-4 bg-gradient-to-r from-[#FFEED2]/10 to-[#A3863D]/10 border border-[#A3863D]/30 rounded-2xl">
                <p className="text-[#FFEED2] font-medium">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            <div className="mt-6">
              <InfoItem
                label="Preferensi Dejasep"
                value={user.kajasep.preferensiDejasep}
                fullWidth
              />
            </div>
          </div>
        )}

        {/* Dejasep Data */}
        {user.dejasep && (
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl mb-8">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-blue-400"
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InfoItem label="Nama" value={user.dejasep.name} />
              <InfoItem label="Nomor Caksep" value={user.dejasep.nomorCaksep} />
              <InfoItem label="Fakultas" value={user.dejasep.fakultas} />
            </div>
          </div>
        )}

        {/* Chosen Kajasep for Dejasep */}
        {user.dejasep?.chosenKajasep && (
          <div className="backdrop-blur-xl bg-gradient-to-r from-[#FFEED2]/5 to-[#A3863D]/5 border border-[#A3863D]/30 rounded-3xl p-8 shadow-2xl mb-8">
            <h2 className="text-xl font-semibold text-[#FFEED2] mb-6 flex items-center gap-2">
              <svg
                className="w-5 h-5"
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

            <div className="flex gap-6">
              {/* Photo */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-white/10 border-2 border-[#A3863D]/30">
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
                        className="w-10 h-10"
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
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-1">
                  {user.dejasep.chosenKajasep.name}
                </h3>
                <p className="text-gray-400 mb-4">
                  {user.dejasep.chosenKajasep.jurusan}
                </p>

                <div className="flex flex-wrap gap-3">
                  <span className="inline-flex items-center px-3 py-1 bg-white/5 rounded-lg text-sm text-gray-300">
                    MBTI: {user.dejasep.chosenKajasep.mbti}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 bg-white/5 rounded-lg text-sm text-gray-300">
                    Line: {user.dejasep.chosenKajasep.idLine}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 bg-white/5 rounded-lg text-sm text-gray-300">
                    IG: {user.dejasep.chosenKajasep.instagram}
                  </span>
                </div>

                <p className="mt-3 text-sm text-gray-400 italic">
                  &quot;{user.dejasep.chosenKajasep.tigaKata}&quot;
                </p>
              </div>
            </div>
          </div>
        )}

        {/* CTA for Dejasep without chosen Kajasep */}
        {user.dejasep && !user.dejasep.chosenKajasep && (
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#FFEED2]/20 to-[#A3863D]/20 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-[#FFEED2]"
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
            <h3 className="text-lg font-medium text-white mb-2">
              Belum Memilih Kajasep
            </h3>
            <p className="text-gray-400 mb-6">
              Kamu belum memilih Kajasep favoritmu. Yuk pilih sekarang!
            </p>
            <Link
              href="/kajasep"
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-[#FFEED2] to-[#A3863D] text-[#1a1a2e] font-bold rounded-xl hover:scale-105 transition-transform duration-300"
            >
              Pilih Kajasep
            </Link>
          </div>
        )}

        {/* No Profile Data */}
        {!user.kajasep && !user.dejasep && (
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl text-center">
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
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">
              No Profile Data Yet
            </h3>
            <p className="text-gray-400">
              Your Kajasep or Dejasep profile hasn&apos;t been set up yet.
              <br />
              Please contact the administrator to complete your profile.
            </p>
          </div>
        )}
      </div>
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
      <p className="text-sm text-gray-400 mb-1">{label}</p>
      <p className="text-white bg-white/5 rounded-xl px-4 py-3 border border-white/10">
        {value || "-"}
      </p>
    </div>
  );
}

