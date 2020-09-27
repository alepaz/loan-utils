/*
 * Monthly Payment
 *
 * Function to calculate the fixed monthly payment required to amortize a loan
 * over a term of months.
 *
 * P = L[c(1 + c)^n]/[(1 + c)^n - 1]
 *
 * P = L[(c/t)(1 + c/t)n]/[(1 + c/t)n - 1]
 *
 * @param {number} Loan Amount (L)
 * @param {number} Interest rate annually (c)
 * @param {number} Loan length express in months (n)
 * @param {number} Number of times interest compounds, default 12 (t)
 * @returns {number} Monthly Payment
 */

export const getMonthlyPayment = (
  loan: number,
  interestRate: number,
  loanLength: number,
  timesInterestCompounds: number = 12,
) => {
  if (loan < 0) throw new Error('Please provide a valid loan');
  if (interestRate < 0) throw new Error('Please provide a valid interest rate');
  if (loanLength < 0) throw new Error('Please provide a valid loan length');
  if (timesInterestCompounds <= 0) throw new Error('Please provide a valid number of times interest compounds');
  const interest = interestRate / timesInterestCompounds;
  return loan * ((interest * Math.pow(1 + interest, loanLength)) / (Math.pow(1 + interest, loanLength) - 1));
};

/*
 * Loan Balance
 *
 * Function to calculate the remaining loan balance of a fixed payment loan after a period of months
 *
 * B = L[(1 + c)n - (1 + c)p]/[(1 + c)n - 1]
 *
 * B = L[(1 + c/t)^n - (1 + c/t)^p]/[(1 + c/t)^n - 1]
 *
 * @param {number} Loan Amount (L)
 * @param {number} Interest rate annually (c)
 * @param {number} Loan length express in months (n)
 * @param {number} Period of elapsed months (p)
 * @param {number} Number of times interest compounds, default 12 (t)
 * @returns {number} Monthly Payment
 */

export const getLoanBalance = (
  loan: number,
  interestRate: number,
  loanLength: number,
  periodElapsedMonths: number,
  timesInterestCompounds: number = 12,
) => {
  if (loan < 0) throw new Error('Please provide a valid loan');
  if (interestRate < 0) throw new Error('Please provide a valid interest rate');
  if (loanLength < 0) throw new Error('Please provide a valid loan length');
  if (timesInterestCompounds <= 0) throw new Error('Please provide a valid number of times interest compounds');
  if (periodElapsedMonths < 0) throw new Error('Please provide a valid number of Period of elapsed months');
  const interest = interestRate / timesInterestCompounds;
  return loan * ((Math.pow(1 + interest, loanLength) - Math.pow(1 + interest, periodElapsedMonths)) / (Math.pow(1 + interest, loanLength) - 1));
};
