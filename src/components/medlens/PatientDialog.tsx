import { useEffect, useState } from "react";
import type { PatientInfo } from "@/lib/medlens-types";

const FIELDS: { key: keyof PatientInfo; label: string; wide?: boolean }[] = [
  { key: "name", label: "Name", wide: true },
  { key: "age", label: "Age" },
  { key: "sex", label: "Sex" },
  { key: "symptoms", label: "Symptoms", wide: true },
  { key: "conditions", label: "Existing conditions", wide: true },
  { key: "allergies", label: "Allergies", wide: true },
  { key: "medications", label: "Medications", wide: true },
];

export function PatientDialog({
  open,
  patient,
  onClose,
  onSave,
}: {
  open: boolean;
  patient: PatientInfo;
  onClose: () => void;
  onSave: (p: PatientInfo) => void;
}) {
  const [draft, setDraft] = useState(patient);

  useEffect(() => {
    if (open) setDraft(patient);
  }, [open, patient]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-2xl border border-ink/10 bg-card p-6 shadow-2xl shadow-ink/20">
        <h2 className="font-display text-xl font-semibold">Patient information</h2>
        <p className="mt-1 text-sm text-ink/50">Used for context only — never for interpreting results.</p>
        <form
          className="mt-5 grid grid-cols-2 gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            onSave(draft);
          }}
        >
          {FIELDS.map((f) => (
            <label key={f.key} className={f.wide ? "col-span-2" : "col-span-1"}>
              <span className="text-[10px] uppercase tracking-[0.15em] text-ink/45">{f.label}</span>
              <input
                value={draft[f.key]}
                onChange={(e) => setDraft({ ...draft, [f.key]: e.target.value })}
                className="mt-1 w-full rounded-xl border border-ink/10 bg-background px-3 py-2 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/25"
              />
            </label>
          ))}
          <div className="col-span-2 mt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-ink/12 px-4 py-2.5 text-sm font-semibold text-ink/70 transition hover:bg-sand/60"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-ink px-5 py-2.5 text-sm font-semibold text-cream shadow-lg shadow-ink/20 transition hover:bg-brand-deep"
            >
              Save patient
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
