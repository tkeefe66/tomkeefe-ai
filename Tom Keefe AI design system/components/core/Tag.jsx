import React from 'react';

/** Small status/category label. */
export function Tag({ variant = 'neutral', children, style }) {
  return <span className={`tag tag-${variant}`} style={style}>{children}</span>;
}
