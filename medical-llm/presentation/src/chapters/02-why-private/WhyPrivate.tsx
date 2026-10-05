import type { CSSProperties } from "react";
import type { ChapterStepProps } from "../../registry/types";
import "./WhyPrivate.css";

/**
 * Chapter 2 · why-private
 *   step 0  balance tips toward the domain-specific model
 *   step 1  evidence piles up in two stacks: research / benchmarks
 *   step 2  the pair is dealt onto the table: Medium / Small
 *   step 3  text + image flow in; the identity padlock snaps shut
 *   step 4  someone else's cloud vs. your walls — data loops inside
 *   step 5  privacy and accuracy both fill; "trade-off" struck out
 *   step 6  clinical reasoning chain lights up → diagnosis
 *   step 7  research abstract highlighted + a variant in a DNA strand
 *
 * Every step root carries key={step} so its CSS animations replay.
 */

type Vars = CSSProperties & Record<`--${string}`, string | number>;

/* ─── step 0 · balance ─── */
function Balance() {
  return (
    <svg className="wp-svg" viewBox="0 150 1720 420">
      {/* fulcrum */}
      <path d="M860 300 L800 520 L920 520 Z" className="wp-ink-fill" />
      <line x1="700" y1="520" x2="1020" y2="520" className="wp-ink-line" />

      <g className="wp-beam">
        <line x1="260" y1="300" x2="1460" y2="300" className="wp-beam-bar" />
        <circle cx="860" cy="300" r="12" className="wp-ink-fill" />
      </g>

      <g className="wp-pan wp-pan--up">
        <line x1="260" y1="300" x2="160" y2="420" className="wp-string" />
        <line x1="260" y1="300" x2="360" y2="420" className="wp-string" />
        <line x1="130" y1="420" x2="390" y2="420" className="wp-plate" />
        <rect x="170" y="340" width="180" height="80" className="wp-block wp-block--hollow" />
        <text x="260" y="390" className="wp-block-label" textAnchor="middle">GENERAL</text>
        <text x="260" y="468" className="wp-svg-label" textAnchor="middle">GENERAL-PURPOSE</text>
      </g>

      <g className="wp-pan wp-pan--down">
        <line x1="1460" y1="300" x2="1360" y2="420" className="wp-string" />
        <line x1="1460" y1="300" x2="1560" y2="420" className="wp-string" />
        <line x1="1330" y1="420" x2="1590" y2="420" className="wp-plate" />
        <rect x="1350" y="330" width="220" height="90" className="wp-block wp-block--solid" />
        <text x="1460" y="385" className="wp-block-label wp-block-label--inv" textAnchor="middle">SPECIALIZED</text>
        <text x="1460" y="468" className="wp-svg-label" textAnchor="middle">DOMAIN-SPECIFIC · TASK-OPTIMIZED</text>
      </g>
    </svg>
  );
}

/* ─── step 1 · evidence stacks ─── */
function Stack({ x, label, offset }: { x: number; label: string; offset: number }) {
  const sheets = [0, 1, 2, 3, 4, 5];
  return (
    <g>
      {sheets.map((n) => (
        <rect
          key={n}
          x={x - 190 + (n % 2 === 0 ? -8 : 10)}
          y={470 - n * 34}
          width="380"
          height="30"
          className="wp-sheet"
          style={{ "--n": n + offset } as Vars}
        />
      ))}
      <line x1={x - 240} y1="502" x2={x + 240} y2="502" className="wp-ink-line" />
      <text x={x} y="548" className="wp-svg-label wp-svg-label--ink" textAnchor="middle">{label}</text>
    </g>
  );
}

/* ─── step 3 · inputs + padlock ─── */
function Inputs() {
  return (
    <svg className="wp-svg" viewBox="0 0 1720 600">
      {/* text input tile */}
      <g className="wp-tile" style={{ "--d": "0ms" } as Vars}>
        <rect x="40" y="70" width="300" height="190" className="wp-paper" />
        {[115, 145, 175, 205].map((y, i) => (
          <line key={y} x1="70" y1={y} x2={i === 3 ? 230 : 310} y2={y} className="wp-text-line" />
        ))}
        <text x="190" y="300" className="wp-svg-label wp-svg-label--ink" textAnchor="middle">TEXT</text>
      </g>
      {/* image input tile */}
      <g className="wp-tile" style={{ "--d": "250ms" } as Vars}>
        <rect x="40" y="350" width="300" height="190" className="wp-paper" />
        <rect x="70" y="378" width="240" height="134" className="wp-img-frame" />
        <line x1="190" y1="390" x2="190" y2="500" className="wp-crosshair" />
        <line x1="90" y1="445" x2="290" y2="445" className="wp-crosshair" />
        <circle cx="190" cy="445" r="34" className="wp-crosshair" />
        <text x="190" y="580" className="wp-svg-label wp-svg-label--ink" textAnchor="middle">IMAGE</text>
      </g>

      {/* flows into the model */}
      <path d="M350 165 C480 165 520 290 640 290" className="wp-flow" pathLength={1} style={{ "--d": "600ms" } as Vars} />
      <path d="M350 445 C480 445 520 320 640 320" className="wp-flow" pathLength={1} style={{ "--d": "800ms" } as Vars} />

      <g className="wp-model">
        <rect x="650" y="200" width="420" height="210" className="wp-model-box" />
        <text x="860" y="290" className="wp-model-name" textAnchor="middle">Medical LLM</text>
        <text x="860" y="345" className="wp-svg-label" textAnchor="middle">MEDIUM · SMALL</text>
      </g>

      {/* identity padlock */}
      <path d="M1080 305 L1250 305" className="wp-flow wp-flow--quiet" pathLength={1} style={{ "--d": "1300ms" } as Vars} />
      <g className="wp-lock">
        <path d="M1300 250 L1300 200 C1300 140 1400 140 1400 200 L1400 250" className="wp-shackle" />
        <rect x="1270" y="250" width="160" height="130" className="wp-lock-body" />
        <circle cx="1350" cy="305" r="13" className="wp-keyhole" />
        <rect x="1345" y="310" width="10" height="34" className="wp-keyhole" />
      </g>
      <text x="1350" y="440" className="wp-svg-label wp-svg-label--ink wp-late" textAnchor="middle">IDENTITY</text>
      <text x="1350" y="494" className="wp-lock-name wp-late" textAnchor="middle">John Snow Labs</text>
    </svg>
  );
}

/* ─── step 4 · cloud vs. your walls ─── */
function WhereTheyRun() {
  return (
    <svg className="wp-svg" viewBox="0 0 1720 640">
      <g className="wp-away">
        <path
          d="M110 430 C30 430 20 330 100 318 C100 228 220 200 270 262 C306 176 470 176 494 276 C600 262 640 414 540 430 Z"
          className="wp-cloud"
        />
        <text x="320" y="320" className="wp-cloud-name" textAnchor="middle">GPT 5.5</text>
        <text x="320" y="364" className="wp-cloud-name" textAnchor="middle">Claude Opus 4.8</text>
        <text x="320" y="408" className="wp-cloud-name" textAnchor="middle">Gemini 3.5 Flash</text>
        <text x="320" y="500" className="wp-svg-label" textAnchor="middle">SOMEONE ELSE'S CLOUD</text>
      </g>

      <line x1="760" y1="60" x2="760" y2="600" className="wp-divider" />

      {/* your walls */}
      <rect x="880" y="70" width="800" height="500" className="wp-walls" pathLength={1} />
      <text x="900" y="56" className="wp-svg-label wp-svg-label--ink wp-mid">YOUR WALLS</text>

      <g className="wp-mid">
        <rect x="960" y="200" width="250" height="220" className="wp-paper" />
        {[240, 300, 360].map((y) => (
          <g key={y}>
            <line x1="990" y1={y} x2="1180" y2={y} className="wp-text-line" />
            <circle cx="1170" cy={y + 22} r="6" className="wp-led" />
          </g>
        ))}
        <text x="1085" y="470" className="wp-svg-label wp-svg-label--ink" textAnchor="middle">ON-PREMISE</text>

        <path
          d="M1390 380 C1340 380 1334 318 1386 310 C1386 256 1460 240 1490 278 C1512 228 1608 230 1618 290 C1676 286 1690 376 1630 380 Z"
          className="wp-cloud wp-cloud--own"
          transform="translate(-70 0)"
        />
        <text x="1440" y="470" className="wp-svg-label wp-svg-label--ink" textAnchor="middle">PRIVATE CLOUD</text>
      </g>

      {/* patient data circulating — never crosses the wall */}
      <path d="M915 115 L1645 115 L1645 535 L915 535 Z" className="wp-data-loop" />
      <text x="1280" y="610" className="wp-svg-label wp-late" textAnchor="middle">PATIENT DATA STAYS INSIDE</text>
    </svg>
  );
}

/* ─── step 6 · reasoning chain (illustrative) ─── */
const CHAIN = ["Symptoms", "Findings", "Differential", "Diagnosis"];

/* ─── step 7 · DNA strand (illustrative) ─── */
const DNA = "ATGGCCTTACGGATCCAGTT";
const VARIANT = 12;

export default function WhyPrivate({ step }: ChapterStepProps) {
  /* step 0 — specialized beats general */
  if (step === 0) {
    return (
      <div key={step} className="scene-pad wp-scene">
        <div className="kicker wp-kicker wp-rise">Their argument · in healthcare</div>
        <h1 className="wp-headline wp-print">
          <span className="serif-it wp-em">Specialized</span>{" "}
          <span className="display-en">beats general.</span>
        </h1>
        <Balance />
      </div>
    );
  }

  /* step 1 — the evidence they cite */
  if (step === 1) {
    return (
      <div key={step} className="scene-pad wp-scene wp-evidence">
        <div className="wp-quote-col">
          <div className="kicker wp-kicker wp-rise">Their words</div>
          <p className="wp-big-quote serif-it wp-print">&ldquo;overwhelming evidence&rdquo;</p>
          <p className="wp-quote-sub wp-late">
            &ldquo;domain-specific, task-optimized large language models consistently outperform general-purpose LLMs in healthcare&rdquo;
          </p>
        </div>
        <svg className="wp-svg wp-svg--stacks" viewBox="0 0 1000 580">
          <Stack x={250} label="ACADEMIC RESEARCH" offset={0} />
          <Stack x={750} label="INDUSTRY BENCHMARKS" offset={1} />
        </svg>
      </div>
    );
  }

  /* step 2 — the pair */
  if (step === 2) {
    return (
      <div key={step} className="scene-pad wp-scene wp-pair">
        <h1 className="wp-headline wp-headline--sm wp-print">
          <span className="display-en">So they built</span> <span className="serif-it wp-em">a pair.</span>
        </h1>
        <div className="wp-cards">
          <div className="card wp-model-card" style={{ "--d": "400ms", "--r": "-2.5deg" } as Vars}>
            <div className="kicker wp-kicker">Medical LLM</div>
            <div className="wp-card-name serif-it">Medium</div>
            <hr className="rule" />
            <div className="wp-card-role">Their label: <em className="serif-it">Flagship</em></div>
          </div>
          <div className="card wp-model-card" style={{ "--d": "900ms", "--r": "2deg" } as Vars}>
            <div className="kicker wp-kicker">Medical LLM</div>
            <div className="wp-card-name serif-it">Small</div>
            <hr className="rule" />
            <div className="wp-card-role">Their label: <em className="serif-it">Compact</em></div>
          </div>
        </div>
        <p className="wp-foot mono wp-late">purpose-built for clinical · biomedical · life sciences</p>
      </div>
    );
  }

  /* step 3 — inputs + locked identity */
  if (step === 3) {
    return (
      <div key={step} className="scene-pad wp-scene">
        <h1 className="wp-headline wp-headline--sm wp-print">
          <span className="display-en">Text and images in.</span>{" "}
          <span className="serif-it wp-em">Identity locked.</span>
        </h1>
        <Inputs />
      </div>
    );
  }

  /* step 4 — where they run */
  if (step === 4) {
    return (
      <div key={step} className="scene-pad wp-scene">
        <h1 className="wp-headline wp-headline--sm wp-print">
          <span className="display-en">The real pitch:</span>{" "}
          <span className="serif-it wp-em">where they run.</span>
        </h1>
        <WhereTheyRun />
      </div>
    );
  }

  /* step 5 — no trade-off (their claim) */
  if (step === 5) {
    return (
      <div key={step} className="scene-pad wp-scene wp-tradeoff">
        <div className="wp-seal mono">HIPAA-friendly</div>
        <div className="wp-strike-word serif-it">
          trade-off
          <span className="wp-strike" />
        </div>
        <div className="wp-switches">
          <div className="wp-switch-row">
            <span className="wp-switch" style={{ "--d": "700ms" } as Vars}><span className="wp-knob" /></span>
            <span className="wp-switch-label">Privacy <em className="mono">data stays on your side</em></span>
          </div>
          <div className="wp-switch-row">
            <span className="wp-switch" style={{ "--d": "1300ms" } as Vars}><span className="wp-knob" /></span>
            <span className="wp-switch-label">Medical accuracy <em className="mono">frontier-grade</em></span>
          </div>
        </div>
        <p className="wp-claim serif-it wp-late">
          &ldquo;without giving up frontier-grade medical accuracy&rdquo;
          <span className="wp-claim-by mono">— their claim</span>
        </p>
      </div>
    );
  }

  /* step 6 — clinical reasoning + diagnostics */
  if (step === 6) {
    return (
      <div key={step} className="scene-pad wp-scene wp-work">
        <div className="wp-task-row">
          <span className="wp-task is-on" style={{ "--d": "0ms" } as Vars}>Clinical reasoning</span>
          <span className="wp-task is-on" style={{ "--d": "2600ms" } as Vars}>Diagnostics</span>
        </div>
        <div className="wp-chain">
          {CHAIN.map((c, i) => (
            <div key={c} className="wp-chain-item" style={{ "--i": i } as Vars}>
              {i > 0 && <span className="wp-chain-link" />}
              <span className={i === CHAIN.length - 1 ? "wp-node is-final" : "wp-node"}>{c}</span>
            </div>
          ))}
        </div>
        <p className="wp-foot mono wp-early">illustrative</p>
      </div>
    );
  }

  /* step 7 — research reading + genetic analysis */
  return (
    <div key={step} className="scene-pad wp-scene wp-work">
      <div className="wp-task-row">
        <span className="wp-task is-past">Clinical reasoning</span>
        <span className="wp-task is-past">Diagnostics</span>
        <span className="wp-break" />
        <span className="wp-task is-on" style={{ "--d": "100ms" } as Vars}>Research reading</span>
        <span className="wp-task is-on" style={{ "--d": "2600ms" } as Vars}>Genetic analysis</span>
      </div>
      <div className="wp-panels">
        <div className="wp-abstract">
          <div className="kicker wp-kicker">Abstract · illustrative</div>
          {[0, 1, 2, 3, 4].map((n) => (
            <div key={n} className={n === 1 || n === 2 ? "wp-abs-line is-hit" : "wp-abs-line"} style={{ "--n": n } as Vars}>
              <span className="wp-highlight" />
            </div>
          ))}
        </div>
        <div className="wp-dna">
          <div className="kicker wp-kicker">Sequence · illustrative</div>
          <div className="wp-bases mono">
            {DNA.split("").map((b, i) => (
              <span key={i} className={i === VARIANT ? "wp-base is-variant" : "wp-base"} style={{ "--i": i } as Vars}>
                {b}
              </span>
            ))}
          </div>
          <div className="wp-variant-note serif-it">variant</div>
        </div>
      </div>
      <p className="wp-foot mono wp-early">
        also named: clinical assessment · medical Q&amp;A · research synthesis · decision support
      </p>
    </div>
  );
}
