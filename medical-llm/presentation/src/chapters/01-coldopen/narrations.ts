import type { Narration } from "../../registry/types";

/**
 * Chapter 1 · coldopen — script.md beats 1–4.
 * Length === steps rendered in Coldopen.tsx.
 */
export const narrations: Narration[] = [
  // step 0 — record blocked at the firewall
  "Your hospital probably can't send patient records to GPT 5.5. Not without a lot of paperwork.",
  // step 1 — the model inside scores higher
  "So what if the model you're allowed to run, on your own servers, scored higher on medical benchmarks?",
  // step 2 — John Snow Labs · Medium + Small
  "That's the claim John Snow Labs is making with two new medical LLMs. Let's check their numbers.",
  // step 3 — where they lose
  "We'll also look at where their own charts show them losing.",
];
