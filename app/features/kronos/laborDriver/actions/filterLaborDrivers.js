export const FILTER_LABOR_DRIVERS = 'FILTER_KRONOS_LABOR_DRIVERS';

export function filterLaborDrivers(filter) {
  return {
    type: FILTER_LABOR_DRIVERS,
    payload: filter,
  };
}

