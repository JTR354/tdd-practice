/**
 * TDD 最难的感觉就是第0步(任务拆分)和第3步(重构)
 * 0. 任务分解
 * 1. 红
 * 2. 绿
 * 3. 重构
 */

export default function parseArgs(str = "") {
  let result = {
    logging: false,
    port: 0,
    directory: "",
  };
  let collection = [];
  let index = -1;
  str.split(" ").forEach((it) => {
    if (isKey(it)) {
      index++;
      collection[index] = [];
    }
    if (index > -1) {
      collection[index].push(it);
    }
  });
  collection.forEach((it) => {
    result = Object.assign(result, parse(it));
  });
  return result;
}

function isKey(it) {
  return /^-[a-zA-Z]{1}$/.test(it);
}

function parse(it) {
  const [flag, ...others] = it;
  if (flag[1] === "l") {
    if (others.length) {
      throw new Error(`-l error`);
    }
    return { logging: true };
  }
  if (flag[1] === "p") {
    if (others.length > 1) {
      throw new Error(`-p error`);
    }
    return { port: Number.parseInt(others[0]) };
  }
  if (flag[1] === "d") {
    if (others.length === 1) {
      return { directory: String(others[0]) };
    }
    return {
      directory: others.map((it) => {
        const number = Number.parseInt(it);
        if (isNaN(number)) {
          throw new Error("-d error");
        }
        return number;
      }),
    };
  }
  if (flag[1] === "g") {
    return { g: others.map((it) => String(it)) };
  }
}
