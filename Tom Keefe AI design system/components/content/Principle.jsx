import React from 'react';
import { Tag } from '../core/Tag.jsx';

/** Numbered aphorism row for the Principles list. */
export function Principle({ num, children, tag, style }) {
  return (
    <div className="principle" style={style}>
      <span className="principle-num">{num}</span>
      <p className="principle-text">{children}</p>
      {tag ? <Tag variant="draft">{tag}</Tag> : <span />}
    </div>
  );
}
