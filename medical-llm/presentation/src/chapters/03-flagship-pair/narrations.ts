import type { Narration } from "../../registry/types";

/**
 * Chapter 3 · flagship-pair — script.md beats 13–19.
 * Length === steps rendered in FlagshipPair.tsx.
 */
export const narrations: Narration[] = [
  // step 0
  "Start with hardware. Medium is the flagship. It wants about 67 gigabytes of GPU memory.",
  // step 1
  "Small needs about 25. That fits on one commodity GPU.",
  // step 2
  "Both take a 262K-token context. That's hundreds of pages of patient history in a single prompt.",
  // step 3
  "Those memory numbers assume half-precision weights. They also reserve room for the cache at full context. 16 gigs for Medium, 8 for Small.",
  // step 4
  "Medium splits across 2, 4, or 8 GPUs. Small can also run on just one.",
  // step 5
  "You can deploy on-premise, or on AWS, Azure, Databricks, and Snowflake.",
  // step 6
  "Their own summary goes like this. Small beats much bigger general models on MedHELM. Medium is their best, number one in the comparison.",
];
