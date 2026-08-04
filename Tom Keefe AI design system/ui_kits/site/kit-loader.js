/* Loads JSX files, transforms them with Babel, and evaluates them in order.
   Babel's own <script type="text/babel" src> handling does not fire reliably
   in this preview, so the kit pages call this instead. */
window.loadKit = async function (paths, onReady) {
  for (const p of paths) {
    const src = await (await fetch(p)).text();
    const out = Babel.transform(src, { presets: [["react", { runtime: "classic" }]] }).code;
    new Function(out)();
  }
  onReady();
};
