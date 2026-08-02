import * as React from 'react';

/** Big Archivo-800 counter with an uppercase caption; suffix (+, %) renders small in accent. */
export interface StatProps {
  /** The number, e.g. "120" */
  value: string | number;
  /** Small accent suffix, e.g. "+" */
  suffix?: string;
  /** Uppercase caption, e.g. "workflows automated" */
  label: string;
  style?: React.CSSProperties;
}
export declare function Stat(props: StatProps): JSX.Element;
