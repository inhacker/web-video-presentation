import type { CSSProperties } from "react";
import type { ChapterStepProps } from "../../registry/types";
import "./Hook.css";

/**
 * Chapter 1 · hook
 *   step 0  a long patient chart squeezes into a three-line AI summary
 *   step 1  the chart is pushed toward a public chatbot and stopped by a lock
 *   step 2  the hospital wall draws itself; a record tries to leave and bounces back
 *   step 3  the AI walks in through the wall to sit beside the data
 *
 * Every step root carries key={step} so its CSS animations replay.
 */

type Vars = CSSProperties & Record<`--${string}`, string | number>;

const CHART_LINES = [88, 72, 95, 60, 84, 78, 92, 66, 80, 70, 90, 58];

function Chart({ lines = CHART_LINES, stagger = false }: { lines?: number[]; stagger?: boolean }) {
  return (
    <div className="hk-chart">
      <div className="hk-chart-head">
        <span className="hk-chart-name">Patient chart</span>
        <span className="hk-tag">illustrative</span>
      </div>
      {lines.map((w, i) => (
        <span
          key={i}
          className="hk-line"
          style={{ "--w": `${w}%`, ...(stagger ? { "--d": `${500 + i * 70}ms` } : {}) } as Vars}
        />
      ))}
    </div>
  );
}

/* ─── steps 2–3 · hospital inside its wall ─── */
const FILES = [
  { x: 330, y: 420 },
  { x: 430, y: 440 },
  { x: 530, y: 420 },
];

function FileIcon({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path className="hk-file" d="M0 0 h44 l16 16 v60 h-60 z" />
      <line className="hk-file-line" x1="12" y1="34" x2="48" y2="34" />
      <line className="hk-file-line" x1="12" y1="48" x2="48" y2="48" />
      <line className="hk-file-line" x1="12" y1="62" x2="36" y2="62" />
    </g>
  );
}

function HospitalWall({ withAi }: { withAi: boolean }) {
  return (
    <svg className="hk-wall-svg" viewBox="0 0 980 620">
      <rect className="hk-wall" x="60" y="70" width="760" height="500" rx="48" pathLength={1} />
      <text className="hk-wall-label" x="100" y="50">YOUR HOSPITAL</text>
      {/* building */}
      <path className="hk-house" d="M330 360 v-170 l110 -70 l110 70 v170 z" />
      <rect className="hk-cross" x="425" y="180" width="30" height="90" rx="6" />
      <rect className="hk-cross" x="395" y="210" width="90" height="30" rx="6" />
      {/* patient records */}
      {FILES.map((f, i) => (
        <g key={i} className="hk-file-g" style={{ "--d": `${1500 + i * 200}ms` } as Vars}>
          <FileIcon {...f} />
        </g>
      ))}
      <g className="hk-file-g hk-file-runner">
        <FileIcon x={630} y={440} />
      </g>
      {withAi && (
        <g className="hk-ai-g">
          <rect className="hk-ai-box" x="630" y="200" width="130" height="130" rx="32" />
          <text className="hk-ai-text" x="695" y="284" textAnchor="middle">AI</text>
        </g>
      )}
    </svg>
  );
}

export default function Hook({ step }: ChapterStepProps) {
  if (step === 0) {
    return (
      <div key={step} className="scene-pad hk-scene hk-s0">
        <h2 className="hk-title">
          A whole chart, <em>summed up in seconds.</em>
        </h2>
        <div className="hk-sum-row">
          <Chart stagger />
          <svg className="hk-arrow" viewBox="0 0 160 40">
            <path d="M4 20 H150 M128 4 L152 20 L128 36" pathLength={1} />
          </svg>
          <div className="hk-summary">
            <div className="hk-summary-head">
              <span className="hk-ai-dot">AI</span>
              <span className="hk-tag">summary · illustrative</span>
            </div>
            <p className="hk-sum-line" style={{ "--d": "2700ms" } as Vars}>
              <b>Main issue:</b> short of breath
            </p>
            <p className="hk-sum-line" style={{ "--d": "3200ms" } as Vars}>
              <b>Meds:</b> diuretic started
            </p>
            <p className="hk-sum-line" style={{ "--d": "3700ms" } as Vars}>
              <b>Next:</b> recheck labs
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div key={step} className="scene-pad hk-scene hk-s1">
        <h2 className="hk-title">
          There's a <em>catch.</em>
        </h2>
        <div className="hk-block-row">
          <Chart lines={CHART_LINES.slice(0, 8)} />
          <span className="hk-barrier" />
          <span className="hk-lock">
            <svg viewBox="0 0 64 64">
              <path d="M18 28 v-8 a14 14 0 0 1 28 0 v8" />
              <rect x="10" y="28" width="44" height="32" rx="8" />
            </svg>
          </span>
          <div className="hk-chat">
            <div className="hk-chat-bar">Public AI chatbot</div>
            <div className="hk-chat-body">
              <span className="hk-bubble">How can I help today?</span>
              <span className="hk-input">Paste anything…</span>
            </div>
          </div>
          <p className="hk-caption">Patient records can't go here.</p>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div key={step} className="scene-pad hk-scene hk-s2">
        <div className="hk-wall-row">
          <HospitalWall withAi={false} />
          <div className="hk-side">
            <p className="hk-side-big">
              Private, and <em>protected by law.</em>
            </p>
            <p className="hk-side-sub">Most hospitals keep it on their own computers.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div key={step} className="scene-pad hk-scene hk-s3">
      <h2 className="hk-title">
        What if the AI <em>came to the data?</em>
      </h2>
      <HospitalWall withAi />
    </div>
  );
}
