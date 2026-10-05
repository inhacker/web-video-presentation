import type { CSSProperties } from "react";
import type { ChapterStepProps } from "../../registry/types";
import "./Coldopen.css";

/**
 * Chapter 1 · coldopen
 *   step 0  record fired at the cloud, stopped at the firewall, stamped
 *   step 1  a model inside the wall; scoreboards roll to OpenMed averages
 *   step 2  broadsheet reveal: John Snow Labs · Medium / Small
 *   step 3  scorecard with the losses circled in red pen
 *
 * Every step root carries key={step} so its CSS animations replay.
 */

type Vars = CSSProperties & Record<`--${string}`, string | number>;

/* ─── shared diagram: hospital | firewall | cloud ─── */
function Wall() {
  return (
    <g className="co-wall">
      <defs>
        <pattern id="co-hatch" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="16" className="co-hatch-line" />
        </pattern>
      </defs>
      <rect x="840" y="40" width="44" height="470" className="co-wall-body" />
      <rect x="840" y="40" width="44" height="470" fill="url(#co-hatch)" />
      <text x="862" y="548" className="co-svg-label" textAnchor="middle">FIREWALL</text>
    </g>
  );
}

function Cloud({ dim = false }: { dim?: boolean }) {
  return (
    <g className={dim ? "co-cloud is-dim" : "co-cloud"}>
      <path
        className="co-cloud-shape"
        d="M1160 380 C1090 380 1080 300 1150 290 C1150 220 1250 200 1290 250 C1320 180 1450 180 1470 260 C1560 250 1590 370 1510 380 Z"
      />
      <text x="1330" y="330" className="co-cloud-name" textAnchor="middle">GPT 5.5</text>
      <text x="1330" y="440" className="co-svg-label" textAnchor="middle">SOMEONE ELSE'S CLOUD</text>
    </g>
  );
}

function Record() {
  return (
    <g className="co-record">
      <rect x="230" y="150" width="270" height="290" className="co-paper" />
      <text x="254" y="192" className="co-svg-label co-svg-label--ink">PATIENT RECORD</text>
      <line x1="254" y1="212" x2="476" y2="212" className="co-paper-rule" />
      {[244, 276, 308, 340, 372, 404].map((y, i) => (
        <rect key={y} x="254" y={y - 10} width={i % 3 === 1 ? 120 : 176} height="12" className="co-redact" />
      ))}
      <rect x="440" y="118" width="60" height="28" className="co-phi" />
      <text x="470" y="138" className="co-phi-text" textAnchor="middle">PHI</text>
    </g>
  );
}

function Server() {
  return (
    <g className="co-server">
      {[170, 250, 330].map((y, i) => (
        <g key={y} className="co-server-unit" style={{ "--i": i } as Vars}>
          <rect x="220" y={y} width="260" height="64" className="co-paper" />
          <circle cx="250" cy={y + 32} r="7" className="co-led" />
          <line x1="280" y1={y + 24} x2="450" y2={y + 24} className="co-paper-rule" />
          <line x1="280" y1={y + 40} x2="410" y2={y + 40} className="co-paper-rule" />
        </g>
      ))}
      <text x="350" y="440" className="co-svg-label co-svg-label--ink" textAnchor="middle">MODEL ON YOUR SERVERS</text>
    </g>
  );
}

/* ─── odometer digits (pure CSS roll) ─── */
function Odometer({ value, delay = 0, accent = false }: { value: string; delay?: number; accent?: boolean }) {
  return (
    <span className={accent ? "co-odo is-accent" : "co-odo"}>
      {value.split("").map((ch, i) => {
        if (!/\d/.test(ch)) return <span key={i} className="co-odo-sep">{ch}</span>;
        const to = 10 + Number(ch);
        return (
          <span key={i} className="co-odo-win">
            <span className="co-odo-strip" style={{ "--to": to, "--dl": `${delay + i * 90}ms` } as Vars}>
              {Array.from({ length: 20 }, (_, n) => (
                <span key={n}>{n % 10}</span>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
}

/* ─── step 3 data — Medium vs best frontier (article §OpenMed / §MedHELM / §Red-Teaming) ─── */
const SCORECARD = [
  { name: "OpenMed average", jsl: "93.99", rival: "93.28", who: "GPT 5.5", lose: false },
  { name: "MedHELM mean win rate", jsl: "77.78", rival: "73.56", who: "GPT 5.5", lose: false },
  { name: "Red-teaming pass rate", jsl: "94%", rival: "85%", who: "GPT 5.5", lose: false },
  { name: "MedHELM · RaceBias", jsl: "88", rival: "91", who: "all three", lose: true },
  { name: "OpenMed · College Biology", jsl: "94.3", rival: "99.3", who: "all three", lose: true },
  { name: "OpenMed · Prof. Medicine", jsl: "96", rival: "98", who: "GPT 5.5", lose: true },
];

export default function Coldopen({ step }: ChapterStepProps) {
  /* step 0 — blocked at the wall */
  if (step === 0) {
    return (
      <div key={step} className="scene-pad co-scene">
        <h1 className="co-headline co-print">
          <span className="display-en">Can't leave</span>{" "}
          <span className="serif-it co-em">the building.</span>
        </h1>
        <svg className="co-diagram" viewBox="0 0 1720 700">
          <text x="0" y="40" className="co-svg-label">INSIDE · YOUR HOSPITAL</text>
          <text x="1720" y="40" className="co-svg-label" textAnchor="end">OUTSIDE</text>
          <Record />
          <Wall />
          <Cloud />
          {/* intended route, ghosted */}
          <path d="M510 295 C660 230 980 230 1150 300" className="co-route-ghost" />
          {/* actual route, stops at the wall */}
          <path d="M510 295 C620 245 750 235 834 250" className="co-route" pathLength={1} />
          <g className="co-impact">
            <line x1="816" y1="232" x2="852" y2="268" />
            <line x1="852" y1="232" x2="816" y2="268" />
          </g>
          <g className="co-stamp">
            <rect x="600" y="92" width="210" height="64" />
            <text x="705" y="137" textAnchor="middle">BLOCKED</text>
          </g>
        </svg>
      </div>
    );
  }

  /* step 1 — the one inside scores higher */
  if (step === 1) {
    return (
      <div key={step} className="scene-pad co-scene">
        <h1 className="co-headline co-headline--q co-print">
          <span className="display-en">What if the one inside</span>{" "}
          <span className="serif-it co-em">scores higher?</span>
        </h1>
        <svg className="co-diagram" viewBox="0 0 1720 700">
          <Server />
          <Wall />
          <Cloud dim />
          <foreignObject x="170" y="470" width="400" height="250">
            <div className="co-board">
              <div className="kicker">Inside · OpenMed avg</div>
              <Odometer value="93.99" delay={250} accent />
            </div>
          </foreignObject>
          <foreignObject x="1130" y="470" width="400" height="250">
            <div className="co-board">
              <div className="kicker">GPT 5.5 · OpenMed avg</div>
              <Odometer value="93.28" delay={250} />
            </div>
          </foreignObject>
        </svg>
      </div>
    );
  }

  /* step 2 — the claim-maker and the pair */
  if (step === 2) {
    return (
      <div key={step} className="scene-pad co-scene co-paper-page">
        <div className="kicker co-rise">John Snow Labs · Medical LLMs</div>
        <hr className="rule-accent co-grow" />
        <div className="co-columns">
          <div className="co-col" style={{ "--dl": "500ms" } as Vars}>
            <div className="co-col-name serif-it">Medium</div>
            <div className="co-col-role">The flagship</div>
            <div className="co-col-spec mono">~67 GB GPU · 262K context</div>
          </div>
          <div className="co-col-rule" />
          <div className="co-col" style={{ "--dl": "1000ms" } as Vars}>
            <div className="co-col-name serif-it">Small</div>
            <div className="co-col-role">The compact one</div>
            <div className="co-col-spec mono">~25 GB · one GPU</div>
          </div>
        </div>
        <div className="co-shared mono">text + image · on-premise or private cloud</div>
        <div className="co-deck serif-it">Let's check their numbers.</div>
      </div>
    );
  }

  /* step 3 — the losses, circled */
  return (
    <div key={step} className="scene-pad co-scene co-card-layout">
      <h1 className="co-side-head">
        <span className="display-en">Including</span>
        <br />
        <span className="serif-it co-em">where they lose.</span>
      </h1>
      <div className="co-table">
        <div className="co-tr co-th">
          <span>Benchmark</span>
          <span>JSL</span>
          <span>Frontier</span>
        </div>
        {SCORECARD.map((r, i) => (
          <div key={r.name} className={r.lose ? "co-tr is-lose" : "co-tr"} style={{ "--i": i } as Vars}>
            <span className="co-td-name">{r.name}</span>
            <span className="co-td-num">{r.jsl}</span>
            <span className="co-td-num co-td-rival">
              {r.rival}
              <em>{r.who}</em>
            </span>
            {r.lose && (
              <svg className="co-circle" viewBox="0 0 1000 100" preserveAspectRatio="none" style={{ "--c": i - 3 } as Vars}>
                <path
                  pathLength={1}
                  d="M22 56 C14 16 400 4 700 8 C900 12 992 28 986 54 C980 90 600 98 330 94 C120 92 6 82 30 40"
                />
              </svg>
            )}
          </div>
        ))}
        <div className="co-margin-note serif-it">they lose here</div>
      </div>
    </div>
  );
}
