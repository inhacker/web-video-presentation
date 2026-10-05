import type { CSSProperties } from "react";
import type { ChapterStepProps } from "../../registry/types";
import "./Start.css";

/**
 * Chapter 7 · start
 *   step 0  the score sheet from this video gets stamped "measured by John Snow Labs"
 *   step 1  the hospital wall again; a "your data" folder drops in beside the AI
 *   step 2  path card 1: a Colab notebook whose cells run, card 2 waits as a ghost
 *   step 3  the path draws on to card 2: book a call for a live demo
 *
 * Every step root carries key={step} so its CSS animations replay.
 */

type Vars = CSSProperties & Record<`--${string}`, string | number>;

const SCORES = [
  { name: "Real clinical work", val: "#1" },
  { name: "Finding errors in notes", val: "+15" },
  { name: "Hallucination test", val: "Top 2" },
  { name: "Tricky questions", val: "94/100" },
];

const DOCS = [
  { x: 190, r: "-8deg" },
  { x: 300, r: "0deg" },
  { x: 410, r: "8deg" },
];

function Soon() {
  return <span className="st-soon">Link coming soon</span>;
}

export default function Start({ step }: ChapterStepProps) {
  if (step === 0) {
    return (
      <div key={step} className="scene-pad st-scene st-s0">
        <span className="st-tag">An honest note</span>
        <h2 className="st-title">
          These scores are <em>their own tests.</em>
        </h2>
        <div className="st-honest-row">
          <div className="st-sheet">
            <span className="st-tag">Scores in this video</span>
            {SCORES.map((s, i) => (
              <div key={s.name} className="st-score" style={{ "--d": `${700 + i * 200}ms` } as Vars}>
                <span className="st-score-name">{s.name}</span>
                <span className="st-score-val">{s.val}</span>
              </div>
            ))}
            <span className="st-stamp">
              Measured by
              <br />
              John Snow Labs
            </span>
          </div>
          <p className="st-honest-copy">
            Run on <b>their own test setup</b>, not checked by an outside group.
          </p>
        </div>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div key={step} className="scene-pad st-scene st-s1">
        <div className="st-data-row">
          <svg className="st-wall-svg" viewBox="0 0 960 600">
            <rect className="st-wall" x="40" y="70" width="880" height="500" rx="48" pathLength={1} />
            <text className="st-wall-label" x="80" y="50">INSIDE YOUR WALLS</text>
            <g className="st-ai-g">
              <rect className="st-ai-box" x="680" y="250" width="150" height="150" rx="34" />
              <text className="st-ai-text" x="755" y="342" textAnchor="middle">AI</text>
            </g>
            <path className="st-link" d="M540 325 H664" />
            <g className="st-folder-g">
              <path className="st-folder-back" d="M150 220 h120 l24 30 h226 v250 h-370 z" />
              {DOCS.map((d, i) => (
                <g key={d.x} className="st-doc-g" style={{ "--d": `${1800 + i * 150}ms`, "--r": d.r } as Vars}>
                  <g transform={`translate(${d.x} 180)`}>
                    <path className="st-doc" d="M0 0 h56 l20 20 v100 h-76 z" />
                    <line className="st-doc-line" x1="14" y1="40" x2="62" y2="40" />
                    <line className="st-doc-line" x1="14" y1="58" x2="62" y2="58" />
                    <line className="st-doc-line" x1="14" y1="76" x2="46" y2="76" />
                  </g>
                </g>
              ))}
              <rect className="st-folder-front" x="150" y="280" width="370" height="220" rx="18" />
              <text className="st-folder-text" x="335" y="404" textAnchor="middle">Your data</text>
            </g>
          </svg>
          <div className="st-data-copy">
            <p className="st-data-big">
              The best proof is <em>your own data.</em>
            </p>
            <p className="st-data-sub">Try it on the work you actually do.</p>
          </div>
        </div>
      </div>
    );
  }

  /* steps 2–3 share one layout: a two-step path */
  return (
    <div key={step} className={`scene-pad st-scene st-path-scene st-s${step}`}>
      <h2 className="st-title">
        Try it in <em>two steps.</em>
      </h2>
      <div className="st-path">
        <div className="st-card st-c1">
          <div className="st-card-head">
            <span className="st-num">1</span>
            <span className="st-card-name">Colab notebook</span>
          </div>
          <div className="st-nb">
            <div className="st-nb-bar">
              <span className="st-nb-dot" />
              <span className="st-nb-dot" />
              <span className="st-nb-dot" />
              <span className="st-nb-url">your browser</span>
            </div>
            <div className="st-cells">
              {[0, 1, 2].map((c) => (
                <div key={c} className="st-cell" style={{ "--d": `${1100 + c * 400}ms` } as Vars}>
                  <span className="st-run">
                    <svg viewBox="0 0 16 16">
                      <path d="M3 1 L15 8 L3 15 z" />
                    </svg>
                  </span>
                  <span className="st-cell-bar">
                    <span className="st-cell-fill" />
                  </span>
                </div>
              ))}
            </div>
          </div>
          <p className="st-card-note">Runs right in your browser.</p>
          <Soon />
        </div>
        <svg className="st-connector" viewBox="0 0 150 60">
          <path d="M6 30 H140 M118 10 L142 30 L118 50" pathLength={1} />
        </svg>
        {step === 2 ? (
          <div className="st-card st-ghost">
            <span className="st-num">2</span>
          </div>
        ) : (
          <div className="st-card st-c2">
            <div className="st-card-head">
              <span className="st-num">2</span>
              <span className="st-card-name">Book a call</span>
            </div>
            <div className="st-cal">
              <div className="st-cal-head">Live demo</div>
              <div className="st-cal-grid">
                {Array.from({ length: 21 }, (_, i) =>
                  i === 10 ? (
                    <span key={i} className="st-day st-day-pick">
                      <svg viewBox="0 0 24 24">
                        <path d="M5 12 L10 17 L19 7" />
                      </svg>
                    </span>
                  ) : (
                    <span key={i} className="st-day" />
                  ),
                )}
              </div>
            </div>
            <p className="st-card-note">A live demo with their team.</p>
            <Soon />
          </div>
        )}
      </div>
      <p className="st-desc">
        <svg viewBox="0 0 28 28">
          <path d="M14 3 V24 M5 16 L14 25 L23 16" />
        </svg>
        Links are in the description
      </p>
    </div>
  );
}
