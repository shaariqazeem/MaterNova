"use client";

import { FileText, Download, ShieldCheck, Stethoscope } from "lucide-react";

const records = [
  { label: "Blood reports", date: "Sep 18, 2026", status: "Uploaded" },
  { label: "Ultrasound summary", date: "Aug 22, 2026", status: "Reviewed" },
  { label: "Doctor notes", date: "Jul 11, 2026", status: "Saved" },
];

export default function HealthRecordsPage() {
  return (
    <main className="min-h-screen bg-[#f8f9fc] p-6 text-[#172b4d] lg:p-10">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#edf7f3] text-[#2a6f5b]">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7d8aa2]">Overview</p>
            <h1 className="text-4xl font-bold tracking-tight">Health records</h1>
          </div>
        </div>

        <section className="mb-8 rounded-[28px] border border-[#e5ecf5] bg-white p-8 shadow-[0_16px_36px_rgba(23,43,77,0.06)]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#edf7f3] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#2a6f5b]">
                <ShieldCheck className="h-3.5 w-3.5" />
                Secure summary
              </div>
              <h2 className="max-w-2xl font-serif text-3xl leading-tight text-[#172b4d]">Your records are kept in one place for quick review.</h2>
            </div>

            <button className="inline-flex items-center justify-center gap-2 rounded-full bg-[#172b4d] px-5 py-3 text-sm font-semibold text-white">
              <Download className="h-4 w-4" />
              Download folder
            </button>
          </div>
        </section>

        <div className="grid gap-5 md:grid-cols-3">
          {records.map((record) => (
            <div key={record.label} className="rounded-[24px] border border-[#e9edf4] bg-white p-6 shadow-[0_8px_20px_rgba(23,43,77,0.04)]">
              <div className="mb-4 flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eef3fa] text-[#29476f]">
                  <Stethoscope className="h-5 w-5" />
                </span>
                <span className="rounded-full bg-[#f5f7fb] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#5b6d86]">
                  {record.status}
                </span>
              </div>

              <h3 className="text-xl font-bold text-[#172b4d]">{record.label}</h3>
              <p className="mt-3 text-sm text-[#627592]">{record.date}</p>
              <button className="mt-5 text-sm font-semibold text-[#d6537a] hover:text-[#b83f67]">
                View details →
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
