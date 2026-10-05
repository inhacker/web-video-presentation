import type { Narration } from "../../registry/types";

/**
 * Chapter 6 · medhelm — script.md beats 40–45.
 * Length === steps rendered in Medhelm.tsx.
 */
export const narrations: Narration[] = [
  // step 0
  "OpenMed is exam questions. MedHELM is closer to real clinical work.",
  // step 1
  "It has thirteen tasks. They cover documentation, medical coding, safety, patient dialogue, and reasoning.",
  // step 2
  "The headline score is mean win rate. Roughly, how often a model beats the others, task by task.",
  // step 3
  "Medium gets 77.78. That's the best of every model tested. GPT 5.5 is next, at 73.56.",
  // step 4
  "Medium takes the top score on 12 of the 13 tasks. Some of those wins are by a tenth of a point.",
  // step 5
  "Its biggest gap is clinical error detection. On Medec, Medium scores 85. The best frontier model gets 70. That's 15 points.",
];
