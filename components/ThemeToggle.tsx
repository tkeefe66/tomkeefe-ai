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

function SunIcon() {
  return (
    <svg viewBox="0 0 20 20" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <circle cx="10" cy="10" r="3.6" />
      <path strokeLinecap="round" d="M10 1.6v2M10 16.4v2M18.4 10h-2M3.6 10h-2M15.9 4.1l-1.4 1.4M5.5 14.5l-1.4 1.4M15.9 15.9l-1.4-1.4M5.5 5.5L4.1 4.1" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 20 20" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path strokeLinejoin="round" d="M16.5 12.4A7 7 0 0 1 7.6 3.5a7 7 0 1 0 8.9 8.9Z" />
    </svg>
  );
}

/* Two explicit choices rather than one mystery button: the active theme reads
   in white, the other dims to the band's muted white. Sits left of the TK
   wordmark (2026-08-14). */
export default function ThemeToggle() {
  const dark = useSyncExternalStore(
    subscribe,
    () => document.documentElement.getAttribute("data-theme") !== "light",
    () => true, // dark is the default — see themeInit in layout.tsx
  );

  function set(next: "light" | "dark") {
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("tk-theme", next);
    } catch {
      // localStorage unavailable (private mode) — theme still switches for this visit
    }
  }

  const item = "cursor-pointer border-0 bg-transparent p-1 leading-none transition-colors";
  return (
    <div className="flex items-center gap-0.5" role="group" aria-label="Theme">
      <button
        type="button"
        className={item}
        style={{ color: dark ? "rgba(255,255,255,0.5)" : "#fff" }}
        aria-pressed={!dark}
        aria-label="Light theme"
        onClick={() => set("light")}
      >
        <SunIcon />
      </button>
      <button
        type="button"
        className={item}
        style={{ color: dark ? "#fff" : "rgba(255,255,255,0.5)" }}
        aria-pressed={dark}
        aria-label="Dark theme"
        onClick={() => set("dark")}
      >
        <MoonIcon />
      </button>
    </div>
  );
}
