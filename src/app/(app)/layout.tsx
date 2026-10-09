
"use client";

import Sidebar from "./components/Sidebar";
import LanguageSwitcher from "./components/LanguageSwitcher";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const router = useRouter();

  function handleLogout() {
    setShowLogoutConfirm(false);
    router.push("/");
  }

  return (
    <div className="min-h-screen bg-[#fff9fb]">
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="min-w-0 flex-1">
          <header className="sticky top-0 z-30 border-b border-[#edf0f4] bg-white/85 backdrop-blur-sm">
            <div className="mx-auto flex max-w-[1500px] items-center justify-end gap-3 px-4 py-3 sm:px-6 lg:px-10">
              <div className="flex items-center gap-3 rounded-2xl bg-[#f8f9fc] p-2.5 shadow-[0_8px_22px_rgba(27,39,66,0.05)] ring-1 ring-[#edf0f4]">
                <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-gradient-to-br from-[#ffe1ea] via-[#f6bfd1] to-[#d783a0] shadow-[0_8px_20px_rgba(214,83,122,0.18)]">
                  <span className="text-base font-bold tracking-[0.08em] text-white">
                    S
                  </span>
                  <span className="absolute inset-x-0 bottom-0 h-3 bg-gradient-to-t from-white/20 to-transparent" />
                  <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-[#67a786]" />
                </div>

                <div className="min-w-0 flex-1 text-left">
                  <p className="truncate text-sm font-bold text-[#172b4d]">
                    Shaariq
                  </p>
                  <p className="text-[10px] text-[#8994a8]">
                    Pregnancy journey
                  </p>
                </div>

                <button
                  type="button"
                  title="Log out"
                  onClick={() => setShowLogoutConfirm(true)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[#8d99aa] transition-all duration-200 hover:scale-105 hover:bg-[#ffe6ee] hover:text-[#d6537a]"
                >
                  <span className="text-xl">↪</span>
                </button>
              </div>

              <div className="w-full max-w-[220px]">
                <LanguageSwitcher />
              </div>
            </div>
          </header>

          <div>{children}</div>
        </main>
      </div>

      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#172b4d]/40 p-4 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-title"
            className="w-full max-w-md animate-[fadeIn_200ms_ease-out] rounded-3xl border border-[#f4dce5] bg-white p-7 shadow-2xl"
          >
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#fff0f4] text-3xl text-[#d6537a]">
              ♡
            </div>

            <h2
              id="logout-title"
              className="text-center text-2xl font-bold text-[#172b4d]"
            >
              Are you sure you want to log out?
            </h2>

            <p className="mt-3 text-center text-sm leading-6 text-[#78869d]">
              Your pregnancy journey matters. You can always come back to
              Maternova whenever you need us.
            </p>

            <div className="mt-7 flex gap-3">
              <button
                type="button"
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 rounded-xl border border-[#e6eaf0] px-4 py-3 text-sm font-semibold text-[#405572] transition hover:bg-[#f8f9fc]"
              >
                No, stay
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="flex-1 rounded-xl bg-[#172b4d] px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#29476f]"
              >
                Yes, log out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
