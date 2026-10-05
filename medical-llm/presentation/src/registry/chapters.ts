import type { ChapterDef } from "./types";
import Coldopen from "../chapters/01-coldopen/Coldopen";
import { narrations as coldopenNarrations } from "../chapters/01-coldopen/narrations";
import WhyPrivate from "../chapters/02-why-private/WhyPrivate";
import { narrations as whyPrivateNarrations } from "../chapters/02-why-private/narrations";
import FlagshipPair from "../chapters/03-flagship-pair/FlagshipPair";
import { narrations as flagshipPairNarrations } from "../chapters/03-flagship-pair/narrations";
import SmallModels from "../chapters/04-small-models/SmallModels";
import { narrations as smallModelsNarrations } from "../chapters/04-small-models/narrations";
import Openmed from "../chapters/05-openmed/Openmed";
import { narrations as openmedNarrations } from "../chapters/05-openmed/narrations";
import Medhelm from "../chapters/06-medhelm/Medhelm";
import { narrations as medhelmNarrations } from "../chapters/06-medhelm/narrations";
import MedhelmEdges from "../chapters/07-medhelm-edges/MedhelmEdges";
import { narrations as medhelmEdgesNarrations } from "../chapters/07-medhelm-edges/narrations";
import Safety from "../chapters/08-safety/Safety";
import { narrations as safetyNarrations } from "../chapters/08-safety/narrations";
import VisionOcr from "../chapters/09-vision-ocr/VisionOcr";
import { narrations as visionOcrNarrations } from "../chapters/09-vision-ocr/narrations";
import OcrTablesGrounding from "../chapters/10-ocr-tables-grounding/OcrTablesGrounding";
import { narrations as ocrTablesGroundingNarrations } from "../chapters/10-ocr-tables-grounding/narrations";
import OcrJson from "../chapters/11-ocr-json/OcrJson";
import { narrations as ocrJsonNarrations } from "../chapters/11-ocr-json/narrations";
import Takeaway from "../chapters/12-takeaway/Takeaway";
import { narrations as takeawayNarrations } from "../chapters/12-takeaway/narrations";

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
    id: "coldopen",
    title: "Can't leave the building",
    narrations: coldopenNarrations,
    Component: Coldopen,
  },
  {
    id: "why-private",
    title: "Why specialized, why private",
    narrations: whyPrivateNarrations,
    Component: WhyPrivate,
  },
  {
    id: "flagship-pair",
    title: "Hardware and deployment",
    narrations: flagshipPairNarrations,
    Component: FlagshipPair,
  },
  {
    id: "small-models",
    title: "The small-model shelf",
    narrations: smallModelsNarrations,
    Component: SmallModels,
  },
  {
    id: "openmed",
    title: "OpenMed",
    narrations: openmedNarrations,
    Component: Openmed,
  },
  {
    id: "medhelm",
    title: "MedHELM",
    narrations: medhelmNarrations,
    Component: Medhelm,
  },
  {
    id: "medhelm-edges",
    title: "MedHELM: edges and gaps",
    narrations: medhelmEdgesNarrations,
    Component: MedhelmEdges,
  },
  {
    id: "safety",
    title: "Averages and red-teaming",
    narrations: safetyNarrations,
    Component: Safety,
  },
  {
    id: "vision-ocr",
    title: "Vision OCR",
    narrations: visionOcrNarrations,
    Component: VisionOcr,
  },
  {
    id: "ocr-tables-grounding",
    title: "OCR: tables and grounding",
    narrations: ocrTablesGroundingNarrations,
    Component: OcrTablesGrounding,
  },
  {
    id: "ocr-json",
    title: "OCR: structured JSON",
    narrations: ocrJsonNarrations,
    Component: OcrJson,
  },
  {
    id: "takeaway",
    title: "Takeaway",
    narrations: takeawayNarrations,
    Component: Takeaway,
  },
];
