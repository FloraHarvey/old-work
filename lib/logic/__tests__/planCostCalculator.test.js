import { calculateTotalPlanCost } from '../planCostCalculator';

describe('calculating the total cost of a single plan given an annual usage', () => {
  it('calculates the cost of a single plan given a single rate and no standing charge', () => {
    const plan = {
      "supplier": "bg",
      "plan": "standing-charge",
      "rates": [
        {
          "price": 9
        }
      ],
    };
    expect(calculateTotalPlanCost(1000, plan)).toEqual(94.50);
  });

  it('calculates the cost of a single plan given two different rates and no standing charge', () => {
    const plan = {
      "supplier": "ovo",
      "plan": "standard",
      "rates": [
        {
          "price": 12.5,
          "threshold": 300
        },
        {
          "price": 11
        }
      ]
    };
    expect(calculateTotalPlanCost(1000, plan)).toEqual(120.23);
  });

  it('calculates the cost of a single plan when the energy usage is less than the first threshold', () => {
    const plan = {
      "supplier": "ovo",
      "plan": "standard",
      "rates": [
        {
          "price": 12.5,
          "threshold": 300
        },
        {
          "price": 11
        }
      ]
    };
    expect(calculateTotalPlanCost(200, plan)).toEqual(26.25);
  });

  it('calculates the cost of a single plan given a single rate and a standing charge', () => {
    const plan =  {
      "supplier": "bg",
      "plan": "standing-charge",
      "rates": [
        {
          "price": 9
        }
      ],
      "standing_charge": 7
    };
    expect(calculateTotalPlanCost(1000, plan)).toEqual(121.33);
  });
});
