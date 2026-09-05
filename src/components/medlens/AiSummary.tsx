export function AiSummary({ summary, loading }: { summary: string; loading: boolean }) {
  return (
    <section className="rounded-2xl border border-brand/25 bg-gradient-to-br from-brand/12 to-card p-6 shadow-sm shadow-brand/10">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-xl font-semibold">AI Summary</h2>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-deep">
          <span className="size-1.5 rounded-full bg-brand" />
          AI-generated
        </span>
      </div>

      {loading ? (
        <div className="space-y-2">
          <div className="h-3 w-full animate-pulse rounded bg-sand/80" />
          <div className="h-3 w-11/12 animate-pulse rounded bg-sand/80" />
          <div className="h-3 w-8/12 animate-pulse rounded bg-sand/80" />
        </div>
      ) : (
        <p className="text-sm leading-relaxed text-ink/75">
          {summary || "Upload a report to generate a patient-friendly summary."}
        </p>
      )}

      <div className="mt-4 rounded-xl bg-ink/85 p-3.5">
        <p className="text-[11px] leading-relaxed text-cream/80">
          This summary is AI-generated and for informational purposes only. It does not constitute a
          diagnosis, treatment, or medical advice. Reference ranges appear only where supplied by the
          source report.
        </p>
      </div>
    </section>
  );
}
