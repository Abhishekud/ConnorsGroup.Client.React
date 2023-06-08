export const SORT_DEPARTMENTS_LIST = 'SORT_DEPARTMENTS_LIST';

export function sortDepartmentsList(sort) {
  return {
    type: SORT_DEPARTMENTS_LIST,
    payload: sort,
  };
}
