import fp from 'lodash/fp';
import { applyVat, toPounds, toPence } from './utils';
import { DAYS_IN_YEAR } from '../constants';

export const calculateTotalPlanCost = (annualEnergyUsage, plan) => {
  return fp.pipe(
    calculateEnergyCost(plan),
    applyStandingCharge(plan),
    applyDiscount(plan),
    applyVat,
    toPounds,
  )(annualEnergyUsage)
}

const calculateEnergyCost = ({ rates }) => (annualEnergyUsage) => {
  const { totalCost } =
    rates.reduce(addCostForCurrentRate, { remainingUsage: annualEnergyUsage, totalCost: 0 });
  return totalCost;
}

// callback for reduce, takes rate and accumulator object as args
const addCostForCurrentRate = ({ remainingUsage, totalCost }, { threshold = remainingUsage, price }) => {
  const usageAtThisRate = threshold < remainingUsage ? threshold : remainingUsage;
  remainingUsage -= usageAtThisRate;
  totalCost += (usageAtThisRate * price);
  return { remainingUsage, totalCost };
}

const applyStandingCharge = ({ standing_charge = 0 }) => (costOfEnergy) =>
  costOfEnergy + standing_charge * DAYS_IN_YEAR;

const applyDiscount = ({ discounts, standing_charge = 0 }) => (total) => {
  const discount = discounts[0] || {};
  let amountOff = 0;
  if (discount.applies_to === "whole_bill") {
    amountOff = discount.value;
  } else if (discount.applies_to === "standing_charge") {
    amountOff = (discount.value / 100) * standing_charge * DAYS_IN_YEAR;
  }
  return total - amountOff;
}
