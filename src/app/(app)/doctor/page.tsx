"use client";

import { useRef, useState } from "react";
import {
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  ClipboardCheck,
  HeartPulse,
} from "lucide-react";

type Analysis = {
  documentType?: string;
  patientName?: string;
  gestationalAge?: string;
  testName?: string;
  result?: string;
  unit?: string;
  referenceValue?: string;
  labFlag?: string;
  simpleExplanation?: string;
  importantPoints?: string[];
  healthcareFollowUp?: string;
};

export default function DoctorPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setSelectedFile(file);
    setAnalysis(null);
    setError("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || "Unable to analyze the document."
        );
      }

      setAnalysis(data.analysis);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while analyzing the document."
      );
    } finally {
      setLoading(false);
    }
  }

  function openFilePicker() {
    fileInputRef.current?.click();
  }

  function resetUpload() {
    setSelectedFile(null);
    setAnalysis(null);
    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f8fc] px-6 py-8 text-[#172b4d] md:px-10 lg:px-12">
      <div className="mx-auto max-w-[1180px]">

        {/* HEADER */}
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#c95d7d]">
              <span className="h-2 w-2 rounded-full bg-[#d97896]" />
              Healthcare guidance
            </div>

            <h1 className="font-serif text-4xl font-medium tracking-[-0.03em] text-[#172b4d] md:text-5xl">
              Doctor&apos;s instructions
            </h1>

            <p className="mt-3 max-w-2xl text-[15px] leading-7 text-[#66758f]">
              Upload a medical report or healthcare instruction and let
              Maternova turn complex information into something easier
              to understand.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-[#e5e8ef] bg-white px-4 py-2.5 shadow-sm">
            <ShieldCheck className="h-4 w-4 text-[#c95d7d]" />

            <span className="text-sm font-medium text-[#4d5d77]">
              Your information stays private
            </span>
          </div>
        </div>

        {/* FILE INPUT */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* EMPTY / UPLOAD STATE */}
        {!analysis && (
          <section className="overflow-hidden rounded-[28px] border border-[#e2e6ee] bg-white shadow-[0_12px_40px_rgba(23,43,77,0.06)]">

            {/* NAVY HERO */}
            <div className="bg-gradient-to-br from-[#172b4d] via-[#1e3a63] to-[#293e6b] px-7 py-10 text-white md:px-12 md:py-14">
              <div className="max-w-3xl">

                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15">
                  <FileText className="h-7 w-7 text-[#e486a0]" />
                </div>

                <h2 className="font-serif text-3xl font-medium md:text-4xl">
                  Make your report easier to understand.
                </h2>

                <p className="mt-4 max-w-2xl text-[15px] leading-7 text-[#d8e0ee]">
                  Maternova reads the information visible in your
                  uploaded document and organizes it into a simple,
                  easy-to-follow summary.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-medium text-[#eef2f8]">
                    PDF
                  </span>

                  <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-medium text-[#eef2f8]">
                    JPG
                  </span>

                  <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-medium text-[#eef2f8]">
                    JPEG
                  </span>

                  <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-medium text-[#eef2f8]">
                    PNG
                  </span>
                </div>
              </div>
            </div>

            {/* UPLOAD AREA */}
            <div className="p-7 md:p-10">

              {!loading ? (
                <button
                  type="button"
                  onClick={openFilePicker}
                  className="group flex w-full flex-col items-center justify-center rounded-[22px] border-2 border-dashed border-[#d9dee8] bg-[#fbfcfe] px-6 py-12 text-center transition hover:border-[#d97896] hover:bg-[#fff9fb]"
                >
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#fbeaf0] text-[#c95d7d] transition group-hover:scale-105">
                    <Upload className="h-7 w-7" />
                  </div>

                  <h3 className="text-xl font-semibold text-[#172b4d]">
                    Upload your report
                  </h3>

                  <p className="mt-2 max-w-lg text-sm leading-6 text-[#718099]">
                    Select a medical report, prescription, lab result,
                    or healthcare instruction you want Maternova to
                    explain.
                  </p>

                  <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#172b4d] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#172b4d]/15 transition group-hover:bg-[#243e66]">
                    <Upload className="h-4 w-4" />
                    Choose document
                  </span>

                  <span className="mt-4 text-xs text-[#8a96aa]">
                    Supported: PDF, JPG, JPEG and PNG
                  </span>
                </button>
              ) : (
                <div className="rounded-[22px] border border-[#e4e8ef] bg-[#fbfcfe] p-8">

                  <div className="flex items-center gap-4">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#fbeaf0] text-[#c95d7d]">
                      <Sparkles className="h-5 w-5 animate-pulse" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-[#172b4d]">
                        Analyzing your document
                      </p>

                      <p className="mt-1 truncate text-sm text-[#718099]">
                        {selectedFile?.name}
                      </p>
                    </div>

                    <div className="h-5 w-5 shrink-0 animate-spin rounded-full border-2 border-[#d97896] border-t-transparent" />
                  </div>

                  <div className="mt-7 h-2 overflow-hidden rounded-full bg-[#e9edf3]">
                    <div className="h-full w-2/3 animate-pulse rounded-full bg-[#d97896]" />
                  </div>

                  <p className="mt-3 text-center text-xs text-[#8994a8]">
                    Extracting visible information and preparing a
                    simple explanation...
                  </p>
                </div>
              )}

              {/* ERROR */}
              {error && (
                <div className="mt-5 flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">

                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />

                  <div>
                    <p className="font-semibold">
                      Unable to analyze document
                    </p>

                    <p className="mt-1">
                      {error}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ANALYSIS RESULT */}
        {analysis && (
          <div className="space-y-6">

            {/* RESULT HERO */}
            <section className="overflow-hidden rounded-[28px] bg-gradient-to-br from-[#172b4d] via-[#1e3a63] to-[#293e6b] p-7 text-white shadow-[0_16px_50px_rgba(23,43,77,0.15)] md:p-10">

              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                <div>
                  <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#f09ab1]">
                    <CheckCircle2 className="h-4 w-4" />
                    Document analyzed
                  </div>

                  <h2 className="font-serif text-3xl font-medium md:text-4xl">
                    Your report, simplified.
                  </h2>

                  <p className="mt-3 max-w-2xl text-sm leading-6 text-[#d5deec]">
                    Maternova has organized the information visible in
                    your document. This is an explanation of the report,
                    not a diagnosis.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={resetUpload}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
                >
                  Analyze another report
                  <ArrowRight className="h-4 w-4" />
                </button>

              </div>
            </section>

            {/* REPORT DETAILS */}
            <section className="rounded-[24px] border border-[#e3e7ee] bg-white p-6 shadow-sm md:p-8">

              <div className="mb-6 flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf2fa] text-[#29476f]">
                  <ClipboardCheck className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="font-semibold text-[#172b4d]">
                    Report details
                  </h3>

                  <p className="text-xs text-[#8390a5]">
                    Information extracted from your document
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                <InfoCard
                  label="Document type"
                  value={analysis.documentType}
                />

                <InfoCard
                  label="Patient name"
                  value={analysis.patientName}
                />

                <InfoCard
                  label="Gestational age"
                  value={analysis.gestationalAge}
                />

                <InfoCard
                  label="Test"
                  value={analysis.testName}
                />

                <InfoCard
                  label="Result"
                  value={
                    analysis.result
                      ? `${analysis.result}${
                          analysis.unit
                            ? ` ${analysis.unit}`
                            : ""
                        }`
                      : undefined
                  }
                  highlight
                />

                <InfoCard
                  label="Reference value"
                  value={
                    analysis.referenceValue
                      ? `${analysis.referenceValue}${
                          analysis.unit
                            ? ` ${analysis.unit}`
                            : ""
                        }`
                      : undefined
                  }
                />

              </div>

              {/* LAB FLAG */}
              {analysis.labFlag && (
                <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[#f1d6df] bg-[#fff7f9] p-4">

                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#c95d7d]" />

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#a84e69]">
                      Report flag
                    </p>

                    <p className="mt-1 font-semibold text-[#172b4d]">
                      {analysis.labFlag}
                    </p>
                  </div>

                </div>
              )}

            </section>

            {/* EXPLANATION + KEY INFORMATION */}
            <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">

              {/* SIMPLE EXPLANATION */}
              <section className="rounded-[24px] border border-[#e3e7ee] bg-white p-6 shadow-sm md:p-8">

                <div className="mb-5 flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fbeaf0] text-[#c95d7d]">
                    <Sparkles className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#172b4d]">
                      In simple language
                    </h3>

                    <p className="text-xs text-[#8390a5]">
                      A plain-language explanation of the visible
                      report
                    </p>
                  </div>

                </div>

                <div className="rounded-2xl bg-[#f8f9fc] p-5 text-[15px] leading-7 text-[#52627c]">
                  {analysis.simpleExplanation ||
                    "No simple explanation was returned for this document."}
                </div>

              </section>

              {/* KEY INFORMATION */}
              <section className="rounded-[24px] border border-[#e3e7ee] bg-white p-6 shadow-sm md:p-8">

                <div className="mb-5 flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf2fa] text-[#29476f]">
                    <HeartPulse className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#172b4d]">
                      Key information
                    </h3>

                    <p className="text-xs text-[#8390a5]">
                      Points worth remembering
                    </p>
                  </div>

                </div>

                <div className="space-y-3">

                  {analysis.importantPoints &&
                  analysis.importantPoints.length > 0 ? (
                    analysis.importantPoints.map(
                      (point, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 rounded-xl bg-[#f8f9fc] p-3"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#c95d7d]" />

                          <p className="text-sm leading-6 text-[#52627c]">
                            {point}
                          </p>
                        </div>
                      )
                    )
                  ) : (
                    <p className="text-sm text-[#718099]">
                      No additional key points were returned.
                    </p>
                  )}

                </div>

              </section>
            </div>

            {/* HEALTHCARE FOLLOW-UP */}
            <section className="rounded-[24px] border border-[#dce4f0] bg-[#eef3fa] p-6 md:p-8">

              <div className="flex items-start gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#172b4d] text-white">
                  <HeartPulse className="h-5 w-5" />
                </div>

                <div>

                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#62718a]">
                    Healthcare follow-up
                  </p>

                  <p className="mt-2 text-[15px] leading-7 text-[#40516d]">
                    {analysis.healthcareFollowUp ||
                      "If you have questions about this result, discuss it with your healthcare professional."}
                  </p>

                </div>

              </div>

            </section>

            {/* SAFETY */}
            <section className="rounded-[20px] border border-[#eadfe3] bg-[#fffafb] p-5">

              <div className="flex items-start gap-3">

                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#c95d7d]" />

                <div>

                  <p className="text-sm font-semibold text-[#172b4d]">
                    Important
                  </p>

                  <p className="mt-1 text-xs leading-6 text-[#748198]">
                    Maternova explains and organizes information from
                    your uploaded document. It does not diagnose
                    conditions, prescribe treatment, or replace advice
                    from your healthcare professional. Always follow the
                    guidance given by your doctor or care team.
                  </p>

                </div>

              </div>

            </section>

          </div>
        )}

      </div>
    </main>
  );
}

/* INFO CARD */

function InfoCard({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-4 ${
        highlight
          ? "border-[#f0d4de] bg-[#fff8fa]"
          : "border-[#e6e9ef] bg-[#fafbfc]"
      }`}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8490a4]">
        {label}
      </p>

      <p
        className={`mt-2 min-h-6 text-sm font-semibold ${
          highlight
            ? "text-[#b94f6d]"
            : "text-[#263b5d]"
        }`}
      >
        {value || "Not available"}
      </p>
    </div>
  );
}