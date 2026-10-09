"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { useLanguage } from "@/lib/i18n";

const navItems = [
  { nameKey: "dashboard", href: "/dashboard", icon: "⌂" },
  { nameKey: "doctorGuidance", href: "/doctor", icon: "♡" },
  { nameKey: "nutrition", href: "/nutrition", icon: "◉" },
  { nameKey: "insights", href: "/insights", icon: "↗" },
  { nameKey: "exercises", href: "/exercise", icon: "✦" },
  { nameKey: "healthRecords", href: "/health-records", icon: "▣" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useLanguage();

  const [showLogout, setShowLogout] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  function handleLogout() {
    setLoggingOut(true);
    localStorage.removeItem("maternovaAuthenticated");
    localStorage.removeItem("maternovaProfile");

    setTimeout(() => {
      router.push("/");
    }, 500);
  }

  return (
    <>
      <aside className="hidden w-[270px] shrink-0 border-r border-[#eadfe5] bg-white lg:flex lg:min-h-screen lg:flex-col">
        <div className="px-6 pb-6 pt-7">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ffd4e1] to-[#f19ab6] text-xl font-bold text-[#c4476e] shadow-[0_8px_20px_rgba(214,83,122,0.18)]">
              ✦
              <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white bg-[#d6537a]" />
            </div>

            <div>
              <h1 className="text-[21px] font-bold tracking-tight text-[#172b4d]">Maternova</h1>
              <p className="text-[11px] font-medium text-[#8a96aa]">Pregnancy companion</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-3">
          <p className="mb-4 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#9aa4b5]">
            Workspace
          </p>

          <div className="space-y-2">
            {navItems.map((item) => {
              const active = item.href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.nameKey}
                  href={item.href}
                  className={`group relative flex w-full items-center gap-3 rounded-2xl px-3 py-3.5 transition-all duration-200 ${
                    active
                      ? "bg-gradient-to-r from-[#fff0f4] to-[#ffe4ec] shadow-[0_7px_20px_rgba(214,83,122,0.10)]"
                      : "hover:bg-[#fff8fa]"
                  }`}
                >
                  {active && <span className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-[#d6537a]" />}

                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg transition-all duration-200 group-hover:scale-105 ${
                      active
                        ? "bg-gradient-to-br from-[#f7b5c8] to-[#e889a5] text-white shadow-[0_5px_12px_rgba(214,83,122,0.22)]"
                        : "bg-[#f4f5f8] text-[#647690] group-hover:bg-[#fff0f4] group-hover:text-[#c84670]"
                    }`}
                  >
                    {item.icon}
                  </span>

                  <span
                    className={`text-sm transition-colors ${
                      active
                        ? "font-bold text-[#b83f67]"
                        : "font-semibold text-[#405572] group-hover:text-[#b83f67]"
                    }`}
                  >
                    {t(item.nameKey)}
                  </span>

                  {active && <span className="ml-auto h-2 w-2 rounded-full bg-[#d6537a] shadow-[0_0_8px_rgba(214,83,122,0.5)]" />}
                </Link>
              );
            })}
          </div>

          <p className="mb-4 mt-8 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#9aa4b5]">
            Support
          </p>

          <Link
            href="/help"
            className={`group relative flex w-full items-center gap-3 rounded-2xl px-3 py-3.5 transition-all duration-200 ${
              pathname.startsWith("/help")
                ? "bg-gradient-to-r from-[#fff0f4] to-[#ffe4ec] shadow-[0_7px_20px_rgba(214,83,122,0.10)]"
                : "hover:bg-[#fff8fa]"
            }`}
          >
            {pathname.startsWith("/help") && (
              <span className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-[#d6537a]" />
            )}

            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-base font-bold transition-all duration-200 group-hover:scale-105 ${
                pathname.startsWith("/help")
                  ? "bg-gradient-to-br from-[#f7b5c8] to-[#e889a5] text-white shadow-[0_5px_12px_rgba(214,83,122,0.22)]"
                  : "bg-[#f4f5f8] text-[#647690] group-hover:bg-[#fff0f4] group-hover:text-[#c84670]"
              }`}
            >
              ?
            </span>

            <span
              className={`text-sm ${
                pathname.startsWith("/help")
                  ? "font-bold text-[#b83f67]"
                  : "font-semibold text-[#405572] group-hover:text-[#b83f67]"
              }`}
            >
              Help &amp; Safety
            </span>

            {pathname.startsWith("/help") && <span className="ml-auto h-2 w-2 rounded-full bg-[#d6537a]" />}
          </Link>

          <div className="mt-8 overflow-hidden rounded-2xl bg-gradient-to-br from-[#172b4d] to-[#29476f] p-4 text-white shadow-[0_10px_25px_rgba(23,43,77,0.12)]">
            <div className="mb-3 flex items-center justify-between">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-[#f3a0b7]">✦</span>
              <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#aebbd0]">MATERNOVA</span>
            </div>

            <p className="text-sm font-semibold">One step at a time.</p>
            <p className="mt-1 text-[11px] leading-5 text-[#bfcadb]">
              Keep your guidance and nutrition information in one place.
            </p>
          </div>
        </nav>

        <div className="border-t border-[#edf0f4] p-5">
          <div className="flex items-center gap-3 rounded-2xl bg-[#f8f9fc] p-3">
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#f8c4d2] to-[#e889a5] text-sm font-bold text-white shadow-sm">
              AS
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#67a786]" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-[#172b4d]">Ananya</p>
              <p className="text-xs text-[#8994a8]">Pregnancy journey</p>
            </div>

            <button
              type="button"
              onClick={() => setShowLogout(true)}
              title="Log out"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[#8d99aa] transition-all duration-200 hover:scale-105 hover:bg-[#ffe6ee] hover:text-[#d6537a]"
            >
              <span className="text-xl">↪</span>
            </button>
          </div>
        </div>
      </aside>

      {showLogout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#172b4d]/50 p-5 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[24px] border border-[#e5eaf0] bg-white p-6 shadow-2xl">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#fff0f4] text-2xl text-[#d6537a]">
              ↪
            </div>
            <h3 className="text-2xl font-bold text-[#172b4d]">Log out</h3>
            <p className="mt-2 text-sm leading-6 text-[#66758f]">
              Are you sure you want to sign out from your Maternova account?
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={() => setShowLogout(false)} className="rounded-full border border-[#dfe5ee] bg-white px-4 py-2.5 text-sm font-semibold text-[#405572]">
                Cancel
              </button>
              <button type="button" onClick={handleLogout} className="rounded-full bg-[#172b4d] px-4 py-2.5 text-sm font-semibold text-white">
                {loggingOut ? "Signing out..." : "Log out"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}