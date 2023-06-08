export const SORT_LABOR_STANDARDS_LIST = 'SORT_LABOR_STANDARDS_LIST';
export const SORT_LABOR_STANDARDS_LIST_PENDING = `${SORT_LABOR_STANDARDS_LIST}_PENDING`;
export const SORT_LABOR_STANDARDS_LIST_FULFILLED = `${SORT_LABOR_STANDARDS_LIST}_FULFILLED`;
export const SORT_LABOR_STANDARDS_LIST_REJECTED = `${SORT_LABOR_STANDARDS_LIST}_REJECTED`;

export function sortLaborStandardsList(sort) {
  return {
    type: SORT_LABOR_STANDARDS_LIST,
    payload: Promise.resolve(sort),
  };
}