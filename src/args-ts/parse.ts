const map = initMap();

function initMap() {
  const result = new Map();
  result.set(Boolean, parseBoolean);
  result.set(Number, parseNumber);
  result.set(String, parseString);
  return result;
}

export function parse(options: object, key: string, args: any[]) {
  const parseHandler = map.get(options[key]);
  return parseHandler(args, key);
}

function parseString(args: any[], key: string) {
  return getFlagValue(args, key);
}
function parseNumber(args: any[], key: string) {
  return Number.parseInt(getFlagValue(args, key));
}
function parseBoolean(args: any[], key: string) {
  return getFlagIndex(args, key) > -1;
}

function getFlagValue(args: any[], key: string) {
  const flagIndex = getFlagIndex(args, key);
  return args[flagIndex + 1];
}
function getFlagIndex(args: any[], key: string) {
  return args.indexOf("-" + key);
}
