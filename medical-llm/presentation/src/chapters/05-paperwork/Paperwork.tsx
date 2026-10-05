import type { CSSProperties } from "react";
import type { ChapterStepProps } from "../../registry/types";
import "./Paperwork.css";

/**
 * Chapter 5 · paperwork
 *   step 0  scanned form, fax and table drop onto the desk one by one
 *   step 1  Vision OCR: a scan beam sweeps a page, plain text types out
 *   step 2  Vision OCR LLM: a box draws itself around every word
 *   step 3  Vision OCR Structured LLM: form fields slide into organized data
 *   step 4  table-reading scores grow; Vision OCR LLM is longest, on one graphics card
 *
 * Every step root carries key={step} so its CSS animations replay.
 */

type Vars = CSSProperties & Record<`--${string}`, string | number>;

/* a hand-written squiggle, drawn as one path */
const SCRIBBLE = "M4 26 C 30 6, 44 40, 70 20 S 110 8, 130 24 S 170 36, 196 16 S 240 10, 262 26";

/* step 2 · a small intake form; first word of each row is the field label */
const FORM = [
  ["Patient", "Alex", "Morgan"],
  ["Visit", "Follow-up"],
  ["Allergy", "Penicillin"],
  ["Medicine", "Metformin"],
  ["Signed", "Dr.", "Lee"],
];

/* step 4 · TEDS-S table-structure scores, article L126–131 (bar length only, no numbers shown) */
const TABLES = [
  { name: "Vision OCR LLM", score: 0.784 },
  { name: "GPT 5.5", score: 0.704 },
  { name: "Claude Opus 4.8", score: 0.684 },
  { name: "Gemini 3.5 Flash", score: 0.668 },
];

export default function Paperwork({ step }: ChapterStepProps) {
  if (step === 0) {
    return (
      <div key={step} className="scene-pad pw-scene pw-s0">
        <h2 className="pw-title">
          A lot of it isn&rsquo;t <em>typed.</em>
        </h2>
        <div className="pw-pile">
          <div className="pw-item" style={{ "--d": "2600ms", "--rot": "-3deg" } as Vars}>
            <div className="pw-paper">
              <span className="pw-line" style={{ "--w": "55%" } as Vars} />
              {[0, 1, 2].map((i) => (
                <div key={i} className="pw-field">
                  <span className="pw-line" style={{ "--w": "30%", height: 10 } as Vars} />
                  <svg viewBox="0 0 280 40">
                    <path className="pw-svg-ink" d={SCRIBBLE} />
                  </svg>
                </div>
              ))}
            </div>
            <span className="pw-item-name">Scanned forms</span>
          </div>
          <div className="pw-item pw-fax" style={{ "--d": "3500ms", "--rot": "2deg" } as Vars}>
            <div className="pw-paper">
              <div className="pw-paper-head">
                <span className="pw-fax-head">FAX</span>
              </div>
              {[90, 70, 85, 60, 92, 75, 50, 80].map((w, i) => (
                <span key={i} className="pw-line" style={{ "--w": `${w}%` } as Vars} />
              ))}
            </div>
            <span className="pw-item-name">Faxes</span>
          </div>
          <div className="pw-item" style={{ "--d": "4400ms", "--rot": "-1.5deg" } as Vars}>
            <div className="pw-paper">
              <div className="pw-grid">
                {Array.from({ length: 15 }, (_, i) => (
                  <span key={i} className={i < 3 ? "pw-th" : undefined} />
                ))}
              </div>
            </div>
            <span className="pw-item-name">Tables</span>
          </div>
        </div>
        <span className="pw-tag">illustrative</span>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div key={step} className="scene-pad pw-scene pw-s1">
        <div className="pw-head">
          <h2 className="pw-title">
            Vision <em>OCR</em>
          </h2>
          <p className="pw-def">
            <b>OCR:</b> the AI looks at a page and turns it into real text.
          </p>
        </div>
        <div className="pw-flow">
          <div className="pw-paper pw-scan">
            <span className="pw-line" style={{ "--w": "50%" } as Vars} />
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <svg key={i} viewBox="0 0 280 40">
                <path className="pw-svg-ink" d={SCRIBBLE} />
              </svg>
            ))}
            <span className="pw-beam" />
          </div>
          <svg className="pw-arrow" viewBox="0 0 120 40">
            <path d="M6 20 H110 M90 6 L112 20 L90 34" pathLength={1} />
          </svg>
          <div className="pw-paper pw-out">
            <span className="pw-tag">illustrative</span>
            <span className="pw-out-label">Text a computer can use</span>
            <span className="pw-out-row" style={{ "--d": "4900ms" } as Vars}>
              <b>Name:</b> Alex Morgan
            </span>
            <span className="pw-out-row" style={{ "--d": "5400ms" } as Vars}>
              <b>Allergy:</b> penicillin
            </span>
            <span className="pw-out-row" style={{ "--d": "5900ms" } as Vars}>
              <b>Medicine:</b> metformin
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (step === 2) {
    let n = 0;
    return (
      <div key={step} className="scene-pad pw-scene pw-s2">
        <div className="pw-split">
          <div className="pw-copy">
            <span className="pw-name">Vision OCR LLM</span>
            <h2 className="pw-title">
              Every word, <em>boxed.</em>
            </h2>
            <p className="pw-sub">It points to exactly where each word sits on the page.</p>
          </div>
          <div className="pw-paper pw-form">
            <span className="pw-tag">illustrative</span>
            {FORM.map((row) => (
              <div key={row[0]} className="pw-form-row">
                {row.map((w, i) => (
                  <span key={w} className={`pw-word${i === 0 ? " is-key" : ""}`}>
                    {w}
                    <svg>
                      <rect
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                        rx="8"
                        pathLength={1}
                        style={{ "--d": `${600 + n++ * 110}ms` } as Vars}
                      />
                    </svg>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div key={step} className="scene-pad pw-scene pw-s3">
        <div className="pw-stack">
          <span className="pw-name">Vision OCR Structured LLM</span>
          <h2 className="pw-title">
            Turns a form into <em>organized data.</em>
          </h2>
        </div>
        <div className="pw-pipe">
          <div className="pw-paper pw-messy">
            <span className="pw-line" style={{ "--w": "55%" } as Vars} />
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <svg key={i} viewBox="0 0 280 40">
                <path className="pw-svg-ink" d={SCRIBBLE} />
              </svg>
            ))}
          </div>
          <svg className="pw-arrow" viewBox="0 0 120 40">
            <path d="M6 20 H110 M90 6 L112 20 L90 34" pathLength={1} />
          </svg>
          <div className="pw-paper pw-data">
            <span className="pw-tag">illustrative</span>
            {FORM.slice(0, 4).map(([key, ...val], i) => (
              <div key={key} className="pw-row" style={{ "--d": `${1900 + i * 500}ms` } as Vars}>
                <span className="pw-row-key">{key.toLowerCase()}</span>
                <span className="pw-row-val">{val.join(" ")}</span>
              </div>
            ))}
          </div>
          <svg className="pw-link" viewBox="0 0 90 24">
            <path d="M4 12 H86" />
          </svg>
          <div className="pw-db">
            <svg viewBox="0 0 150 170">
              <path
                className="pw-db-body"
                d="M10 30 v110 c0 30 130 30 130 0 v-110 M10 30 c0 -30 130 -30 130 0 c0 30 -130 30 -130 0 z M10 85 c0 30 130 30 130 0"
              />
            </svg>
            <span className="pw-db-label">
              Ready for
              <br />
              your systems
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div key={step} className="scene-pad pw-scene pw-s4">
      <h2 className="pw-title">
        Best at reading <em>tables.</em>
      </h2>
      <div className="pw-bars">
        {TABLES.map((m, i) => (
          <div key={m.name} className={`pw-bar-row${i === 0 ? " is-win" : ""}`}>
            <span className="pw-bar-name">{m.name}</span>
            <div className="pw-bar-track">
              <span
                className="pw-bar"
                style={{ "--w": `${Math.round((m.score / 0.8) * 760)}px`, "--d": `${900 + i * 200}ms` } as Vars}
              />
              {i === 0 && <span className="pw-best">Best of all tested</span>}
            </div>
          </div>
        ))}
      </div>
      <div className="pw-foot">
        <p className="pw-cap">Table-structure score, from John Snow Labs&rsquo; own tests.</p>
        <div className="pw-gpu">
          <svg viewBox="0 0 96 56">
            <rect className="pw-gpu-body" x="2" y="4" width="92" height="44" rx="10" />
            <circle className="pw-gpu-fan" cx="28" cy="26" r="13" />
            <circle className="pw-gpu-fan" cx="68" cy="26" r="13" />
          </svg>
          <span>
            On <em>one</em> graphics card
          </span>
        </div>
      </div>
    </div>
  );
}
