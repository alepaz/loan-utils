import { getMonthlyPayment } from '../index';
test('Monthly Payment', () => {
  expect(getMonthlyPayment(2e5, 7.5e-2, 30 * 12)).toBe(1398.429017105553);
  expect(() => getMonthlyPayment(-2e5, 7.5e-2, 30 * 12)).toThrow('Please provide a valid loan');
  expect(() => getMonthlyPayment(2e5, -7.5e-2, 30 * 12)).toThrow('Please provide a valid interest rate');
  expect(() => getMonthlyPayment(2e5, 7.5e-2, -30 * 12)).toThrow('Please provide a valid loan length');
  expect(() => getMonthlyPayment(2e5, 7.5e-2, 30 * 12, 0)).toThrow(
    'Please provide a valid number of times interest compounds',
  );
  expect(() => getMonthlyPayment(2e5, 7.5e-2, 30 * 12, -10)).toThrow(
    'Please provide a valid number of times interest compounds',
  );
});
