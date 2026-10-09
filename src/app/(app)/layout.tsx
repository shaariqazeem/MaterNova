"use client";

import Sidebar from "./components/Sidebar";
import LanguageSwitcher from "./components/LanguageSwitcher";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#fff9fb]">

      <div className="flex min-h-screen">

        <Sidebar />

        <main className="min-w-0 flex-1">
          <header className="sticky top-0 z-30 border-b border-[#edf0f4] bg-white/85 backdrop-blur-sm">
            <div className="mx-auto flex max-w-[1500px] items-center justify-end gap-3 px-4 py-3 sm:px-6 lg:px-10">
              <div className="flex items-center gap-3 rounded-2xl bg-[#f8f9fc] p-2.5 shadow-[0_8px_22px_rgba(27,39,66,0.05)] ring-1 ring-[#edf0f4]">
                <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-[radial-gradient(circle_at_30%_30%,#ffe1ea_0%,#f6bfd1_25%,#eb9bb4_52%,#d783a0_100%)] shadow-[0_8px_20px_rgba(214,83,122,0.18)]">
                  <span className="text-base font-bold tracking-[0.08em] text-white">A</span>
                  <span className="absolute inset-x-0 bottom-0 h-3 bg-gradient-to-t from-white/20 to-transparent" />
                  <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-[#67a786] shadow-[0_0_0_2px_rgba(103,167,134,0.15)]" />
                </div>

                <div className="min-w-0 flex-1 text-left">
                  <p className="truncate text-sm font-bold text-[#172b4d]">Ananya</p>
                  <p className="text-[10px] text-[#8994a8]">Pregnancy journey</p>
                </div>

                <button
                  type="button"
                  title="Log out"
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

    </div>
  );
}