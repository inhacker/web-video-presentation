import type { CSSProperties } from "react";
import type { ChapterStepProps } from "../../registry/types";
import "./Meet.css";

/**
 * Chapter 2 · meet
 *   step 0  title card: Medical LLMs, by John Snow Labs
 *   step 1  what an LLM does: a question flows in, an answer flows out
 *   step 2  built for medicine: notes, research papers, diagnoses (one by one)
 *   step 3  the model lives inside the hospital wall, next to a private cloud
 *   step 4  two sizes grow side by side; Medium gets the "most powerful" badge
 *   step 5  Small drops onto a single graphics card
 *
 * Every step root carries key={step} so its CSS animations replay.
 */

type Vars = CSSProperties & Record<`--${string}`, string | number>;

const KNOWS = [
  {
    name: "Clinical notes",
    note: "Visits, histories, discharge summaries",
    icon: (
      <>
        <path className="mt-ico mt-ico-fill" d="M24 8 h52 l20 20 v84 h-72 z" />
        <path className="mt-ico" d="M40 50 h40 M40 70 h40 M40 90 h24" />
      </>
    ),
  },
  {
    name: "Research papers",
    note: "Reading and making sense of biomedical studies",
    icon: (
      <>
        <path className="mt-ico mt-ico-fill" d="M12 24 h44 v80 h-44 z M64 24 h44 v80 h-44 z" />
        <path className="mt-ico" d="M22 46 h24 M22 64 h24 M74 46 h24 M74 64 h24" />
      </>
    ),
  },
  {
    name: "Diagnoses",
    note: "Clinical reasoning toward the right answer",
    icon: (
      <>
        <circle className="mt-ico mt-ico-fill" cx="52" cy="52" r="34" />
        <path className="mt-ico" d="M77 77 L106 106 M38 52 h28 M52 38 v28" />
      </>
    ),
  },
];

export default function Meet({ step }: ChapterStepProps) {
  if (step === 0) {
    return (
      <div key={step} className="scene-pad mt-scene mt-s0">
        <span className="mt-tag">John Snow Labs</span>
        <h1 className="mt-hero">
          <span style={{ "--d": "300ms" } as Vars}>Medical</span>{" "}
          <span className="mt-acc" style={{ "--d": "650ms" } as Vars}>LLMs</span>
        </h1>
        <svg className="mt-underline" viewBox="0 0 900 30">
          <path d="M6 18 C 220 4, 520 4, 894 16" pathLength={1} />
        </svg>
        <p className="mt-sub">AI models built for healthcare.</p>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div key={step} className="scene-pad mt-scene mt-s1">
        <h2 className="mt-title">
          An <em>LLM</em> is the kind of AI behind ChatGPT.
        </h2>
        <div className="mt-flow">
          <div className="mt-bubble mt-in">
            <small>You give it text</small>
            What does this lab result mean?
          </div>
          <svg className="mt-pipe mt-pipe-a" viewBox="0 0 90 24">
            <path d="M4 12 H86" />
          </svg>
          <div className="mt-brain">LLM</div>
          <svg className="mt-pipe mt-pipe-b" viewBox="0 0 90 24">
            <path d="M4 12 H86" />
          </svg>
          <div className="mt-bubble mt-out">
            <small>It answers</small>
            <span className="mt-out-text">A plain-language explanation.</span>
          </div>
        </div>
        <div className="mt-verbs">
          <span className="mt-verb" style={{ "--d": "5800ms" } as Vars}>reads</span>
          <span className="mt-verb" style={{ "--d": "6500ms" } as Vars}>writes</span>
          <span className="mt-verb" style={{ "--d": "7200ms" } as Vars}>answers</span>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div key={step} className="scene-pad mt-scene mt-s2">
        <h2 className="mt-title">
          These ones were built for <em>medicine.</em>
        </h2>
        <div className="mt-cards">
          {KNOWS.map((k, i) => (
            <div key={k.name} className="mt-card" style={{ "--d": `${1800 + i * 1000}ms` } as Vars}>
              <svg viewBox="0 0 120 120">{k.icon}</svg>
              <span className="mt-card-name">{k.name}</span>
              <span className="mt-card-note">{k.note}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div key={step} className="scene-pad mt-scene mt-s3">
        <div className="mt-home">
          <svg className="mt-home-svg" viewBox="0 0 1040 560">
            <rect className="mt-wall" x="40" y="60" width="960" height="480" rx="48" />
            <text className="mt-wall-label" x="80" y="40">INSIDE YOUR WALLS</text>
            <g className="mt-g-rack">
              <rect className="mt-rack" x="190" y="130" width="200" height="240" rx="16" />
              {[0, 1, 2].map((r) => (
                <g key={r}>
                  <line className="mt-rack-slot" x1="220" y1={180 + r * 70} x2="320" y2={180 + r * 70} />
                  <circle className="mt-led" cx="352" cy={180 + r * 70} r="9" />
                </g>
              ))}
              <text className="mt-obj-label" x="290" y="410" textAnchor="middle">Hospital servers</text>
            </g>
            <text className="mt-or" x="500" y="262" textAnchor="middle">or</text>
            <g className="mt-g-cloud">
              <path
                className="mt-cloud"
                d="M640 330 h220 a60 60 0 0 0 0 -120 a90 90 0 0 0 -170 -30 a70 70 0 0 0 -50 150 z"
              />
              <text className="mt-obj-label" x="740" y="410" textAnchor="middle">Private cloud</text>
            </g>
            <path className="mt-orbit" d="M300 470 C 420 400, 560 400, 680 470 C 560 540, 420 540, 300 470 Z" />
            <circle className="mt-dot" r="14" />
          </svg>
          <div className="mt-home-copy">
            <p className="mt-home-big">
              The data <em>never has to leave.</em>
            </p>
            <p className="mt-platforms">On-premise · AWS · Azure · Databricks · Snowflake</p>
          </div>
        </div>
      </div>
    );
  }

  if (step === 4) {
    return (
      <div key={step} className="scene-pad mt-scene mt-s4">
        <h2 className="mt-title">
          Two <em>sizes.</em>
        </h2>
        <div className="mt-sizes">
          <div className="mt-size mt-medium" style={{ "--d": "300ms" } as Vars}>
            <span className="mt-badge">Most powerful</span>
            <span className="mt-size-name">Medium</span>
            <span className="mt-size-note">The flagship model</span>
          </div>
          <div className="mt-size mt-small" style={{ "--d": "1000ms" } as Vars}>
            <span className="mt-size-name">Small</span>
            <span className="mt-size-note">Compact, practical for everyday use</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div key={step} className="scene-pad mt-scene mt-s5">
      <div className="mt-gpu-row">
        <svg className="mt-gpu-svg" viewBox="0 0 820 460">
          <rect className="mt-gpu-body" x="40" y="140" width="740" height="260" rx="28" />
          <rect className="mt-gpu-pins" x="120" y="400" width="420" height="26" rx="6" />
          {[230, 590].map((cx) => (
            <g key={cx} className="mt-fan-g">
              <circle className="mt-gpu-fan" cx={cx} cy="270" r="90" />
              <path className="mt-gpu-fan" d={`M${cx} 190 v160 M${cx - 80} 270 h160`} />
              <circle className="mt-gpu-hub" cx={cx} cy="270" r="20" />
            </g>
          ))}
          <g className="mt-chip-g">
            <rect className="mt-chip" x="300" y="20" width="220" height="100" rx="24" />
            <text className="mt-chip-text" x="410" y="84" textAnchor="middle">Small</text>
          </g>
        </svg>
        <div className="mt-gpu-copy">
          <p className="mt-gpu-big">
            Fits on <em>one</em> graphics card.
          </p>
          <p className="mt-def">
            <b>Graphics card (GPU):</b> the chip that runs AI.
          </p>
        </div>
      </div>
    </div>
  );
}
