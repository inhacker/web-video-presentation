import type { CSSProperties } from "react";
import type { ChapterStepProps } from "../../registry/types";
import "./Medhelm.css";

/**
 * Chapter 6 · medhelm  (article §JSL-LLM MedHELM Benchmark Analysis + table)
 *   step 0  exam answer sheet recedes; a clinical note writes itself
 *   step 1  thirteen task tiles dealt; five areas light as they are spoken
 * Audio (s): 6.1 8.2 6.9 11.8 7.1 10.2 — motion ends ≥0.6s earlier.
 */

type Vars = CSSProperties & Record<`--${string}`, string | number>;

/* ─── article §MedHELM table — Medium vs. best frontier (GPT 5.5 / Opus 4.8 / Gemini 3.5 Flash) ─── */
const TASKS: Array<{ n: string; m: number; f: number }> = [
  { n: "MedCalc", m: 48, f: 44 },
  { n: "MTSamples Proc.", m: 73.8, f: 72 },
  { n: "Medec", m: 85, f: 70 },
  { n: "HeadQA", m: 93.9, f: 91.2 },
  { n: "Medbullets", m: 90, f: 89 },
  { n: "ACI-Bench", m: 85.2, f: 83.9 },
  { n: "MedicationQA", m: 80.9, f: 71.4 },
  { n: "MedDialog", m: 76.3, f: 76.2 },
  { n: "PubMedQA", m: 82, f: 76 },
  { n: "EHRSQL", m: 34, f: 29 },
  { n: "MediQA", m: 78.1, f: 76.9 },
  { n: "RaceBias", m: 88, f: 91 },
  { n: "Med-Hallu", m: 96, f: 92 },
];

/* article §MedHELM table · mean win rate; d = when its column rises (ms) */
const BOARD = [
  { n: "Medical LLM Medium", v: 77.78, d: 600 },
  { n: "GPT 5.5", v: 73.56, d: 3000 },
  { n: "Claude Opus 4.8", v: 72.06, d: 3300 },
  { n: "Gemini 3.5 Flash", v: 71.61, d: 3600 },
  { n: "Medical LLM Small", v: 70.95, d: 3900 },
];

/* ILLUSTRATIVE ONLY — one model's head-to-heads: 4 rivals × 6 tasks, 17 wins */
const DUEL = [
  [1, 1, 0, 1, 1, 0],
  [1, 0, 1, 1, 1, 1],
  [0, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 0, 1],
];

/* article §MedHELM table · Medec EM, the other two frontier models */
const MEDEC_REST = [
  { n: "GPT 5.5", v: 68 },
  { n: "Claude Opus 4.8", v: 67 },
];

/* spoken-word timings (ms) for step 1's five areas */
const CATS = [
  { w: "documentation", on: 2500 },
  { w: "coding", on: 3500 },
  { w: "safety", on: 4400 },
  { w: "dialogue", on: 5300 },
  { w: "reasoning", on: 6300 },
];

/* ─── step 0 · exam sheet → clinical note ─── */
function ExamToWard() {
  const qs = [0, 1, 2];
  const notes = [
    { h: "HPI", y: 150, lines: [520, 430] },
    { h: "MEDS", y: 290, lines: [470, 360] },
    { h: "PLAN", y: 430, lines: [540, 300] },
  ];
  let k = 0;
  return (
    <svg className="mh-svg" viewBox="0 0 1720 640">
      <g className="mh-exam">
        <rect x="80" y="70" width="560" height="470" className="mh-paper" />
        {qs.map((q) => (
          <g key={q}>
            <line x1="120" y1={130 + q * 140} x2={q === 1 ? 480 : 590} y2={130 + q * 140} className="mh-q-line" />
            {["A", "B", "C", "D"].map((l, i) => (
              <g key={l}>
                <circle cx={150 + i * 110} cy={180 + q * 140} r="18" className="mh-bubble" />
                <text x={150 + i * 110 + 30} y={187 + q * 140} className="mh-bubble-letter">{l}</text>
                {i === [2, 0, 3][q] && (
                  <circle cx={150 + i * 110} cy={180 + q * 140} r="12" className="mh-bubble-fill" style={{ "--d": `${400 + q * 350}ms` } as Vars} />
                )}
              </g>
            ))}
          </g>
        ))}
        <text x="360" y="600" className="mh-svg-label mh-svg-label--ink" textAnchor="middle">OPENMED · EXAM QUESTIONS</text>
      </g>

      <path d="M680 305 C760 260 900 260 980 305" className="mh-arrow" pathLength={1} />
      <path d="M990 311 L966 285 L962 318 Z" className="mh-arrow-head" />

      <g className="mh-at" style={{ "--d": "2300ms" } as Vars}>
        <rect x="1060" y="70" width="600" height="470" className="mh-paper" />
        <text x="1360" y="600" className="mh-svg-label mh-svg-label--accent" textAnchor="middle">MEDHELM · CLINICAL WORK</text>
      </g>
      {notes.map((s) => (
        <g key={s.h}>
          <text x="1100" y={s.y - 20} className="mh-note-head mh-at" style={{ "--d": "2600ms" } as Vars}>{s.h}</text>
          {s.lines.map((w, i) => (
            <line
              key={i}
              x1="1100" y1={s.y + 14 + i * 40} x2={1100 + w} y2={s.y + 14 + i * 40}
              className="mh-note-line" pathLength={1}
              style={{ "--d": `${2700 + k++ * 330}ms` } as Vars}
            />
          ))}
        </g>
      ))}
    </svg>
  );
}

export default function Medhelm({ step }: ChapterStepProps) {
  /* step 0 — exams vs. clinical work */
  if (step === 0) {
    return (
      <div key={step} className="scene-pad mh-scene">
        <h1 className="mh-headline mh-print">
          <span className="serif-it mh-em">MedHELM</span>{" "}
          <span className="display-en">is closer to the clinic.</span>
        </h1>
        <ExamToWard />
      </div>
    );
  }

  /* step 1 — thirteen tasks, five areas */
  if (step === 1) {
    return (
      <div key={step} className="scene-pad mh-scene mh-tasks">
        <div className="mh-count mh-rise">
          <span className="hero-num">13</span>
          <span className="mh-count-sub">clinical tasks</span>
        </div>
        <div className="mh-right">
          <div className="mh-grid">
            {TASKS.map((t, i) => (
              <div key={t.n} className="mh-tile" style={{ "--d": `${300 + i * 90}ms` } as Vars}>
                <span className="mh-tile-n">{String(i + 1).padStart(2, "0")}</span>
                <span className="mh-tile-name">{t.n}</span>
              </div>
            ))}
          </div>
          <div className="mh-cats">
            {CATS.map((c, i) => (
              <span
                key={c.w}
                className="mh-cat"
                style={{ "--on": `${c.on}ms`, "--off": `${CATS[i + 1]?.on ?? 99000}ms` } as Vars}
              >
                {c.w}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* step 2 — what "mean win rate" means (illustrative grid) */
  if (step === 2) {
    return (
      <div key={step} className="scene-pad mh-scene mh-def">
        <div className="mh-def-text">
          <div className="kicker mh-kicker mh-rise">The headline score</div>
          <h1 className="mh-headline mh-print">
            <span className="serif-it mh-em">Mean</span> <span className="display-en">win rate</span>
          </h1>
          <p className="mh-def-sub mh-rise" style={{ "--d": "900ms" } as Vars}>
            How often a model beats the others — task by task.
          </p>
        </div>
        <div className="mh-duel">
          <div className="mh-duel-row mh-at" style={{ "--d": "800ms" } as Vars}>
            <span className="mh-duel-head">vs.</span>
            {DUEL[0]!.map((_, c) => (
              <span key={c} className="mh-duel-head">TASK {c + 1}</span>
            ))}
          </div>
          {DUEL.map((row, r) => (
            <div key={r} className="mh-duel-row">
              <span className="mh-duel-rival mh-at" style={{ "--d": `${900 + r * 80}ms` } as Vars}>
                MODEL {"BCDE"[r]}
              </span>
              {row.map((w, c) => (
                <span
                  key={c}
                  className={w ? "mh-cell is-win" : "mh-cell is-loss"}
                  style={{ "--d": `${1300 + (c * 4 + r) * 110}ms` } as Vars}
                >
                  {w ? "W" : "L"}
                </span>
              ))}
            </div>
          ))}
          <div className="mh-tally mh-rise" style={{ "--d": "4300ms" } as Vars}>
            <span className="hero-num">17 / 24</span>
            <span className="mh-tally-eq">wins ≈ 71%</span>
          </div>
          <span className="mh-note mh-at" style={{ "--d": "4600ms" } as Vars}>Illustrative · model A vs. four rivals · not real scores</span>
        </div>
      </div>
    );
  }

  /* step 3 — 77.78, best of every model tested; GPT 5.5 next */
  if (step === 3) {
    const lo = 65, span = 15;
    const h = (v: number) => `${(((v - lo) / span) * 100).toFixed(2)}%`;
    return (
      <div key={step} className="scene-pad mh-scene mh-top">
        <div className="mh-top-hero">
          <div className="kicker mh-kicker mh-rise">MedHELM · mean win rate</div>
          <span className="hero-num mh-print" style={{ "--d": "200ms" } as Vars}>77.78</span>
          <span className="mh-top-sub mh-rise" style={{ "--d": "2600ms" } as Vars}>
            Medical LLM Medium — <span className="mh-em">best of every model tested</span>
          </span>
        </div>
        <div className="mh-chart">
          <div className="mh-plot">
            {[65, 70, 75, 80].map((g) => (
              <div key={g} className="mh-gridline" style={{ bottom: h(g) }}>
                <span>{g}</span>
              </div>
            ))}
            {BOARD.map((b, i) => (
              <div
                key={b.n}
                className={`mh-col${i === 0 ? " is-us" : ""}${i === 1 ? " is-next" : ""}`}
                style={{ "--h": h(b.v), "--d": `${b.d}ms` } as Vars}
              >
                <div className="mh-col-bar" />
                <span className="mh-col-v">{b.v}</span>
                {i === 1 && (
                  <div className="mh-gap" style={{ "--hm": h(BOARD[0]!.v) } as Vars}>
                    <span>−4.22</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mh-col-names">
            {BOARD.map((b) => (
              <span key={b.n} className="mh-col-name mh-at" style={{ "--d": `${b.d}ms` } as Vars}>{b.n}</span>
            ))}
          </div>
          <span className="mh-note mh-at" style={{ "--d": "4600ms" } as Vars}>Axis starts at 65</span>
        </div>
      </div>
    );
  }

  /* step 4 — top score on 12 of the 13 tasks; MedDialog by a tenth */
  if (step === 4) {
    let won = 0;
    return (
      <div key={step} className="scene-pad mh-scene mh-tasks">
        <div className="mh-score">
          <span className="hero-num mh-print" style={{ "--d": "2700ms" } as Vars}>12</span>
          <span className="mh-score-of mh-rise" style={{ "--d": "2900ms" } as Vars}>of 13 tasks — top score</span>
        </div>
        <div className="mh-right">
          <div className="mh-grid">
            {TASKS.map((t, i) => {
              const win = t.m > t.f;
              const w = win ? 700 + won++ * 150 : 0;
              const margin = Math.round((t.m - t.f) * 10) / 10;
              const close = t.n === "MedDialog";
              const cls = win ? (close ? "mh-tile is-win is-close" : "mh-tile is-win") : "mh-tile is-quick is-open";
              return (
                <div key={t.n} className={cls} style={{ "--w": `${w}ms` } as Vars}>
                  <span className="mh-tile-row">
                    <span className="mh-tile-n">{String(i + 1).padStart(2, "0")}</span>
                    {win && <span className="mh-margin">+{margin}</span>}
                  </span>
                  <span className="mh-tile-name">{t.n}</span>
                </div>
              );
            })}
            <div className="mh-close-note">
              <span className="mh-close-arrow">↖</span>
              <span>MedDialog <b>76.3</b> vs <b>76.2</b></span>
              <span className="mh-close-sub">a tenth of a point</span>
            </div>
          </div>
          <span className="mh-note mh-at" style={{ "--d": "1200ms" } as Vars}>
            Margin = Medium vs. best of GPT 5.5 · Claude Opus 4.8 · Gemini 3.5 Flash
          </span>
        </div>
      </div>
    );
  }

  /* step 5 — biggest gap: Medec, 85 vs 70 */
  const at = (v: number) => `${v}%`;
  return (
    <div key={step} className="scene-pad mh-scene mh-medec">
      <div className="kicker mh-kicker mh-rise">Biggest gap · Medec EM</div>
      <h1 className="mh-headline mh-print">
        <span className="serif-it mh-em">Clinical error</span> <span className="display-en">detection</span>
      </h1>
      <div className="mh-ruler">
        <div className="mh-axis" />
        {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((t) => (
          <div key={t} className="mh-tick" style={{ left: at(t) }}><span>{t}</span></div>
        ))}
        <div className="mh-band" style={{ left: at(70), width: "15%" }} />
        {MEDEC_REST.map((r) => (
          <div key={r.n} className="mh-pin" style={{ left: at(r.v), "--d": "5800ms" } as Vars} />
        ))}
        <div className="mh-pin is-best" style={{ left: at(70), "--d": "5400ms" } as Vars}>
          <div className="mh-pin-label"><span className="mh-pin-v">70</span><span className="mh-pin-n">Best frontier · Gemini 3.5 Flash</span></div>
          <div className="mh-pin-stem" />
        </div>
        <div className="mh-pin is-us" style={{ left: at(85), "--d": "3400ms" } as Vars}>
          <div className="mh-pin-label"><span className="mh-pin-v">85</span><span className="mh-pin-n">Medical LLM Medium</span></div>
          <div className="mh-pin-stem" />
        </div>
        <div className="mh-others" style={{ right: at(34) }}>
          {MEDEC_REST.map((r) => `${r.n} ${r.v}`).join(" · ")}
        </div>
        <div className="mh-gap-hero" style={{ left: at(77.5) }}>
          <div className="mh-rise" style={{ "--d": "7700ms" } as Vars}>
            <span className="hero-num">+15</span>
          </div>
        </div>
      </div>
    </div>
  );
}
