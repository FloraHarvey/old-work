import { VAT, MONTHS_IN_YEAR } from '../constants';

export const toPounds = (total) => Math.round(total) / 100;

export const toPence = (amount) => amount * 100;

export const toAnnual = (monthlySpend) => monthlySpend * MONTHS_IN_YEAR;

export const applyVat = (total) => total * (1 + VAT);

export const removeVat = (amount) => Math.round(amount / (1 + VAT));
