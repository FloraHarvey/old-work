import fp from 'lodash/fp';
import { VAT, DAYS_IN_YEAR, MONTHS_IN_YEAR } from '../constants';

export const usage = (supplierName, planName, monthlySpend, plans) => {
  const plan = _findPlanInList(supplierName, planName, plans);
  if (!plan) return 'No matching plans found';

  return fp.pipe(
    _toAnnual,
    _toPence,
    _withoutVat,
    _withoutStandingCharge(plan),
    _totalEnergyUsage(plan),
  )(monthlySpend);
};

const _findPlanInList = (supplierName, planName, plans) =>
  plans.find(({ supplier, plan }) => supplier === supplierName && plan === planName);

const _toAnnual = (monthlySpend) => monthlySpend * MONTHS_IN_YEAR;

const _toPence = (amount) => amount * 100;

const _withoutVat = (amount) => Math.round(amount / (1 + VAT));

const _withoutStandingCharge = ({ standing_charge }) => (amount) =>
  standing_charge ? amount - (standing_charge * DAYS_IN_YEAR) : amount;

const _totalEnergyUsage = ({ rates }) => (annualSpend) => {
  const { totalUsage } =
    rates.reduce(_addUsageForCurrentRate, { remainingSpend: annualSpend, totalUsage: 0 })
  return Math.round(totalUsage);
};

// callback for the reduce function - takes rate and accumulator as args
const _addUsageForCurrentRate = (
  {
    remainingSpend,
    totalUsage
  }, {
    price,
    threshold = remainingSpend / price
  }) => {
  const spendAtThisRate = _amountSpentAtGivenPrice(threshold, price, remainingSpend)
  remainingSpend -= spendAtThisRate;
  totalUsage += (spendAtThisRate / price);
  return { remainingSpend, totalUsage }
};

const _amountSpentAtGivenPrice = (threshold, price, amountSpent) =>
  (threshold * price < amountSpent)
    ? threshold * price
    : amountSpent;
