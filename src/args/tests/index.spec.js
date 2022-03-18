describe("args", () => {
  /**
   * “d”（目录）有一个字符串值。标志后面如果存在多个值，则该标志表示一个列表：
   * -g this is a list -d 1 2 -3 5　"g"表示一个字符串列表[“this”, “is”, “a”, “list”]，“d"标志表示一个整数列表[1, 2, -3, 5]。
   */
  // single:
  //  - bool: -l
  //  - int: -p 8080
  //  - string: -d /usr/logs
  // multi: -l -p 8080 -d /usr/logs
  // sad path:
  //  - bool: -l t/ -l t f
  //  - int: -p 8080 8081
  //  - string: -d /usr/logs /user/chat
  // default:
  // - bool: false
  // - int: 0
  // - string: ''
  test.skip("demo1", () => {
    expect(parseArgs("-l -p 8080 -d /usr/logs")).toEqual({
      l: true,
      p: 8080,
      d: "/usr/logs",
    });
  });
  test.skip("should 2", () => {
    expect(parseArgs("-g this is a list -d 1 2 -3 5")).toEqual({
      g: ["this", "is", "a", "list"],
      d: [1, 2, -3, 5],
    });
  });
});
