import { statement, invoice, plays } from "./index";
describe("重构，第一个示例", () => {
  test("demo1", () => {
    expect(statement(invoice[0], plays)).toEqual(
      `Statement for BigCo
 Hamlet: $650.00 (55 seats)
 As You Like it: $580.00 (35 seats)
 Othello: $500.00 (40 seats)
Amount owed is $1,730.00
You earned 47 credits
`
    );
  });
});
