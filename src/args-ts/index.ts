import { parse } from "./parse";

export function parseArgs(options: object, args: any[]) {
  const keys = Object.keys(options);
  return keys.reduce((result, key) => {
    result[key] = parse(options, key, args);
    return result;
  }, {});
}
