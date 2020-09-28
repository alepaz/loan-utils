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
 * Total interest
 *
 * Function to calculate the total interest of a loan with the minimum monthly payment
 *
 * @param {number} Loan amount
 * @param {number} loan length
 * @param {number} Interest rate annually (c)
 * @param {number} Number of times interest compounds, default 12 (t)
 * @returns {number} Total interest
 */

export const getTotalInterest = (
  loan: number,
  interestRate: number,
  loanLength: number,
  timesInterestCompounds: number = 12,
) => {
  if (loan < 0) throw new Error('Please provide a valid loan');
  if (interestRate < 0) throw new Error('Please provide a valid interest rate');
  if (loanLength < 0) throw new Error('Please provide a valid loan length');
  if (timesInterestCompounds <= 0) throw new Error('Please provide a valid number of times interest compounds');
  return getMonthlyPayment(loan, interestRate, loanLength, timesInterestCompounds) * loanLength - loan;
};

/*
 * Calculate Total Amortizing Interest using a constant payment
 *
 * @param {number} loan/balance amount
 * @param {number} Interest rate
 * @param {number} mountly payment
 * @param {number} Number of times interest compounds, default 12 (t)
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
 * @param {number} Number of times interest compounds, default 12 (t)
 * @returns {number} Total Interest
 */
export const getLoanLength = (
  loan: number,
  interestRate: number,
  mountlyPayment: number,
  timesInterestCompounds: number = 12,
) => {
  if (loan < 0) throw new Error('Please provide a valid loan/balance');
  if (interestRate < 0) throw new Error('Please provide a valid interest rate');
  if (mountlyPayment < 0) throw new Error('Please provide a valid mountly payment');
  if (timesInterestCompounds <= 0) throw new Error('Please provide a valid number of times interest compounds');
  const monthlyInterestRate = interestRate / timesInterestCompounds; // i = monthly interest rate
  const loanLength = -(
    Math.log(-((monthlyInterestRate * loan) / mountlyPayment) + 1) / Math.log(1 + monthlyInterestRate)
  );

  return Math.ceil(parseFloat(loanLength.toFixed(5)));
};

/*
 * Calculate the Payoff Results
 *
 * @param {number} Loan Amount
 * @param {number} Interest rate annually
 * @param {number} Loan length express in months
 * @param {number} Extra payment add to the principal
 * @param {number} Date to start the payoff in milliseconds
 * @param {number} Number of times interest compounds, default 12 (t)
 * @returns {object} Payoff Results
 */
export const getMortgagePayoff = (
  loan: number,
  interestRate: number,
  loanLength: number,
  extraPrincipal: number = 0,
  initialDate: number = Date.now(),
  timesInterestCompounds: number = 12,
) => {
  if (loan < 0) throw new Error('Please provide a valid loan');
  if (interestRate < 0) throw new Error('Please provide a valid interest rate');
  if (loanLength < 0) throw new Error('Please provide a valid Loan Length');
  if (extraPrincipal < 0) throw new Error('Please provide a valid extra payment');
  if (timesInterestCompounds <= 0) throw new Error('Please provide a valid number of times interest compounds');

  //Payoff results (Payments)
  const payoffGrid: any = [];

  let remainingLoan = loan;
  const defaultLoanLength = loanLength;
  const defaultInitialDate = initialDate;
  const date = new Date(initialDate);
  if (isNaN(date.getTime())) throw new Error('Please provide a valid date');

  const mountlyPayment = getMonthlyPayment(loan, interestRate, loanLength, timesInterestCompounds);
  const defaultTotalInterest = getTotalInterest(loan, interestRate, loanLength, timesInterestCompounds);
  const newLoanLength = getLoanLength(loan, interestRate, mountlyPayment + extraPrincipal);

  const results = {
    mountlyPayment,
    extraPrincipal,
    interestRate,
    defaultTotalInterest,
    totalInterestWithSavings: getTotalAmortizingInterest(loan, interestRate, mountlyPayment, timesInterestCompounds),
    loan: loan,
    defaultLoanLength: loanLength,
    loanLength: newLoanLength,
    startDate: new Date(initialDate),
    endDate: getEndDate(defaultInitialDate, newLoanLength),
    defaultEndDate: getEndDate(defaultInitialDate, defaultLoanLength),
    data: {},
  };

  /*
   * Payoff grid
   */
  for (let i = 0; i < loanLength; i++) {
    const dateRow = date;
    const interestRow = getSimpleInterest(remainingLoan, interestRate);
    const principal = mountlyPayment - interestRow;
    let principalExtra = principal + extraPrincipal;
    let balance = remainingLoan - principalExtra;

    /*
     * Stop Condition
     */
    if (remainingLoan + interestRow < mountlyPayment + extraPrincipal) {
      const row = {
        date: dateRow,
        interest: interestRow,
        principal,
        principalExtra: principalExtra + balance,
        balance: 0,
        type: 'row',
      };
      payoffGrid.push(row);
      remainingLoan = balance = 0; //remaining loan
      break;
    }

    /*
     * Add row to the payoff Grid
     */
    const row = {
      date: dateRow,
      interest: interestRow,
      principal,
      principalExtra,
      balance,
      type: 'row',
    };
    payoffGrid.push(row);

    /*
     * Update conditions for next iteration
     */
    remainingLoan = balance;
    date.setMonth(date.getMonth() + 1);
  }

  results.data = payoffGrid;
  console.log(results);
  return results;
};

/*
 * Calculate end date of the loan
 *
 * @param {number} date in milliseconds
 * @param {number} loan Length
 * @returns {string} end date of the loan
 */
function getEndDate(startDate: number, loanLength: number) {
  const date = new Date(startDate);
  date.setMonth(date.getMonth() + loanLength - 1);
  return date;
}
