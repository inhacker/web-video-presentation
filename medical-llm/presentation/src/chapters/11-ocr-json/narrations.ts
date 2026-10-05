import type { Narration } from "../../registry/types";

/**
 * Chapter 11 · ocr-json — script.md beats 77–80.
 * Length === steps rendered in OcrJson.tsx.
 */
export const narrations: Narration[] = [
  // step 0
  "And for JSON, they used 100 documents from the OmniOCR benchmark.",
  // step 1
  "Vision OCR Structured LLM gets 0.708 field accuracy. That's ahead of GPT at 0.623, and Claude at 0.643.",
  // step 2
  "Gemini wins this one too, at 0.813.",
  // step 3
  "The OCR tests ran on their own harness. Same prompt for every model, and zero failed documents.",
];
