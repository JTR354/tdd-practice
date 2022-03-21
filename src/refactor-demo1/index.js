import createStatementData from "./createStateData";
export const invoice = [
  {
    customer: "BigCo",
    performances: [
      {
        playID: "hamlet",
        audience: 55,
      },
      {
        playID: "as-like",
        audience: 35,
      },
      {
        playID: "othello",
        audience: 40,
      },
    ],
  },
];

export const plays = {
  hamlet: { name: "Hamlet", type: "tragedy" },
  "as-like": { name: "As You Like it", type: "comedy" },
  othello: { name: "Othello", type: "tragedy" },
};

export function statement(invoice, plays) {
  return renderPlainText(createStatementData(invoice, plays));

  // function createStatementData(invoice, plays) {
  //   const statementData = {};
  //   statementData.customer = invoice.customer;
  //   statementData.performances = invoice.performances.map(enrichPerformance);
  //   statementData.totalAmount = totalAmount(statementData);
  //   statementData.totalVolumeCredits = totalVolumeCredits(statementData);
  //   return statementData;
  // }

  // function totalAmount({performances}) {
  //   // let result = 0;
  //   // for (let perf of data.performances) {
  //   //   result += perf.amount;
  //   // }
  //   return performances.reduce((total, p) => total + p.amount, 0);
  // }

  // function totalVolumeCredits({performances}) {
  //   // let result = 0;
  //   // for (let perf of data.performances) {
  //   //   result += perf.volumeCredits;
  //   // }
  //   return performances.reduce((total, p) => total + p.volumeCredits, 0);
  // }

  // function enrichPerformance(aPerformance) {
  //   const result = Object.assign({}, aPerformance)
  //   result.play = playFor(result)
  //   result.amount = amountFor(result)
  //   result.volumeCredits = volumeCreditsFor(result)
  //   return result
  // }

  // function playFor(aPerformance) {
  //   return plays[aPerformance.playID];
  // }
  // function amountFor(aPerformance) {
  //   let result = 0;

  //   switch (aPerformance.play.type) {
  //     case "tragedy":
  //       result = 40000;
  //       if (aPerformance.audience > 30) {
  //         result += 1000 * (aPerformance.audience - 30);
  //       }
  //       break;
  //     case "comedy":
  //       result = 30000;
  //       if (aPerformance.audience > 20) {
  //         result += 10000 + 500 * (aPerformance.audience - 20);
  //       }
  //       result += 300 * aPerformance.audience;
  //       break;
  //     default:
  //       throw new Error(`unknown type:${aPerformance.play.type}`);
  //   }
  //   return result;
  // }
  // function volumeCreditsFor(aPerformance) {
  //   let result = 0;
  //   // add volume credits
  //   result += Math.max(aPerformance.audience - 30, 0);
  //   // add extra credit for every ten comedy attendees
  //   if ("comedy" === aPerformance.play.type) {
  //     result += Math.floor(aPerformance.audience / 5);
  //   }
  //   return result;
  // }
}

function renderPlainText(data) {
  // let totalAmount = 0;
  // let volumeCredits = 0;
  let result = `Statement for ${data.customer}\n`;
  // const format = format();

  for (let perf of data.performances) {
    // const play = playFor(perf); *** 移除play
    // let thisAmount = amountFor(perf); *** 移除thisAmount
    // 提炼计算观众量积分的逻辑 ***
    // volumeCredits += volumeCreditsFor(perf);
    // print line for this order
    result += ` ${perf.play.name}: ${usd(perf.amount)} (${
      perf.audience
    } seats)\n`;
    // totalAmount += amountFor(perf);
  }
  // let totalAmount = appleSauce();
  // 移除积分计算 ***
  // let volumeCredits = totalVolumeCredits();
  result += `Amount owed is ${usd(data.totalAmount)}\n`;
  result += `You earned ${data.totalVolumeCredits} credits\n`;
  return result;

  // function totalAmount() {
  //   let result = 0;
  //   for (let perf of data.performances) {
  //     result += perf.amount;
  //   }
  //   return result;
  // }

  // function totalVolumeCredits() {
  //   let result = 0;
  //   for (let perf of data.performances) {
  //     result += perf.volumeCredits;
  //   }
  //   return result;
  // }

  // function volumeCreditsFor(aPerformance) {
  //   let result = 0;
  //   // add volume credits
  //   result += Math.max(aPerformance.audience - 30, 0);
  //   // add extra credit for every ten comedy attendees
  //   if ("comedy" === aPerformance.play.type) {
  //     result += Math.floor(aPerformance.audience / 5);
  //   }
  //   return result;
  // }

  /**移除play变量 */
  // function aPerformance.play {
  //   return plays[aPerformance.playID];
  // }

  /**关注点分离 switch */
  // function amountFor(aPerformance) {
  //   let result = 0;

  //   switch (aPerformance.play.type) {
  //     case "tragedy":
  //       result = 40000;
  //       if (aPerformance.audience > 30) {
  //         result += 1000 * (aPerformance.audience - 30);
  //       }
  //       break;
  //     case "comedy":
  //       result = 30000;
  //       if (aPerformance.audience > 20) {
  //         result += 10000 + 500 * (aPerformance.audience - 20);
  //       }
  //       result += 300 * aPerformance.audience;
  //       break;
  //     default:
  //       throw new Error(`unknown type:${aPerformance.play.type}`);
  //   }
  //   return result;
  // }
}
function usd(aNumber) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(aNumber / 100);
}

export function htmlStatement(invoice, plays) {
  return renderHtml(createStatementData(invoice, plays));
}

function renderHtml(data) {
  let result = `<h1>Statement for ${data.customer}</h1>\n`;
  result += `<table>\n`;
  result += `<tr><th>play</th><th>seats</th><th>cost</th></tr>`;
  for (let perf of data.performances) {
    result += ` <tr><td>${perf.play.name}</td><td>${
      perf.audience
    }</td><td>${usd(perf.amount)}</td></tr>\n`;
    // totalAmount += amountFor(perf);
  }
  result += `</table>`;
  // let totalAmount = appleSauce();
  // 移除积分计算 ***
  // let volumeCredits = totalVolumeCredits();
  result += `<p>Amount owed is <em>${usd(data.totalAmount)}</em></p>\n`;
  result += `<p>You earned <em>${data.totalVolumeCredits}</em> credits</p>\n`;
  return result;
}
