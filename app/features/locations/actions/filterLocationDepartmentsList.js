export const FILTER_LOCATION_DEPARTMENTS_LIST = 'FILTER_LOCATION_DEPARTMENTS_LIST';

export function filterLocationDepartmentsList(filter) {
  return {
    type: FILTER_LOCATION_DEPARTMENTS_LIST,
    payload: filter,
  };
}
