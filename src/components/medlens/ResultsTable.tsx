import type { TestResult } from "@/lib/medlens-types";
import { StatusBadge } from "./StatusBadge";

export function ResultsTable({
  title,
  tests,
  loading,
}: {
  title: string;
  tests: TestResult[];
  loading: boolean;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-ink/10 bg-card/80 shadow-sm shadow-ink/5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/10 px-6 py-5">
        <div>
          <h2 className="font-display text-xl font-semibold">Extracted Results</h2>
          <p className="text-sm text-ink/50">{title}</p>
        </div>
        <span className="text-[11px] font-medium text-ink/45">
          Status shown only when a reference range is provided
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ink/10 text-left text-[11px] uppercase tracking-[0.12em] text-ink/40">
              <th className="px-6 py-3 font-semibold">Test</th>
              <th className="px-4 py-3 font-semibold">Result</th>
              <th className="px-4 py-3 font-semibold">Unit</th>
              <th className="px-4 py-3 font-semibold">Reference</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-6 py-3 font-semibold">Source</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/5 tabular-nums">
            {loading &&
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  <td colSpan={6} className="px-6 py-4">
                    <div className="h-4 w-full animate-pulse rounded bg-sand/70" />
                  </td>
                </tr>
              ))}

            {!loading && tests.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-sm text-ink/45">
                  No results yet. Upload a report to extract test values.
                </td>
              </tr>
            )}

            {!loading &&
              tests.map((t, i) => (
                <tr key={`${t.testName}-${i}`} className="transition hover:bg-brand/5">
                  <td className="px-6 py-4 font-medium">{t.testName}</td>
                  <td className="px-4 py-4 font-semibold">{t.result}</td>
                  <td className="px-4 py-4 text-ink/55">{t.unit || "—"}</td>
                  <td
                    className={
                      t.referenceRange === "Not determined"
                        ? "px-4 py-4 italic text-ink/40"
                        : "px-4 py-4 text-ink/55"
                    }
                  >
                    {t.referenceRange || "Not determined"}
                  </td>
                  <td className="px-4 py-4">
                    <StatusBadge status={t.status} />
                  </td>
                  <td className="px-6 py-4 text-ink/45">{t.source || "—"}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="border-t border-ink/10 bg-sand/40 px-6 py-4">
        <p className="text-[11px] leading-relaxed text-ink/50">
          MedLens does not diagnose, recommend treatment, or invent reference ranges. Ranges are shown
          only when present in the source report. AI-generated content is clearly labeled.
        </p>
      </div>
    </section>
  );
}
