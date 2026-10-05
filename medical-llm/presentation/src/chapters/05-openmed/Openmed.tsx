import type { CSSProperties } from "react";
import type { ChapterStepProps } from "../../registry/types";
import "./Openmed.css";

/**
 * Chapter 5 · openmed  (article §OpenMed Benchmark Performance + its table)
 *   step 0  "OpenMed" + an answer sheet whose bubbles get filled in
 *   step 1  eight suites dealt out: MedQA, PubMedQA, then six MMLU subjects
 *   step 2  Medium's eight suite scores level off into one average: 93.99
 *   step 3  leaderboard on an honest 0–100 scale
 *   step 4  zoom into 92.8–94.1: the gap is +0.71
 *   step 5  eight-subject grid; four "behind" flags; College Biology duel
 *   step 6  two 10×10 grids — frontier 100 vs Medium 99
 *   step 7  PubMedQA number line — Medium 82, frontier band 74–76.5
 *   step 8  MedQA 96.2 vs 95; its lead bar next to PubMedQA's
 *   step 9  Small 90.63, one commodity GPU drawn, averages ruler
 * Audio (s): 2.8 8.0 5.2 12.8 4.0 11.6 6.6 10.6 5.7 7.8 — motion ends ≥0.6s earlier.
 */

type Vars = CSSProperties & Record<`--${string}`, string | number>;

const MMLU = ["Anatomy", "Clinical Knowledge", "College Biology", "College Medicine", "Medical Genetics", "Professional Medicine"];
const PICKS = [2, 0, 3, 1, 2];

/* ─── article §OpenMed table ─── */
const MEDIUM_SCORES = [96.2, 82, 93.5, 97.5, 94.3, 93.4, 99, 96];
const MEDIUM_AVG = 93.99;

const BOARD = [
  { name: "Medical LLM Medium", v: 93.99, us: true, d: 200 },
  { name: "GPT 5.5", v: 93.28, us: false, d: 1400 },
  { name: "Claude Opus 4.8", v: 93.21, us: false, d: 4600 },
  { name: "Gemini 3.5 Flash", v: 92.94, us: false, d: 8000 },
];

/* f = best of the three frontier models; t = order of the "behind" flag */
const SUBJECTS: Array<{ n: string; m: number; f: number; t?: number; focus?: boolean }> = [
  { n: "MedQA", m: 96.2, f: 95 },
  { n: "PubMedQA", m: 82, f: 76.5 },
  { n: "Anatomy", m: 93.5, f: 94.1, t: 0 },
  { n: "Clinical Knowledge", m: 97.5, f: 97 },
  { n: "College Biology", m: 94.3, f: 99.3, t: 1, focus: true },
  { n: "College Medicine", m: 93.4, f: 90.8 },
  { n: "Medical Genetics", m: 99, f: 100, t: 2 },
  { n: "Professional Medicine", m: 96, f: 98, t: 3 },
];

/* step 2: axis 75 → 100 over 400px */
const FLOOR = 480;
const barH = (v: number) => ((v - 75) / 25) * 400;
/* step 4 zoom 92.8 → 94.1 · step 7 70 → 85 · step 9 90 → 94.5 */
const zx = (v: number) => 100 + ((v - 92.8) / 1.3) * 1520;
const px = (v: number) => 100 + ((v - 70) / 15) * 1520;
const rx = (v: number) => 100 + ((v - 90) / 4.5) * 1520;

const SQUARES = Array.from({ length: 100 }, (_, i) => i);

export default function Openmed({ step }: ChapterStepProps) {
  if (step === 0) {
    return (
      <div key={step} className="scene-pad om-scene om-open">
        <div className="om-open-title">
          <div className="kicker om-kicker om-at">The benchmarks</div>
          <h1 className="om-open-name serif-it om-print">OpenMed</h1>
          <p className="om-cap om-open-sub">exam-style · multiple choice</p>
        </div>
        <div className="om-sheet">
          {PICKS.map((p, r) => (
            <div key={r} className="om-sheet-row">
              <span className="om-sheet-n">{r + 1}</span>
              {["A", "B", "C", "D"].map((l, c) => (
                <span key={l} className={c === p ? "om-bubble is-pick" : "om-bubble"} style={{ "--r": r } as Vars}>{l}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div key={step} className="scene-pad om-scene om-suites">
        <div className="om-suite-head om-at" style={{ "--d": "100ms" } as Vars}>
          <span className="hero-num">8</span>
          <span className="serif-it">multiple-choice test sets</span>
        </div>
        <div className="om-suite-row">
          <div className="om-book om-book--big" style={{ "--d": "2200ms" } as Vars}>
            <span className="om-book-tag">suite</span>
            <span className="om-book-name">MedQA</span>
          </div>
          <div className="om-book om-book--big" style={{ "--d": "3000ms" } as Vars}>
            <span className="om-book-tag">suite</span>
            <span className="om-book-name">PubMedQA</span>
          </div>
          <div className="om-mmlu">
            <div className="om-mmlu-label">MMLU · 6 MEDICAL SUBJECTS</div>
            <div className="om-mmlu-grid">
              {MMLU.map((s, i) => (
                <div key={s} className="om-book" style={{ "--d": `${4300 + i * 250}ms` } as Vars}>
                  <span className="om-book-name">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 2) {
    const avgH = barH(MEDIUM_AVG);
    return (
      <div key={step} className="scene-pad om-scene om-avg">
        <div className="om-avg-hero">
          <span className="om-avg-who">Medical LLM <em className="serif-it om-em">Medium</em></span>
          <span className="hero-num">{MEDIUM_AVG}</span>
          <p className="om-cap om-at" style={{ "--d": "2700ms" } as Vars}>OpenMed average · 8 suites</p>
        </div>
        <svg className="om-svg om-avg-chart" viewBox="0 0 1000 560">
          <line x1="20" y1={FLOOR} x2="980" y2={FLOOR} className="om-axis-line" />
          <text x="0" y={FLOOR + 40} className="om-tick-label">75</text>
          <text x="0" y={FLOOR - 392} className="om-tick-label">100</text>
          <line x1="56" y1={FLOOR - 400} x2="980" y2={FLOOR - 400} className="om-tick" strokeDasharray="2 10" />
          {MEDIUM_SCORES.map((v, i) => {
            const h = barH(v);
            const x = 70 + i * 114;
            return (
              <g key={i}>
                <rect x={x} y={FLOOR - h} width="84" height={h} className="om-ghost" />
                <rect x={x} y={FLOOR - h} width="84" height={h} className="om-bar" style={{ "--i": i, "--s": avgH / h } as Vars} />
                <text x={x + 42} y={FLOOR - h - 14} className="om-bar-v" textAnchor="middle" style={{ "--i": i } as Vars}>{v}</text>
              </g>
            );
          })}
          <line x1="56" y1={FLOOR - avgH} x2="980" y2={FLOOR - avgH} className="om-avg-line" />
        </svg>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div key={step} className="scene-pad om-scene om-board">
        <div className="kicker om-kicker om-at">OpenMed average · 0 – 100 scale</div>
        <div className="om-rows">
          {BOARD.map((r) => (
            <div key={r.name} className={r.us ? "om-row is-us" : "om-row"} style={{ "--d": `${r.d}ms` } as Vars}>
              <span className="om-row-name">{r.name}</span>
              <span className="om-row-track">
                <span className="om-row-bar" style={{ "--s": r.v / 100 } as Vars} />
              </span>
              <span className="hero-num om-row-v">{r.v}</span>
            </div>
          ))}
        </div>
        <div className="om-scale">
          <span />
          <span className="om-scale-ticks"><span>0</span><span>50</span><span>100</span></span>
          <span />
        </div>
      </div>
    );
  }

  if (step === 4) {
    const dots = [
      { v: 92.94, n: "Gemini 3.5 Flash", below: true, d: 300, us: false },
      { v: 93.21, n: "Claude Opus 4.8", below: true, d: 400, us: false },
      { v: 93.28, n: "GPT 5.5", below: false, d: 500, us: false },
      { v: 93.99, n: "Medium", below: false, d: 700, us: true },
    ];
    return (
      <div key={step} className="scene-pad om-scene om-zoom">
        <div className="om-zoom-head">
          <h1 className="om-headline om-print">
            <span className="display-en">Medium,</span> <span className="serif-it om-em">on top.</span>
          </h1>
          <div className="om-zoom-gap">
            <span className="hero-num">+0.71</span>
            <span className="mono">points</span>
          </div>
        </div>
        <svg className="om-svg" viewBox="0 0 1720 360">
          <line x1="100" y1="220" x2="1620" y2="220" className="om-axis-line om-draw" pathLength={1} />
          {[93, 93.5, 94].map((t) => (
            <g key={t}>
              <line x1={zx(t)} y1="210" x2={zx(t)} y2="230" className="om-tick" />
              <text x={zx(t)} y="262" className="om-tick-label" textAnchor="middle">{t.toFixed(1)}</text>
            </g>
          ))}
          {dots.map((d) => (
            <g key={d.n}>
              <circle cx={zx(d.v)} cy="220" r={d.us ? 22 : 14} className={d.us ? "om-dot is-us" : "om-dot"} style={{ "--d": `${d.d}ms` } as Vars} />
              <text x={zx(d.v)} y={d.below ? 306 : 160} className={d.us ? "om-dot-label is-us" : "om-dot-label"} textAnchor="middle" style={{ "--d": `${d.d}ms` } as Vars}>{d.n}</text>
              <text x={zx(d.v)} y={d.below ? 340 : 124} className="om-dot-num" textAnchor="middle" style={{ "--d": `${d.d}ms` } as Vars}>{d.v}</text>
            </g>
          ))}
          <path d={`M${zx(93.28)} 96 L${zx(93.28)} 60 L${zx(93.99)} 60 L${zx(93.99)} 96`} className="om-bracket om-draw" pathLength={1} style={{ "--d": "1300ms" } as Vars} />
        </svg>
        <p className="om-cap om-at" style={{ "--d": "1000ms" } as Vars}>zoomed axis · 92.8 – 94.1</p>
      </div>
    );
  }

  if (step === 5) {
    return (
      <div key={step} className="scene-pad om-scene om-subj">
        <div className="om-grid">
          {SUBJECTS.map((s, i) => {
            const cls = ["om-cell", s.t !== undefined ? "is-trail" : "", s.focus ? "is-focus" : ""].join(" ");
            return (
              <div key={s.n} className={cls} style={{ "--i": i, "--t": s.t ?? 0 } as Vars}>
                {s.t !== undefined && <span className="om-cell-flag">BEHIND</span>}
                <span className="om-cell-name">{s.n}</span>
                <span className="hero-num om-cell-v">{s.m}</span>
                <span className="om-cell-f">best frontier {s.f}</span>
              </div>
            );
          })}
        </div>
        <div className="om-duel">
          <div className="om-duel-name serif-it">College Biology</div>
          <div className="om-duel-row" style={{ "--d": "6800ms" } as Vars}>
            <div className="om-duel-top">
              <span className="om-duel-who">GPT · Claude · Gemini</span>
              <span className="hero-num">99.3</span>
            </div>
            <div className="om-duel-bar" style={{ "--s": 0.993 } as Vars} />
          </div>
          <div className="om-duel-row is-us" style={{ "--d": "8600ms" } as Vars}>
            <div className="om-duel-top">
              <span className="om-duel-who">Medium</span>
              <span className="hero-num">94.3</span>
            </div>
            <div className="om-duel-bar" style={{ "--s": 0.943 } as Vars} />
          </div>
          <div className="om-duel-gap">five points behind</div>
        </div>
      </div>
    );
  }

  if (step === 6) {
    return (
      <div key={step} className="scene-pad om-scene om-gen">
        <h1 className="om-headline om-headline--sm serif-it om-print">Medical Genetics</h1>
        <div className="om-gen-pair">
          <div className="om-gen-col" style={{ "--base": "600ms" } as Vars}>
            <div className="om-gen-top">
              <span>
                <span className="om-gen-who">Frontier</span>
                <br />
                <span className="om-gen-sub">GPT 5.5 · Claude Opus 4.8 · Gemini 3.5 Flash</span>
              </span>
              <span className="hero-num">100</span>
            </div>
            <div className="om-squares">
              {SQUARES.map((i) => <span key={i} className="om-sq" style={{ "--i": i } as Vars} />)}
            </div>
          </div>
          <div className="om-gen-col is-us" style={{ "--base": "2600ms" } as Vars}>
            <div className="om-gen-top">
              <span>
                <span className="om-gen-who">Medium</span>
                <br />
                <span className="om-gen-sub">one point short of perfect</span>
              </span>
              <span className="hero-num">99</span>
            </div>
            <div className="om-squares">
              {SQUARES.map((i) => <span key={i} className={i === 99 ? "om-sq is-miss" : "om-sq"} style={{ "--i": i } as Vars} />)}
            </div>
          </div>
        </div>
        <p className="om-cap om-at" style={{ "--d": "1200ms" } as Vars}>one square = one point of score</p>
      </div>
    );
  }

  if (step === 7) {
    return (
      <div key={step} className="scene-pad om-scene om-pub">
        <div className="kicker om-kicker om-at">Where Medium pulls ahead</div>
        <h1 className="om-headline serif-it om-em om-print">PubMedQA</h1>
        <svg className="om-svg" viewBox="0 0 1720 430">
          <line x1="100" y1="260" x2="1620" y2="260" className="om-axis-line om-draw" pathLength={1} style={{ "--d": "600ms" } as Vars} />
          {[70, 75, 80, 85].map((t) => (
            <g key={t} className="om-at" style={{ "--d": "900ms" } as Vars}>
              <line x1={px(t)} y1="250" x2={px(t)} y2="270" className="om-tick" />
              {t !== 75 && <text x={px(t)} y="300" className="om-tick-label" textAnchor="middle">{t}</text>}
            </g>
          ))}
          {/* frontier band 74 – 76.5 */}
          <rect x={px(74)} y="232" width={px(76.5) - px(74)} height="56" className="om-band" />
          <circle cx={px(74)} cy="260" r="13" className="om-dot" style={{ "--d": "5200ms" } as Vars} />
          <circle cx={px(76.5)} cy="260" r="13" className="om-dot" style={{ "--d": "5500ms" } as Vars} />
          <text x={px(74)} y="212" className="om-dot-num" textAnchor="middle" style={{ "--d": "5200ms" } as Vars}>74</text>
          <text x={px(76.5)} y="212" className="om-dot-num" textAnchor="middle" style={{ "--d": "5500ms" } as Vars}>76.5</text>
          <text x={px(76.5)} y="350" className="om-band-label" textAnchor="end">FRONTIER · 74 – 76.5</text>
          <text x={px(76.5)} y="386" className="om-band-label" textAnchor="end">GPT 5.5 · CLAUDE OPUS 4.8 · GEMINI 3.5 FLASH</text>
          {/* Medium drops in at 82 */}
          <g className="om-drop" style={{ "--d": "2600ms" } as Vars}>
            <circle cx={px(82)} cy="260" r="24" className="om-dot is-us" style={{ "--d": "2600ms" } as Vars} />
            <text x={px(82)} y="140" className="om-dot-label is-us" textAnchor="middle" style={{ "--d": "2600ms" } as Vars}>Medium</text>
            <text x={px(82)} y="214" className="hero-num om-pub-v" textAnchor="middle">82</text>
          </g>
          {/* lead over the best frontier score */}
          <path d={`M${px(76.5)} 312 L${px(76.5)} 336 L${px(82)} 336 L${px(82)} 312`} className="om-bracket om-draw" pathLength={1} style={{ "--d": "6200ms" } as Vars} />
          <text x={(px(76.5) + px(82)) / 2} y="404" className="om-gap-label" textAnchor="middle">+5.5</text>
        </svg>
      </div>
    );
  }

  if (step === 8) {
    return (
      <div key={step} className="scene-pad om-scene om-medqa">
        <div className="kicker om-kicker om-at">MedQA · the lead is smaller</div>
        <div className="om-medqa-nums om-print">
          <span className="hero-num om-em">96.2</span>
          <span className="om-vs">vs</span>
          <span className="hero-num">95</span>
        </div>
        <div className="om-medqa-who om-cap om-at" style={{ "--d": "600ms" } as Vars}>
          <span>Medium</span>
          <span>GPT 5.5 · Gemini 3.5 Flash</span>
        </div>
        <div className="om-leads">
          <div className="om-lead" style={{ "--d": "1300ms" } as Vars}>
            <span className="om-lead-name">PubMedQA lead</span>
            <span className="om-lead-bar">
              <span className="om-lead-fill" style={{ width: 5.5 * 150 }} />
              <span className="om-lead-v">+5.5</span>
            </span>
          </div>
          <div className="om-lead is-now" style={{ "--d": "2000ms" } as Vars}>
            <span className="om-lead-name">MedQA lead</span>
            <span className="om-lead-bar">
              <span className="om-lead-fill" style={{ width: 1.2 * 150 }} />
              <span className="om-lead-v">+1.2</span>
            </span>
          </div>
        </div>
      </div>
    );
  }

  /* step 9 — Small: 90.63 on one GPU */
  return (
    <div key={step} className="scene-pad om-scene om-small">
      <div className="om-small-top">
        <div className="om-small-hero">
          <span className="om-small-who">Medical LLM <em className="serif-it om-em">Small</em></span>
          <span className="hero-num">90.63</span>
          <p className="om-cap om-at" style={{ "--d": "1100ms" } as Vars}>OpenMed average</p>
        </div>
        <div className="om-gpu">
          <svg className="om-svg" viewBox="0 0 600 280">
            <rect x="20" y="20" width="560" height="190" className="om-gpu-line" pathLength={1} style={{ "--d": "3400ms" } as Vars} />
            <circle cx="180" cy="115" r="68" className="om-gpu-line" pathLength={1} style={{ "--d": "3600ms" } as Vars} />
            <circle cx="420" cy="115" r="68" className="om-gpu-line" pathLength={1} style={{ "--d": "3700ms" } as Vars} />
            <circle cx="180" cy="115" r="14" className="om-gpu-fill" />
            <circle cx="420" cy="115" r="14" className="om-gpu-fill" />
            <path d="M120 210 L120 244 L470 244 L470 210" className="om-gpu-line" pathLength={1} style={{ "--d": "3800ms" } as Vars} />
            {Array.from({ length: 11 }, (_, n) => (
              <rect key={n} x={136 + n * 30} y="218" width="16" height="18" className="om-gpu-fill" />
            ))}
          </svg>
          <span className="om-gpu-label serif-it">one commodity GPU</span>
        </div>
      </div>
      <svg className="om-svg" viewBox="0 0 1720 200">
        <line x1="100" y1="110" x2="1620" y2="110" className="om-axis-line om-draw" pathLength={1} style={{ "--d": "1300ms" } as Vars} />
        {[90, 91, 92, 93, 94].map((t) => (
          <g key={t} className="om-at" style={{ "--d": "1500ms" } as Vars}>
            <line x1={rx(t)} y1="100" x2={rx(t)} y2="120" className="om-tick" />
            <text x={rx(t)} y="152" className="om-tick-label" textAnchor="middle">{t}</text>
          </g>
        ))}
        {[92.94, 93.21, 93.28].map((v) => (
          <circle key={v} cx={rx(v)} cy="110" r="11" className="om-dot" style={{ "--d": "1900ms" } as Vars} />
        ))}
        <text x={rx(93.11)} y="192" className="om-dot-num" textAnchor="middle" style={{ "--d": "1900ms" } as Vars}>frontier 92.94 – 93.28</text>
        <circle cx={rx(93.99)} cy="110" r="11" className="om-dot" style={{ "--d": "2000ms" } as Vars} />
        <text x={rx(93.99)} y="70" className="om-dot-num" textAnchor="middle" style={{ "--d": "2000ms" } as Vars}>Medium 93.99</text>
        <circle cx={rx(90.63)} cy="110" r="20" className="om-dot is-us" style={{ "--d": "2400ms" } as Vars} />
        <text x={rx(90.63)} y="70" className="om-dot-label is-us" textAnchor="middle" style={{ "--d": "2400ms" } as Vars}>Small 90.63</text>
      </svg>
    </div>
  );
}
