import * as React from 'react';

/** Labeled text input (or textarea) on native elements — surface fill, 1px divider border, accent caret. */
export interface InputProps {
  label?: string;
  /** Render a textarea instead of an input */
  textarea?: boolean;
  id?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: any) => void;
  style?: React.CSSProperties;
}
export declare function Input(props: InputProps): JSX.Element;
