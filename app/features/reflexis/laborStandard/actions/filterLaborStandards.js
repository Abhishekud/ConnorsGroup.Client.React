export const FILTER_LABOR_STANDARDS = 'REFLEXIS/LABOR_STANDARDS/FILTER';

export function filterLaborStandards(filter) {
  return {
    type: FILTER_LABOR_STANDARDS,
    payload: filter,
  };
}

