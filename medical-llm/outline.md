# Video Outline — Medical LLMs, for beginners

> **主题**：TBD at Checkpoint Plan (recommended: `pastel-dream`)
> **总时长**：约 3 分钟（口播 ~470 words ÷ ~2.5 words/s）
> **章节数**：7 章 / 37 步
> **Audience**: someone new to AI and to medical benchmarks. Rule for every chapter: **at most one number on screen at a time**, every term explained in plain words the first time, no benchmark acronyms in large type (a small label is fine).

---

## 1. hook — The catch（4 steps · ~19s）

**信息池**：
- 引用：closed frontier models "should not run on patient records, ours can" —— article §Vision OCR L102
- 事实：deployment is on-premise or private cloud, "HIPAA-friendly" —— article L8
- 名称：GPT 5.5, Claude Opus 4.8, Gemini 3.5 Flash are the closed frontier comparison set —— article L8

**开发计划**：

- step 1 (~5s) — a patient chart collapsing into a three-line AI summary
- step 2 (~5s) — that chart being dragged toward a public chatbot box, stopped by a lock
- step 3 (~6s) — the hospital as a walled building; patient data stays inside the walls
- step 4 (~3s) — 金句: "What if the AI came to the data?" (the AI moves inside the walls)

口播节选：
> There's a catch. You can't just paste patient records into ChatGPT.

---

## 2. meet — Meet the Medical LLMs（6 steps · ~31s）

**信息池**：
- 名称：Medical LLM Medium (flagship) / Medical LLM Small (compact) —— article L21–23
- 事实：purpose-built for clinical, biomedical and life-sciences work —— article L6
- 事实：targets clinical reasoning, diagnostics, research comprehension —— article L10
- 事实：Small runs on "a single commodity GPU" —— article L21
- 事实：runs on-premise / AWS / Azure / Databricks / Snowflake —— article L16–17

**开发计划**：

- step 1 (~4s) — title card: John Snow Labs · Medical LLMs
- step 2 (~6s) — 词义: "LLM = the kind of AI behind ChatGPT"; text goes in, answers come out
- step 3 (~5s) — three things it knows: clinical notes, research papers, diagnoses (one at a time)
- step 4 (~6s) — the model sits inside the hospital / private cloud; data arrow never crosses the wall
- step 5 (~5s) — two sizes side by side; Medium highlighted as "most powerful"
- step 6 (~5s) — Small on one graphics card; 词义: "graphics card (GPU) = the chip that runs AI"

口播节选：
> An LLM is the kind of AI behind ChatGPT. You give it text. It reads, writes, and answers.

---

## 3. smart — Is it smart enough?（6 steps · ~27s）

**信息池**：
- 数字：MedHELM mean win rate — Medium 77.78, the highest of every model tested —— article L48, L70
- 数字：best score on 12 of 13 MedHELM tasks —— article L66
- 事实：MedHELM covers documentation, coding, safety, dialogue, reasoning —— article L66
- 对比：rivals = GPT 5.5, Claude Opus 4.8, Gemini 3.5 Flash —— article L68

**开发计划**：

- step 1 (~4s) — question: "As smart as the big names?"
- step 2 (~6s) — 词义: benchmark = the same exam given to every AI (four test papers, one per AI)
- step 3 (~6s) — "real clinical work": notes, reasoning, safety, talking with patients, each appearing in turn (small label: MedHELM)
- step 4 (~4s) — four contenders line up: Medical LLM Medium vs GPT, Claude, Gemini
- step 5 (~3s) — hero: "#1 overall"
- step 6 (~4s) — 13 task tiles, 12 light up — hero "12 of 13"

口播节选：
> Out of thirteen tasks, it scored best on twelve.

---

## 4. safe — Smart, and careful（7 steps · ~36s）

**信息池**：
- 数字：Medec (clinical error detection) Medium 85 vs best rival 70 → +15 —— article L73, L85
- 数字：Med-Hallu — Medium 96, Small 95, frontier best 92; both JSL models rank first —— article L83, L91
- 数字：red-teaming — ~940/1000 passed (94%) vs GPT 5.5 850 (85%), Claude 830, Gemini 790 —— article L95
- 事实：1000 questions across 148 medical categories —— article L95
- 引用："the metric that decides whether a model is safe in front of clinicians" —— article L91

**开发计划**：

- step 1 (~5s) — 金句: "Smart isn't enough. It has to be careful."
- step 2 (~5s) — a medical note with hidden mistakes; the AI circles them
- step 3 (~5s) — hero: "+15 points" ahead of the next model (small label: error detection)
- step 4 (~6s) — 词义: hallucination = an AI confidently making something up (a made-up dose with a confident tone)
- step 5 (~4s) — hallucination test: Medium and Small both in first place
- step 6 (~5s) — a thousand tricky questions raining down at the model
- step 7 (~6s) — hero: "94 out of 100" for Medium, with GPT 5.5's 85 beside it

口播节选：
> AI sometimes makes things up, and sounds completely sure. That's called a hallucination.

---

## 5. paperwork — It reads paperwork too（5 steps · ~26s）

**信息池**：
- 名称：Vision OCR LLM (grounding specialist) / Vision OCR Structured LLM (document → schema-constrained JSON) —— article L114–116
- 数字：table structure 0.784 vs best frontier 0.704 — beats every frontier model tested —— article L124–133
- 事实：Vision OCR LLM runs on a single commodity GPU —— article L120
- 事实：keeps PII and PHI inside your infrastructure —— article L103

**开发计划**：

- step 1 (~5s) — a pile of scanned forms, faxes and tables
- step 2 (~7s) — 词义: OCR = the AI looks at a page and turns it into usable text (scan → text)
- step 3 (~4s) — every word on a form gets an exact box
- step 4 (~5s) — the form turns into neat, organized fields, ready for your systems
- step 5 (~5s) — hero: "best at reading tables" — beat every big-name model, on one graphics card

口播节选：
> It looks at a page and turns it into text a computer can use.

---

## 6. uses — What you could build（5 steps · ~22s）

**信息池**：
- 事实：Text2SOAP turns notes into structured SOAP summaries —— article L38
- 事实：NER models extract and link medical entities —— article L35, L39–40
- 事实：clinical trial eligibility parsing (NER v5) —— article L36
- 事实：chat / Q&A / summarization models (MedM v3) —— article L31
- 事实：small models (1–10B) can run on standard CPU hardware, no GPU required —— article L27
- 引用：decision support tools, clinical chatbots, research platforms —— article L178

**开发计划**：

- step 1 (~3s) — question: "What could you build?"
- step 2 (~4s) — a messy doctor's note becoming a clean summary
- step 3 (~4s) — drugs and doses lifting out of a note into a list
- step 4 (~6s) — a medical Q&A chat bubble, then a clinical-trial rule sheet being read
- step 5 (~5s) — a small model running on an ordinary laptop, "no graphics card needed"

口播节选：
> Some of the smaller models even run on a regular computer.

---

## 7. start — Try it yourself（4 steps · ~19s）

**信息池**：
- 事实：all numbers are measured on John Snow Labs' own harness —— article L174
- 事实：Colab notebook to explore the small models —— article L42
- 引用："Book a call with our experts … get a live demo" —— article L180–184

**开发计划**：

- step 1 (~5s) — 金句: "These are their own tests."
- step 2 (~5s) — "your data" folder: the real proof is your own work
- step 3 (~4s) — step 1 card: Colab notebook, runs in your browser
- step 4 (~5s) — step 2 card: book a live demo · "links in the description"

口播节选：
> The best proof is your own data. Try it on the work you actually do.

---

## 素材清单

### 1. hook
- ✓ drawn chart / chatbot box / hospital walls (CSS/SVG, no real patient data)

### 2. meet
- ⚠️ John Snow Labs logo (optional — text wordmark used if not provided)

### 3–6
- ✓ all drawn (notes, forms, tiles, laptop) and labelled "illustrative" where they show sample content

### 7. start
- ⚠️ real Colab notebook URL and docs URL (placeholder card until provided)
