import type { CSSProperties } from "react";
import type { ChapterStepProps } from "../../registry/types";
import "./SmallModels.css";

/**
 * Chapter 4 · small-models  (article §Medical Small LLMs + its table)
 *   step 0  a literal shelf: one spine per model, height = parameters
 *   step 1  quantization squeezes one model's disk size; CPU lights up
 *   step 2  MedM v3's spine rises past the 10B line; spec sheet fills in
 *   step 3  NER: entities highlighted in a note, linked down to terminology
 *   step 4  NER v5: eligibility prose → structured criteria rows
 *   step 5  Text2SOAP: messy note → S / O / A / P, one letter per word spoken
 *   step 6  RAG: query → retriever → [RAG_v1] → answer, path draws through
 *   step 7  two vision models; an illustrative label is scanned, entities boxed
 *   step 8  an LLM block drops into a Healthcare NLP pipeline slot; license line
 *   step 9  context range 32K → 131K; Colab notebook placeholder card
 *
 * Every step root carries key={step} so its CSS animations replay.
 * Audio (s): 5.6 2.9 12.4 6.0 4.8 7.7 5.8 8.1 6.8 8.1 — motion ends ≥0.6s earlier.
 */

type Vars = CSSProperties & Record<`--${string}`, string | number>;

/* ─── the shelf (article table · Model Size column) ─── */
const SHELF = [
  { b: 2, n: "NER_VLM_2B_v2" },
  { b: 3, n: "RAG_v1" },
  { b: 3, n: "Text2SOAP_v1" },
  { b: 3, n: "VLM_3B_v1" },
  { b: 3.5, n: "MedS_v3" },
  { b: 3.5, n: "NER_v4" },
  { b: 3.5, n: "NER_v5" },
  { b: 4, n: "MedS_4B_v5" },
  { b: 8, n: "MedS_8B_v4" },
];
const K = 40; // px per billion parameters
const FLOOR = 600;
const slotX = (i: number) => 130 + i * 116;

function Shelf({ animate = true, withMedM = false }: { animate?: boolean; withMedM?: boolean }) {
  return (
    <svg className={withMedM ? "sm-shelf is-quiet" : "sm-shelf"} viewBox="0 0 1300 640">
      {/* 1B–10B band */}
      <rect x="100" y={FLOOR - 10 * K} width="1200" height={9 * K} className="sm-band" />
      <line x1="100" y1={FLOOR - 10 * K} x2="1300" y2={FLOOR - 10 * K} className="sm-band-edge" />
      <line x1="100" y1={FLOOR - 1 * K} x2="1300" y2={FLOOR - 1 * K} className="sm-band-edge" />
      <text x="84" y={FLOOR - 10 * K + 9} className="sm-axis" textAnchor="end">10B</text>
      <text x="84" y={FLOOR - 1 * K + 9} className="sm-axis" textAnchor="end">1B</text>

      {SHELF.map((m, i) => {
        const h = m.b * K;
        return (
          <g key={m.n} className={animate ? "sm-spine is-anim" : "sm-spine"} style={{ "--i": i } as Vars}>
            <rect x={slotX(i)} y={FLOOR - h} width="96" height={h} className="sm-spine-body" />
            <line x1={slotX(i) + 14} y1={FLOOR - h + 20} x2={slotX(i) + 82} y2={FLOOR - h + 20} className="sm-spine-band" />
            <text x={slotX(i) + 48} y={FLOOR - h - 16} className="sm-spine-b" textAnchor="middle">{m.b}B</text>
          </g>
        );
      })}

      {withMedM && (
        <g className="sm-medm">
          <rect x={slotX(9)} y={FLOOR - 14 * K} width="96" height={14 * K} className="sm-medm-body" />
          <line x1={slotX(9) + 14} y1={FLOOR - 14 * K + 20} x2={slotX(9) + 82} y2={FLOOR - 14 * K + 20} className="sm-spine-band sm-spine-band--inv" />
        </g>
      )}
      {withMedM && (
        <text x={slotX(9) + 48} y={FLOOR - 14 * K - 18} className="sm-medm-b" textAnchor="middle">14B</text>
      )}

      {/* the shelf plank */}
      <line x1="100" y1={FLOOR} x2="1300" y2={FLOOR} className="sm-plank" />
    </svg>
  );
}

/* ─── step 1 · one model, three quantizations (JSL_MedS_8B_v4 disk sizes) ─── */
const QUANT = [
  { q: "q16", gb: 12.2 },
  { q: "q8", gb: 7.8 },
  { q: "q4", gb: 4.6 },
];

/* ─── step 3 · illustrative note with entities ─── */
const NOTE: Array<{ t: string; ent?: string; k?: number }> = [
  { t: "Reports " },
  { t: "chest pain", ent: "SYMPTOM", k: 0 },
  { t: ". Started " },
  { t: "metoprolol", ent: "DRUG", k: 1 },
  { t: " " },
  { t: "25 mg", ent: "DOSAGE", k: 2 },
  { t: " daily." },
];

/* ─── step 4 · illustrative eligibility criteria ─── */
const CRITERIA = [
  { kind: "include", field: "age", val: "18 – 75" },
  { kind: "include", field: "condition", val: "type 2 diabetes" },
  { kind: "include", field: "HbA1c", val: "≥ 7%" },
  { kind: "exclude", field: "status", val: "pregnancy" },
];

/* ─── step 5 · SOAP columns (illustrative) ─── */
const SOAP = [
  { l: "S", w: "Subjective", t: "short of breath, 2 days" },
  { l: "O", w: "Objective", t: "BP 150/95 · HR 102" },
  { l: "A", w: "Assessment", t: "possible heart failure flare" },
  { l: "P", w: "Plan", t: "diuretic · recheck labs" },
];

/* ─── step 7 · entities pulled from the drawn label (illustrative) ─── */
const VLM_ENTS = [
  { type: "DRUG", val: "amoxicillin" },
  { type: "STRENGTH", val: "500 mg" },
  { type: "FREQUENCY", val: "3× daily" },
];

/* ─── step 9 · context windows (article table · Max Context column) ─── */
const CTX = [
  { k: 32768, label: "32K", count: 6 },
  { k: 128000, label: "128K", count: 1 },
  { k: 131072, label: "131K", count: 3 },
];

export default function SmallModels({ step }: ChapterStepProps) {
  /* step 0 — a whole shelf, mostly 1–10B */
  if (step === 0) {
    return (
      <div key={step} className="scene-pad sm-scene sm-shelf-scene">
        <div className="sm-shelf-head">
          <h1 className="sm-headline sm-print">
            <span className="display-en">A whole</span> <span className="serif-it sm-em">shelf.</span>
          </h1>
          <div className="sm-shelf-note sm-late">
            <span className="hero-num sm-count">9 of 10</span>
            <span className="mono">models sit between 1B and 10B</span>
          </div>
        </div>
        <Shelf />
      </div>
    );
  }

  /* step 1 — quantized, CPU is enough */
  if (step === 1) {
    return (
      <div key={step} className="scene-pad sm-scene sm-quant">
        <div className="sm-quant-col">
          <h1 className="sm-headline sm-headline--sm sm-print">
            <span className="serif-it sm-em">Quantized.</span>
          </h1>
          <div className="sm-qbars">
            {QUANT.map((r, i) => (
              <div key={r.q} className="sm-qrow" style={{ "--i": i } as Vars}>
                <span className="sm-qtag mono">{r.q}</span>
                <span className="sm-qbar" style={{ width: `${r.gb * 70}px` }} />
                <span className="sm-qgb">{r.gb} GB</span>
              </div>
            ))}
          </div>
          <div className="sm-qnote mono">disk size · JSL_MedS_8B_v4</div>
        </div>
        <div className="sm-hw">
          <div className="sm-cpu">
            <span className="sm-cpu-die mono">CPU</span>
          </div>
          <div className="sm-hw-label serif-it">no GPU needed</div>
          <div className="sm-gpu-opt mono">GPU · optional · faster</div>
        </div>
      </div>
    );
  }

  /* step 2 — MedM v3, the biggest */
  if (step === 2) {
    return (
      <div key={step} className="scene-pad sm-scene sm-medm-scene">
        <Shelf animate={false} withMedM />
        <div className="sm-spec">
          <div className="kicker sm-kicker sm-print2">The biggest</div>
          <div className="sm-spec-name serif-it sm-print2">MedM v3</div>
          <div className="sm-spec-row" style={{ "--d": "4400ms" } as Vars}>
            <span className="hero-num sm-spec-num">24</span>
            <span className="mono">GB GPU memory</span>
          </div>
          <div className="sm-spec-row" style={{ "--d": "5400ms" } as Vars}>
            <span className="hero-num sm-spec-num sm-spec-num--sm">32,768</span>
            <span className="mono">token context</span>
          </div>
          <div className="sm-tasks">
            {["Summaries", "Q&A", "RAG", "Chat"].map((t, i) => (
              <span key={t} className="sm-task" style={{ "--d": `${7400 + i * 700}ms` } as Vars}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* step 3 — NER: extract + link */
  if (step === 3) {
    return (
      <div key={step} className="scene-pad sm-scene sm-ner">
        <div className="sm-model-tag">
          <span className="serif-it">NER v4</span>
          <span className="mono">JSL_MedS_NER_v4 · 3.5B · 131,072 tokens</span>
        </div>
        <p className="sm-note-text">
          {NOTE.map((s, i) =>
            s.ent ? (
              <span key={i} className="sm-ent" style={{ "--k": s.k } as Vars}>
                <span className="sm-ent-mark" />
                <span className="sm-ent-word">{s.t}</span>
                <span className="sm-ent-type mono">{s.ent}</span>
                <span className="sm-ent-link" />
              </span>
            ) : (
              <span key={i}>{s.t}</span>
            ),
          )}
        </p>
        <div className="sm-term">
          <span className="sm-term-label mono">linked to medical terminology</span>
        </div>
        <p className="sm-foot mono">clinical note · illustrative</p>
      </div>
    );
  }

  /* step 4 — NER v5: trial eligibility */
  if (step === 4) {
    return (
      <div key={step} className="scene-pad sm-scene sm-elig">
        <div className="sm-model-tag">
          <span className="serif-it">NER v5</span>
          <span className="mono">clinical trial eligibility parsing</span>
        </div>
        <div className="sm-elig-grid">
          <div className="sm-elig-prose">
            <div className="kicker sm-kicker">Eligibility · illustrative</div>
            <p>
              Adults <b>18 to 75</b> with <b>type 2 diabetes</b> and <b>HbA1c of 7% or higher</b>. Pregnant patients are <b>excluded</b>.
            </p>
          </div>
          <svg className="sm-elig-arrow" viewBox="0 0 120 60">
            <path d="M4 30 L104 30 M84 12 L106 30 L84 48" pathLength={1} />
          </svg>
          <div className="sm-elig-table">
            {CRITERIA.map((c, i) => (
              <div key={c.field} className={c.kind === "exclude" ? "sm-crit is-ex" : "sm-crit"} style={{ "--i": i } as Vars}>
                <span className="sm-crit-kind mono">{c.kind}</span>
                <span className="sm-crit-field mono">{c.field}</span>
                <span className="sm-crit-val">{c.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* step 5 — Text2SOAP */
  if (step === 5) {
    return (
      <div key={step} className="scene-pad sm-scene sm-soap">
        <div className="sm-model-tag">
          <span className="serif-it">Text2SOAP</span>
          <span className="mono">JSL_MedS_Text2SOAP_v1 · 3B</span>
        </div>
        <div className="sm-soap-grid">
          <div className="sm-messy">
            <span className="sm-messy-line" style={{ "--r": "-1.5deg" } as Vars}>58M c/o SOB x2d, worse lying flat</span>
            <span className="sm-messy-line" style={{ "--r": "1deg" } as Vars}>BP 150/95 HR 102 — crackles both bases</span>
            <span className="sm-messy-line" style={{ "--r": "-0.5deg" } as Vars}>?HF flare. start diuretic, recheck BMP am</span>
            <span className="sm-messy-cap mono">messy note · illustrative</span>
          </div>
          <div className="sm-soap-cols">
            {SOAP.map((s, i) => (
              <div key={s.l} className="sm-soap-col" style={{ "--d": `${3600 + i * 700}ms` } as Vars}>
                <span className="sm-soap-l serif-it">{s.l}</span>
                <span className="sm-soap-w mono">{s.w}</span>
                <span className="sm-soap-t">{s.t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* step 6 — RAG pipeline */
  if (step === 6) {
    return (
      <div key={step} className="scene-pad sm-scene">
        <h1 className="sm-headline sm-headline--sm sm-print">
          <span className="display-en">Built only for</span> <span className="serif-it sm-em">one slot.</span>
        </h1>
        <svg className="sm-rag" viewBox="0 0 1720 520">
          <path d="M300 250 L560 250" className="sm-rag-wire" pathLength={1} style={{ "--d": "700ms" } as Vars} />
          <path d="M800 250 L1000 250" className="sm-rag-wire" pathLength={1} style={{ "--d": "1500ms" } as Vars} />
          <path d="M1400 250 L1520 250" className="sm-rag-wire" pathLength={1} style={{ "--d": "2400ms" } as Vars} />

          <g className="sm-rag-node" style={{ "--d": "300ms" } as Vars}>
            <path d="M60 180 L300 180 L300 300 L150 300 L110 340 L110 300 L60 300 Z" className="sm-rag-paper" />
            <text x="180" y="256" className="sm-rag-name" textAnchor="middle">query</text>
          </g>
          <g className="sm-rag-node" style={{ "--d": "1100ms" } as Vars}>
            {[0, 1, 2].map((n) => (
              <rect key={n} x={580 + n * 18} y={170 + n * 18} width="190" height="130" className="sm-rag-paper" />
            ))}
            <text x="710" y="410" className="sm-rag-name" textAnchor="middle">retriever</text>
          </g>
          <g className="sm-rag-node sm-rag-hot" style={{ "--d": "1900ms" } as Vars}>
            <rect x="1010" y="150" width="380" height="200" className="sm-rag-llm" />
            <text x="1200" y="245" className="sm-rag-llm-name" textAnchor="middle">RAG v1</text>
            <text x="1200" y="300" className="sm-rag-llm-sub" textAnchor="middle">JSL_MedS_RAG_v1 · 3B</text>
          </g>
          <g className="sm-rag-node" style={{ "--d": "2800ms" } as Vars}>
            <rect x="1520" y="190" width="200" height="120" className="sm-rag-paper" />
            <text x="1620" y="262" className="sm-rag-name" textAnchor="middle">answer</text>
          </g>
          <text x="1200" y="420" className="sm-rag-label" textAnchor="middle">&ldquo;LLM component of RAG&rdquo;</text>
        </svg>
      </div>
    );
  }

  /* step 7 — two vision models */
  if (step === 7) {
    return (
      <div key={step} className="scene-pad sm-scene sm-vlm">
        <div className="sm-vlm-models">
          <div className="sm-vlm-model" style={{ "--d": "200ms" } as Vars}>
            <span className="hero-num sm-vlm-b">3B</span>
            <span className="mono">JSL_MedS_VLM_3B_v1 · 128,000 ctx</span>
          </div>
          <div className="sm-vlm-model" style={{ "--d": "900ms" } as Vars}>
            <span className="hero-num sm-vlm-b">2B</span>
            <span className="mono">JSL_MedS_NER_VLM_2B_v2 · 32,768 ctx</span>
          </div>
        </div>
        <div className="sm-vlm-grid">
          <div className="sm-vlm-img">
            <svg viewBox="0 0 640 400" className="sm-label-svg">
              <rect x="20" y="20" width="600" height="360" className="sm-label-paper" />
              <text x="56" y="90" className="sm-label-rx">Rx</text>
              <line x1="150" y1="78" x2="580" y2="78" className="sm-label-rule" />
              <text x="60" y="164" className="sm-label-text">Amoxicillin</text>
              <text x="390" y="164" className="sm-label-text">500 mg</text>
              <text x="60" y="230" className="sm-label-text sm-label-text--mute">Take 1 capsule</text>
              <text x="60" y="296" className="sm-label-text">3× daily</text>
              <line x1="60" y1="342" x2="460" y2="342" className="sm-label-rule" />
              {/* detected regions */}
              <rect x="46" y="122" width="300" height="58" className="sm-bbox" style={{ "--i": 0 } as Vars} />
              <rect x="376" y="122" width="190" height="58" className="sm-bbox" style={{ "--i": 1 } as Vars} />
              <rect x="46" y="254" width="200" height="58" className="sm-bbox" style={{ "--i": 2 } as Vars} />
              <rect x="20" y="20" width="600" height="6" className="sm-scan" />
            </svg>
            <span className="sm-vlm-cap mono">image · illustrative</span>
          </div>
          <div className="sm-vlm-out">
            <div className="kicker sm-kicker sm-vlm-out-k">Structured entities</div>
            {VLM_ENTS.map((e, i) => (
              <div key={e.type} className="sm-vlm-ent" style={{ "--i": i } as Vars}>
                <span className="mono">{e.type}</span>
                <span className="serif-it">{e.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* step 8 — plugs into Healthcare NLP; same license */
  if (step === 8) {
    return (
      <div key={step} className="scene-pad sm-scene sm-plug">
        <div className="kicker sm-kicker sm-rise">Healthcare NLP · pipeline</div>
        <div className="sm-track">
          <span className="sm-comp">component</span>
          <span className="sm-wire" />
          <span className="sm-comp">component</span>
          <span className="sm-wire" />
          <span className="sm-slot">
            <span className="sm-slot-block serif-it">Medical small LLM</span>
          </span>
          <span className="sm-wire" />
          <span className="sm-comp">component</span>
        </div>
        <p className="sm-plug-line serif-it">&ldquo;just like any other component&rdquo;</p>
        <div className="sm-license">
          <span className="mono sm-license-k">Same license</span>
          <span className="sm-license-v">
            fully included under the <em className="serif-it">Healthcare NLP</em> license
          </span>
        </div>
      </div>
    );
  }

  /* step 9 — context range + Colab */
  return (
    <div key={step} className="scene-pad sm-scene sm-ctx">
      <h1 className="sm-ctx-hero sm-print">
        <span className="hero-num">32K</span>
        <span className="sm-ctx-arrow serif-it">to</span>
        <span className="hero-num sm-em">131K</span>
        <span className="sm-ctx-unit mono">tokens of context</span>
      </h1>
      <div className="sm-range">
        <span className="sm-range-track" />
        <span className="sm-range-fill" />
        {CTX.map((c, i) => (
          <span key={c.label} className={`sm-pin sm-pin--${i}`} style={{ "--x": `${(c.k / 131072) * 100}%`, "--i": i } as Vars}>
            <span className="sm-pin-dot" />
            <span className="sm-pin-label">
              <span className="sm-pin-k">{c.label}</span>
              <span className="mono">
                {c.count} {c.count === 1 ? "model" : "models"}
              </span>
            </span>
          </span>
        ))}
      </div>
      <div className="sm-colab">
        <span className="sm-colab-k mono">Colab notebook</span>
        <span className="sm-colab-v serif-it">poke at them yourself</span>
        <span className="sm-colab-ph mono">link · placeholder</span>
      </div>
    </div>
  );
}
