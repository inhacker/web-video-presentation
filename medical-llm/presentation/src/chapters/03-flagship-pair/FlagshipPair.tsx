import type { CSSProperties } from "react";
import type { ChapterStepProps } from "../../registry/types";
import "./FlagshipPair.css";

/**
 * Chapter 3 · flagship-pair  (article §Medical LLMs Offering)
 *   step 0  Medium: 67 one-GB memory squares fill in; ~67 GB rolls up
 *   step 1  Small: 25 squares fill beside Medium; a single GPU card draws around them
 *   step 2  262K context: pages fan out into one prompt bracket
 *   step 3  each memory bar splits: weights | KV cache (16 GB / 8 GB)
 *   step 4  tensor-parallel GPU tiles pop in: Medium 2/4/8, Small 1/2/4/8
 *   step 5  five deployment routes draw out from the model
 *   step 6  vendor summary cards typeset word by word; "#1" stamp
 *
 * Every step root carries key={step} so its CSS animations replay.
 */

type Vars = CSSProperties & Record<`--${string}`, string | number>;

/* ─── odometer digits (pure CSS roll) ─── */
function Odometer({ value, delay = 0 }: { value: string; delay?: number }) {
  return (
    <span className="fp-odo">
      {value.split("").map((ch, i) => {
        if (!/\d/.test(ch)) return <span key={i} className="fp-odo-sep">{ch}</span>;
        const to = 10 + Number(ch);
        return (
          <span key={i} className="fp-odo-win">
            <span className="fp-odo-strip" style={{ "--to": to, "--dl": `${delay + i * 110}ms` } as Vars}>
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

/* ─── memory squares: 1 square = 1 GB, filled column by column ─── */
function Cells({ n, animate = true, delay = 0, gap = 22, dim = false }: { n: number; animate?: boolean; delay?: number; gap?: number; dim?: boolean }) {
  return (
    <div className={dim ? "fp-cells is-dim" : "fp-cells"}>
      {Array.from({ length: n }, (_, i) => (
        <span
          key={i}
          className={animate ? "fp-cell is-anim" : "fp-cell"}
          style={{ "--d": `${delay + i * gap}ms` } as Vars}
        />
      ))}
    </div>
  );
}

/* ─── a GPU tile (tensor-parallel step) ─── */
function Gpu({ i, ghost = false, hot = false }: { i: number; ghost?: boolean; hot?: boolean }) {
  return (
    <span className={`fp-gpu${ghost ? " is-ghost" : ""}${hot ? " is-hot" : ""}`} style={{ "--i": i } as Vars}>
      <span className="fp-gpu-fan" />
    </span>
  );
}

function ParallelRow({ name, sizes, base, hotOne = false }: { name: string; sizes: number[]; base: number; hotOne?: boolean }) {
  let k = base;
  return (
    <div className="fp-par-row">
      <div className="fp-par-name serif-it">{name}</div>
      <div className="fp-par-groups">
        {[1, 2, 4, 8].map((size) => {
          const ok = sizes.includes(size);
          const start = k;
          if (ok) k += size;
          return (
            <div key={size} className={ok ? "fp-par-group" : "fp-par-group is-off"}>
              <div className="fp-par-tiles">
                {ok
                  ? Array.from({ length: size }, (_, j) => <Gpu key={j} i={start + j} hot={hotOne && size === 1} />)
                  : <Gpu i={start} ghost />}
              </div>
              <div className={hotOne && size === 1 ? "fp-par-count mono is-hot" : "fp-par-count mono"}>
                {ok ? `×${size}` : "no ×1"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── platform routes ─── */
const PLATFORMS = ["On-Premise", "AWS", "Azure", "Databricks", "Snowflake"];

/* ─── vendor summary (article §Medical LLMs Offering, bullet list) ─── */
const SMALL_QUOTE = "outperforms much larger general models on MedHELM while running on a single commodity GPU.";
const MEDIUM_QUOTE = "Our best model — the #1 MedHELM mean win rate in this comparison.";

function Typeset({ text, delay }: { text: string; delay: number }) {
  return (
    <>
      {text.split(" ").map((w, i, all) => (
        <span key={i} className="fp-word" style={{ "--d": `${delay + i * 70}ms` } as Vars}>
          {i < all.length - 1 ? `${w} ` : w}
        </span>
      ))}
    </>
  );
}

export default function FlagshipPair({ step }: ChapterStepProps) {
  /* step 0 — Medium needs ~67 GB */
  if (step === 0) {
    return (
      <div key={step} className="scene-pad fp-scene fp-split">
        <div className="fp-name-col">
          <div className="kicker fp-kicker fp-rise">Start with hardware</div>
          <div className="fp-model-name serif-it fp-print">Medium</div>
          <hr className="rule fp-grow" />
          <div className="fp-role fp-late">The flagship</div>
        </div>
        <div className="fp-mem-col">
          <div className="kicker fp-kicker">Recommended GPU memory</div>
          <div className="fp-hero-line">
            <span className="fp-tilde serif-it">~</span>
            <span className="hero-num fp-hero"><Odometer value="67" delay={500} /></span>
            <span className="fp-unit serif-it">GB</span>
          </div>
          <Cells n={67} delay={500} />
          <div className="fp-note mono fp-late2">one square = 1 GB</div>
        </div>
      </div>
    );
  }

  /* step 1 — Small needs ~25 GB, fits one commodity GPU */
  if (step === 1) {
    return (
      <div key={step} className="scene-pad fp-scene fp-compare">
        <h1 className="fp-headline fp-print">
          <span className="display-en">Small needs about</span>{" "}
          <span className="serif-it fp-em">25.</span>
        </h1>
        <div className="fp-pair">
          <div className="fp-block">
            <div className="fp-gpu-pad">
              <Cells n={67} animate={false} dim />
            </div>
            <div className="fp-block-label">
              <span className="serif-it">Medium</span>
              <span className="mono">~67 GB</span>
            </div>
          </div>
          <div className="fp-block">
            <div className="fp-gpu-pad fp-gpu-card">
              <span className="fp-gpu-frame" />
              <span className="fp-gpu-pins" />
              <Cells n={25} delay={250} gap={30} />
            </div>
            <div className="fp-block-label">
              <span className="serif-it fp-em">Small</span>
              <span className="mono">~25 GB</span>
            </div>
          </div>
          <div className="fp-gpu-note">
            <span className="fp-gpu-note-big serif-it">one</span>
            <span className="fp-gpu-note-sm mono">commodity GPU</span>
          </div>
        </div>
      </div>
    );
  }

  /* step 2 — 262K context, hundreds of pages in one prompt */
  if (step === 2) {
    return (
      <div key={step} className="scene-pad fp-scene fp-context">
        <div className="fp-ctx-head">
          <span className="hero-num fp-ctx-num fp-print">262K</span>
          <div className="fp-ctx-side fp-rise">
            <span className="fp-ctx-label serif-it">token context</span>
            <span className="mono fp-ctx-both">Medium · Small</span>
          </div>
        </div>
        <div className="fp-pages">
          {Array.from({ length: 30 }, (_, i) => (
            <span key={i} className="fp-page" style={{ "--i": i } as Vars}>
              <span /><span /><span /><span />
            </span>
          ))}
        </div>
        <svg className="fp-bracket" viewBox="0 0 1720 60" preserveAspectRatio="none">
          <path d="M4 4 L4 30 L1716 30 L1716 4" pathLength={1} />
          <path d="M860 30 L860 58" pathLength={1} />
        </svg>
        <div className="fp-ctx-caption">
          <span className="serif-it">Hundreds of pages of patient history</span>
          <span className="mono">· one prompt</span>
        </div>
      </div>
    );
  }

  /* step 3 — the memory figure = weights + KV cache at full context */
  if (step === 3) {
    return (
      <div key={step} className="scene-pad fp-scene fp-anatomy">
        <h1 className="fp-headline fp-headline--sm fp-print">
          <span className="display-en">What's inside</span>{" "}
          <span className="serif-it fp-em">the number.</span>
        </h1>
        <div className="fp-bars">
          {[
            { name: "Medium", total: 67, kv: 16, d: 5000 },
            { name: "Small", total: 25, kv: 8, d: 6200 },
          ].map((m) => (
            <div key={m.name} className="fp-bar-row" style={{ "--d": `${m.d}ms` } as Vars}>
              <div className="fp-bar-name">
                <span className="serif-it">{m.name}</span>
                <span className="mono">~{m.total} GB</span>
              </div>
              <div className="fp-bar">
                <span className="fp-seg fp-seg--w" style={{ width: `${(m.total - m.kv) * 14}px` }}>
                  {m.name === "Medium" && <span className="fp-seg-label mono">model weights · fp16 / bf16</span>}
                </span>
                <span className="fp-seg fp-seg--kv" style={{ width: `${m.kv * 14}px` }} />
                <span className="fp-kv-label">
                  <span className="hero-num fp-kv-num">{m.kv}</span>
                  <span className="mono">GB · KV cache</span>
                </span>
              </div>
            </div>
          ))}
        </div>
        <p className="fp-foot mono fp-late">KV cache reserved for the full 262K context · per DJL's LMI Deployment Guide</p>
      </div>
    );
  }

  /* step 4 — tensor-parallel options */
  if (step === 4) {
    return (
      <div key={step} className="scene-pad fp-scene fp-parallel">
        <h1 className="fp-headline fp-headline--sm fp-print">
          <span className="display-en">Split across</span>{" "}
          <span className="serif-it fp-em">GPUs.</span>
        </h1>
        <div className="fp-par">
          <ParallelRow name="Medium" sizes={[2, 4, 8]} base={0} />
          <hr className="rule" />
          <ParallelRow name="Small" sizes={[1, 2, 4, 8]} base={20} hotOne />
        </div>
        <p className="fp-foot mono fp-late">tensor-parallel sizes · offering table</p>
      </div>
    );
  }

  /* step 5 — supported platforms */
  if (step === 5) {
    return (
      <div key={step} className="scene-pad fp-scene">
        <div className="kicker fp-kicker fp-rise">Supported platforms · both models</div>
        <svg className="fp-routes" viewBox="0 0 1720 780">
          <g className="fp-hub">
            <rect x="40" y="300" width="460" height="180" className="fp-hub-box" />
            <text x="270" y="384" className="fp-hub-name" textAnchor="middle">Medical LLM</text>
            <text x="270" y="434" className="fp-svg-label" textAnchor="middle">MEDIUM · SMALL</text>
          </g>
          {PLATFORMS.map((p, i) => {
            const y = 90 + i * 150;
            return (
              <g key={p} className="fp-route-g" style={{ "--i": i } as Vars}>
                <path d={`M500 390 C780 390 800 ${y} 1080 ${y}`} className="fp-route" pathLength={1} />
                <circle cx="1100" cy={y} r="14" className={i === 0 ? "fp-node is-prem" : "fp-node"} />
                <text x="1150" y={y + 22} className={i === 0 ? "fp-dest is-prem" : "fp-dest"}>{p}</text>
              </g>
            );
          })}
        </svg>
      </div>
    );
  }

  /* step 6 — their own summary */
  return (
    <div key={step} className="scene-pad fp-scene fp-summary">
      <div className="kicker fp-kicker fp-rise">Their own summary · vendor labels</div>
      <div className="fp-cards">
        <div className="card fp-card" style={{ "--d": "1700ms" } as Vars}>
          <div className="fp-card-head">
            <span className="fp-card-name serif-it">Small</span>
            <span className="fp-card-tag mono">Compact</span>
          </div>
          <hr className="rule" />
          <p className="fp-quote">&ldquo;<Typeset text={SMALL_QUOTE} delay={2000} />&rdquo;</p>
        </div>
        <div className="card fp-card" style={{ "--d": "4800ms" } as Vars}>
          <div className="fp-card-head">
            <span className="fp-card-name serif-it">Medium</span>
            <span className="fp-card-tag mono">Flagship</span>
          </div>
          <hr className="rule" />
          <p className="fp-quote">&ldquo;<Typeset text={MEDIUM_QUOTE} delay={5100} />&rdquo;</p>
          <div className="fp-stamp">
            <span className="hero-num fp-stamp-num">#1</span>
            <span className="mono">MedHELM mean win rate</span>
          </div>
        </div>
      </div>
    </div>
  );
}
