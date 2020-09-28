import { getLoanLength, getMonthlyPayment } from '../index';
test('Loan Length', () => {
  expect(getLoanLength(2e5, 7.5e-2, 2000)).toBe(158);
  expect(getLoanLength(2e5, 7.5e-2, getMonthlyPayment(2e5, 7.5e-2, 30 * 12))).toBe(30*12);
  expect(() => getLoanLength(-2e5, 7.5e-2, 2000)).toThrow('Please provide a valid loan/balance');
  expect(() => getLoanLength(2e5, -7.5e-2, 2000)).toThrow('Please provide a valid interest rate');
  expect(() => getLoanLength(2e5, 7.5e-2, -2000)).toThrow('Please provide a valid mountly payment');
  expect(() => getLoanLength(2e5, 7.5e-2, 2000, -1)).toThrow('Please provide a valid number of times interest compounds');
});
