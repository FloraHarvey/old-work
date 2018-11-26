import { calculateTotalPlanCost } from './planCostCalculator';

export const price = (annualEnergyUsage, plans) =>
  plans
    .map(plan => ({...plan, totalCost: calculateTotalPlanCost(annualEnergyUsage, plan)}))
    .sort((planA, planB) => planA.totalCost - planB.totalCost)
