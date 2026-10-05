import type { ChapterDef } from "./types";
import Hook from "../chapters/01-hook/Hook";
import { narrations as hookNarrations } from "../chapters/01-hook/narrations";
import Meet from "../chapters/02-meet/Meet";
import { narrations as meetNarrations } from "../chapters/02-meet/narrations";
import Smart from "../chapters/03-smart/Smart";
import { narrations as smartNarrations } from "../chapters/03-smart/narrations";
import Safe from "../chapters/04-safe/Safe";
import { narrations as safeNarrations } from "../chapters/04-safe/narrations";
import Paperwork from "../chapters/05-paperwork/Paperwork";
import { narrations as paperworkNarrations } from "../chapters/05-paperwork/narrations";
import Uses from "../chapters/06-uses/Uses";
import { narrations as usesNarrations } from "../chapters/06-uses/narrations";
import Start from "../chapters/07-start/Start";
import { narrations as startNarrations } from "../chapters/07-start/narrations";

/**
 * Order = order of presentation.
 *
 * Each chapter MUST provide a `narrations: Narration[]` array. Its length
 * is the chapter's step count — there is no `totalSteps` to maintain
 * separately. This guarantees the audio synthesis pipeline, the runtime
 * stepper, and the chapter `.tsx` switch on `step` cannot drift apart.
 *
 * Visual styling (color, fonts) comes entirely from the active theme —
 * chapters never hard-code palette / font names. See THEMES.md.
 */
export const CHAPTERS: ChapterDef[] = [
  {
    id: "hook",
    title: "The catch",
    narrations: hookNarrations,
    Component: Hook,
  },
  {
    id: "meet",
    title: "Meet the Medical LLMs",
    narrations: meetNarrations,
    Component: Meet,
  },
  {
    id: "smart",
    title: "Is it smart enough?",
    narrations: smartNarrations,
    Component: Smart,
  },
  {
    id: "safe",
    title: "Smart, and careful",
    narrations: safeNarrations,
    Component: Safe,
  },
  {
    id: "paperwork",
    title: "It reads paperwork too",
    narrations: paperworkNarrations,
    Component: Paperwork,
  },
  {
    id: "uses",
    title: "What you could build",
    narrations: usesNarrations,
    Component: Uses,
  },
  {
    id: "start",
    title: "Try it yourself",
    narrations: startNarrations,
    Component: Start,
  },
];
