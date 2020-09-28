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
  return (
    loan *
    ((Math.pow(1 + interest, loanLength) - Math.pow(1 + interest, periodElapsedMonths)) /
      (Math.pow(1 + interest, loanLength) - 1))
  );
};

/*
 * Simple Interest
 *
 * Function to calculate the remaining loan balance of a fixed payment loan after a period of months
 *
 * i = L (c)
 *
 * i = L (c/t)
 *
 * @param {number} Balance / Loan in the first operation (L)
 * @param {number} Interest rate annually (c)
 * @param {number} Number of times interest compounds, default 12 (t)
 * @returns {number} interest
 */

export const getSimpleInterest = (balance: number, interestRate: number, timesInterestCompounds: number = 12) => {
  if (balance < 0) throw new Error('Please provide a valid loan/balance');
  if (interestRate < 0) throw new Error('Please provide a valid interest rate');
  if (timesInterestCompounds <= 0) throw new Error('Please provide a valid number of times interest compounds');
  return balance * (interestRate / timesInterestCompounds);
};

/*
 * Calculate Total Amortizing Interest using a constant payment
 *
 * @param {number} loan/balance amount
 * @param {number} Interest rate
 * @param {number} mountly payment
 * @returns {number} Total Interest
 */
export const getTotalAmortizingInterest = (
  balance: number,
  interestRate: number,
  mountlyPayment: number,
  timesInterestCompounds: number = 12,
) => {
  if (balance < 0) throw new Error('Please provide a valid loan/balance');
  if (interestRate < 0) throw new Error('Please provide a valid interest rate');
  if (mountlyPayment < 0) throw new Error('Please provide a valid mountly payment');
  if (timesInterestCompounds <= 0) throw new Error('Please provide a valid number of times interest compounds');
  let interest = 0;
  let amortizingInterest = 0;

  while (balance > 0) {
    interest = (interestRate / timesInterestCompounds) * balance;
    amortizingInterest += interest;
    balance -= mountlyPayment - interest;
  }

  return amortizingInterest;
};

/*
 * Calculate loan length
 *
 * @param {number} loan amount
 * @param {number} Interest rate
 * @param {number} mountly payment
 * @param {number} extra payment added to the mountly payment
 * @returns {number} Total Interest
 */
export const getLoanLength = (
  loan: number,
  interestRate: number,
  mountlyPayment: number
) => {
  if (loan < 0) throw new Error('Please provide a valid loan/balance');
  if (interestRate < 0) throw new Error('Please provide a valid interest rate');
  if (mountlyPayment < 0) throw new Error('Please provide a valid mountly payment');
  const monthlyInterestRate = interestRate / 12; // i = monthly interest rate
  const loanLength = -(
    Math.log(-((monthlyInterestRate * loan) / (mountlyPayment)) + 1) /
    Math.log(1 + monthlyInterestRate)
  );

  return Math.ceil(parseInt(loanLength.toFixed(3)));
};
