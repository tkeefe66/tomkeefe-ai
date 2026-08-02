import type { Project } from "./types";

// Descriptions and stacks are placeholders until Tom supplies details.
export const projects: Project[] = [
  {
    name: "B2B News Source",
    description: "AI-curated B2B news and account-signal digest for GTM teams. [PLACEHOLDER — confirm description]",
    stack: ["TBC"],
    status: "Internal",
  },
  {
    name: "Outdoors & Photography Assistant",
    description: "Personal AI assistant for planning outdoor trips and photography — conditions, locations, timing. [PLACEHOLDER — confirm description]",
    stack: ["TBC"],
    status: "In development",
  },
  {
    name: "Sleeper Dynasty Analyzer",
    description: "Analytics for Sleeper dynasty fantasy football leagues — trades, roster value, draft capital. [PLACEHOLDER — confirm description]",
    stack: ["TBC"],
    status: "In development",
  },
  {
    name: "Life Focus Tracker",
    description: "Personal focus and goals tracker. [PLACEHOLDER — confirm description]",
    stack: ["TBC"],
    status: "In development",
  },
  {
    name: "This Site",
    description: "tomkeefe.ai — designed, written, and deployed by AI agents under my direction.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Railway"],
    status: "Live",
    flagship: true,
  },
];
