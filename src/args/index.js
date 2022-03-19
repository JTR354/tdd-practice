/**
 * TDD 最难的感觉就是第0步(任务拆分)和第3步(重构)
 * 0. 任务分解
 * 1. 红
 * 2. 绿
 * 3. 重构
 *
 * 重构:
 * 1. 消除分支
 * 2. 消除重复
 * 3. 直接
 */

export default function parseArgs(
  str = "",
  defaultValue = {
    logging: false,
    port: 0,
    directory: "",
  }
) {
  let value = defaultValue;
  let ranges = getFlagRanges(str.split(" "));
  ranges.forEach((it) => {
    value = Object.assign(value, parse(it));
  });
  return value;
}

const options = {
  l: parseLogging,
  p: parsePort,
  d: parseDirectory,
  g: parseG,
};

function isKey(it) {
  return /^-[a-zA-Z]{1}$/.test(it);
}

function getFlagRanges(arr) {
  let ranges = [];
  let index = -1;
  arr.forEach((it) => {
    if (isKey(it)) {
      index++;
      ranges[index] = [];
    }
    ranges[index] && ranges[index].push(it);
  });
  return ranges;
}

function parse(it) {
  const [flag, ...others] = it;
  const exec = options[flag[1]];
  return typeof exec === "function" && exec(others);
}

function parseLogging(others) {
  if (others.length) {
    throw new Error(`-l error`);
  }
  return { logging: true };
}

function parsePort(others) {
  if (others.length > 1) {
    throw new Error(`-p has many port error`);
  }
  const port = Number.parseInt(others[0]);
  if (isNaN(port)) {
    throw new Error(`-p empty error`);
  }
  return { port };
}

function parseDirectory(others) {
  if (!others.length) {
    throw new Error("-d empty error");
  }
  if (others.length === 1) {
    return { directory: String(others[0]) };
  }
  return {
    directory: others.map((it) => {
      const number = Number.parseInt(it);
      if (isNaN(number)) {
        throw new Error("-d has many dirs error");
      }
      return number;
    }),
  };
}

function parseG(others) {
  return { g: others.map((it) => String(it)) };
}
