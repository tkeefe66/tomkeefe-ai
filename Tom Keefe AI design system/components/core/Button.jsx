import React from 'react';

/** Action button. Labels sit flush left even in wide/block buttons. */
export function Button({ variant = 'primary', block = false, icon = null, disabled = false, href, onClick, children, style, ...rest }) {
  const cls = ['btn', `btn-${variant}`, block ? 'btn-block' : ''].filter(Boolean).join(' ');
  const content = <>{children}{icon}</>;
  if (href) return <a className={cls} href={href} style={style} {...rest}>{content}</a>;
  return <button className={cls} onClick={onClick} disabled={disabled} style={style} {...rest}>{content}</button>;
}
