import type { CSSProperties } from "react";
import type { ChapterStepProps } from "../../registry/types";
import "./Takeaway.css";

/**
 * Chapter 12 · takeaway
 *   step 0  red-pen ledger: medical text — two ticks; MedHELM's wide lead underlined
 *   step 1  OCR scoreboard: three tiles flip to their winners — tables / Gemini / Gemini
 *   step 2  walls draw around the family; GPU tags light up: most of them, one GPU
 *   step 3  the charts get stamped "vendor-reported"; an arrow re-runs them on your data
 *   step 4  call to action: docs + Colab cards (links are placeholders until provided)
 *
 * Every step root carries key={step} so its CSS animations replay.
 * Data: article §How the Models Compare (both families), offering tables, §Medical Small LLMs.
 */

type Vars = CSSProperties & Record<`--${string}`, string | number>;

/* ─── step 0 · medical text (article §Medical LLMs › How the Models Compare) ─── */
const TEXT_ROWS = [
  { bench: "OpenMed", sub: "average", jsl: "93.99", fr: "93.14", lead: "+0.85", wide: false },
  { bench: "MedHELM", sub: "mean win rate, averaged", jsl: "77.78", fr: "72.41", lead: "+5.37", wide: true },
];

/* ─── step 1 · OCR winners (article OCR tables) ─── */
const OCR_TILES = [
  { task: "Tables", metric: "TEDS-S", winner: "Vision OCR LLM", v: "0.784", jsl: true, note: "best frontier 0.704" },
  { task: "Grounding", metric: "1 − CER", winner: "Gemini 3.5 Flash", v: "0.968", jsl: false, note: "Vision OCR LLM 0.938" },
  { task: "JSON", metric: "field accuracy", winner: "Gemini 3.5 Flash", v: "0.813", jsl: false, note: "Structured LLM 0.708" },
];

/* ─── step 2 · where they run (article offering tables) ─── */
const CHIPS = [
  { name: "Medical LLM Medium", gpu: "TP 2 · 4 · 8", one: false },
  { name: "Medical LLM Small", gpu: "1 GPU", one: true },
  { name: "Vision OCR LLM", gpu: "1 GPU", one: true },
  { name: "Vision OCR Structured", gpu: "1 GPU · ~8K", one: true },
];

export default function Takeaway({ step }: ChapterStepProps) {
  /* step 0 — medical text verdict */
  if (step === 0) {
    return (
      <div key={step} className="scene-pad tk-scene">
        <h1 className="tk-headline tk-print">
          <span className="display-en">Medical text:</span> <span className="serif-it tk-em">both benchmarks.</span>
        </h1>
        <div className="tk-ledger">
          <div className="tk-lrow tk-lhead mono">
            <span>Benchmark</span>
            <span>Medium</span>
            <span>Frontier avg</span>
            <span />
          </div>
          {TEXT_ROWS.map((r, i) => (
            <div key={r.bench} className={r.wide ? "tk-lrow is-wide" : "tk-lrow"} style={{ "--i": i } as Vars}>
              <span className="tk-bench">
                {r.bench}
                <em className="mono">{r.sub}</em>
              </span>
              <span className="hero-num tk-num tk-em">{r.jsl}</span>
              <span className="hero-num tk-num tk-num--fr">{r.fr}</span>
              <span className="tk-tickcell">
                <svg className="tk-tick" viewBox="0 0 80 64">
                  <path d="M6 34 L28 56 L74 6" pathLength={1} />
                </svg>
                <span className={r.wide ? "tk-lead is-wide serif-it" : "tk-lead serif-it"}>{r.lead}</span>
              </span>
              {r.wide && (
                <svg className="tk-underline" viewBox="0 0 1720 24">
                  <path d="M6 16 C360 6 900 22 1714 8" pathLength={1} />
                </svg>
              )}
            </div>
          ))}
          <div className="tk-margin serif-it">the wide lead — clinical work</div>
        </div>
      </div>
    );
  }

  /* step 1 — OCR is mixed */
  if (step === 1) {
    return (
      <div key={step} className="scene-pad tk-scene">
        <h1 className="tk-headline tk-print">
          <span className="display-en">OCR:</span> <span className="serif-it tk-em">mixed.</span>
        </h1>
        <div className="tk-tiles">
          {OCR_TILES.map((t, i) => (
            <div key={t.task} className={t.jsl ? "tk-tile is-jsl" : "tk-tile"} style={{ "--i": i } as Vars}>
              <div className="tk-tile-inner">
                <div className="tk-face tk-front">
                  <span className="tk-task serif-it">{t.task}</span>
                  <span className="tk-metric mono">{t.metric}</span>
                </div>
                <div className="tk-face tk-back">
                  <span className="tk-task-sm mono">{t.task} · winner</span>
                  <span className="tk-winner">{t.winner}</span>
                  <span className="hero-num tk-tile-v">{t.v}</span>
                  <span className="tk-tile-note mono">{t.note}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* step 2 — where they run */
  if (step === 2) {
    return (
      <div key={step} className="scene-pad tk-scene">
        <h1 className="tk-headline tk-headline--sm tk-print">
          <span className="display-en">Where they run</span> <span className="serif-it tk-em">hasn't changed.</span>
        </h1>
        <div className="tk-walls">
          <svg className="tk-walls-svg" viewBox="0 0 1720 520" preserveAspectRatio="none">
            <rect x="4" y="4" width="1712" height="512" pathLength={1} className="tk-wall" />
          </svg>
          <span className="tk-walls-label mono">your walls · on-premise or private cloud</span>
          <div className="tk-chips">
            {CHIPS.map((c, i) => (
              <div key={c.name} className={c.one ? "tk-chip is-one" : "tk-chip"} style={{ "--i": i } as Vars}>
                <svg className="tk-gpu" viewBox="0 0 120 80">
                  <rect x="10" y="10" width="100" height="60" className="tk-gpu-body" />
                  {[24, 44, 64, 84].map((x) => (
                    <line key={x} x1={x} y1="70" x2={x} y2="78" className="tk-gpu-pin" />
                  ))}
                  <rect x="38" y="24" width="44" height="32" className="tk-gpu-die" />
                </svg>
                <span className="tk-chip-name">{c.name}</span>
                <span className="tk-chip-gpu mono">{c.gpu}</span>
              </div>
            ))}
          </div>
          <p className="tk-quote serif-it">&ldquo;The whole family runs single-GPU on-premise&rdquo; <span className="mono">— their words, on Vision OCR</span></p>
        </div>
      </div>
    );
  }

  /* step 3 — vendor's own numbers */
  if (step === 3) {
    return (
      <div key={step} className="scene-pad tk-scene tk-check">
        <div className="tk-stack">
          {[0, 1, 2].map((n) => (
            <div key={n} className="tk-mini card" style={{ "--n": n } as Vars}>
              {[0.78, 0.6, 0.52, 0.45].map((h, j) => (
                <span key={j} className={j === 0 ? "tk-mini-bar is-jsl" : "tk-mini-bar"} style={{ height: `${h * (1 - n * 0.12) * 100}%` }} />
              ))}
            </div>
          ))}
          <span className="tk-vendor-stamp mono">vendor's own numbers</span>
        </div>
        <svg className="tk-rerun" viewBox="0 0 300 160">
          <path d="M20 80 C90 20 210 20 270 80" pathLength={1} className="tk-rerun-path" />
          <path d="M252 62 L272 82 L246 90" className="tk-rerun-head" />
          <text x="150" y="140" className="tk-svg-label" textAnchor="middle">SAME TESTS</text>
        </svg>
        <div className="tk-yours">
          <div className="tk-folder">
            <span className="tk-folder-tab" />
            <span className="tk-folder-label serif-it">your data</span>
          </div>
          <p className="tk-yours-copy">
            Choosing for a hospital? <span className="tk-em">Run them on your own records.</span>
          </p>
        </div>
      </div>
    );
  }

  /* step 4 — docs + Colab (placeholders until the user provides final links) */
  return (
    <div key={step} className="scene-pad tk-scene">
      <h1 className="tk-headline tk-headline--sm tk-print">
        <span className="display-en">Try them</span> <span className="serif-it tk-em">yourself.</span>
      </h1>
      <div className="tk-cta">
        <div className="tk-link card tk-link--docs">
          <span className="tk-link-kind mono">Docs</span>
          <span className="tk-link-title serif-it">Link in the description</span>
          <span className="tk-placeholder mono">links: coming soon</span>
        </div>
        <div className="tk-link card tk-link--colab">
          <span className="tk-link-kind mono">Colab notebook · the small models</span>
          <div className="tk-cell mono">
            <span className="tk-cell-n">[1]</span>
            <span className="tk-cell-lines">
              <span className="tk-cell-line" style={{ "--i": 0 } as Vars}># explore the small medical models</span>
              <span className="tk-cell-line" style={{ "--i": 1 } as Vars}># CPU-ready, quantized q4 · q8 · q16</span>
            </span>
          </div>
          <span className="tk-placeholder mono">links: coming soon</span>
        </div>
      </div>
      <p className="tk-foot mono tk-late4">decision support · clinical chatbots · research platforms</p>
    </div>
  );
}
