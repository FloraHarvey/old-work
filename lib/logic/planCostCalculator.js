import fp from 'lodash/fp';
import { VAT, DAYS_IN_YEAR } from '../constants';

export const calculateTotalPlanCost = (annualEnergyUsage, plan) => {
  return fp.pipe(
    _calculateEnergyCost(plan),
    _applyStandingCharge(plan),
    _applyVat,
    _toPounds,
  )(annualEnergyUsage)
}

const _calculateEnergyCost = ({ rates }) => (annualEnergyUsage) => {
  const { totalCost } =
    rates.reduce(_addCostForCurrentRate, { remainingUsage: annualEnergyUsage, totalCost: 0 });
  return totalCost;
}

// callback for reduce, takes rate and accumulator object as args
const _addCostForCurrentRate = ({ remainingUsage, totalCost }, { threshold = remainingUsage, price }) => {
  const usageAtThisRate = threshold < remainingUsage ? threshold : remainingUsage;
  remainingUsage -= usageAtThisRate;
  totalCost += (usageAtThisRate * price);
  return { remainingUsage, totalCost };
}

const _applyStandingCharge = ({ standing_charge = 0 }) => (costOfEnergy) =>
  costOfEnergy + standing_charge * DAYS_IN_YEAR;

const _applyVat = (total) => total * (1 + VAT);

const _toPounds = (total) => Math.round(total) / 100;
