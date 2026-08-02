import React from 'react';

/** Big counter for the homepage stat row. */
export function Stat({ value, suffix, label, style }) {
  return (
    <div className="stat" style={style}>
      <div className="stat-value">{value}{suffix && <sup>{suffix}</sup>}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}
