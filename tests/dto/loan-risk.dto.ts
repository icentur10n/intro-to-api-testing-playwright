export class LoanRiskDto {
  income: number;
  debt: number;
  age: number;
  employ: boolean;
  loanAmount: number;
  loanPeriod: number;
  private constructor(
    income: number,
    debt: number,
    age: number,
    employ: boolean,
    loanAmount: number,
    loanPeriod: number,
  ) {
    this.income = income;
    this.debt = debt;
    this.age = age;
    this.employ = employ;
    this.loanAmount = loanAmount;
    this.loanPeriod = loanPeriod;
  }
  static createRequestWithRandomLoanPeriod(): LoanRiskDto {
    return new LoanRiskDto(
      1000,
      0,
      25,
      true,
      500,
      Math.floor(Math.random() * 100),
    )
  }
  static createRequestWithRandomAge(): LoanRiskDto {
    return new LoanRiskDto(
      1000,
      0,
      Math.floor(Math.random() * 100),
      true,
      500,
      24,
    )
  }
  static createNegativeAge(age: number): LoanRiskDto {
    return new LoanRiskDto(
      10000,
      0,
       age,
      true,
      500,
      36,
    )
  }
  static createAllDataNUll(): LoanRiskDto {
    return new LoanRiskDto(
      0,
      0,
      0,
      true,
      0,
      0,
    )
  }
  static createNoEmploy(): LoanRiskDto {
    return new LoanRiskDto(
      10000,
      0,
      25,
      false,
      500,
      36,
    )
  }
  static createPositiveDecision(): LoanRiskDto {
    return new LoanRiskDto(
      10000,
      0,
      25,
      true,
      500,
      15,
    )
  }
}
