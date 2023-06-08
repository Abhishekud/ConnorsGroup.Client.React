export const FILTER_LABOR_PERIODS = 'FILTER_KRONOS_LABOR_PERIODS';

export function filterLaborPeriods(filter) {
  return {
    type: FILTER_LABOR_PERIODS,
    payload: filter,
  };
}

