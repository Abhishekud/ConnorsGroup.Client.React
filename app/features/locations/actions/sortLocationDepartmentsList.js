export const SORT_LOCATION_DEPARTMENTS_LIST = 'SORT_LOCATION_DEPARTMENTS_LIST';

export function sortLocationDepartmentsList(sort) {
  return {
    type: SORT_LOCATION_DEPARTMENTS_LIST,
    payload: sort,
  };
}
