import dynamic from "next/dynamic";

// Dynamic imports disable SSR by default for heavy interactive components.
export const BubbleUI = dynamic(
  () => import("./BubbleUI").then((m) => m.BubbleUI),
  {
    ssr: false,
  }
);

export const TechStackBubble = dynamic(
  () => import("./BubbleUI").then((m) => m.TechStackBubble),
  {
    ssr: false,
  }
);

export type {
  BubbleData,
  BubbleUIProps,
  TechStackBubbleProps,
} from "./BubbleUI";
