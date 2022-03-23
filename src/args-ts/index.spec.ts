import { it, describe, expect } from "vitest";
import { parseArgs } from ".";
describe("args-ts happy path", () => {
  it("-l", () => {
    const options = {
      l: Boolean,
    };
    const args = parseArgs(options, ["-l"]);
    expect(args).toEqual({ l: true });
  });
  it("-p 8080", () => {
    const options = {
      p: Number,
    };
    const args = parseArgs(options, ["-p", "8080"]);
    expect(args).toEqual({ p: 8080 });
  });
  it("-d /user/logs", () => {
    const options = {
      d: String,
    };
    const args = parseArgs(options, ["-d", "/usr/logs"]);
    expect(args).toEqual({ d: "/usr/logs" });
  });

  it("-l -p 8080 -d /usr/logs ", () => {
    const options = {
      l: Boolean,
      p: Number,
      d: String,
    };
    const args = parseArgs(options, ["-l", "-p", "8080", "-d", "/usr/logs"]);
    expect(args).toEqual({
      l: true,
      p: 8080,
      d: "/usr/logs",
    });
  });
});
