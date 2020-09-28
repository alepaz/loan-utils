import { getTotalInterest } from '../index';
test('Total Amortizing Interest', () => {
  expect(getTotalInterest(2e5, 7.5e-2, 30*12)).toBe(303434.44615799905);
  expect(() => getTotalInterest(-2e5, 7.5e-2, 30*12)).toThrow('Please provide a valid loan');
  expect(() => getTotalInterest(2e5, -7.5e-2, 30*12)).toThrow('Please provide a valid interest rate');
  expect(() => getTotalInterest(2e5, 7.5e-2, -30*12)).toThrow('Please provide a valid loan length');
  expect(() => getTotalInterest(2e5, 7.5e-2, 2000, -1)).toThrow('Please provide a valid number of times interest compounds');
});
