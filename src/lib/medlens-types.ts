export type ResultStatus = "Low" | "Normal" | "High" | "Not determined";

export interface TestResult {
  testName: string;
  result: string;
  unit: string;
  referenceRange: string;
  status: ResultStatus;
  source: string;
}

export interface PatientInfo {
  name: string;
  age: string;
  sex: string;
  symptoms: string;
  conditions: string;
  allergies: string;
  medications: string;
}

export interface ExtractionResult {
  reportTitle: string;
  tests: TestResult[];
  summary: string;
}
