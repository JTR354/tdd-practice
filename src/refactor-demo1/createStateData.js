export default function createStatementData(invoice, plays) {
  const statementData = {};
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformance);
  statementData.totalAmount = totalAmount(statementData);
  statementData.totalVolumeCredits = totalVolumeCredits(statementData);
  return statementData;

  function enrichPerformance(aPerformance) {
    const calculator = createPerformanceCalculator(
      aPerformance,
      playFor(aPerformance)
    );
    // const calculator = new PerformanceCalculator(
    //   aPerformance,
    //   playFor(aPerformance)
    // );
    const result = Object.assign({}, aPerformance);
    // result.play = playFor(result);
    result.play = calculator.play;
    // result.amount = amountFor(result);
    result.amount = calculator.amount;
    // result.volumeCredits = volumeCreditsFor(result);
    result.volumeCredits = calculator.volumeCredits;
    return result;
  }

  function totalAmount({ performances }) {
    // let result = 0;
    // for (let perf of data.performances) {
    //   result += perf.amount;
    // }
    return performances.reduce((total, p) => total + p.amount, 0);
  }

  function totalVolumeCredits({ performances }) {
    // let result = 0;
    // for (let perf of data.performances) {
    //   result += perf.volumeCredits;
    // }
    return performances.reduce((total, p) => total + p.volumeCredits, 0);
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }
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

function createPerformanceCalculator(aPerformance, aPlay) {
  switch (aPlay.type) {
    case "tragedy":
      return new TragedyCalculator(aPerformance, aPlay);
    case "comedy":
      return new ComedyCalculator(aPerformance, aPlay);
    default:
      throw new Error(`unknown type:${aPlay.type}`);
  }
  // return new PerformanceCalculator(aPerformance, aPlay);
}

class PerformanceCalculator {
  constructor(aPerformance, aPlay) {
    this.performance = aPerformance;
    this.play = aPlay;
  }

  get amount() {
    throw new Error(`subclass responsibility`);
    // let result = 0;
    // switch (this.play.type) {
    //   case "tragedy":
    //     result = 40000;
    //     if (this.performance.audience > 30) {
    //       result += 1000 * (this.performance.audience - 30);
    //     }
    //     break;
    //   case "comedy":
    //     result = 30000;
    //     if (this.performance.audience > 20) {
    //       result += 10000 + 500 * (this.performance.audience - 20);
    //     }
    //     result += 300 * this.performance.audience;
    //     break;
    //   default:
    //     throw new Error(`unknown type:${this.play.type}`);
    // }
    // return result;
  }

  get volumeCredits() {
    // let result = 0;
    // // add volume credits
    // result += Math.max(this.performance.audience - 30, 0);
    // add extra credit for every ten comedy attendees
    // if ("comedy" === this.play.type) {
    //   result += Math.floor(this.performance.audience / 5);
    // }
    return Math.max(this.performance.audience - 30, 0);
  }
}

class TragedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 40000;
    if (this.performance.audience > 30) {
      result += 1000 * (this.performance.audience - 30);
    }
    return result;
  }
}

class ComedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 30000;
    if (this.performance.audience > 20) {
      result += 10000 + 500 * (this.performance.audience - 20);
    }
    return (result += 300 * this.performance.audience);
  }
  get volumeCredits() {
    return super.volumeCredits + Math.floor(this.performance.audience / 5);
  }
}
