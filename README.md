# MedLens AI Insights (48)

Build a modern web app called MedLens — AI Clinical Insight for a hackathon.

The app should allow a user to:

Enter patient information.

Upload a medical report PDF/image.

Extract important medical test information using AI.

Display the extracted information in a clean structured table.

Show Low / Normal / High only when the uploaded report itself provides a reference range.

Generate a short patient-friendly summary.

Patient information:

Name

Age

Sex

Symptoms

Existing conditions

Allergies

Medications

Medical results table:

Test name

Result

Unit

Reference range

Status

Source

Add a clean dashboard with:

Patient information card

Upload report button

Medical results table

AI summary section

Important safety rules:

Never diagnose the patient.

Never recommend treatment or medication.

Never invent reference ranges.

If the report has no reference range, show "Not determined".

Clearly label AI-generated content.

Use React, TypeScript and Tailwind CSS.
Make the UI polished, modern and professional for a hackathon presentation.

Use fictional demo data so the application can be demonstrated even without uploading a real report.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/72bbb517-a2e4-4c7e-9383-444a0c2da249).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
