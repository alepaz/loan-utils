import { getMortgagePayoff } from '../index';
test('Total Amortizing Interest', () => {
  expect(getMortgagePayoff(2e5, 7.5e-2, 30 * 12)).toEqual(
    expect.objectContaining({
      mountlyPayment: expect.any(Number),
      extraPrincipal: expect.any(Number),
      interestRate: expect.any(Number),
      defaultTotalInterest: expect.any(Number),
      totalInterestWithSavings: expect.any(Number),
      loan: expect.any(Number),
      defaultLoanLength: expect.any(Number),
      loanLength: expect.any(Number),
      startDate: expect.any(Object),
      endDate: expect.any(Object),
      defaultEndDate: expect.any(Object),
      data: expect.any(Array),
    }),
  );
  expect(getMortgagePayoff(2e5, 7.5e-2, 30 * 12, 1000)).toEqual(
    expect.objectContaining({
      mountlyPayment: expect.any(Number),
      extraPrincipal: expect.any(Number),
      interestRate: expect.any(Number),
      defaultTotalInterest: expect.any(Number),
      totalInterestWithSavings: expect.any(Number),
      loan: expect.any(Number),
      defaultLoanLength: expect.any(Number),
      loanLength: expect.any(Number),
      startDate: expect.any(Object),
      endDate: expect.any(Object),
      defaultEndDate: expect.any(Object),
      data: expect.any(Array),
    }),
  );
  expect(getMortgagePayoff(2e5, 7.5e-2, 30 * 12, 10000)).toEqual(
    expect.objectContaining({
      mountlyPayment: expect.any(Number),
      extraPrincipal: expect.any(Number),
      interestRate: expect.any(Number),
      defaultTotalInterest: expect.any(Number),
      totalInterestWithSavings: expect.any(Number),
      loan: expect.any(Number),
      defaultLoanLength: expect.any(Number),
      loanLength: expect.any(Number),
      startDate: expect.any(Object),
      endDate: expect.any(Object),
      defaultEndDate: expect.any(Object),
      data: expect.any(Array),
    }),
  );
  expect(() => getMortgagePayoff(-2e5, 7.5e-2, 30 * 12, 10000)).toThrow('Please provide a valid loan');
  expect(() => getMortgagePayoff(2e5, -7.5e-2, 30*12, 0)).toThrow('Please provide a valid interest rate');
  expect(() => getMortgagePayoff(2e5, 7.5e-2, -30*12)).toThrow('Please provide a valid Loan Length');
  expect(() => getMortgagePayoff(2e5, 7.5e-2, 30*12, -1)).toThrow('Please provide a valid extra payment');
  expect(() => getMortgagePayoff(2e5, 7.5e-2, 30*12, 0, Date.now(), -2)).toThrow('Please provide a valid number of times interest compounds');
});
