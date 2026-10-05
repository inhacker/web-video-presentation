import type { Narration } from "../../registry/types";

/**
 * Chapter 9 · vision-ocr — script.md beats 59–66.
 * Length === steps rendered in VisionOcr.tsx.
 */
export const narrations: Narration[] = [
  // step 0
  "The same page covers a second family. Vision OCR.",
  // step 1
  "Same idea here. For document pipelines, a task-specific OCR model should beat a general one.",
  // step 2
  "Two jobs matter most. Tie every word to an exact box on the page. And turn a page into clean, schema-valid JSON.",
  // step 3
  "Vision OCR LLM does the first job. It's the grounding specialist. About 6 gigs of GPU memory, with a 32K context.",
  // step 4
  "Vision OCR Structured LLM does the second. Document in, JSON out. About 32 gigs, with a 128K context.",
  // step 5
  "Those are worst-case numbers at max context. A typical OCR page is only around 8K tokens.",
  // step 6
  "At that size, Vision OCR LLM needs about 3 gigs, and the Structured one about 19. One GPU either way.",
  // step 7
  "And again, the point is privacy. Patient records, PII and PHI stay inside your own infrastructure.",
];
