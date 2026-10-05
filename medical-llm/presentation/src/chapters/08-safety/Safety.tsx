import type { CSSProperties } from "react";
import type { ChapterStepProps } from "../../registry/types";
import "./Safety.css";

/**
 * Chapter 8 · safety
 *   step 0  Medium's 8 OpenMed suite bars level out into one average line
 *   step 1  OpenMed: three frontier dots merge into their average; Medium lands 0.85 ahead
 *   step 2  MedHELM on the same scale: the gap bracket stretches to 5.37
 *   step 3  waffle of 1,000 red-team questions sweeps in, column by column
 *   step 4  940 of them ink in as "passed" → 94%
 *   step 5  frontier pass-count bars grow one by one, shortfall vs Medium marked
 *   step 6  vendor's verdict prints; Small's row draws in as "not reported"
 *   step 7  Med-Hallu columns rise; both JSL models clear the best-frontier line
 *
 * Every step root carries key={step} so its CSS animations replay.
 * Data: article §How the Models Compare, §Red-Teaming, §OpenMed, §MedHELM.
 */

type Vars = CSSProperties & Record<`--${string}`, string | number>;

/* ─── step 0 · Medium OpenMed suites (article §OpenMed table) ─── */
const SUITES = [
  { k: "MedQA", v: 96.2 },
  { k: "PubMedQA", v: 82 },
  { k: "Anatomy", v: 93.5 },
  { k: "Clin. Knowl.", v: 97.5 },
  { k: "Coll. Bio", v: 94.3 },
  { k: "Coll. Med", v: 93.4 },
  { k: "Med. Gen.", v: 99 },
  { k: "Prof. Med", v: 96 },
];
const OPENMED_AVG = 93.99;
const LEVEL_FLOOR = 70; // bar axis starts at 70 so the spread is visible

/* ─── step 1/2 · number lines on ONE shared scale (200px per point) ─── */
const PX = 200;
const X0 = 220; // x of the frontier average on both rows
interface Row {
  y: number;
  avg: number;
  jsl: number;
  dots: number[];
  ticks: number[];
  gap: string;
  name: string;
  who: string[];
}
const ROW_A: Row = { y: 120, avg: 93.14, jsl: 93.99, dots: [92.94, 93.21, 93.28], ticks: [93, 94], gap: "+0.85", name: "OPENMED", who: ["Gemini 3.5 Flash", "Claude Opus 4.8", "GPT 5.5"] };
const ROW_B: Row = {
  y: 360,
  avg: 72.41,
  jsl: 77.78,
  dots: [71.61, 72.06, 73.56],
  ticks: [72, 73, 74, 75, 76, 77, 78],
  gap: "+5.37",
  name: "MEDHELM",
  who: ["Gemini 3.5 Flash", "Claude Opus 4.8", "GPT 5.5"],
};
const xOf = (row: Row, v: number) => X0 + (v - row.avg) * PX;

function NumberLine({ row, live, zoom = 1, dx = 0 }: { row: Row; live: boolean; zoom?: number; dx?: number }) {
  const xs = row.ticks.map((t) => xOf(row, t));
  const xMin = Math.min(...xs, ...row.dots.map((d) => xOf(row, d))) - 50;
  const xMax = Math.max(...xs, xOf(row, row.jsl)) + 60;
  const xj = xOf(row, row.jsl);
  return (
    <g className={live ? "sf-row is-live" : "sf-row is-past"}>
      {/* zoom scales the line about the frontier-average point; the legend stays put */}
      <g transform={zoom === 1 && dx === 0 ? undefined : `translate(${X0 + dx} ${row.y}) scale(${zoom}) translate(${-X0} ${-row.y})`}>
      <line x1={xMin} y1={row.y} x2={xMax} y2={row.y} className="sf-axis" />
      {row.ticks.map((t) => (
        <g key={t}>
          <line x1={xOf(row, t)} y1={row.y - 10} x2={xOf(row, t)} y2={row.y + 10} className="sf-tick" />
          <text x={xOf(row, t)} y={row.y + 48} className="sf-svg-label" textAnchor="middle">
            {t}
          </text>
        </g>
      ))}
      <text x={xMax + 30} y={row.y + 9} className="sf-row-name">
        {row.name}
      </text>

      {/* three frontier models slide together into their average */}
      {row.dots.map((d) => (
        <circle
          key={d}
          cx={xOf(row, d)}
          cy={row.y}
          r="13"
          className="sf-fdot"
          style={{ "--dx": `${X0 - xOf(row, d)}px` } as Vars}
        />
      ))}
      <circle cx={X0} cy={row.y} r="20" className="sf-favg" />
      <text x={X0 + 14} y={row.y - 40} className="sf-svg-label sf-svg-label--ink sf-favg-label" textAnchor="end">
        FRONTIER AVG
      </text>

      {/* Medium lands */}
      <g className="sf-jsl-g">
        <rect x={xj - 18} y={row.y - 18} width="36" height="36" className="sf-jsl" transform={`rotate(45 ${xj} ${row.y})`} />
      </g>
      <text x={xj - 14} y={row.y - 40} className="sf-svg-label sf-svg-label--accent sf-jsl-label" textAnchor="start">
        MEDIUM
      </text>

      {/* gap bracket */}
      <line x1={X0} y1={row.y + 78} x2={xj} y2={row.y + 78} className="sf-gap" pathLength={1} />
      <text x={(X0 + xj) / 2} y={row.y + 124} className="sf-gap-label" textAnchor="middle">
        {row.gap}
      </text>
      </g>

      {/* the three frontier scores behind the average */}
      {live && (
        <g className="sf-legend">
          {[...row.dots].reverse().map((d, i) => (
            <g key={d}>
              <text x="1040" y={44 + i * 46} className="sf-legend-name">{row.who[row.dots.length - 1 - i]}</text>
              <text x="1720" y={44 + i * 46} className="sf-legend-val" textAnchor="end">{d}</text>
            </g>
          ))}
          <line x1="1040" y1="172" x2="1720" y2="172" className="sf-legend-rule" />
          <text x="1040" y="214" className="sf-legend-name sf-legend-avg">frontier avg</text>
          <text x="1720" y="214" className="sf-legend-val sf-legend-avg" textAnchor="end">{row.avg}</text>
        </g>
      )}
    </g>
  );
}

/* ─── step 3/4 · 1,000-question waffle (50 columns × 20 rows) ─── */
const COLS = 50;
const ROWS = 20;
const PASS_COLS = 47; // 47 × 20 = 940 passed

function Waffle({ mode }: { mode: "fill" | "pass" }) {
  return (
    <svg className="sf-waffle" viewBox="0 0 1000 400">
      {Array.from({ length: COLS }, (_, c) => (
        <g
          key={c}
          className={mode === "fill" ? "sf-wcol" : c < PASS_COLS ? "sf-wcol is-pass" : "sf-wcol is-fail"}
          style={{ "--c": c } as Vars}
        >
          {Array.from({ length: ROWS }, (_, r) => (
            <circle key={r} cx={10 + c * 20} cy={10 + r * 20} r="7" />
          ))}
        </g>
      ))}
    </svg>
  );
}

/* ─── step 5 · red-team pass counts (article §Red-Teaming) ─── */
const RED = [
  { name: "Medical LLM Medium", n: 940, pct: "94%", jsl: true, d: 0 },
  { name: "GPT 5.5", n: 850, pct: "85%", jsl: false, d: 1700 },
  { name: "Claude Opus 4.8", n: 830, pct: "83%", jsl: false, d: 5200 },
  { name: "Gemini 3.5 Flash", n: 790, pct: "79%", jsl: false, d: 8600 },
];
const BAR_W = 1000; // px for 1,000 questions

/* ─── step 7 · Med-Hallu (article §MedHELM table, last row) ─── */
const HALLU: { name: string; label?: string; v: number; jsl: boolean }[] = [
  { name: "Medium", v: 96, jsl: true },
  { name: "Small", v: 95, jsl: true },
  { name: "GPT 5.5", v: 92, jsl: false },
  { name: "Claude Opus 4.8", label: "Opus 4.8", v: 92, jsl: false },
  { name: "Gemini 3.5 Flash", label: "Gemini 3.5", v: 90, jsl: false },
];
const H_FLOOR = 85;
const H_PX = 44; // px per point

export default function Safety({ step }: ChapterStepProps) {
  /* step 0 — step back: the spread levels into an average */
  if (step === 0) {
    const maxH = 470;
    const hOf = (v: number) => ((v - LEVEL_FLOOR) / (100 - LEVEL_FLOOR)) * maxH;
    return (
      <div key={step} className="scene-pad sf-scene sf-level">
        <h1 className="sf-headline sf-print">
          <span className="display-en">Step back.</span>{" "}
          <span className="serif-it sf-em">Look at averages.</span>
        </h1>
        <div className="sf-level-chart">
          <div className="sf-avg-line" style={{ bottom: `${hOf(OPENMED_AVG) + 60}px` }}>
            <span className="sf-avg-tag mono">avg 93.99</span>
          </div>
          {SUITES.map((s, i) => (
            <div key={s.k} className="sf-lcol">
              <span className="sf-lval mono">{s.v}</span>
              <div
                className="sf-lbar"
                style={{ "--h0": `${hOf(s.v)}px`, "--h1": `${hOf(OPENMED_AVG)}px`, "--i": i } as Vars}
              />
              <span className="sf-lname mono">{s.k}</span>
            </div>
          ))}
        </div>
        <p className="sf-foot mono sf-late0">Medium · 8 OpenMed suites · axis from 70</p>
      </div>
    );
  }

  /* step 1 — OpenMed averages */
  if (step === 1) {
    return (
      <div key={step} className="scene-pad sf-scene sf-avgs">
        <div className="sf-kicker mono sf-rise">OpenMed · average score</div>
        <div className="sf-pair">
          <div className="sf-pair-item">
            <span className="sf-pair-who">Three frontier models</span>
            <span className="hero-num sf-pair-num">93.14</span>
          </div>
          <div className="sf-pair-item sf-pair-item--jsl">
            <span className="sf-pair-who">Medical LLM Medium</span>
            <span className="hero-num sf-pair-num sf-em">93.99</span>
          </div>
        </div>
        <svg className="sf-lines sf-lines--solo" viewBox="0 0 1720 380">
          <NumberLine row={ROW_A} live zoom={1.5} dx={56} />
        </svg>
      </div>
    );
  }

  /* step 2 — MedHELM averages, same scale */
  if (step === 2) {
    return (
      <div key={step} className="scene-pad sf-scene sf-avgs sf-avgs--b">
        <div className="sf-kicker mono sf-rise">MedHELM · mean win rate, averaged</div>
        <div className="sf-pair">
          <div className="sf-pair-item">
            <span className="sf-pair-who">Three frontier models</span>
            <span className="hero-num sf-pair-num">72.41</span>
          </div>
          <div className="sf-pair-item sf-pair-item--jsl">
            <span className="sf-pair-who">Medical LLM Medium</span>
            <span className="hero-num sf-pair-num sf-em">77.78</span>
          </div>
        </div>
        <svg className="sf-lines" viewBox="0 0 1720 500">
          <NumberLine row={ROW_A} live={false} />
          <NumberLine row={ROW_B} live />
          <text x="1720" y="496" className="sf-svg-label sf-late2" textAnchor="end">
            SAME SCALE ON BOTH LINES
          </text>
        </svg>
      </div>
    );
  }

  /* step 3 — 1,000 adversarial questions */
  if (step === 3) {
    return (
      <div key={step} className="scene-pad sf-scene sf-red">
        <div className="sf-red-copy">
          <div className="sf-kicker mono sf-rise">Red-teaming</div>
          <div className="hero-num sf-red-hero">1,000</div>
          <div className="sf-red-sub">adversarial questions</div>
          <hr className="rule sf-red-rule" />
          <div className="sf-red-cats sf-late3">
            <span className="hero-num sf-red-148">148</span>
            <span className="sf-red-sub">medical categories</span>
          </div>
        </div>
        <Waffle mode="fill" />
      </div>
    );
  }

  /* step 4 — ~940 passed */
  if (step === 4) {
    return (
      <div key={step} className="scene-pad sf-scene sf-red">
        <div className="sf-red-copy">
          <div className="sf-kicker mono">Medical LLM Medium</div>
          <div className="sf-red-passed sf-rise">
            passed <span className="sf-em">~940</span>
          </div>
          <div className="hero-num sf-red-pct sf-stamp-in">94%</div>
        </div>
        <Waffle mode="pass" />
      </div>
    );
  }

  /* step 5 — the frontier trails */
  if (step === 5) {
    const x940 = (940 / 1000) * BAR_W;
    return (
      <div key={step} className="scene-pad sf-scene sf-race">
        <h1 className="sf-headline sf-headline--sm sf-print">
          <span className="display-en">The frontier</span> <span className="serif-it sf-em">trails.</span>
        </h1>
        <div className="sf-race-chart">
          <div className="sf-race-mark" style={{ left: `calc(var(--name-w) + ${x940}px)` }} />
          {RED.map((r) => {
            const w = (r.n / 1000) * BAR_W;
            return (
              <div key={r.name} className={r.jsl ? "sf-race-row is-jsl" : "sf-race-row"} style={{ "--d": `${r.d}ms` } as Vars}>
                <span className="sf-race-name">{r.name}</span>
                <div className="sf-race-track" style={{ width: `${BAR_W}px` }}>
                  <div className="sf-race-bar" style={{ width: `${w}px` }} />
                  {!r.jsl && (
                    <div className="sf-race-short" style={{ left: `${w}px`, width: `${x940 - w}px` }}>
                      <span className="mono">−{940 - r.n}</span>
                    </div>
                  )}
                </div>
                <span className="sf-race-val">
                  <span className="mono">{r.n}</span>
                  <em className="mono">{r.pct}</em>
                </span>
              </div>
            );
          })}
        </div>
        <p className="sf-foot mono sf-rise">passed, out of 1,000 · bars to scale</p>
      </div>
    );
  }

  /* step 6 — their read; Small not reported */
  if (step === 6) {
    return (
      <div key={step} className="scene-pad sf-scene sf-verdict">
        <div className="sf-verdict-quote">
          <div className="sf-kicker mono sf-rise">Their read</div>
          <p className="sf-quote serif-it sf-print-slow">
            &ldquo;the{" "}
            <span className="sf-quote-hit">
              most robust model
              <span className="sf-underline" />
            </span>{" "}
            in this evaluation&rdquo;
          </p>
          <p className="sf-quote-sub sf-late6a">
            &ldquo;outperforming larger private models despite its smaller size&rdquo;
            <span className="mono sf-by">— vendor, on Medium</span>
          </p>
        </div>
        <div className="sf-ledger">
          <div className="sf-kicker mono">Red-team pass rate</div>
          <div className="sf-ledger-row">
            <span className="sf-ledger-name">Medium</span>
            <span className="hero-num sf-ledger-num sf-em">94%</span>
          </div>
          <hr className="rule" />
          <div className="sf-ledger-row">
            <span className="sf-ledger-name">Small</span>
            <span className="sf-na">
              <svg className="sf-na-box" viewBox="0 0 300 120" preserveAspectRatio="none">
                <rect x="3" y="3" width="294" height="114" pathLength={1} className="sf-na-rect" />
              </svg>
              <span className="sf-na-stamp mono">not reported</span>
            </span>
          </div>
        </div>
      </div>
    );
  }

  /* step 7 — hallucination */
  const yBest = (92 - H_FLOOR) * H_PX;
  return (
    <div key={step} className="scene-pad sf-scene sf-hallu">
      <h1 className="sf-headline sf-headline--sm sf-print">
        <span className="display-en">Hallucination:</span> <span className="serif-it sf-em">both rank first.</span>
      </h1>
      <div className="sf-hallu-body">
        <div className="sf-hcols">
          <div className="sf-hbest" style={{ bottom: `${yBest + 64}px` }}>
            <span className="mono">best frontier · 92</span>
          </div>
          {HALLU.map((h, i) => (
            <div key={h.name} className={h.jsl ? "sf-hcol is-jsl" : "sf-hcol"} style={{ "--i": i } as Vars}>
              <span className="sf-hval">{h.v}</span>
              <div className="sf-hbar" style={{ height: `${(h.v - H_FLOOR) * H_PX}px` }} />
              <span className="sf-hname mono">{h.label ?? h.name}</span>
            </div>
          ))}
        </div>
        <div className="sf-hallu-quote sf-late7">
          <div className="sf-kicker mono">Their words</div>
          <p className="serif-it">&ldquo;the metric that decides whether a model is safe in front of clinicians&rdquo;</p>
          <span className="mono sf-by">Med-Hallu · MedHELM · axis from 85</span>
        </div>
      </div>
    </div>
  );
}
