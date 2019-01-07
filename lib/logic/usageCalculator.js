import fp from 'lodash/fp';
import { DAYS_IN_YEAR } from '../constants';
import { toPence, toAnnual, removeVat } from './utils';

export const usage = (supplierName, planName, monthlySpend, plans) => {
  const plan = findPlanInList(supplierName, planName, plans);
  if (!plan) return 'No matching plans found';

  return fp.pipe(
    toAnnual,
    toPence,
    removeVat,
    withoutStandingCharge(plan),
    removeDiscount(plan),
    totalEnergyUsage(plan),
  )(monthlySpend);
};

const findPlanInList = (supplierName, planName, plans) =>
  plans.find(({ supplier, plan }) => supplier === supplierName && plan === planName);

const withoutStandingCharge = ({ standing_charge }) => (amount) =>
  standing_charge ? amount - (standing_charge * DAYS_IN_YEAR) : amount;

const removeDiscount = (plan) => (amount) => {
  const discountAmount = plan.discounts[0]
 return amount;
}

const totalEnergyUsage = ({ rates }) => (annualSpend) => {
  const { totalUsage } =
    rates.reduce(addUsageForCurrentRate, { remainingSpend: annualSpend, totalUsage: 0 })
  return Math.round(totalUsage);
};

// callback for the reduce function - takes rate and accumulator as args
const addUsageForCurrentRate = (
  {
    remainingSpend,
    totalUsage
  }, {
    price,
    threshold = remainingSpend / price
  }) => {
  const spendAtThisRate = amountSpentAtGivenPrice(threshold, price, remainingSpend)
  remainingSpend -= spendAtThisRate;
  totalUsage += (spendAtThisRate / price);
  return { remainingSpend, totalUsage }
};

const amountSpentAtGivenPrice = (threshold, price, amountSpent) =>
  (threshold * price < amountSpent)
    ? threshold * price
    : amountSpent;
