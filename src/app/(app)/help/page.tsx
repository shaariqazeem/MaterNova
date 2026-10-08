"use client";

import { useState } from "react";
import {
  AlertTriangle,
  Phone,
  Stethoscope,
  ShieldCheck,
  FileText,
  Utensils,
  MessageCircle,
  ChevronDown,
  Lock,
  Heart,
  CheckCircle2,
} from "lucide-react";

const faqs = [
  {
    question: "Does Maternova replace my doctor?",
    answer:
      "No. Maternova is designed to support your pregnancy journey by helping you understand healthcare guidance, organize information, and track nutrition. It does not replace your doctor, midwife, or other healthcare professional.",
  },
  {
    question: "Can Maternova diagnose a medical condition?",
    answer:
      "No. Maternova does not diagnose diseases or medical conditions. It can simplify information from documents and help you understand what your healthcare professional has already provided, but medical decisions should always be made with your healthcare team.",
  },
  {
    question: "Can I use Maternova for emergency symptoms?",
    answer:
      "No. Maternova should never be used for emergencies. If you think you are experiencing an emergency, contact your local emergency medical service or go to the nearest appropriate emergency facility.",
  },
  {
    question: "How does document analysis work?",
    answer:
      "You can upload a doctor-provided report, prescription, or healthcare document. Maternova uses AI to identify relevant information and explain it in simpler language. The original healthcare document should always be considered the authoritative source.",
  },
  {
    question: "Is my health information private?",
    answer:
      "Maternova is designed with privacy in mind. Only upload information that you are comfortable processing through the application, and avoid sharing unnecessary personal information.",
  },
];

export default function HelpPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-[#f8f9fc] text-[#172b4d]">
      <div className="mx-auto max-w-[1500px] px-6 py-8 lg:px-10 lg:py-10">

        {/* PAGE HEADER */}
        <div className="mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#eadfe4] bg-white px-3 py-1.5 shadow-sm">
            <ShieldCheck className="h-4 w-4 text-[#d6537a]" />
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#b83f67]">
              Safety & Support
            </span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-[#172b4d] lg:text-5xl">
            Help & Safety
          </h1>

          <p className="mt-3 max-w-2xl text-base leading-7 text-[#71809a]">
            Important information about using Maternova safely during your
            pregnancy journey.
          </p>
        </div>

        {/* ========================================================= */}
        {/* IMPORTANT EMERGENCY SECTION */}
        {/* ========================================================= */}

        <section className="relative mb-8 overflow-hidden rounded-[28px] border border-[#efc4d0] bg-[#fff8fa] shadow-[0_8px_30px_rgba(214,83,122,0.06)]">

          {/* subtle decorative glow */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#f9d7e2] opacity-40 blur-3xl" />

          <div className="relative p-7 sm:p-9 lg:p-10">

            <div className="flex flex-col gap-7 lg:flex-row lg:items-start">

              {/* WARNING ICON */}
              <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-[20px] bg-[#f9dce5] text-[#d6537a] shadow-sm">
                <AlertTriangle
                  className="h-8 w-8"
                  strokeWidth={2.2}
                />
              </div>

              <div className="min-w-0 flex-1">

                {/* IMPORTANT LABEL */}
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-sm font-extrabold uppercase tracking-[0.2em] text-[#c84670]">
                    Important
                  </span>

                  <span className="h-1.5 w-1.5 rounded-full bg-[#d6537a]" />
                </div>

                {/* MAIN EMERGENCY HEADING */}
                <h2 className="max-w-4xl font-serif text-3xl leading-tight text-[#172b4d] sm:text-[34px] lg:text-[38px]">
                  If you think you are experiencing an emergency
                </h2>

                {/* DESCRIPTION */}
                <p className="mt-4 max-w-4xl text-[15px] leading-7 text-[#536d91] sm:text-base">
                  Do not wait for Maternova to respond. Contact your local
                  emergency medical service or go to the nearest appropriate
                  emergency facility. For urgent pregnancy concerns, contact
                  your healthcare professional or maternity care team.
                </p>

                {/* ACTION BUTTONS */}
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">

                  <a
                    href="tel:112"
                    className="inline-flex items-center justify-center gap-2.5 rounded-full border border-[#eee4e8] bg-white px-5 py-3 text-sm font-bold text-[#172b4d] shadow-[0_3px_8px_rgba(23,43,77,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#e9c3cf] hover:bg-[#fffdfd] hover:shadow-[0_6px_16px_rgba(23,43,77,0.10)]"
                  >
                    <Phone
                      className="h-[18px] w-[18px] text-[#d6537a]"
                      strokeWidth={2}
                    />
                    Contact medical care
                  </a>

                  <a
                    href="#care-team"
                    className="inline-flex items-center justify-center gap-2.5 rounded-full border border-[#eee4e8] bg-white px-5 py-3 text-sm font-bold text-[#172b4d] shadow-[0_3px_8px_rgba(23,43,77,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#d8e0ea] hover:bg-[#fffdfd] hover:shadow-[0_6px_16px_rgba(23,43,77,0.10)]"
                  >
                    <Stethoscope
                      className="h-[18px] w-[18px] text-[#29476f]"
                      strokeWidth={2}
                    />
                    Contact your care team
                  </a>

                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* WHAT MATERNOVA CAN HELP WITH */}
        {/* ========================================================= */}

        <section className="mb-8">
          <div className="mb-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#d6537a]">
              What Maternova can do
            </p>

            <h2 className="mt-2 text-2xl font-bold text-[#172b4d]">
              Support you can use every day
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#7b879b]">
              Maternova is designed to make everyday pregnancy information
              easier to understand and manage.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">

            {/* CARD 1 */}
            <div className="group rounded-[24px] border border-[#e8eaf0] bg-white p-6 shadow-[0_6px_20px_rgba(23,43,77,0.04)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(23,43,77,0.08)]">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff0f4] text-[#d6537a] transition-transform duration-200 group-hover:scale-105">
                <FileText className="h-5 w-5" />
              </div>

              <h3 className="font-bold text-[#172b4d]">
                Understand guidance
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#7b879b]">
                Simplify doctor-provided reports, instructions, and healthcare
                documents into easier-to-understand language.
              </p>
            </div>

            {/* CARD 2 */}
            <div className="group rounded-[24px] border border-[#e8eaf0] bg-white p-6 shadow-[0_6px_20px_rgba(23,43,77,0.04)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(23,43,77,0.08)]">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#eef3fa] text-[#29476f] transition-transform duration-200 group-hover:scale-105">
                <Utensils className="h-5 w-5" />
              </div>

              <h3 className="font-bold text-[#172b4d]">
                Track nutrition
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#7b879b]">
                Keep track of meals and nutrition information throughout your
                pregnancy journey.
              </p>
            </div>

            {/* CARD 3 */}
            <div className="group rounded-[24px] border border-[#e8eaf0] bg-white p-6 shadow-[0_6px_20px_rgba(23,43,77,0.04)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(23,43,77,0.08)]">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff0f4] text-[#d6537a] transition-transform duration-200 group-hover:scale-105">
                <MessageCircle className="h-5 w-5" />
              </div>

              <h3 className="font-bold text-[#172b4d]">
                Ask questions
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#7b879b]">
                Ask Maternova about your tracked information and navigate
                through your pregnancy dashboard using natural language.
              </p>
            </div>

            {/* CARD 4 */}
            <div className="group rounded-[24px] border border-[#e8eaf0] bg-white p-6 shadow-[0_6px_20px_rgba(23,43,77,0.04)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(23,43,77,0.08)]">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#eef3fa] text-[#29476f] transition-transform duration-200 group-hover:scale-105">
                <Heart className="h-5 w-5" />
              </div>

              <h3 className="font-bold text-[#172b4d]">
                Stay organized
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#7b879b]">
                Keep important pregnancy guidance, nutrition information, and
                insights together in one place.
              </p>
            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* WHAT MATERNOVA CANNOT DO */}
        {/* ========================================================= */}

        <section className="mb-8 rounded-[26px] border border-[#e7e1e5] bg-white p-7 shadow-[0_6px_20px_rgba(23,43,77,0.04)] lg:p-8">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-start">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#fff0f4] text-[#d6537a]">
              <ShieldCheck className="h-6 w-6" />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#d6537a]">
                Important limitation
              </p>

              <h2 className="mt-2 text-2xl font-bold text-[#172b4d]">
                What Maternova cannot do
              </h2>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">

                <div className="flex items-start gap-3 rounded-2xl bg-[#fafbfc] p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#d6537a]" />
                  <p className="text-sm leading-6 text-[#596b86]">
                    Maternova does not diagnose medical conditions.
                  </p>
                </div>

                <div className="flex items-start gap-3 rounded-2xl bg-[#fafbfc] p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#d6537a]" />
                  <p className="text-sm leading-6 text-[#596b86]">
                    Maternova does not prescribe medication or treatment.
                  </p>
                </div>

                <div className="flex items-start gap-3 rounded-2xl bg-[#fafbfc] p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#d6537a]" />
                  <p className="text-sm leading-6 text-[#596b86]">
                    Maternova does not replace your healthcare professional.
                  </p>
                </div>

                <div className="flex items-start gap-3 rounded-2xl bg-[#fafbfc] p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#d6537a]" />
                  <p className="text-sm leading-6 text-[#596b86]">
                    Maternova should never be used for emergency decisions.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* PRIVACY */}
        {/* ========================================================= */}

        <section className="mb-8 overflow-hidden rounded-[26px] bg-gradient-to-br from-[#172b4d] to-[#29476f] p-7 text-white shadow-[0_12px_30px_rgba(23,43,77,0.12)] lg:p-8">

          <div className="flex flex-col gap-6 md:flex-row md:items-center">

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10">
              <Lock className="h-6 w-6 text-[#f3a0b7]" />
            </div>

            <div className="flex-1">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#f3a0b7]">
                Privacy
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                Your information deserves care
              </h2>

              <p className="mt-2 max-w-3xl text-sm leading-6 text-[#c3cede]">
                Only upload healthcare information that you are comfortable
                processing through Maternova. Avoid sharing unnecessary
                personal information whenever possible.
              </p>
            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* CARE TEAM */}
        {/* ========================================================= */}

        <section
          id="care-team"
          className="mb-8 rounded-[26px] border border-[#e7e1e5] bg-white p-7 shadow-[0_6px_20px_rgba(23,43,77,0.04)]"
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#eef3fa] text-[#29476f]">
              <Stethoscope className="h-6 w-6" />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8290a7]">
                Your care team
              </p>

              <h2 className="mt-1 text-xl font-bold text-[#172b4d]">
                Keep your healthcare professional in the loop
              </h2>

              <p className="mt-1 text-sm leading-6 text-[#71809a]">
                If something concerns you, share it with your doctor, midwife,
                or maternity care team rather than relying only on Maternova.
              </p>
            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* FAQ */}
        {/* ========================================================= */}

        <section className="mb-10">

          <div className="mb-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#d6537a]">
              Frequently asked
            </p>

            <h2 className="mt-2 text-2xl font-bold text-[#172b4d]">
              Questions about Maternova
            </h2>
          </div>

          <div className="overflow-hidden rounded-[26px] border border-[#e7e1e5] bg-white shadow-[0_6px_20px_rgba(23,43,77,0.04)]">

            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div
                  key={faq.question}
                  className={`border-b border-[#edf0f4] last:border-b-0 ${
                    isOpen ? "bg-[#fffafc]" : ""
                  }`}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenFaq(isOpen ? null : index)
                    }
                    className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left transition-colors hover:bg-[#fff8fa]"
                  >
                    <span className="text-sm font-bold text-[#172b4d] sm:text-base">
                      {faq.question}
                    </span>

                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all ${
                        isOpen
                          ? "bg-[#f9dce5] text-[#d6537a]"
                          : "bg-[#f3f5f8] text-[#647690]"
                      }`}
                    >
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6">
                      <p className="max-w-4xl text-sm leading-7 text-[#71809a]">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}

          </div>
        </section>

        {/* ========================================================= */}
        {/* FINAL MESSAGE */}
        {/* ========================================================= */}

        <section className="rounded-[28px] border border-[#f0d4dd] bg-gradient-to-r from-[#fff5f8] to-[#fffafd] p-7 text-center sm:p-9">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#f9dce5] text-[#d6537a]">
            <Heart className="h-5 w-5 fill-current" />
          </div>

          <h2 className="mt-4 text-2xl font-bold text-[#172b4d]">
            Maternova is here to support you.
          </h2>

          <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-[#71809a]">
            Your healthcare professional remains the most important part of
            your care. Maternova simply helps make their guidance easier to
            understand, remember, and follow in everyday life.
          </p>

        </section>

      </div>
    </main>
  );
}