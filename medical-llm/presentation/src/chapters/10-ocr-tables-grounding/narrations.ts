import type { Narration } from "../../registry/types";

/**
 * Chapter 10 · ocr-tables-grounding — script.md beats 67–76.
 * Length === steps rendered in OcrTablesGrounding.tsx.
 */
export const narrations: Narration[] = [
  // step 0
  "Take tables. They pulled 50 from PubTabNet, balanced from simple to very dense.",
  // step 1
  "The metric is TEDS-S. It checks whether the table's structure came out right.",
  // step 2
  "Vision OCR LLM scores 0.784. The best frontier model, GPT 5.5, gets 0.704. That's eight points clear.",
  // step 3
  "For grounding, they used all 50 test forms from FUNSD.",
  // step 4
  "Each predicted box has to match a real region, with an overlap score of at least 0.78.",
  // step 5
  "Then they check how accurately the text inside that box was read.",
  // step 6
  "Vision OCR LLM gets 0.938. That's ahead of Claude at 0.921, and GPT at 0.848.",
  // step 7
  "But Gemini scores higher, at 0.968.",
  // step 8
  "Their explanation: this metric only rewards tightly matched regions. So a high score might cover just part of the page.",
  // step 9
  "They say theirs covers the full page. But they don't publish coverage numbers.",
];
