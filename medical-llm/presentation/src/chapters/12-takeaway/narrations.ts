import type { Narration } from "../../registry/types";

/**
 * Chapter 12 · takeaway — script.md beats 81–85.
 * Length === steps rendered in Takeaway.tsx.
 */
export const narrations: Narration[] = [
  // step 0
  "So, on medical text, Medium beats the frontier on both benchmarks. The wide lead is on MedHELM, the clinical-work one.",
  // step 1
  "On OCR, it's mixed. Tables are a clear win. On grounding and JSON, Gemini is still ahead.",
  // step 2
  "Where they run hasn't changed. Inside your own walls, and for most of them, on a single GPU.",
  // step 3
  "Keep in mind these are the vendor's own numbers. If you're choosing for a hospital, run the same tests on your own data.",
  // step 4
  "The docs link is in the description. Grab the Colab notebook and try the small models yourself.",
];
