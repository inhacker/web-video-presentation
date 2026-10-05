import type { CSSProperties, ReactElement } from "react";
import type { ChapterStepProps } from "../../registry/types";
import "./OcrTablesGrounding.css";

/**
 * Chapter 10 · ocr-tables-grounding
 *   step 0  50 mini tables drop into 5 complexity quintiles × 10, simple → very dense
 *   step 1  TEDS-S: a table's text drains away, leaving structure; its tree draws
 *   step 2  TEDS-S columns rise; a dimension bracket measures the +8-point lead
 *   step 3  FUNSD: 50 test forms stack into one complete pile
 *   step 4  IoU: a predicted box slides onto a gold region; ≥ 0.78 = match, else not
 *   step 5  CER inside the matched box: characters compared, one miss, score = 1 − CER
 *   step 6  grounding leaderboard: Vision OCR LLM, Claude, GPT fill in; one slot empty
 *   step 7  Gemini's bar shoots past and the rows swap — it takes #1
 *   step 8  their explanation: tight boxes score, the rest of the page goes unscored
 *   step 9  theirs: full-page coverage — but the coverage figure is "not published"
 *
 * Every step root carries key={step} so its CSS animations replay.
 * Data: article §Table Structure Recognition, §Bounding-Box Grounding.
 * Steps 1, 4, 5, 8, 9 use illustrative tables / boxes / strings (labeled on screen).
 */

type Vars = CSSProperties & Record<`--${string}`, string | number>;

/* ─── step 0 · 50 tables in 5 quintiles (article: PubTabNet val, 5 × 10) ─── */
const THUMB_W = 130;
const THUMB_H = 80;
function MiniTable({ q, k }: { q: number; k: number }) {
  const rows = 2 + q + (k % 3 === 0 ? 1 : 0);
  const cols = 2 + q + (k % 2);
  const lines: ReactElement[] = [];
  for (let r = 1; r < rows; r++) {
    const y = (THUMB_H / rows) * r;
    lines.push(<line key={`r${r}`} x1="0" y1={y} x2={THUMB_W} y2={y} className="ot-mini-line" />);
  }
  for (let c = 1; c < cols; c++) {
    const x = (THUMB_W / cols) * c;
    // dense tables get spanning cells: skip the first row segment on some columns
    const span = q >= 2 && (c + k) % 3 === 0;
    const y1 = span ? THUMB_H / rows : 0;
    lines.push(<line key={`c${c}`} x1={x} y1={y1} x2={x} y2={THUMB_H} className="ot-mini-line" />);
  }
  return (
    <>
      <rect x="0" y="0" width={THUMB_W} height={THUMB_H / rows} className="ot-mini-head" />
      <rect x="0" y="0" width={THUMB_W} height={THUMB_H} className="ot-mini-frame" />
      {lines}
    </>
  );
}

/* ─── step 1 · illustrative table → structure tree ─── */
const TABLE = [
  ["Drug", "Dose", "Route"],
  ["Aspirin", "81 mg", "oral"],
  ["Heparin", "5000 U", "SC"],
];

/* ─── step 2 · TEDS-S (article table) ─── */
const TEDS = [
  { name: "Vision OCR LLM", v: 0.784, jsl: true, d: 600 },
  { name: "GPT 5.5", v: 0.704, jsl: false, d: 4200 },
  { name: "Claude Opus 4.8", v: 0.684, jsl: false, d: 6000 },
  { name: "Gemini 3.5 Flash", v: 0.668, jsl: false, d: 6200 },
];
const T_FLOOR = 0.6;
const T_PX = 2300; // px per 1.0 → 23 px per 0.01

/* ─── step 6/7 · FUNSD 1 − canonical CER (article table) ─── */
const GROUND = [
  { name: "Vision OCR LLM", v: 0.938, jsl: true, d: 400 },
  { name: "Claude Opus 4.8", v: 0.921, jsl: false, d: 4200 },
  { name: "GPT 5.5", v: 0.848, jsl: false, d: 6600 },
];
const GEMINI = { name: "Gemini 3.5 Flash", v: 0.968 };
const G_FLOOR = 0.8;
const G_PX = 5000; // px per 1.0 → 1000 px across 0.80–1.00
const ROW_H = 140;

/* ─── step 4 · IoU demo (illustrative) ─── */
const IOU_THRESHOLD = 0.78;

/* ─── step 5 · CER demo (illustrative) ─── */
const GOLD = "penicillin";
const READ = "penicilin"; // one character dropped
const MISS = 7; // index of the dropped "l"

/* ─── step 8/9 · a page of text lines (illustrative) ─── */
const PAGE_LINES = [300, 250, 320, 180, 290, 310, 220, 300, 260, 200, 310, 240];
const TIGHT = [1, 4, 8]; // the only regions a partial reader returns
function Page({ x, mode }: { x: number; mode: "partial" | "full" | "partial-dim" }) {
  return (
    <g transform={`translate(${x} 0)`} className={`ot-page ot-page--${mode}`}>
      <rect x="0" y="0" width="400" height="560" className="ot-paper" />
      {PAGE_LINES.map((w, i) => {
        const y = 44 + i * 40;
        const tight = TIGHT.includes(i);
        const boxed = mode === "full" || tight;
        return (
          <g key={i}>
            <rect x="36" y={y} width={w} height="14" className="ot-text-line" />
            {!boxed && (
              <rect x="26" y={y - 10} width={w + 20} height="34" className="ot-unscored" style={{ "--i": i } as Vars} />
            )}
            {boxed && (
              <rect
                x="28"
                y={y - 8}
                width={w + 16}
                height="30"
                pathLength={1}
                className={tight ? "ot-gbox is-tight" : "ot-gbox"}
                style={{ "--i": mode === "full" ? i : TIGHT.indexOf(i) } as Vars}
              />
            )}
          </g>
        );
      })}
    </g>
  );
}

export default function OcrTablesGrounding({ step }: ChapterStepProps) {
  /* step 0 — 50 tables, balanced */
  if (step === 0) {
    return (
      <div key={step} className="scene-pad ot-scene">
        <h1 className="ot-headline ot-print">
          <span className="display-en">Take tables.</span>{" "}
          <span className="serif-it ot-em">50 from PubTabNet.</span>
        </h1>
        <svg className="ot-svg" viewBox="0 0 1720 600">
          {Array.from({ length: 5 }, (_, q) => (
            <g key={q} transform={`translate(${q * 356} 20)`}>
              {Array.from({ length: 10 }, (_, k) => (
                <g
                  key={k}
                  className="ot-thumb"
                  style={{ "--d": `${1200 + q * 350 + k * 40}ms` } as Vars}
                  transform={`translate(${(k % 2) * (THUMB_W + 16)} ${Math.floor(k / 2) * (THUMB_H + 16)})`}
                >
                  <MiniTable q={q} k={k} />
                </g>
              ))}
              <text x={THUMB_W + 8} y="510" className="ot-svg-label ot-svg-label--ink ot-qlabel" textAnchor="middle">
                Q{q + 1} · 10
              </text>
            </g>
          ))}
          <g className="ot-axis-g">
            <line x1="0" y1="560" x2="1680" y2="560" className="ot-axis-arrow" />
            <path d="M1664 548 L1688 560 L1664 572" className="ot-axis-head" />
            <text x="0" y="596" className="ot-svg-label">SIMPLE</text>
            <text x="1688" y="596" className="ot-svg-label ot-svg-label--accent" textAnchor="end">VERY DENSE</text>
          </g>
        </svg>
        <p className="ot-foot mono ot-late0">PubTabNet validation · ranked by spanning cells, rows, cells · 10 sampled per quintile</p>
      </div>
    );
  }

  /* step 1 — TEDS-S checks structure */
  if (step === 1) {
    return (
      <div key={step} className="scene-pad ot-scene ot-teds">
        <div className="ot-teds-head">
          <h1 className="hero-num ot-teds-hero ot-print">TEDS-S</h1>
          <p className="ot-teds-sub ot-late1">
            tree-edit-distance similarity · <span className="ot-em">structure only</span>
          </p>
        </div>
        <svg className="ot-svg" viewBox="0 0 1720 470">
          {/* the table, text draining out */}
          <g transform="translate(0 40)">
            {TABLE.map((row, r) =>
              row.map((cell, c) => (
                <g key={`${r}-${c}`}>
                  <rect x={c * 200} y={r * 110} width="200" height="110" className={r === 0 ? "ot-cell is-head" : "ot-cell"} />
                  <text x={c * 200 + 24} y={r * 110 + 66} className="ot-cell-text">
                    {cell}
                  </text>
                </g>
              )),
            )}
          </g>
          <path d="M660 205 L800 205" className="ot-arrow" pathLength={1} />
          <path d="M786 193 L804 205 L786 217" className="ot-arrow-head" />
          {/* the structure tree: table → rows → cells */}
          <g className="ot-tree">
            <circle cx="1240" cy="60" r="16" className="ot-node is-root" />
            <text x="1270" y="68" className="ot-svg-label ot-svg-label--ink">TABLE</text>
            {[0, 1, 2].map((r) => {
              const rx = 1000 + r * 240;
              return (
                <g key={r}>
                  <line x1="1240" y1="76" x2={rx} y2="194" className="ot-edge" pathLength={1} style={{ "--i": r } as Vars} />
                  <circle cx={rx} cy="210" r="13" className="ot-node" style={{ "--i": r } as Vars} />
                  {[0, 1, 2].map((c) => {
                    const cx = rx - 70 + c * 70;
                    return (
                      <g key={c}>
                        <line x1={rx} y1="223" x2={cx} y2="340" className="ot-edge ot-edge--leaf" pathLength={1} style={{ "--i": r * 3 + c } as Vars} />
                        <rect x={cx - 11} y="340" width="22" height="22" className="ot-leaf" style={{ "--i": r * 3 + c } as Vars} />
                      </g>
                    );
                  })}
                </g>
              );
            })}
            <text x="1000" y="410" className="ot-svg-label">ROWS → CELLS · SPANS · ORDER</text>
          </g>
        </svg>
        <p className="ot-foot mono ot-late1b">illustrative table · the text is ignored, only the grid is scored</p>
      </div>
    );
  }

  /* step 2 — 0.784 vs 0.704 */
  if (step === 2) {
    const hOf = (v: number) => (v - T_FLOOR) * T_PX;
    const hJ = hOf(0.784);
    const hG = hOf(0.704);
    return (
      <div key={step} className="scene-pad ot-scene ot-cols-scene">
        <div className="ot-cols-copy">
          <div className="ot-kicker mono ot-rise">Table structure · TEDS-S</div>
          <h1 className="ot-headline ot-headline--sm ot-print">
            <span className="display-en">Eight points</span> <span className="serif-it ot-em">clear.</span>
          </h1>
          <p className="ot-cols-note ot-late2">“Leads the frontier on table structure, privately.”<span className="mono ot-by">— their words</span></p>
        </div>
        <div className="ot-cols">
          <div className="ot-guide" style={{ bottom: `${hJ + 72}px` }} />
          <div className="ot-dim" style={{ bottom: `${hG + 72}px`, height: `${hJ - hG}px` }}>
            <span className="ot-dim-label serif-it">+8 pts</span>
          </div>
          {TEDS.map((t) => (
            <div key={t.name} className={t.jsl ? "ot-col is-jsl" : "ot-col"} style={{ "--d": `${t.d}ms` } as Vars}>
              <span className="ot-col-val">{t.v.toFixed(3)}</span>
              <div className="ot-col-bar" style={{ height: `${hOf(t.v)}px` }} />
              <span className="ot-col-name mono">{t.name}</span>
            </div>
          ))}
        </div>
        <p className="ot-foot mono ot-late2b ot-cols-foot">same 50 tables for all four · axis from 0.60</p>
      </div>
    );
  }

  /* step 3 — FUNSD, all 50 forms */
  if (step === 3) {
    return (
      <div key={step} className="scene-pad ot-scene ot-funsd">
        <div className="ot-funsd-copy">
          <div className="ot-kicker mono ot-rise">Grounding · FUNSD 2019 test split</div>
          <div className="ot-funsd-num">
            <span className="display-en">all</span> <span className="hero-num ot-em">50</span>
          </div>
          <p className="ot-funsd-sub ot-late3">test forms — the complete set, not a sub-sample</p>
        </div>
        <div className="ot-pile">
          {Array.from({ length: 50 }, (_, i) => (
            <span key={i} className="ot-sheet" style={{ "--i": i, "--j": ((i * 7) % 5) - 2 } as Vars} />
          ))}
        </div>
      </div>
    );
  }

  /* step 4 — IoU ≥ 0.78 */
  if (step === 4) {
    const meterW = 520;
    return (
      <div key={step} className="scene-pad ot-scene">
        <h1 className="ot-headline ot-headline--sm ot-print">
          <span className="display-en">Match the box.</span> <span className="serif-it ot-em">Overlap ≥ 0.78.</span>
        </h1>
        <div className="ot-iou-grid">
          {[
            { cls: "is-hit", iou: 0.83, verdict: "match" },
            { cls: "is-miss", iou: 0.53, verdict: "no match" },
          ].map((ex) => (
            <div key={ex.cls} className={`ot-iou ${ex.cls}`}>
              <div className="ot-iou-stage">
                <div className="ot-gold">
                  <span className="mono">penicillin</span>
                </div>
                <div className="ot-pred" />
              </div>
              <div className="ot-iou-meter">
                <span className="ot-iou-label mono">IoU · overlap ÷ union</span>
                <div className="ot-iou-track" style={{ width: meterW }}>
                  <div className="ot-iou-fill" style={{ width: ex.iou * meterW }} />
                  <span className="ot-iou-tick" style={{ left: IOU_THRESHOLD * meterW }}>
                    <span className="mono">0.78</span>
                  </span>
                </div>
                <span className="ot-iou-val mono">{ex.iou.toFixed(2)}</span>
              </div>
              <span className="ot-verdict mono">{ex.verdict}</span>
            </div>
          ))}
        </div>
        <p className="ot-foot mono ot-late4">solid = gold region · dashed = predicted box · illustrative values</p>
      </div>
    );
  }

  /* step 5 — read the text inside */
  if (step === 5) {
    return (
      <div key={step} className="scene-pad ot-scene ot-cer">
        <div className="ot-kicker mono ot-rise">Inside the matched box</div>
        <div className="ot-cer-rows">
          <div className="ot-cer-row">
            <span className="ot-cer-tag mono">gold</span>
            <span className="ot-chars mono">
              {GOLD.split("").map((ch, i) => (
                <span key={i} className={i === MISS ? "ot-ch is-miss" : "ot-ch"} style={{ "--i": i } as Vars}>
                  {ch}
                </span>
              ))}
            </span>
          </div>
          <div className="ot-cer-row">
            <span className="ot-cer-tag mono">read</span>
            <span className="ot-chars mono">
              {GOLD.split("").map((_, i) => {
                const ch = i < MISS ? READ[i] : i === MISS ? "·" : READ[i - 1];
                return (
                  <span key={i} className={i === MISS ? "ot-ch is-gap" : "ot-ch"} style={{ "--i": i } as Vars}>
                    {ch}
                  </span>
                );
              })}
            </span>
          </div>
        </div>
        <div className="ot-formula">
          <span className="mono">CER = 1 / 10</span>
          <span className="ot-formula-eq serif-it">score = 1 − CER</span>
        </div>
        <p className="ot-foot mono ot-late5">character error rate · illustrative string</p>
      </div>
    );
  }

  /* steps 6–7 — grounding leaderboard, then the swap */
  if (step === 6 || step === 7) {
    const swap = step === 7;
    const wOf = (v: number) => (v - G_FLOOR) * G_PX;
    const rows = [...GROUND, { ...GEMINI, jsl: false, d: 0 }];
    return (
      <div key={step} className={swap ? "scene-pad ot-scene ot-board is-swap" : "scene-pad ot-scene ot-board"}>
        <h1 className="ot-headline ot-headline--sm ot-print">
          {swap ? (
            <>
              <span className="display-en">But Gemini</span> <span className="serif-it ot-em">scores higher.</span>
            </>
          ) : (
            <>
              <span className="display-en">Grounding:</span> <span className="serif-it ot-em">0.938.</span>
            </>
          )}
        </h1>
        <div className="ot-board-chart" style={{ height: ROW_H * 4 }}>
          {rows.map((r, i) => {
            const isGem = i === 3;
            const rank = swap ? (isGem ? 0 : i + 1) : i;
            return (
              <div
                key={r.name}
                className={`ot-brow${r.jsl ? " is-jsl" : ""}${isGem ? " is-gem" : ""}`}
                style={{ "--from": `${i * ROW_H}px`, "--to": `${rank * ROW_H}px`, "--d": `${r.d}ms` } as Vars}
              >
                <span className="ot-brow-name">{r.name}</span>
                <div className="ot-brow-track">
                  <div className="ot-brow-bar" style={{ width: wOf(r.v) }} />
                  {isGem && !swap && <span className="ot-brow-q mono">?</span>}
                </div>
                <span className="ot-brow-val mono">{isGem && !swap ? "" : r.v.toFixed(3)}</span>
                {isGem && swap && <span className="ot-first mono">#1</span>}
              </div>
            );
          })}
        </div>
        <p className="ot-foot mono ot-late6">FUNSD · 1 − canonical CER · higher is better · axis from 0.80</p>
      </div>
    );
  }

  /* step 8 — their explanation: tight regions only */
  if (step === 8) {
    return (
      <div key={step} className="scene-pad ot-scene ot-cover">
        <div className="ot-cover-copy">
          <div className="ot-kicker mono ot-rise">Their explanation</div>
          <p className="ot-cover-quote serif-it ot-print-slow">
            &ldquo;Canonical CER rewards only <span className="ot-em">tightly localized</span> regions&rdquo;
          </p>
          <p className="ot-cover-sub ot-late8">
            So a high score <span className="ot-em">can mean partial page coverage.</span>
          </p>
        </div>
        <svg className="ot-cover-svg" viewBox="0 0 420 650">
          <Page x={10} mode="partial" />
          <text x="10" y="604" className="ot-svg-label ot-svg-label--accent ot-late8b">HATCH = NOT SCORED</text>
          <text x="10" y="638" className="ot-svg-label ot-late8b">ILLUSTRATIVE PAGE</text>
        </svg>
      </div>
    );
  }

  /* step 9 — full page, unpublished coverage */
  return (
    <div key={step} className="scene-pad ot-scene ot-cover">
      <div className="ot-cover-copy">
        <div className="ot-kicker mono ot-rise">Their claim</div>
        <p className="ot-cover-quote serif-it">
          &ldquo;the only model here that pairs a top-tier score with <span className="ot-em">full-page coverage</span>&rdquo;
        </p>
        <div className="ot-np">
          <span className="ot-np-label mono">Coverage, per model</span>
          <span className="ot-np-stamp mono">not published</span>
        </div>
      </div>
      <svg className="ot-cover-svg ot-cover-svg--two" viewBox="0 0 860 650">
        <Page x={10} mode="partial-dim" />
        <Page x={450} mode="full" />
        <text x="10" y="604" className="ot-svg-label">PARTIAL</text>
        <text x="450" y="604" className="ot-svg-label ot-svg-label--accent">FULL PAGE</text>
        <text x="10" y="638" className="ot-svg-label">ILLUSTRATIVE PAGES</text>
      </svg>
    </div>
  );
}
