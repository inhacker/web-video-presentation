import type { CSSProperties } from "react";
import type { ChapterStepProps } from "../../registry/types";
import "./Smart.css";

/**
 * Chapter 3 · smart
 *   step 0  a small private AI faces three big names, with a question mark
 *   step 1  the same exam paper is dealt to every AI: that's a benchmark
 *   step 2  four kinds of real clinical work light up as they're named
 *   step 3  four lanes: Medium vs GPT, Claude, Gemini, each named in turn
 *   step 4  the runners race to their MedHELM win rate; Medium finishes first
 *   step 5  13 task tiles, 12 fill in: best on 12 of 13
 *
 * Every step root carries key={step} so its CSS animations replay.
 */

type Vars = CSSProperties & Record<`--${string}`, string | number>;

/* MedHELM mean win rate (article L70), placed on a 60→80 track */
const RACE = [
  { name: "Medical LLM Medium", us: true, rate: 77.78, d: 300 },
  { name: "GPT 5.5", us: false, rate: 73.56, d: 2900 },
  { name: "Claude Opus 4.8", us: false, rate: 72.06, d: 3600 },
  { name: "Gemini 3.5 Flash", us: false, rate: 71.61, d: 4300 },
];
const toPct = (rate: number) => `${((rate - 60) / 20) * 100}%`;

const WORK = [
  {
    name: "Writing notes",
    icon: <path className="sm-ico sm-ico-fill" d="M20 8 h44 l20 20 v60 h-64 z M34 44 h36 M34 60 h36 M34 76 h20" />,
  },
  {
    name: "Reasoning",
    icon: (
      <>
        <circle className="sm-ico sm-ico-fill" cx="48" cy="44" r="30" />
        <path className="sm-ico" d="M36 44 l8 8 l16 -16 M38 80 h20 M42 90 h12" />
      </>
    ),
  },
  {
    name: "Safety",
    icon: <path className="sm-ico sm-ico-fill" d="M48 6 l34 12 v26 c0 24 -16 40 -34 46 c-18 -6 -34 -22 -34 -46 v-26 z M34 48 l10 10 l20 -20" />,
  },
  {
    name: "Talking with patients",
    icon: (
      <path className="sm-ico sm-ico-fill" d="M8 14 h56 v36 h-30 l-14 12 v-12 h-12 z M44 58 v8 h22 l12 10 v-10 h10 v-34 h-16" />
    ),
  },
];

function Lanes({ race }: { race: boolean }) {
  return (
    <div className="sm-lanes">
      {RACE.map((r) => (
        <div key={r.name} className={`sm-lane${r.us ? " is-us" : ""}`}>
          <span className="sm-lane-name" style={{ "--d": race ? "0ms" : `${r.d}ms` } as Vars}>
            {r.name}
          </span>
          <div className="sm-track">
            <span className="sm-runner" style={{ "--d": `${r.d}ms`, "--to": toPct(r.rate) } as Vars} />
            {!race && r.us && (
              <>
                <span className="sm-finish" />
                <span className="sm-flag">SAME TEST</span>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Smart({ step }: ChapterStepProps) {
  if (step === 0) {
    return (
      <div key={step} className="scene-pad sm-scene sm-s0">
        <h2 className="sm-title">
          As smart as the <em>big names?</em>
        </h2>
        <div className="sm-vs">
          <span className="sm-mine">
            Private
            <br />
            AI
          </span>
          <span className="sm-q">?</span>
          <div className="sm-bigs">
            {["GPT", "Claude", "Gemini"].map((n, i) => (
              <span key={n} className="sm-big" style={{ "--d": `${600 + i * 200}ms` } as Vars}>
                {n}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div key={step} className="scene-pad sm-scene sm-s1">
        <h2 className="sm-title">
          Every AI gets <em>the same test.</em>
        </h2>
        <div className="sm-exam-row">
          {["Medium", "GPT", "Claude", "Gemini"].map((n, i) => (
            <div key={n} className="sm-exam">
              <div className="sm-paper" style={{ "--d": `${1500 + i * 300}ms` } as Vars}>
                <span className="sm-paper-head">TEST</span>
                <span className="sm-paper-line" />
                <span className="sm-paper-box">
                  <span />
                  <span />
                  <span />
                </span>
                <span className="sm-paper-line" />
                <span className="sm-paper-box">
                  <span />
                  <span />
                  <span />
                </span>
              </div>
              <span className={`sm-who${i === 0 ? " is-us" : ""}`}>{n}</span>
            </div>
          ))}
        </div>
        <p className="sm-def">
          <b>Benchmark:</b> a standard test, so AIs can be compared fairly.
        </p>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div key={step} className="scene-pad sm-scene sm-s2">
        <h2 className="sm-title">
          One test checks <em>real clinical work.</em>
        </h2>
        <div className="sm-work">
          {WORK.map((w, i) => (
            <div key={w.name} className="sm-task" style={{ "--d": `${3200 + i * 800}ms` } as Vars}>
              <svg viewBox="0 0 96 96">{w.icon}</svg>
              <span className="sm-task-name">{w.name}</span>
            </div>
          ))}
        </div>
        <span className="sm-tag">MedHELM · 13 clinical tasks</span>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div key={step} className="scene-pad sm-scene sm-s3">
        <h2 className="sm-title">
          Head to <em>head.</em>
        </h2>
        <Lanes race={false} />
      </div>
    );
  }

  if (step === 4) {
    return (
      <div key={step} className="scene-pad sm-scene sm-s4">
        <div className="sm-one-row">
          <span className="sm-one">#1</span>
          <span className="sm-one-sub">
            overall
            <span className="sm-one-note">Highest score of every model tested</span>
          </span>
        </div>
        <Lanes race />
        <span className="sm-tag sm-scale">Position = overall MedHELM score (mean win rate, track from 60 to 80)</span>
      </div>
    );
  }

  return (
    <div key={step} className="scene-pad sm-scene sm-s5">
      <div className="sm-tally">
        <div className="sm-grid">
          {Array.from({ length: 13 }, (_, i) => (
            <span
              key={i}
              className={`sm-cell ${i < 12 ? "is-win" : "is-open"}`}
              style={{ "--d": `${300 + i * 130}ms` } as Vars}
            >
              {i < 12 && (
                <svg viewBox="0 0 48 48">
                  <path d="M10 25 l9 9 l19 -20" />
                </svg>
              )}
            </span>
          ))}
        </div>
        <div>
          <p className="sm-count">
            <em>12</em> of 13
          </p>
          <p className="sm-count-sub">tasks where Medium scored best</p>
        </div>
      </div>
    </div>
  );
}
