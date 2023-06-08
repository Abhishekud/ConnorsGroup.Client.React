export const SELECT_LABOR_PERIOD = 'SELECT_KRONOS_LABOR_PERIOD';

export function selectLaborPeriod(period) {
  return {
    type: SELECT_LABOR_PERIOD,
    payload: period,
  };
}
