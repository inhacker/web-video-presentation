import type { CSSProperties } from "react";
import type { ChapterStepProps } from "../../registry/types";
import "./VisionOcr.css";

/**
 * Chapter 9 · vision-ocr
 *   step 0  a scan line reads the hero "Vision OCR" onto the page; family two lights up
 *   step 1  pages ride a document pipeline through the task-optimized OCR gate
 *   step 2  illustrative intake form: every word gets a box → the same page becomes JSON
 *   step 3  spec sheet · row 1: Vision OCR LLM memory bar grows to ~6 GB, context to 32K
 *   step 4  spec sheet · row 2: Structured LLM grows to ~32 GB, 128K (row 1 dimmed)
 *   step 5  both numbers stamped "at max context"; an 8K pin drops on the context rulers
 *   step 6  at 8K the bars shrink: ~3 GB / ~19 GB → one GPU each
 *   step 7  your infrastructure boundary draws; PII / PHI tags stay inside
 *
 * Every step root carries key={step} so its CSS animations replay.
 * Data: article §Vision OCR (¶1–2), §Vision OCR Offering table + Note.
 */

type Vars = CSSProperties & Record<`--${string}`, string | number>;

/* ─── illustrative intake form (word boxes + PII/PHI tags) ─── */
const CH = 0.6; // JetBrains Mono advance width, em
interface Line {
  text: string;
  x: number;
  y: number;
  size: number;
  kind: "head" | "label" | "value";
  tag?: "PII" | "PHI";
  json?: number; // which JSON line this value feeds
}
const FORM: Line[] = [
  { text: "PATIENT INTAKE", x: 32, y: 58, size: 28, kind: "head" },
  { text: "NAME", x: 32, y: 124, size: 28, kind: "label" },
  { text: "Jane Doe", x: 32, y: 166, size: 32, kind: "value", tag: "PII", json: 1 },
  { text: "DATE OF BIRTH", x: 32, y: 228, size: 28, kind: "label" },
  { text: "1970-01-01", x: 32, y: 270, size: 32, kind: "value", tag: "PII", json: 2 },
  { text: "MRN", x: 32, y: 332, size: 28, kind: "label" },
  { text: "0000000", x: 32, y: 374, size: 32, kind: "value", tag: "PHI", json: 3 },
  { text: "ALLERGY", x: 32, y: 436, size: 28, kind: "label" },
  { text: "penicillin", x: 32, y: 478, size: 32, kind: "value", tag: "PHI", json: 4 },
];
const FORM_W = 520;
const FORM_H = 520;

/** word-level boxes, computed from the mono advance width */
function wordBoxes(l: Line) {
  const out: { x: number; w: number; y: number; h: number }[] = [];
  let col = 0;
  for (const word of l.text.split(" ")) {
    out.push({
      x: l.x + col * l.size * CH - 6,
      w: word.length * l.size * CH + 12,
      y: l.y - l.size * 0.86,
      h: l.size * 1.12,
    });
    col += word.length + 1;
  }
  return out;
}

function Form({ mode, x, y, scale = 1 }: { mode: "boxes" | "tags"; x: number; y: number; scale?: number }) {
  let n = 0;
  return (
    <g className="vo-form" transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x="0" y="0" width={FORM_W} height={FORM_H} className="vo-paper" />
      <line x1="32" y1="80" x2={FORM_W - 32} y2="80" className="vo-paper-rule" />
      {FORM.map((l) => (
        <g key={l.text}>
          <text x={l.x} y={l.y} className={`vo-form-${l.kind}`} style={{ fontSize: l.size }}>
            {l.text}
          </text>
          {mode === "boxes" &&
            wordBoxes(l).map((b, i) => (
              <rect
                key={i}
                x={b.x}
                y={b.y}
                width={b.w}
                height={b.h}
                pathLength={1}
                className={l.kind === "value" ? "vo-wbox is-value" : "vo-wbox"}
                style={{ "--n": n++ } as Vars}
              />
            ))}
          {mode === "tags" && l.tag && (
            <g className="vo-tag" style={{ "--n": (l.json ?? 1) - 1 } as Vars}>
              <rect x={FORM_W - 132} y={l.y - 34} width="100" height="44" className="vo-tag-box" />
              <text x={FORM_W - 82} y={l.y - 3} className="vo-tag-text" textAnchor="middle">
                {l.tag}
              </text>
            </g>
          )}
        </g>
      ))}
    </g>
  );
}

/* ─── step 2 · the JSON that the same page becomes ─── */
const JSON_LINES: { k?: string; v?: string; raw?: string }[] = [
  { raw: "{" },
  { k: "name", v: "Jane Doe" },
  { k: "date_of_birth", v: "1970-01-01" },
  { k: "mrn", v: "0000000" },
  { k: "allergy", v: "penicillin" },
  { raw: "}" },
];
const FORM2_X = 0;
const FORM2_Y = 110;
const FORM2_S = 1.08;
const JSON_X = 1000;
const JSON_Y0 = 200;
const JSON_DY = 76;

/* ─── steps 3–6 · spec sheet (article §Vision OCR Offering) ─── */
const GB_MAX = 32;
const K_MAX = 128;
const TRACK = 820; // px for the full scale of each meter
interface Spec {
  name: string;
  role: string;
  detail: string;
  gb: number;
  kv: number;
  ctx: number;
  typ: number;
}
const SPECS: Spec[] = [
  {
    name: "Vision OCR LLM",
    role: "Grounding specialist",
    detail: "word-level OCR · precise boxes",
    gb: 6,
    kv: 4,
    ctx: 32,
    typ: 3,
  },
  {
    name: "Vision OCR Structured LLM",
    role: "Structure specialist",
    detail: "document → schema‑constrained JSON",
    gb: 32,
    kv: 17,
    ctx: 128,
    typ: 19,
  },
];
const TYPICAL_K = 8;

type SheetMode = "one" | "two" | "max" | "typ";

function SpecRow({ s, idx, mode }: { s: Spec; idx: number; mode: SheetMode }) {
  const state =
    mode === "one" ? (idx === 0 ? "live" : "ghost") : mode === "two" ? (idx === 1 ? "live" : "past") : "all";
  const gbW = (s.gb / GB_MAX) * TRACK;
  const kvW = (s.kv / GB_MAX) * TRACK;
  const typW = (s.typ / GB_MAX) * TRACK;
  const ctxW = (s.ctx / K_MAX) * TRACK;
  const typK = (TYPICAL_K / K_MAX) * TRACK;
  const shrink = mode === "typ";
  return (
    <div className={`vo-row is-${state}`} style={{ "--r": idx } as Vars}>
      <div className="vo-row-id">
        <div className="vo-row-name serif-it">{s.name}</div>
        <div className="vo-row-role mono">{s.role}</div>
        <div className="vo-row-detail">{s.detail}</div>
      </div>
      <div className="vo-meters">
        {/* GPU memory */}
        <div className="vo-meter">
          <span className="vo-meter-label mono">GPU memory</span>
          <div className="vo-track" style={{ width: TRACK }}>
            <div className="vo-fill" style={{ "--w0": `${gbW}px`, "--w1": `${shrink ? typW : gbW}px` } as Vars}>
              <div className="vo-kv" style={{ width: kvW }} />
            </div>
            {mode === "max" && <span className="vo-stamp mono">at max context</span>}
          </div>
          <span className="vo-val">
            <span className="vo-swap">
              <span className={shrink ? "hero-num vo-num is-old" : "hero-num vo-num"}>~{s.gb}</span>
              {shrink && <span className="hero-num vo-num is-new">~{s.typ}</span>}
            </span>
            <em className="mono">GB</em>
            {shrink && <span className="vo-gpu mono">1 GPU</span>}
          </span>
        </div>
        {/* context */}
        <div className="vo-meter">
          <span className="vo-meter-label mono">Context</span>
          <div className="vo-track vo-track--ctx" style={{ width: TRACK }}>
            <div
              className="vo-fill vo-fill--ctx"
              style={{ "--w0": `${ctxW}px`, "--w1": `${shrink ? typK : ctxW}px` } as Vars}
            />
            {(mode === "max" || shrink) && (
              <span className="vo-pin" style={{ left: typK }}>
                <span className="mono">8K</span>
              </span>
            )}
          </div>
          <span className="vo-val">
            <span className="vo-swap">
              <span className={shrink ? "vo-ctx is-old" : "vo-ctx"}>{s.ctx}K</span>
              {shrink && <span className="vo-ctx is-new">~8K</span>}
            </span>
            <em className="mono">tokens</em>
          </span>
        </div>
      </div>
    </div>
  );
}

const HEADS: Record<SheetMode, [string, string]> = {
  one: ["Job one:", "the grounding specialist."],
  two: ["Job two:", "document in, JSON out."],
  max: ["Worst case:", "max context."],
  typ: ["A typical page:", "one GPU."],
};

export default function VisionOcr({ step }: ChapterStepProps) {
  /* step 0 — family two */
  if (step === 0) {
    return (
      <div key={step} className="scene-pad vo-scene vo-open">
        <div className="vo-families mono">
          <span className="vo-fam is-past">Family one · Medical LLMs</span>
          <span className="vo-fam-rule" />
          <span className="vo-fam is-on">Family two</span>
        </div>
        <h1 className="vo-hero">
          <span className="vo-hero-ink">
            <span className="display-en">Vision</span> <span className="serif-it vo-em">OCR</span>
          </span>
          <span className="vo-scanline" />
        </h1>
        <p className="vo-foot mono vo-late0">same page · second model family · documents in</p>
      </div>
    );
  }

  /* step 1 — same idea, for document pipelines */
  if (step === 1) {
    return (
      <div key={step} className="scene-pad vo-scene">
        <h1 className="vo-headline vo-print">
          <span className="display-en">Same idea,</span> <span className="serif-it vo-em">for documents.</span>
        </h1>
        <svg className="vo-svg" viewBox="0 0 1720 420">
          {/* conveyor */}
          <line x1="20" y1="300" x2="1700" y2="300" className="vo-belt" />
          <g className="vo-inbox">
            {[2, 1, 0].map((i) => (
              <rect key={i} x={40 + i * 10} y={170 - i * 10} width="110" height="130" className="vo-paper" />
            ))}
            <text x="40" y="350" className="vo-svg-label vo-svg-label--ink">SCANS · FORMS</text>
          </g>
          {[0, 1, 2].map((i) => (
            <g key={i} className="vo-page" style={{ "--i": i } as Vars}>
              <rect x="40" y="170" width="110" height="130" className="vo-paper" />
              {[200, 222, 244, 266].map((ly, j) => (
                <line key={ly} x1="58" y1={ly} x2={j === 3 ? 110 : 132} y2={ly} className="vo-page-line" />
              ))}
            </g>
          ))}
          {/* the generalist route, bypassed */}
          <g className="vo-ghost-gate">
            <rect x="700" y="20" width="300" height="96" className="vo-gate-ghost" />
            <text x="850" y="76" className="vo-svg-label" textAnchor="middle">GENERAL-PURPOSE</text>
          </g>
          {/* the specialist gate */}
          <g className="vo-gate">
            <rect x="700" y="160" width="300" height="140" className="vo-gate-box" />
            <text x="850" y="252" className="vo-gate-name" textAnchor="middle">OCR</text>
            <text x="850" y="350" className="vo-svg-label vo-svg-label--ink" textAnchor="middle">TASK-OPTIMIZED</text>
          </g>
          {/* structured output stacking into the pipeline */}
          {[0, 1, 2, 3].map((i) => (
            <g key={i} className="vo-out" style={{ "--i": i } as Vars}>
              <rect x="1180" y={150 + i * 36} width="150" height="26" className="vo-out-key" />
              <rect x="1340" y={150 + i * 36} width={i % 2 ? 230 : 320} height="26" className="vo-out-val" />
            </g>
          ))}
          <text x="1180" y="350" className="vo-svg-label vo-svg-label--ink vo-out-label">DOCUMENT PIPELINE</text>
        </svg>
        <p className="vo-thesis vo-late1">
          <span className="serif-it">
            &ldquo;Task-optimized OCR models beat general-purpose frontier systems on crucial tasks for document
            pipelines&rdquo;
          </span>
          <span className="mono vo-by">— their thesis</span>
        </p>
      </div>
    );
  }

  /* step 2 — two jobs */
  if (step === 2) {
    return (
      <div key={step} className="scene-pad vo-scene">
        <h1 className="vo-headline vo-headline--sm vo-print">
          <span className="display-en">Two jobs</span> <span className="serif-it vo-em">matter most.</span>
        </h1>
        <svg className="vo-svg" viewBox="0 0 1720 700">
          <g className="vo-job vo-job--a">
            <text x="0" y="40" className="vo-job-name">01 · GROUNDING</text>
            <text x="0" y="82" className="vo-job-sub">every word → an exact box</text>
          </g>
          <Form mode="boxes" x={FORM2_X} y={FORM2_Y} scale={FORM2_S} />

          <g className="vo-job vo-job--b">
            <text x={JSON_X} y="40" className="vo-job-name">02 · STRUCTURE</text>
            <text x={JSON_X} y="82" className="vo-job-sub">page → schema-valid JSON</text>
          </g>
          {JSON_LINES.map((l, i) => (
            <text
              key={i}
              x={l.raw ? JSON_X : JSON_X + 40}
              y={JSON_Y0 + i * JSON_DY}
              className="vo-json-line"
              style={{ "--i": i } as Vars}
            >
              {l.raw ?? (
                <>
                  <tspan className="vo-json-k">&quot;{l.k}&quot;</tspan>
                  <tspan className="vo-json-p">: </tspan>
                  <tspan className="vo-json-v">&quot;{l.v}&quot;</tspan>
                  {i < JSON_LINES.length - 2 && <tspan className="vo-json-p">,</tspan>}
                </>
              )}
            </text>
          ))}
          {/* each grounded value feeds a JSON field */}
          {FORM.filter((l) => l.json).map((l) => {
            const b = wordBoxes(l);
            const last = b[b.length - 1]!;
            const sx = FORM2_X + (last.x + last.w) * FORM2_S + 10;
            const sy = FORM2_Y + (l.y - l.size * 0.3) * FORM2_S;
            const ty = JSON_Y0 + l.json! * JSON_DY - 11;
            return (
              <path
                key={l.text}
                d={`M${sx} ${sy} C${sx + 240} ${sy} ${JSON_X - 240} ${ty} ${JSON_X - 14} ${ty}`}
                pathLength={1}
                className="vo-link"
                style={{ "--i": l.json! } as Vars}
              />
            );
          })}
          <text x="0" y="696" className="vo-svg-label vo-late2">ILLUSTRATIVE FORM</text>
        </svg>
      </div>
    );
  }

  /* steps 3–6 — the spec sheet */
  if (step >= 3 && step <= 6) {
    const mode: SheetMode = step === 3 ? "one" : step === 4 ? "two" : step === 5 ? "max" : "typ";
    const [a, b] = HEADS[mode];
    return (
      <div key={step} className={`scene-pad vo-scene vo-specs vo-specs--${mode}`}>
        <h1 className="vo-headline vo-headline--sm vo-print">
          <span className="display-en">{a}</span> <span className="serif-it vo-em">{b}</span>
        </h1>
        <div className="vo-sheet">
          {SPECS.map((s, i) => (
            <SpecRow key={s.name} s={s} idx={i} mode={mode} />
          ))}
        </div>
        {mode === "max" && (
          <p className="vo-foot mono vo-late5">bf16 · GB = 10⁹ bytes · weights + KV cache at max context + ~8% overhead</p>
        )}
        {mode === "typ" && (
          <p className="vo-foot mono vo-late6">their note: typical OCR context ~8K → ~19 GB / ~3 GB, single-GPU</p>
        )}
        {(mode === "one" || mode === "two") && (
          <p className="vo-foot mono vo-late34">
            <span className="vo-kv-key" />
            KV cache at max context · tensor parallel 1, 2, 4 · scale 0–32 GB / 0–128K
          </p>
        )}
      </div>
    );
  }

  /* step 7 — PII / PHI stay inside */
  return (
    <div key={step} className="scene-pad vo-scene">
      <h1 className="vo-headline vo-headline--sm vo-print">
        <span className="display-en">The point:</span> <span className="serif-it vo-em">privacy.</span>
      </h1>
      <svg className="vo-svg" viewBox="0 0 1720 640">
        <rect x="20" y="40" width="1260" height="560" pathLength={1} className="vo-wall" />
        <text x="44" y="24" className="vo-svg-label vo-svg-label--ink vo-wall-label">YOUR INFRASTRUCTURE</text>

        <Form mode="tags" x={90} y={80} scale={0.92} />

        <path d="M600 320 L770 320" pathLength={1} className="vo-flow" />
        <g className="vo-model">
          <rect x="780" y="220" width="460" height="200" className="vo-model-box" />
          <text x="1010" y="312" className="vo-model-name" textAnchor="middle">Vision OCR</text>
          <text x="1010" y="366" className="vo-svg-label" textAnchor="middle">ON-PREM · PRIVATE CLOUD</text>
        </g>

        {/* the closed frontier, outside — not where patient records go */}
        <g className="vo-outside">
          <rect x="1370" y="240" width="330" height="160" className="vo-out-ghost" />
          <text x="1535" y="312" className="vo-svg-label" textAnchor="middle">CLOSED FRONTIER</text>
          <text x="1535" y="352" className="vo-svg-label" textAnchor="middle">STAYS OUTSIDE</text>
        </g>
        <text x="1260" y="580" className="vo-svg-label vo-svg-label--accent vo-stay" textAnchor="end">
          PII + PHI STAY INSIDE
        </text>
      </svg>
      <p className="vo-foot mono vo-late7">supported: on-premise · AWS · Azure · Databricks · Snowflake — form is illustrative</p>
    </div>
  );
}
