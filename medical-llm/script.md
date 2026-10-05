Your hospital probably can't send patient records to GPT 5.5. Not without a lot of paperwork.

---

So what if the model you're allowed to run, on your own servers, scored higher on medical benchmarks?

---

That's the claim John Snow Labs is making with two new medical LLMs. Let's check their numbers.

---

We'll also look at where their own charts show them losing.

---

In healthcare, they argue, a specialized model beats a general one.

---

They point to academic papers and industry benchmarks that keep showing this.

---

So they built a pair. Medical LLM Medium, and Medical LLM Small.

---

Both read text and images, and both ship with a fixed John Snow Labs identity.

---

The real pitch is where they run. GPT, Claude and Gemini live in someone else's cloud. These can sit on-premise, or in your private cloud.

---

That keeps things HIPAA-friendly. And they say you don't give up frontier-level medical accuracy to get it.

---

The target work is clinical reasoning and diagnostics.

---

Plus reading medical research, and even genetic analysis.

---

Start with hardware. Medium is the flagship. It wants about 67 gigabytes of GPU memory.

---

Small needs about 25. That fits on one commodity GPU.

---

Both take a 262K-token context. That's hundreds of pages of patient history in a single prompt.

---

Those memory numbers assume half-precision weights. They also reserve room for the cache at full context. 16 gigs for Medium, 8 for Small.

---

Medium splits across 2, 4, or 8 GPUs. Small can also run on just one.

---

You can deploy on-premise, or on AWS, Azure, Databricks, and Snowflake.

---

Their own summary goes like this. Small beats much bigger general models on MedHELM. Medium is their best, number one in the comparison.

---

There's also a whole shelf of smaller models. Most are one to ten billion parameters.

---

They're quantized. Many run on a plain CPU, no GPU needed. A GPU just makes them faster.

---

The biggest is MedM v3, at fourteen billion parameters. It needs 24 gigs of GPU memory. It handles summaries, Q&A, RAG, and chat.

---

Then come the specialists. The NER models pull medical terms out of text and link them.

---

One version of NER reads clinical trial eligibility rules.

---

Text2SOAP turns a messy note into a SOAP summary. Subjective, Objective, Assessment, Plan.

---

There's a RAG model, built only to be the LLM inside a retrieval pipeline.

---

And two vision models, at 3B and 2B. They read images and pull out structured medical entities.

---

They plug into the Healthcare NLP library like any other component. And they're covered by that same license.

---

Context windows run from 32K up to 131K tokens. There's a Colab notebook if you want to poke at them.

---

Now the benchmarks, starting with OpenMed.

---

It's eight multiple-choice test sets. MedQA, PubMedQA, and six medical subjects from MMLU.

---

Medical LLM Medium averages 93.99.

---

GPT 5.5 is at 93.28, Claude Opus 4.8 at 93.21, and Gemini 3.5 Flash at 92.94.

---

So Medium is on top. By about seven tenths of a point.

---

Look closer, and Medium trails on four of the eight subjects. On College Biology, the frontier models hit 99.3. Medium gets 94.3.

---

On Medical Genetics, the frontier models score a perfect 100. Medium gets 99.

---

Where Medium really pulls ahead is PubMedQA. It scores 82, while the frontier sits between 74 and 76.5.

---

On MedQA the lead is smaller, 96.2 against 95.

---

And Small? It averages 90.63. For a model that fits on one GPU, that's close.

---

OpenMed is exam questions. MedHELM is closer to real clinical work.

---

It has thirteen tasks. They cover documentation, medical coding, safety, patient dialogue, and reasoning.

---

The headline score is mean win rate. Roughly, how often a model beats the others, task by task.

---

Medium gets 77.78. That's the best of every model tested. GPT 5.5 is next, at 73.56.

---

Medium takes the top score on 12 of the 13 tasks. Some of those wins are by a tenth of a point.

---

Its biggest gap is clinical error detection. On Medec, Medium scores 85. The best frontier model gets 70. That's 15 points.

---

Medication questions, plus 9.5. Research reading on PubMedQA, plus 6.

---

On Med-Hallu, the hallucination test, Medium scores 96. Small scores 95. The frontier tops out at 92.

---

So which task did it lose? RaceBias. Medium gets 88. All three frontier models get 91.

---

If bias testing matters for your rollout, remember that one.

---

Small lands at 70.95. That's under all three frontier models. So that line about beating bigger models needs an asterisk.

---

Now step back and look at averages.

---

On OpenMed, the three frontier models average 93.14. Medium gets 93.99.

---

On MedHELM, the frontier averages 72.41. Medium gets 77.78. That gap is much wider.

---

Then there's red-teaming. A thousand adversarial questions, across 148 medical categories.

---

Medium passed about 940. That's 94 percent.

---

The frontier trails. GPT 5.5 passed 850, Claude Opus 4.8 passed 830, and Gemini 3.5 Flash passed 790.

---

Their read on it: a smaller model came out as the most robust in this test. Small's result isn't reported.

---

On hallucination, both of their models beat every frontier model. The vendor calls that the metric that decides clinical safety.

---

The same page covers a second family. Vision OCR.

---

Same idea here. For document pipelines, a task-specific OCR model should beat a general one.

---

Two jobs matter most. Tie every word to an exact box on the page. And turn a page into clean, schema-valid JSON.

---

Vision OCR LLM does the first job. It's the grounding specialist. About 6 gigs of GPU memory, with a 32K context.

---

Vision OCR Structured LLM does the second. Document in, JSON out. About 32 gigs, with a 128K context.

---

Those are worst-case numbers at max context. A typical OCR page is only around 8K tokens.

---

At that size, Vision OCR LLM needs about 3 gigs, and the Structured one about 19. One GPU either way.

---

And again, the point is privacy. Patient records, PII and PHI stay inside your own infrastructure.

---

Take tables. They pulled 50 from PubTabNet, balanced from simple to very dense.

---

The metric is TEDS-S. It checks whether the table's structure came out right.

---

Vision OCR LLM scores 0.784. The best frontier model, GPT 5.5, gets 0.704. That's eight points clear.

---

For grounding, they used all 50 test forms from FUNSD.

---

Each predicted box has to match a real region, with an overlap score of at least 0.78.

---

Then they check how accurately the text inside that box was read.

---

Vision OCR LLM gets 0.938. That's ahead of Claude at 0.921, and GPT at 0.848.

---

But Gemini scores higher, at 0.968.

---

Their explanation: this metric only rewards tightly matched regions. So a high score might cover just part of the page.

---

They say theirs covers the full page. But they don't publish coverage numbers.

---

And for JSON, they used 100 documents from the OmniOCR benchmark.

---

Vision OCR Structured LLM gets 0.708 field accuracy. That's ahead of GPT at 0.623, and Claude at 0.643.

---

Gemini wins this one too, at 0.813.

---

The OCR tests ran on their own harness. Same prompt for every model, and zero failed documents.

---

So, on medical text, Medium beats the frontier on both benchmarks. The wide lead is on MedHELM, the clinical-work one.

---

On OCR, it's mixed. Tables are a clear win. On grounding and JSON, Gemini is still ahead.

---

Where they run hasn't changed. Inside your own walls, and for most of them, on a single GPU.

---

Keep in mind these are the vendor's own numbers. If you're choosing for a hospital, run the same tests on your own data.

---

The docs link is in the description. Grab the Colab notebook and try the small models yourself.
