import type { CSSProperties } from "react";
import type { ChapterStepProps } from "../../registry/types";
import "./OcrJson.css";

/**
 * Chapter 11 · ocr-json
 *   step 0  an odometer rolls to 100 while 100 document ticks print across the page
 *   step 1  JSON-brace gauges fill to field accuracy: Structured 0.708, GPT, Claude; one brace empty
 *   step 2  Gemini's brace fills past the rest — 0.813, #1
 *   step 3  their harness: one prompt fans out to four models, each stamped "0 errored"
 *
 * Every step root carries key={step} so its CSS animations replay.
 * Data: article §Structured JSON Extraction, §Vision OCR › How the Models Compare.
 */

type Vars = CSSProperties & Record<`--${string}`, string | number>;

/* ─── odometer digits (pure CSS roll) ─── */
function Odometer({ value, delay = 0 }: { value: string; delay?: number }) {
  return (
    <span className="oj-odo">
      {value.split("").map((ch, i) => {
        const to = 10 + Number(ch);
        return (
          <span key={i} className="oj-odo-win">
            <span className="oj-odo-strip" style={{ "--to": to, "--dl": `${delay + i * 120}ms` } as Vars}>
              {Array.from({ length: 20 }, (_, n) => (
                <span key={n}>{n % 10}</span>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
}

/* ─── step 1/2 · JSON accuracy (article table) ─── */
const JSON_ACC = [
  { name: "Vision OCR Structured LLM", short: "Structured LLM", v: 0.708, jsl: true, d: 600 },
  { name: "GPT 5.5", short: "GPT 5.5", v: 0.623, jsl: false, d: 5600 },
  { name: "Claude Opus 4.8", short: "Claude Opus 4.8", v: 0.643, jsl: false, d: 8600 },
  { name: "Gemini 3.5 Flash", short: "Gemini 3.5 Flash", v: 0.813, jsl: false, d: 500 },
];
const A_FLOOR = 0.5;
const A_CEIL = 0.9;
const G_H = 500; // gauge interior height in svg units
const G_W = 220;
const yOf = (v: number) => G_H - ((v - A_FLOOR) / (A_CEIL - A_FLOOR)) * G_H;

function Gauge({ x, item, mode }: { x: number; item: (typeof JSON_ACC)[number]; mode: "wait" | "fill" | "static" }) {
  const top = yOf(item.v);
  return (
    <g
      transform={`translate(${x} 0)`}
      className={`oj-gauge is-${mode}${item.jsl ? " is-jsl" : ""}`}
      style={{ "--d": `${item.d}ms` } as Vars}
    >
      {/* braces */}
      <path
        d={`M40 0 C10 0 18 ${G_H * 0.42} 0 ${G_H / 2} C18 ${G_H * 0.58} 10 ${G_H} 40 ${G_H}`}
        className="oj-brace"
      />
      <path
        d={`M${G_W - 40} 0 C${G_W - 10} 0 ${G_W - 18} ${G_H * 0.42} ${G_W} ${G_H / 2} C${G_W - 18} ${G_H * 0.58} ${G_W - 10} ${G_H} ${G_W - 40} ${G_H}`}
        className="oj-brace"
      />
      {mode !== "wait" && (
        <>
          <rect x="34" y={top} width={G_W - 68} height={G_H - top} className="oj-fill" />
          <text x={G_W / 2} y={top - 22} className="oj-val" textAnchor="middle">
            {item.v.toFixed(3)}
          </text>
        </>
      )}
      {mode === "wait" && (
        <text x={G_W / 2} y={G_H / 2 + 20} className="oj-q" textAnchor="middle">
          ?
        </text>
      )}
      <text x={G_W / 2} y={G_H + 52} className={item.jsl ? "oj-name is-jsl" : "oj-name"} textAnchor="middle">
        {item.short}
      </text>
    </g>
  );
}

function Gauges({ reveal }: { reveal: boolean }) {
  const ticks = [0.6, 0.7, 0.8];
  return (
    <svg className="oj-svg" viewBox="-120 -80 1240 660">
      {ticks.map((t) => (
        <g key={t}>
          <line x1="-20" y1={yOf(t)} x2="1100" y2={yOf(t)} className="oj-tick" />
          <text x="-40" y={yOf(t) + 8} className="oj-svg-label" textAnchor="end">
            {t.toFixed(1)}
          </text>
        </g>
      ))}
      <line x1="-20" y1={G_H} x2="1100" y2={G_H} className="oj-base" />
      <text x="-40" y={G_H + 8} className="oj-svg-label" textAnchor="end">
        0.5
      </text>
      {JSON_ACC.map((item, i) => {
        const isGem = i === 3;
        const mode = isGem ? (reveal ? "fill" : "wait") : reveal ? "static" : "fill";
        return <Gauge key={item.name} x={i * 280} item={item} mode={mode} />;
      })}
    </svg>
  );
}

/* ─── step 3 · harness ─── */
const LANES = ["Vision OCR Structured LLM", "GPT 5.5", "Claude Opus 4.8", "Gemini 3.5 Flash"];

export default function OcrJson({ step }: ChapterStepProps) {
  /* step 0 — 100 OmniOCR documents */
  if (step === 0) {
    return (
      <div key={step} className="scene-pad oj-scene oj-open">
        <div className="oj-kicker mono oj-rise">Structured JSON · OmniOCR benchmark</div>
        <div className="oj-hero-row">
          <Odometer value="100" delay={800} />
          <span className="oj-hero-unit serif-it">documents</span>
        </div>
        <div className="oj-ticks">
          {Array.from({ length: 100 }, (_, i) => (
            <span key={i} className={i % 10 === 9 ? "oj-tickdoc is-ten" : "oj-tickdoc"} style={{ "--i": i } as Vars} />
          ))}
        </div>
        <p className="oj-foot mono oj-late0">getomni-ai/ocr-benchmark · pinned revision · test split · the first 100</p>
      </div>
    );
  }

  /* step 1 — 0.708 vs GPT and Claude */
  if (step === 1) {
    return (
      <div key={step} className="scene-pad oj-scene oj-acc">
        <div className="oj-acc-copy">
          <div className="oj-kicker mono oj-rise">JSON field accuracy</div>
          <h1 className="oj-headline oj-print">
            <span className="hero-num oj-em">0.708</span>
          </h1>
          <p className="oj-acc-sub oj-late1a">Vision OCR Structured LLM — ahead of GPT 5.5 and Claude Opus 4.8</p>
          <p className="oj-acc-note mono oj-late1b">matches its published AWS Marketplace figure · 0.714</p>
        </div>
        <Gauges reveal={false} />
      </div>
    );
  }

  /* step 2 — Gemini wins */
  if (step === 2) {
    return (
      <div key={step} className="scene-pad oj-scene oj-acc oj-acc--reveal">
        <div className="oj-acc-copy">
          <div className="oj-kicker mono">JSON field accuracy</div>
          <h1 className="oj-headline oj-headline--sm oj-print">
            <span className="display-en">Gemini wins</span> <span className="serif-it oj-em">this one too.</span>
          </h1>
          <span className="oj-first mono">#1 · 0.813</span>
        </div>
        <Gauges reveal />
      </div>
    );
  }

  /* step 3 — same harness, same prompt, 0 errored */
  return (
    <div key={step} className="scene-pad oj-scene">
      <h1 className="oj-headline oj-headline--sm oj-print">
        <span className="display-en">Their harness.</span> <span className="serif-it oj-em">Same prompt.</span>
      </h1>
      <svg className="oj-svg oj-svg--harness" viewBox="0 0 1720 600">
        <rect x="10" y="20" width="1700" height="560" pathLength={1} className="oj-frame" />
        <text x="34" y="10" className="oj-svg-label oj-svg-label--ink oj-frame-label">VENDOR'S OWN HARNESS · IDENTICAL CONDITIONS</text>

        <g className="oj-prompt">
          <rect x="80" y="210" width="340" height="180" className="oj-paper" />
          <text x="110" y="260" className="oj-svg-label oj-svg-label--ink">PROMPT</text>
          {[300, 330, 360].map((y, i) => (
            <line key={y} x1="110" y1={y} x2={i === 2 ? 290 : 390} y2={y} className="oj-text-line" />
          ))}
        </g>

        {LANES.map((name, i) => {
          const y = 90 + i * 130;
          return (
            <g key={name} style={{ "--i": i } as Vars}>
              <path d={`M420 300 C560 300 600 ${y + 40} 760 ${y + 40}`} pathLength={1} className="oj-lane" />
              <g className="oj-model">
                <rect x="770" y={y} width="520" height="80" className={i === 0 ? "oj-model-box is-jsl" : "oj-model-box"} />
                <text x="796" y={y + 52} className={i === 0 ? "oj-model-name is-jsl" : "oj-model-name"}>
                  {name}
                </text>
              </g>
              <g className="oj-ok">
                <text x="1340" y={y + 52} className="oj-ok-text">
                  0 errored
                </text>
              </g>
            </g>
          );
        })}
      </svg>
      <p className="oj-foot mono oj-late3">same 100 documents for all four · numbers are vendor-measured</p>
    </div>
  );
}
