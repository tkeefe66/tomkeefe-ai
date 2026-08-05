import type { Principle } from "./types";

export const principles: Principle[] = [
  { text: "Most GTM problems aren't strategy problems. They're plumbing problems nobody wants to own." },
  { text: "Buying another tool isn't a strategy. Wiring together the ones you have is." },
  {
    text: "If your team does it manually every week, that's not a process. It's a hostage situation.",
    annotation: "Inventory exists because I kept packing the same bag wrong.",
  },
  {
    text: "Build vs. buy is dead. It's build vs. wait.",
    annotation:
      "MarTech Intel took over a month of nights and runs for under ten dollars a month, indefinitely. The month was the cheap part.",
  },
  { text: "AI doesn't replace ops people. Ops people who build with AI replace vendor stacks." },
  { text: "The feature you're most excited about is usually the one to cut." },
];

// Cut in the v2 design, kept for if the section expands (design README §3):
// - "Speed to answer beats depth of analysis."
// - "Every recurring report should become an automation."
// - "Territory fights are data problems in political costumes."
