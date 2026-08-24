import type { Principle } from "./types";

export const principles: Principle[] = [
  {
    text: "Know your data before you build on top of it. An agent with bad context makes confident, wrong decisions fast.",
    annotation:
      "MarTech Intel exists because \"market intelligence\" is a data architecture problem before it's a product problem.",
  },
  {
    text: "Don't build ad hoc. Talk it through, get a plan, then hand the plan to the agent. Skip that step and you're burning tokens on pieces instead of architecture.",
    annotation:
      "After building an app without a multi-tenant design, I learned it's easier to start with scale in mind from the beginning vs. adding it on later.",
  },
  {
    text: "No single model does everything well. Route by task, not by habit, or you're paying frontier prices for work a cheaper model handles fine.",
    annotation: "Camera Agent uses one model to expand a lesson and a different one to grade the photo that comes back.",
  },
  {
    text: "Review the plan before the agent executes it. Catching a bad spec costs five minutes. Catching it after it's built costs a rebuild.",
    annotation:
      "I don't know how to read code, but my agents do. One agent is great, but having its work reviewed by two separate sub-agents takes more time up front and cuts the repair loops later.",
  },
  {
    text: "I didn't learn to code and then start using AI. I learned by building with it, asking it to explain what it was doing and why it broke, until the pattern stuck. Ten shipped projects, zero computer science background.",
    annotation: "Life Tracker was the first one I opened without deciding to. That's when it stopped feeling like a tutorial.",
  },
];
