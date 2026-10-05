import type { CSSProperties } from "react";
import type { ChapterStepProps } from "../../registry/types";
import "./Uses.css";

/**
 * Chapter 6 · uses
 *   step 0  the question pops in word by word: "What could you build?"
 *   step 1  a crooked doctor's note straightens into a clean summary (Text2SOAP)
 *   step 2  drug names and doses get highlighted, then lift out into a list (NER)
 *   step 3  a Q&A chat types its answer; then a trial rule sheet gets stamped
 *   step 4  a laptop draws itself, a small model drops in; the graphics card is crossed out
 *
 * Every step root carries key={step} so its CSS animations replay.
 */

type Vars = CSSProperties & Record<`--${string}`, string | number>;

const QUESTION = ["What", "could", "you"];

/* step 1 · shorthand note in, SOAP-style summary out (Text2SOAP, article L38) */
const SCRAWL = ["pt c/o cough, tired", "no fever. hx asthma", "wheeze on exam", "→ inhaler, f/u"];
const SOAP = [
  ["symptoms", "Cough, feeling tired"],
  ["exam", "Mild wheeze"],
  ["assessment", "Asthma flare-up"],
  ["plan", "Inhaler, check back"],
];

/* step 3 · chat (MedM v3, article L31) and eligibility parsing (NER v5, article L36) */
const RULES = [
  { text: "Adults with diabetes", ok: true },
  { text: "Uses insulin", ok: false },
  { text: "Pregnant", ok: false },
];

export default function Uses({ step }: ChapterStepProps) {
  if (step === 0) {
    return (
      <div key={step} className="scene-pad us-scene us-s0">
        <h1 className="us-hero">
          {QUESTION.map((w, i) => (
            <span key={w} style={{ "--d": `${i * 120}ms` } as Vars}>
              {w}&nbsp;
            </span>
          ))}
          <span className="us-acc" style={{ "--d": "360ms" } as Vars}>
            build?
          </span>
        </h1>
        <svg className="us-underline" viewBox="0 0 1480 30">
          <path d="M6 18 C 380 4, 890 4, 1474 16" pathLength={1} />
        </svg>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div key={step} className="scene-pad us-scene us-s1">
        <h2 className="us-title">
          Messy note &rarr; <em>clean summary.</em>
        </h2>
        <div className="us-row-flow">
          <div className="us-paper us-note">
            <span className="us-tag">illustrative</span>
            {SCRAWL.map((t, i) => (
              <span key={t} className="us-scrawl" style={{ "--r": `${i % 2 ? 1.5 : -2}deg` } as Vars}>
                {t}
              </span>
            ))}
          </div>
          <svg className="us-arrow" viewBox="0 0 110 40" style={{ "--d": "1200ms" } as Vars}>
            <path d="M6 20 H100 M80 6 L102 20 L80 34" pathLength={1} />
          </svg>
          <div className="us-paper us-summary">
            <span className="us-label">Clean summary</span>
            {SOAP.map(([k, v], i) => (
              <div key={k} className="us-soap" style={{ "--d": `${1800 + i * 300}ms` } as Vars}>
                <span className="us-soap-key">{k}</span>
                <span className="us-soap-val">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (step === 2) {
    const d = (ms: number) => ({ "--d": `${ms}ms` }) as Vars;
    return (
      <div key={step} className="scene-pad us-scene us-s2">
        <h2 className="us-title">
          Drugs and doses, <em>pulled out.</em>
        </h2>
        <div className="us-row-flow">
          <div className="us-paper us-rx">
            <span className="us-tag">illustrative</span>
            <p className="us-rx-text">
              Started <span className="us-drug" style={d(600)}>metformin</span>,{" "}
              <span className="us-dose" style={d(900)}>one tablet twice a day</span>. Keep taking{" "}
              <span className="us-drug" style={d(1200)}>aspirin</span>,{" "}
              <span className="us-dose" style={d(1500)}>low dose each morning</span>.
            </p>
          </div>
          <svg className="us-arrow" viewBox="0 0 110 40" style={d(1400)}>
            <path d="M6 20 H100 M80 6 L102 20 L80 34" pathLength={1} />
          </svg>
          <div className="us-paper us-list">
            <div className="us-list-head">
              <span>Drug</span>
              <span>Dose</span>
            </div>
            <div className="us-med" style={d(2000)}>
              <span className="us-med-name">Metformin</span>
              <span className="us-med-dose">One tablet, twice a day</span>
            </div>
            <div className="us-med" style={d(2500)}>
              <span className="us-med-name">Aspirin</span>
              <span className="us-med-dose">Low dose, mornings</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div key={step} className="scene-pad us-scene us-s3">
        <div className="us-pair">
          <div className="us-col us-chat-col">
            <span className="us-col-name">
              A medical <em>Q&amp;A chatbot</em>
            </span>
            <div className="us-paper us-chat">
              <span className="us-tag">illustrative</span>
              <div className="us-bubble us-ask">What does &ldquo;hypertension&rdquo; mean?</div>
              <div className="us-bubble us-reply">
                <span className="us-dots">
                  {[1000, 1080, 1160].map((ms) => (
                    <i key={ms} style={{ "--d": `${ms}ms` } as Vars} />
                  ))}
                </span>
                <span className="us-reply-text">It means high blood pressure.</span>
              </div>
            </div>
          </div>
          <div className="us-col us-trial-col">
            <span className="us-col-name">
              A <em>clinical-trial</em> rule reader
            </span>
            <div className="us-paper us-rules">
              <span className="us-label">Who can join?</span>
              <span className="us-tag">illustrative</span>
              {RULES.map((r, i) => (
                <div key={r.text} className="us-rule">
                  <span>{r.text}</span>
                  <span
                    className={`us-stamp${r.ok ? "" : " is-out"}`}
                    style={{ "--d": `${4300 + i * 600}ms` } as Vars}
                  >
                    {r.ok ? "Include" : "Exclude"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div key={step} className="scene-pad us-scene us-s4">
      <div className="us-laptop-row">
        <svg className="us-laptop" viewBox="0 0 760 500">
          <rect className="us-lap-screen" x="90" y="30" width="580" height="370" rx="18" />
          <path className="us-lap-line" d="M70 410 V30 Q70 10 90 10 H670 Q690 10 690 30 V410" pathLength={1} />
          <path className="us-lap-line" d="M10 410 H750 L720 470 H40 Z" pathLength={1} />
          <g className="us-lap-chip">
            <rect x="200" y="160" width="360" height="110" rx="26" />
            <text x="380" y="230" textAnchor="middle">
              Small model
            </text>
          </g>
        </svg>
        <div className="us-copy">
          <h2 className="us-title">
            Runs on a <em>regular computer.</em>
          </h2>
          <div className="us-nogpu">
            <svg viewBox="0 0 140 84">
              <rect className="us-gpu-body" x="4" y="8" width="132" height="66" rx="12" />
              <circle className="us-gpu-fan" cx="40" cy="41" r="20" />
              <circle className="us-gpu-fan" cx="100" cy="41" r="20" />
              <path className="us-strike" d="M-6 80 L146 2" pathLength={1} />
            </svg>
            <span>No graphics card needed</span>
          </div>
          <p className="us-def">
            It uses the everyday processor every computer has <b>(the CPU)</b>.
          </p>
        </div>
      </div>
    </div>
  );
}
