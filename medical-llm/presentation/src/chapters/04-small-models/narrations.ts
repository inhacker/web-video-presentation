import type { Narration } from "../../registry/types";

/**
 * Chapter 4 · small-models — script.md beats 20–29.
 * Length === steps rendered in SmallModels.tsx.
 */
export const narrations: Narration[] = [
  // step 0
  "There's also a whole shelf of smaller models. Most are one to ten billion parameters.",
  // step 1
  "They're quantized. Many run on a plain CPU, no GPU needed. A GPU just makes them faster.",
  // step 2
  "The biggest is MedM v3, at fourteen billion parameters. It needs 24 gigs of GPU memory. It handles summaries, Q&A, RAG, and chat.",
  // step 3
  "Then come the specialists. The NER models pull medical terms out of text and link them.",
  // step 4
  "One version of NER reads clinical trial eligibility rules.",
  // step 5
  "Text2SOAP turns a messy note into a SOAP summary. Subjective, Objective, Assessment, Plan.",
  // step 6
  "There's a RAG model, built only to be the LLM inside a retrieval pipeline.",
  // step 7
  "And two vision models, at 3B and 2B. They read images and pull out structured medical entities.",
  // step 8
  "They plug into the Healthcare NLP library like any other component. And they're covered by that same license.",
  // step 9
  "Context windows run from 32K up to 131K tokens. There's a Colab notebook if you want to poke at them.",
];
