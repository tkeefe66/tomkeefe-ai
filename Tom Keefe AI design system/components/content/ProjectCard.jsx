import React from 'react';
import { Tag } from '../core/Tag.jsx';

/** Project card — kicker, title, status, description, stack meta. */
export function ProjectCard({ kicker, title, status = 'draft', statusLabel, body, meta = [], style }) {
  return (
    <div className="card" style={style}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {kicker && <span className="card-kicker" style={{ flex: 1 }}>{kicker}</span>}
        <Tag variant={status}>{statusLabel || status}</Tag>
      </div>
      <div className="card-title">{title}</div>
      {body && <p className="card-body">{body}</p>}
      {meta.length > 0 && (
        <div className="card-meta">{meta.map((m, i) => <span key={i}>{m}{i < meta.length - 1 ? ' ·' : ''}</span>)}</div>
      )}
    </div>
  );
}
