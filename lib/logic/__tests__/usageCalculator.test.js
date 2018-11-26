import plans from '../../../plans';
import { usage } from '../usageCalculator';

describe('usage', () => {
  it('returns "No matching plans found" when no matching plans are found', () => {
    expect(usage('non-existing', 'plan', 120, plans)).toEqual('No matching plans found');
  });

  it('returns "No matching plans found" when plans are empty', () => {
    expect(usage('non-existing', 'plan', 120, [])).toEqual('No matching plans found');
  });

  it('calculates annual energy usage given monthly spend and plan that has a single rate', () => {
    expect(usage('bg', 'standing-charge', 120, plans)).toEqual(14954);
  });

  it('calculates annual energy usage given monthly spend and plan that has variable rates', () => {
    expect(usage('ovo', 'standard', 1000, plans)).toEqual(103855);
  });
});
