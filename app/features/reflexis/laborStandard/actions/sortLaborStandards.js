export const SORT_LABOR_STANDARDS = 'REFLEXIS/LABOR_STANDARDS/SORT';

export function sortLaborStandards(sort) {
  return {
    type: SORT_LABOR_STANDARDS,
    payload: sort,
  };
}

