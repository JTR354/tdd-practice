export default function parseArgs(str) {
  let result = {};
  str.split(" ").forEach((it, index, arr) => {
    result = Object.assign(result, parse(it, index, arr));
  });
  return result;
}

function parse(it, index, arr) {
  if (it.startsWith("-")) {
    if (it[1] === "l") {
      return { logging: true };
    }
    if (it[1] === "p") {
      return { port: Number.parseInt(arr[index + 1]) };
    }
    if (it[1] === "d") {
      return { directory: String(arr[index + 1]) };
    }
  }
}
