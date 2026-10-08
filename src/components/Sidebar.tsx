"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const navItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: "⌂",
  },
  {
    name: "Doctor Guidance",
    href: "/doctor",
    icon: "♡",
  },
  {
    name: "Nutrition",
    href: "/nutrition",
    icon: "◉",
  },
  {
    name: "Insights",
    href: "/insights",
    icon: "↗",
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [showLogout, setShowLogout] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  function handleLogout() {
    setLoggingOut(true);

    localStorage.removeItem("maternovaAuthenticated");

    setTimeout(() => {
      router.push("/");
    }, 700);
  }

  return (
    <>
      {/* =====================================================
          DESKTOP SIDEBAR
      ===================================================== */}

      <aside className="hidden w-[270px] shrink-0 border-r border-[#eadfe5] bg-white lg:flex lg:min-h-screen lg:flex-col">

        {/* =================================================
            LOGO
        ================================================= */}

        <div className="px-6 pb-6 pt-7">

          <Link
            href="/dashboard"
            className="flex items-center gap-3"
          >

            <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ffd4e1] to-[#f19ab6] text-xl font-bold text-[#c4476e] shadow-[0_8px_20px_rgba(214,83,122,0.18)]">

              ✦

              <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white bg-[#d6537a]" />

            </div>

            <div>

              <h1 className="text-[21px] font-bold tracking-tight text-[#172b4d]">
                Maternova
              </h1>

              <p className="text-[11px] font-medium text-[#8a96aa]">
                Pregnancy companion
              </p>

            </div>

          </Link>

        </div>


        {/* =================================================
            NAVIGATION
        ================================================= */}

        <nav className="flex-1 px-4 py-3">

          <p className="mb-4 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#9aa4b5]">
            Workspace
          </p>


          <div className="space-y-2">

            {navItems.map((item) => {

              const active =
                item.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(item.href);

              return (

                <Link
                  key={item.name}
                  href={item.href}
                  className={`group relative flex w-full items-center gap-3 rounded-2xl px-3 py-3.5 transition-all duration-200 ${
                    active
                      ? "bg-gradient-to-r from-[#fff0f4] to-[#ffe4ec] shadow-[0_7px_20px_rgba(214,83,122,0.10)]"
                      : "hover:bg-[#fff8fa]"
                  }`}
                >

                  {/* Active indicator */}

                  {active && (
                    <span className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-[#d6537a]" />
                  )}


                  {/* Icon */}

                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg transition-all duration-200 group-hover:scale-105 ${
                      active
                        ? "bg-gradient-to-br from-[#f7b5c8] to-[#e889a5] text-white shadow-[0_5px_12px_rgba(214,83,122,0.22)]"
                        : "bg-[#f4f5f8] text-[#647690] group-hover:bg-[#fff0f4] group-hover:text-[#c84670]"
                    }`}
                  >
                    {item.icon}
                  </span>


                  {/* Name */}

                  <span
                    className={`text-sm transition-colors ${
                      active
                        ? "font-bold text-[#b83f67]"
                        : "font-semibold text-[#405572] group-hover:text-[#b83f67]"
                    }`}
                  >
                    {item.name}
                  </span>


                  {/* Active dot */}

                  {active && (
                    <span className="ml-auto h-2 w-2 rounded-full bg-[#d6537a] shadow-[0_0_8px_rgba(214,83,122,0.5)]" />
                  )}

                </Link>

              );

            })}

          </div>


          {/* =================================================
              SUPPORT
          ================================================= */}

          <p className="mb-4 mt-10 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#9aa4b5]">
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


            {pathname.startsWith("/help") && (
              <span className="ml-auto h-2 w-2 rounded-full bg-[#d6537a]" />
            )}

          </Link>


          {/* =================================================
              CARE CARD
          ================================================= */}

          <div className="mt-8 overflow-hidden rounded-2xl bg-gradient-to-br from-[#172b4d] to-[#29476f] p-4 text-white shadow-[0_10px_25px_rgba(23,43,77,0.12)]">

            <div className="mb-3 flex items-center justify-between">

              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-[#f3a0b7]">
                ✦
              </span>

              <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#aebbd0]">
                MATERNOVA
              </span>

            </div>

            <p className="text-sm font-semibold">
              One step at a time.
            </p>

            <p className="mt-1 text-[11px] leading-5 text-[#bfcadb]">
              Keep your guidance and nutrition information in one place.
            </p>

          </div>

        </nav>


        {/* =================================================
            USER CARD
        ================================================= */}

        <div className="border-t border-[#edf0f4] p-5">

          <div className="flex items-center gap-3 rounded-2xl bg-[#f8f9fc] p-3">

            {/* Avatar */}

            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#f8c4d2] to-[#e889a5] text-sm font-bold text-white shadow-sm">

              AS

              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#67a786]" />

            </div>


            {/* User information */}

            <div className="min-w-0 flex-1">

              <p className="truncate text-sm font-bold text-[#172b4d]">
                Ananya
              </p>

              <p className="text-xs text-[#8994a8]">
                Pregnancy journey
              </p>

            </div>


            {/* LOGOUT BUTTON */}

            <button
              type="button"
              onClick={() => setShowLogout(true)}
              title="Log out"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[#8d99aa] transition-all duration-200 hover:scale-105 hover:bg-[#ffe6ee] hover:text-[#d6537a]"
            >
              <span className="text-xl">
                ↪
              </span>
            </button>

          </div>

        </div>

      </aside>


      {/* =====================================================
          LOGOUT CONFIRMATION
      ===================================================== */}

      {showLogout && (

        <div className="fixed inset-0 z-[9999] flex items-center justify-center px-5">

          {/* Dark backdrop */}

          <button
            type="button"
            aria-label="Close logout dialog"
            onClick={() => {
              if (!loggingOut) {
                setShowLogout(false);
              }
            }}
            className="absolute inset-0 bg-[#172b4d]/40 backdrop-blur-sm"
          />


          {/* Dialog */}

          <div
            className={`relative z-10 w-full max-w-[430px] rounded-[30px] border border-[#f0dbe2] bg-white p-8 shadow-[0_30px_80px_rgba(23,43,77,0.22)] ${
              loggingOut
                ? "animate-logout-success"
                : "animate-logout-modal"
            }`}
          >

            {/* Icon */}

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#fff0f4] text-3xl text-[#d6537a]">
              {loggingOut ? "♡" : "↪"}
            </div>


            {/* Text */}

            <div className="mt-5 text-center">

              <h2 className="text-2xl font-bold text-[#172b4d]">

                {loggingOut
                  ? "See you soon."
                  : "Are you sure you want to log out?"}

              </h2>


              <p className="mx-auto mt-3 max-w-[340px] text-sm leading-6 text-[#71809a]">

                {loggingOut
                  ? "Taking you back to your Maternova welcome page."
                  : "Your Maternova journey will be waiting for you when you return."}

              </p>

            </div>


            {/* Buttons */}

            {!loggingOut && (

              <div className="mt-7 grid grid-cols-2 gap-3">

                <button
                  type="button"
                  onClick={() => setShowLogout(false)}
                  className="h-[52px] rounded-2xl border border-[#e7dce2] bg-white text-sm font-bold text-[#405572] transition-all duration-200 hover:bg-[#fff8fa] hover:text-[#c4476e]"
                >
                  No
                </button>


                <button
                  type="button"
                  onClick={handleLogout}
                  className="h-[52px] rounded-2xl bg-[#172f55] text-sm font-bold text-white shadow-[0_10px_20px_rgba(23,47,85,0.16)] transition-all duration-200 hover:bg-[#203b67]"
                >
                  Logout
                </button>

              </div>

            )}


            {!loggingOut && (

              <p className="mt-5 text-center text-[10px] text-[#a1aaba]">
                You can always come back to continue your journey. ♡
              </p>

            )}

          </div>

        </div>

      )}


      {/* =====================================================
          ANIMATION
      ===================================================== */}

      <style jsx global>{`

        @keyframes logout-modal {

          from {
            opacity: 0;
            transform: translateY(25px) scale(0.94);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }

        }

        @keyframes logout-success {

          0% {
            opacity: 1;
            transform: scale(1);
          }

          100% {
            opacity: 0;
            transform: scale(0.96) translateY(-10px);
          }

        }

        .animate-logout-modal {
          animation: logout-modal 0.35s cubic-bezier(.2,.8,.2,1) both;
        }

        .animate-logout-success {
          animation: logout-success 0.65s ease-in-out both;
        }

      `}</style>

    </>
  );
}