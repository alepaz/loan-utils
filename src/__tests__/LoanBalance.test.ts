import { getLoanBalance } from '../index';
test('Loan Balance', () => {
  expect(getLoanBalance(2e5, 7.5e-2, 30 * 12, 12)).toBe(198156.33114503196);
  expect(getLoanBalance(2e5, 7.5e-2, 30 * 12, 0)).toBe(2e5);
  expect(() => getLoanBalance(-2e5, 7.5e-2, 30 * 12, 12)).toThrow('Please provide a valid loan');
  expect(() => getLoanBalance(2e5, -7.5e-2, 30 * 12, 12)).toThrow('Please provide a valid interest rate');
  expect(() => getLoanBalance(2e5, 7.5e-2, -30 * 12, 12)).toThrow('Please provide a valid loan length');
  expect(() => getLoanBalance(2e5, 7.5e-2, 30 * 12, -12)).toThrow('Please provide a valid number of Period of elapsed months');
  expect(() => getLoanBalance(2e5, 7.5e-2, 30 * 12, 12, 0)).toThrow(
    'Please provide a valid number of times interest compounds',
  );
  expect(() => getLoanBalance(2e5, 7.5e-2, 30 * 12, 12, -10)).toThrow(
    'Please provide a valid number of times interest compounds',
  );
});
