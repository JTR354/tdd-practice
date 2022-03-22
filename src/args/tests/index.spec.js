import { describe, test, expect } from "vitest";

import parseArgs from "../index";
describe("args", () => {
  /**
   * “d”（目录）有一个字符串值。标志后面如果存在多个值，则该标志表示一个列表：
   * -g this is a list -d 1 2 -3 5　"g"表示一个字符串列表[“this”, “is”, “a”, “list”]，“d"标志表示一个整数列表[1, 2, -3, 5]。
   */
  // single:
  // - bool: -l
  test("parse -l is true", () => {
    expect(parseArgs("-l")).toMatchObject({ logging: true });
  });
  // - int: -p 8080
  test("parse -p is 8080", () => {
    expect(parseArgs("-p 8080")).toMatchObject({ port: 8080 });
  });
  // - string: -d /usr/logs
  test("parse -d is /usr/logs", () => {
    expect(parseArgs("-d /usr/logs")).toMatchObject({ directory: "/usr/logs" });
  });
  //multi: -l -p 8080 -d /usr/logs
  // sad path:
  //  - bool: -l t/ -l t f
  test("sad path: -l t/ -l t f throw error", () => {
    expect(() => parseArgs("-l t")).toThrow();
    expect(() => parseArgs("-l t f")).toThrow();
  });
  //  - int: -p 8080 8081
  test("sad path:- int: -p 8080 8081 ", () => {
    expect(() => parseArgs("-p 8080 8081")).toThrow();
  });
  test("sad path:- int: -p  ", () => {
    expect(() => parseArgs("-p ")).toThrow();
  });
  // - string: -d /usr/logs /user/chat
  test("sad path: -d /usr/logs /user/chat ", () => {
    expect(() => parseArgs("-d /usr/logs /user/chat")).toThrow();
  });
  test("sad path: -d", () => {
    expect(() => parseArgs("-d")).toThrow();
  });
  // default:
  // - bool: false
  test("default: bool false", () => {
    expect(parseArgs()).toMatchObject({ logging: false });
  });
  // - int: 0
  test("default: int 0", () => {
    expect(parseArgs()).toMatchObject({ port: 0 });
  });
  // - string: ''
  test("default: string ''", () => {
    expect(parseArgs()).toMatchObject({ directory: "" });
  });
  test("multi: -l -p 8080 -d /usr/logs", () => {
    expect(parseArgs("-l -p 8080 -d /usr/logs")).toEqual({
      logging: true,
      port: 8080,
      directory: "/usr/logs",
    });
  });
  test("multi: -g this is a list -d 1 2 -3 5", () => {
    expect(parseArgs("-g this is a list -d 1 2 -3 5")).toMatchObject({
      g: ["this", "is", "a", "list"],
      directory: [1, 2, -3, 5],
    });
  });
});
