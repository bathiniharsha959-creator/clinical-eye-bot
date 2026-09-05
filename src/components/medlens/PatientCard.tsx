import type { PatientInfo } from "@/lib/medlens-types";
import patientPhoto from "@/assets/patient.jpg";

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-ink/45 shrink-0">{label}</dt>
      <dd className="text-right font-medium">{value || "—"}</dd>
    </div>
  );
}

export function PatientCard({ patient, onEdit }: { patient: PatientInfo; onEdit: () => void }) {
  return (
    <section className="rounded-2xl border border-ink/10 bg-card/70 p-6 shadow-sm shadow-ink/5">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-display text-xl font-semibold">Patient</h2>
        <button
          onClick={onEdit}
          className="text-[10px] uppercase tracking-[0.15em] text-ink/40 transition-colors hover:text-brand-deep"
        >
          Edit
        </button>
      </div>
      <div className="flex items-center gap-4">
        <img
          src={patientPhoto}
          alt=""
          loading="lazy"
          width={512}
          height={512}
          className="size-14 rounded-xl object-cover outline outline-1 -outline-offset-1 outline-ink/10"
        />
        <div>
          <p className="font-semibold">{patient.name || "Unnamed patient"}</p>
          <p className="text-sm text-ink/50">
            {[patient.sex, patient.age && `${patient.age} years`].filter(Boolean).join(" · ") || "—"}
          </p>
        </div>
      </div>
      <dl className="mt-5 space-y-3 text-sm">
        <Row label="Symptoms" value={patient.symptoms} />
        <Row label="Conditions" value={patient.conditions} />
        <Row label="Allergies" value={patient.allergies} />
        <Row label="Medications" value={patient.medications} />
      </dl>
    </section>
  );
}
