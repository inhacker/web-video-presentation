import type { Narration } from "../../registry/types";

/**
 * Chapter 2 · why-private — script.md beats 5–12.
 * Length === steps rendered in WhyPrivate.tsx.
 */
export const narrations: Narration[] = [
  // step 0 — balance tips toward the specialist
  "In healthcare, they argue, a specialized model beats a general one.",
  // step 1 — two stacks of evidence
  "They point to academic papers and industry benchmarks that keep showing this.",
  // step 2 — the pair, dealt like cards
  "So they built a pair. Medical LLM Medium, and Medical LLM Small.",
  // step 3 — text + image in, identity locked
  "Both read text and images, and both ship with a fixed John Snow Labs identity.",
  // step 4 — someone else's cloud vs. your own walls
  "The real pitch is where they run. GPT, Claude and Gemini live in someone else's cloud. These can sit on-premise, or in your private cloud.",
  // step 5 — privacy and accuracy, no trade-off
  "That keeps things HIPAA-friendly. And they say you don't give up frontier-level medical accuracy to get it.",
  // step 6 — clinical reasoning + diagnostics
  "The target work is clinical reasoning and diagnostics.",
  // step 7 — research reading + genetic analysis
  "Plus reading medical research, and even genetic analysis.",
];
