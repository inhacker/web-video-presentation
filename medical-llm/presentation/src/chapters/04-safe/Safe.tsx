import type { CSSProperties } from "react";
import type { ChapterStepProps } from "../../registry/types";
import "./Safe.css";

/**
 * Chapter 4 · safe
 *   step 0  a balance: "smart" tips it, "careful" drops in and levels it
 *   step 1  a magnifier sweeps a note and rings the two hidden mistakes
 *   step 2  error detection bars: Medium vs the next model, +15 points
 *   step 3  a confident made-up answer gets stamped: that's a hallucination
 *   step 4  hallucination ranking: Medium and Small take the top two spots
 *   step 5  a storm of tricky questions falls on the model: 1,000
 *   step 6  a 10×10 grid fills to 94 for Medium; GPT 5.5's grid fills to 85
 *
 * Every step root carries key={step} so its CSS animations replay.
 */

type Vars = CSSProperties & Record<`--${string}`, string | number>;

/* Med-Hallu ranking (article L83): Medium 96, Small 95, GPT 92, Claude 92, Gemini 90 */
const HALLU = [
  { pos: "1", name: "Medical LLM Medium", us: true },
  { pos: "2", name: "Medical LLM Small", us: true },
  { pos: "3", name: "GPT 5.5", us: false },
  { pos: "3", name: "Claude Opus 4.8", us: false },
  { pos: "5", name: "Gemini 3.5 Flash", us: false },
];


/* Rough positions for falling question tiles (x in px, delay in ms) */
const DROPS = Array.from({ length: 22 }, (_, i) => ({
  x: 40 + ((i * 263) % 1180),
  d: 300 + ((i * 397) % 1700),
}));

function Grid({ pass, us, start, step }: { pass: number; us: boolean; start: number; step: number }) {
  return (
    <div className={`sf-dots ${us ? "is-us" : "is-them"}`}>
      {Array.from({ length: 100 }, (_, i) => (
        <span
          key={i}
          className={`sf-dot${i < pass ? " is-pass" : ""}`}
          style={i < pass ? ({ "--d": `${start + i * step}ms` } as Vars) : undefined}
        />
      ))}
    </div>
  );
}

export default function Safe({ step }: ChapterStepProps) {
  if (step === 0) {
    return (
      <div key={step} className="scene-pad sf-scene sf-s0">
        <h2 className="sf-title">
          Smart isn't enough. It has to be <em>careful.</em>
        </h2>
        <svg className="sf-balance" viewBox="0 0 1100 440">
          <rect className="sf-post" x="538" y="150" width="24" height="270" rx="10" />
          <rect className="sf-post" x="440" y="410" width="220" height="24" rx="12" />
          <g className="sf-beam-g">
            <line className="sf-beam" x1="190" y1="150" x2="910" y2="150" />
            <line className="sf-string" x1="210" y1="150" x2="150" y2="300" />
            <line className="sf-string" x1="210" y1="150" x2="270" y2="300" />
            <line className="sf-string" x1="890" y1="150" x2="830" y2="300" />
            <line className="sf-string" x1="890" y1="150" x2="950" y2="300" />
            <path className="sf-pan" d="M110 300 h200 a100 40 0 0 1 -200 0 z" />
            <path className="sf-pan" d="M790 300 h200 a100 40 0 0 1 -200 0 z" />
            <rect className="sf-w-smart" x="120" y="210" width="180" height="90" rx="24" />
            <text className="sf-w-label" x="210" y="268" textAnchor="middle">Smart</text>
            <g className="sf-care-g">
              <rect className="sf-w-care" x="790" y="210" width="200" height="90" rx="24" />
              <text className="sf-w-label" x="890" y="268" textAnchor="middle">Careful</text>
            </g>
          </g>
        </svg>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div key={step} className="scene-pad sf-scene sf-s1">
        <h2 className="sf-title">
          Find the <em>hidden mistakes.</em>
        </h2>
        <div className="sf-note-row">
          <div className="sf-note">
            <span className="sf-tag">Medical note · illustrative</span>
            <p className="sf-note-line"><b>Patient:</b> 64, high blood pressure</p>
            <p className="sf-note-line">
              <b>Allergies:</b>{" "}
              <span className="sf-err" style={{ "--d": "2400ms" } as Vars}>
                none
              </span>{" "}
              (chart says penicillin)
            </p>
            <p className="sf-note-line"><b>Plan:</b> start new blood pressure pill</p>
            <p className="sf-note-line">
              <b>Dose:</b>{" "}
              <span className="sf-err" style={{ "--d": "3300ms" } as Vars}>
                500 g daily
              </span>
            </p>
            <svg className="sf-lens" viewBox="0 0 150 150">
              <circle cx="60" cy="60" r="46" />
              <line x1="94" y1="94" x2="136" y2="136" />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div key={step} className="scene-pad sf-scene sf-s2">
        <div className="sf-gap-row">
          <div className="sf-bars">
            {/* Medec (article L73): Medium 85, next best 70 */}
            <div className="sf-bar-col">
              <span className="sf-bar is-us" style={{ "--h": `${85 * 5}px` } as Vars} />
              <span className="sf-bar-name">Medium</span>
            </div>
            <div className="sf-bar-col">
              <span className="sf-bar" style={{ "--h": `${70 * 5}px` } as Vars} />
              <span className="sf-bar-name">Next best</span>
            </div>
          </div>
          <div>
            <p className="sf-gap-big">+15</p>
            <p className="sf-gap-sub">points ahead</p>
            <span className="sf-tag">Finding errors in notes · Medec</span>
          </div>
        </div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div key={step} className="scene-pad sf-scene sf-s3">
        <div className="sf-chat">
          <p className="sf-msg sf-msg-q">What's the usual dose of Drug X?</p>
          <p className="sf-msg sf-msg-a">
            Definitely 40 tablets, twice an hour.
            <span className="sf-stamp">Made up</span>
          </p>
          <span className="sf-tag">Illustrative example</span>
        </div>
        <p className="sf-def">
          <b>Hallucination:</b> when an AI confidently makes something up.
        </p>
      </div>
    );
  }

  if (step === 4) {
    return (
      <div key={step} className="scene-pad sf-scene sf-s4">
        <h2 className="sf-title">
          Hallucination test: <em>both on top.</em>
        </h2>
        <div className="sf-rank">
          {HALLU.map((h, i) => (
            <div key={h.name} className={`sf-row${h.us ? " is-us" : ""}`} style={{ "--d": `${300 + i * 250}ms` } as Vars}>
              <span className="sf-pos">{h.pos}</span>
              <span>{h.name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (step === 5) {
    return (
      <div key={step} className="scene-pad sf-scene sf-s5">
        <div className="sf-storm">
          {DROPS.map((q, i) => (
            <span key={i} className="sf-drop" style={{ "--x": `${q.x}px`, "--d": `${q.d}ms` } as Vars}>
              ?
            </span>
          ))}
          <span className="sf-shield-g">Medium</span>
          <p className="sf-storm-count">
            1,000
            <small>tricky questions</small>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div key={step} className="scene-pad sf-scene sf-s6">
      <div className="sf-pass-row">
        <Grid pass={94} us start={300} step={14} />
        <div>
          <p className="sf-pass-big">
            94 <small>out of 100</small>
          </p>
          <p className="sf-pass-sub">handled safely by Medium</p>
          <div className="sf-them">
            <Grid pass={85} us={false} start={4600} step={10} />
            <p className="sf-them-text">
              GPT 5.5: 85
              <small>out of 100</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
