import type { ExtractionResult, PatientInfo } from "./medlens-types";

export const demoPatient: PatientInfo = {
  name: "Eleanor Whitfield",
  age: "67",
  sex: "Female",
  symptoms: "Fatigue, morning joint stiffness",
  conditions: "Type 2 diabetes, hypertension",
  allergies: "Penicillin",
  medications: "Metformin 500mg, Lisinopril 10mg",
};

export const demoExtraction: ExtractionResult = {
  reportTitle: "Metabolic & Hematology Panel · 14 Mar 2025",
  tests: [
    {
      testName: "HbA1c",
      result: "7.2",
      unit: "%",
      referenceRange: "4.0 – 5.6",
      status: "High",
      source: "Lab report p.1",
    },
    {
      testName: "eGFR",
      result: "58",
      unit: "mL/min",
      referenceRange: "60 – 120",
      status: "Low",
      source: "Lab report p.1",
    },
    {
      testName: "WBC",
      result: "6.4",
      unit: "×10⁹/L",
      referenceRange: "4.0 – 11.0",
      status: "Normal",
      source: "Lab report p.2",
    },
    {
      testName: "Hemoglobin",
      result: "12.1",
      unit: "g/dL",
      referenceRange: "12.0 – 16.0",
      status: "Normal",
      source: "Lab report p.2",
    },
    {
      testName: "Sodium",
      result: "139",
      unit: "mmol/L",
      referenceRange: "135 – 145",
      status: "Normal",
      source: "Lab report p.3",
    },
    {
      testName: "Ferritin",
      result: "84",
      unit: "ng/mL",
      referenceRange: "Not determined",
      status: "Not determined",
      source: "Lab report p.3",
    },
  ],
  summary:
    "This report lists a metabolic and blood-count panel. HbA1c is above the range printed on the report, and eGFR is below it. White blood cells, hemoglobin and sodium fall inside their printed ranges. Ferritin was measured but the report does not print a reference range, so no status is shown for it.",
};
