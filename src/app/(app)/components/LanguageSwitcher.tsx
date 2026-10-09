"use client";

import { useMemo, useState } from "react";

import { supportedLanguages, useLanguage } from "@/lib/i18n";

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const filteredLanguages = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return supportedLanguages;

    return supportedLanguages.filter(
      (item) =>
        item.label.toLowerCase().includes(value) ||
        item.code.toLowerCase().includes(value)
    );
  }, [query]);

  const current = supportedLanguages.find((item) => item.code === language) ?? supportedLanguages[0];

  function handleSelect(code: (typeof supportedLanguages)[number]["code"]) {
    setLanguage(code);
    setQuery("");
    setOpen(false);
  }

  return (
    <div className="rounded-xl border border-[#ecedf4] bg-[#f8f9fc] p-2">
      <label className="mb-1 block text-[10px] font-bold uppercase tracking-[0.16em] text-[#8a96aa]">
        {t("languageLabel")}
      </label>

      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((previous) => !previous)}
          className="flex w-full items-center justify-between rounded-lg border border-[#e3e7ee] bg-white px-3 py-2.5 text-left text-sm text-[#172b4d] outline-none transition focus:border-[#d97896] focus:ring-2 focus:ring-[#f6d8e2]"
        >
          <span>{current.label}</span>
          <span className="text-[#64748b]">▾</span>
        </button>

        {open && (
          <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-[#e3e7ee] bg-white shadow-xl">
            <div className="border-b border-[#eef2f7] p-2">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t("searchLanguages")}
                className="w-full rounded-lg border border-[#e3e7ee] bg-[#f9fafc] px-3 py-2 text-sm text-[#172b4d] outline-none focus:border-[#d97896] focus:ring-2 focus:ring-[#f6d8e2]"
              />
            </div>

            <div className="max-h-60 overflow-y-auto">
              {filteredLanguages.length > 0 ? (
                filteredLanguages.map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => handleSelect(item.code)}
                    className={`flex w-full items-center justify-between px-3 py-2.5 text-left text-sm transition ${
                      item.code === language ? "bg-[#fff1f5] text-[#b63d65]" : "text-[#172b4d] hover:bg-[#f8f9fc]"
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.code === language && <span>✓</span>}
                  </button>
                ))
              ) : (
                <div className="px-3 py-3 text-sm text-[#64748b]">{t("noLanguageFound")}</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
