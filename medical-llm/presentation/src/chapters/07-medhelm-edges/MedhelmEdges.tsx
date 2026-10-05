import type { CSSProperties } from "react";
import type { ChapterStepProps } from "../../registry/types";
import "./MedhelmEdges.css";

/**
 * Chapter 7 · medhelm-edges  (article §JSL-LLM MedHELM table + the note under it)
 *   step 0  two number lines: Medium's dot slides clear of the frontier, +9.5 / +6
 *   step 1  Med-Hallu: Medium and Small bars run past the frontier ceiling at 92
 *   step 2  13 task tiles tick off; the 13th, RaceBias, stays open: 88 vs 91·91·91
 *   step 3  "Bias testing matters? Remember this one." with RaceBias circled
 *   step 4  mean win rate ladder: Small drops below all three; the claim gets an asterisk
 * Audio (s): 6.7 9.9 8.5 3.8 9.8 — motion ends ≥0.6s earlier.
 */

type Vars = CSSProperties & Record<`--${string}`, string | number>;

/* ─── step 0 · article table: Medium vs the best frontier score ─── */
const GAPS = [
  { name: "MedicationQA", cap: "medication questions", m: 80.9, best: 71.4, front: [70.2, 70.6, 71.4], delta: "+9.5", t: 0 },
  { name: "PubMedQA", cap: "biomedical research reading", m: 82, best: 76, front: [76, 76, 75], delta: "+6", t: 2800 },
];
const gx = (v: number) => 40 + ((v - 68) / 15) * 900;

/* ─── step 1 · Med-Hallu row of the table · axis 80 → 100 ─── */
const HALLU = [
  { n: "Medical LLM Medium", v: 96, us: true, d: 2600 },
  { n: "Medical LLM Small", v: 95, us: true, d: 4600 },
  { n: "GPT 5.5", v: 92, us: false, d: 6400 },
  { n: "Claude Opus 4.8", v: 92, us: false, d: 6600 },
  { n: "Gemini 3.5 Flash", v: 90, us: false, d: 6800 },
];
const hx = (v: number) => 440 + ((v - 80) / 20) * 1080;

/* ─── step 2 · the 13 MedHELM tasks, table order with the lost one moved last ─── */
const TASKS = [
  "MedCalc", "MTSamples Proc.", "Medec EM", "HeadQA", "Medbullets", "ACI-Bench", "MedicationQA",
  "MedDialog", "PubMedQA", "EHRSQL", "MediQA", "Med-Hallu", "RaceBias",
];
const RACE = [
  { n: "MEDIUM", v: 88, us: true, faint: false, d: 3200 },
  { n: "SMALL", v: 86, us: false, faint: true, d: 4200 },
  { n: "GPT 5.5", v: 91, us: false, faint: false, d: 5000 },
  { n: "OPUS 4.8", v: 91, us: false, faint: false, d: 5400 },
  { n: "GEMINI", v: 91, us: false, faint: false, d: 5800 },
];
/* ─── step 4 · "Mean win rate" row of the table ─── */
const LADDER = [
  { n: "Medical LLM Medium", v: "77.78", small: false, front: false },
  { n: "GPT 5.5", v: "73.56", small: false, front: true },
  { n: "Claude Opus 4.8", v: "72.06", small: false, front: true },
  { n: "Gemini 3.5 Flash", v: "71.61", small: false, front: true },
  { n: "Medical LLM Small", v: "70.95", small: true, front: false },
];

const VF = 480;
const vh = (v: number) => ((v - 80) / 15) * 400;

export default function MedhelmEdges({ step }: ChapterStepProps) {
  if (step === 0) {
    return (
      <div key={step} className="scene-pad me-scene me-gaps">
        <div className="kicker me-kicker me-at">MedHELM · where the lead is widest</div>
        {GAPS.map((g) => {
          const bx = gx(g.best);
          const mx = gx(g.m);
          const t = g.t;
          return (
            <div key={g.name} className="me-lane">
              <div className="me-lane-name me-up" style={{ "--d": `${t}ms` } as Vars}>
                <span className="serif-it">{g.name}</span>
                <p className="me-cap">{g.cap}</p>
              </div>
              <svg className="me-svg" viewBox="0 0 1260 260">
                <line x1="20" y1="170" x2="960" y2="170" className="me-axis me-draw" pathLength={1} style={{ "--d": `${t}ms` } as Vars} />
                {[70, 75, 80].map((v) => (
                  <g key={v} className="me-at" style={{ "--d": `${t + 300}ms` } as Vars}>
                    <line x1={gx(v)} y1="160" x2={gx(v)} y2="180" className="me-tick" />
                    <text x={gx(v)} y="218" className="me-tick-label" textAnchor="middle">{v}</text>
                  </g>
                ))}
                {g.front.map((v, i) => (
                  <circle key={i} cx={gx(v)} cy="170" r="13" className="me-dot-f" style={{ "--d": `${t + 600 + i * 120}ms` } as Vars} />
                ))}
                <text x={bx} y="132" className="me-val me-at" textAnchor="middle" style={{ "--d": `${t + 900}ms` } as Vars}>{g.best}</text>
                <rect x={bx} y="163" width={mx - bx} height="14" className="me-gap-bar" style={{ "--d": `${t + 1250}ms` } as Vars} />
                <g className="me-slide" style={{ "--d": `${t + 1200}ms`, "--from": `${bx - mx}px` } as Vars}>
                  <circle cx={mx} cy="170" r="20" className="me-dot-m" />
                  <text x={mx} y="132" className="me-val me-val--m" textAnchor="middle">{g.m}</text>
                </g>
                <text x="1000" y="210" className="me-delta me-at" style={{ "--d": `${t + 2000}ms` } as Vars}>{g.delta}</text>
              </svg>
            </div>
          );
        })}
        <p className="me-cap me-at" style={{ "--d": "5200ms" } as Vars}>
          <span className="me-em">●</span> Medical LLM Medium &nbsp;&nbsp; ● GPT 5.5 · Claude Opus 4.8 · Gemini 3.5 Flash
        </p>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div key={step} className="scene-pad me-scene me-hallu">
        <div className="me-hallu-head me-at">
          <span className="serif-it">Med-Hallu</span>
          <p className="me-cap">hallucination control · higher is better</p>
        </div>
        <svg className="me-svg" viewBox="0 0 1720 560">
          {HALLU.map((r, i) => {
            const y = 50 + i * 100;
            return (
              <g key={r.n}>
                <text x="0" y={y + 42} className={r.us ? "me-hname me-hname--us me-at" : "me-hname me-at"} style={{ "--d": `${r.d - 300}ms` } as Vars}>{r.n}</text>
                <rect x="440" y={y} width="1080" height="56" className="me-track" />
                <rect x="440" y={y} width={hx(r.v) - 440} height="56" className={r.us ? "me-hbar me-hbar--us" : "me-hbar"} style={{ "--d": `${r.d}ms` } as Vars} />
                <text x="1550" y={y + 52} className={r.us ? "me-hval me-hval--us me-at" : "me-hval me-at"} style={{ "--d": `${r.d + 700}ms` } as Vars}>{r.v}</text>
              </g>
            );
          })}
          <line x1={hx(92)} y1="30" x2={hx(92)} y2="540" className="me-ceiling" style={{ "--d": "7800ms" } as Vars} />
          <text x={hx(92)} y="16" className="me-ceiling-label me-at" textAnchor="middle" style={{ "--d": "8200ms" } as Vars}>FRONTIER BEST · 92</text>
        </svg>
        <p className="me-cap me-at" style={{ "--d": "8200ms" } as Vars}>axis starts at 80 · both John Snow Labs models rank first</p>
      </div>
    );
  }

  if (step === 2) {
    let w = 0;
    return (
      <div key={step} className="scene-pad me-scene me-lost">
        <div className="me-grid-col">
          <div className="me-grid-head me-at">
            <span className="hero-num">12<span className="me-em">/</span>13</span>
            <span className="serif-it">tasks where Medium scores best</span>
          </div>
          <div className="me-grid">
            {TASKS.map((t) => {
              const loss = t === "RaceBias";
              const d = loss ? 1700 : 200 + w++ * 120;
              return (
                <div key={t} className={loss ? "me-tile is-loss" : "me-tile is-win"} style={{ "--d": `${d}ms` } as Vars}>{t}</div>
              );
            })}
          </div>
        </div>
        <div className="me-race">
          <h2 className="me-race-title serif-it">RaceBias</h2>
          <svg className="me-svg" viewBox="0 0 720 560">
            <line x1="0" y1={VF} x2="720" y2={VF} className="me-axis" />
            <line x1="0" y1={VF - vh(91)} x2="720" y2={VF - vh(91)} className="me-line91 me-at" style={{ "--d": "6200ms" } as Vars} />
            {RACE.map((r, i) => {
              const x = 20 + i * 140;
              const h = vh(r.v);
              const cls = r.us ? "me-vbar me-vbar--us" : r.faint ? "me-vbar me-vbar--faint" : "me-vbar";
              return (
                <g key={r.n}>
                  <rect x={x} y={VF - h} width="100" height={h} className={cls} style={{ "--d": `${r.d}ms` } as Vars} />
                  <text x={x + 50} y={VF - h - 16} className={r.us ? "me-vval me-vval--us me-at" : "me-vval me-at"} textAnchor="middle" style={{ "--d": `${r.d + 400}ms` } as Vars}>{r.v}</text>
                  <text x={x + 50} y={VF + 36} className="me-vname me-at" textAnchor="middle" style={{ "--d": `${r.d}ms` } as Vars}>{r.n}</text>
                </g>
              );
            })}
          </svg>
          <p className="me-cap me-at" style={{ "--d": "2400ms" } as Vars}>bias test · axis starts at 80</p>
        </div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div key={step} className="scene-pad me-scene me-remember">
        <div className="me-remember-text">
          <h1 className="me-big me-big--a serif-it">Bias testing matters?</h1>
          <h1 className="me-big me-big--b">Remember <span className="me-em">this one.</span></h1>
        </div>
        <div className="me-pin">
          <svg viewBox="0 0 560 420">
            <text x="290" y="238" className="me-pin-word me-at" textAnchor="middle" style={{ "--d": "300ms" } as Vars}>RaceBias</text>
            <path
              d="M120 150 C200 70 420 70 500 160 C560 240 470 340 290 345 C110 350 20 280 60 200 C80 160 130 135 170 128"
              className="me-ring me-draw"
              pathLength={1}
              style={{ "--d": "1500ms" } as Vars}
            />
          </svg>
        </div>
      </div>
    );
  }

  if (step === 4) {
    return (
      <div key={step} className="scene-pad me-scene me-ast">
        <div className="me-ladder">
          <p className="me-cap me-at">MedHELM · mean win rate</p>
          {LADDER.map((r, i) => (
            <div
              key={r.n}
              className={`me-rung${r.small ? " is-small" : ""}${r.front ? " is-front" : ""}`}
              style={{ "--d": `${r.small ? 300 : i * 120}ms`, "--b": `${2400 + i * 250}ms` } as Vars}
            >
              <span className="me-rung-rank">{i + 1}</span>
              <span className="me-rung-name">{r.n}</span>
              <span className="me-rung-v">{r.v}</span>
            </div>
          ))}
        </div>
        <div className="me-claim">
          <p className="me-cap me-at" style={{ "--d": "4400ms" } as Vars}>the product line for Small</p>
          <p className="me-quote">
            “outperforms much larger general models on <span style={{ whiteSpace: "nowrap" }}>MedHELM<span className="me-star">*</span>”</span>
          </p>
          <p className="me-foot">
            <span className="me-em">*</span> Mean win rate 70.95 sits under GPT 5.5, Claude Opus 4.8 and Gemini 3.5 Flash.
          </p>
        </div>
      </div>
    );
  }

  return <div key={step} className="scene-pad me-scene" />;
}
