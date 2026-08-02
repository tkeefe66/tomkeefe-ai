import React from 'react';

/** Labeled text input on native elements. */
export function Input({ label, textarea = false, id, style, ...rest }) {
  const control = textarea
    ? <textarea className="input" id={id} {...rest} />
    : <input className="input" id={id} {...rest} />;
  if (!label) return control;
  return <div className="field" style={style}><label htmlFor={id}>{label}</label>{control}</div>;
}
