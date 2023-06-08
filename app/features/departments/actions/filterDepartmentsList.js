export const FILTER_DEPARTMENTS_LIST = 'FILTER_DEPARTMENTS_LIST';

export function filterDepartmentsList(filter) {
  return {
    type: FILTER_DEPARTMENTS_LIST,
    payload: filter,
  };
}
