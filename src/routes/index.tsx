import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import clinicianPhoto from "@/assets/clinician.jpg";
import { AiSummary } from "@/components/medlens/AiSummary";
import { PatientCard } from "@/components/medlens/PatientCard";
import { PatientDialog } from "@/components/medlens/PatientDialog";
import { ResultsTable } from "@/components/medlens/ResultsTable";
import { demoExtraction, demoPatient } from "@/lib/demo-data";
import { extractReport } from "@/lib/medlens.functions";
import type { ExtractionResult, PatientInfo } from "@/lib/medlens-types";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MedLens — AI Clinical Insight Dashboard" },
      {
        name: "description",
        content:
          "MedLens extracts lab values from medical reports into a structured table with a plain-language, AI-generated summary. No diagnosis, no invented reference ranges.",
      },
      { property: "og:title", content: "MedLens — AI Clinical Insight" },
      {
        property: "og:description",
        content:
          "Turn a medical report into a clean, structured results table with a patient-friendly AI summary.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

function fileToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const res = String(reader.result);
      resolve(res.slice(res.indexOf(",") + 1));
    };
    reader.onerror = () => reject(new Error("Could not read the file."));
    reader.readAsDataURL(file);
  });
}

function Dashboard() {
  const [patient, setPatient] = useState<PatientInfo>(demoPatient);
  const [extraction, setExtraction] = useState<ExtractionResult>(demoExtraction);
  const [isDemo, setIsDemo] = useState(true);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const runExtraction = useServerFn(extractReport);

  async function handleFile(file: File) {
    if (file.size > 15 * 1024 * 1024) {
      toast.error("That file is larger than 15 MB.");
      return;
    }
    setLoading(true);
    try {
      const dataBase64 = await fileToBase64(file);
      const result = await runExtraction({
        data: {
          fileName: file.name,
          mediaType: file.type || "application/pdf",
          dataBase64,
          patient,
        },
      });
      setExtraction(result as ExtractionResult);
      setIsDemo(false);
      toast.success("Report processed.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not read that report.");
    } finally {
      setLoading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="relative min-h-screen w-full bg-background font-sans text-ink">
      <div className="glow-golden pointer-events-none absolute inset-x-0 top-0 h-[520px]" />

      <header className="relative z-10 flex items-center justify-between px-8 py-5">
        <div className="flex items-center gap-3">
          <div className="grid size-9 place-items-center rounded-xl bg-brand font-display text-lg font-semibold text-primary-foreground shadow-md shadow-brand/30">
            M
          </div>
          <div>
            <p className="font-display text-lg font-semibold leading-none">MedLens</p>
            <p className="text-[11px] tracking-wide text-ink/45">AI Clinical Insight</p>
          </div>
        </div>
        <div className="hidden items-center gap-6 text-sm text-ink/60 md:flex">
          <span className="cursor-pointer hover:text-ink">Dashboard</span>
          <span className="cursor-pointer hover:text-ink">Reports</span>
          <span className="cursor-pointer hover:text-ink">Patients</span>
        </div>
        <div className="flex items-center gap-3">
          <img
            src={clinicianPhoto}
            alt=""
            loading="lazy"
            width={512}
            height={512}
            className="size-9 rounded-full object-cover outline outline-1 -outline-offset-1 outline-ink/10"
          />
          <span className="hidden text-sm font-medium sm:block">Dr. A. Rivera</span>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-8 pb-16">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand/25 bg-brand/12 px-3 py-1">
              <span className="size-1.5 rounded-full bg-brand" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-deep">
                {isDemo ? "Demo patient" : "Uploaded report"}
              </span>
            </div>
            <h1 className="font-display text-4xl font-semibold leading-tight">Lab Insight Session</h1>
            <p className="mt-1 max-w-md text-ink/55">
              Structured review of uploaded laboratory results, generated for clinician reference.
            </p>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf,image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void handleFile(file);
            }}
          />
          <button
            onClick={() => inputRef.current?.click()}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-3 text-sm font-semibold text-cream shadow-lg shadow-ink/20 transition hover:bg-brand-deep disabled:opacity-60"
          >
            <span className="grid size-4 place-items-center text-base leading-none">↑</span>
            {loading ? "Reading report…" : "Upload report"}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-4">
            <PatientCard patient={patient} onEdit={() => setEditing(true)} />
            <AiSummary summary={extraction.summary} loading={loading} />
          </div>

          <div className="lg:col-span-8">
            <ResultsTable
              title={extraction.reportTitle}
              tests={extraction.tests}
              loading={loading}
            />
          </div>
        </div>
      </main>

      <PatientDialog
        open={editing}
        patient={patient}
        onClose={() => setEditing(false)}
        onSave={(p) => {
          setPatient(p);
          setEditing(false);
        }}
      />
    </div>
  );
}
