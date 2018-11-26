import plans from '../../../plans';
import { price } from '../priceComparison';

describe('price', () => {
  it('lists all plans ordered by total cost given an annual usage of 1000kWh list of plans', () => {
    expect(price(1000, plans).map(({ supplier }) => supplier)).toEqual(['eon', 'edf', 'ovo', 'bg']);
  });

  it('lists all plans ordered by total cost given an annual usage of 2000kWh and list of plans', () => {
    expect(price(2000, plans).map(({ supplier }) => supplier)).toEqual(['edf', 'eon', 'bg', 'ovo']);
  });

  it('returns an empty list when plans is empty', () => {
    expect(price(1000, [])).toEqual([]);
  });
});
