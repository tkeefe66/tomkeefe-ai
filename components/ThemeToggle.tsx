"use client";

import { useSyncExternalStore } from "react";

// Theme state lives on <html data-theme> (set pre-hydration by the inline
// script in layout.tsx), so read it as an external store.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

export default function ThemeToggle() {
  const dark = useSyncExternalStore(
    subscribe,
    () => document.documentElement.getAttribute("data-theme") === "dark",
    () => false,
  );

  function toggle() {
    if (dark) {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
    }
    try {
      localStorage.setItem("tk-theme", dark ? "light" : "dark");
    } catch {
      // localStorage unavailable (private mode) — theme still toggles for this visit
    }
  }

  return (
    <button
      type="button"
      className="nav-link cursor-pointer border-0 bg-transparent"
      onClick={toggle}
      aria-pressed={dark}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {dark ? "LIGHT" : "DARK"}
    </button>
  );
}
