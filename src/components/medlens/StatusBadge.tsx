import type { ResultStatus } from "@/lib/medlens-types";

export function StatusBadge({ status }: { status: ResultStatus }) {
  if (status === "Not determined") {
    return <span className="text-xs text-ink/40">Not determined</span>;
  }

  const tone =
    status === "High"
      ? "bg-hi/12 text-hi"
      : status === "Low"
        ? "bg-lo/12 text-lo"
        : "bg-neu/15 text-neu-deep";
  const dot = status === "High" ? "bg-hi" : status === "Low" ? "bg-lo" : "bg-neu";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${tone}`}
    >
      <span className={`size-1.5 rounded-full ${dot}`} />
      {status}
    </span>
  );
}
