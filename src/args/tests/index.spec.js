import parseArgs from "../index";
describe("args", () => {
  /**
   * “d”（目录）有一个字符串值。标志后面如果存在多个值，则该标志表示一个列表：
   * -g this is a list -d 1 2 -3 5　"g"表示一个字符串列表[“this”, “is”, “a”, “list”]，“d"标志表示一个整数列表[1, 2, -3, 5]。
   */
  // single:
  //TODO  - bool: -l
  test("parse -l is true", () => {
    expect(parseArgs("-l")).toEqual({ logging: true });
  });
  //TODO  - int: -p 8080
  test("parse -p is 8080", () => {
    expect(parseArgs("-p 8080")).toEqual({ port: 8080 });
  });
  //TODO  - string: -d /usr/logs
  test("parse -d is /usr/logs", () => {
    expect(parseArgs("-d /usr/logs")).toEqual({ directory: "/usr/logs" });
  });
  //TODO multi: -l -p 8080 -d /usr/logs
  // sad path:
  //TODO  - bool: -l t/ -l t f
  //TODO  - int: -p 8080 8081
  //TODO  - string: -d /usr/logs /user/chat
  // default:
  //TODO - bool: false
  //TODO - int: 0
  //TODO - string: ''
  test("demo1", () => {
    expect(parseArgs("-l -p 8080 -d /usr/logs")).toEqual({
      logging: true,
      port: 8080,
      directory: "/usr/logs",
    });
  });
  test.skip("should 2", () => {
    expect(parseArgs("-g this is a list -d 1 2 -3 5")).toEqual({
      g: ["this", "is", "a", "list"],
      d: [1, 2, -3, 5],
    });
  });
});
