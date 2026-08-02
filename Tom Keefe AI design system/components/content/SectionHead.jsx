import React from 'react';

/** Section opener: 2px top rule, title, right-aligned index kicker. */
export function SectionHead({ index, title, style }) {
  return (
    <div className="section-head" style={style}>
      <h2>{title}</h2>
      {index && <span className="kicker">{index}</span>}
    </div>
  );
}
