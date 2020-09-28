import { getSimpleInterest } from '../index';
test('Loan Balance', () => {
  expect(getSimpleInterest(2e5, 7.5e-2)).toBe(1250);
  expect(getSimpleInterest(199851.57, 7.5e-2)).toBe(1249.0723125);
  expect(() => getSimpleInterest(-2e5, 7.5e-2)).toThrow('Please provide a valid loan/balance');
  expect(() => getSimpleInterest(2e5, -7.5e-2)).toThrow('Please provide a valid interest rate');
});
