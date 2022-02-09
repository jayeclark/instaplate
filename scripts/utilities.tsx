import { MutableRefObject } from "react";

export function current<HTMLElement>(ref: MutableRefObject<any>) {
  return ref.current;
}
