import { createServerFn } from "@tanstack/react-start";
import { generateText, Output } from "ai";
import { z } from "zod";
import { createLovableAiGatewayProvider } from "./ai-gateway.server";

const InputSchema = z.object({
  fileName: z.string().min(1),
  mediaType: z.string().min(1),
  dataBase64: z.string().min(1),
  patient: z.object({
    name: z.string(),
    age: z.string(),
    sex: z.string(),
    symptoms: z.string(),
    conditions: z.string(),
    allergies: z.string(),
    medications: z.string(),
  }),
});

const OutputSchema = z.object({
  reportTitle: z
    .string()
    .describe("Short title of the report, including its date if printed on it."),
  tests: z.array(
    z.object({
      testName: z.string(),
      result: z.string(),
      unit: z.string(),
      referenceRange: z.string(),
      status: z.enum(["Low", "Normal", "High", "Not determined"]),
      source: z.string(),
    }),
  ),
  summary: z.string(),
});

const SYSTEM_PROMPT = `You are MedLens, a medical document data-extraction assistant.

Your ONLY job is to read the uploaded report and transcribe what it literally says.

HARD RULES — never break these:
1. Never diagnose. Never name or suggest a condition the report does not state.
2. Never recommend treatment, medication, dosage, tests, or lifestyle changes.
3. NEVER invent, recall, or infer a reference range. Only copy a reference range that is literally printed in the report.
4. If a test has no printed reference range, set referenceRange to "Not determined" AND status to "Not determined".
5. Only set status to Low / Normal / High when a printed reference range exists and the printed result can be compared to it.
6. If a value is unreadable, use "—" rather than guessing.
7. "source" must say where in the document the row came from, e.g. "Lab report p.2" or the panel/section name printed on the report.
8. The summary must be plain, patient-friendly language: state which values sit inside or outside the printed ranges and which have no printed range. No diagnosis, no advice, no reassurance about what results "mean" clinically. Maximum 4 sentences.

Patient context is provided for readability only. Do not use it to infer results or ranges.`;

export const extractReport = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) throw new Error("AI is not configured for this project.");

    const gateway = createLovableAiGatewayProvider(apiKey);
    const p = data.patient;

    try {
      const result = await generateText({
        model: gateway("google/gemini-3.7-flash"),
        system: SYSTEM_PROMPT,
        output: Output.object({ schema: OutputSchema }),
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `Extract every medical test result from this report (file: ${data.fileName}).

Patient context (do not use for inference):
Name: ${p.name || "—"}
Age: ${p.age || "—"}
Sex: ${p.sex || "—"}
Symptoms: ${p.symptoms || "—"}
Existing conditions: ${p.conditions || "—"}
Allergies: ${p.allergies || "—"}
Medications: ${p.medications || "—"}`,
              },
              {
                type: "file",
                data: data.dataBase64,
                mediaType: data.mediaType,
                filename: data.fileName,
              },
            ],
          },
        ],
      });

      const output = await result.output;
      return output;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Extraction failed.";
      throw new Error(message);
    }
  });
