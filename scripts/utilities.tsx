import { MutableRefObject } from "react";
import { getAPIUrl } from "./urls";

export function current<HTMLElement>(ref: MutableRefObject<any>) {
  return ref.current;
}

export function parseSRC(item: any) {
  if (item.image) { return getAPIUrl() + item.image.url; }
  return '';
}