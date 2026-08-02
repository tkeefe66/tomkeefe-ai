import React from 'react';

/** Header bar: typographic brand left, links right, optional theme toggle. */
export function NavBar({ links = [], current, onToggleTheme, themeLabel = 'Dark', style }) {
  return (
    <nav className="nav" style={style}>
      <a className="nav-brand" href="#top">Tom Keefe</a>
      {links.map((l) => (
        <a key={l.href} href={l.href} aria-current={current === l.href ? 'page' : undefined}>{l.label}</a>
      ))}
      {onToggleTheme && (
        <button className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: 12 }} onClick={onToggleTheme}>{themeLabel}</button>
      )}
    </nav>
  );
}
