import type { Narration } from "../../registry/types";

/**
 * Chapter 5 · openmed — script.md beats 30–39.
 * Length === steps rendered in Openmed.tsx.
 */
export const narrations: Narration[] = [
  // step 0
  "Now the benchmarks, starting with OpenMed.",
  // step 1
  "It's eight multiple-choice test sets. MedQA, PubMedQA, and six medical subjects from MMLU.",
  // step 2
  "Medical LLM Medium averages 93.99.",
  // step 3
  "GPT 5.5 is at 93.28, Claude Opus 4.8 at 93.21, and Gemini 3.5 Flash at 92.94.",
  // step 4
  "So Medium is on top. By about seven tenths of a point.",
  // step 5
  "Look closer, and Medium trails on four of the eight subjects. On College Biology, the frontier models hit 99.3. Medium gets 94.3.",
  // step 6
  "On Medical Genetics, the frontier models score a perfect 100. Medium gets 99.",
  // step 7
  "Where Medium really pulls ahead is PubMedQA. It scores 82, while the frontier sits between 74 and 76.5.",
  // step 8
  "On MedQA the lead is smaller, 96.2 against 95.",
  // step 9
  "And Small? It averages 90.63. For a model that fits on one GPU, that's close.",
];
