import type { ProseSection } from "./types";

export const agents: ProseSection = {
  heading: "Directed by a human. Built with agents.",
  paragraphs: [
    "Everything on this page was built with Claude Code doing the typing. That's a management problem, not a shortcut.",
    "The setup is a global config that encodes how I want things built: test-driven by default, Railway as the only deploy target, plan first when a task is ambiguous and start coding when it isn't, and batch every clarifying question into one message instead of interrupting me six separate times. Independent subtasks get dispatched to parallel agents. Verification runs before anything is called done, because \"done\" from a model is a claim, not a result.",
    "The part I'm actually proud of is smaller than any of that. Before every commit, the agent has to output one line naming a reusable skill it could extract from the work it just did, or explicitly state there wasn't one. Silence isn't a valid answer, and a hook enforces it. The effect is that the system gets marginally better at its own job every time I use it, without me having to remember to make it.",
    "The hard part was never the code. It was writing a spec tight enough that an agent could execute it unsupervised, then building the guardrails that catch it when the spec turned out to be wrong anyway.",
  ],
};
