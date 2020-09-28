import { getTotalAmortizingInterest, getMonthlyPayment } from '../index';
test('Total Amortizing Interest', () => {
  expect(getTotalAmortizingInterest(2e5, 7.5e-2, 2000)).toBe(114846.69224113684);
  expect(getTotalAmortizingInterest(2e5, 7.5e-2, getMonthlyPayment(2e5, 7.5e-2, 30 * 12))).toBe(303434.4461580063);
  expect(() => getTotalAmortizingInterest(-2e5, 7.5e-2, 2000)).toThrow('Please provide a valid loan/balance');
  expect(() => getTotalAmortizingInterest(2e5, -7.5e-2, 2000)).toThrow('Please provide a valid interest rate');
  expect(() => getTotalAmortizingInterest(2e5, 7.5e-2, -2000)).toThrow('Please provide a valid mountly payment');
  expect(() => getTotalAmortizingInterest(2e5, 7.5e-2, 2000, -1)).toThrow('Please provide a valid number of times interest compounds');
});
