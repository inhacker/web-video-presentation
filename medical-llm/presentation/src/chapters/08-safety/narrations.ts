import type { Narration } from "../../registry/types";

/**
 * Chapter 8 · safety — script.md beats 51–58.
 * Length === steps rendered in Safety.tsx.
 */
export const narrations: Narration[] = [
  // step 0
  "Now step back and look at averages.",
  // step 1
  "On OpenMed, the three frontier models average 93.14. Medium gets 93.99.",
  // step 2
  "On MedHELM, the frontier averages 72.41. Medium gets 77.78. That gap is much wider.",
  // step 3
  "Then there's red-teaming. A thousand adversarial questions, across 148 medical categories.",
  // step 4
  "Medium passed about 940. That's 94 percent.",
  // step 5
  "The frontier trails. GPT 5.5 passed 850, Claude Opus 4.8 passed 830, and Gemini 3.5 Flash passed 790.",
  // step 6
  "Their read on it: a smaller model came out as the most robust in this test. Small's result isn't reported.",
  // step 7
  "On hallucination, both of their models beat every frontier model. The vendor calls that the metric that decides clinical safety.",
];
