export const SORT_LABOR_DRIVERS = 'SORT_KRONOS_LABOR_DRIVERS';

export function sortLaborDrivers(sort) {
  return {
    type: SORT_LABOR_DRIVERS,
    payload: sort,
  };
}

