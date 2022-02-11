import { MutableRefObject } from "react";
import { getAPIUrl } from "./urls";

export function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export function current<HTMLElement>(ref: MutableRefObject<any>) {
  return ref.current;
}

export function parseSRC(item: any) {
  if (item.image) { return getAPIUrl() + item.image.url; }
  return '';
}