export const SORT_LABOR_PERIODS = 'SORT_KRONOS_LABOR_PERIODS';

export function sortLaborPeriods(sort) {
  return {
    type: SORT_LABOR_PERIODS,
    payload: sort,
  };
}

