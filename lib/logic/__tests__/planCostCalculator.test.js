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
      "discounts": [],
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
      ],
      "discounts": []
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
      ],
      "discounts": []
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
      "standing_charge": 7,
      "discounts": []
    };
    expect(calculateTotalPlanCost(1000, plan)).toEqual(121.33);
  });

  it('calculates the cost of a single plan given no discounts', () => {
    const plan = {
      "supplier": "bg",
      "plan": "standing-charge",
      "rates": [
        {
          "price": 9
        }
      ],
      "discounts": []
    };
    expect(calculateTotalPlanCost(1000, plan)).toEqual(94.50);
  });

  it('calculates the cost of a single plan given a whole bill discount', () => {
    const plan = {
      "discounts": [
          {
              "applies_to": "whole_bill",
              "cap": null,
              "value": 7058,
              "value_type": "price"
          }
      ],
      "plan": "1 Year Fixed Price",
      "rates": [
          {
              "price": 14.8
          }
      ],
      "standing_charge": 14.090000000000002,
      "supplier": "southern-electric"
    };
    expect(calculateTotalPlanCost(5000, plan)).toEqual(756.89);
  });

  it('calculates the cost of a single plan given a standing charge discount', () => {
    const plan = {
      "discounts": [
          {
              "applies_to": "standing_charge",
              "cap": null,
              "value": 44,
              "value_type": "percentage"
          }
      ],
      "plan": "Thames Online Fixed September 2015",
      "rates": [
          {
              "price": 13.5652952380952,
              "threshold": 814
          },
          {
              "price": 5.08232380952381
          }
      ],
      "standing_charge": 16.92,
      "supplier": "flow-energy"
    };
    expect(calculateTotalPlanCost(5000, plan)).toEqual(375.64);
  });
});
